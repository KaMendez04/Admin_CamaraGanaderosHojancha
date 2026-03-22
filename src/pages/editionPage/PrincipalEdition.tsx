import NavbarEditionSection from "../../components/NavbarEditionSection"
import { useEffect, useMemo, useState } from "react"
import { usePrincipalEdit } from "../../hooks/EditionSection/PrincipalHook"
import { CharCounter } from "../../components/CharCounter"
import { showSuccessAlert } from "../../utils/alerts"
import { ActionButtons } from "../../components/ActionButtons"

const DEFAULT_TITLE = "Asociación Cámara Ganaderos Hojancha"

function PrincipalEdition() {
  const { data, loading, saving, error, save, create } = usePrincipalEdit()

  const [description, setDescription] = useState("")
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (data) {
      setDescription(data.description ?? "")
    } else {
      setDescription("")
    }
  }, [data])

  useEffect(() => {
    if (data) {
      setHasChanges(description !== (data.description ?? ""))
    } else {
      setHasChanges(description.trim() !== "")
    }
  }, [description, data])

  const isEditing = useMemo(() => Boolean(data), [data])

  const handleCancel = () => {
    if (data) {
      setDescription(data.description ?? "")
    } else {
      setDescription("")
    }
  }

  const handleSave = async () => {
    try {
      if (isEditing) {
        await save({ title: data!.title, description })
      } else {
        await create({ title: DEFAULT_TITLE, description })
      }

      if (!error) {
        showSuccessAlert("Actualización completada")
      }
    } catch (err) {
      console.error("Error al guardar:", err)
    }
  }

  return (
    <div className="min-h-screen bg-[#F3F8EF] px-4 py-4 text-[#2E321B] md:px-6 md:py-5">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4">
          <NavbarEditionSection />
        </div>

        <div className="mx-auto mb-5 max-w-3xl text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#243018] md:text-3xl">
            Edición de la Sección Principal
          </h1>
          <p className="mt-2 text-sm text-[#5F6E3E] md:text-base">
            {isEditing
              ? "Modifica la información principal que aparece en la página de inicio."
              : "Aún no existe un registro de la sección principal. Crea uno nuevo con el título por defecto."}
          </p>
        </div>

        <div className="rounded-[28px] border border-[#DDD8CA] bg-white p-4 shadow-sm md:p-5">
          {loading ? (
            <div className="flex min-h-[180px] items-center justify-center">
              <p className="text-sm text-slate-500">Cargando…</p>
            </div>
          ) : (
            <div className="space-y-4">
              <section className="rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
                <div className="mb-3">
                  <label
                    htmlFor="title"
                    className="block text-lg font-semibold text-[#2F3C22]"
                  >
                    Título Principal{" "}
                    <span className="text-sm font-medium text-slate-500">
                      (No editable)
                    </span>
                  </label>
                </div>

                <textarea
                  id="title"
                  rows={1}
                  value={DEFAULT_TITLE}
                  disabled
                  className="w-full resize-none rounded-2xl border border-[#D8DCCF] bg-[#F6F7F3] px-4 py-3 text-base text-slate-600 outline-none"
                />

                <p className="mt-2 text-sm text-slate-500">
                  Este título es fijo y no se puede modificar.
                </p>
              </section>

              <section className="rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="block text-lg font-semibold text-[#2F3C22]"
                  >
                    Descripción
                  </label>
                </div>

                <textarea
                  id="description"
                  rows={4}
                  value={description}
                  maxLength={250}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full resize-none rounded-2xl border border-[#D8DCCF] bg-white px-4 py-3 text-base leading-relaxed text-[#2E321B] outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
                  placeholder="Escribe aquí la descripción que se mostrará en la página de inicio…"
                  disabled={saving}
                />

                <div className="mt-2 flex justify-end">
                  <CharCounter value={description} max={250} />
                </div>
              </section>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-end">

                <ActionButtons
                  size="sm"
                  onSave={handleSave}
                  onCancel={handleCancel}
                  showSave={true}
                  showCancel={true}
                  showText={true}
                  isSaving={saving}
                  requireConfirmCancel={hasChanges}
                  cancelConfirmText="Los cambios no guardados se perderán."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PrincipalEdition