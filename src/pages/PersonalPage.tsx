import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { usePersonalPageState } from "../hooks/Personal/usePersonalPageState";
import { PersonalPageInfoModal } from "../components/Personal/PersonalPageInfoModal";
import { EditPersonalPageModal } from "../components/Personal/EditPersonalPageModal";
import { PersonalTable } from "../components/Personal/PersonalPageTable";

import { personalApi } from "../services/personalPageService";
import { getCurrentUser } from "../auth/auth";

import type { PersonalPageType } from "../models/PersonalPageType";

import { StatusFilters } from "../components/StatusFilters";
import { KPICard } from "../components/KPICard";
import { PaginationBar, usePagination } from "@/components/ui/pagination";
import { ErrorState } from "../components/common/ErrorState";

// ===== API -> UI =====
function mapApiToUi(p: any): PersonalPageType {
  return {
    IdUser: p.IdUser ?? p.id ?? p.idPersona ?? 0,
    IDE: p.IDE,
    name: p.name,
    lastname1: p.lastname1,
    lastname2: p.lastname2,
    birthDate: p.birthDate,
    phone: p.phone,
    email: p.email,
    direction: p.direction,
    occupation: p.occupation,
    isActive: !!p.isActive,
    startWorkDate: p.startWorkDate ?? "",
    endWorkDate: p.endWorkDate ?? null,
  };
}

export default function PersonalPage() {
  const [items, setItems] = useState<PersonalPageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<string | undefined>(undefined);

  const {
    search,
    setSearch,
    selectedPersonalPage,
    setSelectedPersonalPage,
    editPersonalPage,
    setEditPersonalPage,
    newPersonalPage,
    setNewPersonalPage,
    openNewPersonalPage,
  } = usePersonalPageState();

  const role = getCurrentUser()?.role?.name?.toUpperCase();
  const isReadOnly = role === "JUNTA";
  

  async function load() {
    try {
      setLoading(true);
      const data = await personalApi.list();
      setItems(data.map(mapApiToUi));
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? "Error al cargar el personal");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);


  const totalCount = items.length;
  const activeCount = items.filter((item) => item.isActive).length;

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = `${item.name} ${item.lastname1} ${item.lastname2} ${item.IDE} ${item.email ?? ""}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        !status
          ? true
          : status === "ACTIVO"
          ? item.isActive
          : !item.isActive;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, status]);

  const {
    page,
    setPage,
    totalPages,
    pagedItems,
    pageItems,
  } = usePagination(filtered, 10, [search, status]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando…
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] px-6 py-8 relative">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header superior + KPIs */}
        <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-center">
          <div className="flex-1">
            <div className="flex items-center justify-between gap-4 rounded-3xl border border-[#E6E1D6] bg-white px-6 py-4 shadow-sm">
              <div>
                <h2 className="text-[20px] font-bold tracking-[-0.02em] text-slate-900 md:text-[26px]">
                  Gestión del Personal
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Administra, consulta y da seguimiento al personal registrado.
                </p>
              </div>

              {!isReadOnly && (
                <button
                  onClick={openNewPersonalPage}
                  className="bg-[#708C3E] hover:bg-[#5e7630] text-white rounded-full w-11 h-11 flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 shrink-0"
                  aria-label="Agregar nuevo personal"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

        </section>

          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <StatusFilters
            status={status}
            onStatusChange={setStatus}
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Buscar por cédula, nombre, apellido o email..."
            statusOptions={["ACTIVO", "INACTIVO"]}
            showAllOption={true}
            hideDownloadButton={true}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 xl:shrink-0">
          <KPICard label="Total" value={totalCount} />
          <KPICard label="Activos" value={activeCount} tone="gold" />
        </div>
      </div>

        {/* Tabla */}
        <section>
            <PersonalTable
              data={pagedItems}
              isLoading={false}
              isReadOnly={isReadOnly}
              onView={setSelectedPersonalPage}
              onEdit={(item) => {
                if (!isReadOnly) setEditPersonalPage(item);
              }}
            />
        </section>

        {/* Footer inferior */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <PaginationBar
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            pageItems={pageItems}
          />

        </div>
      </div>

      {selectedPersonalPage && (
        <PersonalPageInfoModal
          item={selectedPersonalPage}
          onClose={() => setSelectedPersonalPage(null)}
        />
      )}

      {!isReadOnly && editPersonalPage && (
        <EditPersonalPageModal
          personalPage={editPersonalPage}
          setPersonalPage={setEditPersonalPage}
          isNew={false}
          onSaved={load}
        />
      )}

      {!isReadOnly && newPersonalPage && (
       <EditPersonalPageModal
          personalPage={newPersonalPage}
          setPersonalPage={setNewPersonalPage}
          isNew={true}
          onSaved={load}
        />
      )}
    </div>
  );
}