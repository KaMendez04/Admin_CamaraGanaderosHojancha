import {  useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {ChevronDown } from "lucide-react";

type GenericTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  isLoading?: boolean;
  emptyMessage?: string;
};

export function GenericTable<TData>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "No hay registros disponibles.",
}: GenericTableProps<TData>) {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const toggleRow = (rowId: string) => {
    setOpenRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const rows = table.getRowModel().rows;

  const hasData = data.length > 0;

  const getRowDisplayCells = (row: ReturnType<typeof table.getRowModel>["rows"][number]) =>
    row.getVisibleCells().filter((cell) => cell.column.id !== "acciones");

  const getActionCell = (row: ReturnType<typeof table.getRowModel>["rows"][number]) =>
    row.getVisibleCells().find((cell) => cell.column.id === "acciones");

  if (isLoading) {
    return (
      <div className="flex min-h-[220px] items-center justify-center p-6">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#5F7728] border-t-transparent" />
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="flex min-h-[220px] items-center justify-center px-6 py-10 text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      {/* Desktop / tablet */}
      <div className="hidden md:block">
        <div className="w-full overflow-x-auto">
          <table className="w-full table-fixed border-separate border-spacing-0">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-[#EEF1E7]">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="bg-[#f2f5ec] px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.04em] text-slate-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#F1F4EC] last:border-b-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-4 align-middle text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-3 p-3 md:hidden">
        {rows.map((row) => {
          const displayCells = getRowDisplayCells(row);
          const actionCell = getActionCell(row);
          const isOpen = !!openRows[row.id];

          const primaryCell = displayCells[0];
          const secondaryCell = displayCells[1];
          const restCells = displayCells.slice(2);

          return (
            <div
              key={row.id}
              className="overflow-hidden rounded-3xl border border-[#E8ECDD] bg-white shadow-sm"
            >
              <div className="flex items-center justify-between gap-3 px-4 py-4">
                <div className="min-w-0 flex-2">
                  {primaryCell && (
                    <div className="text-sm font-semibold text-slate-900">
                      {flexRender(
                        primaryCell.column.columnDef.cell,
                        primaryCell.getContext()
                      )}
                    </div>
                  )}

                  {secondaryCell && (
                    <div className="mt-2 text-sm text-slate-600">
                      {flexRender(
                        secondaryCell.column.columnDef.cell,
                        secondaryCell.getContext()
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-[#F1F4EC] px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggleRow(row.id)}
                  className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-[0.04em] text-slate-500"
                >
                  <span>{isOpen ? "Ocultar detalles" : "Ver detalles"}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {isOpen && (
                <div className="space-y-3 border-t border-[#F1F4EC] px-4 py-4">
                  {restCells.map((cell) => {
                    const header = cell.column.columnDef.header;

                    return (
                      <div
                        key={cell.id}
                        className="grid grid-cols-1 gap-1 rounded-2xl bg-[#FAFBF8] px-3 py-3"
                      >
                        <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-slate-500">
                          {typeof header === "string"
                            ? header
                            : flexRender(header, cell.getContext() as any)}
                        </div>
                        <div className="text-sm text-slate-700">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {actionCell && (
                    <div className="rounded-2xl bg-[#FAFBF8] px-3 py-3">
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.04em] text-slate-500">
                        Acciones
                      </div>
                      <div>
                        {flexRender(
                          actionCell.column.columnDef.cell,
                          actionCell.getContext()
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}