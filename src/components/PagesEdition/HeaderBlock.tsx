import { ActionButtons } from "../ActionButtons";

export function HeaderBlock({
  title,
  desc,
  limits,
  onTitle,
  onDesc,
  onCancel,
  onSave,
  canSave,
  saving,
}: {
  title: string;
  desc: string;
  limits: { title: number; desc: number };
  onTitle: (v: string) => void;
  onDesc: (v: string) => void;
  onCancel: () => void;
  onSave: () => void;
  canSave: boolean;
  saving: boolean;
}) {
  return (
    <section className="space-y-3 rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
      <div>
        <h2 className="text-lg font-semibold text-[#243018] md:text-xl">
          Editar encabezado
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Modifica el título y la descripción principal de la sección.
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
          Título
        </label>
        <input
          value={title}
          onChange={(e) => onTitle(e.target.value)}
          maxLength={limits.title}
          placeholder="Título"
          className="w-full rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
        />
        <p className="mt-1 text-xs text-slate-500">
          Quedan {limits.title - (title?.length ?? 0)} de {limits.title} caracteres
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
          Descripción
        </label>
        <textarea
          rows={3}
          value={desc}
          onChange={(e) => onDesc(e.target.value)}
          maxLength={limits.desc}
          placeholder="Descripción"
          className="w-full resize-none rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
        />
        <p className="mt-1 text-xs text-slate-500">
          Quedan {limits.desc - (desc?.length ?? 0)} de {limits.desc} caracteres
        </p>
      </div>

      <div className="flex justify-end pt-1">
        <ActionButtons
          size="sm"
          showSave
          showCancel
          showText
          onSave={onSave}
          onCancel={onCancel}
          disabled={!canSave}
          isSaving={saving}
          requireConfirmCancel
          cancelConfirmTitle="Confirmar cancelación"
          cancelConfirmText="¿Está seguro que desea cancelar los cambios?"
          saveText="Guardar"
          cancelText="Cancelar"
        />
      </div>
    </section>
  );
}