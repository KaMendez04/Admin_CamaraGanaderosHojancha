import type { Department, IncomeSubType, IncomeType } from "../../../models/Budget/IncomeType";
import { listDepartments, listIncomeSubTypes, listIncomeTypes } from "../../../services/Budget/IncomeService";
import { useQuery } from "@tanstack/react-query";
import { listIncomes } from "../../../services/Budget/IncomeService";

// Mantiene el contrato: { data, loading, error }
function adaptQuery<T>(q: { data?: T; isPending: boolean; error: unknown }) {
  return {
    data: q.data as T | undefined,
    loading: q.isPending,
    error: (q.error as any)?.message ?? null,
  };
}

// Departamentos
export function useDepartments() {
  const q = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await listDepartments();
      return res.data as Department[];
    },
    staleTime: 5 * 60 * 1000,
  });
  return adaptQuery<Department[]>(q);
}

// IncomeTypes (dependen de departamento)
export function useIncomeTypes(departmentId?: number, fiscalYearId?: number) {
  const q = useQuery({
    queryKey: ["incomeTypes", departmentId ?? "none", fiscalYearId ?? "no-fy"],
    queryFn: async () => {
      if (!departmentId) return [] as IncomeType[];
      const res = await listIncomeTypes(departmentId, fiscalYearId);
      return res.data as IncomeType[];
    },
    enabled: !!departmentId,
    staleTime: 5 * 60 * 1000,
  });
  return adaptQuery<IncomeType[]>(q);
}

// IncomeSubTypes (dependen de type)
export function useIncomeSubTypes(incomeTypeId?: number, fiscalYearId?: number) {
  const q = useQuery({
    queryKey: ["incomeSubTypes", incomeTypeId ?? "none", fiscalYearId ?? "no-fy"],
    queryFn: async () => {
      if (!incomeTypeId) return [] as IncomeSubType[];
      const res = await listIncomeSubTypes(incomeTypeId, fiscalYearId);
      return res.data as IncomeSubType[];
    },
    enabled: !!incomeTypeId,
    staleTime: 5 * 60 * 1000,
  });
  return adaptQuery<IncomeSubType[]>(q);
}

export function useIncomesList(incomeSubTypeId?: number, fiscalYearId?: number) {
  const q = useQuery({
    queryKey: ["incomeList", incomeSubTypeId ?? "all", fiscalYearId ?? "no-fy"],
    queryFn: async () => listIncomes(incomeSubTypeId, fiscalYearId),
    staleTime: 30 * 1000,
  });

  return {
    data: (q.data ?? []) as any[],
    loading: q.isPending,
    error: (q.error as any)?.message ?? null,
  };
}
