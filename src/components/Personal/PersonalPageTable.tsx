import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { GenericTable } from "../GenericTable";
import { ActionButtons } from "../ActionButtons";
import type { PersonalPageType } from "../../models/PersonalPageType";

type PersonalTableProps = {
  data: PersonalPageType[];
  isLoading: boolean;
  isReadOnly: boolean;
  onView: (item: PersonalPageType) => void;
  onEdit: (item: PersonalPageType) => void;
};

export function PersonalTable({
  data,
  isLoading,
  isReadOnly,
  onView,
  onEdit,
}: PersonalTableProps) {
  const columnHelper = createColumnHelper<PersonalPageType>();

  const columns: ColumnDef<PersonalPageType, any>[] = [
    columnHelper.accessor("IDE", {
      header: "Cédula",
      size: 140,
      cell: (info) => (
        <div className="font-medium text-[#33361D]">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor(
      (row) => `${row.name} ${row.lastname1} ${row.lastname2}`,
      {
        id: "nombreCompleto",
        header: "Nombre completo",
        size: 180,
        cell: (info) => (
          <div
            className="font-medium text-[#33361D] truncate"
            title={info.getValue()}
          >
            {info.getValue()}
          </div>
        ),
      }
    ),
    columnHelper.accessor("phone", {
      header: "Teléfono",
      size: 140,
      cell: (info) => <div className="text-[#33361D]">{info.getValue()}</div>,
    }),
    columnHelper.accessor("email", {
      header: "Email",
      size: 220,
      cell: (info) => (
        <div className="text-[#33361D] truncate" title={info.getValue()}>
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("occupation", {
      header: "Puesto",
      size: 180,
      cell: (info) => <div className="text-[#33361D]">{info.getValue()}</div>,
    }),
    columnHelper.accessor("isActive", {
      header: "Estado",
      size: 120,
      cell: (info) => (
        <div className="flex justify-center">
          <span
            className={`inline-flex min-w-[96px] items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.02em]  ${
              info.getValue()
                ? "border border-[#D9E6B8] bg-[#F4F8EA] text-[#5F7728]"
                : "border border-[#F0D0CB] bg-[#FCF1EF] text-[#A14B43]"
            }`}
          >
            {info.getValue() ? "Activo" : "Inactivo"}
          </span>
        </div>
      ),
    }),
    columnHelper.display({
      id: "acciones",
      header: () => <div className="text-center">Acciones</div>,
      size: 160,
      cell: (info) => (
        <div className="flex justify-center">
          <ActionButtons
            size="sm"
            onView={() => onView(info.row.original)}
            onEdit={() => onEdit(info.row.original)}
            showEdit={true}
            isReadOnly={isReadOnly}
          />
        </div>
      ),
    }),
  ];

  return <GenericTable data={data} columns={columns} isLoading={isLoading} />;
}