// ============================================================
// BANCO DE PREGUNTAS Y RESPUESTAS — Sistema de Presupuesto
// Agrega, edita o elimina entradas según necesites.
// ============================================================

import { QA_BANK_ASSOCIATES, RELATED_QUESTIONS_ASSOCIATES } from "./BankAssociates";
import { QA_BANK_MEDIA, RELATED_QUESTIONS_MEDIA } from "./BankMedia";
import { QA_BANK_PRINCIPAL, RELATED_QUESTIONS_PRINCIPAL } from "./BankPrincipal";
import { QA_BANK_STAFF, RELATED_QUESTIONS_STAFF } from "./BankStaff";
import { QA_BANK_VOLUNTEERS, RELATED_QUESTIONS_VOLUNTEERS } from "./BankVolunteers";

export type Lang = "es" | "en";

export interface QAEntry {
  keywords: string[];
  answer: { es: string; en: string };
}

export const QA_BANK: QAEntry[] = [
  // ── INICIO / BIENVENIDA ──────────────────────────────────
  {
    keywords: ["hola", "buenos días", "buenas tardes", "hi", "hello", "hey", "ayuda", "help"],
    answer: {
      es: "👋 ¡Hola! Soy el asistente del Sistema de Presupuesto. Puedo ayudarte con:\n\n• Registrar ingresos o egresos\n• Proyecciones (ingresos y egresos)\n• Movimientos extraordinarios\n• Catálogos\n• Reportes y filtros\n• Año fiscal\n\n¿Sobre qué necesitas ayuda?",
      en: "👋 Hello! I'm the Budget System assistant. I can help you with:\n\n• Recording income or expenses\n• Projections (income and expenses)\n• Extraordinary movements\n• Catalogs\n• Reports and filters\n• Fiscal year\n\nWhat do you need help with?",
    },
  },

  // ── AÑO FISCAL ──────────────────────────────────────────
  {
    keywords: ["año fiscal", "fiscal year", "año activo", "active year", "crear año", "nuevo año", "cerrar año", "close year"],
    answer: {
      es: "📅 **Año Fiscal**\n\nPara gestionar el año fiscal:\n\n1. Busca el botón que dice **'Año: [número]'** en la parte superior de la pantalla.\n2. Haz clic en él — se abre un pequeño panel.\n3. Desde ese panel puedes:\n   • **Cambiar** el año activo usando el selector.\n   • **Cerrar** el año actual (botón rojo 'Cerrar').\n   • **Crear** el siguiente año (botón verde 'Nuevo XXXX').\n\n💡 El año con '(activo)' es el que se usa para todos los registros.",
      en: "📅 **Fiscal Year**\n\nTo manage the fiscal year:\n\n1. Find the button that says **'Año: [number]'** at the top of the screen.\n2. Click it — a small panel opens.\n3. From that panel you can:\n   • **Switch** the active year using the selector.\n   • **Close** the current year (red 'Cerrar' button).\n   • **Create** the next year (green 'Nuevo XXXX' button).\n\n💡 The year marked '(activo)' is the one used for all records.",
    },
  },

  // ── INGRESOS — REGISTRAR ─────────────────────────────────
  {
    keywords: ["registrar ingreso", "agregar ingreso", "nuevo ingreso", "add income", "register income", "create income", "ingresar ingreso"],
    answer: {
      es: "💰 **Registrar un Ingreso**\n\nSigue estos pasos:\n\n1. Ve al menú **Ingresos**.\n2. Selecciona el **Departamento** de la lista.\n3. Selecciona el **Tipo** de ingreso.\n4. Selecciona el **Subtipo**.\n5. Elige la **Fecha** en el calendario.\n6. Escribe el **Monto** (ejemplo: `70 000,90`).\n7. Haz clic en **'Registrar Ingreso'** (botón verde).\n\n✅ Si todo está correcto, el ingreso aparece en la lista de abajo.",
      en: "💰 **Register Income**\n\nFollow these steps:\n\n1. Go to the **Income** menu.\n2. Select the **Department** from the list.\n3. Select the **Type** of income.\n4. Select the **Subtype**.\n5. Choose the **Date** on the calendar.\n6. Enter the **Amount** (example: `70 000,90`).\n7. Click **'Registrar Ingreso'** (green button).\n\n✅ If everything is correct, the income appears in the list below.",
    },
  },

  // ── INGRESOS — EDITAR ────────────────────────────────────
  {
    keywords: ["editar ingreso", "modificar ingreso", "cambiar ingreso", "edit income", "update income", "corregir ingreso"],
    answer: {
      es: "✏️ **Editar un Ingreso**\n\n1. En la lista de ingresos, busca el registro que quieres cambiar.\n2. Haz clic en el ícono de **lápiz** ✏️ al lado derecho.\n3. Cambia el **monto** o la **fecha** según necesites.\n4. Haz clic en **'Guardar'** para confirmar.\n5. Si te equivocaste, haz clic en **'Cancelar'**.\n\n💡 También puedes presionar **Enter** para guardar o **Escape** para cancelar.",
      en: "✏️ **Edit Income**\n\n1. In the income list, find the record you want to change.\n2. Click the **pencil icon** ✏️ on the right side.\n3. Change the **amount** or **date** as needed.\n4. Click **'Guardar'** to confirm.\n5. If you made a mistake, click **'Cancelar'**.\n\n💡 You can also press **Enter** to save or **Escape** to cancel.",
    },
  },

  // ── EGRESOS — REGISTRAR ──────────────────────────────────
  {
    keywords: ["registrar egreso", "agregar egreso", "nuevo egreso", "gasto", "add expense", "register expense", "create expense", "spend"],
    answer: {
      es: "💸 **Registrar un Egreso**\n\nSigue estos pasos:\n\n1. Ve al menú **Egresos**.\n2. Selecciona el **Departamento**.\n3. Selecciona el **Tipo** de egreso.\n4. Selecciona el **Subtipo**.\n5. Elige la **Fecha**.\n6. Escribe el **Monto** (ejemplo: `15 000,00`).\n7. Haz clic en **'Registrar egreso'**.\n\n⚠️ Nota: la fecha no puede ser anterior a hoy.",
      en: "💸 **Register Expense**\n\nFollow these steps:\n\n1. Go to the **Expenses** menu.\n2. Select the **Department**.\n3. Select the **Type** of expense.\n4. Select the **Subtype**.\n5. Choose the **Date**.\n6. Enter the **Amount** (example: `15 000,00`).\n7. Click **'Registrar egreso'**.\n\n⚠️ Note: the date cannot be earlier than today.",
    },
  },

  // ── EGRESOS — EDITAR ─────────────────────────────────────
  {
    keywords: ["editar egreso", "modificar egreso", "cambiar egreso", "edit expense", "update expense"],
    answer: {
      es: "✏️ **Editar un Egreso**\n\n1. En la lista de egresos, encuentra el registro.\n2. Clic en el ícono de **lápiz** ✏️.\n3. Cambia el **monto** o la **fecha**.\n4. Clic en **'Guardar'**.\n\n💡 Presiona **Escape** si quieres cancelar sin guardar cambios.",
      en: "✏️ **Edit Expense**\n\n1. In the expenses list, find the record.\n2. Click the **pencil icon** ✏️.\n3. Change the **amount** or **date**.\n4. Click **'Guardar'**.\n\n💡 Press **Escape** if you want to cancel without saving.",
    },
  },

  // ── PROYECCIÓN INGRESOS ──────────────────────────────────
  {
    keywords: ["proyección ingreso", "proyeccion ingreso", "income projection", "projected income", "presupuesto ingreso"],
    answer: {
      es: "📊 **Proyección de Ingresos**\n\nAquí registras los ingresos que *esperas* recibir:\n\n1. Ve al menú **Proyección de Ingresos**.\n2. Selecciona **Departamento → Tipo → Subtipo**.\n3. Escribe el **Monto** estimado.\n4. Clic en **'Registrar proyección de ingreso'**.\n\n💡 No necesitas fecha aquí — es solo una estimación.\n\nLuego en los **Reportes** puedes comparar lo proyectado vs lo real.",
      en: "📊 **Income Projection**\n\nHere you record the income you *expect* to receive:\n\n1. Go to the **Income Projection** menu.\n2. Select **Department → Type → Subtype**.\n3. Enter the estimated **Amount**.\n4. Click **'Registrar proyección de ingreso'**.\n\n💡 No date needed here — it's just an estimate.\n\nLater in **Reports** you can compare projected vs actual.",
    },
  },

  // ── PROYECCIÓN EGRESOS ───────────────────────────────────
  {
    keywords: ["proyección egreso", "proyeccion egreso", "expense projection", "projected expense", "presupuesto egreso", "proyección gasto"],
    answer: {
      es: "📊 **Proyección de Egresos**\n\nAquí registras los gastos que *planeas* hacer:\n\n1. Ve al menú **Proyección de Egresos**.\n2. Selecciona **Departamento → Tipo → Subtipo**.\n3. Escribe el **Monto** estimado.\n4. Clic en **'Registrar proyección'**.\n\n💡 Compara proyectado vs real en la sección de **Reportes**.",
      en: "📊 **Expense Projection**\n\nHere you record the expenses you *plan* to make:\n\n1. Go to the **Expense Projection** menu.\n2. Select **Department → Type → Subtype**.\n3. Enter the estimated **Amount**.\n4. Click **'Registrar proyección'**.\n\n💡 Compare projected vs actual in the **Reports** section.",
    },
  },

  // ── EXTRAORDINARIOS — CREAR ──────────────────────────────
  {
    keywords: ["extraordinario", "extraordinary", "movimiento especial", "donación", "rifa", "ingreso especial", "crear extraordinario"],
    answer: {
      es: "⭐ **Movimientos Extraordinarios**\n\nSon ingresos especiales (donaciones, rifas, etc.) que no son regulares.\n\n**Crear un extraordinario:**\n1. Ve al menú **Extraordinarios**.\n2. Escribe el **Nombre** (ej: 'Donación Anónima').\n3. Elige la **Fecha** (opcional — si no eliges, usa la fecha de hoy).\n4. Escribe el **Monto**.\n5. Clic en **'Registrar Movimiento Extraordinario'**.",
      en: "⭐ **Extraordinary Movements**\n\nThese are special income (donations, raffles, etc.) that are not regular.\n\n**Create an extraordinary:**\n1. Go to the **Extraordinary** menu.\n2. Enter the **Name** (e.g.: 'Anonymous Donation').\n3. Choose the **Date** (optional — if not chosen, uses today).\n4. Enter the **Amount**.\n5. Click **'Registrar Movimiento Extraordinario'**.",
    },
  },

  // ── EXTRAORDINARIOS — ASIGNAR ────────────────────────────
  {
    keywords: ["asignar extraordinario", "assign extraordinary", "usar extraordinario", "use extraordinary", "saldo extraordinario"],
    answer: {
      es: "⭐ **Asignar Extraordinario a un Ingreso**\n\nCuando quieres usar parte del saldo de un extraordinario:\n\n1. En la página de Extraordinarios, busca la sección **'Asignar extraordinario a ingreso'**.\n2. Elige el **Movimiento Extraordinario** (se muestra el saldo disponible).\n3. Escribe el **Monto** a asignar (no puede superar el saldo).\n4. Elige el **Departamento**.\n5. Escribe el **Subtipo** (razón, ej: 'Donación benéfica').\n6. Elige la **Fecha** (opcional).\n7. Clic en **'Asignar a Ingreso'**.",
      en: "⭐ **Assign Extraordinary to Income**\n\nWhen you want to use part of an extraordinary's balance:\n\n1. On the Extraordinary page, find the **'Asignar extraordinario a ingreso'** section.\n2. Choose the **Extraordinary Movement** (available balance is shown).\n3. Enter the **Amount** to assign (cannot exceed the balance).\n4. Choose the **Department**.\n5. Enter the **Subtype** (reason, e.g.: 'Charitable donation').\n6. Choose the **Date** (optional).\n7. Click **'Asignar a Ingreso'**.",
    },
  },

  // ── CATÁLOGO ─────────────────────────────────────────────
  {
    keywords: ["catálogo", "catalogo", "catalog", "tipo", "subtipo", "agregar tipo", "nuevo tipo", "departamento", "department"],
    answer: {
      es: "📂 **Catálogos (Tipos y Subtipos)**\n\nEl catálogo organiza los ingresos y egresos en categorías.\n\n**Para agregar un tipo o subtipo nuevo:**\n1. En la página de Ingresos (o Egresos), haz clic en el botón **'+'** (esquina superior derecha).\n2. Se abre un formulario — llena los campos.\n3. Clic en **Guardar**.\n\n**Para editar el catálogo:**\n1. En la misma página, busca la sección **'Editar Catálogo'**.\n2. Haz clic en la flecha ▼ para abrirla.\n3. Aquí puedes modificar los tipos y subtipos existentes.",
      en: "📂 **Catalogs (Types and Subtypes)**\n\nThe catalog organizes income and expenses into categories.\n\n**To add a new type or subtype:**\n1. On the Income (or Expenses) page, click the **'+'** button (top right corner).\n2. A form opens — fill in the fields.\n3. Click **Save**.\n\n**To edit the catalog:**\n1. On the same page, find the **'Editar Catálogo'** section.\n2. Click the ▼ arrow to open it.\n3. Here you can modify existing types and subtypes.",
    },
  },

  // ── REPORTES ─────────────────────────────────────────────
  {
    keywords: ["reporte", "report", "informe", "exportar", "export", "pdf", "excel", "descargar", "download", "ver pdf"],
    answer: {
      es: "📈 **Reportes**\n\nPuedes generar reportes de ingresos, egresos, proyecciones y extraordinarios.\n\n**Cómo usar los reportes:**\n1. Ve al menú **Reportes** — hay 5 pestañas (Ingresos, Egresos, etc.).\n2. Usa los **filtros** (fechas, departamento, tipo, subtipo) para acotar los datos.\n3. Los resultados aparecen automáticamente en la tabla.\n4. Para exportar:\n   • **Ver PDF** — abre una vista previa.\n   • **Descargar PDF** — descarga el archivo.\n   • **Descargar Excel** — descarga la hoja de cálculo.",
      en: "📈 **Reports**\n\nYou can generate reports for income, expenses, projections, and extraordinary movements.\n\n**How to use reports:**\n1. Go to the **Reports** menu — there are 5 tabs (Income, Expenses, etc.).\n2. Use the **filters** (dates, department, type, subtype) to narrow down data.\n3. Results appear automatically in the table.\n4. To export:\n   • **Ver PDF** — opens a preview.\n   • **Descargar PDF** — downloads the file.\n   • **Descargar Excel** — downloads the spreadsheet.",
    },
  },

  // ── FILTROS ──────────────────────────────────────────────
  {
    keywords: ["filtro", "filter", "buscar", "search", "fecha", "date", "desde", "hasta", "desde hasta"],
    answer: {
      es: "🔍 **Usar Filtros en Reportes**\n\nLos filtros te ayudan a ver solo la información que necesitas:\n\n• **Fecha inicio / Fecha fin** — selecciona el rango de fechas en el calendario.\n• **Departamento** — elige un departamento específico o deja en blanco para ver todos.\n• **Tipo** — primero debes elegir departamento.\n• **Subtipo** — primero debes elegir tipo.\n\n💡 Los resultados se actualizan automáticamente al cambiar los filtros — no necesitas presionar ningún botón adicional.",
      en: "🔍 **Using Filters in Reports**\n\nFilters help you see only the information you need:\n\n• **Start date / End date** — select the date range on the calendar.\n• **Department** — choose a specific department or leave blank for all.\n• **Type** — you must first choose a department.\n• **Subtype** — you must first choose a type.\n\n💡 Results update automatically when you change filters — no extra button needed.",
    },
  },

  // ── PÁGINA INICIAL / DASHBOARD ───────────────────────────
  {
    keywords: ["inicio", "dashboard", "resumen", "summary", "saldo", "balance", "pantalla principal", "home", "initial"],
    answer: {
      es: "🏠 **Pantalla de Inicio (Resumen)**\n\nLa pantalla de inicio muestra el resumen financiero del año activo:\n\n• **Total de Egresos** — cuánto se ha gastado.\n• **Total de Ingresos** — cuánto ha entrado.\n• **Saldo Restante** — la diferencia (ingresos menos egresos).\n\nTambién hay dos tablas que comparan:\n• **Ingresos**: reales vs proyectados por departamento.\n• **Egresos**: reales vs proyectados por departamento.\n\n💡 Puedes cambiar el año fiscal desde el selector en la esquina superior derecha.",
      en: "🏠 **Home Screen (Summary)**\n\nThe home screen shows the financial summary for the active year:\n\n• **Total Expenses** — how much has been spent.\n• **Total Income** — how much has come in.\n• **Remaining Balance** — the difference (income minus expenses).\n\nThere are also two tables comparing:\n• **Income**: actual vs projected by department.\n• **Expenses**: actual vs projected by department.\n\n💡 You can change the fiscal year from the selector in the top right corner.",
    },
  },

  // ── MONTO / FORMATO ──────────────────────────────────────
  {
    keywords: ["monto", "amount", "cómo escribir", "how to write", "formato", "format", "colones", "₡", "crc", "número", "number"],
    answer: {
      es: "🔢 **Cómo escribir montos**\n\nEl sistema usa el formato de Costa Rica (colones):\n\n✅ **Correcto:**\n• `70 000,90` (espacio como separador de miles, coma para decimales)\n• `1 500 000,00`\n• `500`\n\n❌ **Incorrecto:**\n• `70.000,90` (no uses punto para miles)\n• `70000.90` (no uses punto para decimales)\n\n💡 El símbolo ₡ lo agrega el sistema automáticamente — tú solo escribe el número.",
      en: "🔢 **How to enter amounts**\n\nThe system uses the Costa Rican format (colones):\n\n✅ **Correct:**\n• `70 000,90` (space as thousands separator, comma for decimals)\n• `1 500 000,00`\n• `500`\n\n❌ **Incorrect:**\n• `70.000,90` (don't use dot for thousands)\n• `70000.90` (don't use dot for decimals)\n\n💡 The ₡ symbol is added automatically — just type the number.",
    },
  },

  // ── COMPUTADORA BÁSICO ───────────────────────────────────
  {
    keywords: ["clic", "click", "hacer clic", "how to click", "mouse", "botón", "button", "qué hago", "what do i do", "no sé", "i don't know", "no entiendo", "don't understand"],
    answer: {
      es: "🖱️ **Cómo usar el sistema paso a paso**\n\nSi eres nuevo usando computadora, sigue estas guías:\n\n**Hacer clic:** Mueve el cursor (flecha en pantalla) hasta el botón y presiona el botón izquierdo del ratón una vez.\n\n**Llenar un campo:** Haz clic dentro del recuadro blanco y escribe con el teclado.\n\n**Seleccionar de una lista:** Haz clic en el recuadro con una flecha ▼ y luego clic en la opción que quieres.\n\n**Guardar:** Siempre busca el botón verde al final del formulario.\n\n¿Qué parte específica te genera dificultad?",
      en: "🖱️ **How to use the system step by step**\n\nIf you're new to computers, follow these guides:\n\n**Clicking:** Move the cursor (arrow on screen) to the button and press the left mouse button once.\n\n**Filling a field:** Click inside the white box and type with the keyboard.\n\n**Selecting from a list:** Click the box with an arrow ▼ and then click the option you want.\n\n**Saving:** Always look for the green button at the bottom of the form.\n\nWhat specific part is difficult for you?",
    },
  },

  // ── ERROR / PROBLEMA ─────────────────────────────────────
  {
    keywords: ["error", "problema", "problem", "no funciona", "not working", "falla", "fail", "equivoqué", "mistake", "no puedo", "can't", "cannot"],
    answer: {
      es: "🛠️ **Tienes un problema**\n\nAquí algunos errores comunes y cómo resolverlos:\n\n• **'Monto inválido'** — revisa el formato (usa coma, no punto: `5 000,00`).\n• **'Seleccione el departamento'** — debes elegir departamento antes de continuar.\n• **'Saldo insuficiente'** — el monto que ingresaste supera el saldo disponible del extraordinario.\n• **Botón gris / desactivado** — significa que falta llenar algún campo obligatorio.\n• **La lista está vacía** — verifica que el año fiscal activo sea el correcto.\n\nSi el problema persiste, describe qué paso estabas haciendo y te ayudo.",
      en: "🛠️ **You have a problem**\n\nHere are some common errors and how to fix them:\n\n• **'Monto inválido'** — check the format (use comma, not dot: `5 000,00`).\n• **'Seleccione el departamento'** — you must choose a department before continuing.\n• **'Saldo insuficiente'** — the amount you entered exceeds the available balance.\n• **Gray / disabled button** — means a required field is still empty.\n• **List is empty** — verify that the active fiscal year is correct.\n\nIf the problem persists, describe what step you were on and I'll help.",
    },
  },

  // ── GRACIAS / DESPEDIDA ──────────────────────────────────
  {
    keywords: ["gracias", "thank you", "thanks", "listo", "done", "perfecto", "perfect", "excelente", "excellent", "entendí", "understood", "adiós", "goodbye", "bye"],
    answer: {
      es: "😊 ¡De nada! Si tienes más preguntas no dudes en consultarme. ¡Que tengas un excelente día!",
      en: "😊 You're welcome! If you have more questions, don't hesitate to ask. Have a great day!",
    },
  },
];

