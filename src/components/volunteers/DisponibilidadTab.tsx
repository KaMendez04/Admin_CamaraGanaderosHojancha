import type { Disponibilidad } from "../../schemas/volunteerSchemas";

interface DisponibilidadTabProps {
  disponibilidades: Disponibilidad[];
  tipoSolicitante: "INDIVIDUAL" | "ORGANIZACION";
}

const capitalizarPalabra = (palabra: string): string =>
  palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();

const formatearLista = (valor: any, capitalizar = false): string => {
  if (!valor) return "No especificado";
  if (Array.isArray(valor)) {
    if (valor.length === 0) return "No especificado";
    const items = capitalizar ? valor.map((item) => capitalizarPalabra(String(item))) : valor;
    return items.join(", ");
  }
  return capitalizar ? capitalizarPalabra(String(valor)) : String(valor);
};

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#556B2F] mb-1">{label}</p>
      <p className="text-sm font-medium text-[#33361D]">{value}</p>
    </div>
  );
}

export function DisponibilidadTab({ disponibilidades }: DisponibilidadTabProps) {
  if (!disponibilidades || disponibilidades.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#556B2F] text-sm font-medium mb-1">📅 No hay horarios de disponibilidad registrados</p>
        <p className="text-xs text-[#556B2F] opacity-75">
          Los horarios aparecerán aquí una vez sean definidos
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 rounded-full bg-[#5B732E]" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B732E]">Horarios de Disponibilidad</h4>
      </div>

      <div className="space-y-4 pl-3">
        {disponibilidades.map((disp, i) => (
          <div key={disp.idDisponibilidad}>
            {i > 0 && <div className="border-t border-[#EAEFE0] mb-4" />}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
              <InfoField label="Días" value={formatearLista(disp.dias)} />
              <InfoField label="Horario" value={formatearLista(disp.horarios, true)} />
              <InfoField
                label="Período"
                value={`${new Date(disp.fechaInicio).toLocaleDateString()} — ${new Date(disp.fechaFin).toLocaleDateString()}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}