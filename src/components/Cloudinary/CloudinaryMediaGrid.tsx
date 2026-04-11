import type { ViewMode } from "@/utils/cloudinaryMediaUtils";
import { isVideoUrl, videoMp4Url, videoPosterJpg } from "@/utils/cloudinaryMediaUtils";
import { Button } from "../ui/button";
import { Eye, Loader2, Trash2, Copy, Check } from "lucide-react";
import { getCurrentUser } from "@/auth/auth";

type Selected = { url: string; public_id: string; isVideo: boolean };

type Props = {
  view: ViewMode;
  items: any[];
  copiedId: string | null;
  onCopy: (url: string, publicId: string) => void;
  onOpen: (sel: Selected) => void;
  onDelete: (publicId: string) => void;
  deletingId?: string | null;
};

export default function CloudinaryMediaGrid({
  view,
  items,
  copiedId,
  onCopy,
  onOpen,
  onDelete,
  deletingId,
}: Props) {
  const gridCols =
    view === "small"
      ? "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6"
      : view === "medium"
        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const aspect =
    view === "small"
      ? "aspect-square"
      : view === "medium"
        ? "aspect-[4/3]"
        : "aspect-[16/10]";

  const role = getCurrentUser()?.role?.name?.toUpperCase();
  const isReadOnly = role === "JUNTA";

  return (
    <div className={`grid gap-3 sm:gap-4 ${gridCols}`}>
      {items.map((it: any) => {
        const url = it.url ?? it.secure_url;
        const isVideo = it.resource_type === "video" || isVideoUrl(url);

        return (
          <div
            key={it.public_id}
            className="rounded-lg sm:rounded-xl border border-[#F1F5F9] hover:border-[#D1D5DB] transition overflow-hidden bg-white"
          >
            <div className={`${aspect} bg-[#F8F9F3] relative`}>
              {isVideo ? (
                <video
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                  poster={videoPosterJpg(url, view)}
                  onError={(e) => {
                    const v = e.currentTarget;
                    const source = v.querySelector("source");
                    if (source && source.src !== url) {
                      source.src = url;
                      v.load();
                    }
                  }}
                >
                  <source src={videoMp4Url(url, view)} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={url}
                  alt={it.public_id}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              )}
            </div>

            <div className="flex justify-around p-1 border-t border-[#F8F9F3] bg-[#FCFDF9]/50">
              <Button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-[#FDFEF9] text-[#586174] transition hover:bg-[#F5F8EE] disabled:opacity-50 disabled:cursor-not-allowed h-8 w-8"
                onClick={() => onCopy(url, it.public_id)}
                title="Copiar"
              >
                {copiedId === it.public_id ? <Check className="h-4 w-4 text-[#708C3E] " /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button
                onClick={() =>
                  onOpen({ url, public_id: it.public_id, isVideo })
                }
                className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md  border border-none text-[#A3853D] text-sm font-medium hover:bg-[#F5E6C5] hover:text-[#8B6C2E]"
              >
                <Eye />
              </Button>
              {!isReadOnly && (
                <Button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl bg-[#FFFDFC] text-[#A14B43] transition hover:bg-[#FCF1EF] disabled:opacity-50 disabled:cursor-not-allowed h-8 w-8"
                  onClick={() => onDelete(it.public_id)}
                  disabled={!!deletingId}
                  title="Eliminar"
                >
                  {deletingId === it.public_id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
