import { Filter, Search, X } from "lucide-react"
import { BirthDatePicker } from "@/components/ui/birthDayPicker"
import { CustomSelect } from "../CustomSelect"

type FilterValue = string | number

export interface LogsFiltersValue {
  search: string
  module: FilterValue
  entityType: FilterValue
  actionType: FilterValue
  from: string
  to: string
}

interface LogsFiltersProps {
  value: LogsFiltersValue
  onChange: (value: LogsFiltersValue) => void
  onClear: () => void
}

const MODULE_OPTIONS = [
  { value: "ALL", label: "Todos los módulos" },
  { value: "REAL", label: "Presupuesto real" },
  { value: "PROJECTED", label: "Presupuesto proyectado" },
  { value: "EXTRAORDINARY", label: "Extraordinarios" },
]

const ENTITY_TYPE_OPTIONS = [
  { value: "ALL", label: "Todas las entidades" },
  { value: "INCOME", label: "Ingresos" },
  { value: "SPEND", label: "Gastos" },
  { value: "P_INCOME", label: "Proyección ingresos" },
  { value: "P_SPEND", label: "Proyección gastos" },
  { value: "EXTRAORDINARY", label: "Extraordinarios" },
]

const ACTION_OPTIONS = [
  { value: "ALL", label: "Todas las acciones" },
  { value: "CREATE", label: "Creación" },
  { value: "UPDATE", label: "Actualización" },
  { value: "DELETE", label: "Eliminación" },
  { value: "ALLOCATE", label: "Asignación" },
  { value: "ASSIGN_TO_INCOME", label: "Asign. a ingreso" },
]

const labelClass = "mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#7A8C5A]"

export function LogsFilters({ value, onChange, onClear }: LogsFiltersProps) {
  const hasActiveFilters =
    value.search ||
    value.module !== "ALL" ||
    value.entityType !== "ALL" ||
    value.actionType !== "ALL" ||
    value.from ||
    value.to

  return (
    <div className="rounded-2xl border border-[#E2DDD4] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#EDE9E2] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EBF0DC] text-[#5B732E]">
            <Filter className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-semibold text-[#374321]">Filtros</span>
          {hasActiveFilters && (
            <span className="inline-flex h-5 items-center rounded-full bg-[#5B732E] px-2 text-[10px] font-bold text-white">
              Activos
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-[#7A8C5A] transition hover:bg-[#F4F8EF] hover:text-[#374321]"
          >
            <X className="h-3 w-3" />
            Limpiar
          </button>
        )}
      </div>

      <div className="px-4 py-3">
        <div className="grid grid-rows-2 gap-3 sm:grid-cols-3 xl:grid-rows-[2fr_2fr]">
          {/* Buscar */}
          <div>
            <label className={labelClass}>Buscar</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9BAD78]" />
              <input
                value={value.search}
                onChange={(e) => onChange({ ...value, search: e.target.value })}
                placeholder="Usuario, entidad, descripción..."
                className="h-9 w-full rounded-xl border border-[#DDD8CE] bg-[#FAFAF8] py-2 pl-8 pr-3 text-sm text-[#33361D] placeholder:text-[#B5B0A6] outline-none transition focus:border-[#7A9C4A] focus:bg-white focus:ring-2 focus:ring-[#7A9C4A]/15"
              />
            </div>
          </div>

          {/* Módulo */}
          <div>
            <label className={labelClass}>Módulo</label>
            <CustomSelect
              value={value.module}
              onChange={(module) => onChange({ ...value, module })}
              options={MODULE_OPTIONS}
              placeholder="Todos"
              buttonClassName="rounded-xl border-[#DDD8CE] bg-[#FAFAF8] h-9 text-sm"
              searchable
              searchPlaceholder="Buscar módulo..."
            />
          </div>

         {/* Módulo */}
          <div>
            <label className={labelClass}>Entidad</label>
            <CustomSelect
              value={value.entityType}
              onChange={(entityType) => onChange({ ...value, entityType })}
              options={ENTITY_TYPE_OPTIONS}
              placeholder="Todas"
              buttonClassName="rounded-xl border-[#DDD8CE] bg-[#FAFAF8] h-9 text-sm"
              searchable
              searchPlaceholder="Buscar entidad..."
            />
          </div>

          {/* Acción */}
          <div>
            <label className={labelClass}>Acción</label>
            <CustomSelect
              value={value.actionType}
              onChange={(actionType) => onChange({ ...value, actionType })}
              options={ACTION_OPTIONS}
              placeholder="Todas"
              buttonClassName="rounded-xl border-[#DDD8CE] bg-[#FAFAF8] h-9 text-sm"
              searchable
              searchPlaceholder="Buscar acción..."
            />
          </div>

          {/* Desde */}
          <div>
            <label className={labelClass}>Desde</label>
            <BirthDatePicker
              value={value.from}
              onChange={(from) => onChange({ ...value, from })}
              placeholder="Inicial"
              helperText=""
              triggerClassName="h-9 rounded-xl border-[#DDD8CE] bg-[#FAFAF8] text-sm"
            />
          </div>

          {/* Hasta */}
          <div>
            <label className={labelClass}>Hasta</label>
            <BirthDatePicker
              value={value.to}
              onChange={(to) => onChange({ ...value, to })}
              placeholder="Final"
              helperText=""
              triggerClassName="h-9 rounded-xl border-[#DDD8CE] bg-[#FAFAF8] text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}