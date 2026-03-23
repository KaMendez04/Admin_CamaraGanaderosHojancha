import { useState } from "react"
import { z } from "zod"
import { useForm } from "@tanstack/react-form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import type { CreateUserPayload } from "@/models/settings/UserCRUD"
import { zodMsg } from "@/shared/validators/zod"
import { CustomSelect } from "@/components/CustomSelect"
import { strongPasswordSchema } from "@/shared/validators/password"
import { PasswordInput } from "../ChangePassword/PasswordInput"
import { CharCounter } from "../CharCounter"
import { showSuccessAlertRegister } from "@/utils/alerts"

const schema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Nombre del usuario requerido.")
    .max(75, "El nombre del usuario no puede tener más de 75 caracteres."),
  email: z
    .string()
    .trim()
    .max(75, "El correo no puede tener más de 75 caracteres.")
    .email("Correo inválido."),
  password: z
    .string()
    .max(75, "La contraseña no puede tener más de 75 caracteres.")
    .pipe(strongPasswordSchema),
  confirmPassword: z
    .string()
    .min(1, "Confirmación requerida.")
    .max(75, "La confirmación no puede tener más de 75 caracteres."),
  roleId: z.coerce.number(),
})

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  onCreate: (payload: CreateUserPayload) => Promise<void>
}

