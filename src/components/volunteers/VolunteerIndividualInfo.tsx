import type { VoluntarioIndividual } from "../../schemas/volunteerSchemas";

interface VolunteerIndividualInfoProps {
  voluntario: VoluntarioIndividual;
  formatDate: (dateString: string) => string;
}

function InfoField({ label, value, wide = false }: { label: string; value: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#556B2F] mb-1">{label}</p>
      <p className="text-sm font-medium text-[#33361D]">{value || "—"}</p>
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

export function VolunteerIndividualInfo({ voluntario, formatDate }: VolunteerIndividualInfoProps) {
  return (
    <>
      <Section title="Información Personal">
        <InfoField label="Nombre Completo" value={`${voluntario.persona.nombre} ${voluntario.persona.apellido1} ${voluntario.persona.apellido2}`} />
        <InfoField label="Cédula" value={voluntario.persona.cedula} />
        <InfoField label="Email" value={voluntario.persona.email} />
        <InfoField label="Teléfono" value={voluntario.persona.telefono} />
        <InfoField label="Nacionalidad" value={voluntario.nacionalidad} />
        {voluntario.persona.fechaNacimiento && (
          <InfoField label="Fecha de Nacimiento" value={formatDate(voluntario.persona.fechaNacimiento)} />
        )}
      </Section>

      <div className="border-t border-[#EAEFE0]" />

      <Section title="Perfil del Voluntario">
        <InfoField label="Motivación" value={voluntario.motivacion} wide />
        <InfoField label="Habilidades" value={voluntario.habilidades} wide />
        <InfoField label="Experiencia" value={voluntario.experiencia} wide />
      </Section>
    </>
  );
}