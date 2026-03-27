import { useState, useMemo } from "react";
import { useVolunteersApprovedList } from "../../hooks/Volunteers/individual/useVolunteersApprovedList";
import { useOrganizationsApprovedList } from "../../hooks/Volunteers/organizations/useOrganizationsApprovedList";
import { useOrganizationDetail } from "../../hooks/Volunteers/organizations/useOrganizationDetail";
import { StatusFilters } from "../../components/StatusFilters";
import { KPICard } from "../../components/KPICard";
import { getCurrentUser } from "../../auth/auth";
import { ApprovedVolunteerViewModal } from "../../components/volunteers/ApprovedVolunteerViewModal";
import {
  UnifiedVolunteersTable,
  type UnifiedVolunteerRow,
} from "../../components/volunteers/UnifiedVolunteersTable";
import { useVolunteerApprovedDetail } from "../../hooks/Volunteers/individual/useVolunteerApprovedDetail";
import { EditOrganizationModal } from "../../components/volunteers/organizations/EditOrganizationModal";
import { EditVolunteerIndividualModal } from "../../components/volunteers/EditVolunteerIndividualModal";
import { useDownloadListadoVoluntariosPDF } from "@/hooks/Volunteers/useVoluntariosPdf";
import { getPageItems, PaginationBar } from "@/components/ui/pagination";
import VolunteersSubnav from "./VolunteersSubnav";

type EstadoFilter = "ACTIVO" | "INACTIVO" | undefined;

