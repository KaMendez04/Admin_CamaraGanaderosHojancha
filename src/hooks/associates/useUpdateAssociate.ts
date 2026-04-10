import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAssociate } from "../../services/Associates/adminAssociatesService";
import type { UpdateAssociateValues } from "../../schemas/adminSolicitudes";
import { showSuccessAlert, showErrorAlertEmpty } from "@/utils/alerts";

export function useUpdateAssociate() {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, patch }: { id: number; patch: UpdateAssociateValues }) => 
      updateAssociate(id, patch),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["associates"] });
      qc.invalidateQueries({ queryKey: ["associate", vars.id] });
      void showSuccessAlert("Asociado actualizado correctamente");
    },
    onError: (error: any) => {
      void showErrorAlertEmpty(error?.message || "Error al actualizar el asociado");
    },
  });
}