import { useState } from "react";
import { useUpdateAssociate } from "../../hooks/associates/useUpdateAssociate";
import { AssociateEditDrawer } from "../../components/associates/AssociateEditDrawer";
import { AssociateViewModal } from "../../components/associates/AssociateViewModal";
import { useAdminAssociatesList } from "../../hooks/associates/useAdminAssociateList";
import { useAssociateDetail } from "../../hooks/associates/useAdminAssociateDetail";
import { getCurrentUser } from "../../auth/auth";
import { AssociatesTable, type AssociateRow } from "../../components/associates/associatesTable";
import { KPICard } from "../../components/KPICard";
import { useDownloadAssociatesPDF } from "../../hooks/associates/useDownloadAssociatesPDF";
import { getPageItems, PaginationBar } from "@/components/ui/pagination";
import AssociatesSubnav from "./AssociatesSubnav";
import { StatusFilters } from "@/components/StatusFilters";

type EstadoFilter = "ACTIVO" | "INACTIVO" | undefined;

export default function AssociatesApprovedPage() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [estadoFilter, setEstadoFilter] = useState<EstadoFilter>("ACTIVO");
  const limit = 10;
  const downloadPDF = useDownloadAssociatesPDF();

  const role = getCurrentUser()?.role?.name?.toUpperCase();
  const isReadOnly = role === "JUNTA";

  const estadoParam =
    estadoFilter === "ACTIVO"   ? true  :
    estadoFilter === "INACTIVO" ? false :
    undefined;

  const { data, isLoading } = useAdminAssociatesList({
    estado: estadoParam,
    search,
    page,
    limit,
    sort: "createdAt:desc",
  });

  const [editId, setEditId] = useState<number | null>(null);
  const [viewId, setViewId] = useState<number | null>(null);

  const { data: editDetail } = useAssociateDetail(editId);
  const { data: viewDetail, isLoading: isLoadingDetail } =
    useAssociateDetail(viewId);

  const update = useUpdateAssociate();

  const tableData: AssociateRow[] =
    data?.items.map((asociado) => ({
      idAsociado: asociado.idAsociado,
      cedula: asociado.persona.cedula,
      nombreCompleto: `${asociado.persona.nombre} ${asociado.persona.apellido1} ${asociado.persona.apellido2}`,
      telefono: asociado.persona.telefono,
      email: asociado.persona.email,
      marcaGanado: asociado.marcaGanado ?? null,
      estado: asociado.estado,
      createdAt: asociado.createdAt,
    })) ?? [];

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-6">
    <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <AssociatesSubnav />

      <div className="grid grid-cols-2 gap-2 xl:pt-1">
        <KPICard
          label="Asociados"
          value={data?.total ?? 0}
          tone="base"
        />
        <KPICard
          label="Estado"
          value={estadoFilter || "Todos"}
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
      onDownload={() =>
        downloadPDF.mutate({
          estado: estadoFilter,
          search,
          sort: "createdAt:desc",
        })
      }
      isDownloading={downloadPDF.isPending}
    />
    </div>

    <div className="overflow-hidden rounded-3xl border border-[#E8ECDD] bg-white shadow-sm">
      <AssociatesTable
        data={tableData}
        isLoading={isLoading}
        isReadOnly={isReadOnly}
        onView={(id) => setViewId(id)}
        onEdit={(id) => setEditId(id)}
      />
    </div>

    {!isLoading && (
      <div className="mt-4 flex justify-center">
        <PaginationBar
          page={page}
          totalPages={data?.pages ?? 1}
          pageItems={getPageItems(page, data?.pages ?? 1)}
          onPageChange={(p) => setPage(p)}
          className="justify-center"
        />
      </div>
    )}

        <AssociateViewModal
          open={viewId != null}
          onClose={() => setViewId(null)}
          associate={viewDetail ?? null}
          isLoading={isLoadingDetail}
        />

        {!isReadOnly && editId != null && editDetail && (
          <AssociateEditDrawer
            open={true}
            onClose={() => setEditId(null)}
            initial={{
              telefono: editDetail.persona.telefono,
              email: editDetail.persona.email,
              direccion: editDetail.persona.direccion ?? "",
              marcaGanado: editDetail.marcaGanado ?? "",
              CVO: editDetail.CVO ?? "",
              nombreCompleto: `${editDetail.persona.nombre} ${editDetail.persona.apellido1} ${editDetail.persona.apellido2}`,
              idAsociado: editDetail.idAsociado,
              estado: editDetail.estado,
            }}
            onSave={async (patch) => {
              if (!editId) return;
              await update.mutateAsync({ id: editId, patch });
              setEditId(null);
            }}
          />
        )}
      </div>
    </div>
  );
}