export const RELATED_QUESTIONS: Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
> = {
  ingresos: {
    keywords: ["ingreso", "ingresos", "registrar ingreso", "income"],
    es: [
      "¿Cómo registro un ingreso?",
      "¿Cómo edito un ingreso ya creado?",
      "¿Qué campos necesito para guardar un ingreso?",
      "¿Cómo filtro ingresos por fecha?"
    ],
    en: [
      "How do I register income?",
      "How do I edit an existing income entry?",
      "What fields do I need to save an income entry?",
      "How do I filter income by date?"
    ],
  },
  egresos: {
    keywords: ["egreso", "egresos", "gasto", "gastos", "expense", "expenses"],
    es: [
      "¿Cómo registro un egreso?",
      "¿Cómo edito un egreso ya creado?",
      "¿Cómo filtro egresos por fecha?",
      "¿Qué diferencia hay entre egresos reales y proyectados?"
    ],
    en: [
      "How do I register an expense?",
      "How do I edit an existing expense entry?",
      "How do I filter expenses by date?",
      "What is the difference between real and projected expenses?"
    ],
  },
  reportes: {
    keywords: ["reporte", "reportes", "pdf", "excel", "exportar", "filtro", "filters", "reports"],
    es: [
      "¿Cómo veo los reportes?",
      "¿Cómo exporto un reporte en PDF?",
      "¿Cómo exporto un reporte en Excel?",
      "¿Qué filtros puedo usar en reportes?"
    ],
    en: [
      "How do I view reports?",
      "How do I export a report to PDF?",
      "How do I export a report to Excel?",
      "What filters can I use in reports?"
    ],
  },
  proyecciones: {
    keywords: ["proyección", "proyeccion", "proyecciones", "projected", "projection"],
    es: [
      "¿Qué es una proyección de ingresos?",
      "¿Qué es una proyección de egresos?",
      "¿Cuál es la diferencia entre real y proyectado?",
      "¿Cómo registro una proyección?"
    ],
    en: [
      "What is an income projection?",
      "What is an expense projection?",
      "What is the difference between real and projected values?",
      "How do I register a projection?"
    ],
  },
  fiscal: {
    keywords: ["año fiscal", "fiscal", "periodo", "período", "year"],
    es: [
      "¿Qué es el año fiscal?",
      "¿Cómo cambio el año fiscal activo?",
      "¿Cómo afecta el año fiscal a los reportes?",
      "¿Qué pasa si registro datos en otro año fiscal?"
    ],
    en: [
      "What is the fiscal year?",
      "How do I change the active fiscal year?",
      "How does the fiscal year affect reports?",
      "What happens if I save data in another fiscal year?"
    ],
  },
  extraordinarios: {
    keywords: ["extraordinario", "extraordinarios", "donación", "donacion", "rifa"],
    es: [
      "¿Qué son los extraordinarios?",
      "¿Cómo registro un extraordinario?",
      "¿Cómo asigno saldo de extraordinarios a ingresos?",
      "¿Cómo veo el saldo disponible de extraordinarios?"
    ],
    en: [
      "What are extraordinary entries?",
      "How do I register an extraordinary entry?",
      "How do I assign extraordinary balance to income?",
      "How do I see the available extraordinary balance?"
    ],
  },
};

