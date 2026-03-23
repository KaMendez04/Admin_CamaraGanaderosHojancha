import { z } from "zod";

const todayYMD = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const personalSchema = z
  .object({
    IDE: z.string().optional(),
    name: z.string().trim().min(1, "Requerido"),
    lastname1: z.string().trim().min(1, "Requerido"),
    lastname2: z.string().trim().min(1, "Requerido"),
    birthDate: z.string().min(1, "Requerido"),
    email: z.string().trim().min(1, "Requerido").email("Correo inválido"),
    phone: z.string().regex(/^\d{8}$/, "Debe tener 8 dígitos"),
    direction: z.string().trim().min(1, "Requerido"),
    occupation: z.string().trim().min(1, "Requerido"),
    isActive: z.boolean().optional(),
    startWorkDate: z.string().optional(),
    endWorkDate: z.union([z.string(), z.null()]).optional(),
  })
  .superRefine((data, ctx) => {
    const today = todayYMD();
    const currentYear = new Date().getFullYear();

    if (data.birthDate) {
      const birthYear = parseInt(data.birthDate.split("-")[0]);

      if (Number.isNaN(birthYear) || birthYear >= currentYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["birthDate"],
          message: `No se permiten fechas del año ${currentYear} o posteriores`,
        });
      } else {
        const birth = new Date(data.birthDate);
        const now = new Date();
        const age = now.getFullYear() - birth.getFullYear();
        const hasBirthdayPassed =
          now.getMonth() > birth.getMonth() ||
          (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
        const realAge = hasBirthdayPassed ? age : age - 1;

        if (realAge < 18) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["birthDate"],
            message: "Debe tener al menos 18 años",
          });
        }
      }
    }

    if (data.startWorkDate && data.startWorkDate >= today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startWorkDate"],
        message: "La fecha de inicio debe ser anterior a hoy",
      });
    }

    if (!data.isActive && (!data.endWorkDate || data.endWorkDate.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endWorkDate"],
        message: "Requerido cuando el estado es inactivo",
      });
    }

    if (data.endWorkDate && data.startWorkDate) {
      const startDate = new Date(data.startWorkDate);
      const endDate = new Date(data.endWorkDate);

      if (endDate <= startDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endWorkDate"],
          message:
            "La fecha de salida debe ser al menos 1 día después de la fecha de inicio",
        });
      }
    }
  });

export type PersonalFormValues = z.infer<typeof personalSchema>;