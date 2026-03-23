import { Pencil, Save, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { usePSpendsList } from "../../../hooks/Budget/pSpend/usePSpendCatalog";
import { GenericTable } from "../../GenericTable";
import { useUpdatePSpend } from "../../../hooks/Budget/pSpend/usePSpendMutation";
import { CharCounter } from "../../CharCounter";
import { useFiscalYear } from "@/hooks/Budget/useFiscalYear";

function formatMoneyCR(v: string | number) {
  const n = Number(v ?? 0);
  return n.toLocaleString("es-CR", { style: "currency", currency: "CRC" });
}

function parseCRCToNumber(input: string) {
  const cleaned = (input ?? "")
    .replace(/[₡\s]/g, "")
    .replace(/\./g, "")
    .replace(/,/g, ".");

  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

type Props = {
  subTypeId?: number;
  fiscalYearId?: number;
};

type Row = any;

export default function PSpendList({ subTypeId, fiscalYearId }: Props) {
  const { current } = useFiscalYear();
  const selectedFiscalYearId = fiscalYearId ?? current?.id;

  const q = usePSpendsList(subTypeId, selectedFiscalYearId);
  const mUpdate = useUpdatePSpend();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftAmount, setDraftAmount] = useState<string>("");
  const draftRef = useRef<string>("");

  const MAX_AMOUNT_LENGTH = 20;

  const rows = useMemo(() => {
    return (q.data ?? []) as Row[];
  }, [q.data]);

  function startEdit(row: Row) {
    const initial = String(row.amount ?? "");
    setEditingId(row.id);
    setDraftAmount(initial);
    draftRef.current = initial;
  }

  function cancelEdit() {
    setEditingId(null);
    setDraftAmount("");
    draftRef.current = "";
  }

async function saveEdit(row: Row) {
  if (!selectedFiscalYearId) return;

  const amountNumber = parseCRCToNumber(draftRef.current);

  try {
    await mUpdate.mutate({
      id: row.id,
      amount: amountNumber,
      fiscalYearId: selectedFiscalYearId,
    });
    cancelEdit();
  } catch {}
}

  const columns = useMemo<ColumnDef<Row, any>[]>(
    () => [
      {
        id: "subtipo",
        header: "Subtipo",
        cell: ({ row }) => row.original?.subType?.name ?? "-",
      },
      {
        id: "monto",
        header: "Monto",
        cell: ({ row }) => {
          const r = row.original;
          const isEditing = editingId === r.id;

          if (!isEditing) return formatMoneyCR(r.amount);

          return (
            <div className="w-full max-w-[220px]">
              <input
                className="w-full max-w-[220px] rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#708C3E]"
                value={draftAmount}
                maxLength={MAX_AMOUNT_LENGTH}
                onChange={(e) => {
                  const sanitized = e.target.value.replace(/[^0-9.,]/g, "");
                  setDraftAmount(sanitized);
                  draftRef.current = sanitized;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") cancelEdit();
                  if (e.key === "Enter") saveEdit(r);
                }}
                placeholder="₡0,00"
                inputMode="decimal"
                autoFocus
              />
              <CharCounter value={draftAmount} max={MAX_AMOUNT_LENGTH} />
            </div>
          );
        },
      },
      {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => {
          const r = row.original;
          const isEditing = editingId === r.id;

          if (isEditing) {
            return (
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
                <button
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6B7A3A] px-3 py-2 text-white shadow hover:opacity-90 disabled:opacity-50 sm:w-auto"
                  onClick={() => saveEdit(r)}
                  disabled={mUpdate.loading || !selectedFiscalYearId}
                  title="Guardar"
                >
                  <Save className="h-4 w-4" />
                  Guardar
                </button>

                <button
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 sm:w-auto"
                  onClick={cancelEdit}
                  disabled={mUpdate.loading}
                  title="Cancelar"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </button>
              </div>
            );
          }

          return (
            <button
              className="inline-flex items-center justify-center rounded-lg border border-[#6B7A3A] bg-[#F8F9F3] p-2 text-[#6B7A3A] shadow-sm transition-colors hover:bg-[#EAEFE0]"
              onClick={() => startEdit(r)}
              title="Editar"
            >
              <Pencil className="h-4 w-4" />
            </button>
          );
        },
      },
    ],
    [editingId, draftAmount, mUpdate.loading, selectedFiscalYearId]
  );

  if (q.error) return <p className="text-sm text-red-600">{q.error}</p>;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-gray-800">
        Proyecciones registradas
      </h3>

      <GenericTable<Row> data={rows} columns={columns} isLoading={q.loading} />

      {!q.loading && rows.length === 0 && subTypeId && (
        <p className="mt-3 text-xs text-gray-500">
          No hay proyecciones para este subtipo en el año fiscal seleccionado.
        </p>
      )}

      {mUpdate.error && (
        <p className="mt-3 text-xs text-red-600">{mUpdate.error}</p>
      )}
    </div>
  );
}