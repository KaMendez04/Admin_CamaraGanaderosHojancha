/**
 * Parsea una cadena ISO de solo fecha (YYYY-MM-DD) garantizando que se interprete
 * como la medianoche del día indicado en la zona horaria local, evitando
 * desfases por UTC.
 */
export function parseISOLocal(iso?: string | null): Date | null {
  if (!iso || typeof iso !== "string") return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  
  // new Date(year, monthIndex, day) usa la hora local
  const date = new Date(y, m - 1, d);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Retorna la fecha de hoy en formato 'YYYY-MM-DD' en la zona horaria local.
 */
export function getTodayLocalISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Formatea una fecha ISO (o Date) a lenguaje humano es-CR (ej: "8 de abril de 2026").
 */
export function formatLongDate(dateInput?: string | Date | null): string {
  if (!dateInput) return "—";
  
  const date = typeof dateInput === "string" ? parseISOLocal(dateInput) : dateInput;
  
  if (!date || isNaN(date.getTime())) return String(dateInput || "—");

  return date.toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
