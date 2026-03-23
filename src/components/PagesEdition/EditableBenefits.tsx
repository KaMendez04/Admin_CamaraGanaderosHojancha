import { LucideIcon } from "../common/lucideIcon";
import { CustomSelect } from "../CustomSelect";
import { ActionButtons } from "../ActionButtons";

export function EditableBenefits({
  items,
  index,
  setIndex,
  limits,
  onChange,
  onCancel,
  onSave,
  canSave,
  saving,
}: {
  items: Array<{ iconName: string; title: string; desc: string; order: number }>;
  index: number;
  setIndex: (i: number) => void;
  limits: { benefitTitle: number; benefitDesc: number };
  onChange: (idx: number, patch: Partial<{ title: string; desc: string }>) => void;
  onCancel: () => void;
  onSave: () => void;
  canSave: boolean;
  saving: boolean;
}) {
  const b = items[index];

  if (!b) {
    return (
      <section className="rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
        <h2 className="text-lg font-semibold text-[#243018] md:text-xl">
          Editar beneficio
        </h2>
        <p className="mt-2 text-sm text-slate-500">No hay beneficios.</p>
      </section>
    );
  }

  const tl = limits.benefitTitle - (b.title?.length ?? 0);
  const dl = limits.benefitDesc - (b.desc?.length ?? 0);

  const benefitOptions = items.map((it, i) => ({
    value: i,
    label: it.title || `Beneficio #${i + 1}`,
  }));

  return (
    <section className="space-y-3 rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
      <div>
        <h2 className="text-lg font-semibold text-[#243018] md:text-xl">
          Editar beneficio
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Selecciona un beneficio y actualiza su contenido.
        </p>
      </div>

      <CustomSelect
        value={index}
        onChange={(value) => setIndex(Number(value))}
        options={benefitOptions}
        placeholder="Selecciona un beneficio"
        searchable={true}
        searchPlaceholder="Buscar beneficio..."
      />

      <div className="flex items-center gap-3 rounded-xl border border-[#E7E2D7] bg-white px-3 py-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8DCCF] bg-[#FAFBF7]">
          <LucideIcon name={b.iconName} className="h-5 w-5 text-[#708C3E]" />
        </div>
        <span className="text-sm text-slate-600">
          Icono: <strong>{b.iconName}</strong> (no editable)
        </span>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
          Título
        </label>
        <input
          value={b.title}
          maxLength={limits.benefitTitle}
          onChange={(e) => onChange(index, { title: e.target.value })}
          className="w-full rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
        />
        <p className="mt-1 text-xs text-slate-500">
          Quedan {tl} de {limits.benefitTitle} caracteres
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
          Descripción
        </label>
        <textarea
          rows={3}
          value={b.desc}
          maxLength={limits.benefitDesc}
          onChange={(e) => onChange(index, { desc: e.target.value })}
          className="w-full resize-none rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
        />
        <p className="mt-1 text-xs text-slate-500">
          Quedan {dl} de {limits.benefitDesc} caracteres
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