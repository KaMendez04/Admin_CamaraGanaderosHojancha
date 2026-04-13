import React from "react"
import { Mail, Lock, AlertCircle, Eye, EyeOff, Check, X } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useLoginTanForm } from "../../hooks/useLoginTanform"
import { loginSchema, zodFieldValidator } from "../../schemas/loginSchema"

interface LoginFormProps {
  email: string
  setEmail: (v: string) => void
  password: string
  setPassword: (v: string) => void
  remember: boolean
  setRemember: (v: boolean) => void
  loading: boolean
  error: string | null
  handleSubmit: (e: React.FormEvent) => void
  isRateLimited?: boolean
  remainingSeconds?: number | null
}

export default function LoginForm(props: LoginFormProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    email,
    setEmail,
    password,
    setPassword,
    remember,
    setRemember,
    loading,
    error,
    handleSubmit,
    isRateLimited = false,
    remainingSeconds = null,
  } = props

  const { form, onSubmit } = useLoginTanForm({
    email,
    password,
    remember,
    setEmail,
    setPassword,
    setRemember,
    handleSubmit,
  })

  const buttonDisabled = loading || isRateLimited

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Email */}
      <form.Field
        name="email"
        validators={{ onChange: zodFieldValidator(loginSchema.shape.email) }}
      >
        {(field) => {
          const err = field.state.meta.errors[0]
          return (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Correo electrónico
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>

                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    field.handleChange(e.target.value)
                  }}
                  onBlur={field.handleBlur}
                  className={[
                    "w-full h-11 pl-10 pr-3 text-[15px] rounded-md",
                    "border bg-white outline-none transition",
                    "placeholder:text-slate-400",
                    err
                      ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#7FB347] focus:ring-4 focus:ring-[#7FB347]/15",
                  ].join(" ")}
                  required
                  aria-invalid={!!err}
                  aria-describedby="email-error"
                />
              </div>

              {err && (
                <p id="email-error" className="text-sm text-red-600">
                  {err}
                </p>
              )}
            </div>
          )
        }}
      </form.Field>

      {/* Password */}
      <form.Field
        name="password"
        validators={{ onChange: zodFieldValidator(loginSchema.shape.password) }}
      >
        {(field) => {
          const err = field.state.meta.errors[0]
          return (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Contraseña
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    field.handleChange(e.target.value)
                  }}
                  onBlur={field.handleBlur}
                  className={[
                    "w-full h-11 pl-10 pr-10 text-[15px] rounded-md",
                    "border bg-white outline-none transition",
                    "placeholder:text-slate-400",
                    err
                      ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#7FB347] focus:ring-4 focus:ring-[#7FB347]/15",
                  ].join(" ")}
                  required
                  aria-invalid={!!err}
                  aria-describedby="password-error"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#708C3E] focus:outline-none"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {err && (
                <p id="password-error" className="text-sm text-red-600">
                  {err}
                </p>
              )}
            </div>
          )
        }}
      </form.Field>

      {/* Recordarme / Olvidé */}
      <form.Field name="remember">
        {(field) => (
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 text-sm text-slate-700 select-none cursor-pointer"
              onClick={() => {
                const next = !remember
                setRemember(next)
                field.handleChange(next)
              }}
            >
              <button
                type="button"
                id="remember-toggle"
                role="switch"
                aria-checked={remember}
                tabIndex={0}
                className={[
                  "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7FB347] focus-visible:ring-offset-2",
                  remember ? "bg-[#708C3E]" : "bg-slate-300", 
                ].join(" ")}
              >
                <span className="sr-only">Recordarme</span>

                <span
                  aria-hidden="true"
                  className={[
                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out",
                    remember ? "translate-x-4" : "translate-x-0",
                  ].join(" ")}
                />
              </button>
              <span>Recordarme</span>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 hover:underline"
            >
              Olvidé mi contraseña
            </Link>
          </div>
        )}
      </form.Field>

      {/* Error externo */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex gap-2">
          <AlertCircle className="h-4 w-4 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Botón */}
      <form.Subscribe
        selector={(s) => ({ canSubmit: s.canSubmit, isSubmitting: s.isSubmitting })}
      >
        {({ canSubmit, isSubmitting }) => {
          const disabled = buttonDisabled || isSubmitting || !canSubmit
          const label = isRateLimited
            ? remainingSeconds && remainingSeconds > 0
              ? `Demasiados intentos • espera ${remainingSeconds}s`
              : "Demasiados intentos"
            : loading || isSubmitting
              ? "Ingresando..."
              : "Ingresar"

          return (
            <button
              type="submit"
              disabled={disabled}
              className={[
                "w-full h-11 rounded-md text-[15px] font-semibold text-white",
                "bg-[#C4A661] border border-[#7FB347]/20 hover:opacity-95 transition",
                "shadow-sm shadow-black/5",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "focus:outline-none focus:ring-4 focus:ring-[#C4A661]/25",
              ].join(" ")}
            >
              {label}
            </button>
          )
        }}
      </form.Subscribe>
    </form>
  )
}
