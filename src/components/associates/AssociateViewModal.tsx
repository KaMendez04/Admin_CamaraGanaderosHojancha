import { useState, type ReactNode } from "react";
import type { Associate } from "../../schemas/adminSolicitudes";
import { FincaAccordion } from "./FincaAccordion";
import { useAssociateNecesidades } from "../../hooks/associates";
import { FolderOpen, X } from "lucide-react";
import {
  useAsociadoHasDocs,
  useDocsLinkByAsociado,
} from "../../hooks/associates/useSolicitudDocsLink";
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

const TABS: { id: Tab; label: string }[] = [
  { id: "info", label: "Información General" },
  { id: "finca", label: "Finca" },
  { id: "necesidades", label: "Necesidades y Observaciones" },
];

export function AssociateViewModal({
  open,
  onClose,
  associate,
  isLoading,
}: Props) {
  const [selectedTab, setSelectedTab] = useState<Tab>("info");

  useLockBodyScroll(open);

  const { data: necesidades = [], isLoading: loadingNecesidades } =
    useAssociateNecesidades(
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
    {
      label: "Nombre completo",
      value: `${associate.persona.nombre} ${associate.persona.apellido1} ${associate.persona.apellido2}`,
    },
    {
      label: "Fecha de nacimiento",
      value: formatDate(associate.persona.fechaNacimiento),
    },
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

  const nombreCompleto = [
    associate.persona.nombre,
    associate.persona.apellido1,
    associate.persona.apellido2,
  ]
    .filter(Boolean)
    .join(" ");

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
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#EAEFE0]">
                <span className="text-base font-bold text-[#5B732E]">
                  {associate.persona.nombre.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="min-w-0">
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-[#556B2F]">
                  Asociado
                </p>
                <h3 className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-xl font-bold leading-tight text-[#33361D]">
                  {nombreCompleto}
                </h3>
                <p className="mt-0.5 min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-[11px] text-[#556B2F]">
                  {associate.persona.cedula}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:flex-shrink-0">
              <span
                className={`inline-flex max-w-full items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold whitespace-normal break-words [overflow-wrap:anywhere] ${
                  isActive
                    ? "bg-[#E6EDC8] text-[#5A7018]"
                    : "bg-[#F7E9E6] text-[#8C3A33]"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                    isActive ? "bg-[#5A7018]" : "bg-[#8C3A33]"
                  }`}
                />
                {isActive ? "Activo" : "Inactivo"}
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
                onClick={() => {
                  docsLink.mutate(associate.idAsociado, {
                    onSuccess: (r) =>
                      window.open(r.url, "_blank", "noopener,noreferrer"),
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
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedTab(id)}
              className={`px-4 py-3 text-sm font-semibold transition ${
                selectedTab === id
                  ? "border-b-2 border-[#5B732E] text-[#5B732E]"
                  : "text-[#33361D] hover:text-[#5B732E]"
              }`}
            >
              <span className="whitespace-normal break-words [overflow-wrap:anywhere]">
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5 sm:px-7">
          {selectedTab === "info" && (
            <>
              <Section title="Información Personal">
                {personalFields.map((f, i) => (
                  <InfoField
                    key={i}
                    label={f.label}
                    value={f.value}
                    wide={Boolean((f as any).wide)}
                  />
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
                    <InfoField
                      label="Hombres"
                      value={String(nucleoFamiliar.nucleoHombres)}
                    />
                    <InfoField
                      label="Mujeres"
                      value={String(nucleoFamiliar.nucleoMujeres)}
                    />
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
            </>
          )}

          {selectedTab === "necesidades" && (
            <div className="min-w-0">
              {loadingNecesidades ? (
                <div className="py-12 text-center">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-[#5B732E]" />
                  <p className="mt-4 text-sm text-[#556B2F]">
                    Cargando necesidades...
                  </p>
                </div>
              ) : Array.isArray(necesidades) && necesidades.length > 0 ? (
                <div className="space-y-3">
                  <div className="mb-1 flex items-center gap-2">
                    <div className="h-4 w-1 rounded-full bg-[#5B732E]" />
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B732E]">
                      Necesidades y Mejoras Identificadas
                    </h4>
                  </div>

                  {necesidades.map((necesidad: any, i: number) => (
                    <div
                      key={necesidad?.idNecesidad ?? i}
                      className="flex min-w-0 items-start gap-3 pl-0 sm:pl-3"
                    >
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#5B732E] text-[10px] font-bold text-white">
                        {necesidad?.orden ?? i + 1}
                      </span>
                      <p className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-sm leading-relaxed text-[#33361D]">
                        {necesidad?.descripcion ?? "—"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="mb-1 text-sm font-medium text-[#556B2F]">
                    📝 No hay necesidades registradas
                  </p>
                  <p className="text-xs text-[#556B2F] opacity-75">
                    Las necesidades y observaciones aparecerán aquí una vez sean
                    registradas
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
                <div className="py-12 text-center">
                  <p className="mb-1 text-sm font-medium text-[#556B2F]">
                    🏡 No hay fincas registradas
                  </p>
                  <p className="text-xs text-[#556B2F] opacity-75">
                    Las fincas del asociado aparecerán aquí una vez sean
                    registradas
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

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