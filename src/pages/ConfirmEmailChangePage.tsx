import { useEffect, useRef } from "react"
import Swal from "sweetalert2"
import { z } from "zod"
import { useForm } from "@tanstack/react-form"
import { useNavigate, useSearch } from "@tanstack/react-router"

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

        await Swal.fire({
          icon: "success",
          title: "Correo confirmado",
          text: "Tu correo fue actualizado correctamente.",
          confirmButtonText: "Ir al login",
          buttonsStyling: false,
          background: "#FFFCE6",
          color: "#33361D",
          allowOutsideClick: false,
          allowEscapeKey: false,
          heightAuto: false,
          scrollbarPadding: false,
          customClass: {
            popup: "rounded-[28px] px-8 py-10",
            title: "!text-[#33361D] !text-3xl !font-extrabold",
            htmlContainer: "!text-[#4B5563] !text-lg !leading-relaxed",
            actions: "!mt-8 !flex !justify-center",
            confirmButton:
              "!bg-[#708C3E] !text-white !font-bold !rounded-full !px-8 !py-3 !shadow-[0_10px_25px_rgba(112,140,62,0.22)] hover:!bg-[#5f7934] transition",
          },
        })

        navigate({ to: "/login" })
      } catch (e: any) {
        await Swal.fire({
          icon: "error",
          title: "No se pudo confirmar",
          text: e?.message ?? "Error",
          buttonsStyling: false,
          background: "#FFFCE6",
          color: "#33361D",
          allowOutsideClick: false,
          allowEscapeKey: false,
          heightAuto: false,
          scrollbarPadding: false,
          customClass: {
            popup: "rounded-[28px] px-8 py-10",
            title: "!text-[#33361D] !text-3xl !font-extrabold",
            htmlContainer: "!text-[#4B5563] !text-base !leading-relaxed",
            actions: "!mt-8 !flex !justify-center",
            confirmButton:
              "!bg-[#708C3E] !text-white !font-bold !rounded-full !px-8 !py-3 !shadow-[0_10px_25px_rgba(112,140,62,0.22)] hover:!bg-[#5f7934] transition",
          },
        })
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
          Swal.fire({
            icon: "error",
            title: "Token inválido",
            text: err,
            buttonsStyling: false,
            background: "#FFFCE6",
            color: "#33361D",
            allowOutsideClick: false,
            allowEscapeKey: false,
            heightAuto: false,
            scrollbarPadding: false,
            customClass: {
              popup: "rounded-[28px] px-8 py-10",
              title: "!text-[#33361D] !text-3xl !font-extrabold",
              htmlContainer: "!text-[#4B5563] !text-base !leading-relaxed",
              actions: "!mt-8 !flex !justify-center",
              confirmButton:
                "!bg-[#708C3E] !text-white !font-bold !rounded-full !px-8 !py-3 !shadow-[0_10px_25px_rgba(112,140,62,0.22)] hover:!bg-[#5f7934] transition",
            },
          })
          return
        }
        form.handleSubmit()
      }}
    />
  )
}