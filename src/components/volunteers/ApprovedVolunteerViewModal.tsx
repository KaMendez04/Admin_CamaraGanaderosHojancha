import { useState, type ReactNode } from "react";
import type { VoluntarioIndividual, Organizacion } from "../../schemas/volunteerSchemas";
import { AreasInteresTab } from "../volunteers/AreasInteresTab";
import { DisponibilidadTab } from "../volunteers/DisponibilidadTab";
import { FolderOpen, X, User, Building2 } from "lucide-react";
import {
  useApprovedHasDocs,
  useApprovedVolunteerDocsLink,
} from "@/hooks/Volunteers/useVolunteerDocsLink";
import { toast } from "sonner";
import { useLockBodyScroll } from "@/hooks/modals/useLockBodyScroll";

interface ApprovedVolunteerViewModalProps {
  open: boolean;
  onClose: () => void;
  data: VoluntarioIndividual | Organizacion | null;
  tipo: "INDIVIDUAL" | "ORGANIZACION";
  isLoading: boolean;
}

type Tab = "info" | "areas" | "disponibilidad";

function hasValue(value: ReactNode) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

// ─── Shared body sub-components ───────────────────────────────────────────────

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
  accent = "green",
  children,
}: {
  title: string;
  accent?: "green" | "red";
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center gap-2">
        <div
          className={`h-4 w-1 rounded-full ${
            accent === "red" ? "bg-[#8C3A33]" : "bg-[#5B732E]"
          }`}
        />
        <h4
          className={`text-xs font-bold uppercase tracking-widest ${
            accent === "red" ? "text-[#8C3A33]" : "text-[#5B732E]"
          }`}
        >
          {title}
        </h4>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-4 pl-0 sm:pl-3 md:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

export function ApprovedVolunteerViewModal({
  open,
  onClose,
  data,
  tipo,
  isLoading,
}: ApprovedVolunteerViewModalProps) {
  const [selectedTab, setSelectedTab] = useState<Tab>("info");
  useLockBodyScroll(open);

  const entityId = data
    ? tipo === "INDIVIDUAL"
      ? (data as VoluntarioIndividual).idVoluntario
      : (data as Organizacion).idOrganizacion
    : null;

  const docsLinkMutation = useApprovedVolunteerDocsLink();
  const { data: hasDocs, isLoading: checkingDocs } = useApprovedHasDocs(
    entityId ? { tipo, id: entityId } : null
  );

  const onOpenDocs = () => {
    if (!entityId) return;

    docsLinkMutation.mutate(
      { tipo, id: entityId },
      {
        onSuccess: (res: any) => {
          const url = res?.url ?? res?.link ?? res;
          if (typeof url === "string" && url.length > 0) {
            window.open(url, "_blank", "noopener,noreferrer");
          } else {
            toast.error("No se pudo obtener el enlace de documentos");
          }
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "No se pudieron abrir los documentos";
          toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
        },
      }
    );
  };

  if (!open) return null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (isLoading || !data) {
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

  const isIndividual = tipo === "INDIVIDUAL";
  const voluntario = isIndividual ? (data as VoluntarioIndividual) : null;
  const organizacion = !isIndividual ? (data as Organizacion) : null;

  const isActive = data.isActive;
  const nombreDisplay =
    isIndividual && voluntario
      ? [
          voluntario.persona.nombre,
          voluntario.persona.apellido1,
          voluntario.persona.apellido2,
        ]
          .filter(Boolean)
          .join(" ")
      : organizacion?.nombre ?? "—";

  const hasAreasInteres =
    (isIndividual &&
      voluntario?.areasInteres &&
      voluntario.areasInteres.length > 0) ||
    (!isIndividual &&
      organizacion?.areasInteres &&
      organizacion.areasInteres.length > 0);

  const hasDisponibilidad =
    (isIndividual &&
      voluntario?.disponibilidades &&
      voluntario.disponibilidades.length > 0) ||
    (!isIndividual &&
      organizacion?.disponibilidades &&
      organizacion.disponibilidades.length > 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-3xl min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── HEADER ── */}
        <div className="border-b border-[#EAEFE0] bg-gradient-to-r from-[#F8F9F3] to-[#EAEFE0] px-4 pt-5 pb-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#EAEFE0]">
                <span className="text-base font-bold text-[#5B732E]">
                  {nombreDisplay.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="min-w-0">
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-[#556B2F]">
                  {isIndividual ? "Voluntario" : "Organización"}
                </p>

                <h3 className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-xl font-bold leading-tight text-[#33361D]">
                  {nombreDisplay}
                </h3>

                <p className="mt-0.5 min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-[11px] text-[#556B2F]">
                  {isIndividual ? voluntario?.persona.cedula : organizacion?.cedulaJuridica}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:flex-shrink-0">
              <span
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${
                  isActive ? "bg-[#E6EDC8] text-[#5A7018]" : "bg-[#F7E9E6] text-[#8C3A33]"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? "bg-[#5A7018]" : "bg-[#8C3A33]"
                  }`}
                />
                {isActive ? "Activo" : "Inactivo"}
              </span>

              <span
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${
                  isIndividual ? "bg-[#D4E8E0] text-[#2D5F4F]" : "bg-[#F5E6C5] text-[#8B6C2E]"
                }`}
              >
                {isIndividual ? (
                  <User className="h-3 w-3" />
                ) : (
                  <Building2 className="h-3 w-3" />
                )}
                {isIndividual ? "Individual" : "Organización"}
              </span>

              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#556B2F] transition hover:bg-[#EAEFE0]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-3 min-w-0">
            {checkingDocs ? (
              <div className="h-7 w-32 animate-pulse rounded-lg bg-[#EAEFE0]" />
            ) : hasDocs ? (
              <button
                onClick={onOpenDocs}
                disabled={docsLinkMutation.isPending}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#33361D] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#2b2d18] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {docsLinkMutation.isPending ? (
                  <>
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Abriendo...
                  </>
                ) : (
                  <>
                    <FolderOpen className="h-3 w-3" />
                    Ver documentos
                  </>
                )}
              </button>
            ) : (
              <div className="inline-flex min-w-0 items-center gap-1.5 rounded-lg border border-[#EAEFE0] bg-white px-3 py-1.5 text-xs font-medium text-[#556B2F]">
                <FolderOpen className="h-3 w-3 flex-shrink-0 opacity-50" />
                <span className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere]">
                  Sin documentos adjuntos
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── TABS ── */}
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

          {hasAreasInteres && (
            <button
              onClick={() => setSelectedTab("areas")}
              className={`px-4 py-3 text-sm font-semibold transition ${
                selectedTab === "areas"
                  ? "border-b-2 border-[#5B732E] text-[#5B732E]"
                  : "text-[#33361D] hover:text-[#5B732E]"
              }`}
            >
              Áreas de Interés
            </button>
          )}

          {hasDisponibilidad && (
            <button
              onClick={() => setSelectedTab("disponibilidad")}
              className={`px-4 py-3 text-sm font-semibold transition ${
                selectedTab === "disponibilidad"
                  ? "border-b-2 border-[#5B732E] text-[#5B732E]"
                  : "text-[#33361D] hover:text-[#5B732E]"
              }`}
            >
              Disponibilidad
            </button>
          )}
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5 sm:px-6">
          {selectedTab === "info" && (
            <div className="space-y-6">
              {isIndividual && voluntario && (
                <>
                  <Section title="Información Personal">
                    <InfoField label="Cédula" value={voluntario.persona.cedula} />
                    <InfoField
                      label="Nombre Completo"
                      value={[
                        voluntario.persona.nombre,
                        voluntario.persona.apellido1,
                        voluntario.persona.apellido2,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                    <InfoField label="Teléfono" value={voluntario.persona.telefono} />
                    <InfoField label="Correo" value={voluntario.persona.email} />
                    {voluntario.persona.fechaNacimiento && (
                      <InfoField
                        label="Fecha de Nacimiento"
                        value={formatDate(voluntario.persona.fechaNacimiento)}
                      />
                    )}
                    <InfoField label="Nacionalidad" value={voluntario.nacionalidad} />
                  </Section>

                  <div className="border-t border-[#EAEFE0]" />

                  <Section title="Información del Voluntariado">
                    <InfoField label="Motivación" value={voluntario.motivacion} wide />
                    <InfoField label="Habilidades" value={voluntario.habilidades} wide />
                    <InfoField label="Experiencia" value={voluntario.experiencia} wide />
                  </Section>
                </>
              )}

              {!isIndividual && organizacion && (
                <>
                  <Section title="Información de la Organización" accent="red">
                    <InfoField label="Cédula Jurídica" value={organizacion.cedulaJuridica} />
                    <InfoField label="Nombre" value={organizacion.nombre} />
                    <InfoField label="Teléfono" value={organizacion.telefono} />
                    <InfoField label="Correo" value={organizacion.email} />
                    <InfoField
                      label="Tipo de Organización"
                      value={organizacion.tipoOrganizacion}
                    />
                    <InfoField
                      label="Número de Voluntarios"
                      value={String(organizacion.numeroVoluntarios ?? "—")}
                    />
                    <InfoField label="Dirección" value={organizacion.direccion} wide />
                  </Section>

                  {organizacion.representantes && organizacion.representantes.length > 0 && (
                    <>
                      <div className="border-t border-[#EAEFE0]" />
                      <div className="min-w-0">
                        <div className="mb-3 flex items-center gap-2">
                          <div className="h-4 w-1 rounded-full bg-[#8C3A33]" />
                          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8C3A33]">
                            Representantes
                          </h4>
                        </div>

                        <div className="space-y-3 pl-0 sm:pl-3">
                          {organizacion.representantes.map((rep) => (
                            <div
                              key={rep.idRepresentante}
                              className="min-w-0 border-l-2 border-[#EAEFE0] pl-4"
                            >
                              <p className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-sm font-semibold leading-snug text-[#33361D]">
                                {rep.persona.nombre} {rep.persona.apellido1} {rep.persona.apellido2}
                              </p>

                              <p className="mt-0.5 min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-xs leading-snug text-[#556B2F]">
                                {rep.cargo || "—"}
                              </p>

                              <div className="mt-1 min-w-0 space-y-0.5 text-xs leading-snug text-[#33361D]">
                                <p className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere]">
                                  {rep.persona.email || "—"}
                                </p>
                                <p className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere]">
                                  {rep.persona.telefono || "—"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {organizacion.razonesSociales && organizacion.razonesSociales.length > 0 && (
                    <>
                      <div className="border-t border-[#EAEFE0]" />
                      <div className="min-w-0">
                        <div className="mb-3 flex items-center gap-2">
                          <div className="h-4 w-1 rounded-full bg-[#8C3A33]" />
                          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8C3A33]">
                            Razones Sociales
                          </h4>
                        </div>

                        <div className="flex min-w-0 flex-wrap gap-2 pl-0 sm:pl-3">
                          {organizacion.razonesSociales.map((razon) => (
                            <span
                              key={razon.idRazonSocial}
                              className="min-w-0 max-w-full rounded-lg border border-[#EAEFE0] bg-white px-3 py-1.5 text-xs font-medium text-[#33361D] whitespace-normal break-words [overflow-wrap:anywhere]"
                            >
                              {razon.razonSocial}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {selectedTab === "areas" && (
            <AreasInteresTab
              areasInteres={
                isIndividual
                  ? voluntario?.areasInteres || []
                  : organizacion?.areasInteres || []
              }
              tipoSolicitante={tipo}
            />
          )}

          {selectedTab === "disponibilidad" && (
            <DisponibilidadTab
              disponibilidades={
                isIndividual
                  ? voluntario?.disponibilidades || []
                  : organizacion?.disponibilidades || []
              }
              tipoSolicitante={tipo}
            />
          )}
        </div>

        {/* ── FOOTER ── */}
        <div className="flex justify-end border-t border-[#EAEFE0] bg-[#F8F9F3] px-4 py-3 sm:px-6">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#5B732E] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#556B2F]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}