import { useState } from "react";
import { useVolunteerSolicitudesList } from "../../hooks/Volunteers/individual/useVolunteerSolicitudesList";
import { useApproveVolunteerSolicitud } from "../../hooks/Volunteers/individual/useApproveVolunteerSolicitud";
import { useRejectVolunteerSolicitud } from "../../hooks/Volunteers/individual/useRejectVolunteerSolicitud";
import { useVolunteerSolicitudDetail } from "../../hooks/Volunteers/individual/useVolunteerSolicitudDetail";
import { getCurrentUser } from "../../auth/auth";
import { KPICard } from "../../components/KPICard";
import { VolunteerRequestsTable } from "../../components/volunteers/VolunteerRequestsTable";
import { VolunteerViewModal } from "../../components/volunteers/VolunteerViewModal";
import { RejectDialog } from "../../components/associates/RejectDialog";
import { StatusFilters } from "../../components/StatusFilters";
import { useDownloadSolicitudesVoluntariadoPDF } from "@/hooks/Volunteers/useVoluntariosPdf";
import { ApproveRejectedDialog } from "@/components/volunteers/ApproveRejectedDialog";
import { showConfirmApproveRejectedAlert } from "@/utils/alerts";
import { getPageItems, PaginationBar } from "@/components/ui/pagination";
import VolunteersSubnav from "./VolunteersSubnav";

export default function VolunteersRequestPage() {
  const [status, setStatus] = useState<
    "PENDIENTE" | "APROBADO" | "RECHAZADO" | undefined
  >("PENDIENTE");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [approvingId, setApprovingId] = useState<number | null>(null);
  const [approveRejected, setApproveRejected] = useState<{
    id: number;
    motivo?: string;
  } | null>(null);
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [viewId, setViewId] = useState<number | null>(null);

  const limit = 10;
  const downloadPDF = useDownloadSolicitudesVoluntariadoPDF();

  const role = getCurrentUser()?.role?.name?.toUpperCase();
  const isReadOnly = role === "JUNTA";

  const { data, isLoading } = useVolunteerSolicitudesList({
    estado: status,
    search,
    page,
    limit,
    sort: "createdAt:desc",
  });

  const approve = useApproveVolunteerSolicitud();
  const reject = useRejectVolunteerSolicitud();

  const { data: viewDetail, isLoading: isLoadingDetail } =
    useVolunteerSolicitudDetail(viewId ?? null);

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-6">
        <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <VolunteersSubnav />

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
            onDownload={() => downloadPDF.mutate(status)}
            isDownloading={downloadPDF.isPending}
          />
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#E8ECDD] bg-white shadow-sm">
          <VolunteerRequestsTable
            data={data?.items ?? []}
            isLoading={isLoading}
            isReadOnly={isReadOnly}
            onView={setViewId}
            onApprove={async (sol) => {
              if (sol.estado === "RECHAZADO") {
                const ok = await showConfirmApproveRejectedAlert();
                if (!ok) return;

                setApproveRejected({
                  id: sol.idSolicitudVoluntariado,
                  motivo: sol.motivo ?? undefined,
                });
                return;
              }

              setApprovingId(sol.idSolicitudVoluntariado);
              try {
                await approve.mutateAsync({ id: sol.idSolicitudVoluntariado });
              } finally {
                setApprovingId(null);
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
            if (rejectId) {
              await reject.mutateAsync({ id: rejectId, motivo });
            }
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

        <VolunteerViewModal
          open={viewId != null}
          onClose={() => setViewId(null)}
          solicitud={viewDetail ?? null}
          isLoading={isLoadingDetail}
        />
      </div>
    </div>
  );
}