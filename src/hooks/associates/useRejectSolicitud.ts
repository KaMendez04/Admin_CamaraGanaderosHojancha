import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessAlert, showErrorAlertEmpty } from "@/utils/alerts";
import { rejectSolicitud } from "../../services/Associates/adminSolicitudesService";

export function useRejectSolicitud() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, motivo }: { id: number; motivo: string }) =>
      rejectSolicitud(id, motivo),

    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["solicitudes"] });

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

      void showSuccessAlert("Solicitud rechazada correctamente");
    },

    onError: (error: any) => {
      void showErrorAlertEmpty(error?.response?.data?.message || error?.message || "Error al rechazar la solicitud");
    },
  });
}