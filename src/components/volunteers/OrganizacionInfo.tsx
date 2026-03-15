import type { Organizacion } from "../../schemas/volunteerSchemas";

interface OrganizacionInfoProps {
  organizacion: Organizacion;
}

function InfoField({ label, value, wide = false }: { label: string; value: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#556B2F] mb-1">{label}</p>
      <p className="text-sm font-medium text-[#33361D]">{value || "—"}</p>
    </div>
  );
}

function Section({ title, accent = "green", children }: {
  title: string;
  accent?: "green" | "gold";
  children: React.ReactNode;
}) {
  const barColor = accent === "gold" ? "bg-[#C19A3D]" : "bg-[#5B732E]";
  const textColor = accent === "gold" ? "text-[#C19A3D]" : "text-[#5B732E]";
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-1 h-4 rounded-full ${barColor}`} />
        <h4 className={`text-xs font-bold uppercase tracking-widest ${textColor}`}>{title}</h4>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 pl-3">{children}</div>
    </div>
  );
}

export function OrganizacionInfo({ organizacion }: OrganizacionInfoProps) {
  return (
    <>
      {/* Datos de la Organización */}
      <Section title="Datos de la Organización">
        <InfoField label="Nombre" value={organizacion.nombre} />
        <InfoField label="Cédula Jurídica" value={organizacion.cedulaJuridica} />
        <InfoField label="Email" value={organizacion.email} />
        <InfoField label="Teléfono" value={organizacion.telefono} />
        <InfoField label="Tipo de Organización" value={organizacion.tipoOrganizacion} />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C19A3D] mb-1">Número de Voluntarios</p>
          <p className="text-sm font-medium text-[#33361D]">{organizacion.numeroVoluntarios ?? "—"}</p>
        </div>
        <InfoField label="Dirección" value={organizacion.direccion} wide />
      </Section>

      {/* Representantes */}
      {organizacion.representantes && organizacion.representantes.length > 0 && (
        <>
          <div className="border-t border-[#EAEFE0]" />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 rounded-full bg-[#5B732E]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B732E]">Representantes</h4>
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
              <div className="w-1 h-4 rounded-full bg-[#5B732E]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B732E]">Razones Sociales</h4>
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
  );
}