import { useEffect, useMemo, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import {
  useExtraReport,
  useExtraReportExcel,
} from "../../../hooks/Budget/reports/useExtraReport"
import {
  downloadExtraReportPDF,
  previewExtraReportPDF,
} from "../../../services/Budget/reportsExtra/extraReportService"

import { GenericTable } from "../../../components/GenericTable"
import { KPICard } from "../../../components/KPICard"
import { usePagination, PaginationBar } from "../../../components/ui/pagination"
import { BirthDatePicker } from "@/components/ui/birthDayPicker"
import { useFiscalYear } from "@/hooks/Budget/useFiscalYear"
import { FileText, Download, FileSpreadsheet, Search } from "lucide-react"

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 2,
  }).format(n || 0)

export default function ExtraReportPage() {
  const { current: fiscalYear } = useFiscalYear()

  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [name, setName] = useState("")

  const [submitted, setSubmitted] = useState<{
    start?: string
    end?: string
    name?: string
  } | null>(null)

  const [isDownloading, setIsDownloading] = useState(false)

  const { data, isFetching, isLoading } = useExtraReport(submitted)
  const rows = data?.rows ?? []
  const totals = data?.totals ?? {
    count: 0,
    totalAmount: 0,
    totalUsed: 0,
    totalRemaining: 0,
  }

  const excelMutation = useExtraReportExcel()

  useEffect(() => {
    if (!fiscalYear) return
    setSubmitted({
      start: start || fiscalYear.start_date || undefined,
      end: end || fiscalYear.end_date || undefined,
      name: name || undefined,
    })
  }, [start, end, name, fiscalYear?.id])

  useEffect(() => {
    if (start && end && end < start) setEnd("")
  }, [start, end])

  const resolvedFilters = {
    start: start || fiscalYear?.start_date || undefined,
    end: end || fiscalYear?.end_date || undefined,
    name: name || undefined,
  }

  const handlePreviewPDF = async () => {
    await previewExtraReportPDF(resolvedFilters)
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      await downloadExtraReportPDF(resolvedFilters)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleDownloadExcel = async () => {
    await excelMutation.mutateAsync(resolvedFilters)
  }

  const { page, setPage, totalPages, pagedItems, pageItems } = usePagination(
    rows,
    10,
    [start, end, name, data]
  )

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => (
          <span className="font-medium text-[#2F3A1C]">
            {row.original.name || "—"}
          </span>
        ),
        size: 260,
      },
      {
        accessorKey: "amount",
        header: "Monto",
        cell: ({ row }) => (
          <div className="text-left md:text-right font-semibold tabular-nums text-[#5B732E]">
            {fmt(Number(row.original.amount ?? 0))}
          </div>
        ),
        size: 170,
      },
      {
        accessorKey: "used",
        header: "Usado",
        cell: ({ row }) => (
          <div className="text-left md:text-right tabular-nums text-[#3C4628]">
            {fmt(Number(row.original.used ?? 0))}
          </div>
        ),
        size: 170,
      },
      {
        accessorKey: "remaining",
        header: "Restante",
        cell: ({ row }) => (
          <div className="text-left md:text-right font-semibold tabular-nums text-[#B38728]">
            {fmt(Number(row.original.remaining ?? 0))}
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
                Reporte de extraordinarios
              </h1>
              <p className="text-sm text-[#6E7C55]">
                Consulta general de fondos extraordinarios
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
              label="Total"
              value={fmt(totals.totalAmount)}
              tone="base"
            />
            <KPICard
              label="Usado"
              value={fmt(totals.totalUsed)}
              tone="base"
            />
            <KPICard
              label="Restante"
              value={fmt(totals.totalRemaining)}
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
                  disabled={isFetching}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[#E8D7A8] bg-[#FFF9EA] px-3 text-xs font-semibold text-[#A27A1D] transition hover:bg-[#FFF2CF] disabled:opacity-60"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Ver PDF
                </button>

                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading || isFetching}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#C19A3D] px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#AF8A31] disabled:opacity-60"
                >
                  <Download className="h-3.5 w-3.5" />
                  {isDownloading ? "Descargando..." : "PDF"}
                </button>

                <button
                  onClick={handleDownloadExcel}
                  disabled={excelMutation.isPending || isFetching}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#4F6B2D] px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#425926] disabled:opacity-60"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  {excelMutation.isPending ? "Generando..." : "Excel"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              <div className="xl:col-span-1">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6E7C55]">
                  Nombre
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9BAD78]" />
                  <input
                    placeholder="Buscar por nombre..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[#E6E1D6] bg-white pl-9 pr-3 text-sm text-[#33361D] placeholder:text-gray-400 shadow-sm outline-none transition focus:border-[#5B732E] focus:ring-2 focus:ring-[#5B732E]/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6E7C55]">
                  Inicio
                </label>
                <BirthDatePicker
                  value={start}
                  onChange={(date) => setStart(date)}
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
                  onChange={(date) => setEnd(date)}
                  minDate={start || undefined}
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
              isLoading={isLoading && !data}
              emptyMessage="No hay resultados para los filtros seleccionados."
            />

            {!isFetching && rows.length > 0 && totalPages > 1 && (
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