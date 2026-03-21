export function getCostaRicaFileStamp() {
  const parts = new Intl.DateTimeFormat("es-CR", {
    timeZone: "America/Costa_Rica",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const map = Object.fromEntries(
    parts
      .filter((p) => p.type !== "literal")
      .map((p) => [p.type, p.value])
  );

  return `${map.year}-${map.month}-${map.day}_${map.hour}-${map.minute}-${map.second}`;
}