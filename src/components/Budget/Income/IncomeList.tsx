import { Calendar as CalendarIcon, Pencil, Save, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { useIncomesList } from "../../../hooks/Budget/income/useIncomeCatalog";
import { GenericTable } from "../../GenericTable";
import { useUpdateIncome } from "../../../hooks/Budget/income/useIncomeMutation";

import { BirthDatePicker } from "@/components/ui/birthDayPicker";
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

function formatDateCR(value: any) {
  if (!value) return "-";
  const s = String(value).trim();
  if (!s) return "-";

  const pure = s.includes("T") ? s.slice(0, 10) : s;

  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(pure)) return pure;

  if (/^\d{4}-\d{2}-\d{2}$/.test(pure)) {
    const [y, m, d] = pure.split("-");
    return `${d}/${m}/${y}`;
  }

  return pure;
}

function normalizeToDateInput(value: any) {
  const v = String(value ?? "").trim();
  if (!v) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  if (/^\d{4}-\d{2}-\d{2}T/.test(v)) return v.slice(0, 10);

  const m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const dd = String(m[1]).padStart(2, "0");
    const mm = String(m[2]).padStart(2, "0");
    const yyyy = m[3];
    return `${yyyy}-${mm}-${dd}`;
  }

  return v;
}

type Props = {
  subTypeId?: number;
  fiscalYearId?: number;
};

type Row = any;

