import { useMemo } from "react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { GenericTable } from "../GenericTable";
import type { SolicitudVoluntariadoListResponse } from "../../schemas/volunteerSchemas";
import { ActionButtons } from "../ActionButtons";

type SolicitudVoluntariadoListItem =
  SolicitudVoluntariadoListResponse["items"][number];

interface VolunteerRequestsTableProps {
  data: SolicitudVoluntariadoListItem[];
  isLoading: boolean;
  isReadOnly: boolean;
  onView: (id: number) => void;
  onApprove: (solicitud: SolicitudVoluntariadoListItem) => void | Promise<void>;
  onReject: (id: number) => void;
  approvingId: number | null;
}

function tipoClass(tipo: "INDIVIDUAL" | "ORGANIZACION") {
  return tipo === "INDIVIDUAL"
    ? "border border-[#CFE3DA] bg-[#F3FAF7] text-[#2D5F4F]"
    : "border border-[#EADAB0] bg-[#FFF9EC] text-[#8B6C2E]";
}

function estadoClass(estado: "PENDIENTE" | "APROBADO" | "RECHAZADO") {
  switch (estado) {
    case "PENDIENTE":
      return "border border-[#F3E7A4] bg-[#FFF8D8] text-[#9A7B00]";
    case "APROBADO":
      return "border border-[#D9E6B8] bg-[#F4F8EA] text-[#5F7728]";
    case "RECHAZADO":
      return "border border-[#F0D0CB] bg-[#FCF1EF] text-[#A14B43]";
    default:
      return "border border-slate-200 bg-slate-50 text-slate-600";
  }
}

export function VolunteerRequestsTable({
  data,
  isLoading,
  isReadOnly,
  onView,
  onApprove,
  onReject,
  approvingId,
}: VolunteerRequestsTableProps) {
  const columnHelper = createColumnHelper<SolicitudVoluntariadoListItem>();

  const columns: ColumnDef<SolicitudVoluntariadoListItem, any>[] = useMemo(
    () => [
      columnHelper.accessor(
        (row) => {
          const isIndividual = row.tipoSolicitante === "INDIVIDUAL";
          return isIndividual
            ? `${row.voluntario?.persona.nombre} ${row.voluntario?.persona.apellido1}`
            : row.organizacion?.nombre;
        },
        {
          id: "solicitante",
          header: "Solicitante",
          size: 220,
          cell: (info) => (
            <div
              className="max-w-[240px] truncate text-sm font-semibold text-slate-900"
              title={String(info.getValue())}
            >
              {info.getValue() || "N/A"}
            </div>
          ),
        }
      ),
columnHelper.accessor("tipoSolicitante", {
        header: "Tipo",
        size: 120,
        cell: (info) => {
          const tipo = info.getValue() as "INDIVIDUAL" | "ORGANIZACION";
          return (
            <div className="flex justify-center md:justify-center sm:justify-start">
              <span
                className={`inline-flex min-w-[110px] items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.02em] ${tipoClass(
                  tipo
                )}`}
              >
                {tipo === "INDIVIDUAL" ? "Individual" : "Organización"}
              </span>
            </div>
          );
        },
      }),

      columnHelper.accessor(
        (row) => {
          const isIndividual = row.tipoSolicitante === "INDIVIDUAL";
          return isIndividual
            ? row.voluntario?.persona.cedula
            : row.organizacion?.cedulaJuridica;
        },
        {
          id: "identificacion",
          header: "Identificación",
          size: 130,
          cell: (info) => (
            <div className="text-sm font-medium text-slate-700">
              {info.getValue() || "—"}
            </div>
          ),
        }
      ),

      columnHelper.accessor(
        (row) => {
          const isIndividual = row.tipoSolicitante === "INDIVIDUAL";
          return isIndividual
            ? row.voluntario?.persona.email
            : row.organizacion?.email;
        },
        {
          id: "email",
          header: "Email",
          size: 220,
          cell: (info) => (
            <div
              className="max-w-[240px] truncate text-sm text-slate-600"
              title={String(info.getValue())}
            >
              {info.getValue() || "—"}
            </div>
          ),
        }
      ),

      columnHelper.accessor("estado", {
        header: "Estado",
        size: 120,
        cell: (info) => {
          const estado = info.getValue() as
            | "PENDIENTE"
            | "APROBADO"
            | "RECHAZADO";

          return (
            <div className="flex justify-center md:justify-center">
              <span
                className={`inline-flex min-w-[110px] items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.02em] ${estadoClass(
                  estado
                )}`}
              >
                {estado}
              </span>
            </div>
          );
        },
      }),

      columnHelper.accessor("fechaSolicitud", {
        header: "Fecha",
        size: 110,
        cell: (info) => {
          const date = new Date(info.getValue());
          return (
            <div className="text-sm text-slate-500">
              {new Intl.DateTimeFormat("es-CR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                timeZone: "UTC",
              }).format(date)}
            </div>
          );
        },
      }),

      columnHelper.display({
        id: "acciones",
        header: () => <div className="text-center">Acciones</div>,
        size: 140,
        cell: (info) => {
          const estado = info.row.original.estado;
          const solicitud = info.row.original;
          const solicitudId = solicitud.idSolicitudVoluntariado;
          const isThisApproving = approvingId === solicitudId;

          const canApprove =
            (estado === "PENDIENTE" || estado === "RECHAZADO") && !isReadOnly;
          const canReject = estado === "PENDIENTE" && !isReadOnly;

          return (
            <ActionButtons
              size="sm"
              onView={() => onView(solicitudId)}
              onApprove={canApprove ? () => onApprove(solicitud) : undefined}
              onReject={canReject ? () => onReject(solicitudId) : undefined}
              showApproveReject={canApprove || canReject}
              isApproving={isThisApproving}
              isReadOnly={isReadOnly}
            />
          );
        },
      }),
    ],
    [isReadOnly, approvingId, onView, onApprove, onReject]
  );

  return (
    <GenericTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      emptyMessage="No hay solicitudes disponibles."
    />
  );
}