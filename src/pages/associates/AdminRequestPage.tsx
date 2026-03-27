import { useState } from "react";
import { useAdminSolicitudesList } from "../../hooks/associates/useAdminSolicitudesList";
import { useAdminSolicitudDetail } from "../../hooks/associates/useAdminSolicitudDetail";
import { useApproveSolicitud } from "../../hooks/associates/useApproveSolicitud";
import { useRejectSolicitud } from "../../hooks/associates/useRejectSolicitud";
import { RejectDialog } from "../../components/associates/RejectDialog";
import { SolicitudViewModal } from "../../components/associates/SolicitudViewModal";
import { getCurrentUser } from "../../auth/auth";
import { RequestsTable } from "../../components/associates/RequestTable";
import { KPICard } from "../../components/KPICard";
import { useDownloadSolicitudesPDF } from "../../hooks/associates/useDownloadSolicitudesPdfList";
import { showConfirmApproveRejectedAlert } from "@/utils/alerts";
import { ApproveRejectedDialog } from "@/components/volunteers/ApproveRejectedDialog";
import { getPageItems, PaginationBar } from "@/components/ui/pagination";
import AssociatesSubnav from "./AssociatesSubnav";
import { StatusFilters } from "@/components/StatusFilters";

export default function AdminRequestsPage() {
  const [status, setStatus] = useState<"PENDIENTE" | "APROBADO" | "RECHAZADO" | undefined>("PENDIENTE");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [approvingId, setApprovingId] = useState<number | null>(null);
  const limit = 10;

  const downloadPDF = useDownloadSolicitudesPDF();
  const role = getCurrentUser()?.role?.name?.toUpperCase();
  const isReadOnly = role === "JUNTA";

  const { data, isLoading } = useAdminSolicitudesList({
    status,
    search,
    page,
    limit,
    sort: "createdAt:desc",
  });

  const approve = useApproveSolicitud();
  const reject = useRejectSolicitud();

  const [approveRejected, setApproveRejected] = useState<{
    id: number;
    motivo?: string;
  } | null>(null);

  const [rejectId, setRejectId] = useState<number | null>(null);
  const [viewId, setViewId] = useState<number | null>(null);

  const { data: viewDetail, isLoading: isLoadingDetail } =
    useAdminSolicitudDetail(viewId ?? 0);

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
     <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-6 ">
    <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <AssociatesSubnav />

      <div className="grid grid-cols-2 gap-2 xl:pt-1">
        <KPICard
          label="Solicitudes"
          value={data?.total ?? 0}
          tone="base"
        />
        <KPICard
          label="Estado"
          value={status || "Todos"}
          tone="gold"
        />
      </div>
    </div>

    <div className="mb-4 rounded-3xl">
      <StatusFilters
        status={status}
        onStatusChange={(newStatus) => {
          setStatus(newStatus as any);
          setPage(1);
        }}
        search={search}
        onSearchChange={(newSearch) => {
          setSearch(newSearch);
          setPage(1);
        }}
        onDownload={() =>
          downloadPDF.mutate({
            estado: status,
            search,
            sort: "createdAt:desc",
          })
        }
        isDownloading={downloadPDF.isPending}
      />
    </div>

    <div>
      <RequestsTable
        data={data?.items ?? []}
        isLoading={isLoading}
        isReadOnly={isReadOnly}
        onView={setViewId}
        onApprove={async (sol) => {
          if (sol.estado === "RECHAZADO") {
            const ok = await showConfirmApproveRejectedAlert()
            if (!ok) return

            setApproveRejected({
              id: sol.idSolicitud,
              motivo: (sol as any).motivo ?? undefined,
            })
            return
          }

          setApprovingId(sol.idSolicitud)
          try {
            await approve.mutateAsync({ id: sol.idSolicitud })
          } finally {
            setApprovingId(null)
          }
        }}
        onReject={setRejectId}
        approvingId={approvingId}
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

        <RejectDialog
          open={rejectId != null}
          onClose={() => setRejectId(null)}
          onConfirm={async (motivo) => {
            if (rejectId) await reject.mutateAsync({ id: rejectId, motivo });
            setRejectId(null);
          }}
        />

        <ApproveRejectedDialog
          open={approveRejected != null}
          initialMotivo={approveRejected?.motivo ?? ""}
          onClose={() => setApproveRejected(null)}
          onConfirm={async (motivo) => {
            if (!approveRejected) return;

            setApprovingId(approveRejected.id);
            try {
              await approve.mutateAsync({ id: approveRejected.id, motivo });
            } finally {
              setApprovingId(null);
              setApproveRejected(null);
            }
          }}
        />

        <SolicitudViewModal
          open={viewId != null}
          onClose={() => setViewId(null)}
          solicitud={viewDetail ?? null}
          isLoading={isLoadingDetail}
        />
      </div>
    </div>
  );
}