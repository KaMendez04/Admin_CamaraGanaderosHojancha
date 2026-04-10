import { showErrorAlertEmpty } from "@/utils/alerts"
import { useApprovedVolunteerDocsLink, useSolicitudVoluntariadoDocsLink } from "@/hooks/Volunteers/useVolunteerDocsLink"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  mode: "SOLICITUD" | "APROBADO"
  idSolicitud?: number
  approvedParams?: { tipo: "INDIVIDUAL" | "ORGANIZACION"; id: number }
}

export function VolunteerDocsModal({
  open,
  onOpenChange,
  mode,
  idSolicitud,
  approvedParams,
}: Props) {
  // ✅ Hooks SIEMPRE arriba, sin if
  const solicitudLink = useSolicitudVoluntariadoDocsLink()
  const approvedLink = useApprovedVolunteerDocsLink()

  async function handleOpenFolder() {
    try {
      let res: any

      if (mode === "SOLICITUD") {
        if (!idSolicitud) throw new Error("Falta idSolicitud")
        res = await solicitudLink.mutateAsync(idSolicitud)
      } else {
        if (!approvedParams) throw new Error("Faltan parámetros de aprobado")
        res = await approvedLink.mutateAsync(approvedParams)
      }

      const url = res?.url ?? res?.link
      if (typeof url === "string" && url.length > 0) {
        // ✅ FIX: window.open en vez de window.location.href
        // window.location.href navega fuera del admin y puede perder la sesión
        window.open(url, "_blank", "noopener,noreferrer")
      } else {
        void showErrorAlertEmpty("No se pudo obtener el enlace de documentos")
      }
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "No se pudieron abrir los documentos"
      void showErrorAlertEmpty(Array.isArray(msg) ? msg.join(", ") : msg)
    }
  }

  if (!open) return null

  const isPending = solicitudLink.isPending || approvedLink.isPending

  return (
    <div>
      {/* tu UI del modal aquí */}
      <button onClick={handleOpenFolder} disabled={isPending}>
        {isPending ? "Abriendo..." : "Ver carpeta"}
      </button>

      <button onClick={() => onOpenChange(false)}>Cerrar</button>
    </div>
  )
}