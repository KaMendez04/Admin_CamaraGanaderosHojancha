import { XCircle } from "lucide-react";

interface SolicitudStatusInfoProps {
  estado: "PENDIENTE" | "APROBADO" | "RECHAZADO";
  fechaSolicitud: string;
  fechaResolucion?: string | null;
  motivo?: string | null;
  formatDate: (dateString: string) => string;
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#556B2F] mb-1">{label}</p>
      <p className="text-sm font-medium text-[#33361D]">{value}</p>
    </div>
  );
}

export function SolicitudStatusInfo({
  estado,
  fechaSolicitud,
  fechaResolucion,
  motivo,
  formatDate,
}: SolicitudStatusInfoProps) {
  return (
    <>
      <div className="border-t border-[#EAEFE0]" />

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 rounded-full bg-[#5B732E]" />
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B732E]">Estado de la Solicitud</h4>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 pl-3">
          <InfoField label="Estado" value={estado} />
          <InfoField label="Fecha de Solicitud" value={formatDate(fechaSolicitud)} />
          {fechaResolucion && (
            <InfoField label="Fecha de Resolución" value={formatDate(fechaResolucion)} />
          )}
        </div>

        {/* Motivo de rechazo — banner destacado */}
        {motivo && (
          <div className="mt-4 pl-3">
            <div className="rounded-xl bg-[#F7E9E6] border border-[#E8C5C0] p-4 flex gap-3">
              <XCircle className="w-4 h-4 text-[#8C3A33] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-[#8C3A33] uppercase tracking-widest mb-0.5">Motivo de rechazo</p>
                <p className="text-sm text-[#8C3A33]">{motivo}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}