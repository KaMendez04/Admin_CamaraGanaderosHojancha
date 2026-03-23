import { CustomSelect } from "../CustomSelect";
import { ActionButtons } from "../ActionButtons";

export function EditableRequirements({
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
  items: Array<{ text: string; order: number }>;
  index: number;
  setIndex: (i: number) => void;
  limits: { requirement: number };
  onChange: (idx: number, text: string) => void;
  onAdd: (text: string) => void;
  onCancel: () => void;
  onSave: () => void;
  canSave: boolean;
  saving: boolean;
}) {
  const current = index >= 0 ? items[index] : null;
  const leftEdit = current
    ? limits.requirement - (current.text?.length ?? 0)
    : limits.requirement;

  const requirementOptions = [
    { value: -1, label: "Selecciona un requisito" },
    ...items.map((r, i) => ({
      value: i,
      label: r.text.slice(0, 60) || `Requisito #${i + 1}`,
    })),
  ];

  return (
    <section className="space-y-3 rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
      <div>
        <h2 className="text-lg font-semibold text-[#243018] md:text-xl">
          Requisitos
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Selecciona un requisito para editarlo.
        </p>
      </div>

      <CustomSelect
        value={index}
        onChange={(value) => setIndex(Number(value))}
        options={requirementOptions}
        placeholder="Selecciona un requisito"
        searchable={true}
        searchPlaceholder="Buscar requisito..."
      />

      {current && (
        <div className="rounded-xl border border-[#E7E2D7] bg-white p-3">
          <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
            Requisito
          </label>
          <input
            value={current.text}
            maxLength={limits.requirement}
            onChange={(e) => onChange(index, e.target.value)}
            className="w-full rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
          />
          <p className="mt-2 text-xs text-slate-500">
            Quedan {leftEdit} de {limits.requirement} caracteres
          </p>
        </div>
      )}

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