import {
  ChevronDown,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  Search,
} from "lucide-react";
import { useManuals } from "../hooks/useManuals";
import { PaginationBar, usePagination } from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ManualCard from "@/components/manual/ManualCard";
import { useMemo, useState } from "react";

type ViewMode = "small" | "medium" | "large";

const viewOptions = [
  { value: "small" as ViewMode, label: "Pequeños", icon: Grid3X3 },
  { value: "medium" as ViewMode, label: "Medianos", icon: Grid2X2 },
  { value: "large" as ViewMode, label: "Grandes", icon: LayoutGrid },
];

function getPageSize(viewMode: ViewMode) {
  switch (viewMode) {
    case "small":
      return 12;
    case "medium":
      return 8;
    case "large":
      return 6;
    default:
      return 8;
  }
}

function getGridClasses(viewMode: ViewMode) {
  switch (viewMode) {
    case "small":
      return "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    case "medium":
      return "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3";
    case "large":
      return "grid grid-cols-1 gap-4 lg:grid-cols-2";
    default:
      return "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3";
  }
}

function LoadingState() {
  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <div className="h-10 w-52 animate-pulse rounded-xl bg-[#EEE8DA]" />
          <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded-xl bg-[#F3EEDF]" />
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-[#F1F5F9]">
            <div className="h-4 w-32 animate-pulse rounded bg-[#F1F5F9]" />
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-[220px] animate-pulse rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#374321] sm:text-3xl">
            Manuales
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B7280] md:text-base">
            Aquí puedes descargar los manuales de usuario para entender mejor
            cómo usar el sistema y otras funciones disponibles.
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-[#374321]">
            No se pudieron cargar los manuales
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Revisa la conexión con el backend o con Dropbox.
          </p>
        </div>
      </div>
    </div>
  );
}

type ViewModeDropdownProps = {
  viewMode: ViewMode;
  onChange: (value: ViewMode) => void;
};

function ViewModeDropdown({ viewMode, onChange }: ViewModeDropdownProps) {
  const currentView = viewOptions.find((opt) => opt.value === viewMode);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 items-center justify-between gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#33361D] transition hover:border-[#D1D5DB] hover:bg-[#FCFCFA] sm:h-11 sm:w-auto sm:px-4"
        >
          <span className="flex items-center gap-2">
            {currentView && (
              <currentView.icon className="h-4 w-4 text-[#6B7280]" />
            )}
            <span className="hidden sm:inline">{currentView?.label}</span>
          </span>
          <ChevronDown className="h-4 w-4 text-[#6B7280]" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-44 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white p-0 shadow-lg"
      >
        {viewOptions.map((option) => {
          const isActive = option.value === viewMode;

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition focus:bg-[#F8F9F3] focus:text-[#708C3E] ${isActive ? "bg-[#F8F9F3] text-[#708C3E] font-medium" : "text-[#33361D]"
                }`}
            >
              <option.icon className="h-4 w-4" />
              <span className="text-sm">{option.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function ManualPage() {
  const {
    search,
    setSearch,
    manuals,
    filteredManuals,
    isLoading,
    isError,
    downloadManual,
    isDownloading,
  } = useManuals();

  const [viewMode, setViewMode] = useState<ViewMode>("medium");

  const pageSize = useMemo(() => getPageSize(viewMode), [viewMode]);

  const { page, setPage, totalPages, pagedItems, pageItems } = usePagination(
    filteredManuals,
    pageSize,
    [search, viewMode]
  );

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;

  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#374321] sm:text-3xl">
              Manuales
            </h1>
            <p className="mt-1 text-sm text-[#6B7280] sm:text-base">
              Descargá los manuales para entender mejor el sistema.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Buscar manuales..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-10 w-full rounded-xl border border-[#E5E7EB] bg-white pl-10 pr-4 text-sm text-[#33361D] outline-none transition placeholder:text-[#6B7280]/50 focus:border-[#708C3E] focus:ring-1 focus:ring-[#708C3E]/10 sm:h-11"
              />
            </div>
            <ViewModeDropdown viewMode={viewMode} onChange={setViewMode} />
          </div>
        </header>

        <section className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-[#F1F5F9] flex items-center justify-between gap-3">
            <span className="text-xs sm:text-sm text-[#556B2F] font-medium">
              {filteredManuals.length}{" "}
              {filteredManuals.length === 1 ? "archivo encontrado" : "archivos encontrados"}
            </span>
          </div>

          <div className="p-4 sm:p-6">
            {filteredManuals.length === 0 ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-[#F9FAFB] px-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F5F9] mb-4">
                  <Search className="h-6 w-6 text-[#6B7280]" />
                </div>
                <h2 className="text-lg font-semibold text-[#374321]">
                  {manuals.length === 0
                    ? "No hay manuales disponibles"
                    : "No se encontraron resultados"}
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#6B7280]">
                  {manuals.length === 0
                    ? "Cuando se suban archivos por Dropbox, aparecerán aquí automáticamente."
                    : "Probá con otros términos de búsqueda o revisá la ortografía."}
                </p>
              </div>
            ) : (
              <div className={getGridClasses(viewMode)}>
                {pagedItems.map((manual) => (
                  <ManualCard
                    key={manual.path}
                    manual={manual}
                    onDownload={downloadManual}
                    isDownloading={isDownloading}
                    size={viewMode}
                  />
                ))}
              </div>
            )}

            {filteredManuals.length > 0 && (
              <div className="mt-8 flex justify-center border-t border-[#F1F5F9] pt-6">
                <PaginationBar
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  pageItems={pageItems}
                  className="scale-90 sm:scale-100"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}