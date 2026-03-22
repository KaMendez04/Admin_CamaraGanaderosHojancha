import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { GenericTable } from "../GenericTable";
import { ActionButtons } from "../ActionButtons";

export type AssociateRow = {
  idAsociado: number;
  cedula: string;
  nombreCompleto: string;
  telefono: string;
  email: string;
  marcaGanado: string | null;
  estado: boolean;
  createdAt: string;
};

type AssociatesTableProps = {
  data: AssociateRow[];
  isLoading: boolean;
  isReadOnly: boolean;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
};

function associateStatusClass(estado: boolean) {
  return estado
    ? "border border-[#D9E6B8] bg-[#F4F8EA] text-[#5F7728]"
    : "border border-[#F0D0CB] bg-[#FCF1EF] text-[#A14B43]";
}

export function AssociatesTable({
  data,
  isLoading,
  isReadOnly,
  onView,
  onEdit,
}: AssociatesTableProps) {
  const columnHelper = createColumnHelper<AssociateRow>();

  const columns: ColumnDef<AssociateRow, any>[] = [
    columnHelper.accessor("cedula", {
      header: "Cédula",
      size: 110,
      cell: (info) => (
        <div className="text-sm font-medium text-slate-700">
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("nombreCompleto", {
      header: "Nombre",
      size: 240,
      cell: (info) => (
        <div
          className="max-w-[250px] truncate text-sm font-semibold text-slate-900"
          title={info.getValue()}
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("telefono", {
      header: "Teléfono",
      size: 120,
      cell: (info) => (
        <div className="text-sm text-slate-600">{info.getValue()}</div>
      ),
    }),

    columnHelper.accessor("email", {
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

    columnHelper.accessor("marcaGanado", {
      header: "Marca",
      size: 120,
      cell: (info) => (
        <div className="text-sm font-medium text-slate-700">
          {info.getValue() || <span className="text-slate-400">—</span>}
        </div>
      ),
    }),

    columnHelper.accessor("estado", {
      header: "Estado",
      size: 110,
      cell: (info) => (
        <div className="flex justify-center">
          <span
            className={`inline-flex min-w-[96px] items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.02em] ${associateStatusClass(
              info.getValue()
            )}`}
          >
            {info.getValue() ? "Activo" : "Inactivo"}
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
      size: 130,
      cell: (info) => (
        <ActionButtons
          size="sm"
          onView={() => onView(info.row.original.idAsociado)}
          onEdit={() => onEdit(info.row.original.idAsociado)}
          showEdit={true}
          isReadOnly={isReadOnly}
        />
      ),
    }),
  ];

  return <GenericTable data={data} columns={columns} isLoading={isLoading} />;
}