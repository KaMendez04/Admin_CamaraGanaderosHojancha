import { useEffect, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import type { ColumnDef } from "@tanstack/react-table"
import { pSpendService } from "../../../services/Budget/reportsPSpend/pSpendReportService"
import { CustomSelect } from "../../../components/CustomSelect"
import { GenericTable } from "../../../components/GenericTable"
import { KPICard } from "../../../components/KPICard"
import { usePagination, PaginationBar } from "../../../components/ui/pagination"
import { BirthDatePicker } from "@/components/ui/birthDayPicker"
import { useFiscalYear } from "@/hooks/Budget/useFiscalYear"
import { FileText, Download, FileSpreadsheet } from "lucide-react"

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

export default function PSpendProjectionsPage() {
  const { current: fiscalYear } = useFiscalYear()

  const [submitted, setSubmitted] = useState<any>(null)
  const [start, setStart] = useState<string | undefined>()
  const [end, setEnd] = useState<string | undefined>()
  const [departmentId, setDepartmentId] = useState<number | undefined>()
  const [spendTypeId, setSpendTypeId] = useState<number | undefined>()
  const [spendSubTypeId, setSpendSubTypeId] = useState<number | undefined>()

  useEffect(() => {
    if (!fiscalYear) return
    setSubmitted({
      start: start || fiscalYear.start_date || undefined,
      end: end || fiscalYear.end_date || undefined,
      departmentId: departmentId || undefined,
      spendTypeId: spendTypeId || undefined,
      spendSubTypeId: spendSubTypeId || undefined,
      fiscalYearId: fiscalYear.id,
    })
  }, [start, end, departmentId, spendTypeId, spendSubTypeId, fiscalYear?.id])

  const resolvedFilters = {
    start: start || fiscalYear?.start_date || undefined,
    end: end || fiscalYear?.end_date || undefined,
    departmentId,
    spendTypeId,
    spendSubTypeId,
    fiscalYearId: fiscalYear?.id,
  }

  const { data: departmentsData = [], isFetching: depsLoading } = useQuery({
    queryKey: ["pSpendDepartments"],
    queryFn: pSpendService.listDepartments,
    refetchOnMount: "always",
    staleTime: 0,
  })
  const departments = ensureArray<any>(departmentsData)

  const { data: typesData = [], isFetching: typesLoading } = useQuery({
    queryKey: ["pSpendTypes", departmentId ?? null],
    queryFn: () => pSpendService.listSpendTypes(departmentId),
    enabled: !!departmentId,
    refetchOnMount: "always",
    staleTime: 0,
  })
  const spendTypes = ensureArray<any>(typesData).map((t: any) => ({
    id: t.id ?? t.spendTypeId,
    name: t.name ?? t.spendTypeName,
  }))

  const { data: subTypesData = [], isFetching: subTypesLoading } = useQuery({
    queryKey: ["pSpendSubTypes", spendTypeId ?? null],
    queryFn: () => pSpendService.listSpendSubTypes(spendTypeId),
    enabled: !!spendTypeId,
    refetchOnMount: "always",
    staleTime: 0,
  })
  const spendSubTypes = ensureArray<any>(subTypesData).map((st: any) => ({
    id: st.id ?? st.spendSubTypeId,
    name: st.name ?? st.spendSubTypeName,
  }))

  useEffect(() => {
    setSpendTypeId(undefined)
    setSpendSubTypeId(undefined)
  }, [departmentId])

  useEffect(() => {
    setSpendSubTypeId(undefined)
  }, [spendTypeId])

  const { data: reportData, isFetching: reportLoading } = useQuery({
    queryKey: ["pSpendCompareReport", submitted],
    queryFn: () => pSpendService.getSpendReport(submitted),
    enabled: submitted !== null,
  })

  const rows = ensureArray<any>(reportData?.rows)
  const totals = reportData?.totals ?? { real: 0, projected: 0, difference: 0 }

  const handlePreviewPDF = () => pSpendService.previewSpendComparePDF(resolvedFilters)
  const handleDownloadPDF = () => pSpendService.downloadSpendComparePDF(resolvedFilters)
  const handleExcelComparativo = () => pSpendService.downloadSpendCompareExcel(resolvedFilters)

  const departmentOptions = [
    { value: "", label: depsLoading ? "Cargando..." : "Todos" },
    ...departments.map((d: any) => ({
      value: d.id ?? d.departmentId,
      label: d.name ?? d.departmentName,
    })),
  ]

  const typeOptions = [
    {
      value: "",
      label: !departmentId ? "Seleccione un departamento" : typesLoading ? "Cargando..." : "Todos",
    },
    ...spendTypes.map((t) => ({ value: t.id, label: t.name })),
  ]

  const subTypeOptions = [
    {
      value: "",
      label: !spendTypeId ? "Seleccione un tipo" : subTypesLoading ? "Cargando..." : "Todos",
    },
    ...spendSubTypes.map((st) => ({ value: st.id, label: st.name })),
  ]

  const { page, setPage, totalPages, pagedItems, pageItems } = usePagination(
    rows,
    10,
    [start, end, departmentId, spendTypeId, spendSubTypeId, reportData]
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
                Reporte de egresos proyectados
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
                    setSpendTypeId(undefined)
                    setSpendSubTypeId(undefined)
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
                  value={spendTypeId ?? ""}
                  onChange={(v) => {
                    const nextType = v === "" ? undefined : Number(v)
                    setSpendTypeId(nextType)
                    setSpendSubTypeId(undefined)
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
                  value={spendSubTypeId ?? ""}
                  onChange={(v) => setSpendSubTypeId(v === "" ? undefined : Number(v))}
                  options={subTypeOptions}
                  placeholder={!spendTypeId ? "Seleccione un tipo" : "Todos"}
                  disabled={!spendTypeId}
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
              isLoading={reportLoading}
              emptyMessage="No hay resultados para los filtros seleccionados."
            />

            {!reportLoading && rows.length > 0 && totalPages > 1 && (
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