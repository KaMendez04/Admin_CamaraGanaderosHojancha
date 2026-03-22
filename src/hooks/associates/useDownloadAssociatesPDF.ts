import { useMutation } from "@tanstack/react-query";
import { downloadAssociatesPDF } from "../../services/Associates/adminAssociatesService";
import { downloadBlob } from "../../utils/pdf";
import { getCostaRicaFileStamp } from "@/utils/dateForPdf";

export function useDownloadAssociatesPDF() {
  return useMutation({
    mutationFn: async (params: { estado?: string; search?: string; sort?: string }) => {
      const blob = await downloadAssociatesPDF(params)
      return { blob, params }
    },
    onSuccess: ({ blob }) => {
      downloadBlob(blob, `asociados_${getCostaRicaFileStamp()}.pdf`)
    },
  })
}
