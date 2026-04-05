import type { QAEntry } from "./Home&BankBudget";

// ============================================================
// QA_BANK_MANUALS
// SOLO búsqueda y descarga
// ============================================================
export const QA_BANK_MANUALS: QAEntry[] = [
  {
    keywords: [
      "manuales",
      "manual",
      "módulo manuales",
      "modulo manuales",
      "dónde están los manuales",
      "donde estan los manuales",
      "where are manuals",
      "manuals module",
    ],
    answer: {
      es: "📘 **Módulo de Manuales**\n\nEn esta sección puedes consultar los manuales disponibles del sistema.\n\nAquí únicamente puedes:\n\n1. **Buscar** manuales por nombre.\n2. **Descargar** el manual que necesites.\n\n💡 Los manuales aparecen como tarjetas con el nombre del archivo, su tipo, tamaño, fecha y un botón de descarga.",
      en: "📘 **Manuals Module**\n\nIn this section you can check the system manuals available.\n\nHere you can only:\n\n1. **Search** manuals by name.\n2. **Download** the manual you need.\n\n💡 Manuals appear as cards with the file name, type, size, date, and a download button.",
    },
  },
  {
    keywords: [
      "buscar manual",
      "buscar manuales",
      "encontrar manual",
      "search manual",
      "search manuals",
      "find manual",
    ],
    answer: {
      es: "🔍 **Buscar manuales**\n\nPara buscar un manual:\n\n1. Ve al cuadro de búsqueda que aparece en la parte superior.\n2. Escribe el nombre del manual o una parte del nombre.\n3. La lista se actualiza automáticamente con los resultados.\n\n💡 Si no aparece ningún resultado, el sistema mostrará un mensaje indicando que no se encontraron manuales con ese nombre.",
      en: "🔍 **Search manuals**\n\nTo search for a manual:\n\n1. Go to the search box at the top.\n2. Type the manual name or part of the name.\n3. The list updates automatically with the results.\n\n💡 If nothing matches, the system will show a message saying no manuals were found with that name.",
    },
  },
  {
    keywords: [
      "descargar manual",
      "descargar manuales",
      "download manual",
      "download manuals",
      "bajar manual",
      "bajar archivo",
    ],
    answer: {
      es: "⬇️ **Descargar un manual**\n\nPara descargar un manual:\n\n1. Busca el manual que necesitas.\n2. Ubica su tarjeta en la lista.\n3. Haz clic en el botón **'Descargar'**.\n4. El archivo se descargará en tu dispositivo.\n\n💡 Cada tarjeta muestra información básica del archivo antes de descargarlo.",
      en: "⬇️ **Download a manual**\n\nTo download a manual:\n\n1. Find the manual you need.\n2. Locate its card in the list.\n3. Click the **'Descargar'** button.\n4. The file will be downloaded to your device.\n\n💡 Each card shows basic file information before downloading it.",
    },
  },
  {
    keywords: [
      "no encuentro manual",
      "no aparece manual",
      "no hay resultados manuales",
      "manual no aparece",
      "can't find manual",
      "manual not found",
      "no results manuals",
    ],
    answer: {
      es: "🛠️ **No encuentro un manual**\n\nSi no encuentras el manual que buscas:\n\n1. Revisa que el nombre esté bien escrito.\n2. Prueba con una parte más corta del nombre.\n3. Verifica si el sistema muestra el mensaje **'No se encontraron manuales con ese nombre'**.\n\n💡 Si no aparece ningún manual en toda la sección, puede que todavía no haya documentos cargados.",
      en: "🛠️ **I can't find a manual**\n\nIf you cannot find the manual you are looking for:\n\n1. Check that the name is written correctly.\n2. Try a shorter part of the name.\n3. Verify whether the system shows **'No se encontraron manuales con ese nombre'**.\n\n💡 If no manuals appear at all in the section, there may be no uploaded documents yet.",
    },
  },
];

export const RELATED_QUESTIONS_MANUALS: Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
> = {
  manuales: {
    keywords: ["manual", "manuales", "manuals"],
    es: [
      "¿Cómo busco un manual?",
      "¿Cómo descargo un manual?",
      "¿Qué hago si no encuentro un manual?",
      "¿Qué puedo hacer en la sección de manuales?",
    ],
    en: [
      "How do I search for a manual?",
      "How do I download a manual?",
      "What do I do if I can't find a manual?",
      "What can I do in the manuals section?",
    ],
  },
};