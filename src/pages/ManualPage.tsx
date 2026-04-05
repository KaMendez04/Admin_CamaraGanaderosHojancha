import { useMemo, useState } from "react";
import { ChevronDown, LayoutGrid, Search } from "lucide-react";
import { useManuals } from "../hooks/useManuals";
import { PaginationBar, usePagination } from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ManualCard from "@/components/manual/ManualCard";

type ViewMode = "small" | "medium" | "large";

const viewOptions: { value: ViewMode; label: string }[] = [
  { value: "small", label: "Pequeños" },
  { value: "medium", label: "Medianos" },
  { value: "large", label: "Grandes" },
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
    <div className="min-h-screen w-full bg-[#FAF9F5] px-4 py-8 pt-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="h-10 w-52 animate-pulse rounded-xl bg-[#EEE8DA]" />
          <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded-xl bg-[#F3EEDF]" />
        </div>

        <div className="rounded-[32px] border border-[#E8E2D4] bg-[#FCFBF7] p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-3 lg:flex-row">
            <div className="h-12 flex-1 animate-pulse rounded-xl bg-white" />
            <div className="h-12 w-full animate-pulse rounded-xl bg-white sm:w-[220px]" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[220px] animate-pulse rounded-2xl border border-[#E8E2D4] bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] px-4 py-8 pt-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#2E321B] md:text-4xl">
            Manuales
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#2E321B]/65 md:text-base">
            Aquí puedes descargar los manuales de usuario para entender mejor
            cómo usar el sistema y otras funciones disponibles.
          </p>
        </div>

        <div className="rounded-[32px] border border-[#E8E2D4] bg-[#FCFBF7] p-8 text-center">
          <h2 className="text-xl font-semibold text-[#2E321B]">
            No se pudieron cargar los manuales
          </h2>
          <p className="mt-2 text-sm text-[#2E321B]/65">
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
  const currentLabel =
    viewOptions.find((option) => option.value === viewMode)?.label ?? "Medianos";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex h-12 w-full items-center justify-between rounded-xl border border-[#E8E2D4] bg-white px-4 text-sm text-[#2E321B] transition hover:border-[#D9C99A] sm:w-[220px]"
        >
          <span className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-[#A3853D]" />
            {currentLabel}
          </span>
          <ChevronDown className="h-4 w-4 text-[#2E321B]/50" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[220px] rounded-xl border border-[#E8E2D4] bg-white p-1 shadow-sm"
      >
        {viewOptions.map((option) => {
          const isActive = option.value === viewMode;

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`rounded-lg px-3 py-2 text-sm text-[#2E321B] focus:bg-[#F7F4EC] ${
                isActive ? "bg-[#F7F4EC] font-medium" : ""
              }`}
            >
              {option.label}
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
    <div className="min-h-screen w-full bg-[#FAF9F5] px-4 py-8 pt-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-[#374321] sm:text-3xl">
            Manuales
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#2E321B]/65 md:text-base">
            Aquí puedes descargar los manuales de usuario para entender mejor
            cómo usar el sistema y otras funciones disponibles.
          </p>
        </header>

        <section className="rounded-[32px] border border-[#E8E2D4] bg-[#FCFBF7] p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3853D]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar manuales..."
                className="h-12 w-full rounded-xl border border-[#E8E2D4] bg-white pl-11 pr-4 text-sm text-[#2E321B] outline-none transition placeholder:text-[#2E321B]/40 focus:border-[#D9C99A]"
              />
            </div>

            <ViewModeDropdown viewMode={viewMode} onChange={setViewMode} />
          </div>

          {filteredManuals.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[28px] border border-dashed border-[#D8C89A] bg-white px-6 text-center">
              <h2 className="text-lg font-semibold text-[#2E321B]">
                {manuals.length === 0
                  ? "No hay manuales disponibles"
                  : "No se encontraron resultados"}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#2E321B]/60">
                {manuals.length === 0
                  ? "Cuando haya manuales cargados, aparecerán aquí para descargarlos."
                  : "Prueba escribiendo otro nombre o cambia el tamaño de visualización."}
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
            <div className="mt-6 flex flex-col gap-4 border-t border-[#EEE8DA] pt-5">

              <PaginationBar
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                pageItems={pageItems}
                className="justify-center"
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}