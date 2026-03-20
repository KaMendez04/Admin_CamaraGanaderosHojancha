import { useNavigate } from "@tanstack/react-router"
import type { LucideIcon } from "lucide-react"
import { ChevronRight, Loader2 } from "lucide-react"

interface ModuleCardProps {
  title: string
  description: string
  subtitle?: string | number
  icon: LucideIcon
  route: string
  badge?: number
  isLoading?: boolean
}

export function ModuleCard({
  title,
  description,
  subtitle,
  icon: Icon,
  route,
  badge,
  isLoading,
}: ModuleCardProps) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate({to: route})}
      className="group relative w-full rounded-2xl border border-[#E7EBD8] bg-white p-4 text-left shadow-sm transition-all hover:border-[#D9E2BD] hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="rounded-xl bg-[#E6EDC8] p-2.5 text-[#5A7018]">
            <Icon className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#243018]">{title}</p>
            <p className="truncate text-xs text-[#6C775A]">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {badge ? (
            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-yellow-100 px-2 py-0.5 text-[11px] font-bold text-yellow-800">
              {badge}
            </span>
          ) : null}
          <ChevronRight className="h-4 w-4 text-[#91A05A] transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>

      <div className="mt-3">
        {isLoading ? (
          <div className="flex items-center gap-2 text-xs text-[#6C775A]">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Cargando...
          </div>
        ) : (
          <p className="truncate text-xl font-bold text-[#1E2A12]">
            {subtitle ?? "—"}
          </p>
        )}
      </div>
    </button>
  )
}