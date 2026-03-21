import {
  AssociateListResponseSchema,
  AssociateSchema,
  type Associate,
  type AssociateListParams,
  type AssociateListResponse,
  type UpdateAssociateValues,
} from "../../schemas/adminSolicitudes";
import apiConfig from "../../apiConfig/apiConfig";

// ✅ Listado ligero (para tablas)
export async function listAssociates(
  params: AssociateListParams
): Promise<AssociateListResponse> {
  const queryParams: Record<string, unknown> = {
    page: params.page,
    limit: params.limit,
  };

  // ✅ El backend usa booleanos (true=ACTIVO, false=INACTIVO)
  // Pero Axios puede omitir `false` — lo forzamos a string "true"/"false"
  if (params.estado !== undefined) queryParams.estado = String(params.estado);

  if (params.search) queryParams.search = params.search;
  if (params.sort)   queryParams.sort   = params.sort;

  const response = await apiConfig.get("/associates", { params: queryParams });
  return AssociateListResponseSchema.parse(response.data);
}

// ✅ Detalle BÁSICO
export async function getAssociateBasic(id: number): Promise<Associate> {
  const response = await apiConfig.get(`/associates/${id}/basic`);
  const parsed = AssociateSchema.safeParse(response.data);
  if (!parsed.success) {
    console.error("❌ Schema validation failed:", parsed.error.format());
    throw new Error("Error al validar la respuesta del servidor");
  }
  return parsed.data;
}

// ✅ Detalle completo
export async function getAssociate(id: number): Promise<Associate> {
  const response = await apiConfig.get(`/associates/${id}`);
  const parsed = AssociateSchema.safeParse(response.data);
  if (!parsed.success) {
    console.error("❌ Schema validation failed:", parsed.error);
    throw new Error("Error al validar la respuesta del servidor");
  }
  return parsed.data;
}

export async function getAssociateByCedula(cedula: string): Promise<Associate> {
  const response = await apiConfig.get(`/associates/cedula/${cedula}`);
  return AssociateSchema.parse(response.data);
}

export async function updateAssociate(id: number, patch: UpdateAssociateValues): Promise<Associate> {
  const response = await apiConfig.patch(`/associates/${id}`, patch);
  return AssociateSchema.parse(response.data);
}

export async function activateAssociate(id: number): Promise<Associate> {
  const response = await apiConfig.patch(`/associates/${id}/activate`);
  return AssociateSchema.parse(response.data);
}

export async function deactivateAssociate(id: number): Promise<Associate> {
  const response = await apiConfig.patch(`/associates/${id}/deactivate`);
  return AssociateSchema.parse(response.data);
}

export async function toggleAssociateStatus(id: number): Promise<Associate> {
  const response = await apiConfig.patch(`/associates/${id}/toggle`);
  return AssociateSchema.parse(response.data);
}

export async function getAssociatesStats() {
  const response = await apiConfig.get("/associates/stats");
  return response.data;
}

export async function downloadAssociatesPDF(params: {
  estado?: string;
  search?: string;
  sort?: string;
}): Promise<Blob> {
  const response = await apiConfig.get("/associates/pdf-list", {
    params,
    responseType: "blob",
    headers: { Accept: "application/pdf" },
  });
  return response.data as Blob;
}