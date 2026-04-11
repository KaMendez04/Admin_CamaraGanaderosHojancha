import type { ManualItem } from "@/types/manualsTypes";
import { CalendarDays, Download, FileText } from "lucide-react";

type CardSize = "small" | "medium" | "large";

type Props = {
  manual: ManualItem;
  onDownload: (manual: ManualItem) => void | Promise<void>;
  isDownloading?: boolean;
  size?: CardSize;
};

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(value?: string) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

const styles: Record<
  CardSize,
  {
    wrapper: string;
    iconWrap: string;
    icon: string;
    title: string;
    meta: string;
    button: string;
  }
> = {
  small: {
    wrapper: "rounded-[26px] border border-[#E5E7EB] bg-white p-4",
    iconWrap: "h-10 w-10 rounded-2xl",
    icon: "h-4 w-4",
    title: "text-sm min-h-[40px]",
    meta: "text-xs",
    button: "mt-4 rounded-2xl px-3 py-2 text-xs",
  },
  medium: {
    wrapper: "rounded-[28px] border border-[#E5E7EB] bg-white p-5",
    iconWrap: "h-11 w-11 rounded-2xl",
    icon: "h-5 w-5",
    title: "text-[15px] min-h-[44px]",
    meta: "text-sm",
    button: "mt-4 rounded-2xl px-4 py-2.5 text-sm",
  },
  large: {
    wrapper: "rounded-[30px] border border-[#E5E7EB] bg-white p-6",
    iconWrap: "h-12 w-12 rounded-2xl",
    icon: "h-5 w-5",
    title: "text-base min-h-[48px]",
    meta: "text-sm",
    button: "mt-5 rounded-2xl px-4 py-3 text-sm",
  },
};

export default function ManualCard({
  manual,
  onDownload,
  isDownloading = false,
  size = "medium",
}: Props) {
  const current = styles[size];

  return (
    <article className={current.wrapper}>
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div
            className={`flex items-center justify-center bg-[#EEF4E6] ${current.iconWrap}`}
          >
            <FileText
              className={`${current.icon} text-[#708C3E]`}
              strokeWidth={1.8}
            />
          </div>

          <span className="rounded-full bg-[#EEF4E6] px-2.5 py-1 text-[11px] font-semibold text-[#556B2F]">
            {manual.extension.toUpperCase()}
          </span>
        </div>

        <h3
          className={`line-clamp-2 font-semibold leading-6 text-[#2E321B] ${current.title}`}
        >
          {manual.name}
        </h3>

        <div className={`mt-3 space-y-1 text-[#2E321B]/62 ${current.meta}`}>
          <p>{formatFileSize(manual.size)}</p>
          <p className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {formatDate(manual.serverModified || manual.clientModified)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onDownload(manual)}
          disabled={isDownloading}
          className={`inline-flex w-full items-center justify-center gap-2 bg-[#708C3E] font-medium text-white transition hover:bg-[#5D741C] disabled:cursor-not-allowed disabled:opacity-60 ${current.button}`}
        >
          <Download className="h-4 w-4" />
          {isDownloading ? "Descargando..." : "Descargar"}
        </button>
      </div>
    </article>
  );
}