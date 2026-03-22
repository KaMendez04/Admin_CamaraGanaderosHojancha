import type {
  VoluntarioIndividual,
  Organizacion,
} from "../../schemas/volunteerSchemas";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { ActionButtons } from "../ActionButtons";
import { GenericTable } from "../GenericTable";

export type UnifiedVolunteerRow = {
  id: number;
  tipo: "INDIVIDUAL" | "ORGANIZACION";
  identificacion: string;
  nombreCompleto: string;
  telefono: string;
  email: string;
  estado: boolean;
  original: VoluntarioIndividual | Organizacion;
};

type UnifiedVolunteersTableProps = {
  data: UnifiedVolunteerRow[];
  isLoading: boolean;
  isReadOnly?: boolean;
  onView: (id: number, tipo: "INDIVIDUAL" | "ORGANIZACION") => void;
  onEdit: (id: number, tipo: "INDIVIDUAL" | "ORGANIZACION") => void;
};

function tipoClass(tipo: "INDIVIDUAL" | "ORGANIZACION") {
  return tipo === "INDIVIDUAL"
    ? "border border-[#CFE3DA] bg-[#F3FAF7] text-[#2D5F4F]"
    : "border border-[#EADAB0] bg-[#FFF9EC] text-[#8B6C2E]";
}

function estadoClass(estado: boolean) {
  return estado
    ? "border border-[#D9E6B8] bg-[#F4F8EA] text-[#5F7728]"
    : "border border-[#F0D0CB] bg-[#FCF1EF] text-[#A14B43]";
}

export function UnifiedVolunteersTable({
  data,
  isLoading,
  isReadOnly,
  onView,
  onEdit,
}: UnifiedVolunteersTableProps) {
  const columnHelper = createColumnHelper<UnifiedVolunteerRow>();

  const columns: ColumnDef<UnifiedVolunteerRow, any>[] = [
    columnHelper.accessor("identificacion", {
      header: "Identificación",
      size: 130,
      cell: (info) => (
        <div className="text-sm font-medium text-slate-700">
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("nombreCompleto", {
      header: "Nombre",
      size: 230,
      cell: (info) => (
        <div
          className="max-w-[240px] truncate text-sm font-semibold text-slate-900"
          title={String(info.getValue())}
        >
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("tipo", {
          header: "Tipo",
          size: 120,
          cell: (info) => {
            const tipo = info.getValue();
            return (
              <div className="flex justify-center md:justify-center">
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
          title={String(info.getValue())}
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("estado", {
      header: "Estado",
      size: 110,
      cell: (info) => (
        <div className="flex justify-center md:justify-center">
          <span
            className={`inline-flex min-w-[96px] items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.02em] ${estadoClass(
              info.getValue()
            )}`}
          >
            {info.getValue() ? "Activo" : "Inactivo"}
          </span>
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
          onView={() => onView(info.row.original.id, info.row.original.tipo)}
          onEdit={() => onEdit(info.row.original.id, info.row.original.tipo)}
          showEdit={true}
          isReadOnly={isReadOnly}
        />
      ),
    }),
  ];

  return (
    <GenericTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      emptyMessage="No hay voluntarios disponibles."
    />
  );
}