export default function IncomeList({ subTypeId, fiscalYearId }: Props) {
  const { current } = useFiscalYear();
  const selectedFiscalYearId = fiscalYearId ?? current?.id;

  const q = useIncomesList(subTypeId, selectedFiscalYearId);
  const mUpdate = useUpdateIncome();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<"date" | "amount" | null>(null);
  const [draftAmount, setDraftAmount] = useState<string>("");
  const [draftDate, setDraftDate] = useState<string>("");

  const amountRef = useRef<string>("");
  const dateRef = useRef<string>("");

  const MAX_AMOUNT_LENGTH = 20;

  const DATE_COL = "w-[180px]";
  const SUBTYPE_COL = "w-[180px]";
  const AMOUNT_COL = "w-[220px]";
  const ACTIONS_COL = "w-[104px]";

  const rows = useMemo(() => {
    return (q.data ?? []) as Row[];
  }, [q.data]);

  function startEdit(row: Row, field: "date" | "amount") {
    const initialAmount = String(row.amount ?? "");
    const initialDate = normalizeToDateInput(row.date);

    setEditingId(row.id);
    setEditingField(field);

    setDraftAmount(initialAmount);
    amountRef.current = initialAmount;

    setDraftDate(initialDate);
    dateRef.current = initialDate;
  }

  function cancelEdit() {
    setEditingId(null);
    setDraftAmount("");
    amountRef.current = "";
    setDraftDate("");
    dateRef.current = "";
    setEditingField(null);
  }

  async function saveEdit(row: Row) {
    if (!selectedFiscalYearId || !editingField) return;

    const amountNumber =
      editingField === "amount"
        ? parseCRCToNumber(amountRef.current)
        : Number(row.amount ?? 0);

    const dateValue =
      editingField === "date"
        ? (dateRef.current ?? "").trim()
        : normalizeToDateInput(row.date);

    try {
      await mUpdate.mutate({
        id: row.id,
        amount: amountNumber,
        date: dateValue,
        fiscalYearId: selectedFiscalYearId,
      });
      cancelEdit();
    } catch {}
  }

  const columns = useMemo<ColumnDef<Row, any>[]>(
    () => [
      {
        id: "fecha",
        header: () => <div className={`${DATE_COL} text-left`}>Fecha</div>,
        cell: ({ row }) => {
          const r = row.original;
          const isEditing = editingId === r.id && editingField === "date";

          if (!isEditing) {
            return <div className={DATE_COL}>{formatDateCR(r?.date)}</div>;
          }

          return (
            <div
              className={`${DATE_COL} max-w-full`}
              onKeyDown={(e) => {
                if (e.key === "Escape") cancelEdit();
                if (e.key === "Enter") saveEdit(r);
              }}
            >
              <BirthDatePicker
                value={draftDate}
                onChange={(v) => {
                  setDraftDate(v);
                  dateRef.current = v;
                }}
                placeholder="Seleccione una fecha"
                disabled={mUpdate.loading}
                className="w-full"
                helperText=""
                triggerClassName="w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#708C3E]"
              />
            </div>
          );
        },
      },
      {
        id: "subtipo",
        header: () => <div className={`${SUBTYPE_COL} text-left`}>Subtipo</div>,
        cell: ({ row }) => (
          <div className={SUBTYPE_COL}>
            {row.original?.incomeSubType?.name ?? "-"}
          </div>
        ),
      },
      {
        id: "monto",
        header: () => <div className={`${AMOUNT_COL} text-left`}>Monto</div>,
        cell: ({ row }) => {
          const r = row.original;
          const isEditing = editingId === r.id && editingField === "amount";

          if (!isEditing) {
            return <div className={AMOUNT_COL}>{formatMoneyCR(r.amount)}</div>;
          }

          return (
            <div className={AMOUNT_COL}>
              <input
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#708C3E]"
                value={draftAmount}
                maxLength={MAX_AMOUNT_LENGTH}
                onChange={(e) => {
                  const sanitized = e.target.value.replace(/[^0-9.,]/g, "");
                  setDraftAmount(sanitized);
                  amountRef.current = sanitized;
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
        header: () => <div className={`${ACTIONS_COL} mx-auto text-center`}>Acciones</div>,
        cell: ({ row }) => {
          const r = row.original;
          const isEditing = editingId === r.id && editingField !== null;

          if (isEditing) {
            return (
              <div className={`${ACTIONS_COL} mx-auto flex items-center justify-center gap-2`}>
                <button
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#6B7A3A] text-white shadow hover:opacity-90 disabled:opacity-50"
                  onClick={() => saveEdit(r)}
                  disabled={mUpdate.loading || !selectedFiscalYearId}
                  title="Guardar"
                >
                  <Save className="h-4 w-4" />
                </button>

                <button
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
                  onClick={cancelEdit}
                  disabled={mUpdate.loading}
                  title="Cancelar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          }

          return (
            <div className={`${ACTIONS_COL} mx-auto flex items-center justify-center gap-2`}>
              <button
                type="button"
                onClick={() => startEdit(r, "date")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#6B7A3A] bg-[#F8F9F3] p-2 text-[#6B7A3A] shadow-sm transition-colors hover:bg-[#EAEFE0]"
                title="Editar fecha"
              >
                <CalendarIcon className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => startEdit(r, "amount")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#6B7A3A] bg-[#F8F9F3] p-2 text-[#6B7A3A] shadow-sm transition-colors hover:bg-[#EAEFE0]"
                title="Editar monto"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>
          );
        },
      },
    ],
    [editingId, editingField, draftAmount, draftDate, mUpdate.loading, selectedFiscalYearId]
  );

  if (q.error) return <p className="text-sm text-red-600">{q.error}</p>;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <GenericTable<Row> data={rows} columns={columns} isLoading={q.loading} />

      {!q.loading && rows.length === 0 && subTypeId && (
        <p className="mt-3 text-xs text-gray-500">
          No hay ingresos para este subtipo en el año fiscal seleccionado.
        </p>
      )}

      {!q.loading && rows.length === 0 && !subTypeId && (
        <p className="mt-3 text-xs text-gray-500">
          No hay ingresos aún en el año fiscal seleccionado.
        </p>
      )}

      {mUpdate.error && (
        <p className="mt-3 text-xs text-red-600">{mUpdate.error}</p>
      )}
    </div>
  );
}