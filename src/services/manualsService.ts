import apiConfig from "@/apiConfig/apiConfig";
import type { ManualItem } from "@/types/manualsTypes";


export async function getManuals(): Promise<ManualItem[]> {
  const response = await apiConfig.get("/manuals");
  return response.data as ManualItem[];
}

export async function downloadManualFile(
  path: string,
  fileName: string
): Promise<void> {
  const response = await apiConfig.get("/manuals/download", {
    params: { path },
    responseType: "blob",
  });

  const blob = response.data as Blob;
  const url = window.URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.URL.revokeObjectURL(url);
}