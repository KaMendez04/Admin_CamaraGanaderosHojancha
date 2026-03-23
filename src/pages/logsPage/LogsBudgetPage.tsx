import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"

import {
  buildChangeSummary,
  formatDateTime,
  getActionBadgeClass,
  getActionLabel,
  getEntityLabel,
} from "@/utils/auditLogUtils"
import { LogsFilters, type LogsFiltersValue } from "../../components/logsComponents/LogsFilters"
import type { AuditLog } from "@/models/logsModel/AuditLog"
import { useAuditLogs } from "@/hooks/logsHooks/useAuditLogs"
import { ActionButtons } from "../../components/ActionButtons"
import { GenericTable } from "../../components/GenericTable"
import { PaginationBar, usePagination } from "../../components/ui/pagination"
import { AuditLogDetailModal } from "../../components/logsComponents/AuditLogDetailModal"

function buildApiFilters(filters: LogsFiltersValue) {
  const params: Record<string, any> = {}

  if (filters.entityType !== "ALL") params.entityType = filters.entityType
  if (filters.actionType !== "ALL") params.actionType = filters.actionType
  if (filters.from) params.from = filters.from
  if (filters.to) params.to = filters.to

  if (filters.module === "REAL") params.budgetScope = "REAL"
  if (filters.module === "PROJECTED") params.budgetScope = "PROJECTED"
  if (filters.module === "EXTRAORDINARY") params.budgetScope = "EXTRAORDINARY"
  if (filters.module === "USERS") params.entityType = "USER"

  return params
}

export default function LogsPage() {
  const [filters, setFilters] = React.useState<LogsFiltersValue>({
    search: "",
    module: "ALL",
    entityType: "ALL",
    actionType: "ALL",
    from: "",
    to: "",
  })

  const [selectedLog, setSelectedLog] = React.useState<AuditLog | null>(null)

  const apiFilters = React.useMemo(() => buildApiFilters(filters), [filters])
  const { data = [], isLoading } = useAuditLogs(apiFilters)

  const visibleRows = React.useMemo(() => {
    if (!filters.search.trim()) return data
    const q = filters.search.trim().toLowerCase()
    return data.filter((row) => {
      const text =
        `${row.actorUser?.username ?? ""} ${row.actorUser?.email ?? ""} ${row.description ?? ""} ${getEntityLabel(row.entityType)} ${getActionLabel(row.actionType)} ${row.entityId}`.toLowerCase()
      return text.includes(q)
    })
  }, [data, filters.search])

  const { page, setPage, totalPages, pagedItems, pageItems } = usePagination(
    visibleRows,
    10,
    [filters.search, filters.module, filters.entityType, filters.actionType, filters.from, filters.to]
  )

  const columns = React.useMemo<ColumnDef<AuditLog>[]>(
    () => [
      {
        accessorKey: "createdAt",
        header: "Fecha",
        size: 160,
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-xs text-slate-500">
            {formatDateTime(row.original.createdAt)}
          </span>
        ),
      },
      {
        id: "actor",
        header: "Usuario",
        size: 180,
        cell: ({ row }) => (
          <div>
            <div className="text-sm font-medium text-slate-800 leading-tight">
              {row.original.actorUser?.username ?? "Sistema"}
            </div>
            <div className="text-xs text-slate-400 leading-tight mt-0.5">
              {row.original.actorUser?.email ?? "—"}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "entityType",
        header: "Módulo",
        size: 140,
        cell: ({ row }) => (
          <span className="text-sm text-slate-700">
            {getEntityLabel(row.original.entityType)}
          </span>
        ),
      },
      {
        accessorKey: "actionType",
        header: "Acción",
        size: 130,
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${getActionBadgeClass(row.original.actionType)}`}
          >
            {getActionLabel(row.original.actionType)}
          </span>
        ),
      },
      {
        id: "summary",
        header: "Descripción",
        cell: ({ row }) => (
          <span
            className="block max-w-[300px] truncate text-sm text-slate-500"
            title={buildChangeSummary(row.original)}
          >
            {buildChangeSummary(row.original)}
          </span>
        ),
      },
      {
        id: "detail",
        header: () => <div className="text-center">Detalle</div>,
        size: 80,
        cell: ({ row }) => (
          <div className="flex justify-center">
            <ActionButtons
              size="sm"
              onView={() => setSelectedLog(row.original)}
              showText={false}
            />
          </div>
        ),
      },
    ],
    []
  )

  const clearFilters = () => {
    setFilters({
      search: "",
      module: "ALL",
      entityType: "ALL",
      actionType: "ALL",
      from: "",
      to: "",
    })
    setPage(1)
  }

  return (
    <>
      <div className="space-y-4">
                <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg font-bold text-[#2E321B]">Registros de Presupuesto</h2>
              <p className="text-xs text-[#7A8C5A] mt-0.5">
                {visibleRows.length} resultado{visibleRows.length !== 1 ? "s" : ""} encontrado{visibleRows.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        <LogsFilters
          value={filters}
          onChange={(value) => {
            setFilters(value)
            setPage(1)
          }}
          onClear={clearFilters}
        />

          <div className="overflow-hidden rounded-2xl border border-[#E2DDD4] bg-white shadow-sm">
            <GenericTable<AuditLog>
              data={pagedItems}
              columns={columns}
              isLoading={isLoading}
            />

            {!isLoading && totalPages > 1 && (
              <div className="border-t border-[#EDE9E2] px-5 py-3">
                <PaginationBar
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  pageItems={pageItems}
                  className="justify-center"
                />
              </div>
            )}
          </div>
        </section>
      </div>

      <AuditLogDetailModal
        open={!!selectedLog}
        onOpenChange={(open) => !open && setSelectedLog(null)}
        log={selectedLog}
      />
    </>
  )
}