import React from "react";
import { X } from "lucide-react";
import type { PersonalPageType } from "../../models/PersonalPageType";
import { usePersonalPdf } from "../../hooks/Personal/usePersonalPageState";
import { useLockBodyScroll } from "@/hooks/modals/useLockBodyScroll";
import { ActionButtons } from "../ActionButtons";

interface PersonalPageInfoModalProps {
  item: PersonalPageType;
  onClose: () => void;
}

function formatDate(dateString?: string | null) {
  if (!dateString || String(dateString).trim() === "") return "—";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return String(dateString);

  return date.toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function InfoField({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#556B2F] mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-[#33361D] break-words">
        {value || "—"}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-4 rounded-full bg-[#5B732E]" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B732E]">
          {title}
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pl-3">
        {children}
      </div>
    </section>
  );
}

export function PersonalPageInfoModal({
  item,
  onClose,
}: PersonalPageInfoModalProps) {
  const { download, isDownloading } = usePersonalPdf();

  useLockBodyScroll(true);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleDownload = async () => {
    const id = Number(
      (item as any).id ?? (item as any).idPersonal ?? (item as any).IdUser
    );

    if (!Number.isFinite(id) || id <= 0) {
      console.error("ID inválido para PDF:", item);
      return;
    }

    await download(id, item.name, item.lastname1);
  };

  const fullName = `${item.name ?? ""} ${item.lastname1 ?? ""} ${item.lastname2 ?? ""}`.trim();
  const isActive = !!(item as any).isActive;

  const personalFields = [
    { label: "Cédula", value: String((item as any).IDE ?? "—") },
    { label: "Nombre completo", value: fullName || "—" },
    { label: "Fecha de nacimiento", value: formatDate((item as any).birthDate) },
    { label: "Teléfono", value: String((item as any).phone ?? "—") },
    { label: "Email", value: String((item as any).email ?? "—") },
    { label: "Dirección", value: String((item as any).direction ?? "—"), wide: true },
  ];

  const laborFields = [
    { label: "Puesto / ocupación", value: String((item as any).occupation ?? "—"), wide: true },
    { label: "Estado", value: isActive ? "Activo" : "Inactivo" },
    { label: "Fecha de inicio laboral", value: formatDate((item as any).startWorkDate) },
  ];

  const exitDate = !isActive ? formatDate((item as any).endWorkDate) : null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#F8F9F3] to-[#EAEFE0] px-6 pt-5 pb-4 border-b border-[#EAEFE0]">

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#EAEFE0] flex items-center justify-center">
                <span className="text-base font-bold text-[#5B732E]">
                  {fullName.charAt(0).toUpperCase()}
                </span>
              </div>

              <div>
                <p className="text-[10px] font-bold text-[#556B2F] uppercase tracking-wider mb-0.5">
                  Personal
                </p>

                <h3 className="text-xl font-bold text-[#33361D] leading-tight">
                  {fullName}
                </h3>

                <p className="text-[11px] text-[#556B2F] mt-0.5">
                  {item.IDE}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                isActive
                  ? "bg-[#E6EDC8] text-[#5A7018]"
                  : "bg-[#F7E9E6] text-[#8C3A33]"
              }`}>
                {isActive ? "Activo" : "Inactivo"}
              </span>

              <button onClick={onClose}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <ActionButtons
              size="sm"
              onDownload={handleDownload}
              showDownload={true}
              isLoading={isDownloading}
              showText={true}
              downloadText={isDownloading ? "Generando..." : "Descargar PDF"}
            />
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-6">
          <Section title="Información Personal">
            {personalFields.map((field, i) => (
              <InfoField
                key={i}
                label={field.label}
                value={field.value}
                wide={(field as any).wide}
              />
            ))}
          </Section>

          <div className="border-t border-[#EAEFE0]" />

          <Section title="Perfil Laboral">
            {laborFields.map((field, i) => (
              <InfoField
                key={i}
                label={field.label}
                value={field.value}
                wide={(field as any).wide}
              />
            ))}

            {!isActive && (
              <InfoField label="Fecha de salida" value={exitDate || "—"} />
            )}
          </Section>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-3 border-t border-[#EAEFE0] bg-[#F8F9F3] flex justify-end">
          <ActionButtons
            onCancel={onClose}
            showCancel={true}
            showText={true}
            size="sm"
            cancelText="Cerrar"
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalPageInfoModal;