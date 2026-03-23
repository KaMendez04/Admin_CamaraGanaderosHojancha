import { useEffect, useMemo, useState } from "react";
import { CustomSelect } from "../../CustomSelect";
import { parseCR, useMoneyInput } from "../../../hooks/Budget/useMoneyInput";

import {
  useDepartments,
  useSpendSubTypes,
  useSpendTypes,
  usePSpendTypes,
  usePSpendSubTypes,
} from "../../../hooks/Budget/spend/useSpendCatalog";

import {
  useCreateSpendEntry,
  useEnsureSpendSubTypeFromProjection,
} from "../../../hooks/Budget/spend/useSpendMutation";

import type { CreateSpendDTO } from "../../../models/Budget/SpendType";
import { BirthDatePicker } from "@/components/ui/birthDayPicker";
import { ActionButtons } from "../../ActionButtons";
import { showSuccessAlert } from "@/utils/alerts";
import { useFiscalYear } from "@/hooks/Budget/useFiscalYear";

type Props = {
  onSuccess?: (createdId: number) => void;
  disabled?: boolean;
  fiscalYearId?: number;
};

type OriginId = `r:${number}` | `p:${number}`;

function parseOriginId(v: string | number | ""): { origin: "r" | "p"; id: number } | null {
  if (!v) return null;
  const s = String(v);
  const [origin, raw] = s.split(":");
  const id = Number(raw);
  if ((origin !== "r" && origin !== "p") || !Number.isFinite(id)) return null;
  return { origin: origin as "r" | "p", id };
}

