import NavbarEditionSection from "../../../components/NavbarEditionSection"
import { useFaqManager } from "../../../hooks/EditionSection/FAQHook"
import FAQCreator from "../FAQ/FAQCreator"
import FAQEditor from "../FAQ/FAQEditor"

export default function FAQEdition() {
  const {
    faqs,
    selectedFaqId,
    setSelectedFaqId,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useFaqManager()

  return (
    <div className="min-h-screen bg-[#f3f8ef] px-4 py-4 text-[#2E321B] md:px-6 md:py-5">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4">
          <NavbarEditionSection />
        </div>

        <div className="mx-auto mb-5 max-w-3xl text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#243018] md:text-3xl">
            Edición de la Sección Preguntas Frecuentes
          </h1>
          <p className="mt-2 text-sm text-[#5F6E3E] md:text-base">
            Modifica o agrega las preguntas frecuentes que los usuarios suelen tener.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#DDD8CA] bg-white p-4 shadow-sm md:p-5">
          <div className="space-y-4">
            <FAQCreator onSubmit={handleCreate} />

            <FAQEditor
              faqs={faqs}
              selectedFaqId={selectedFaqId}
              setSelectedFaqId={setSelectedFaqId}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  )
}