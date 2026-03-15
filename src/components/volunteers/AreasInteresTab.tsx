import type { AreaInteres } from "../../schemas/volunteerSchemas";

interface AreasInteresTabProps {
  areasInteres: AreaInteres[];
  tipoSolicitante: "INDIVIDUAL" | "ORGANIZACION";
}

export function AreasInteresTab({ areasInteres }: AreasInteresTabProps) {
  if (!areasInteres || areasInteres.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#556B2F] text-sm font-medium mb-1">📋 No hay áreas de interés registradas</p>
        <p className="text-xs text-[#556B2F] opacity-75">
          Las áreas de interés aparecerán aquí una vez sean definidas
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 rounded-full bg-[#5B732E]" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B732E]">Áreas de Interés</h4>
      </div>
      <div className="flex flex-wrap gap-2 pl-3">
        {areasInteres.map((area) => (
          <span
            key={area.idAreaInteres}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#EAEFE0] text-[#33361D]"
          >
            {area.nombreArea}
          </span>
        ))}
      </div>
    </div>
  );
}