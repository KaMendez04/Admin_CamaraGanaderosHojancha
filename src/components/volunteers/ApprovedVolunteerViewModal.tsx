import { useState } from "react";
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
import { ActionButtons } from "../ActionButtons";

interface ApprovedVolunteerViewModalProps {
  open: boolean;
  onClose: () => void;
  data: VoluntarioIndividual | Organizacion | null;
  tipo: "INDIVIDUAL" | "ORGANIZACION";
  isLoading: boolean;
}

type Tab = "info" | "areas" | "disponibilidad";

// ─── Shared body sub-components ───────────────────────────────────────────────

function InfoField({ label, value, wide = false }: { label: string; value: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#556B2F] mb-1">{label}</p>
      <p className="text-sm font-medium text-[#33361D]">{value || "—"}</p>
    </div>
  );
}

function Section({ title, accent = "green", children }: { title: string; accent?: "green" | "red"; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-1 h-4 rounded-full ${accent === "red" ? "bg-[#8C3A33]" : "bg-[#5B732E]"}`} />
        <h4 className={`text-xs font-bold uppercase tracking-widest ${accent === "red" ? "text-[#8C3A33]" : "text-[#5B732E]"}`}>{title}</h4>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 pl-3">{children}</div>
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

  const entityId =
    data
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
          const msg = err?.response?.data?.message || err?.message || "No se pudieron abrir los documentos";
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

  const isIndividual = tipo === "INDIVIDUAL";
  const voluntario = isIndividual ? (data as VoluntarioIndividual) : null;
  const organizacion = !isIndividual ? (data as Organizacion) : null;

  const isActive = data.isActive;
  const nombreDisplay = isIndividual && voluntario
    ? `${voluntario.persona.nombre} ${voluntario.persona.apellido1} ${voluntario.persona.apellido2}`
    : organizacion?.nombre ?? "—";

  const hasAreasInteres =
    (isIndividual && voluntario?.areasInteres && voluntario.areasInteres.length > 0) ||
    (!isIndividual && organizacion?.areasInteres && organizacion.areasInteres.length > 0);

  const hasDisponibilidad =
    (isIndividual && voluntario?.disponibilidades && voluntario.disponibilidades.length > 0) ||
    (!isIndividual && organizacion?.disponibilidades && organizacion.disponibilidades.length > 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── HEADER ── */}
        <div className="bg-gradient-to-r from-[#F8F9F3] to-[#EAEFE0] px-6 pt-5 pb-4 border-b border-[#EAEFE0]">

          {/* Row 1: avatar + name + badges + close */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              {/* Avatar initial */}
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#EAEFE0] flex items-center justify-center">
                <span className="text-base font-bold text-[#5B732E]">
                  {nombreDisplay.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#556B2F] uppercase tracking-wider mb-0.5">
                  {isIndividual ? "Voluntario" : "Organización"}
                </p>
                <h3 className="text-xl font-bold text-[#33361D] leading-tight">{nombreDisplay}</h3>
                <p className="text-[11px] text-[#556B2F] mt-0.5">
                  {isIndividual ? voluntario?.persona.cedula : organizacion?.cedulaJuridica}
                </p>
              </div>
            </div>

            {/* Right: status + tipo + close */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                isActive ? "bg-[#E6EDC8] text-[#5A7018]" : "bg-[#F7E9E6] text-[#8C3A33]"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#5A7018]" : "bg-[#8C3A33]"}`} />
                {isActive ? "Activo" : "Inactivo"}
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

          {/* Row 2: docs button — compact */}
          <div className="mt-3">
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

          {/* TAB: INFORMACIÓN GENERAL */}
          {selectedTab === "info" && (
            <div className="space-y-6">

              {/* ── Voluntario Individual ── */}
              {isIndividual && voluntario && (
                <>
                  <Section title="Información Personal">
                    <InfoField label="Cédula" value={voluntario.persona.cedula} />
                    <InfoField label="Nombre Completo" value={`${voluntario.persona.nombre} ${voluntario.persona.apellido1} ${voluntario.persona.apellido2}`} />
                    <InfoField label="Teléfono" value={voluntario.persona.telefono} />
                    <InfoField label="Correo" value={voluntario.persona.email} />
                    {voluntario.persona.fechaNacimiento && (
                      <InfoField label="Fecha de Nacimiento" value={formatDate(voluntario.persona.fechaNacimiento)} />
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

              {/* ── Organización ── */}
              {!isIndividual && organizacion && (
                <>
                  <Section title="Información de la Organización" accent="red">
                    <InfoField label="Cédula Jurídica" value={organizacion.cedulaJuridica} />
                    <InfoField label="Nombre" value={organizacion.nombre} />
                    <InfoField label="Teléfono" value={organizacion.telefono} />
                    <InfoField label="Correo" value={organizacion.email} />
                    <InfoField label="Tipo de Organización" value={organizacion.tipoOrganizacion} />
                    <InfoField label="Número de Voluntarios" value={String(organizacion.numeroVoluntarios ?? "—")} />
                    <InfoField label="Dirección" value={organizacion.direccion} wide />
                  </Section>

                  {/* Representantes */}
                  {organizacion.representantes && organizacion.representantes.length > 0 && (
                    <>
                      <div className="border-t border-[#EAEFE0]" />
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1 h-4 rounded-full bg-[#8C3A33]" />
                          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8C3A33]">Representantes</h4>
                        </div>
                        <div className="space-y-3 pl-3">
                          {organizacion.representantes.map((rep) => (
                            <div key={rep.idRepresentante} className="border-l-2 border-[#EAEFE0] pl-4">
                              <p className="text-sm font-semibold text-[#33361D]">
                                {rep.persona.nombre} {rep.persona.apellido1} {rep.persona.apellido2}
                              </p>
                              <p className="text-xs text-[#556B2F] mt-0.5">{rep.cargo}</p>
                              <p className="text-xs text-[#33361D] mt-0.5">{rep.persona.email} · {rep.persona.telefono}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Razones Sociales */}
                  {organizacion.razonesSociales && organizacion.razonesSociales.length > 0 && (
                    <>
                      <div className="border-t border-[#EAEFE0]" />
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1 h-4 rounded-full bg-[#8C3A33]" />
                          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8C3A33]">Razones Sociales</h4>
                        </div>
                        <div className="flex flex-wrap gap-2 pl-3">
                          {organizacion.razonesSociales.map((razon) => (
                            <span
                              key={razon.idRazonSocial}
                              className="px-3 py-1.5 bg-white rounded-lg text-xs text-[#33361D] border border-[#EAEFE0] font-medium"
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

          {/* TAB: ÁREAS DE INTERÉS */}
          {selectedTab === "areas" && (
            <AreasInteresTab
              areasInteres={isIndividual ? voluntario?.areasInteres || [] : organizacion?.areasInteres || []}
              tipoSolicitante={tipo}
            />
          )}

          {/* TAB: DISPONIBILIDAD */}
          {selectedTab === "disponibilidad" && (
            <DisponibilidadTab
              disponibilidades={isIndividual ? voluntario?.disponibilidades || [] : organizacion?.disponibilidades || []}
              tipoSolicitante={tipo}
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
  );
}