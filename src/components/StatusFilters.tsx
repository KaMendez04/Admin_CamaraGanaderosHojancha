import { ActionButtons } from "./ActionButtons";

interface StatusFiltersProps {
  status: string | undefined;
  onStatusChange: (status: string | undefined) => void;
  search: string;
  onSearchChange: (search: string) => void;
  searchPlaceholder?: string;
  statusOptions?: string[];
  showAllOption?: boolean;

  downloadLabel?: string;
  onDownload?: () => void;
  isDownloading?: boolean;
  hideDownloadButton?: boolean;
}

export function StatusFilters({
  status,
  onStatusChange,
  search,
  onSearchChange,
  searchPlaceholder = "Buscar por cédula, nombre, email...",
  statusOptions = ["PENDIENTE", "APROBADO", "RECHAZADO"],
  showAllOption = true,
  downloadLabel = "Descargar PDF",
  onDownload,
  isDownloading = false,
  hideDownloadButton = false,
}: StatusFiltersProps) {
  return (
    <div className="rounded-3xl border border-[#E8ECDD] bg-[#FCFDF9] p-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="min-w-0 flex-1">
            <input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-11 w-full rounded-full border border-[#E6EDC8] bg-white px-4 text-sm text-[#33361D] placeholder:text-slate-400 outline-none transition focus:border-[#D7E3B5] focus:ring-2 focus:ring-[#EEF4DD]"
            />
          </div>

          {!hideDownloadButton && onDownload && (
            <ActionButtons
              size="sm"
              onDownload={onDownload}
              showDownload={true}
              isLoading={isDownloading}
              showText={true}
              downloadText={downloadLabel}
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {statusOptions.map((s) => {
            const active = status === s;

            return (
              <button
                key={s}
                type="button"
                onClick={() => onStatusChange(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "bg-[#5B732E] text-white"
                    : "border border-[#E6EDC8] bg-white text-slate-600 hover:bg-[#F6F9EF]"
                }`}
              >
                {s}
              </button>
            );
          })}

          {showAllOption && (
            <button
              type="button"
              onClick={() => onStatusChange(undefined)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                !status
                  ? "bg-[#5B732E] text-white"
                  : "border border-[#E6EDC8] bg-white text-slate-600 hover:bg-[#F6F9EF]"
              }`}
            >
              Todos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}