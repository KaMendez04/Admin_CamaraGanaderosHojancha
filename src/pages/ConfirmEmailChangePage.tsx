import { useEffect, useRef } from "react"
import { z } from "zod"
import { useForm } from "@tanstack/react-form"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { showSuccessAlert, showErrorAlertEmpty } from "@/utils/alerts"

import { useConfirmEmailChange } from "@/hooks/settings/useConfirmEmailChange"
import ConfirmEmailChangeCard from "@/components/settings/ConfirmEmailChangeCard"
import { zodMsg } from "@/shared/validators/zod"

const schema = z.object({
  token: z.string().trim().min(1, "Token inválido. Abre el enlace desde el correo."),
})

export default function ConfirmEmailChangePage() {
  const navigate = useNavigate()
  const { token } = useSearch({ from: "/confirm-email-change" })
  const m = useConfirmEmailChange()
  const didAutoRun = useRef(false)

  const form = useForm({
    defaultValues: { token: token ?? "" },
    onSubmit: async ({ value }) => {
      try {
        const parsed = schema.safeParse(value)
        if (!parsed.success) return

        await m.mutateAsync({ token: parsed.data.token })

        await showSuccessAlert("Tu correo fue actualizado correctamente.", "Correo confirmado")

        navigate({ to: "/login" })
      } catch (e: any) {
        await showErrorAlertEmpty(e?.message ?? "Error", "No se pudo confirmar")
      }
    },
  })

  useEffect(() => {
    if (didAutoRun.current) return
    if (!token) return
    didAutoRun.current = true
    form.handleSubmit()
  }, [token])

  return (
    <ConfirmEmailChangeCard
      token={token}
      loading={m.isPending}
      onConfirm={() => {
        const err = zodMsg(schema.shape.token, token ?? "")
        if (err) {
          showErrorAlertEmpty(err, "Token inválido")
          return
        }
        form.handleSubmit()
      }}
    />
  )
}