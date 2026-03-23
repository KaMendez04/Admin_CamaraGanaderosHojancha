import { useState } from "react";
import type { Solicitud } from "../../schemas/adminSolicitudes";
import { FincaAccordion } from "./FincaAccordion";
import { Download, FolderOpen, X, Clock, CheckCircle, XCircle } from "lucide-react";
import { useDownloadSolicitudPDF } from "../../hooks/associates/useDownloadSolicitudPDF";
import { useSolicitudHasDocs, useDocsLinkBySolicitud } from "../../hooks/associates/useSolicitudDocsLink";
import { toast } from "sonner";
import { useLockBodyScroll } from "@/hooks/modals/useLockBodyScroll";
import { ActionButtons } from "../ActionButtons";

type Props = {
  open: boolean;
  onClose: () => void;
  solicitud: Solicitud | null;
  isLoading?: boolean;
};

type Tab = "info" | "finca";

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
} as const;

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

function InfoField({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#556B2F] mb-1">{label}</p>
      <p className="text-sm font-medium text-[#33361D]">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-4 rounded-full bg-[#5B732E]" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B732E]">{title}</h4>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 pl-3">{children}</div>
    </div>
  );
}

function LoadingSkeleton({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8" onClick={(e) => e.stopPropagation()}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B732E]" />
          <p className="mt-4 text-[#556B2F] font-medium">Cargando detalles...</p>
        </div>
      </div>
    </div>
  );
}

export function SolicitudViewModal({ open, onClose, solicitud, isLoading }: Props) {
  const [selectedTab, setSelectedTab] = useState<Tab>("info");
  const openSolicitudPDF = useDownloadSolicitudPDF();

  const docsLink = useDocsLinkBySolicitud();
  const { data: hasDocs, isLoading: checkingDocs } = useSolicitudHasDocs(
    solicitud ? Number(solicitud.idSolicitud) : null
  );

  useLockBodyScroll(open);

  if (!open) return null;
  if (isLoading || !solicitud) return <LoadingSkeleton onClose={onClose} />;

  const status = STATUS_CONFIG[solicitud.estado];
  const StatusIcon = status.icon;
  const hasFincas = solicitud.asociado.fincas && solicitud.asociado.fincas.length > 0;
  const nucleoFamiliar = solicitud.asociado.nucleoFamiliar;

  const personalFields = [
    { label: "Cédula", value: solicitud.persona.cedula },
    { label: "Nombre completo", value: `${solicitud.persona.nombre} ${solicitud.persona.apellido1} ${solicitud.persona.apellido2}` },
    { label: "Fecha de nacimiento", value: formatDate(solicitud.persona.fechaNacimiento) },
    { label: "Teléfono", value: solicitud.persona.telefono },
    { label: "Email", value: solicitud.persona.email },
    { label: "Dirección", value: solicitud.persona.direccion || "—", wide: true },
  ];

  const asociadoFields = [
    { label: "Vive en finca", value: solicitud.asociado.viveEnFinca ? "Sí" : "No" },
    { label: "Marca de ganado", value: solicitud.asociado.marcaGanado || "—" },
    { label: "CVO", value: solicitud.asociado.CVO || "—" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── HEADER ── */}
        <div className="bg-gradient-to-r from-[#F8F9F3] to-[#EAEFE0] px-6 pt-5 pb-4 border-b border-[#EAEFE0]">

          {/* Row 1: icon + name + badge + close */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${status.iconBg}`}>
                <StatusIcon className={`w-4 h-4 ${status.iconColor}`} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#556B2F] uppercase tracking-wider mb-0.5">
                  Solicitud de asociación
                </p>
                <h3 className="text-xl font-bold text-[#33361D] leading-tight">
                  {solicitud.persona.nombre} {solicitud.persona.apellido1} {solicitud.persona.apellido2}
                </h3>
                <p className="text-[11px] text-[#556B2F] mt-0.5">
                  {solicitud.persona.cedula} · {formatDate(solicitud.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${status.pill}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#556B2F] hover:bg-[#EAEFE0] transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Row 2: action buttons — compact */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => openSolicitudPDF.mutate(Number(solicitud?.idSolicitud))}
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
                onClick={() => {
                  docsLink.mutate(Number(solicitud.idSolicitud), {
                    onSuccess: (r) => window.open(r.url, "_blank", "noopener,noreferrer"),
                    onError: (err: any) => {
                      const msg = err?.response?.data?.message || err?.message || "No se pudieron abrir los documentos";
                      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
                    },
                  });
                }}
                disabled={docsLink.isPending}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#33361D] text-white text-xs font-semibold hover:bg-[#2b2d18] transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {docsLink.isPending ? (
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
              selectedTab === "info"
                ? "text-[#5B732E] border-b-2 border-[#5B732E]"
                : "text-[#33361D] hover:text-[#5B732E]"
            }`}
          >
            Información General
          </button>
          {hasFincas && (
            <button
              onClick={() => setSelectedTab("finca")}
              className={`px-4 py-3 font-semibold text-sm transition ${
                selectedTab === "finca"
                  ? "text-[#5B732E] border-b-2 border-[#5B732E]"
                  : "text-[#33361D] hover:text-[#5B732E]"
              }`}
            >
              Finca
            </button>
          )}
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-6">

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
            <>
              <Section title="Información Personal">
                {personalFields.map((f, i) => (
                  <InfoField key={i} label={f.label} value={f.value} wide={(f as any).wide} />
                ))}
              </Section>

              <div className="border-t border-[#EAEFE0]" />

              <Section title="Datos del Asociado">
                {asociadoFields.map((f, i) => (
                  <InfoField key={i} label={f.label} value={f.value} />
                ))}
              </Section>

              {nucleoFamiliar && (
                <>
                  <div className="border-t border-[#EAEFE0]" />
                  <Section title="Núcleo Familiar">
                    <InfoField label="Hombres" value={String(nucleoFamiliar.nucleoHombres)} />
                    <InfoField label="Mujeres" value={String(nucleoFamiliar.nucleoMujeres)} />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C19A3D] mb-1">Total</p>
                      <p className="text-sm font-medium text-[#33361D]">{nucleoFamiliar.nucleoTotal}</p>
                    </div>
                  </Section>
                </>
              )}

              <div className="border-t border-[#EAEFE0]" />

              <Section title="Estado de la Solicitud">
                <InfoField label="Estado" value={status.label} />
                <InfoField label="Fecha de solicitud" value={formatDate(solicitud.createdAt)} />
              </Section>
            </>
          )}

          {selectedTab === "finca" && (
            <div className="space-y-3">
              {solicitud.asociado.fincas?.map((finca, idx) => (
                <FincaAccordion
                  key={finca.idFinca}
                  finca={finca}
                  isFirst={idx === 0}
                  esPropietario={solicitud.asociado.esPropietario ?? false}
                />
              ))}
            </div>
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
  );
}