export type ChatbotModuleKey =
  | "general"
  | "budget"
  | "volunteers"
  | "associates"
  | "media"
  | "staff"
  | "settings"
  | "edition"
  | "logs";

type ModuleUI = {
  title: string;
  subtitle: string;
  online: string;
  typing: string;
  placeholder: string;
  suggestions: string;
  error: string;
  welcome: string;
};

type RelatedQuestionsMap = Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
>;

export interface ChatbotContextConfig {
  key: ChatbotModuleKey;
  routePrefixes: string[];
  ui: Record<Lang, ModuleUI>;
  suggestions: Record<Lang, string[]>;
  qaBank: QAEntry[];
  relatedQuestions: RelatedQuestionsMap;
  aiContext: Record<Lang, string>;
}

function buildUI(params: {
  esSubtitle: string;
  enSubtitle: string;
  esWelcome: string;
  enWelcome: string;
}): Record<Lang, ModuleUI> {
  return {
    es: {
      title: "Asistente",
      subtitle: params.esSubtitle,
      online: "En línea",
      typing: "Escribiendo",
      placeholder: "Escribe tu pregunta…",
      suggestions: "Preguntas frecuentes",
      error: "Ocurrió un error. Intenta de nuevo.",
      welcome: params.esWelcome,
    },
    en: {
      title: "Assistant",
      subtitle: params.enSubtitle,
      online: "Online",
      typing: "Typing",
      placeholder: "Type your question…",
      suggestions: "Frequently asked questions",
      error: "An error occurred. Please try again.",
      welcome: params.enWelcome,
    },
  };
}

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const GENERAL_CONTEXT: ChatbotContextConfig = {
  key: "general",
  routePrefixes: [],
  ui: buildUI({
    esSubtitle: "Sistema Administrativo",
    enSubtitle: "Administrative System",
    esWelcome:
      "Hola, soy tu asistente del sistema.\nPuedo ayudarte según el módulo donde te encuentres.",
    enWelcome:
      "Hello, I'm your system assistant.\nI can help you depending on the module you are using.",
  }),
  suggestions: {
    es: [
      "¿Dónde estoy dentro del sistema?",
      "¿Cómo uso este módulo?",
      "¿Qué puedo hacer aquí?",
      "¿Cómo encuentro una opción?",
    ],
    en: [
      "Where am I in the system?",
      "How do I use this module?",
      "What can I do here?",
      "How do I find an option?",
    ],
  },
  qaBank: QA_BANK_PRINCIPAL,
  relatedQuestions: RELATED_QUESTIONS_PRINCIPAL,
  aiContext: {
    es: "El usuario está en una sección general del sistema administrativo.",
    en: "The user is in a general section of the administrative system.",
  },
};
export const QA_BANK_EDITION: QAEntry[] = [
  {
    keywords: [
      "edicion",
      "edición",
      "pagina informativa",
      "página informativa",
      "editar contenido",
      "edit page",
      "edit content",
      "contenido publico",
      "contenido público",
    ],
    answer: {
      es: "📝 **Edición de la página informativa**\n\nDesde este módulo puedes actualizar el contenido que verá el público en la página web.\n\nNormalmente aquí puedes:\n\n1. Editar títulos, textos o descripciones.\n2. Cambiar tarjetas, bloques o secciones.\n3. Guardar los cambios.\n4. Revisar que la información quede correcta antes de publicarla.\n\n💡 La información que puedes editar depende de la sección en la que estés, por ejemplo: Principal, Sobre Nosotros, Servicios, Voluntarios, Asociados, Eventos o FAQ.",
      en: "📝 **Informative page edition**\n\nIn this module you can update the content shown to the public website.\n\nHere you can usually:\n\n1. Edit titles, texts, or descriptions.\n2. Change cards, blocks, or sections.\n3. Save the changes.\n4. Review the information before publishing it.\n\n💡 What you can edit depends on the current section, for example: Home, About Us, Services, Volunteers, Associates, Events, or FAQ.",
    },
  },
  {
    keywords: [
      "guardar cambios",
      "guardar",
      "save changes",
      "save",
      "actualizar contenido",
      "update content",
      "publicar",
      "publish",
    ],
    answer: {
      es: "💾 **Guardar cambios**\n\nPara guardar correctamente:\n\n1. Revisa los campos obligatorios.\n2. Confirma que los textos e imágenes estén correctos.\n3. Haz clic en **Guardar** o **Actualizar**.\n4. Espera el mensaje de confirmación.\n\n⚠️ Si el botón está desactivado, normalmente falta completar algún campo o corregir un valor.",
      en: "💾 **Save changes**\n\nTo save correctly:\n\n1. Review the required fields.\n2. Confirm that texts and images are correct.\n3. Click **Save** or **Update**.\n4. Wait for the confirmation message.\n\n⚠️ If the button is disabled, a required field is usually missing or a value must be corrected.",
    },
  },
  {
    keywords: [
      "faq",
      "preguntas frecuentes",
      "editar faq",
      "editar preguntas",
      "frequently asked questions",
    ],
    answer: {
      es: "❓ **Editar preguntas frecuentes**\n\nEn la sección de FAQ normalmente puedes:\n\n1. Agregar una nueva pregunta.\n2. Editar una pregunta existente.\n3. Cambiar la respuesta.\n4. Guardar los cambios.\n\n💡 Procura que las preguntas sean cortas y las respuestas claras para que el usuario las entienda rápido.",
      en: "❓ **Edit frequently asked questions**\n\nIn the FAQ section you can usually:\n\n1. Add a new question.\n2. Edit an existing question.\n3. Change the answer.\n4. Save the changes.\n\n💡 Try to keep questions short and answers clear so users understand them quickly.",
    },
  },
  {
    keywords: [
      "imagen",
      "imagenes",
      "imágenes",
      "banner",
      "portada",
      "subir imagen",
      "cambiar imagen",
      "media",
      "resource",
      "image",
    ],
    answer: {
      es: "🖼️ **Imágenes y recursos visuales**\n\nSi la sección permite trabajar con imágenes:\n\n1. Selecciona o sube el recurso visual.\n2. Verifica que sea el correcto.\n3. Guarda los cambios de la sección.\n\n💡 Si la imagen se administra desde el módulo de Media, primero debes cargarla allí y luego seleccionarla en la página de edición.",
      en: "🖼️ **Images and visual resources**\n\nIf the section supports images:\n\n1. Select or upload the visual resource.\n2. Verify it is the correct one.\n3. Save the section changes.\n\n💡 If the image is managed from the Media module, upload it there first and then select it in the edition page.",
    },
  },
];

