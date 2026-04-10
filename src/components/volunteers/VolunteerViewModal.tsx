import { useState } from "react"
import type { SolicitudVoluntariado } from "../../schemas/volunteerSchemas"
import { VolunteerIndividualInfo } from "./VolunteerIndividualInfo"
import { OrganizacionInfo } from "./OrganizacionInfo"
import { AreasInteresTab } from "./AreasInteresTab"
import { DisponibilidadTab } from "./DisponibilidadTab"
import { SolicitudStatusInfo } from "../SolicitudStatusInfo"
import { useDownloadVoluntarioDetallePDF } from "@/hooks/Volunteers/useVoluntariosPdf"
import { Download, FolderOpen, X, Clock, CheckCircle, XCircle, User, Building2 } from "lucide-react"
import {
  useSolicitudHasDocs,
  useSolicitudVoluntariadoDocsLink,
} from "@/hooks/Volunteers/useVolunteerDocsLink"
import { showErrorAlertEmpty } from "@/utils/alerts"
import { useLockBodyScroll } from "@/hooks/modals/useLockBodyScroll"
import { ActionButtons } from "../ActionButtons"

interface VolunteerViewModalProps {
  open: boolean
  onClose: () => void
  solicitud: SolicitudVoluntariado | null
  isLoading: boolean
}

type Tab = "info" | "areas" | "disponibilidad"

const STATUS_CONFIG = {
  PENDIENTE: {
    label: "Pendiente",
    sublabel: "En revisión",
    icon: Clock,
    pill: "bg-yellow-100 text-yellow-800",
    dot: "bg-yellow-500",
    bar: "bg-yellow-400",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-700",
  },
  APROBADO: {
    label: "Aprobada",
    sublabel: "Solicitud aceptada",
    icon: CheckCircle,
    pill: "bg-[#E6EDC8] text-[#5A7018]",
    dot: "bg-[#5A7018]",
    bar: "bg-[#5B732E]",
    iconBg: "bg-[#E6EDC8]",
    iconColor: "text-[#5B732E]",
  },
  RECHAZADO: {
    label: "Rechazada",
    sublabel: "Solicitud denegada",
    icon: XCircle,
    pill: "bg-[#F7E9E6] text-[#8C3A33]",
    dot: "bg-[#8C3A33]",
    bar: "bg-[#8C3A33]",
    iconBg: "bg-[#F7E9E6]",
    iconColor: "text-[#8C3A33]",
  },
} as const

