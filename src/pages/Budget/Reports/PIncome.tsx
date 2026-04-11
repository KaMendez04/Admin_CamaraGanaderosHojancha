import { useEffect, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import type { ColumnDef } from "@tanstack/react-table"
import {
  useIncomeReport,
  useIncomeReportFilters,
} from "../../../hooks/Budget/reports/usePIncomeReport"
import {
  downloadIncomeReportPDF,
  previewIncomeReportPDF,
  downloadIncomeCompareExcel,
} from "../../../services/Budget/reportPIncome/incomeReportService"
import {
  listDepartments,
  listPIncomeTypes,
  listPIncomeSubTypes,
} from "../../../services/Budget/projectionIncomeService"

import { CustomSelect } from "../../../components/CustomSelect"
import { GenericTable } from "../../../components/GenericTable"
import { usePagination, PaginationBar } from "../../../components/ui/pagination"
import { BirthDatePicker } from "@/components/ui/birthDayPicker"
import { useFiscalYear } from "@/hooks/Budget/useFiscalYear"
import { FileText, Download, FileSpreadsheet } from "lucide-react"

// Ajusta esta ruta si tu KPICard está en otra carpeta
import { KPICard } from "../../../components/KPICard"

type AnyObj = Record<string, unknown>

function ensureArray<T = any>(x: unknown): T[] {
  if (Array.isArray(x)) return x as T[]
  if (x && typeof x === "object") {
    const o = x as AnyObj
    if (Array.isArray((o as any).data)) return (o as any).data as T[]
    if (Array.isArray((o as any).items)) return (o as any).items as T[]
    const vals = Object.values(o)
    if (vals.length && vals.every((v) => v && typeof v === "object")) return vals as T[]
  }
  return []
}

const crc = (n: number) =>
  new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0)

