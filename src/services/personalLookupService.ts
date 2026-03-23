import apiConfig from "@/apiConfig/apiConfig";

export type PersonaLookupResponse = {
  found: boolean;
  persona?: {
    idPersona: number;
    cedula: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    telefono: string;
    email: string;
    fechaNacimiento: string;
    direccion?: string;
  };
  legacy?: {
    firstname: string;
    lastname1: string;
    lastname2: string;
  };
};

export async function lookupPersonaByCedulaForPersonal(cedula: string) {
  const v = (cedula ?? "").trim();
  if (!v) return null;

  try {
    const { data } = await apiConfig.get<PersonaLookupResponse>(
      `/personas/cedula/${encodeURIComponent(v)}`
    );
    return data;
  } catch (err: any) {
    const status = err?.response?.status;
    if (status === 404 || status === 401 || status === 403) return null;
    throw err;
  }
}