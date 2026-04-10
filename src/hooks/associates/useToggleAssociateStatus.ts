import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessAlert, showErrorAlertEmpty } from "@/utils/alerts";
import { toggleAssociateStatus } from "../../services/Associates/adminAssociatesService";

export function useToggleAssociateStatus() {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => toggleAssociateStatus(id),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["associates"] });
      qc.invalidateQueries({ queryKey: ["associate-detail", data.idAsociado] });
      
      const mensaje = data.estado 
        ? "Asociado activado correctamente" 
        : "Asociado desactivado correctamente";
      
      void showSuccessAlert(mensaje);
    },
    onError: (error: any) => {
      const mensaje = error?.response?.data?.message || error?.message || "Error al cambiar el estado del asociado";
      void showErrorAlertEmpty(mensaje);
    },
  });
}