import { useMutation } from "@tanstack/react-query"
import {
  getSolicitudPdfBlob,
  getSolicitudComplete,
} from "../../services/Associates/adminSolicitudesService"
import { downloadBlob } from "../../utils/pdf"

function cleanFilePart(value: string) {
  return value
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w\-áéíóúÁÉÍÓÚñÑ]/g, "")
}

export function useDownloadSolicitudPDF() {
  return useMutation({
    mutationFn: async (id: number) => {
      const [blob, solicitud] = await Promise.all([
        getSolicitudPdfBlob(id),
        getSolicitudComplete(id),
      ])

      return { blob, solicitud }
    },
    onSuccess: ({ blob, solicitud }) => {
      const nombre = solicitud.persona.nombre?? "sin_nombre"
      const apellido = solicitud.persona.apellido1?? "sin_apellido"
      const cedula = solicitud.persona.cedula ?? "sin_cedula"

      const safeNombre = cleanFilePart(nombre)
      const safeApellido = cleanFilePart(apellido)
      const safeCedula = cleanFilePart(cedula)

      downloadBlob(blob, `${safeNombre}_${safeApellido}_${safeCedula}.pdf`)
    },
  })
}

export const useOpenSolicitudPDF = useDownloadSolicitudPDF