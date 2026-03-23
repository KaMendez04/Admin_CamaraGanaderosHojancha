import { useState } from "react";
import type { Associate } from "../../schemas/adminSolicitudes";
import { FincaAccordion } from "./FincaAccordion";
import { useAssociateNecesidades } from "../../hooks/associates";
import { FolderOpen, X } from "lucide-react";
import { useAsociadoHasDocs, useDocsLinkByAsociado } from "../../hooks/associates/useSolicitudDocsLink";
import { toast } from "sonner";
import { useLockBodyScroll } from "@/hooks/modals/useLockBodyScroll";
import { ActionButtons } from "../ActionButtons";

type Props = {
  open: boolean;
  onClose: () => void;
  associate: Associate | null;
  isLoading?: boolean;
};

type Tab = "info" | "necesidades" | "finca";

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

const TABS: { id: Tab; label: string }[] = [
  { id: "info",        label: "Información General" },
  { id: "finca",       label: "Finca" },
  { id: "necesidades", label: "Necesidades y Observaciones" },
];

export function AssociateViewModal({ open, onClose, associate, isLoading }: Props) {
  const [selectedTab, setSelectedTab] = useState<Tab>("info");

  useLockBodyScroll(open);

  const { data: necesidades = [], isLoading: loadingNecesidades } = useAssociateNecesidades(
    selectedTab === "necesidades" && associate ? associate.idAsociado : null
  );

  const docsLink = useDocsLinkByAsociado();
  const { data: hasDocs, isLoading: checkingDocs } = useAsociadoHasDocs(
    associate?.idAsociado ?? null
  );

  if (!open) return null;
  if (isLoading || !associate) return <LoadingSkeleton onClose={onClose} />;

  const isActive = associate.estado;

  const personalFields = [
    { label: "Cédula", value: associate.persona.cedula },
    { label: "Nombre completo", value: `${associate.persona.nombre} ${associate.persona.apellido1} ${associate.persona.apellido2}` },
    { label: "Fecha de nacimiento", value: formatDate(associate.persona.fechaNacimiento) },
    { label: "Teléfono", value: associate.persona.telefono },
    { label: "Email", value: associate.persona.email },
    { label: "Dirección", value: associate.persona.direccion || "—", wide: true },
  ];

  const asociadoFields = [
    { label: "Vive en finca", value: associate.viveEnFinca ? "Sí" : "No" },
    { label: "Marca de ganado", value: associate.marcaGanado || "—" },
    { label: "CVO", value: associate.CVO || "—" },
  ];

  const nucleoFamiliar = associate.nucleoFamiliar;

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

          {/* Row 1: avatar + name + badge + close */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#EAEFE0] flex items-center justify-center">
                <span className="text-base font-bold text-[#5B732E]">
                  {associate.persona.nombre.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#556B2F] uppercase tracking-wider mb-0.5">
                  Asociado
                </p>
                <h3 className="text-xl font-bold text-[#33361D] leading-tight">
                  {associate.persona.nombre} {associate.persona.apellido1} {associate.persona.apellido2}
                </h3>
                <p className="text-[11px] text-[#556B2F] mt-0.5">
                  {associate.persona.cedula}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                isActive ? "bg-[#E6EDC8] text-[#5A7018]" : "bg-[#F7E9E6] text-[#8C3A33]"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#5A7018]" : "bg-[#8C3A33]"}`} />
                {isActive ? "Activo" : "Inactivo"}
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
                onClick={() => {
                  docsLink.mutate(associate.idAsociado, {
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
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedTab(id)}
              className={`px-4 py-3 font-semibold text-sm transition ${
                selectedTab === id
                  ? "text-[#5B732E] border-b-2 border-[#5B732E]"
                  : "text-[#33361D] hover:text-[#5B732E]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-6">

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
            </>
          )}

          {selectedTab === "necesidades" && (
            <div>
              {loadingNecesidades ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B732E]" />
                  <p className="mt-4 text-sm text-[#556B2F]">Cargando necesidades...</p>
                </div>
              ) : Array.isArray(necesidades) && necesidades.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-4 rounded-full bg-[#5B732E]" />
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B732E]">
                      Necesidades y Mejoras Identificadas
                    </h4>
                  </div>
                  {necesidades.map((necesidad: any, i: number) => (
                    <div key={necesidad?.idNecesidad ?? i} className="flex items-start gap-3 pl-3">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#5B732E] text-white text-[10px] font-bold mt-0.5">
                        {necesidad?.orden ?? i + 1}
                      </span>
                      <p className="text-sm text-[#33361D] leading-relaxed">
                        {necesidad?.descripcion ?? "—"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-[#556B2F] text-sm font-medium mb-1">📝 No hay necesidades registradas</p>
                  <p className="text-xs text-[#556B2F] opacity-75">
                    Las necesidades y observaciones aparecerán aquí una vez sean registradas
                  </p>
                </div>
              )}
            </div>
          )}

          {selectedTab === "finca" && (
            <div>
              {associate.fincas && associate.fincas.length > 0 ? (
                <div className="space-y-3">
                  {associate.fincas.map((finca, idx) => (
                    <FincaAccordion
                      key={finca.idFinca}
                      finca={finca}
                      isFirst={idx === 0}
                      esPropietario={associate.esPropietario ?? false}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-[#556B2F] text-sm font-medium mb-1">🏡 No hay fincas registradas</p>
                  <p className="text-xs text-[#556B2F] opacity-75">
                    Las fincas del asociado aparecerán aquí una vez sean registradas
                  </p>
                </div>
              )}
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