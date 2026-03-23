import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { formatDateTime, getActionBadgeClass, getActionLabel } from "@/utils/auditLogUtils"
import { LogsUsersFilters, type LogsUsersFiltersValue } from "../../components/logsComponents/LogsUsersFilters"
import type { AuditUsersLog } from "@/models/logsModel/AuditUsersLog"
import { useAuditUsersLogs } from "@/hooks/logsHooks/useAuditUsersLogs"
import { GenericTable } from "../../components/GenericTable"
import { PaginationBar, usePagination } from "../../components/ui/pagination"
import { AuditUsersLogDetailModal } from "../../components/logsComponents/AuditUsersLogDetailModal"
import { ActionButtons } from "../../components/ActionButtons"

function buildApiFilters(filters: LogsUsersFiltersValue) {
  const params: Record<string, any> = {}
  if (filters.actionType !== "ALL") params.actionType = filters.actionType
  if (filters.from) params.from = filters.from
  if (filters.to) params.to = filters.to
  return params
}

function buildUserChangeSummary(row: AuditUsersLog): string {
  if (!row.snapshotBefore || !row.snapshotAfter) return row.description ?? "Sin detalle"

  const changes: string[] = []
  const b = row.snapshotBefore
  const a = row.snapshotAfter

  if (b.username !== a.username) changes.push(`Nombre: ${b.username ?? "—"} → ${a.username ?? "—"}`)
  if (b.email !== a.email) changes.push(`Correo: ${b.email ?? "—"} → ${a.email ?? "—"}`)
  if (b.isActive !== a.isActive) changes.push(`Estado: ${b.isActive ? "Activo" : "Inactivo"} → ${a.isActive ? "Activo" : "Inactivo"}`)
  if (b.roleId !== a.roleId) changes.push(`Rol: ${b.roleId ?? "—"} → ${a.roleId ?? "—"}`)

  return changes.length > 0 ? changes.join(" | ") : row.description ?? "Sin detalle adicional"
}

export default function LogsUsersPage() {
  const [filters, setFilters] = React.useState<LogsUsersFiltersValue>({
    search: "",
    actionType: "ALL",
    from: "",
    to: "",
  })

  const [selectedLog, setSelectedLog] = React.useState<AuditUsersLog | null>(null)
  const apiFilters = React.useMemo(() => buildApiFilters(filters), [filters])
  const { data = [], isLoading } = useAuditUsersLogs(apiFilters)

  const visibleRows = React.useMemo(() => {
    if (!filters.search.trim()) return data
    const q = filters.search.trim().toLowerCase()
    return data.filter((row) => {
      const text = `
        ${row.actorUser?.username ?? ""}
        ${row.actorUser?.email ?? ""}
        ${row.targetUser?.username ?? ""}
        ${row.targetUser?.email ?? ""}
        ${row.description ?? ""}
        ${getActionLabel(row.actionType)}
      `.toLowerCase()
      return text.includes(q)
    })
  }, [data, filters.search])

  const { page, setPage, totalPages, pagedItems, pageItems } = usePagination(
    visibleRows,
    10,
    [filters.search, filters.actionType, filters.from, filters.to],
  )

  const columns = React.useMemo<ColumnDef<AuditUsersLog>[]>(
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
        header: "Realizado por",
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
        id: "target",
        header: "Usuario afectado",
        size: 180,
        cell: ({ row }) => (
          <div>
            <div className="text-sm font-medium text-slate-800 leading-tight">
              {row.original.targetUser?.username ?? "—"}
            </div>
            <div className="text-xs text-slate-400 leading-tight mt-0.5">
              {row.original.targetUser?.email ?? "—"}
            </div>
          </div>
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
            className="block max-w-[280px] truncate text-sm text-slate-500"
            title={buildUserChangeSummary(row.original)}
          >
            {buildUserChangeSummary(row.original)}
          </span>
        ),
      },
      {
        id: "acciones",
        header: () => <div className="text-center">Acciones</div>,
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
    setFilters({ search: "", actionType: "ALL", from: "", to: "" })
    setPage(1)
  }

  return (
    <>
      <div className="space-y-4">
         <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg font-bold text-[#2E321B]">Registros de Usuarios</h2>
              <p className="text-xs text-[#7A8C5A] mt-0.5">
                {visibleRows.length} resultado{visibleRows.length !== 1 ? "s" : ""} encontrado{visibleRows.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        <LogsUsersFilters
          value={filters}
          onChange={(value) => {
            setFilters(value)
            setPage(1)
          }}
          onClear={clearFilters}
        />

       

          <div className="overflow-hidden rounded-2xl border border-[#E2DDD4] bg-white shadow-sm">
            <GenericTable<AuditUsersLog>
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

      <AuditUsersLogDetailModal
        open={!!selectedLog}
        onOpenChange={(open) => !open && setSelectedLog(null)}
        log={selectedLog}
      />
    </>
  )
}