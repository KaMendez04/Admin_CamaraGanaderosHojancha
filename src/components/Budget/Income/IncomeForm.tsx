import { useEffect, useMemo, useState } from "react";
import { parseCR, useMoneyInput } from "../../../hooks/Budget/useMoneyInput";
import { CustomSelect } from "../../CustomSelect";

import { useDepartments, useIncomeSubTypes, useIncomeTypes } from "../../../hooks/Budget/income/useIncomeCatalog";
import { useCreateIncomeEntry } from "../../../hooks/Budget/income/useIncomeMutation";
import type { CreateIncomeDTO } from "../../../models/Budget/IncomeType";
import { usePIncomeTypes, usePIncomeSubTypes } from "../../../hooks/Budget/projectionIncome/useIncomeProjectionCatalog";
import {
  useEnsureIncomeSubTypeFromProjection,
  useEnsureIncomeTypeFromProjection,
} from "../../../hooks/Budget/projectionIncome/useIncomeProjectionMutations";
import { BirthDatePicker } from "@/components/ui/birthDayPicker";
import { ActionButtons } from "../../ActionButtons";
import { showSuccessAlert } from "@/utils/alerts";
import { useFiscalYear } from "@/hooks/Budget/useFiscalYear";


type Props = {
  onSuccess?: (createdId: number) => void;
  disabled?: boolean;
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

export default function IncomeForm({ onSuccess, disabled }: Props) {
  const { current } = useFiscalYear();
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
  const realTypes = useIncomeTypes(typeof departmentId === "number" ? departmentId : undefined);
  const projTypes = usePIncomeTypes(
    typeof departmentId === "number" ? departmentId : undefined,
    current?.id
  );

  const typeParsed = parseOriginId(typeKey);

  // Si se selecciona un tipo Real, buscamos si hay uno igual en Proyección para obtener sus subtipos también
  const equivalentProjTypeId = useMemo(() => {
    if (!typeParsed || typeParsed.origin === "p") return null;
    const realTypeName = realTypes.data?.find((t) => t.id === typeParsed.id)?.name;
    if (!realTypeName) return null;
    return projTypes.data?.find((p) => p.name.toUpperCase() === realTypeName.toUpperCase())?.id;
  }, [typeParsed, realTypes.data, projTypes.data]);

  const realSubTypes = useIncomeSubTypes(
    typeParsed?.origin === "r" ? typeParsed.id : undefined,
    current?.id
  );
  const projSubTypes = usePIncomeSubTypes(
    typeParsed?.origin === "p" ? typeParsed.id : (equivalentProjTypeId ?? undefined),
    current?.id
  );

  const departmentOptions = useMemo(
    () => (dept.data ?? []).map((d) => ({ label: d.name, value: d.id })),
    [dept.data]
  );

  const typeOptions = useMemo(() => {
    const map = new Map<string, { label: string; value: OriginId }>();

    // Priorizar catálogos Reales
    (realTypes.data ?? []).forEach((t) => {
      map.set(t.name.toUpperCase(), {
        label: t.name,
        value: `r:${t.id}` as OriginId,
      });
    });

    // Agregar de Proyección solo si no existen con el mismo nombre
    (projTypes.data ?? []).forEach((s) => {
      const key = s.name.toUpperCase();
      if (!map.has(key)) {
        map.set(key, {
          label: s.name,
          value: `p:${s.id}` as OriginId,
        });
      }
    });

    return Array.from(map.values());
  }, [realTypes.data, projTypes.data]);

  const subTypeOptions = useMemo(() => {
    if (!typeParsed) return [];

    const map = new Map<string, { label: string; value: OriginId }>();

    // Subtipos Reales
    (realSubTypes.data ?? []).forEach((s) => {
      map.set(s.name.toUpperCase(), {
        label: s.name,
        value: `r:${s.id}` as OriginId,
      });
    });

    // Subtipos de Proyección
    (projSubTypes.data ?? []).forEach((s) => {
      const key = s.name.toUpperCase();
      if (!map.has(key)) {
        map.set(key, {
          label: s.name,
          value: `p:${s.id}` as OriginId,
        });
      }
    });

    return Array.from(map.values());
  }, [typeParsed, realSubTypes.data, projSubTypes.data]);

  useEffect(() => {
    setTypeKey("");
    setSubTypeKey("");
  }, [departmentId]);

  useEffect(() => {
    setSubTypeKey("");
  }, [typeKey]);

  const createIncome = useCreateIncomeEntry();
  const ensureTypeFromProj = useEnsureIncomeTypeFromProjection();
  const ensureSubFromProj = useEnsureIncomeSubTypeFromProjection();

  const isSubmitting = Boolean(
    (createIncome as any).isPending ??
      (createIncome as any).isLoading ??
      (createIncome as any).loading ??
      (ensureTypeFromProj as any).isPending ??
      (ensureTypeFromProj as any).isLoading ??
      (ensureTypeFromProj as any).loading ??
      (ensureSubFromProj as any).isPending ??
      (ensureSubFromProj as any).isLoading ??
      (ensureSubFromProj as any).loading
  );

  function isDateInSelectedFiscalYear(value?: string) {
    if (!value || !current) return true;

    const start = String(current.start_date ?? "").slice(0, 10);
    const end = String(current.end_date ?? "").slice(0, 10);

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

    if (!current?.id) {
      return setErrors((e) => ({ ...e, api: "Selecciona un año fiscal" }));
    }

    if (!current.is_active) {
      return setErrors((e) => ({ ...e, api: "El año fiscal seleccionado no está activo" }));
    }

    if (current.state !== "OPEN") {
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

      let realIncomeSubTypeId: number;

      if (sParsed.origin === "p") {
        if (tParsed.origin === "p") {
          await ensureTypeFromProj.mutate(tParsed.id);
        }

        const ensuredSub = await ensureSubFromProj.mutate(sParsed.id);
        realIncomeSubTypeId = Number((ensuredSub as any).id);
      } else {
        realIncomeSubTypeId = sParsed.id;
      }

      const payload: CreateIncomeDTO = {
        incomeSubTypeId: realIncomeSubTypeId,
        amount,
        date,
        fiscalYearId: current.id,
      };

      const res = await createIncome.mutate(payload);

      resetForm();
      await showSuccessAlert("El ingreso se registró correctamente.");
      onSuccess?.(res.id);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "No se pudo registrar el ingreso";
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
              setErrors((e) => ({ ...e, date: "" }));
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
            saveText="Registrar Ingreso"
            cancelText="Cancelar"
            disabled={
              disabled ||
              !current?.id ||
              !current.is_active ||
              current.state !== "OPEN" ||
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