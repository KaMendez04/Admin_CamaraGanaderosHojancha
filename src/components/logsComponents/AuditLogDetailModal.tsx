import { CalendarDays, FileText, ShieldCheck, X, History } from "lucide-react"
import type { AuditLog } from "@/models/logsModel/AuditLog"
import {
  formatDateTime,
  formatMoney,
  getActionBadgeClass,
  getActionLabel,
  getEntityLabel,
  getModuleLabel,
} from "@/utils/auditLogUtils"

interface AuditLogDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  log?: AuditLog | null
}

export function AuditLogDetailModal({ open, onOpenChange, log }: AuditLogDetailModalProps) {
  if (!open || !log) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onOpenChange(false)}
    >
      <div className="bg-white border border-[#E2DDD4] rounded-2xl shadow-2xl w-full max-w-5xl max-h-[88vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#EDE9E2] bg-[#FAFAF8]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EBF0DC] text-[#5B732E]">
              <History className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#2E321B] leading-tight">
                Detalle del registro #{log.id}
              </h2>
              <p className="text-xs text-[#7A8C5A] mt-0.5 leading-tight">
                Bitácora de cambios del sistema
              </p>
            </div>
          </div>

          {/* Badges inline en el header */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <span className="inline-flex rounded-full bg-[#EBF0DC] px-2.5 py-0.5 text-[11px] font-semibold text-[#5B732E]">
              {getModuleLabel(log)}
            </span>
            <span className="inline-flex rounded-full bg-[#F0F0F0] px-2.5 py-0.5 text-[11px] font-semibold text-[#374321]">
              {getEntityLabel(log.entityType)}
            </span>
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${getActionBadgeClass(log.actionType)}`}>
              {getActionLabel(log.actionType)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2DDD4] bg-white text-[#7A8C5A] transition hover:bg-[#F4F8EF] hover:text-[#374321]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Badges mobile */}
        <div className="sm:hidden flex flex-wrap items-center gap-1.5 px-5 py-2.5 border-b border-[#EDE9E2] bg-[#FAFAF8]">
          <span className="inline-flex rounded-full bg-[#EBF0DC] px-2.5 py-0.5 text-[11px] font-semibold text-[#5B732E]">
            {getModuleLabel(log)}
          </span>
          <span className="inline-flex rounded-full bg-[#F0F0F0] px-2.5 py-0.5 text-[11px] font-semibold text-[#374321]">
            {getEntityLabel(log.entityType)}
          </span>
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${getActionBadgeClass(log.actionType)}`}>
            {getActionLabel(log.actionType)}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

          {/* Info general + Cambios detectados */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <SectionCard icon={<FileText className="h-3.5 w-3.5 text-[#708C3E]" />} title="Información general">
              <DetailRow label="Fecha"            value={formatDateTime(log.createdAt)} />
              <DetailRow label="Usuario"          value={log.actorUser?.username ?? "Sistema"} />
              <DetailRow label="Entidad"          value={getEntityLabel(log.entityType)} />
              <DetailRow label="Acción"           value={getActionLabel(log.actionType)} />
              <DetailRow label="Módulo"           value={getModuleLabel(log)} />
              <DetailRow label="Registro"         value={`#${log.entityId}`} />
              {log.description && (
                <DetailRow label="Descripción"    value={log.description} />
              )}
            </SectionCard>

            <SectionCard icon={<ShieldCheck className="h-3.5 w-3.5 text-[#708C3E]" />} title="Cambios detectados">
              <ChangesGrid log={log} />
            </SectionCard>
          </div>

          {/* Snapshots */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <SnapshotCard
              title="Snapshot anterior"
              data={log.snapshotBefore}
              compareWith={log.snapshotAfter}
            />
            <SnapshotCard
              title="Snapshot nuevo"
              data={log.snapshotAfter}
              compareWith={log.snapshotBefore}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Sección card ─────────────────────────────────────────── */
function SectionCard({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-[#E8E4DC] bg-[#FAFAF8] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#EDE9E2] bg-white">
        {icon}
        <span className="text-xs font-bold text-[#374321] uppercase tracking-wide">{title}</span>
      </div>
      <div className="px-4 py-3 space-y-0 divide-y divide-[#F0EDE8]">
        {children}
      </div>
    </div>
  )
}

/* ─── Detail row compacto ──────────────────────────────────── */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3 py-2">
      <span className="w-28 shrink-0 text-[10px] font-semibold uppercase tracking-wider text-[#7A8C5A]">
        {label}
      </span>
      <span className="text-sm text-[#33361D] break-words min-w-0">{value}</span>
    </div>
  )
}

/* ─── Grid de cambios (oculta vacíos) ──────────────────────── */
function ChangesGrid({ log }: { log: AuditLog }) {
  const changes: { label: string; value: string }[] = []

  const oldAmount = formatMoney(log.oldAmount)
  const newAmount = formatMoney(log.newAmount)
  if (oldAmount !== "—" || newAmount !== "—")
    changes.push({ label: "Monto", value: `${oldAmount} → ${newAmount}` })

  const oldUsed = formatMoney(log.oldUsed)
  const newUsed = formatMoney(log.newUsed)
  if (oldUsed !== "—" || newUsed !== "—")
    changes.push({ label: "Usado", value: `${oldUsed} → ${newUsed}` })

  if (log.oldDate || log.newDate)
    changes.push({ label: "Fecha", value: `${log.oldDate ?? "—"} → ${log.newDate ?? "—"}` })

  if (log.oldName || log.newName)
    changes.push({ label: "Nombre", value: `${log.oldName ?? "—"} → ${log.newName ?? "—"}` })

  if (log.subTypeTable)
    changes.push({ label: "Subtipo", value: humanizeSubType(log.subTypeTable) })

  if (log.subTypeId)
    changes.push({ label: "Id subtipo", value: String(log.subTypeId) })

  if (changes.length === 0) {
    return (
      <p className="py-3 text-sm text-[#A0A0A0]">
        {log.description ?? "Sin cambios registrados"}
      </p>
    )
  }

  return (
    <div className="space-y-0 divide-y divide-[#F0EDE8]">
      {changes.map((c) => (
        <DetailRow key={c.label} label={c.label} value={c.value} />
      ))}
    </div>
  )
}

/* ─── Snapshot card ────────────────────────────────────────── */
function SnapshotCard({
  title,
  data,
  compareWith,
}: {
  title: string
  data?: Record<string, any> | null
  compareWith?: Record<string, any> | null
}) {
  const entries = Object.entries(data ?? {})

  return (
    <div className="rounded-xl border border-[#E8E4DC] bg-[#FAFAF8] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#EDE9E2] bg-white">
        <CalendarDays className="h-3.5 w-3.5 text-[#708C3E]" />
        <span className="text-xs font-bold text-[#374321] uppercase tracking-wide">{title}</span>
      </div>

      {!data || entries.length === 0 ? (
        <p className="px-4 py-4 text-sm text-[#A0A0A0]">Sin datos</p>
      ) : (
        <div className="divide-y divide-[#F0EDE8]">
          {entries.map(([key, value]) => {
            const changed = compareWith && compareWith[key] !== value
            const displayValue = formatSnapshotValue(key, value)

            return (
              <div
                key={key}
                className={`flex items-baseline gap-3 px-4 py-2 ${
                  changed ? "bg-[#FFFBF0]" : ""
                }`}
              >
                <span className={`w-36 shrink-0 text-[10px] font-semibold uppercase tracking-wider ${
                  changed ? "text-[#9B7A29]" : "text-[#7A8C5A]"
                }`}>
                  {humanizeSnapshotKey(key)}
                </span>
                <span className={`text-sm break-words min-w-0 ${
                  changed ? "font-medium text-[#33361D]" : "text-[#5A5A5A]"
                }`}>
                  {displayValue}
                </span>
                {changed && (
                  <span className="ml-auto shrink-0 inline-flex h-4 items-center rounded-full bg-[#F5E8B0] px-1.5 text-[9px] font-bold text-[#9B7A29] uppercase tracking-wider">
                    Cambio
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─── Helpers ──────────────────────────────────────────────── */
function humanizeSubType(value?: string | null) {
  switch (value) {
    case "income_sub_type":     return "Subtipo de ingreso real"
    case "spend_sub_type":      return "Subtipo de egreso real"
    case "p_income_sub_type":   return "Subtipo de ingreso proyectado"
    case "p_spend_sub_type":    return "Subtipo de egreso proyectado"
    default:                    return value ?? "—"
  }
}

function humanizeSnapshotKey(key: string) {
  const map: Record<string, string> = {
    date:             "Fecha",
    amount:           "Monto",
    used:             "Usado",
    name:             "Nombre",
    fiscalYearId:     "Año fiscal",
    incomeSubTypeId:  "Subtipo ingreso",
    spendSubTypeId:   "Subtipo egreso",
    pIncomeSubTypeId: "Subtipo ing. proy.",
    pSpendSubTypeId:  "Subtipo eg. proy.",
    createdAt:        "Creado",
    updatedAt:        "Actualizado",
  }
  return map[key] ?? key
}

function formatSnapshotValue(key: string, value: any) {
  if (value === null || value === undefined || value === "") return "—"
  if (key === "amount" || key === "used") {
    const f = formatMoney(String(value))
    return f === "—" ? String(value) : f
  }
  return String(value)
}