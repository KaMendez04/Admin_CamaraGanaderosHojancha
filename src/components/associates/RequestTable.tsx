import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { GenericTable } from "../GenericTable";
import { ActionButtons } from "../ActionButtons";

export type SolicitudRow = {
  idSolicitud: number;
  persona: {
    cedula: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    telefono: string;
    email: string;
  };
  estado: "PENDIENTE" | "APROBADO" | "RECHAZADO";
  createdAt: string;
};

type RequestsTableProps = {
  data: SolicitudRow[];
  isLoading: boolean;
  isReadOnly: boolean;
  onView: (id: number) => void;
  onApprove: (sol: SolicitudRow) => void | Promise<void>;
  onReject: (id: number) => void;
  approvingId: number | null;
};

function statusClass(estado: SolicitudRow["estado"]) {
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

export function RequestsTable({
  data,
  isLoading,
  isReadOnly,
  onView,
  onApprove,
  onReject,
  approvingId,
}: RequestsTableProps) {
  const columnHelper = createColumnHelper<SolicitudRow>();

  const columns: ColumnDef<SolicitudRow, any>[] = [
    columnHelper.accessor("persona.cedula", {
      header: "Cédula",
      size: 120,
      cell: (info) => (
        <div className="text-sm font-medium text-slate-700">
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor(
      (row) =>
        `${row.persona.nombre} ${row.persona.apellido1} ${row.persona.apellido2}`,
      {
        id: "nombreCompleto",
        header: "Nombre",
        size: 230,
        cell: (info) => (
          <div
            className="max-w-[240px] truncate text-sm font-semibold text-slate-900"
            title={info.getValue()}
          >
            {info.getValue()}
          </div>
        ),
      }
    ),

    columnHelper.accessor("persona.telefono", {
      header: "Teléfono",
      size: 120,
      cell: (info) => (
        <div className="text-sm text-slate-600">{info.getValue()}</div>
      ),
    }),

    columnHelper.accessor("persona.email", {
      header: "Email",
      size: 220,
      cell: (info) => (
        <div
          className="max-w-[240px] truncate text-sm text-slate-600"
          title={info.getValue()}
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("estado", {
      header: "Estado",
      size: 120,
      cell: (info) => (
        <div className="flex justify-center">
          <span
            className={`inline-flex min-w-[110px] items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.02em] ${statusClass(
              info.getValue()
            )}`}
          >
            {info.getValue()}
          </span>
        </div>
      ),
    }),

    columnHelper.accessor("createdAt", {
      header: "Fecha",
      size: 110,
      cell: (info) => (
        <div className="text-sm text-slate-500">
          {new Date(info.getValue()).toLocaleDateString("es-CR")}
        </div>
      ),
    }),

    columnHelper.display({
      id: "acciones",
      header: () => <div className="text-center">Acciones</div>,
      size: 150,
      cell: (info) => {
        const sol = info.row.original;
        const solicitudId = sol.idSolicitud;
        const isThisApproving = approvingId === solicitudId;

        const estado = sol.estado;
        const canApprove =
          (estado === "PENDIENTE" || estado === "RECHAZADO") && !isReadOnly;
        const canReject = estado === "PENDIENTE" && !isReadOnly;

        return (
          <ActionButtons
            size="sm"
            onView={() => onView(solicitudId)}
            onApprove={canApprove ? () => onApprove(sol) : undefined}
            onReject={canReject ? () => onReject(solicitudId) : undefined}
            showApproveReject={canApprove || canReject}
            isApproving={isThisApproving}
            isReadOnly={isReadOnly}
          />
        );
      },
    }),
  ];

  return <GenericTable data={data} columns={columns} isLoading={isLoading} />;
}