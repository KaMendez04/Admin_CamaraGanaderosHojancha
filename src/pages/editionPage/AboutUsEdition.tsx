import NavbarEditionSection from "../../components/NavbarEditionSection"
import { useAboutUsEdit } from "../../hooks/EditionSection/AboutUsHook"
import { showSuccessAlert } from "../../utils/alerts"
import { ActionButtons } from "../../components/ActionButtons"

export default function AboutUsEdition() {
  const {
    loading,
    saving,
    error,
    isEditing,
    whoWeAre,
    setWhoWeAre,
    mission,
    setMission,
    vision,
    setVision,
    saveAll,
    hasChanges,
    canSave,
    initialWhoWeAre,
    initialMission,
    initialVision,
  } = useAboutUsEdit()

  const handleSave = async () => {
    try {
      await saveAll()

      if (!error) {
        showSuccessAlert("Actualización completada")
      }
    } catch (err) {
      console.error("Error al guardar:", err)
    }
  }

  const handleCancel = () => {
    setWhoWeAre(initialWhoWeAre)
    setMission(initialMission)
    setVision(initialVision)
  }

  const MAX = 1000
  const leftWho = Math.max(0, MAX - (whoWeAre?.length ?? 0))
  const leftMission = Math.max(0, MAX - (mission?.length ?? 0))
  const leftVision = Math.max(0, MAX - (vision?.length ?? 0))

  return (
    <div className="min-h-screen bg-[#f3f8ef] px-4 py-4 text-[#2E321B] md:px-6 md:py-5">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4">
          <NavbarEditionSection />
        </div>

        <div className="mx-auto mb-5 max-w-3xl text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#243018] md:text-3xl">
            Edición de la Sección Sobre Nosotros
          </h1>
          <p className="mt-2 text-sm text-[#5F6E3E] md:text-base">
            {isEditing
              ? "Modifica “¿Quiénes somos?”, “Misión” y “Visión”."
              : "Crea las secciones de Sobre Nosotros."}
          </p>
        </div>

        {loading ? (
          <div className="rounded-[28px] border border-[#DDD8CA] bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-slate-500">Cargando…</p>
          </div>
        ) : error ? (
          <div className="rounded-[28px] border border-red-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-red-600">Error: {error}</p>
            <div className="mt-4">
              <button
                onClick={() => window.location.reload()}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
              >
                Reintentar
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] border border-[#DDD8CA] bg-white p-4 shadow-sm md:p-5">

            <div className="space-y-4">
              <section className="rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
                <label
                  htmlFor="whoWeAre"
                  className="mb-2 block text-base font-semibold text-[#2F3C22]"
                >
                  ¿Quiénes somos? <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="whoWeAre"
                  rows={4}
                  value={whoWeAre ?? ""}
                  onChange={(e) => setWhoWeAre(e.target.value)}
                  maxLength={MAX}
                  disabled={saving}
                  className="w-full resize-none rounded-2xl border border-[#D8DCCF] bg-white px-4 py-3 text-base leading-relaxed text-[#2E321B] outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
                  placeholder="Describe quiénes son…"
                />

                <div className="mt-2 flex justify-end">
                  <p className="text-xs text-slate-500">
                    Quedan {leftWho} de {MAX} caracteres
                  </p>
                </div>
              </section>

              <section className="rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
                <label
                  htmlFor="mission"
                  className="mb-2 block text-base font-semibold text-[#2F3C22]"
                >
                  Misión <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="mission"
                  rows={4}
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  maxLength={MAX}
                  disabled={saving}
                  className="w-full resize-none rounded-2xl border border-[#D8DCCF] bg-white px-4 py-3 text-base leading-relaxed text-[#2E321B] outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
                  placeholder="Escribe la misión…"
                />

                <div className="mt-2 flex justify-end">
                  <p className="text-xs text-slate-500">
                    Quedan {leftMission} de {MAX} caracteres
                  </p>
                </div>
              </section>

              <section className="rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
                <label
                  htmlFor="vision"
                  className="mb-2 block text-base font-semibold text-[#2F3C22]"
                >
                  Visión <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="vision"
                  rows={4}
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  maxLength={MAX}
                  disabled={saving}
                  className="w-full resize-none rounded-2xl border border-[#D8DCCF] bg-white px-4 py-3 text-base leading-relaxed text-[#2E321B] outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
                  placeholder="Escribe la visión…"
                />

                <div className="mt-2 flex justify-end">
                  <p className="text-xs text-slate-500">
                    Quedan {leftVision} de {MAX} caracteres
                  </p>
                </div>
              </section>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-end sm:justify-end">
                <ActionButtons
                  size="sm"
                  onSave={handleSave}
                  onCancel={handleCancel}
                  showSave={true}
                  showCancel={true}
                  showText={true}
                  isSaving={saving}
                  disabled={!canSave || !hasChanges}
                  requireConfirmCancel={hasChanges}
                  cancelConfirmText="Los cambios no guardados se perderán."
                  saveText={isEditing ? "Guardar cambios" : "Crear secciones"}
                  cancelText="Cancelar"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}