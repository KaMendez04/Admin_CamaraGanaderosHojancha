import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import type { PersonalPageType } from "../../models/PersonalPageType";

const zodFieldValidator =
  (schema: z.ZodTypeAny) =>
  ({ value }: { value: unknown }): string[] | undefined => {
    const res = schema.safeParse(value);
    return res.success ? undefined : res.error.issues.map((i) => i.message);
  };

export function useEditPersonalPageModal(defaults: PersonalPageType) {
  const form = useForm({
    defaultValues: {
      IDE: defaults.IDE ?? "",
      name: defaults.name ?? "",
      lastname1: defaults.lastname1 ?? "",
      lastname2: defaults.lastname2 ?? "",
      birthDate: defaults.birthDate ?? "",
      email: defaults.email ?? "",
      phone: defaults.phone ?? "",
      direction: defaults.direction ?? "",
      occupation: defaults.occupation ?? "",
      isActive: !!defaults.isActive,
      startWorkDate: defaults.startWorkDate ?? "",
      endWorkDate: (defaults.endWorkDate ?? "") as string | null,
    },
    onSubmit: async () => {},
  });

  const validators = {
    name: { onChange: zodFieldValidator(z.string().trim().min(1, "Requerido")) },
    lastname1: { onChange: zodFieldValidator(z.string().trim().min(1, "Requerido")) },
    lastname2: { onChange: zodFieldValidator(z.string().trim().min(1, "Requerido")) },
    birthDate: { onChange: zodFieldValidator(z.string().min(1, "Requerido")) },
    email: {
      onChange: zodFieldValidator(
        z.string().trim().min(1, "Requerido").email("Correo inválido")
      ),
    },
    phone: {
      onChange: zodFieldValidator(
        z.string().regex(/^\d{8}$/, "Debe tener 8 dígitos")
      ),
    },
    direction: { onChange: zodFieldValidator(z.string().trim().min(1, "Requerido")) },
    occupation: { onChange: zodFieldValidator(z.string().trim().min(1, "Requerido")) },
    startWorkDate: { onChange: () => undefined },
    endWorkDate: { onChange: () => undefined },
  } as const;

  return { form, validators };
}