export const RELATED_QUESTIONS_EDITION: Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
> = {
  contenido: {
    keywords: ["edicion", "edición", "contenido", "pagina", "página", "edit", "content"],
    es: [
      "¿Qué puedo editar en esta sección?",
      "¿Cómo guardo los cambios?",
      "¿Cómo actualizo el contenido público?",
      "¿Cómo sé si los cambios se guardaron?",
    ],
    en: [
      "What can I edit in this section?",
      "How do I save the changes?",
      "How do I update the public content?",
      "How do I know the changes were saved?",
    ],
  },
  faq: {
    keywords: ["faq", "preguntas frecuentes", "question", "pregunta"],
    es: [
      "¿Cómo edito una pregunta frecuente?",
      "¿Cómo agrego una nueva pregunta?",
      "¿Cómo cambio la respuesta de una FAQ?",
      "¿Cómo guardo los cambios en FAQ?",
    ],
    en: [
      "How do I edit a frequently asked question?",
      "How do I add a new question?",
      "How do I change an FAQ answer?",
      "How do I save FAQ changes?",
    ],
  },
  imagenes: {
    keywords: ["imagen", "imagenes", "imágenes", "banner", "portada", "image", "media"],
    es: [
      "¿Cómo cambio una imagen de la sección?",
      "¿Debo subir primero la imagen en Media?",
      "¿Cómo actualizo un banner?",
      "¿Cómo guardo una imagen nueva?",
    ],
    en: [
      "How do I change a section image?",
      "Do I need to upload the image in Media first?",
      "How do I update a banner?",
      "How do I save a new image?",
    ],
  },
};

