// src/services/Budget/IncomeService.ts
import type {
  ApiList,
  CreateDepartmentDTO,
  CreateIncomeDTO,
  CreateIncomeSubTypeDTO,
  CreateIncomeTypeDTO,
  Department,
  Income,
  IncomeSubType,
  IncomeType,
} from "../../models/Budget/IncomeType";
import apiConfig from "../../apiConfig/apiConfig";

export async function listDepartments(): Promise<ApiList<Department>> {
  const { data } = await apiConfig.get<Department[]>("/department");
  return { data };
}

export async function createDepartment(payload: CreateDepartmentDTO): Promise<Department> {
  const { data } = await apiConfig.post<Department>("/department", payload);
  return data;
}

/** ✅ UPDATE Department */
export async function updateDepartment(
  id: number,
  payload: { name?: string }
): Promise<Department> {
  const { data } = await apiConfig.patch<Department>(`/department/${id}`, payload);
  return data;
}

export async function listIncomeTypes(departmentId?: number, fiscalYearId?: number) {
  const params: Record<string, number> = {};

  if (departmentId) params.departmentId = departmentId;
  if (fiscalYearId) params.fiscalYearId = fiscalYearId;

  const res = await apiConfig.get("/income-type", {
    params: Object.keys(params).length ? params : undefined,
  });

  return res;
}

export async function createIncomeType(payload: CreateIncomeTypeDTO): Promise<IncomeType> {
  const { data } = await apiConfig.post<any>("/income-type", payload);
  return {
    id: data.id,
    name: data.name,
    departmentId: data?.department?.id ?? payload.departmentId,
  };
}

/** ✅ UPDATE IncomeType */
export async function updateIncomeType(
  id: number,
  payload: { name?: string; departmentId?: number }
): Promise<IncomeType> {
  const { data } = await apiConfig.patch<any>(`/income-type/${id}`, payload);
  return {
    id: data.id,
    name: data.name,
    departmentId: data?.department?.id ?? data?.departmentId ?? payload.departmentId,
  };
}

export async function listIncomeSubTypes(incomeTypeId?: number, fiscalYearId?: number) {
  const params: Record<string, number> = {};

  if (incomeTypeId) params.incomeTypeId = incomeTypeId;
  if (fiscalYearId) params.fiscalYearId = fiscalYearId;

  const res = await apiConfig.get("/income-sub-type", {
    params: Object.keys(params).length ? params : undefined,
  });

  return res;
}

export async function createIncomeSubType(payload: CreateIncomeSubTypeDTO): Promise<IncomeSubType> {
  const { data } = await apiConfig.post<any>("/income-sub-type", payload);
  return {
    id: data.id,
    name: data.name,
    incomeTypeId: data?.incomeType?.id ?? payload.incomeTypeId,
  };
}

/** ✅ UPDATE IncomeSubType */
export async function updateIncomeSubType(
  id: number,
  payload: { name?: string; incomeTypeId?: number }
): Promise<IncomeSubType> {
  const { data } = await apiConfig.patch<any>(`/income-sub-type/${id}`, payload);
  return {
    id: data.id,
    name: data.name,
    incomeTypeId: data?.incomeType?.id ?? data?.incomeTypeId ?? payload.incomeTypeId!,
  };
}

export async function createIncome(payload: CreateIncomeDTO): Promise<Income> {
  const body = {
    incomeSubTypeId: payload.incomeSubTypeId,
    amount: Number(payload.amount).toFixed(2),
    date: payload.date,
    fiscalYearId: payload.fiscalYearId,
  };

  const { data } = await apiConfig.post<any>("/income", body);

  return {
    id: data.id,
    amount: data.amount,
    date: data.date,
    incomeSubType: {
      id: data?.incomeSubType?.id ?? payload.incomeSubTypeId,
      name: data?.incomeSubType?.name ?? "",
      incomeTypeId: data?.incomeSubType?.incomeType?.id,
    },
  };
}

export async function updateIncome(
  id: number,
  payload: { amount?: number; incomeSubTypeId?: number; date?: string; fiscalYearId: number }
) {
  const body: any = {};

  if (payload.amount !== undefined) {
    body.amount = Number(payload.amount).toFixed(2);
  }
  if (payload.incomeSubTypeId !== undefined) {
    body.incomeSubTypeId = payload.incomeSubTypeId;
  }
  if (payload.date !== undefined) {
    body.date = payload.date;
  }

  body.fiscalYearId = payload.fiscalYearId;

  const { data } = await apiConfig.patch<any>(`/income/${id}`, body);
  return data;
}
export async function listIncomes(incomeSubTypeId?: number, fiscalYearId?: number) {
  const params: Record<string, number> = {};

  if (incomeSubTypeId) params.incomeSubTypeId = incomeSubTypeId;
  if (fiscalYearId) params.fiscalYearId = fiscalYearId;

  const { data } = await apiConfig.get<any[]>("/income", {
    params: Object.keys(params).length ? params : undefined,
  });

  return data;
}
