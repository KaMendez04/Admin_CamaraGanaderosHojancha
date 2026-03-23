import type { ReactNode } from "react";
import type { VoluntarioIndividual } from "../../schemas/volunteerSchemas";

interface VolunteerIndividualInfoProps {
  voluntario: VoluntarioIndividual;
  formatDate: (dateString: string) => string;
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

export function VolunteerIndividualInfo({
  voluntario,
  formatDate,
}: VolunteerIndividualInfoProps) {
  const nombreCompleto = [
    voluntario.persona.nombre,
    voluntario.persona.apellido1,
    voluntario.persona.apellido2,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="min-w-0 space-y-5">
      <Section title="Información Personal">
        <InfoField label="Nombre Completo" value={nombreCompleto} />
        <InfoField label="Cédula" value={voluntario.persona.cedula} />
        <InfoField label="Email" value={voluntario.persona.email} />
        <InfoField label="Teléfono" value={voluntario.persona.telefono} />
        <InfoField label="Nacionalidad" value={voluntario.nacionalidad} />
        {voluntario.persona.fechaNacimiento && (
          <InfoField
            label="Fecha de Nacimiento"
            value={formatDate(voluntario.persona.fechaNacimiento)}
          />
        )}
      </Section>

      <div className="border-t border-[#EAEFE0]" />

      <Section title="Perfil del Voluntario">
        <InfoField label="Motivación" value={voluntario.motivacion} wide />
        <InfoField label="Habilidades" value={voluntario.habilidades} wide />
        <InfoField label="Experiencia" value={voluntario.experiencia} wide />
      </Section>
    </div>
  );
}