export const QA_BANK_LOGS: QAEntry[] = [
  {
    keywords: [
      "bitacora",
      "bitácora",
      "logs",
      "log",
      "historial",
      "registro",
      "registros",
      "activity log",
    ],
    answer: {
      es: "📘 **Bitácora del sistema**\n\nLa bitácora te ayuda a ver el historial de acciones realizadas dentro del sistema.\n\nAquí normalmente puedes:\n\n1. Revisar qué cambios se hicieron.\n2. Ver quién realizó una acción.\n3. Consultar cuándo ocurrió.\n4. Filtrar información para encontrar un registro específico.\n\n💡 La bitácora sirve como historial de control y seguimiento.",
      en: "📘 **System log**\n\nThe log helps you review the history of actions performed in the system.\n\nHere you can usually:\n\n1. Review what changes were made.\n2. See who performed an action.\n3. Check when it happened.\n4. Filter information to find a specific record.\n\n💡 The log works as a control and tracking history.",
    },
  },
  {
    keywords: [
      "budget logs",
      "bitacora presupuesto",
      "bitácora presupuesto",
      "logs presupuesto",
      "presupuesto",
      "movimientos presupuesto",
    ],
    answer: {
      es: "💰 **Bitácora de presupuesto**\n\nEn esta sección puedes revisar acciones relacionadas con el módulo de presupuesto, por ejemplo:\n\n• Cambios en ingresos o egresos.\n• Ajustes en proyecciones.\n• Registros extraordinarios.\n• Otras acciones administrativas del presupuesto.\n\n💡 Es útil para auditar cambios y entender qué movimiento se hizo dentro del módulo.",
      en: "💰 **Budget logs**\n\nIn this section you can review actions related to the budget module, for example:\n\n• Changes in income or expenses.\n• Projection updates.\n• Extraordinary entries.\n• Other budget-related administrative actions.\n\n💡 It is useful for auditing changes and understanding what action was performed in the module.",
    },
  },
  {
    keywords: [
      "users log",
      "user logs",
      "bitacora usuarios",
      "bitácora usuarios",
      "usuarios",
      "actividad de usuarios",
      "acciones de usuarios",
    ],
    answer: {
      es: "👤 **Bitácora de usuarios**\n\nAquí puedes revisar acciones relacionadas con usuarios del sistema, por ejemplo:\n\n• Cambios de cuenta.\n• Gestión de usuarios.\n• Accesos o modificaciones administrativas.\n\n💡 Esta vista te ayuda a dar seguimiento a actividades importantes realizadas por usuarios dentro del sistema.",
      en: "👤 **User logs**\n\nHere you can review actions related to system users, for example:\n\n• Account changes.\n• User management actions.\n• Administrative access or updates.\n\n💡 This view helps you track important activities performed by users in the system.",
    },
  },
  {
    keywords: [
      "filtrar bitacora",
      "buscar registro",
      "search log",
      "filter log",
      "filtrar logs",
      "fecha",
      "usuario",
      "accion",
      "acción",
    ],
    answer: {
      es: "🔎 **Buscar en la bitácora**\n\nPara encontrar un registro específico:\n\n1. Revisa si la vista tiene filtros disponibles.\n2. Filtra por fecha, usuario o tipo de acción, si aplica.\n3. Observa la tabla o lista de resultados.\n4. Busca el evento que necesitas revisar.\n\n💡 Entre más específicos sean los filtros, más fácil será encontrar el registro correcto.",
      en: "🔎 **Search in the log**\n\nTo find a specific record:\n\n1. Check whether the view has available filters.\n2. Filter by date, user, or action type when possible.\n3. Review the results table or list.\n4. Find the event you need to inspect.\n\n💡 The more specific your filters are, the easier it is to find the correct record.",
    },
  },
];

