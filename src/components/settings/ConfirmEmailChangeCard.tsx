import { Button } from "@/components/ui/button"
import {
  adminCard,
  adminCardHeader,
  adminCardBody,
  adminTitle,
  adminDescription,
} from "@/utils/adminStyles"

type Props = {
  token?: string
  loading: boolean
  onConfirm: () => void
}

export default function ConfirmEmailChangeCard({
  token,
  loading,
  onConfirm,
}: Props) {
  const hasToken = !!token

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-10">
      <div className={adminCard}>
        <div className={adminCardHeader}>
          <h1 className={adminTitle}>Confirmar cambio de correo</h1>
          <p className={adminDescription}>
            {hasToken
              ? "Presiona el botón para confirmar el cambio de correo."
              : "No se encontró el token. Abre el enlace desde el correo que recibiste."}
          </p>
        </div>

        <div className={adminCardBody}>
          <Button
            className="w-full rounded-full bg-[#708C3E] px-6 py-3 font-semibold text-white transition hover:bg-[#5f7934] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasToken || loading}
            onClick={onConfirm}
          >
            {loading ? "Confirmando..." : "Confirmar correo"}
          </Button>
        </div>
      </div>
    </div>
  )
}