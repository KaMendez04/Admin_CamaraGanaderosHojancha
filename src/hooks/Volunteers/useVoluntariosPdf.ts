import { useMutation } from "@tanstack/react-query";
import {
  getVolunteerSolicitud,
  voluntarioDetallePdfService,
  solicitudesVoluntariadoPdfService,
  voluntariosPdfService,
} from "@/services/Volunteers/volunteerService";
import { downloadBlob } from "@/utils/pdf";
import { getCostaRicaFileStamp } from "@/utils/dateForPdf";

function cleanFilePart(value: string) {
  return value
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w\-áéíóúÁÉÍÓÚñÑ]/g, "");
}

function getEstadoFilePart(estado?: string) {
  if (!estado) return "todas";

  switch (estado.toUpperCase()) {
    case "PENDIENTE":
      return "pendientes";
    case "APROBADO":
      return "aprobadas";
    case "RECHAZADO":
      return "rechazadas";
    default:
      return estado.toLowerCase();
  }
}

export function useDownloadListadoVoluntariosPDF() {
  return useMutation({
    mutationFn: async () => {
      await voluntariosPdfService.downloadListadoVoluntariosPdf(
        `listado-voluntarios_${getCostaRicaFileStamp()}.pdf`
      );
    },
  });
}

export function useDownloadSolicitudesVoluntariadoPDF() {
  return useMutation({
    mutationFn: async (estado?: string) => {
      const safeEstado = getEstadoFilePart(estado);

      await solicitudesVoluntariadoPdfService.downloadSolicitudesPdf(
        estado,
        `solicitudes_${safeEstado}_${getCostaRicaFileStamp()}.pdf`
      );
    },
  });
}

export function useDownloadVoluntarioDetallePDF() {
  return useMutation({
    mutationFn: async (idSolicitud: number) => {
      const [blob, solicitud] = await Promise.all([
        voluntarioDetallePdfService.getDetallePdf(idSolicitud),
        getVolunteerSolicitud(idSolicitud),
      ]);

      return { blob, solicitud, idSolicitud };
    },
    onSuccess: ({ blob, solicitud }) => {
      const nombre =
        solicitud.voluntario?.persona?.nombre ||
        solicitud.organizacion?.nombre ||
        "sin_nombre";

      const apellido =
        solicitud.voluntario?.persona?.apellido1 ||
        "";

      const cedula =
        solicitud.voluntario?.persona?.cedula ||
        solicitud.organizacion?.cedulaJuridica ||
        "sin_cedula";

      const safeNombre = cleanFilePart(nombre);
      const safeApellido = cleanFilePart(apellido);
      const safeCedula = cleanFilePart(cedula);

      downloadBlob(blob, `${safeNombre}_${safeApellido}_${safeCedula}.pdf`);
    },
  });
}