import React from "react";
import type { PersonalPageType } from "../../models/PersonalPageType";
import {
  fillPersonalFromLookup,
  lookupPersonalByCedula,
  resetPersonalPersonaFields,
} from "@/utils/personaLookup";
import type { PersonalLookupResult } from "@/utils/personaLookup";

type UsePersonalPersonaLookupParams = {
  personalPage: PersonalPageType;
  setPersonalPage: React.Dispatch<React.SetStateAction<PersonalPageType | null>>;
  form: any;
  isNew?: boolean;
  isSaving?: boolean;
};

export function usePersonalPersonaLookup({
  setPersonalPage,
  form,
  isNew = false,
  isSaving = false,
}: UsePersonalPersonaLookupParams) {
  const [isLookingUp, setIsLookingUp] = React.useState(false);
  const [personaFromDB, setPersonaFromDB] = React.useState(false);
  const [lookupError, setLookupError] = React.useState<string | null>(null);

  const syncFormPersonaFields = React.useCallback(
    (data: {
      name?: string;
      lastname1?: string;
      lastname2?: string;
      birthDate?: string;
      phone?: string;
      email?: string;
      direction?: string;
    }) => {
      form.setFieldValue("name", data.name ?? "");
      form.setFieldValue("lastname1", data.lastname1 ?? "");
      form.setFieldValue("lastname2", data.lastname2 ?? "");
      form.setFieldValue("birthDate", data.birthDate ?? "");
      form.setFieldValue("phone", data.phone ?? "");
      form.setFieldValue("email", data.email ?? "");
      form.setFieldValue("direction", data.direction ?? "");
    },
    [form]
  );

  const clearPersonaFields = React.useCallback(() => {
    setPersonalPage((prev) => (prev ? resetPersonalPersonaFields(prev) : prev));

    syncFormPersonaFields({
      name: "",
      lastname1: "",
      lastname2: "",
      birthDate: "",
      phone: "",
      email: "",
      direction: "",
    });
  }, [setPersonalPage, syncFormPersonaFields]);

  const applyLookup = React.useCallback(
    async (cedulaRaw: string) => {
      const cedula = (cedulaRaw ?? "").replace(/[-\s]/g, "").trim();

      if (!isNew || isSaving) return null;

      if (!cedula) {
        setPersonaFromDB(false);
        setLookupError(null);
        clearPersonaFields();
        return null;
      }

      if (cedula.length < 9) {
        setPersonaFromDB(false);
        setLookupError(null);
        clearPersonaFields();
        return null;
      }

      try {
        setIsLookingUp(true);
        setLookupError(null);

        const result: PersonalLookupResult = await lookupPersonalByCedula(cedula);

        if (!result) {
          setPersonaFromDB(false);
          clearPersonaFields();
          return null;
        }

        setPersonaFromDB(result.source === "DB");

        setPersonalPage((prev) => (prev ? fillPersonalFromLookup(prev, result) : prev));

        syncFormPersonaFields({
          name: result.firstname || "",
          lastname1: result.lastname1 || "",
          lastname2: result.lastname2 || "",
          birthDate: result.birthDate || "",
          phone: result.phone || "",
          email: result.email || "",
          direction: result.direction || "",
        });

        return result;
      } catch (error: any) {
        setPersonaFromDB(false);
        setLookupError(
          error?.response?.data?.message ||
            error?.message ||
            "No se pudo consultar la persona"
        );
        clearPersonaFields();
        return null;
      } finally {
        setIsLookingUp(false);
      }
    },
    [isNew, isSaving, setPersonalPage, clearPersonaFields, syncFormPersonaFields]
  );

  return {
    isLookingUp,
    personaFromDB,
    lookupError,
    applyLookup,
    clearLookupError: () => setLookupError(null),
  };
}