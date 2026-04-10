import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { cloudinaryServiceQueue } from "@/services/Cloudinary/cloudinaryServiceQueue";
import { showConfirmAlert } from "@/utils/alerts";


export type UploadQueueStatus = "queued" | "uploading" | "success" | "error" | "conflict";

export type UploadQueueItem = {
  id: string;
  file: File;
  preview: string;
  status: UploadQueueStatus;
  progress: number;
  error?: string;
  uploadedUrl?: string;
  public_id?: string;
  overwrite?: boolean;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 10;

function createQueueItem(file: File): UploadQueueItem {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
    file,
    preview: URL.createObjectURL(file),
    status: "queued",
    progress: 0,
  };
}

export function useCloudinaryUploadQueue() {
  const qc = useQueryClient();
  const [queue, setQueue] = useState<UploadQueueItem[]>([]);
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

  const addFiles = (files: File[]) => {
    const normalized = files
      .filter((file) => {
        const validType =
          file.type.startsWith("image/") || file.type.startsWith("video/");
        const validSize = file.size <= MAX_FILE_SIZE;
        return validType && validSize;
      })
      .map(createQueueItem);

    if (!normalized.length) return;

    setQueue((prev) => {
      const availableSlots = MAX_FILES - prev.length;
      return [...prev, ...normalized.slice(0, availableSlots)];
    });
  };

  const removeFromQueue = (id: string) => {
    setQueue((prev) => {
      const found = prev.find((item) => item.id === id);
      if (found?.preview) URL.revokeObjectURL(found.preview);
      return prev.filter((item) => item.id !== id);
    });

    setActiveUploadId((prev) => (prev === id ? null : prev));
  };

  const clearFinished = () => {
    setQueue((prev) => {
      prev.forEach((item) => {
        if (item.status === "success" || item.status === "error" || item.status === "conflict") {
          URL.revokeObjectURL(item.preview);
        }
      });

      return prev.filter(
        (item) => item.status !== "success" && item.status !== "error" && item.status !== "conflict"
      );
    });
  };

  const retryUpload = (id: string) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            status: "queued",
            progress: 0,
            error: undefined,
            overwrite: false,
          }
          : item
      )
    );
  };

  const confirmOverwrite = (id: string) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            status: "queued",
            overwrite: true,
            error: undefined,
          }
          : item
      )
    );
  };

  const nextQueuedItem = useMemo(() => {
    if (activeUploadId) return null;
    return queue.find((item) => item.status === "queued") ?? null;
  }, [queue, activeUploadId]);

  const hasPendingItems = queue.some(
    (item) => item.status === "queued" || item.status === "uploading"
  );

  useEffect(() => {
    if (!nextQueuedItem || activeUploadId) return;

    const currentId = nextQueuedItem.id;

    setActiveUploadId(currentId);

    setQueue((prev) =>
      prev.map((item) =>
        item.id === currentId
          ? {
            ...item,
            status: "uploading",
            progress: 50,
            error: undefined,
          }
          : item
      )
    );

    (async () => {
      try {
        let isOverwrite = nextQueuedItem.overwrite || false;

        // 1. Pre-check existence if not already marked for overwrite
        if (!isOverwrite) {
          try {
            // Robustly remove extension and replace spaces with underscores to match Cloudinary slugification
            const originalName = nextQueuedItem.file.name;
            const lastDotIndex = originalName.lastIndexOf(".");
            const nameWithoutExt = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
            const slugifiedName = nameWithoutExt.replace(/\s+/g, "_");

            const publicId = `gallery/${slugifiedName}`;
            const exists = await cloudinaryServiceQueue.checkExists(publicId);


            if (exists) {
              const confirmed = await showConfirmAlert(
                "Imagen ya existente",
                `Ya existe una imagen con el nombre "${nextQueuedItem.file.name}" en la galería. ¿Desea sobrescribirla?`
              );

              if (!confirmed) {
                setQueue((prev) =>
                  prev.map((item) =>
                    item.id === currentId
                      ? {
                        ...item,
                        status: "conflict",
                        error: "Cancelado por el usuario (nombre duplicado).",
                      }
                      : item
                  )
                );
                setActiveUploadId(null);
                return;
              }
              isOverwrite = true;
            }
          } catch (e) {
            console.warn("Existence check failed, proceeding to upload", e);
            // If check fails (e.g. 500), we proceed to upload-safe which handles its own validation
          }
        }

        // 2. Perform the upload
        try {
          const result = await cloudinaryServiceQueue.uploadSafe(
            nextQueuedItem.file,
            isOverwrite
          );

          setQueue((prev) =>
            prev.map((item) =>
              item.id === currentId
                ? {
                  ...item,
                  status: "success",
                  progress: 100,
                  uploadedUrl: result.url,
                  public_id: result.public_id,
                }
                : item
            )
          );
        } catch (uploadError: any) {
          // 3. Handle conflict detected during upload (409)
          if (uploadError?.response?.status === 409) {
            const confirmed = await showConfirmAlert(
              "Conflicto de nombre",
              `El servidor indica que "${nextQueuedItem.file.name}" ya existe. ¿Desea sobrescribirla?`
            );

            if (confirmed) {
              // Retry immediately with overwrite
              const result = await cloudinaryServiceQueue.uploadSafe(
                nextQueuedItem.file,
                true
              );
              setQueue((prev) =>
                prev.map((item) =>
                  item.id === currentId
                    ? {
                      ...item,
                      status: "success",
                      progress: 100,
                      uploadedUrl: result.url,
                      public_id: result.public_id,
                    }
                    : item
                )
              );
              return;
            } else {
              setQueue((prev) =>
                prev.map((item) =>
                  item.id === currentId
                    ? {
                      ...item,
                      status: "conflict",
                      progress: 0,
                      error: "El nombre ya existe.",
                    }
                    : item
                )
              );
              return;
            }
          }
          throw uploadError; // Rethrow to main catch
        }
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "No se pudo subir el archivo.";

        setQueue((prev) =>
          prev.map((item) =>
            item.id === currentId
              ? {
                ...item,
                status: "error",
                progress: 0,
                error: message,
              }
              : item
          )
        );
      } finally {
        setActiveUploadId(null);
      }
    })();

  }, [nextQueuedItem, activeUploadId]);

  useEffect(() => {
    if (!hasPendingItems && queue.length > 0) {
      qc.invalidateQueries({ queryKey: ["cloudinary-gallery"] });
    }
  }, [hasPendingItems, queue.length, qc]);

  return {
    queue,
    addFiles,
    removeFromQueue,
    clearFinished,
    retryUpload,
    confirmOverwrite,
    isUploading:
      activeUploadId !== null ||
      queue.some((item) => item.status === "uploading"),
    pendingCount: queue.filter(
      (item) => item.status === "queued" || item.status === "uploading"
    ).length,
  };
}