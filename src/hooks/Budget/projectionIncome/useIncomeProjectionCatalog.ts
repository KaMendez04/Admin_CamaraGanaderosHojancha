import type {
  Department,
  PIncomeSubType,
  PIncomeType,
} from "../../../models/Budget/incomeProjectionType";

import { useQuery } from "@tanstack/react-query";
import { listDepartments } from "../../../services/Budget/IncomeService";
import { listPIncomes, listPIncomeSubTypes, listPIncomeTypes } from "../../../services/Budget/projectionIncomeService";
import { listIncomeTypes, listIncomeSubTypes } from "../../../services/Budget/projectionIncomeService";


// Adaptador para mantener tu shape { data, loading, error }
function adaptQuery<T>(q: {
  data?: T;
  isPending: boolean;
  error: unknown;
}) {
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
export function usePIncomeTypes(departmentId?: number, fiscalYearId?: number) {
  const q = useQuery({
    queryKey: ["pIncomeTypes", departmentId ?? "none", fiscalYearId ?? "no-fy"],
    queryFn: async () => {
      if (!departmentId) return [] as PIncomeType[];
      const res = await listPIncomeTypes(departmentId, fiscalYearId);
      return res.data as PIncomeType[];
    },
    enabled: !!departmentId,
    staleTime: 5 * 60 * 1000,
  });
  return adaptQuery<PIncomeType[]>(q);
}

// IncomeSubTypes (dependen de type)
export function usePIncomeSubTypes(pIncomeTypeId?: number, fiscalYearId?: number) {
  const q = useQuery({
    queryKey: ["pIncomeSubTypes", pIncomeTypeId ?? "none", fiscalYearId ?? "no-fy"],
    queryFn: async () => {
      if (!pIncomeTypeId) return [] as PIncomeSubType[];
      const res = await listPIncomeSubTypes(pIncomeTypeId, fiscalYearId);
      return res.data as PIncomeSubType[];
    },
    enabled: !!pIncomeTypeId,
    staleTime: 5 * 60 * 1000,
  });
  return adaptQuery<PIncomeSubType[]>(q);
}

export function usePIncomesList(pIncomeSubTypeId?: number, fiscalYearId?: number) {
  const q = useQuery({
    queryKey: ["pIncomeList", pIncomeSubTypeId ?? "all", fiscalYearId ?? "no-fy"],
    queryFn: async () => listPIncomes(pIncomeSubTypeId, fiscalYearId),
    staleTime: 30 * 1000,
  });

  return {
    data: (q.data ?? []) as any[],
    loading: q.isPending,
    error: (q.error as any)?.message ?? null,
  };
}

export function useIncomeTypes(departmentId?: number) {
  return useQuery({
    queryKey: ["incomeTypes", departmentId ?? "all"],
    queryFn: async () => (await listIncomeTypes(departmentId)).data,
  });
}

export function useIncomeSubTypes(incomeTypeId?: number) {
  return useQuery({
    queryKey: ["incomeSubTypes", incomeTypeId ?? "none"],
    queryFn: async () => {
      if (!incomeTypeId) return [];
      return (await listIncomeSubTypes(incomeTypeId)).data;
    },
    enabled: !!incomeTypeId,
  });
}

