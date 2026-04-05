import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { approveVolunteerSolicitud } from "../../../services/Volunteers/volunteerService";

export function useApproveVolunteerSolicitud() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, motivo }: { id: number; motivo?: string }) =>
      approveVolunteerSolicitud(id, motivo),

    onSuccess: (_data, vars) => {
      // Invalidar lista para que se recargue con datos frescos del backend
      qc.invalidateQueries({ queryKey: ["volunteer-solicitudes"] });

      // Actualizar el detalle en caché usando la respuesta real del backend,
      // no una fecha generada en el cliente
      qc.setQueryData(["volunteer-solicitud-detail", vars.id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          estado: _data.estado,
          fechaResolucion: _data.fechaResolucion ?? old.fechaResolucion,
          motivo: _data.motivo ?? old.motivo,
        };
      });

      toast.success("Solicitud de voluntariado aprobada correctamente");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error al aprobar la solicitud de voluntariado"
      );
    },
  });
}