export const RELATED_QUESTIONS_LOGS: Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
> = {
  general: {
    keywords: ["bitacora", "bitácora", "logs", "historial", "registro"],
    es: [
      "¿Qué muestra la bitácora?",
      "¿Para qué sirve la bitácora?",
      "¿Cómo reviso el historial del sistema?",
      "¿Cómo busco un registro específico?",
    ],
    en: [
      "What does the log show?",
      "What is the log used for?",
      "How do I review the system history?",
      "How do I search for a specific record?",
    ],
  },
  presupuesto: {
    keywords: ["presupuesto", "budget", "budget logs"],
    es: [
      "¿Qué veo en la bitácora de presupuesto?",
      "¿Cómo reviso cambios de presupuesto?",
      "¿Cómo identifico un movimiento en presupuesto?",
      "¿Cómo filtro registros de presupuesto?",
    ],
    en: [
      "What can I see in budget logs?",
      "How do I review budget changes?",
      "How do I identify a budget action?",
      "How do I filter budget records?",
    ],
  },
  usuarios: {
    keywords: ["usuarios", "users", "user logs", "users log"],
    es: [
      "¿Qué muestra la bitácora de usuarios?",
      "¿Cómo reviso acciones de usuarios?",
      "¿Cómo identifico quién hizo un cambio?",
      "¿Cómo busco actividad de una cuenta?",
    ],
    en: [
      "What does the user log show?",
      "How do I review user actions?",
      "How do I identify who made a change?",
      "How do I search account activity?",
    ],
  },
};

