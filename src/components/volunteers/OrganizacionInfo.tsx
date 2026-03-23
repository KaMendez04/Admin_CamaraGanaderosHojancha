import type { ReactNode } from "react";
import type { Organizacion } from "../../schemas/volunteerSchemas";

interface OrganizacionInfoProps {
  organizacion: Organizacion;
}

function hasValue(value: ReactNode) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

function InfoField({
  label,
  value,
  wide = false,
  accent = "green",
}: {
  label: string;
  value: ReactNode;
  wide?: boolean;
  accent?: "green" | "gold";
}) {
  const labelColor = accent === "gold" ? "text-[#C19A3D]" : "text-[#556B2F]";

  return (
    <div className={`min-w-0 ${wide ? "md:col-span-2" : ""}`}>
      <p
        className={`mb-1 text-[10px] font-semibold uppercase tracking-widest ${labelColor}`}
      >
        {label}
      </p>

      <div className="min-w-0 max-w-full text-sm font-medium text-[#33361D] whitespace-normal break-words [overflow-wrap:anywhere] leading-snug">
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
  accent?: "green" | "gold";
  children: ReactNode;
}) {
  const barColor = accent === "gold" ? "bg-[#C19A3D]" : "bg-[#5B732E]";
  const textColor = accent === "gold" ? "text-[#C19A3D]" : "text-[#5B732E]";

  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center gap-2">
        <div className={`h-4 w-1 rounded-full ${barColor}`} />
        <h4 className={`text-xs font-bold uppercase tracking-widest ${textColor}`}>
          {title}
        </h4>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-4 pl-0 sm:pl-3 md:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

export function OrganizacionInfo({ organizacion }: OrganizacionInfoProps) {
  return (
    <div className="min-w-0 space-y-5">
      <Section title="Datos de la Organización">
        <InfoField label="Nombre" value={organizacion.nombre} />
        <InfoField label="Cédula Jurídica" value={organizacion.cedulaJuridica} />
        <InfoField label="Email" value={organizacion.email} />
        <InfoField label="Teléfono" value={organizacion.telefono} />
        <InfoField
          label="Tipo de Organización"
          value={organizacion.tipoOrganizacion}
        />
        <InfoField
          label="Número de Voluntarios"
          value={organizacion.numeroVoluntarios ?? "—"}
          accent="gold"
        />
        <InfoField label="Dirección" value={organizacion.direccion} wide />
      </Section>

      {organizacion.representantes && organizacion.representantes.length > 0 && (
        <>
          <div className="border-t border-[#EAEFE0]" />

          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-4 w-1 rounded-full bg-[#5B732E]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B732E]">
                Representantes
              </h4>
            </div>

            <div className="space-y-3 pl-0 sm:pl-3">
              {organizacion.representantes.map((rep) => (
                <div
                  key={rep.idRepresentante}
                  className="min-w-0 border-l-2 border-[#EAEFE0] pl-4"
                >
                  <p className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-sm font-semibold text-[#33361D] leading-snug">
                    {rep.persona.nombre} {rep.persona.apellido1} {rep.persona.apellido2}
                  </p>

                  <p className="min-w-0 mt-0.5 whitespace-normal break-words [overflow-wrap:anywhere] text-xs text-[#556B2F] leading-snug">
                    {rep.cargo || "—"}
                  </p>

                  <div className="min-w-0 mt-1 space-y-0.5 text-xs text-[#33361D] leading-snug">
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
              <div className="h-4 w-1 rounded-full bg-[#5B732E]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B732E]">
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
    </div>
  );
}