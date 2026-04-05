import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { approveSolicitud } from "../../services/Associates/adminSolicitudesService";

export function useApproveSolicitud() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, motivo }: { id: number; motivo?: string }) =>
      approveSolicitud(id, motivo),

    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["solicitudes"] });
      qc.invalidateQueries({ queryKey: ["associates"] });

      // Actualizar el detalle en caché usando la respuesta real del backend,
      // no una fecha generada en el cliente
      qc.setQueryData(["solicitud-complete", vars.id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          estado: _data.estado,
          fechaResolucion: _data.fechaResolucion ?? old.fechaResolucion,
          motivo: _data.motivo ?? old.motivo,
        };
      });

      toast.success("Solicitud aprobada correctamente");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Error al aprobar la solicitud");
    },
  });
}