export default function SpendForm({ onSuccess, disabled, fiscalYearId }: Props) {
  const { current, list } = useFiscalYear();

  const selectedFiscalYear =
    fiscalYearId != null
      ? list.find((fy) => fy.id === fiscalYearId) ?? null
      : current;

  const selectedFiscalYearId = selectedFiscalYear?.id;

  const [departmentId, setDepartmentId] = useState<number | "">("");
  const [typeKey, setTypeKey] = useState<OriginId | "">("");
  const [subTypeKey, setSubTypeKey] = useState<OriginId | "">("");

  const money = useMoneyInput("");
  const amountStr: string = ((money as any).value ?? "") as string;
  const amount = parseCR(amountStr || "") ?? 0;

  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const dept = useDepartments();

  const realTypes = useSpendTypes(typeof departmentId === "number" ? departmentId : undefined);
  const projTypes = usePSpendTypes(
    typeof departmentId === "number" ? departmentId : undefined,
    selectedFiscalYearId
  );

  const typeParsed = parseOriginId(typeKey);

  const realSubTypes = useSpendSubTypes(typeParsed?.origin === "r" ? typeParsed.id : undefined);

  const projSubTypes = usePSpendSubTypes(
    typeParsed?.origin === "p"
      ? {
          departmentId: typeof departmentId === "number" ? departmentId : undefined,
          typeId: typeParsed.id,
          fiscalYearId: selectedFiscalYearId,
        }
      : undefined
  );

  const departmentOptions = useMemo(
    () => (dept.data ?? []).map((d) => ({ label: d.name, value: d.id })),
    [dept.data]
  );

  const typeOptions = useMemo(() => {
    const r = (realTypes.data ?? []).map((t) => ({
      label: t.name,
      value: `r:${t.id}` as OriginId,
    }));

    const p = (projTypes.data ?? []).map((t) => ({
      label: t.name,
      value: `p:${t.id}` as OriginId,
    }));

    return [...r, ...p];
  }, [realTypes.data, projTypes.data]);

  const subTypeOptions = useMemo(() => {
    if (!typeParsed) return [];
    if (typeParsed.origin === "r") {
      return (realSubTypes.data ?? []).map((s) => ({
        label: s.name,
        value: `r:${s.id}` as OriginId,
      }));
    }
    return (projSubTypes.data ?? []).map((s) => ({
      label: s.name,
      value: `p:${s.id}` as OriginId,
    }));
  }, [typeParsed, realSubTypes.data, projSubTypes.data]);

  useEffect(() => {
    setTypeKey("");
    setSubTypeKey("");
  }, [departmentId]);

  useEffect(() => {
    setSubTypeKey("");
  }, [typeKey]);

  const createSpend = useCreateSpendEntry();
  const ensureSubFromProj = useEnsureSpendSubTypeFromProjection();

  const isSubmitting = Boolean(
    (createSpend as any).isPending ??
      (createSpend as any).isLoading ??
      (createSpend as any).loading ??
      (ensureSubFromProj as any).isPending ??
      (ensureSubFromProj as any).isLoading ??
      (ensureSubFromProj as any).loading
  );

  function isDateInSelectedFiscalYear(value?: string) {
    if (!value || !selectedFiscalYear) return true;

    const start = String(selectedFiscalYear.start_date ?? "").slice(0, 10);
    const end = String(selectedFiscalYear.end_date ?? "").slice(0, 10);

    if (!start || !end) return true;

    return value >= start && value <= end;
  }

  function resetForm() {
    setErrors({});
    setDepartmentId("");
    setTypeKey("");
    setSubTypeKey("");

    if ("setValue" in money && typeof (money as any).setValue === "function") {
      (money as any).setValue("");
    }

    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    setDate(`${yyyy}-${mm}-${dd}`);
  }

  async function onSubmit() {
    setErrors({});

    if (!selectedFiscalYearId) {
      return setErrors((e) => ({ ...e, api: "Selecciona un año fiscal" }));
    }

    if (!selectedFiscalYear?.is_active) {
      return setErrors((e) => ({ ...e, api: "El año fiscal seleccionado no está activo" }));
    }

    if (selectedFiscalYear.state !== "OPEN") {
      return setErrors((e) => ({ ...e, api: "El año fiscal seleccionado está cerrado" }));
    }

    if (!departmentId) return setErrors((e) => ({ ...e, departmentId: "Selecciona un departamento" }));
    if (!typeKey) return setErrors((e) => ({ ...e, typeId: "Selecciona un tipo" }));
    if (!subTypeKey) return setErrors((e) => ({ ...e, subTypeId: "Selecciona un sub-tipo" }));
    if (!amountStr || amount <= 0) return setErrors((e) => ({ ...e, amount: "Monto requerido" }));
    if (!date) return setErrors((e) => ({ ...e, date: "Fecha requerida" }));

    if (!isDateInSelectedFiscalYear(date)) {
      return setErrors((e) => ({
        ...e,
        date: "La fecha debe pertenecer al año fiscal seleccionado",
      }));
    }

    try {
      const tParsed = parseOriginId(typeKey);
      const sParsed = parseOriginId(subTypeKey);

      if (!tParsed) return setErrors((e) => ({ ...e, typeId: "Tipo inválido" }));
      if (!sParsed) return setErrors((e) => ({ ...e, subTypeId: "Subtipo inválido" }));

      let realSpendSubTypeId: number;

      if (sParsed.origin === "p") {
        const ensuredSub = await ensureSubFromProj.mutate(sParsed.id);
        realSpendSubTypeId = Number((ensuredSub as any).id);
      } else {
        realSpendSubTypeId = sParsed.id;
      }

      const payload: CreateSpendDTO = {
        spendSubTypeId: realSpendSubTypeId,
        amount,
        date,
        fiscalYearId: selectedFiscalYearId,
      };

      const res = await createSpend.mutate(payload);

      resetForm();
      await showSuccessAlert("El egreso se registró correctamente.");
      onSuccess?.(res.id);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "No se pudo registrar el egreso";

      setErrors((e) => ({ ...e, api: msg }));
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#33361D]">Departamento</label>
        <CustomSelect
          value={departmentId}
          onChange={(value) => setDepartmentId(value ? Number(value) : "")}
          options={departmentOptions}
          placeholder="Seleccione…"
          disabled={disabled}
        />
        {errors.departmentId && <p className="text-xs text-red-600">{errors.departmentId}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#33361D]">Tipo</label>
        <CustomSelect
          value={typeKey}
          onChange={(value) => setTypeKey(value ? (String(value) as OriginId) : "")}
          options={typeOptions}
          placeholder={!departmentId ? "Seleccione un departamento…" : "Seleccione…"}
          disabled={!departmentId || disabled}
          searchable={true}
          searchPlaceholder="Buscar tipo..."
        />
        {errors.typeId && <p className="text-xs text-red-600">{errors.typeId}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#33361D]">Subtipo</label>
        <CustomSelect
          value={subTypeKey}
          onChange={(value) => setSubTypeKey(value ? (String(value) as OriginId) : "")}
          options={subTypeOptions}
          placeholder={!typeKey ? "Seleccione un tipo…" : "Seleccione…"}
          disabled={!typeKey || disabled}
          searchable={true}
          searchPlaceholder="Buscar subtipo..."
        />
        {errors.subTypeId && <p className="text-xs text-red-600">{errors.subTypeId}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#33361D]">Fecha</label>

        <BirthDatePicker
          value={date}
          onChange={(iso) => {
            setDate(iso);

            if (!iso) {
              setErrors((e) => ({ ...e, date: "" }));
              return;
            }

            if (!isDateInSelectedFiscalYear(iso)) {
              setErrors((e) => ({
                ...e,
                date: "La fecha debe pertenecer al año fiscal seleccionado",
              }));
            } else {
              setErrors((e) => ({ ...e, date: "", api: "" }));
            }
          }}
          disabled={disabled}
          placeholder="Seleccione una fecha"
          error={errors.date}
          helperText=""
          triggerClassName="rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#708C3E]"
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#33361D]">Monto</label>
        <input
          className="rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#708C3E]"
          placeholder="₡0,00"
          value={amountStr}
          onChange={(e) => (money as any).handleInput?.(e)}
          disabled={disabled}
        />
        {errors.amount && <p className="text-xs text-red-600">{errors.amount}</p>}
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-end">
          <ActionButtons
            onSave={onSubmit}
            onCancel={resetForm}
            showSave
            showCancel
            showText
            saveText="Registrar egreso"
            cancelText="Cancelar"
            disabled={
              disabled ||
              !selectedFiscalYearId ||
              !selectedFiscalYear?.is_active ||
              selectedFiscalYear?.state !== "OPEN" ||
              !departmentId ||
              !typeKey ||
              !subTypeKey ||
              !amountStr ||
              amount <= 0 ||
              !date ||
              !isDateInSelectedFiscalYear(date)
            }
            isSaving={isSubmitting}
            requireConfirmCancel={false}
            requireConfirmSave={false}
          />
        </div>

        {errors.api && <p className="text-xs text-red-600 mt-3">{errors.api}</p>}
      </div>
    </div>
  );
}