import NavbarEditionSection from "../../components/NavbarEditionSection";
import { HeaderBlock } from "../../components/PagesEdition/HeaderBlock";
import { EditableBenefits } from "../../components/PagesEdition/EditableBenefits";
import { EditableRequirements } from "../../components/PagesEdition/EditableRequirements";
import { useVolunteersEdition } from "../../hooks/EditionSection/VolunteersEdition";

export default function VolunteersEdition() {
  const {
    loading,
    savingHeader,
    savingBenefits,
    savingRequirements,
    error,
    limits,
    reload,
    headerTitle,
    headerDescription,
    setHeaderTitle,
    setHeaderDescription,
    resetHeader,
    saveHeader,
    canSaveHeader,
    benefits,
    benefitIndex,
    setBenefitIndex,
    updateBenefitText,
    resetCurrentBenefit,
    saveCurrentBenefit,
    canSaveBenefit,
    requirements,
    requirementIndex,
    setRequirementIndex,
    updateRequirement,
    addRequirement,
    resetCurrentRequirement,
    saveRequirements,
    canSaveReq,
  } = useVolunteersEdition();

  return (
    <div className="min-h-screen bg-[#f3f8ef] px-4 py-4 text-[#2E321B] md:px-6 md:py-5">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4">
          <NavbarEditionSection />
        </div>

        <div className="mx-auto mb-5 max-w-3xl text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#243018] md:text-3xl">
            Edición de la Sección Sobre Voluntarios
          </h1>
          <p className="mt-2 text-sm text-[#5F6E3E] md:text-base">
            Edita cada bloque de información para la sección de voluntarios.
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
                onClick={reload}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
              >
                Reintentar
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] border border-[#DDD8CA] bg-white p-4 shadow-sm md:p-5">
            <div className="space-y-4">
              <HeaderBlock
                title={headerTitle}
                desc={headerDescription}
                limits={{ title: limits.title, desc: limits.desc }}
                onTitle={setHeaderTitle}
                onDesc={setHeaderDescription}
                onCancel={resetHeader}
                onSave={saveHeader}
                canSave={canSaveHeader}
                saving={savingHeader}
              />

              <EditableBenefits
                items={benefits}
                index={benefitIndex}
                setIndex={setBenefitIndex}
                limits={{
                  benefitTitle: limits.benefitTitle,
                  benefitDesc: limits.benefitDesc,
                }}
                onChange={updateBenefitText}
                onCancel={resetCurrentBenefit}
                onSave={saveCurrentBenefit}
                canSave={canSaveBenefit}
                saving={savingBenefits}
              />

              <EditableRequirements
                items={requirements}
                index={requirementIndex}
                setIndex={setRequirementIndex}
                limits={{ requirement: limits.requirement }}
                onChange={updateRequirement}
                onAdd={addRequirement}
                onCancel={resetCurrentRequirement}
                onSave={saveRequirements}
                canSave={canSaveReq}
                saving={savingRequirements}
              />

            </div>
          </div>
        )}
      </div>
    </div>
  );
}