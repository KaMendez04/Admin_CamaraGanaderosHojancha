import { useEffect, useMemo, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import {
  useSpendReport,
  useSpendReportExcel,
  useSpendReportPDF,
  type SpendReportNameFilters,
} from "../../../hooks/Budget/reports/useSpendReport"

import { CustomSelect } from "../../../components/CustomSelect"
import { GenericTable } from "../../../components/GenericTable"
import { KPICard } from "../../../components/KPICard"
import { SummaryListCard } from "../../../components/SummaryListCard"
import { usePagination, PaginationBar } from "../../../components/ui/pagination"
import { BirthDatePicker } from "@/components/ui/birthDayPicker"
import { useFiscalYear } from "@/hooks/Budget/useFiscalYear"
import { FileText, Download, FileSpreadsheet } from "lucide-react"

const crc = (n: number) =>
  new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0)

function uniqSorted(arr: string[]) {
  return Array.from(new Set(arr.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "es")
  )
}

export default function SpendReportPage() {
  const { current: fiscalYear } = useFiscalYear()

  const [start, setStart] = useState<string | undefined>()
  const [end, setEnd] = useState<string | undefined>()

  const [departmentName, setDepartmentName] = useState<string | undefined>()
  const [spendTypeName, setSpendTypeName] = useState<string | undefined>()
  const [spendSubTypeName, setSpendSubTypeName] = useState<string | undefined>()

  const [submitted, setSubmitted] = useState<SpendReportNameFilters | null>(null)

  const { data, isLoading } = useSpendReport(submitted)
  const pdfMutation = useSpendReportPDF()
  const excelMutation = useSpendReportExcel()
  const [isDownloading, setIsDownloading] = useState(false)

  const rows = data?.rows ?? []
  const totals: any = data?.totals ?? {}

  useEffect(() => {
    if (!fiscalYear) return
    setSubmitted({
      start: start || fiscalYear.start_date || undefined,
      end: end || fiscalYear.end_date || undefined,
      departmentName: departmentName || undefined,
      spendTypeName: spendTypeName || undefined,
      spendSubTypeName: spendSubTypeName || undefined,
    })
  }, [start, end, departmentName, spendTypeName, spendSubTypeName, fiscalYear?.id])

  useEffect(() => {
    setSpendTypeName(undefined)
    setSpendSubTypeName(undefined)
  }, [departmentName])

  useEffect(() => {
    setSpendSubTypeName(undefined)
  }, [spendTypeName])

  const departmentOptions = useMemo(() => {
    const depts = uniqSorted(rows.map((r: any) => String(r.department ?? "")))
    return [
      { value: "", label: "Todos" },
      ...depts.map((d) => ({ value: d, label: d })),
    ]
  }, [rows])

  const typeOptions = useMemo(() => {
    const filtered = departmentName
      ? rows.filter((r: any) => String(r.department ?? "") === departmentName)
      : rows
    const types = uniqSorted(filtered.map((r: any) => String(r.spendType ?? "")))
    return [
      { value: "", label: "Todos" },
      ...types.map((t) => ({ value: t, label: t })),
    ]
  }, [rows, departmentName])

  const subTypeOptions = useMemo(() => {
    const filtered = rows.filter((r: any) => {
      const deptOk = departmentName ? String(r.department ?? "") === departmentName : true
      const typeOk = spendTypeName ? String(r.spendType ?? "") === spendTypeName : true
      return deptOk && typeOk
    })
    const subs = uniqSorted(filtered.map((r: any) => String(r.spendSubType ?? "")))
    return [
      { value: "", label: "Todos" },
      ...subs.map((s) => ({ value: s, label: s })),
    ]
  }, [rows, departmentName, spendTypeName])

  const filteredRows = useMemo(() => {
    return rows.filter((r: any) => {
      const deptOk = departmentName ? String(r.department ?? "") === departmentName : true
      const typeOk = spendTypeName ? String(r.spendType ?? "") === spendTypeName : true
      const subOk = spendSubTypeName ? String(r.spendSubType ?? "") === spendSubTypeName : true
      return deptOk && typeOk && subOk
    })
  }, [rows, departmentName, spendTypeName, spendSubTypeName])

  const resolvedFilters = {
    start: start || fiscalYear?.start_date || undefined,
    end: end || fiscalYear?.end_date || undefined,
    departmentName: departmentName || undefined,
    spendTypeName: spendTypeName || undefined,
    spendSubTypeName: spendSubTypeName || undefined,
  }

  const handlePreviewPDF = async () => {
    await pdfMutation.mutateAsync({ ...resolvedFilters, preview: true })
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      await pdfMutation.mutateAsync({ ...resolvedFilters, preview: false })
    } finally {
      setTimeout(() => setIsDownloading(false), 1200)
    }
  }

  const handleDownloadExcel = async () => {
    await excelMutation.mutateAsync(resolvedFilters)
  }

  const { page, setPage, totalPages, pagedItems, pageItems } = usePagination(
    filteredRows,
    10,
    [start, end, departmentName, spendTypeName, spendSubTypeName, rows]
  )

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "department",
        header: "Departamento",
        cell: ({ row }) => (
          <span className="font-medium text-[#2F3A1C]">
            {row.original.department || "—"}
          </span>
        ),
        size: 180,
      },
      {
        accessorKey: "spendType",
        header: "Tipo",
        cell: ({ row }) => (
          <span className="font-medium text-[#2F3A1C]">
            {row.original.spendType || "—"}
          </span>
        ),
        size: 220,
      },
      {
        accessorKey: "spendSubType",
        header: "Subtipo",
        cell: ({ row }) => (
          <span className="font-medium text-[#2F3A1C]">
            {row.original.spendSubType || "—"}
          </span>
        ),
        size: 260,
      },
      {
        accessorKey: "date",
        header: "Fecha",
        cell: ({ row }) => (
          <span className="text-[#3C4628]">
            {row.original?.date
              ? new Date(row.original.date).toLocaleDateString("es-CR")
              : "—"}
          </span>
        ),
        size: 80,
      },
      {
        accessorKey: "amount",
        header: "Monto",
        cell: ({ row }) => (
          <div className="text-left md:text-right font-semibold tabular-nums text-[#5B732E]">
            {crc(Number(row.original.amount ?? 0))}
          </div>
        ),
        size: 170,
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
                Reporte de egresos
              </h1>
              <p className="text-sm text-[#6E7C55]">
                Consulta general de egresos registrados
              </p>
            </div>

            <div className="text-xs font-medium text-[#6E7C55]">
              Año fiscal:{" "}
              <span className="font-semibold text-[#33411B]">
                {fiscalYear?.year ?? "..."}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <KPICard
              label="Total egresos"
              value={crc(totals?.total ?? 0)}
              tone="base"
            />

            <SummaryListCard
              title="Por departamento"
              tone="base"
              items={(totals?.byDepartment ?? []).map((r: any) => ({
                label: r.department,
                value: crc(r.total),
              }))}
              maxItems={4}
            />

            <SummaryListCard
              title="Por tipo"
              tone="gold"
              items={(totals?.byType ?? []).map((r: any) => ({
                label: r.type,
                value: crc(r.total),
              }))}
              maxItems={4}
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
                  disabled={pdfMutation.isPending || isDownloading}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[#E8D7A8] bg-[#FFF9EA] px-3 text-xs font-semibold text-[#A27A1D] transition hover:bg-[#FFF2CF] disabled:opacity-60"
                >
                  <FileText className="h-3.5 w-3.5" />
                  {pdfMutation.isPending && !isDownloading ? "Abriendo..." : "Ver PDF"}
                </button>

                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#C19A3D] px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#AF8A31] disabled:opacity-60"
                >
                  <Download className="h-3.5 w-3.5" />
                  {isDownloading ? "Descargando..." : "PDF"}
                </button>

                <button
                  onClick={handleDownloadExcel}
                  disabled={excelMutation.isPending}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#4F6B2D] px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#425926] disabled:opacity-60"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  {excelMutation.isPending ? "Generando..." : "Excel"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="xl:col-span-2">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6E7C55]">
                  Departamento
                </label>
                <CustomSelect
                  value={departmentName ?? ""}
                  onChange={(v) => setDepartmentName(v === "" ? undefined : String(v))}
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
                  value={spendTypeName ?? ""}
                  onChange={(v) => setSpendTypeName(v === "" ? undefined : String(v))}
                  options={typeOptions}
                  placeholder="Todos"
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
                  value={spendSubTypeName ?? ""}
                  onChange={(v) => setSpendSubTypeName(v === "" ? undefined : String(v))}
                  options={subTypeOptions}
                  placeholder="Todos"
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
              isLoading={isLoading}
              emptyMessage="No hay resultados para los filtros seleccionados."
            />

            {!isLoading && filteredRows.length > 0 && totalPages > 1 && (
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