import { ActionButtons } from "../ActionButtons";
import type { ViewMode } from "@/utils/cloudinaryMediaUtils";

import { isVideoUrl, videoMp4Url, videoPosterJpg } from "@/utils/cloudinaryMediaUtils";

type Selected = { url: string; public_id: string; isVideo: boolean };

type Props = {
  view: ViewMode;
  items: any[];
  copiedId: string | null;
  onCopy: (url: string, publicId: string) => void;
  onOpen: (sel: Selected) => void;
  onDelete: (publicId: string) => void;
  isDeleting?: boolean;
};

export default function CloudinaryMediaGrid({
  view,
  items,
  copiedId,
  onCopy,
  onOpen,
  onDelete,
  isDeleting,
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

            <div className="flex justify-between p-2 border-t border-[#F8F9F3] bg-[#FCFDF9]/50">
              <ActionButtons
                size="xs"
                onView={() =>
                  onOpen({ url, public_id: it.public_id, isVideo })
                }
              />
              <ActionButtons
                size="xs"
                showDelete={true}
                onDelete={() => onDelete(it.public_id)}
                isDeleting={isDeleting}
                requireConfirmDelete={true}
              />
              <ActionButtons
                size="xs"
                showCopy={true}
                onCopy={() => onCopy(url, it.public_id)}
                isCopied={copiedId === it.public_id}
              />
            </div>

          </div>
        );
      })}
    </div>
  );
}
