import { FileText } from "lucide-react";

export default function ManualsEmptyState() {
  return (
    <div className="mx-auto flex min-h-[55vh] w-full max-w-2xl items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#F6F4EC]">
          <FileText className="h-7 w-7 text-[#8D7B4E]" strokeWidth={1.7} />
        </div>

        <h1 className="text-3xl font-semibold text-[#2F3422]">
          Manuales de Usuario
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#2F3422]/60">
          Aún no hay documentos disponibles en la carpeta de manuales.
        </p>
      </div>
    </div>
  );
}