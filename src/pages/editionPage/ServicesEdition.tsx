import NavbarEditionSection from "../../components/NavbarEditionSection"
import { useServicesInformative } from "../../hooks/EditionSection/ServicesHook"
import ServicesInformativeEditor from "./service/ServiceEditor"
import ServicesInformativeCreator from "./service/ServicesCreator"

export default function ServicesEdition() {
  const {
    items: services,
    selectedId: selectedServiceId,
    setSelectedId: setSelectedServiceId,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useServicesInformative()

  return (
    <div className="min-h-screen bg-[#f3f8ef] px-4 py-4 text-[#2E321B] md:px-6 md:py-5">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4">
          <NavbarEditionSection />
        </div>

        <div className="mx-auto mb-5 max-w-3xl text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#243018] md:text-3xl">
            Edición de la Sección Servicios
          </h1>
          <p className="mt-2 text-sm text-[#5F6E3E] md:text-base">
            Agrega, edita o elimina los servicios que se muestran públicamente.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#DDD8CA] bg-white p-4 shadow-sm md:p-5">
          <div className="space-y-4">
            <section>
              <ServicesInformativeCreator onSubmit={handleCreate} />
            </section>

            <section>
              <ServicesInformativeEditor
                items={services}
                selectedId={selectedServiceId}
                setSelectedId={setSelectedServiceId}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}