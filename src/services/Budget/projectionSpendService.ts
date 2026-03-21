import type {
  ApiList,
  Department,
  PSpend,
  PSpendSubType,
  PSpendType,
  CreatePSpendDTO,
} from "../../models/Budget/PSpendType";
import apiConfig from "../../apiConfig/apiConfig";

const CURRENT_FY_KEY = "cg_currentFYId";

const getFiscalYearId = () =>
  typeof window === "undefined"
    ? undefined
    : Number(localStorage.getItem(CURRENT_FY_KEY) || 0) || undefined;

/** ============= Departamentos ============= */
export async function listDepartments(): Promise<ApiList<Department>> {
  const { data } = await apiConfig.get<Department[]>("/department");
  return { data };
}

/** ============= P-Types (proyección) ============= */
export async function listPSpendTypes(
  departmentId?: number,
  fiscalYearId?: number
): Promise<ApiList<PSpendType>> {
  const params: Record<string, number> = {};

  if (departmentId) params.departmentId = departmentId;
  if (fiscalYearId) params.fiscalYearId = fiscalYearId;

  const { data } = await apiConfig.get<any[]>("/p-spend-type", {
    params: Object.keys(params).length ? params : undefined,
  });

  const items: PSpendType[] = (data ?? []).map((t) => ({
    id: t.id,
    name: t.name,
    departmentId: t?.department?.id ?? t?.departmentId ?? departmentId,
    amountPSpend: t?.amountPSpend ?? "0.00",
  }));

  return { data: items };
}

export async function createPSpendType(payload: {
  name: string;
  departmentId: number;
}): Promise<PSpendType> {
  const { data } = await apiConfig.post<any>("/p-spend-type", payload);
  return {
    id: data.id,
    name: data.name,
    departmentId: data?.department?.id ?? data?.departmentId ?? payload.departmentId,
  };
}

export async function updatePSpendType(
  id: number,
  payload: { name?: string; departmentId?: number }
): Promise<PSpendType> {
  const { data } = await apiConfig.patch<any>(`/p-spend-type/${id}`, payload);
  return {
    id: data.id,
    name: data.name,
    departmentId: data?.department?.id ?? data?.departmentId ?? payload.departmentId,
  };
}

/** ============= P-SubTypes (proyección) ============= */
export async function listPSpendSubTypes(
  pSpendTypeId: number,
  fiscalYearId?: number
): Promise<ApiList<PSpendSubType>> {
  const params: Record<string, number> = { typeId: pSpendTypeId };
  if (fiscalYearId) params.fiscalYearId = fiscalYearId;

  const { data } = await apiConfig.get<any[]>("/p-spend-sub-type", {
    params,
  });

  const items: PSpendSubType[] = (data ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    pSpendTypeId: s?.type?.id ?? pSpendTypeId,
    amountPSpend: s?.amountPSpend ?? "0.00",
  }));

  const filtered = items.filter((s) => s.pSpendTypeId === pSpendTypeId);

  return { data: filtered };
}

export async function createPSpendSubType(payload: {
  name: string;
  pSpendTypeId: number;
}): Promise<PSpendSubType> {
  // El back recibe `typeId`
  const { data } = await apiConfig.post<any>("/p-spend-sub-type", {
    name: payload.name,
    typeId: payload.pSpendTypeId,
  });

  return {
    id: data.id,
    name: data.name,
    pSpendTypeId: data?.type?.id ?? payload.pSpendTypeId,
  };
}

export async function updatePSpendSubType(
  id: number,
  payload: { name?: string; typeId?: number }
): Promise<PSpendSubType> {
  const { data } = await apiConfig.patch<any>(`/p-spend-sub-type/${id}`, payload);

  return {
    id: data.id,
    name: data.name,
    // el back responde con `type`
    pSpendTypeId: data?.type?.id ?? payload.typeId!,
  };
}

/** ============= Crear Proyección de Egreso ============= */
export async function createPSpend(payload: CreatePSpendDTO): Promise<PSpend> {
  const body = {
  subTypeId: payload.pSpendSubTypeId,
  amount: Number(payload.amount),
  fiscalYearId: getFiscalYearId(),
};
  const { data } = await apiConfig.post<any>("/p-spend", body);

  return {
    id: data.id,
    amount: data.amount,
    // el backend responde con `subType`, no `pSpendSubType`
    pSpendSubType: {
      id: data?.subType?.id ?? payload.pSpendSubTypeId,
      name: data?.subType?.name ?? "",
      pSpendTypeId: data?.subType?.type?.id,
    },
  };
}


export async function listPSpends(subTypeId?: number, fiscalYearId?: number) {
  const params: Record<string, number> = {};

  if (subTypeId) params.subTypeId = subTypeId;
  if (fiscalYearId) params.fiscalYearId = fiscalYearId;

  const { data } = await apiConfig.get<any[]>("/p-spend", {
    params: Object.keys(params).length ? params : undefined,
  });
  return data;
}

export async function updatePSpend(
  id: number,
  payload: { amount?: number; subTypeId?: number; date?: string }
) {
  const body: any = {}

  if (payload.amount !== undefined) body.amount = Number(payload.amount)
  if (payload.subTypeId !== undefined) body.subTypeId = payload.subTypeId
  if (payload.date !== undefined) body.date = payload.date

  const { data } = await apiConfig.patch<any>(`/p-spend/${id}`, body)
  return data
}