export default function PIncomeProjectionsPage() {
  const { current: fiscalYear } = useFiscalYear()

  const {
    filters,
    start,
    end,
    departmentId,
    incomeTypeId,
    incomeSubTypeId,
    setStart,
    setEnd,
    setDepartmentId,
    setIncomeTypeId,
    setIncomeSubTypeId,
  } = useIncomeReportFilters()

  const [submitted, setSubmitted] = useState<any>(null)

  useEffect(() => {
    if (!fiscalYear) return

    setSubmitted({
      start: start || fiscalYear.start_date || undefined,
      end: end || fiscalYear.end_date || undefined,
      departmentId: departmentId || undefined,
      incomeTypeId: incomeTypeId || undefined,
      incomeSubTypeId: incomeSubTypeId || undefined,
      fiscalYearId: fiscalYear.id,
    })
  }, [start, end, departmentId, incomeTypeId, incomeSubTypeId, fiscalYear?.id])

  const resolvedFilters = {
    ...filters,
    start: start || fiscalYear?.start_date || undefined,
    end: end || fiscalYear?.end_date || undefined,
    fiscalYearId: fiscalYear?.id,
  }

  const { data: departmentsData = [] } = useQuery({
    queryKey: ["pIncomeDepartments"],
    queryFn: listDepartments,
    refetchOnMount: "always",
    staleTime: 0,
  })
  const departments = ensureArray<any>(departmentsData)

  const { data: incomeTypesData = [], isFetching: typesLoading } = useQuery({
    queryKey: ["pIncomeTypes", departmentId ?? null],
    queryFn: () => listPIncomeTypes(departmentId),
    refetchOnMount: "always",
    staleTime: 0,
  })
  const incomeTypes = ensureArray<any>(incomeTypesData)

  const { data: incomeSubTypesData = [], isFetching: subTypesLoading } = useQuery({
    queryKey: ["pIncomeSubTypes", incomeTypeId ?? null],
    queryFn: () => listPIncomeSubTypes(Number(incomeTypeId)),
    enabled: !!incomeTypeId,
    refetchOnMount: "always",
    staleTime: 0,
  })
  const incomeSubTypes = ensureArray<any>(incomeSubTypesData)

  const reportQuery = useIncomeReport(submitted)
  const rows = ensureArray<any>(reportQuery.data?.rows)
  const totals = reportQuery.data?.totals ?? { real: 0, projected: 0, difference: 0 }

  const handlePreviewPDF = () => previewIncomeReportPDF(resolvedFilters)
  const handleDownloadPDF = () => downloadIncomeReportPDF(resolvedFilters)
  const handleExcelComparativo = () => downloadIncomeCompareExcel(resolvedFilters)

  const departmentOptions = [
    { value: "", label: "Todos" },
    ...departments.map((d: any) => ({ value: d.id, label: d.name })),
  ]

  const typeOptions = [
    {
      value: "",
      label: !departmentId ? "Seleccione un departamento" : typesLoading ? "Cargando..." : "Todos",
    },
    ...incomeTypes.map((t: any) => ({ value: t.id, label: t.name })),
  ]

  const subTypeOptions = [
    {
      value: "",
      label: !incomeTypeId ? "Seleccione un tipo" : subTypesLoading ? "Cargando..." : "Todos",
    },
    ...incomeSubTypes.map((st: any) => ({ value: st.id, label: st.name })),
  ]

  const { page, setPage, totalPages, pagedItems, pageItems } = usePagination(
    rows,
    10,
    [start, end, departmentId, incomeTypeId, incomeSubTypeId, reportQuery.data]
  )

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Subtipo",
        cell: ({ row }) => (
          <span className="font-medium text-[#2F3A1C]">
            {row.original.name}
          </span>
        ),
        size: 320,
      },
      {
        accessorKey: "real",
        header: "Real",
        cell: ({ row }) => (
          <div className="text-left md:text-right tabular-nums text-[#3C4628]">
            {crc(Number(row.original.real))}
          </div>
        ),
        size: 180,
      },
      {
        accessorKey: "projected",
        header: "Proyectado",
        cell: ({ row }) => (
          <div className="text-left md:text-right tabular-nums font-semibold text-[#5B732E]">
            {crc(Number(row.original.projected))}
          </div>
        ),
        size: 180,
      },
      {
        accessorKey: "difference",
        header: "Diferencia",
        cell: ({ row }) => (
          <div className="text-left md:text-right tabular-nums font-semibold text-[#B38728]">
            {crc(Number(row.original.difference))}
          </div>
        ),
        size: 180,
      },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-[#F6F8F2] rounded-2xl">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#2F3A1C]">
                Reporte de ingresos proyectados
              </h1>
              <p className="text-sm text-[#6E7C55]">
                Comparativo proyectado vs real
              </p>
            </div>

            <div className="text-xs font-medium text-[#6E7C55]">
              Año fiscal:{" "}
              <span className="font-semibold text-[#33411B]">
                {fiscalYear?.year ?? "..."}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <KPICard
              label="Proyectado"
              value={crc(totals.projected)}
              tone="base"
            />
            <KPICard
              label="Real"
              value={crc(totals.real)}
              tone="base"
            />
            <KPICard
              label="Diferencia"
              value={crc(totals.difference)}
              tone="gold"
            />
          </div>

          <div className="rounded-2xl border border-[#E3EAD5] bg-white p-4 shadow-sm">
            <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="text-sm font-semibold text-[#2F3A1C]">
                Filtros
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handlePreviewPDF}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[#E8D7A8] bg-[#FFF9EA] px-3 text-xs font-semibold text-[#A27A1D] transition hover:bg-[#FFF2CF] disabled:opacity-60"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Ver PDF
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#C19A3D] px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#AF8A31] disabled:opacity-60"
                >
                  <Download className="h-3.5 w-3.5" />
                  PDF
                </button>

                <button
                  onClick={handleExcelComparativo}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#4F6B2D] px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#425926] disabled:opacity-60"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  Excel
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="xl:col-span-2">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6E7C55]">
                  Departamento
                </label>
                <CustomSelect
                  value={departmentId ?? ""}
                  onChange={(v) => {
                    const nextDept = v === "" ? undefined : Number(v)
                    setDepartmentId(nextDept)
                    setIncomeTypeId(undefined)
                    setIncomeSubTypeId(undefined)
                  }}
                  options={departmentOptions}
                  placeholder="Todos"
                  zIndex={50}
                  buttonClassName="h-10 rounded-xl text-sm"
                />
              </div>

              <div className="xl:col-span-2">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6E7C55]">
                  Tipo
                </label>
                <CustomSelect
                  value={incomeTypeId ?? ""}
                  onChange={(v) => {
                    const nextType = v === "" ? undefined : Number(v)
                    setIncomeTypeId(nextType)
                    setIncomeSubTypeId(undefined)
                  }}
                  options={typeOptions}
                  placeholder={!departmentId ? "Seleccione un departamento" : "Todos"}
                  disabled={!departmentId}
                  zIndex={40}
                  searchable
                  searchPlaceholder="Buscar tipo..."
                  buttonClassName="h-10 rounded-xl text-sm"
                />
              </div>

              <div className="xl:col-span-2">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6E7C55]">
                  Subtipo
                </label>
                <CustomSelect
                  value={incomeSubTypeId ?? ""}
                  onChange={(v) => setIncomeSubTypeId(v === "" ? undefined : Number(v))}
                  options={subTypeOptions}
                  placeholder={!incomeTypeId ? "Seleccione un tipo" : "Todos"}
                  disabled={!incomeTypeId}
                  zIndex={30}
                  searchable
                  searchPlaceholder="Buscar subtipo..."
                  buttonClassName="h-10 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6E7C55]">
                  Inicio
                </label>
                <BirthDatePicker
                  value={start}
                  onChange={(date) => setStart(date || undefined)}
                  placeholder="Seleccione fecha"
                  helperText=""
                  triggerClassName="h-10 rounded-xl border-[#E6E1D6] bg-white px-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6E7C55]">
                  Fin
                </label>
                <BirthDatePicker
                  value={end}
                  onChange={(date) => setEnd(date || undefined)}
                  minDate={start}
                  placeholder="Seleccione fecha"
                  helperText=""
                  triggerClassName="h-10 rounded-xl border-[#E6E1D6] bg-white px-3 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E3EAD5] bg-white p-3 shadow-sm">
            <GenericTable
              data={pagedItems}
              columns={columns}
              isLoading={reportQuery.isLoading}
              emptyMessage="No hay resultados para los filtros seleccionados."
            />

            {!reportQuery.isLoading && rows.length > 0 && totalPages > 1 && (
              <div className="mt-3 border-t border-[#EEF2E7] px-1 pt-3">
                <PaginationBar
                  page={page}
                  totalPages={totalPages}
                  pageItems={pageItems}
                  onPageChange={setPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}