export default function CreateUserDialog({
  open,
  onOpenChange,
  onCreate,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const USERNAME_MAX = 75
  const EMAIL_MAX = 75
  const PASSWORD_MAX = 75

  const inputClass =
    "bg-white border-[#DCD6C9] focus-visible:ring-[#708C3E]/30 focus-visible:ring-2 focus-visible:ring-offset-0 rounded-md"

  const labelClass =
    "block text-[11px] font-semibold text-[#708C3E] uppercase tracking-wide mb-1"

  const helpText = "mt-1 text-xs text-gray-500"
  const errorText = "mt-1 text-xs text-red-600"

  const roleOptions = [
    { value: 1, label: "ADMIN" },
    { value: 2, label: "JUNTA" },
  ]

  const handleClose = () => {
    if (isSubmitting) return
    setSubmitError(null)
    form.reset()
    onOpenChange(false)
  }

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      roleId: 2,
    } as any,
    onSubmit: async ({ value }) => {
      const parsed = schema.safeParse(value)
      if (!parsed.success) return

      setIsSubmitting(true)
      setSubmitError(null)

      try {
        await onCreate({
          username: parsed.data.username,
          email: parsed.data.email,
          password: parsed.data.password,
          roleId: Number(parsed.data.roleId),
        })

        form.reset()
        onOpenChange(false)

        setTimeout(() => {
          void showSuccessAlertRegister("Usuario creado")
        }, 0)
      } catch (err: any) {
        const msg =
          Array.isArray(err?.response?.data?.message)
            ? err.response.data.message.join(", ")
            : err?.response?.data?.message ||
              err?.message ||
              "No se pudo crear el usuario."

        setSubmitError(msg)
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isSubmitting) return

        if (!nextOpen) {
          setSubmitError(null)
          form.reset()
        }

        onOpenChange(nextOpen)
      }}
    >
      <DialogContent
        onInteractOutside={(e) => {
          if (isSubmitting) e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          if (isSubmitting) e.preventDefault()
        }}
        className={[
          "p-0 border border-[#E6E1D6] shadow-2xl",
          "bg-[#FAF9F5] rounded-3xl",
          "w-[calc(100vw-2rem)] sm:max-w-2xl",
          "overflow-hidden",
        ].join(" ")}
      >
        <DialogHeader className="px-6 py-4 border-b border-[#E6E1D6] bg-white">
          <DialogTitle>Crear usuario</DialogTitle>
          <DialogDescription>
            Asigna rol solo al crear. Luego no se podrá editar.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="px-6 py-6 space-y-6 max-h-[70vh] overflow-y-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {submitError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <section>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#708C3E]">
              Información del usuario
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="username"
                validators={{
                  onChange: ({ value }) => zodMsg(schema.shape.username, value),
                  onBlur: ({ value }) => zodMsg(schema.shape.username, value),
                }}
              >
                {(f) => {
                  const err = f.state.meta.errors?.[0]

                  return (
                    <div>
                      <label className={labelClass}>Nombre del Usuario</label>
                      <Input
                        maxLength={USERNAME_MAX}
                        value={f.state.value}
                        onBlur={f.handleBlur}
                        onChange={(e) =>
                          f.handleChange(e.target.value.slice(0, USERNAME_MAX))
                        }
                        className={inputClass}
                        disabled={isSubmitting}
                      />
                      <CharCounter value={f.state.value} max={USERNAME_MAX} />
                      <p className={helpText}>Ejemplo: Junta Directiva</p>
                      {err && <p className={errorText}>{err}</p>}
                    </div>
                  )
                }}
              </form.Field>

              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => zodMsg(schema.shape.email, value),
                  onBlur: ({ value }) => zodMsg(schema.shape.email, value),
                }}
              >
                {(f) => {
                  const err = f.state.meta.errors?.[0]

                  return (
                    <div>
                      <label className={labelClass}>Email</label>
                      <Input
                        type="email"
                        maxLength={EMAIL_MAX}
                        value={f.state.value}
                        onBlur={f.handleBlur}
                        onChange={(e) =>
                          f.handleChange(e.target.value.slice(0, EMAIL_MAX))
                        }
                        className={inputClass}
                        disabled={isSubmitting}
                      />
                      <CharCounter value={f.state.value} max={EMAIL_MAX} />
                      <p className={helpText}>Ejemplo: tucorreo@dominio.com</p>
                      {err && <p className={errorText}>{err}</p>}
                    </div>
                  )
                }}
              </form.Field>

              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => zodMsg(schema.shape.password, value),
                  onBlur: ({ value }) => zodMsg(schema.shape.password, value),
                }}
              >
                {(f) => {
                  const err = f.state.meta.errors?.[0]

                  return (
                    <div>
                      <label className={labelClass}>Contraseña</label>
                      <PasswordInput
                        value={f.state.value}
                        onBlur={f.handleBlur}
                        onChange={(v) =>
                          f.handleChange(v.slice(0, PASSWORD_MAX))
                        }
                        autoComplete="new-password"
                        maxLength={PASSWORD_MAX}
                        className="h-11 border-[#DCD6C9] focus-visible:ring-[#708C3E]/30 focus-visible:ring-2 focus-visible:ring-offset-0 rounded-md"
                        disabled={isSubmitting}
                      />
                      <CharCounter value={f.state.value} max={PASSWORD_MAX} />
                      <ul className="mt-2 list-disc pl-5 text-[11px] text-gray-500">
                        <li>Al menos 8 caracteres</li>
                        <li>
                          Una mayúscula, una minúscula, un número y un símbolo
                        </li>
                      </ul>
                      {err && <p className={errorText}>{err}</p>}
                    </div>
                  )
                }}
              </form.Field>

              <form.Field
                name="confirmPassword"
                validators={{
                  onChangeListenTo: ["password"],
                  onChange: ({ value, fieldApi }) => {
                    const pwd = fieldApi.form.getFieldValue("password")
                    if (!value) return "Confirmación requerida."
                    if (value.length > PASSWORD_MAX) {
                      return "La confirmación no puede tener más de 75 caracteres."
                    }
                    if (value !== pwd) return "Las contraseñas no coinciden."
                    return undefined
                  },
                  onBlur: ({ value, fieldApi }) => {
                    const pwd = fieldApi.form.getFieldValue("password")
                    if (!value) return "Confirmación requerida."
                    if (value.length > PASSWORD_MAX) {
                      return "La confirmación no puede tener más de 75 caracteres."
                    }
                    if (value !== pwd) return "Las contraseñas no coinciden."
                    return undefined
                  },
                }}
              >
                {(f) => {
                  const err = f.state.meta.errors?.[0]

                  return (
                    <div>
                      <label className={labelClass}>Confirmar contraseña</label>
                      <PasswordInput
                        value={f.state.value}
                        onBlur={f.handleBlur}
                        onChange={(v) =>
                          f.handleChange(v.slice(0, PASSWORD_MAX))
                        }
                        autoComplete="new-password"
                        maxLength={PASSWORD_MAX}
                        className="h-11 border-[#DCD6C9] focus-visible:ring-[#708C3E]/30 focus-visible:ring-2 focus-visible:ring-offset-0 rounded-md"
                        disabled={isSubmitting}
                      />
                      <CharCounter value={f.state.value} max={PASSWORD_MAX} />
                      <p className={helpText}>Repite la contraseña</p>
                      {err && <p className={errorText}>{err}</p>}
                    </div>
                  )
                }}
              </form.Field>

              <form.Field name="roleId">
                {(f) => (
                  <div>
                    <label className={labelClass}>Rol</label>
                    <CustomSelect
                      value={Number(f.state.value)}
                      onChange={(v) => f.handleChange(Number(v))}
                      options={roleOptions}
                      placeholder="Selecciona un rol"
                      buttonClassName="h-9"
                      size="md"
                      zIndex={80}
                      disabled={isSubmitting}
                    />
                    <p className={helpText}>Este rol solo se define al crear.</p>
                  </div>
                )}
              </form.Field>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-5 border-t border-[#E6E1D6]">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-full border border-[#DCD6C9] bg-white px-6 py-3 font-semibold text-[#556B2F] transition hover:bg-[#F5F3EA] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-[#789A3B] px-6 py-3 font-bold text-white shadow-[0_10px_25px_rgba(120,154,59,0.22)] transition hover:bg-[#6c8c34] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creando..." : "Crear usuario"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}