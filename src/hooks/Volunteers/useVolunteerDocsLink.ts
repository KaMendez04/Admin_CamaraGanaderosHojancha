import {
  getApprovedVoluntariadoDocumentsLink,
  getSolicitudVoluntariadoDocumentsLink,
} from "@/services/Volunteers/volunteerService"
import { useMutation, useQuery } from "@tanstack/react-query"

// ─── Verifica si una solicitud tiene documentos ───────────────────────────────
// ✅ FIX: se agrega `enabled` para que el query SOLO se dispare cuando el modal
// está abierto. Sin esto, se monta para cada fila de la tabla al mismo tiempo
// y genera decenas de llamadas 400 simultáneas al backend.
export function useSolicitudHasDocs(
  idSolicitud: number | null | undefined,
  enabled = false,   // ← por defecto NO corre; el modal lo activa con open===true
) {
  return useQuery({
    queryKey: ["solicitud-docs-check", idSolicitud],
    enabled: !!idSolicitud && enabled,
    retry: false,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      try {
        await getSolicitudVoluntariadoDocumentsLink(idSolicitud!)
        return true
      } catch {
        return false
      }
    },
  })
}

// ─── Mutación para abrir la carpeta al hacer clic ────────────────────────────
export function useSolicitudVoluntariadoDocsLink() {
  return useMutation({
    mutationFn: (idSolicitud: number) =>
      getSolicitudVoluntariadoDocumentsLink(idSolicitud),
  })
}

export function useApprovedVolunteerDocsLink() {
  return useMutation({
    mutationFn: (params: { tipo: "INDIVIDUAL" | "ORGANIZACION"; id: number }) =>
      getApprovedVoluntariadoDocumentsLink(params),
  })
}

// ─── Verifica si un voluntario/organización aprobado tiene documentos ─────────
// ✅ FIX: mismo patrón — solo corre cuando el modal está abierto
export function useApprovedHasDocs(
  params: { tipo: "INDIVIDUAL" | "ORGANIZACION"; id: number } | null | undefined,
  enabled = false,   // ← por defecto NO corre
) {
  return useQuery({
    queryKey: ["approved-docs-check", params?.tipo, params?.id],
    enabled: !!params?.id && enabled,
    retry: false,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      try {
        await getApprovedVoluntariadoDocumentsLink(params!)
        return true
      } catch {
        return false
      }
    },
  })
}