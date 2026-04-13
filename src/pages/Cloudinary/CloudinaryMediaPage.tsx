import { useEffect, useMemo, useRef, useState } from "react";
import { useCloudinaryGallery } from "../../hooks/Cloudinary/useCloudinaryGallery";
import { useCloudinaryDelete } from "../../hooks/Cloudinary/useCloudinaryDelete";
import { useCloudinaryUploadQueue } from "../../hooks/Cloudinary/useCloudinaryUploadQueue";
import { showConfirmDeleteAlert } from "@/utils/alerts";
import { showUploadErrorModal } from "@/utils/uploadAlerts";
import { PaginationBar, usePagination } from "@/components/ui/pagination";
import { formatCount, type ViewMode } from "@/utils/cloudinaryMediaUtils";
import CloudinaryMediaHeader from "@/components/Cloudinary/CloudinaryMediaHeader";
import CloudinaryMediaGrid from "@/components/Cloudinary/CloudinaryMediaGrid";
import CloudinaryMediaModal from "@/components/Cloudinary/CloudinaryMediaModal";
import CloudinaryUploadSheet from "@/components/Cloudinary/CloudinaryUploadSheet";
import { ErrorState } from "@/components/common/ErrorState";

type Selected = { url: string; public_id: string; isVideo: boolean };

export default function CloudinaryMediaPage() {
  const gallery = useCloudinaryGallery();
  const remove = useCloudinaryDelete();

  const {
    queue,
    addFiles,
    removeFromQueue,
    retryUpload,
    clearFinished,
    confirmOverwrite,
    isUploading,
    pendingCount,
  } = useCloudinaryUploadQueue();

  const [view, setView] = useState<ViewMode>("medium");
  const [selected, setSelected] = useState<Selected | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploadSheetOpen, setIsUploadSheetOpen] = useState(false);
  const [search, setSearch] = useState("");

  const shownUploadErrorsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    queue.forEach((item) => {
      if (item.status === "error" && !shownUploadErrorsRef.current.has(item.id)) {
        shownUploadErrorsRef.current.add(item.id);
        showUploadErrorModal(item.file.name, item.error);
      }
    });
  }, [queue]);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const shouldLock = !!selected || isUploadSheetOpen;

    if (shouldLock) {
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      body.style.overflow = "";
      html.style.overflow = "";
      body.style.touchAction = "";
    }

    return () => {
      body.style.overflow = "";
      html.style.overflow = "";
      body.style.touchAction = "";
    };
  }, [selected, isUploadSheetOpen]);

  useEffect(() => {
    if (!selected && !isUploadSheetOpen) {
      const id = window.setTimeout(() => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.style.touchAction = "";
      }, 50);

      return () => clearTimeout(id);
    }
  }, [selected, isUploadSheetOpen, queue]);

  const items = useMemo(() => {
    const arr = Array.isArray(gallery.data) ? gallery.data : [];
    const sorted = [...arr].sort((a: any, b: any) => {
      const da = a?.created_at ? new Date(a.created_at).getTime() : 0;
      const db = b?.created_at ? new Date(b.created_at).getTime() : 0;
      return db - da;
    });

    if (!search.trim()) return sorted;

    const lowerSearch = search.toLowerCase();
    return sorted.filter((item: any) => {
      const nameMatch = item?.public_id?.toLowerCase().includes(lowerSearch);
      const urlMatch = item?.url?.toLowerCase().includes(lowerSearch);
      return nameMatch || urlMatch;
    });
  }, [gallery.data, search]);

  const pageSize = view === "small" ? 24 : view === "medium" ? 12 : 8;

  const { page, setPage, totalPages, pagedItems, pageItems } = usePagination(
    items,
    pageSize,
    [view, items.length]
  );

  const onDelete = async (publicId: string) => {
    const ok = await showConfirmDeleteAlert(
      "¿Eliminar archivo?",
      "Esta acción no se puede deshacer."
    );
    if (!ok) return;
    remove.mutate(publicId);
  };

  const copyToClipboard = async (url: string, publicId: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(publicId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  const openItem = (sel: Selected) => setSelected(sel);

  if (gallery.isError) {
    return <ErrorState error={gallery.error?.message} message="Error cargando la galería." />;
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto">
        <CloudinaryMediaHeader
          view={view}
          setView={setView}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          onOpenPicker={() => setIsUploadSheetOpen(true)}
          isUploading={isUploading}
          pendingCount={pendingCount}
          search={search}
          onSearchChange={setSearch}
        />

        <div className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-[#F1F5F9] flex items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-[#556B2F] font-medium">
              {formatCount(items.length)}
            </div>

            {pendingCount > 0 && (
              <button
                onClick={() => setIsUploadSheetOpen(true)}
                className="rounded-full bg-[#EEF4E6] px-3 py-1 text-xs font-medium text-[#556B2F]"
              >
                {pendingCount} en cola
              </button>
            )}
          </div>

          <div className="p-3 sm:p-5">
            {gallery.isLoading && (
              <div className="text-sm text-[#6B7280] text-center py-8">
                Cargando…
              </div>
            )}

            {!gallery.isLoading && !gallery.isError && (
              <>
                {items.length === 0 ? (
                  <div className="text-xs sm:text-sm text-[#6B7280] text-center py-8 px-4">
                    No hay archivos aún. Presioná el botón <b>+</b> para subir el primero.
                  </div>
                ) : (
                  <>
                    <CloudinaryMediaGrid
                      view={view}
                      items={pagedItems}
                      copiedId={copiedId}
                      onCopy={copyToClipboard}
                      onOpen={openItem}
                      onDelete={onDelete}
                      deletingId={remove.isPending ? remove.variables : null}
                    />

                    <div className="mt-6">
                      <PaginationBar
                        page={page}
                        totalPages={totalPages}
                        pageItems={pageItems}
                        onPageChange={setPage}
                        className="justify-center"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <CloudinaryMediaModal
        selected={selected}
        onClose={() => setSelected(null)}
      />

      <CloudinaryUploadSheet
        open={isUploadSheetOpen}
        onClose={() => setIsUploadSheetOpen(false)}
        onAddFiles={addFiles}
        queue={queue}
        onRemove={removeFromQueue}
        onRetry={retryUpload}
        onConfirmOverwrite={confirmOverwrite}
        onClearFinished={clearFinished}
        isUploading={isUploading}
      />

    </div>
  );
}