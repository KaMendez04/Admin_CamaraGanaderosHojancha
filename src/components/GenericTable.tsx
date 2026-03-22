import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";

type GenericTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  isLoading: boolean;
};

export function GenericTable<T>({
  data,
  columns,
  isLoading,
}: GenericTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-[#DDE5CF] bg-[#F9FBF6] px-6 py-10 text-center">
        <div className="text-sm font-medium text-slate-500">Cargando...</div>
      </div>
    );
  }

  const rows = table.getRowModel().rows;

  return (
    <div className="overflow-hidden rounded-3xl border border-[#DDE5CF] bg-[#FBFCF8] shadow-sm">
      {/* MOBILE */}
      <div className="block md:hidden">
        {rows.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm font-medium text-slate-400">
            Sin resultados
          </div>
        ) : (
          <div className="space-y-3 p-3">
            {rows.map((row) => {
              const isTotal = !!(row.original as any)?.__isTotal;

              return (
                <div
                  key={row.id}
                  className={[
                    "rounded-2xl border p-4 shadow-sm",
                    isTotal
                      ? "border-[#DDE5CF] bg-[#F4F8EC]"
                      : "border-[#E6EBDD] bg-white",
                  ].join(" ")}
                >
                  <div className="space-y-2.5">
                    {row.getVisibleCells().map((cell) => {
                      const header = cell.column.columnDef.header;

                      return (
                        <div
                          key={cell.id}
                          className="grid grid-cols-12 items-start gap-2"
                        >
                          <div className="col-span-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6A7486]">
                            {header
                              ? String(
                                  typeof header === "function"
                                    ? "Campo"
                                    : header
                                )
                              : "Campo"}
                          </div>

                          <div className="col-span-7 text-sm text-[#1F2937] break-words">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full table-fixed">
          <thead className="bg-[#f4f5ee]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-[#DDE5CF]">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5F7728]"
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

          <tbody className="bg-white">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-sm font-medium text-slate-400"
                >
                  Sin resultados
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const isTotal = !!(row.original as any)?.__isTotal;

                return (
                  <tr
                    key={row.id}
                    className={[
                      "border-b border-[#E8EDE0] transition-colors",
                      isTotal ? "bg-[#F4F8EC] font-semibold" : "",
                    ].join(" ")}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const raw = cell.getValue();
                      const isString = typeof raw === "string";

                      return (
                        <td
                          key={cell.id}
                          className="px-4 py-4 text-center align-middle text-sm"
                          title={isString ? (raw as string) : undefined}
                        >
                          <div className="break-words whitespace-normal text-[#1F2937]">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}