import { useState, type ReactNode } from "react";
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

const formatDate = (dateString: string) => {
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(dateString)
    ? `${dateString}T12:00:00`
    : dateString;

  return new Date(normalized).toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function hasValue(value: ReactNode) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

function InfoField({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`min-w-0 ${wide ? "md:col-span-2" : ""}`}>
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#556B2F]">
        {label}
      </p>
      <div className="min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:anywhere] text-sm font-medium leading-snug text-[#33361D]">
        {hasValue(value) ? value : "—"}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-4 w-1 rounded-full bg-[#5B732E]" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B732E]">
          {title}
        </h4>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-4 pl-0 sm:pl-3 md:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

function LoadingSkeleton({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-[#5B732E]" />
          <p className="mt-4 font-medium text-[#556B2F]">Cargando detalles...</p>
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
    {
      label: "Nombre completo",
      value: `${solicitud.persona.nombre} ${solicitud.persona.apellido1} ${solicitud.persona.apellido2}`,
    },
    {
      label: "Fecha de nacimiento",
      value: formatDate(solicitud.persona.fechaNacimiento),
    },
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-3xl min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-[#EAEFE0] bg-gradient-to-r from-[#F8F9F3] to-[#EAEFE0] px-4 pb-4 pt-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${status.iconBg}`}>
                <StatusIcon className={`h-4 w-4 ${status.iconColor}`} />
              </div>

              <div className="min-w-0">
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-[#556B2F]">
                  Solicitud de asociación
                </p>

                <h3 className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-xl font-bold leading-tight text-[#33361D]">
                  {solicitud.persona.nombre} {solicitud.persona.apellido1} {solicitud.persona.apellido2}
                </h3>

                <p className="mt-0.5 min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-[11px] text-[#556B2F]">
                  {solicitud.persona.cedula} · {formatDate(solicitud.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:flex-shrink-0">
              <span
                className={`inline-flex max-w-full items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold whitespace-normal break-words [overflow-wrap:anywhere] ${status.pill}`}
              >
                <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${status.dot}`} />
                {status.label}
              </span>

              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#556B2F] transition hover:bg-[#EAEFE0]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => openSolicitudPDF.mutate(Number(solicitud.idSolicitud))}
              disabled={openSolicitudPDF.isPending}
              className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-[#5B732E] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#556B2F] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {openSolicitudPDF.isPending ? (
                <>
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generando...
                </>
              ) : (
                <>
                  <Download className="h-3 w-3 flex-shrink-0" />
                  Descargar PDF
                </>
              )}
            </button>

            {checkingDocs ? (
              <div className="h-7 w-32 animate-pulse rounded-lg bg-[#EAEFE0]" />
            ) : hasDocs ? (
              <button
                onClick={() => {
                  docsLink.mutate(Number(solicitud.idSolicitud), {
                    onSuccess: (r) => window.open(r.url, "_blank", "noopener,noreferrer"),
                    onError: (err: any) => {
                      const msg =
                        err?.response?.data?.message ||
                        err?.message ||
                        "No se pudieron abrir los documentos";
                      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
                    },
                  });
                }}
                disabled={docsLink.isPending}
                className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-[#33361D] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#2b2d18] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {docsLink.isPending ? (
                  <>
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Abriendo...
                  </>
                ) : (
                  <>
                    <FolderOpen className="h-3 w-3 flex-shrink-0" />
                    Ver documentos
                  </>
                )}
              </button>
            ) : (
              <div className="inline-flex min-w-0 max-w-full items-center gap-1.5 rounded-lg border border-[#EAEFE0] bg-white px-3 py-1.5 text-xs font-medium text-[#556B2F]">
                <FolderOpen className="h-3 w-3 flex-shrink-0 opacity-50" />
                <span className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere]">
                  Sin documentos adjuntos
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap border-b border-[#EAEFE0] bg-white px-4 sm:px-6">
          <button
            onClick={() => setSelectedTab("info")}
            className={`px-4 py-3 text-sm font-semibold transition ${
              selectedTab === "info"
                ? "border-b-2 border-[#5B732E] text-[#5B732E]"
                : "text-[#33361D] hover:text-[#5B732E]"
            }`}
          >
            Información General
          </button>

          {hasFincas && (
            <button
              onClick={() => setSelectedTab("finca")}
              className={`px-4 py-3 text-sm font-semibold transition ${
                selectedTab === "finca"
                  ? "border-b-2 border-[#5B732E] text-[#5B732E]"
                  : "text-[#33361D] hover:text-[#5B732E]"
              }`}
            >
              Finca
            </button>
          )}
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5 sm:px-7">
          {solicitud.estado === "RECHAZADO" && solicitud.motivo && (
            <div className="flex min-w-0 gap-3 rounded-xl border border-[#E8C5C0] bg-[#F7E9E6] p-4">
              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#8C3A33]" />
              <div className="min-w-0">
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-[#8C3A33]">
                  Motivo de rechazo
                </p>
                <p className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-sm leading-snug text-[#8C3A33]">
                  {solicitud.motivo}
                </p>
              </div>
            </div>
          )}

          {selectedTab === "info" && (
            <>
              <Section title="Información Personal">
                {personalFields.map((f, i) => (
                  <InfoField key={i} label={f.label} value={f.value} wide={Boolean(f.wide)} />
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
                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#C19A3D]">
                        Total
                      </p>
                      <div className="min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:anywhere] text-sm font-medium leading-snug text-[#33361D]">
                        {nucleoFamiliar.nucleoTotal}
                      </div>
                    </div>
                  </Section>
                </>
              )}

              <div className="border-t border-[#EAEFE0]" />

              <Section title="Estado de la Solicitud">
                <InfoField label="Estado" value={status.label} />
                <InfoField label="Fecha de solicitud" value={formatDate(solicitud.fechaSolicitud)} />
                {solicitud.fechaResolucion && (
                  <InfoField
                    label="Fecha de resolución"
                    value={formatDate(solicitud.fechaResolucion)}
                  />
                )}
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