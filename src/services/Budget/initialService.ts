// src/services/Budget/initialService.ts
import {
  mapIncomeRows,
  mapSpendRows,
  type ApiIncomeByDept,
  type ApiSpendByDept,
  type CardStats,
  type Row,
} from "../../models/Budget/initialType";
import apiConfig from "../../apiConfig/apiConfig";

const CURRENT_FY_KEY = "cg_currentFYId";

const getFiscalYearId = () =>
  typeof window === "undefined"
    ? undefined
    : Number(localStorage.getItem(CURRENT_FY_KEY) || 0) || undefined;

const HOME_SUMMARY_URL = "/home/summary";  // Cards
const HOME_INCOMES_URL = "/home/incomes";  // Tabla ingresos
const HOME_SPENDS_URL  = "/home/spends";   // Tabla egresos

type Range = { startDate?: string; endDate?: string; fiscalYearId?: number };
type GroupBy = "department" | "type" | "subtype";

// helper para armar querystring limpio
const qs = (obj: Record<string, any>) =>
  Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

export async function fetchIncomeByDepartment(
  params: { groupBy?: GroupBy } & Range = {}
): Promise<Row[]> {
  const query = qs({
    groupBy: params.groupBy ?? "department",
    ...params,
    fiscalYearId: params.fiscalYearId ?? getFiscalYearId(),
  });

  const { data } = await apiConfig.get<ApiIncomeByDept[]>(
    `${HOME_INCOMES_URL}${query ? `?${query}` : ""}`
  );
  return mapIncomeRows(data);
}

export async function fetchSpendByDepartment(
  params: { groupBy?: GroupBy } & Range = {}
): Promise<Row[]> {
  const query = qs({
    groupBy: params.groupBy ?? "department",
    ...params,
    fiscalYearId: params.fiscalYearId ?? getFiscalYearId(),
  });

  const { data } = await apiConfig.get<ApiSpendByDept[]>(
    `${HOME_SPENDS_URL}${query ? `?${query}` : ""}`
  );
  return mapSpendRows(data);
}

export async function fetchCardStats(params: Range = {}): Promise<CardStats> {
  const query = qs({
    ...params,
    fiscalYearId: params.fiscalYearId ?? getFiscalYearId(),
  });

  const { data } = await apiConfig.get<{
    incomes: number;
    spends: number;
    balance: number;
    projectedIncomes: number;
    projectedSpends: number;
    projectedBalance: number;
  }>(`${HOME_SUMMARY_URL}${query ? `?${query}` : ""}`);

  const saldoRestante = data.incomes - data.spends;

  return {
    totalGastado: data.spends,
    totalIngresos: data.incomes,
    saldoRestante,
  };
}
export const initialService = {
  fetchIncomeByDepartment,
  fetchSpendByDepartment,
  fetchCardStats,
};

export default initialService;
