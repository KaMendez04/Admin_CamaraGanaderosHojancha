import { useEffect, useRef, useState } from "react";
import {
  ImagePlus,
  UploadCloud,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { UploadQueueItem } from "@/hooks/Cloudinary/useCloudinaryUploadQueue";
import { ActionButtons } from "@/components/ActionButtons";


type Props = {
  open: boolean;
  onClose: () => void;
  onAddFiles: (files: File[]) => void;
  queue: UploadQueueItem[];
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  onConfirmOverwrite: (id: string) => void;
  onClearFinished: () => void;
  isUploading?: boolean;
};

export default function CloudinaryUploadSheet({
  open,
  onClose,
  onAddFiles,
  queue,
  onRetry,
  onConfirmOverwrite,
  onClearFinished,
  isUploading = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setIsClosing(false);
      setIsMounted(true);

      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });

      return () => cancelAnimationFrame(raf);
    }

    setIsClosing(true);
    setIsVisible(false);

    const timeout = setTimeout(() => {
      setIsMounted(false);
      setIsClosing(false);
    }, 380);

    return () => clearTimeout(timeout);
  }, [open]);

  if (!isMounted) return null;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    onAddFiles(Array.from(files));
  };

  return (
    <div data-chatbot-modal="true" className="fixed inset-0 z-[120] overflow-hidden">
      <div
        style={{
          transition: isClosing
            ? "opacity 320ms cubic-bezier(0.4, 0, 1, 1)"
            : "opacity 480ms cubic-bezier(0.0, 0, 0.2, 1)",
        }}
        className={`absolute inset-0 bg-black/35 backdrop-blur-[1.5px] ${isVisible ? "opacity-100" : "opacity-0"
          }`}
        onClick={() => {
          if (!isUploading) onClose();
        }}
      />

      <aside
        style={{
          transition: isClosing
            ? "transform 340ms cubic-bezier(0.4, 0, 0.6, 1)"
            : "transform 560ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={`absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col border-l border-[#E5E7EB] bg-white shadow-2xl will-change-transform ${isVisible ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-start justify-between border-b border-[#E5E7EB] bg-[#FAF9F5] px-5 py-3">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white p-2.5">
              <ImagePlus className="h-5 w-5 text-[#556B2F]" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#243127]">
                Subir archivos
              </h2>
            </div>
          </div>

          <ActionButtons
            size="sm"
            onCancel={() => {
              if (!isUploading) onClose();
            }}
            showCancel={true}
            disabled={isUploading}
          />

        </div>

        <div className="overflow-y-auto px-5 pb-5 pt-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            className={`rounded-2xl border-2 border-dashed px-6 pb-6 pt-3 text-center transition ${isDragging
              ? "border-[#7A9538] bg-[#F3F8EA]"
              : "border-[#D6DDE5] bg-[#FAF9F5]"
              }`}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white">
              <UploadCloud className="h-7 w-7 text-[#556B2F]" />
            </div>

            <h3 className="text-base font-semibold text-[#243127]">
              Arrastrá fotos aquí
            </h3>

            <p className="mt-1 text-sm text-[#6B7280]">
              o presioná el botón para explorar archivos en el equipo
            </p>

            <div className="mt-4">
              <ActionButtons
                onUpload={() => inputRef.current?.click()}
                showUpload={true}
                showText={true}
                uploadText="Seleccionar archivos"
                isUploading={isUploading}
              />
            </div>



            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={(e) => {
                handleFiles(e.target.files);
                e.currentTarget.value = "";
              }}
            />

            <div className="mt-4 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-xs text-[#556B2F]">
              JPG, PNG, WEBP, GIF, AVIF • Máx. 10 MB por archivo
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-[#243127]">
              Cola de subida
            </h4>

            <ActionButtons
              size="sm"
              onCancelAlt={onClearFinished}
              showCancelAlt={true}
              showText={true}
              cancelAltText="Limpiar terminados"
              disabled={isUploading}
            />

          </div>

          <div className="mt-4 space-y-3">
            {queue.length === 0 ? (
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAF9F5] p-4 text-sm text-[#6B7280]">
                No hay archivos en espera todavía.
              </div>
            ) : (
              queue.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#E5E7EB] bg-[#FAF9F5] p-3 shadow-sm"
                >
                  <div className="flex gap-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#EEF2F7] bg-[#F8FAFC]">
                      {item.file.type.startsWith("image/") ? (
                        <img
                          src={item.preview}
                          alt={item.file.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-[#6B7280]">
                          Video
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#243127]">
                            {item.file.name}
                          </p>
                          <p className="text-xs text-[#6B7280]">
                            {(item.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.status === "uploading" && (
                            <Loader2 className="h-4 w-4 animate-spin text-[#556B2F]" />
                          )}
                          {item.status === "success" && (
                            <CheckCircle2 className="h-4 w-4 text-[#7A9538]" />
                          )}
                          {item.status === "error" && (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          )}
                          {item.status === "conflict" && (
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                      </div>

                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#EDF2E7]">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${item.status === "error"
                            ? "bg-red-400"
                            : item.status === "conflict"
                              ? "bg-[#C19A3D]"
                              : item.status === "success"
                                ? "bg-[#7A9538]"
                                : "bg-[#C19A3D]"
                            }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs capitalize text-[#6B7280]">
                          {item.status === "queued" && "En espera"}
                          {item.status === "uploading" && "Subiendo"}
                          {item.status === "success" && "Subida completada"}
                          {item.status === "error" && "Error"}
                        </span>

                        {item.status === "error" && (
                          <ActionButtons
                            size="sm"
                            onRefresh={() => onRetry(item.id)}
                            showRefresh={true}
                            showText={true}
                            refreshText="Reintentar"
                          />
                        )}

                        {item.status === "conflict" && (
                          <div className="flex flex-row gap-2 items-center">
                            <p className="text-[10px] text-amber-600">Al presionar sobrescribir se borrará la versión anterior.</p>
                            <ActionButtons
                              size="sm"
                              onUpload={() => onConfirmOverwrite(item.id)}
                              showUpload={true}
                              showText={true}
                              uploadText="Sobrescribir"
                            />
                          </div>
                        )}

                      </div>

                      {item.error && (
                        <p className="mt-1 text-xs text-red-600">{item.error}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}