export default function VolunteersApprovedPage() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [estadoFilter, setEstadoFilter] = useState<EstadoFilter>("ACTIVO");
  const [editId, setEditId] = useState<{
    id: number;
    tipo: "INDIVIDUAL" | "ORGANIZACION";
  } | null>(null);
  const [viewId, setViewId] = useState<{
    id: number;
    tipo: "INDIVIDUAL" | "ORGANIZACION";
  } | null>(null);

  const limit = 10;
  const downloadListadoPDF = useDownloadListadoVoluntariosPDF();

  const role = getCurrentUser()?.role?.name?.toUpperCase();
  const isReadOnly = role === "JUNTA";

  const isActiveParam =
    estadoFilter === "ACTIVO"
      ? true
      : estadoFilter === "INACTIVO"
      ? false
      : undefined;

  const {
    data: volunteersData,
    isLoading: isLoadingVolunteers,
    refetch: refetchVolunteers,
  } = useVolunteersApprovedList({
    isActive: isActiveParam,
    search,
    page: 1,
    limit: 100,
    sort: "createdAt:desc",
  });

  const {
    data: organizationsData,
    isLoading: isLoadingOrganizations,
    refetch: refetchOrganizations,
  } = useOrganizationsApprovedList({
    isActive: isActiveParam,
    search,
    page: 1,
    limit: 100,
    sort: "createdAt:desc",
  });

  const { data: volunteerDetail, isLoading: isLoadingVolunteerDetail } =
    useVolunteerApprovedDetail(viewId?.tipo === "INDIVIDUAL" ? viewId.id : 0);

  const { data: organizationDetail, isLoading: isLoadingOrganizationDetail } =
    useOrganizationDetail(viewId?.tipo === "ORGANIZACION" ? viewId.id : null);

  const { data: volunteerEditDetail } = useVolunteerApprovedDetail(
    editId?.tipo === "INDIVIDUAL" ? editId.id : 0
  );

  const { data: organizationEditDetail } = useOrganizationDetail(
    editId?.tipo === "ORGANIZACION" ? editId.id : null
  );

  const unifiedData = useMemo(() => {
    const volunteers: UnifiedVolunteerRow[] = (volunteersData?.items || []).map(
      (v) => ({
        id: v.idVoluntario,
        tipo: "INDIVIDUAL" as const,
        identificacion: v.persona.cedula,
        nombreCompleto: `${v.persona.nombre} ${v.persona.apellido1} ${v.persona.apellido2}`,
        telefono: v.persona.telefono,
        email: v.persona.email,
        estado: v.isActive ?? false,
        original: v,
      })
    );

    const organizations: UnifiedVolunteerRow[] = (
      organizationsData?.items || []
    ).map((o) => ({
      id: o.idOrganizacion,
      tipo: "ORGANIZACION" as const,
      identificacion: o.cedulaJuridica,
      nombreCompleto: o.nombre,
      telefono: o.telefono,
      email: o.email,
      estado: o.isActive ?? false,
      original: o,
    }));

    return [...volunteers, ...organizations].sort((a, b) =>
      b.original.createdAt.localeCompare(a.original.createdAt)
    );
  }, [volunteersData, organizationsData]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return unifiedData.slice(start, end);
  }, [unifiedData, page, limit]);

  const totalPages = Math.ceil(unifiedData.length / limit);
  const isLoading = isLoadingVolunteers || isLoadingOrganizations;

  const handleSaved = () => {
    refetchVolunteers();
    refetchOrganizations();
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-6">
        <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <VolunteersSubnav />

          <div className="grid grid-cols-2 gap-2 xl:pt-1">
            <KPICard label="Voluntarios" value={unifiedData.length} tone="base" />
            <KPICard
              label="Estado"
              value={
                estadoFilter === "ACTIVO"
                  ? "Activo"
                  : estadoFilter === "INACTIVO"
                  ? "Inactivo"
                  : "Todos"
              }
              tone="gold"
            />
          </div>
        </div>

        <div className="mb-4 rounded-3xl">
          <StatusFilters
            status={estadoFilter}
            onStatusChange={(newStatus) => {
              setEstadoFilter(newStatus as EstadoFilter);
              setPage(1);
            }}
            search={search}
            onSearchChange={(newSearch) => {
              setSearch(newSearch);
              setPage(1);
            }}
            statusOptions={["ACTIVO", "INACTIVO"]}
            showAllOption={true}
            onDownload={() => downloadListadoPDF.mutate()}
            isDownloading={downloadListadoPDF.isPending}
          />
        </div>

        <div>
          <UnifiedVolunteersTable
            data={paginatedData}
            isLoading={isLoading}
            isReadOnly={isReadOnly}
            onView={(id, tipo) => setViewId({ id, tipo })}
            onEdit={(id, tipo) => setEditId({ id, tipo })}
          />
        </div>

        {!isLoading && (
          <div className="mt-4 flex justify-center">
            <PaginationBar
              page={page}
              totalPages={totalPages || 1}
              pageItems={getPageItems(page, totalPages || 1)}
              onPageChange={(p) => setPage(p)}
              className="justify-center"
            />
          </div>
        )}

        {viewId && viewId.tipo === "INDIVIDUAL" && (
          <ApprovedVolunteerViewModal
            open={true}
            onClose={() => setViewId(null)}
            data={volunteerDetail || null}
            tipo="INDIVIDUAL"
            isLoading={isLoadingVolunteerDetail}
          />
        )}

        {viewId && viewId.tipo === "ORGANIZACION" && (
          <ApprovedVolunteerViewModal
            open={true}
            onClose={() => setViewId(null)}
            data={organizationDetail || null}
            tipo="ORGANIZACION"
            isLoading={isLoadingOrganizationDetail}
          />
        )}

        {!isReadOnly && editId?.tipo === "INDIVIDUAL" && volunteerEditDetail && (
          <EditVolunteerIndividualModal
            voluntario={volunteerEditDetail}
            onClose={() => setEditId(null)}
            onSaved={handleSaved}
          />
        )}

        {!isReadOnly &&
          editId?.tipo === "ORGANIZACION" &&
          organizationEditDetail && (
            <EditOrganizationModal
              organizacion={organizationEditDetail}
              onClose={() => setEditId(null)}
              onSaved={handleSaved}
            />
          )}
      </div>
    </div>
  );
}