export function VolunteerViewModal({
  open,
  onClose,
  solicitud,
  isLoading,
}: VolunteerViewModalProps) {
  const [selectedTab, setSelectedTab] = useState<Tab>("info")
  const openSolicitudPDF = useDownloadVoluntarioDetallePDF()
  const docsLinkMutation = useSolicitudVoluntariadoDocsLink()

  const idSolicitud = solicitud ? Number(solicitud.idSolicitudVoluntariado) : null

  // ✅ FIX: pasar `open` como segundo argumento para que el query solo se
  // dispare cuando el modal está abierto, no para cada fila de la tabla.
  const { data: hasDocs, isLoading: checkingDocs } = useSolicitudHasDocs(idSolicitud, open)

  const onOpenDocs = () => {
    if (!solicitud) return
    docsLinkMutation.mutate(Number(solicitud.idSolicitudVoluntariado), {
      onSuccess: (res: any) => {
        const url = res?.url ?? res?.link
        if (typeof url === "string" && url.length > 0) {
          window.open(url, "_blank", "noopener,noreferrer")
        } else {
          void showErrorAlertEmpty("No se pudo obtener el enlace de documentos")
        }
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || err?.message || "No se pudieron abrir los documentos"
        void showErrorAlertEmpty(Array.isArray(msg) ? msg.join(", ") : msg)
      },
    })
  }

  useLockBodyScroll(open)

  if (!open) return null

  const formatDate = (dateString: string) => {
    if (!dateString) return "—"
    const datePart = dateString.split("T")[0]
    const [year, month, day] = datePart.split("-").map(Number)
    const date = new Date(year, month - 1, day)
    return new Intl.DateTimeFormat("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  if (isLoading || !solicitud) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8" onClick={(e) => e.stopPropagation()}>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B732E]" />
            <p className="mt-4 text-[#556B2F] font-medium">Cargando detalles...</p>
          </div>
        </div>
      </div>
    )
  }

  const estadoKey = (solicitud.estado ?? "PENDIENTE") as keyof typeof STATUS_CONFIG
  const status = STATUS_CONFIG[estadoKey] ?? STATUS_CONFIG.PENDIENTE
  const StatusIcon = status.icon

  const isIndividual = solicitud.tipoSolicitante === "INDIVIDUAL"
  const nombreDisplay = isIndividual && solicitud.voluntario
    ? `${solicitud.voluntario.persona.nombre} ${solicitud.voluntario.persona.apellido1} ${solicitud.voluntario.persona.apellido2}`
    : solicitud.organizacion?.nombre ?? "—"

  const hasAreasInteres =
    (isIndividual && solicitud.voluntario?.areasInteres && solicitud.voluntario.areasInteres.length > 0) ||
    (!isIndividual && solicitud.organizacion?.areasInteres && solicitud.organizacion.areasInteres.length > 0)

  const hasDisponibilidad =
    (isIndividual && solicitud.voluntario?.disponibilidades && solicitud.voluntario.disponibilidades.length > 0) ||
    (!isIndividual && solicitud.organizacion?.disponibilidades && solicitud.organizacion.disponibilidades.length > 0)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── HEADER ── */}
        <div className="bg-gradient-to-r from-[#F8F9F3] to-[#EAEFE0] px-6 pt-5 pb-4 border-b border-[#EAEFE0]">

          {/* Row 1: icon + name + badges + close */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${status.iconBg}`}>
                <StatusIcon className={`w-4 h-4 ${status.iconColor}`} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#556B2F] uppercase tracking-wider mb-0.5">
                  Solicitud de voluntariado
                </p>
                <h3 className="text-xl font-bold text-[#33361D] leading-tight">{nombreDisplay}</h3>
                <p className="text-[11px] text-[#556B2F] mt-0.5">
                  {solicitud.fechaSolicitud ? formatDate(solicitud.fechaSolicitud) : "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${status.pill}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                isIndividual ? "bg-[#D4E8E0] text-[#2D5F4F]" : "bg-[#F5E6C5] text-[#8B6C2E]"
              }`}>
                {isIndividual ? <User className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                {isIndividual ? "Individual" : "Organización"}
              </span>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#556B2F] hover:bg-[#EAEFE0] transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Row 2: action buttons */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => openSolicitudPDF.mutate(Number(solicitud.idSolicitudVoluntariado))}
              disabled={openSolicitudPDF.isPending}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5B732E] text-white text-xs font-semibold hover:bg-[#556B2F] transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {openSolicitudPDF.isPending ? (
                <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />Generando...</>
              ) : (
                <><Download className="w-3 h-3" />Descargar PDF</>
              )}
            </button>

            {checkingDocs ? (
              <div className="h-7 w-32 rounded-lg bg-[#EAEFE0] animate-pulse" />
            ) : hasDocs ? (
              <button
                onClick={onOpenDocs}
                disabled={docsLinkMutation.isPending}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#33361D] text-white text-xs font-semibold hover:bg-[#2b2d18] transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {docsLinkMutation.isPending ? (
                  <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />Abriendo...</>
                ) : (
                  <><FolderOpen className="w-3 h-3" />Ver documentos</>
                )}
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EAEFE0] text-[#556B2F] text-xs font-medium">
                <FolderOpen className="w-3 h-3 opacity-50" />
                Sin documentos adjuntos
              </div>
            )}
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex border-b border-[#EAEFE0] px-6 bg-white">
          <button
            onClick={() => setSelectedTab("info")}
            className={`px-4 py-3 font-semibold text-sm transition ${
              selectedTab === "info" ? "text-[#5B732E] border-b-2 border-[#5B732E]" : "text-[#33361D] hover:text-[#5B732E]"
            }`}
          >
            Información General
          </button>
          {hasAreasInteres && (
            <button
              onClick={() => setSelectedTab("areas")}
              className={`px-4 py-3 font-semibold text-sm transition ${
                selectedTab === "areas" ? "text-[#5B732E] border-b-2 border-[#5B732E]" : "text-[#33361D] hover:text-[#5B732E]"
              }`}
            >
              Áreas de Interés
            </button>
          )}
          {hasDisponibilidad && (
            <button
              onClick={() => setSelectedTab("disponibilidad")}
              className={`px-4 py-3 font-semibold text-sm transition ${
                selectedTab === "disponibilidad" ? "text-[#5B732E] border-b-2 border-[#5B732E]" : "text-[#33361D] hover:text-[#5B732E]"
              }`}
            >
              Disponibilidad
            </button>
          )}
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {solicitud.estado === "RECHAZADO" && solicitud.motivo && (
            <div className="rounded-xl bg-[#F7E9E6] border border-[#E8C5C0] p-4 flex gap-3">
              <XCircle className="w-4 h-4 text-[#8C3A33] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-[#8C3A33] uppercase tracking-widest mb-0.5">Motivo de rechazo</p>
                <p className="text-sm text-[#8C3A33]">{solicitud.motivo}</p>
              </div>
            </div>
          )}

          {selectedTab === "info" && (
            <div className="space-y-6">
              {isIndividual && solicitud.voluntario && (
                <VolunteerIndividualInfo voluntario={solicitud.voluntario} formatDate={formatDate} />
              )}
              {!isIndividual && solicitud.organizacion && (
                <OrganizacionInfo organizacion={solicitud.organizacion} />
              )}
              <SolicitudStatusInfo
                estado={solicitud.estado}
                fechaSolicitud={solicitud.fechaSolicitud}
                fechaResolucion={solicitud.fechaResolucion}
                motivo={solicitud.motivo}
                formatDate={formatDate}
              />
            </div>
          )}

          {selectedTab === "areas" && (
            <AreasInteresTab
              areasInteres={
                isIndividual
                  ? solicitud.voluntario?.areasInteres || []
                  : solicitud.organizacion?.areasInteres || []
              }
              tipoSolicitante={solicitud.tipoSolicitante}
            />
          )}

          {selectedTab === "disponibilidad" && (
            <DisponibilidadTab
              disponibilidades={
                isIndividual
                  ? solicitud.voluntario?.disponibilidades || []
                  : solicitud.organizacion?.disponibilidades || []
              }
              tipoSolicitante={solicitud.tipoSolicitante}
            />
          )}
        </div>

        {/* ── FOOTER ── */}
        <div className="px-6 py-3 border-t border-[#EAEFE0] bg-[#F8F9F3] flex justify-end">
          <ActionButtons
            size="sm"
            onCancel={onClose}
            showText={true}
            cancelText="Cerrar"
            showCancel={true}
          />
        </div>
      </div>
    </div>
  )
}