const CHATBOT_CONTEXTS: ChatbotContextConfig[] = [
  {
    key: "budget",
    routePrefixes: ["/budget"],
    ui: buildUI({
      esSubtitle: "Sistema de Presupuesto",
      enSubtitle: "Budget System",
      esWelcome:
        "Hola, soy tu asistente del Sistema de Presupuesto.\n¿En qué puedo ayudarte hoy?",
      enWelcome:
        "Hello, I'm your Budget System assistant.\nHow can I help you today?",
    }),
    suggestions: {
      es: [
        "¿Cómo registro un ingreso?",
        "¿Cómo registro un egreso?",
        "¿Cómo veo los reportes?",
        "¿Qué es el año fiscal?",
      ],
      en: [
        "How do I register income?",
        "How do I register an expense?",
        "How do I see reports?",
        "What is the fiscal year?",
      ],
    },
    qaBank: QA_BANK,
    relatedQuestions: RELATED_QUESTIONS,
    aiContext: {
      es: "El usuario está en el módulo de Presupuestos. Responde sobre ingresos, egresos, proyecciones, extraordinarios, catálogos, reportes, filtros y año fiscal.",
      en: "The user is in the Budget module. Answer about income, expenses, projections, extraordinary entries, catalogs, reports, filters, and fiscal year.",
    },
  },
  {
    key: "volunteers",
    routePrefixes: ["/volunteers"],
    ui: buildUI({
      esSubtitle: "Módulo de Voluntarios",
      enSubtitle: "Volunteers Module",
      esWelcome:
        "Hola, soy tu asistente del módulo de Voluntarios.\nPuedo ayudarte con solicitudes, aprobaciones y consultas del área.",
      enWelcome:
        "Hello, I'm your Volunteers module assistant.\nI can help you with requests, approvals, and area-related questions.",
    }),
    suggestions: {
      es: [
        "¿Cómo reviso solicitudes de voluntarios?",
        "¿Cómo apruebo un voluntario?",
        "¿Cómo veo voluntarios aprobados?",
        "¿Cómo busco un voluntario?",
      ],
      en: [
        "How do I review volunteer requests?",
        "How do I approve a volunteer?",
        "How do I see approved volunteers?",
        "How do I search for a volunteer?",
      ],
    },
    qaBank: QA_BANK_VOLUNTEERS,
    relatedQuestions: RELATED_QUESTIONS_VOLUNTEERS,
    aiContext: {
      es: "El usuario está en el módulo de Voluntarios. Responde en el contexto de solicitudes, aprobaciones, búsquedas, estados y gestión de voluntarios.",
      en: "The user is in the Volunteers module. Answer in the context of volunteer requests, approvals, searches, statuses, and management.",
    },
  },
  {
    key: "associates",
    routePrefixes: ["/associates"],
    ui: buildUI({
      esSubtitle: "Módulo de Asociados",
      enSubtitle: "Associates Module",
      esWelcome:
        "Hola, soy tu asistente del módulo de Asociados.\nPuedo ayudarte con solicitudes, aprobaciones y consultas del área.",
      enWelcome:
        "Hello, I'm your Associates module assistant.\nI can help you with requests, approvals, and area-related questions.",
    }),
    suggestions: {
      es: [
        "¿Cómo reviso solicitudes de asociados?",
        "¿Cómo apruebo un asociado?",
        "¿Cómo veo asociados aprobados?",
        "¿Cómo busco un asociado?",
      ],
      en: [
        "How do I review associate requests?",
        "How do I approve an associate?",
        "How do I see approved associates?",
        "How do I search for an associate?",
      ],
    },
    qaBank: QA_BANK_ASSOCIATES,
    relatedQuestions: RELATED_QUESTIONS_ASSOCIATES,
    aiContext: {
      es: "El usuario está en el módulo de Asociados. Responde en el contexto de solicitudes, aprobaciones, búsquedas, estados y gestión de asociados.",
      en: "The user is in the Associates module. Answer in the context of associate requests, approvals, searches, statuses, and management.",
    },
  },
  {
    key: "media",
    routePrefixes: ["/media"],
    ui: buildUI({
      esSubtitle: "Módulo de Media",
      enSubtitle: "Media Module",
      esWelcome:
        "Hola, soy tu asistente del módulo de Media.\nPuedo ayudarte con archivos, imágenes y videos.",
      enWelcome:
        "Hello, I'm your Media module assistant.\nI can help you with files, images, and videos.",
    }),
    suggestions: {
      es: [
        "¿Cómo subo un archivo?",
        "¿Cómo veo imágenes o videos?",
        "¿Cómo elimino un recurso?",
        "¿Cómo busco un archivo?",
      ],
      en: [
        "How do I upload a file?",
        "How do I view images or videos?",
        "How do I delete a resource?",
        "How do I search for a file?",
      ],
    },
    qaBank: QA_BANK_MEDIA,
    relatedQuestions: RELATED_QUESTIONS_MEDIA,
    aiContext: {
      es: "El usuario está en el módulo de Media. Responde en el contexto de gestión de archivos, imágenes, videos, carga, visualización y eliminación.",
      en: "The user is in the Media module. Answer in the context of file, image, video, upload, preview, and deletion management.",
    },
  },
  {
    key: "staff",
    routePrefixes: ["/staff"],
    ui: buildUI({
      esSubtitle: "Módulo de Personal",
      enSubtitle: "Staff Module",
      esWelcome:
        "Hola, soy tu asistente del módulo de Personal.\nPuedo ayudarte con registros y gestión del personal.",
      enWelcome:
        "Hello, I'm your Staff module assistant.\nI can help you with staff records and management.",
    }),
    suggestions: {
      es: [
        "¿Cómo veo el personal registrado?",
        "¿Cómo creo un registro de personal?",
        "¿Cómo edito datos del personal?",
        "¿Cómo busco un registro?",
      ],
      en: [
        "How do I view registered staff?",
        "How do I create a staff record?",
        "How do I edit staff data?",
        "How do I search for a record?",
      ],
    },
    qaBank: QA_BANK_STAFF,
    relatedQuestions: RELATED_QUESTIONS_STAFF,
    aiContext: {
      es: "El usuario está en el módulo de Personal. Responde en el contexto de registros, edición, búsqueda y gestión del personal.",
      en: "The user is in the Staff module. Answer in the context of records, editing, searching, and staff management.",
    },
  },
  {
    key: "settings",
    routePrefixes: ["/settings"],
    ui: buildUI({
      esSubtitle: "Configuración",
      enSubtitle: "Settings",
      esWelcome:
        "Hola, soy tu asistente de Configuración.\nPuedo ayudarte con cuenta, usuarios y opciones del sistema.",
      enWelcome:
        "Hello, I'm your Settings assistant.\nI can help you with account, users, and system options.",
    }),
    suggestions: {
      es: [
        "¿Cómo cambio mis datos de cuenta?",
        "¿Cómo cambio mi contraseña?",
        "¿Cómo gestiono usuarios?",
        "¿Qué puedo hacer en configuración?",
      ],
      en: [
        "How do I update my account data?",
        "How do I change my password?",
        "How do I manage users?",
        "What can I do in settings?",
      ],
    },
    qaBank: [],
    relatedQuestions: {},
    aiContext: {
      es: "El usuario está en Configuración. Responde en el contexto de cuenta, contraseña, usuarios y ajustes del sistema.",
      en: "The user is in Settings. Answer in the context of account, password, users, and system settings.",
    },
  },
    {
    key: "edition",
    routePrefixes: ["/edition"],
    ui: buildUI({
      esSubtitle: "Edición de Página Informativa",
      enSubtitle: "Informative Page Edition",
      esWelcome:
        "Hola, soy tu asistente de Edición.\nPuedo ayudarte a actualizar el contenido de la página informativa.",
      enWelcome:
        "Hello, I'm your Edition assistant.\nI can help you update the informative page content.",
    }),
    suggestions: {
      es: [
        "¿Qué puedo editar aquí?",
        "¿Cómo guardo los cambios?",
        "¿Cómo edito las preguntas frecuentes?",
        "¿Cómo cambio una imagen?",
      ],
      en: [
        "What can I edit here?",
        "How do I save changes?",
        "How do I edit FAQ entries?",
        "How do I change an image?",
      ],
    },
    qaBank: QA_BANK_EDITION,
    relatedQuestions: RELATED_QUESTIONS_EDITION,
    aiContext: {
      es: "El usuario está en el módulo de Edición de la página informativa. Responde sobre edición de contenido público, textos, imágenes, FAQ, secciones como principal, about, servicios, voluntarios, asociados y eventos, y guardado de cambios.",
      en: "The user is in the informative page Edition module. Answer about public content editing, texts, images, FAQ, sections such as home, about, services, volunteers, associates, and events, and saving changes.",
    },
  },
  {
    key: "logs",
    routePrefixes: ["/logs"],
    ui: buildUI({
      esSubtitle: "Bitácora del Sistema",
      enSubtitle: "System Logs",
      esWelcome:
        "Hola, soy tu asistente de Bitácora.\nPuedo ayudarte a entender los registros y movimientos del sistema.",
      enWelcome:
        "Hello, I'm your Logs assistant.\nI can help you understand the system records and activity history.",
    }),
    suggestions: {
      es: [
        "¿Qué muestra la bitácora?",
        "¿Cómo veo la bitácora de presupuesto?",
        "¿Cómo veo la bitácora de usuarios?",
        "¿Cómo filtro registros?",
      ],
      en: [
        "What does the log show?",
        "How do I view budget logs?",
        "How do I view user logs?",
        "How do I filter records?",
      ],
    },
    qaBank: QA_BANK_LOGS,
    relatedQuestions: RELATED_QUESTIONS_LOGS,
    aiContext: {
      es: "El usuario está en la Bitácora del sistema. Responde sobre historial de acciones, registros del sistema, bitácora de presupuesto, bitácora de usuarios y filtros para revisar actividad.",
      en: "The user is in the system Logs module. Answer about action history, system records, budget logs, user logs, and filters to review activity.",
    },
  },
];

export function getChatbotContext(pathname: string): ChatbotContextConfig {
  const cleanPath = (pathname || "").toLowerCase();

  return (
    CHATBOT_CONTEXTS.find((context) =>
      context.routePrefixes.some(
        (prefix) =>
          cleanPath === prefix.toLowerCase() ||
          cleanPath.startsWith(`${prefix.toLowerCase()}/`)
      )
    ) ?? GENERAL_CONTEXT
  );
}

export function findAnswer(
  input: string,
  lang: Lang,
  pathname: string
): string | null {
  const lower = normalizeText(input);
  const { qaBank } = getChatbotContext(pathname);

  for (const entry of qaBank) {
    const match = entry.keywords.some((kw) =>
      lower.includes(normalizeText(kw))
    );
    if (match) return entry.answer[lang];
  }

  return null;
}

export function getRelatedQuestions(
  input: string,
  lang: Lang,
  pathname: string
): string[] {
  const text = normalizeText(input);
  const { relatedQuestions } = getChatbotContext(pathname);

  const topic = Object.values(relatedQuestions).find((item) =>
    item.keywords.some((keyword) => text.includes(normalizeText(keyword)))
  );

  return topic ? topic[lang] : [];
}