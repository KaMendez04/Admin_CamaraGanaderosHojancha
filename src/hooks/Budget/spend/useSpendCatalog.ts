import { useQuery } from "@tanstack/react-query";

import type {
  Department,
  SpendSubType,
  SpendType,
  PSpendSubType,
  PSpendType,
  Spend,
} from "../../../models/Budget/SpendType";

import {
  listDepartments,
  listSpendSubTypes,
  listSpendTypes,
  listPSpendSubTypes,
  listPSpendTypes,
  listSpend,
} from "../../../services/Budget/SpendService";

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
    queryFn: async () => (await listDepartments()).data as Department[],
    staleTime: 5 * 60 * 1000,
  });
  return adaptQuery<Department[]>(q);
}

// SpendTypes (dependen de departamento)
export function useSpendTypes(departmentId?: number, fiscalYearId?: number) {
  const q = useQuery({
    queryKey: ["spendTypes", departmentId ?? "none", fiscalYearId ?? "no-fy"],
    queryFn: async () => {
      if (!departmentId) return [] as SpendType[];
      return (await listSpendTypes(departmentId, fiscalYearId)).data as SpendType[];
    },
    enabled: !!departmentId,
    staleTime: 5 * 60 * 1000,
  });
  return adaptQuery<SpendType[]>(q);
}

// SpendSubTypes (dependen de type)
export function useSpendSubTypes(spendTypeId?: number, fiscalYearId?: number) {
  const q = useQuery({
    queryKey: ["spendSubTypes", spendTypeId ?? "none", fiscalYearId ?? "no-fy"],
    queryFn: async () => {
      if (!spendTypeId) return [] as SpendSubType[];
      return (await listSpendSubTypes(spendTypeId, fiscalYearId)).data as SpendSubType[];
    },
    enabled: !!spendTypeId,
    staleTime: 5 * 60 * 1000,
  });
  return adaptQuery<SpendSubType[]>(q);
}

// ===== Proyección =====

export function usePSpendTypes(departmentId?: number, fiscalYearId?: number) {
  const q = useQuery({
    queryKey: ["pSpendTypes", departmentId ?? "none", fiscalYearId ?? "none"],
    queryFn: async () => {
      if (!departmentId) return [] as PSpendType[];
      return (await listPSpendTypes(departmentId, fiscalYearId)).data as PSpendType[];
    },
    enabled: !!departmentId,
    staleTime: 5 * 60 * 1000,
  });
  return adaptQuery<PSpendType[]>(q);
}

export function usePSpendSubTypes(args?: { departmentId?: number; typeId?: number; fiscalYearId?: number }) {
  const typeId = args?.typeId;

  const q = useQuery({
    queryKey: ["pSpendSubTypes", typeId ?? "none", args?.departmentId ?? "none", args?.fiscalYearId ?? "none"],
    queryFn: async () => {
      if (!typeId) return [] as PSpendSubType[];
      return (
        await listPSpendSubTypes({
          departmentId: args?.departmentId,
          typeId,
          fiscalYearId: args?.fiscalYearId,
        })
      ).data as PSpendSubType[];
    },
    enabled: !!typeId,
    staleTime: 5 * 60 * 1000,
  });

  return adaptQuery<PSpendSubType[]>(q);
}


export function useSpendsList(spendSubTypeId?: number, fiscalYearId?: number) {
  const q = useQuery({
    queryKey: ["spendList", spendSubTypeId ?? "all", fiscalYearId ?? "no-fy"],
    queryFn: async () => (await listSpend(spendSubTypeId, fiscalYearId)).data as Spend[],
    staleTime: 0,
  });
  return adaptQuery<Spend[]>(q);
}