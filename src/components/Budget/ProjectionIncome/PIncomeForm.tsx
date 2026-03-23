import { useEffect, useMemo, useState } from "react";
import { parseCR, useMoneyInput } from "../../../hooks/Budget/useMoneyInput";
import {
  useDepartments,
  usePIncomeSubTypes,
  usePIncomeTypes,
} from "../../../hooks/Budget/projectionIncome/useIncomeProjectionCatalog";
import type { CreatePIncomeDTO } from "../../../models/Budget/incomeProjectionType";
import { useCreatePIncomeEntry } from "../../../hooks/Budget/projectionIncome/useIncomeProjectionMutations";
import { CustomSelect } from "../../CustomSelect";
import { ActionButtons } from "../../ActionButtons";
import { showSuccessAlert } from "@/utils/alerts";
import { useFiscalYear } from "@/hooks/Budget/useFiscalYear";

type Props = {
  onSuccess?: (createdId: number) => void;
  disabled?: boolean;
};

export default function PIncomeForm({ onSuccess, disabled }: Props) {
  const { current } = useFiscalYear();

  const [departmentId, setDepartmentId] = useState<number | "">("");
  const [typeId, setTypeId] = useState<number | "">("");
  const [subTypeId, setSubTypeId] = useState<number | "">("");

  const money = useMoneyInput("");
  const amountStr: string = ((money as any).value ?? "") as string;
  const amount = parseCR(amountStr || "") ?? 0;

  const [errors, setErrors] = useState<Record<string, string>>({});

  const dept = useDepartments();
  const types = usePIncomeTypes(
    typeof departmentId === "number" ? departmentId : undefined,
    current?.id
  );
  const subTypes = usePIncomeSubTypes(
    typeof typeId === "number" ? typeId : undefined,
    current?.id
  );

  const departmentOptions = useMemo(
    () => (dept.data ?? []).map((d) => ({ label: d.name, value: d.id })),
    [dept.data]
  );

  const typeOptions = useMemo(
    () => (types.data ?? []).map((t) => ({ label: t.name, value: t.id })),
    [types.data]
  );

  const subTypeOptions = useMemo(
    () => (subTypes.data ?? []).map((s) => ({ label: s.name, value: s.id })),
    [subTypes.data]
  );

  useEffect(() => {
    setTypeId("");
    setSubTypeId("");
  }, [departmentId]);

  useEffect(() => {
    setSubTypeId("");
  }, [typeId]);

  const createIncome = useCreatePIncomeEntry();

  const isSubmitting = Boolean(
    (createIncome as any).isPending ??
      (createIncome as any).isLoading ??
      (createIncome as any).loading
  );

  function resetForm() {
    setErrors({});
    setDepartmentId("");
    setTypeId("");
    setSubTypeId("");

    if ("setValue" in money && typeof (money as any).setValue === "function") {
      (money as any).setValue("");
    }
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
    if (!typeId) return setErrors((e) => ({ ...e, typeId: "Selecciona un tipo" }));
    if (!subTypeId) return setErrors((e) => ({ ...e, subTypeId: "Selecciona un sub-tipo" }));
    if (!amountStr || amount <= 0) return setErrors((e) => ({ ...e, amount: "Monto requerido" }));

    const payload: CreatePIncomeDTO = {
      pIncomeSubTypeId: Number(subTypeId),
      amount,
      fiscalYearId: current.id,
    };

    try {
      const res = await createIncome.mutate(payload);
      resetForm();
      await showSuccessAlert("La proyección se registró correctamente.");
      onSuccess?.(res.id);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "No se pudo registrar la proyección de ingreso";

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
          value={typeId}
          onChange={(value) => setTypeId(value ? Number(value) : "")}
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
          value={subTypeId}
          onChange={(value) => setSubTypeId(value ? Number(value) : "")}
          options={subTypeOptions}
          placeholder={!typeId ? "Seleccione un tipo…" : "Seleccione…"}
          disabled={!typeId || disabled}
          searchable={true}
          searchPlaceholder="Buscar subtipo..."
        />
        {errors.subTypeId && <p className="text-xs text-red-600">{errors.subTypeId}</p>}
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
            saveText="Registrar proyección de ingreso"
            cancelText="Cancelar"
            disabled={
              disabled ||
              !current?.id ||
              !current.is_active ||
              current.state !== "OPEN" ||
              !departmentId ||
              !typeId ||
              !subTypeId ||
              !amountStr ||
              amount <= 0
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