import type { PersonalPageType } from "../models/PersonalPageType";
import { lookupPersonaByCedulaForPersonal } from "../services/personalLookupService";

export type PersonalLookupResult =
  | {
      source: "DB";
      firstname: string;
      lastname1: string;
      lastname2: string;
      phone: string;
      email: string;
      birthDate: string;
      direction: string;
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
    }
  | null;

export async function lookupPersonalByCedula(
  cedula: string
): Promise<PersonalLookupResult> {
  const v = (cedula ?? "").trim();
  if (!v) return null;

  const db = await lookupPersonaByCedulaForPersonal(v);

  if (db?.found && db.persona) {
    return {
      source: "DB",
      firstname: db.persona.nombre ?? "",
      lastname1: db.persona.apellido1 ?? "",
      lastname2: db.persona.apellido2 ?? "",
      phone: db.persona.telefono ?? "",
      email: db.persona.email ?? "",
      birthDate: db.persona.fechaNacimiento ?? "",
      direction: db.persona.direccion ?? "",
      persona: db.persona,
    };
  }

  return null;
}

export function resetPersonalPersonaFields(
  prev: PersonalPageType
): PersonalPageType {
  return {
    ...prev,
    name: "",
    lastname1: "",
    lastname2: "",
    birthDate: "",
    phone: "",
    email: "",
    direction: "",
  };
}

export function fillPersonalFromLookup(
  prev: PersonalPageType,
  result: Exclude<PersonalLookupResult, null>
): PersonalPageType {
  return {
    ...prev,
    name: result.firstname || "",
    lastname1: result.lastname1 || "",
    lastname2: result.lastname2 || "",
    birthDate: result.birthDate || "",
    phone: result.phone || "",
    email: result.email || "",
    direction: result.direction || "",
  };
}