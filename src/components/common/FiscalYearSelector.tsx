import { useMemo, useState, useRef, useEffect } from "react"
import { useFiscalYear } from "../../hooks/Budget/useFiscalYear"
import { ChevronDown, ChevronUp } from "lucide-react"
import { CustomSelect } from "../CustomSelect"
import { ActionButtons } from "../ActionButtons"

export default function FiscalYearSelector() {
  const { list, current, setCurrentById, createYear, closeYear, loading } = useFiscalYear()
  const [open, setOpen] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  const nextYear = useMemo(
    () => (current ? current.year + 1 : new Date().getFullYear() + 1),
    [current]
  )

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!barRef.current) return
      if (!barRef.current.contains(e.target as Node)) setOpen(false)
    }

    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  const fiscalYearOptions = list.map((fy) => ({
    value: fy.id,
    label: `${fy.year}${fy.is_active ? " (activo)" : ""}${
      fy.state === "CLOSED" ? " [cerrado]" : ""
    }`,
  }))

  const handleCloseFiscalYear = async () => {
    if (!current) return
    await closeYear(current.id)
  }

  const handleCreateFiscalYear = async () => {
    await createYear({
      year: nextYear,
      start_date: `${nextYear}-01-01`,
      end_date: `${nextYear}-12-31`,
      is_active: true,
    })
  }

  return (
    <div className="w-full" ref={barRef}>
      {/* ====== Pastilla encabezado ====== */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl border-2 border-[#EAEFE0] bg-white px-4 py-2 text-sm text-[#33361D] shadow-sm hover:bg-[#F8F9F3] transition"
      >
        <span className="font-semibold text-[#556B2F]">Año:</span>
        <span className="font-bold text-[#5B732E]">{current?.year ?? "—"}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-[#556B2F]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#556B2F]" />
        )}
      </button>

      {/* ====== Barra desplegable ====== */}
      {open && (
        <div
          className="mt-3 flex flex-col gap-3 rounded-2xl border-2 border-[#EAEFE0] bg-[#F8F9F3] px-4 py-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-sm font-semibold text-[#33361D] sm:min-w-[80px]">
            Año fiscal
          </span>

          <div className="w-full min-w-0 flex-1 sm:w-auto">
            <CustomSelect
              value={current?.id ?? ""}
              onChange={(value) => setCurrentById(Number(value))}
              options={fiscalYearOptions}
              placeholder="Selecciona un año fiscal"
              disabled={loading}
              size="md"
              zIndex={60}
              buttonClassName="rounded-xl border-2 border-[#EAEFE0] bg-white shadow-none text-[#33361D]"
              optionsClassName="rounded-xl border-2 border-[#EAEFE0]"
            />
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            {current?.state === "OPEN" && (
              <ActionButtons
                showCancelAlt
                onCancelAlt={handleCloseFiscalYear}
                requireConfirmCancelAlt
                cancelAltText="Cerrar"
                cancelAltConfirmTitle={`¿Cerrar ${current.year}?`}
                cancelAltConfirmText={` (quedará inactivo)`}
                showText
              />
            )}

            <ActionButtons
              showCreateAlt
              onCreateAlt={handleCreateFiscalYear}
              requireConfirmCreateAlt
              createAltText={`Nuevo ${nextYear}`}
              createAltConfirmTitle={`¿Crear ${nextYear} como activo?`}
              createAltConfirmText={`Se creará el año fiscal ${nextYear} y quedará activo.`}
              showText
            />
          </div>
        </div>
      )}
    </div>
  )
}