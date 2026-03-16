import type { QAEntry } from "./Home&BankBudget";

export const QA_BANK_PRINCIPAL: QAEntry[] = [

  // ── QUÉ ES ESTA PANTALLA ─────────────────────────────────
  {
    keywords: ["qué es esta pantalla", "pantalla principal", "qué veo aquí", "what is this screen", "home screen", "dashboard"],
    answer: {
      es: "🏠 **Panel de Inicio**\n\nEsta es la pantalla principal del sistema. Desde aquí puedes ver de un vistazo:\n\n• **Tarjetas de módulos** — accesos rápidos a Personal, Asociados, Voluntarios, Presupuesto y (solo ADMIN) Contenido Público.\n• **Gráfica de barras** — comparativa de ingresos vs egresos por departamento (últimos 30 días).\n• **Gráfica de pastel** — distribución de ingresos por departamento (últimos 30 días).\n\n💡 Para ir a cualquier módulo, haz clic en el botón **'Gestión'** de la tarjeta correspondiente.",
      en: "🏠 **Home Dashboard**\n\nThis is the main screen of the system. From here you can see at a glance:\n\n• **Module cards** — quick access to Staff, Associates, Volunteers, Budget and (ADMIN only) Public Content.\n• **Bar chart** — comparison of income vs expenses by department (last 30 days).\n• **Pie chart** — distribution of income by department (last 30 days).\n\n💡 To go to any module, click the **'Gestión'** button on the corresponding card.",
    },
  },

  // ── TARJETAS DE MÓDULOS ──────────────────────────────────
  {
    keywords: ["tarjetas módulos", "module cards", "accesos rápidos", "quick access", "botones inicio", "cards dashboard"],
    answer: {
      es: "🗂️ **Tarjetas de Módulos**\n\nEn la parte superior del panel de inicio verás tarjetas para cada módulo:\n\n• **Contenido Público** — editar el sitio web (solo ADMIN).\n• **Personal Activo** — muestra cuántas personas están activas.\n• **Asociados** — muestra el total de asociados. Si hay solicitudes pendientes, aparece el número.\n• **Voluntarios** — igual que asociados, con solicitudes pendientes si las hay.\n• **Presupuesto** — muestra el saldo actual del año fiscal.\n\n💡 Haz clic en **'Gestión'** para ir directamente al módulo.",
      en: "🗂️ **Module Cards**\n\nAt the top of the home dashboard you'll see cards for each module:\n\n• **Contenido Público** — edit the website (ADMIN only).\n• **Personal Activo** — shows how many people are active.\n• **Asociados** — shows total associates. If there are pending requests, the number appears.\n• **Voluntarios** — same as associates, with pending requests if any.\n• **Presupuesto** — shows the current balance for the fiscal year.\n\n💡 Click **'Gestión'** to go directly to the module.",
    },
  },

  // ── SALDO PRESUPUESTO ────────────────────────────────────
  {
    keywords: ["saldo presupuesto", "balance presupuesto", "budget balance", "saldo actual", "cuánto hay en presupuesto", "saldo restante inicio"],
    answer: {
      es: "💰 **Saldo del Presupuesto en el Inicio**\n\nLa tarjeta de **Presupuesto** en el panel de inicio muestra el **saldo restante** del año fiscal activo.\n\nEste saldo se calcula como:\n**Ingresos totales − Egresos totales = Saldo restante**\n\n💡 Para ver el detalle completo (ingresos, egresos, proyecciones), haz clic en **'Gestión'** en la tarjeta de Presupuesto.\n💡 El año fiscal que se usa es el que está marcado como **'activo'** en el sistema.",
      en: "💰 **Budget Balance on Home**\n\nThe **Presupuesto** card on the home dashboard shows the **remaining balance** for the active fiscal year.\n\nThis balance is calculated as:\n**Total income − Total expenses = Remaining balance**\n\n💡 To see the full detail (income, expenses, projections), click **'Gestión'** on the Budget card.\n💡 The fiscal year used is the one marked as **'active'** in the system.",
    },
  },

  // ── SOLICITUDES PENDIENTES EN INICIO ────────────────────
  {
    keywords: ["solicitudes pendientes inicio", "pending requests home", "número solicitudes", "badge solicitudes", "cuántas solicitudes hay"],
    answer: {
      es: "🔔 **Solicitudes Pendientes en el Inicio**\n\nSi hay solicitudes sin atender, las tarjetas de **Asociados** o **Voluntarios** muestran el número de solicitudes pendientes en la descripción.\n\nEjemplo: **'3 solicitudes pendientes'**\n\n💡 Haz clic en **'Gestión'** en esa tarjeta para ir directamente a revisar las solicitudes.\n💡 El número se actualiza automáticamente en segundo plano.",
      en: "🔔 **Pending Requests on Home**\n\nIf there are unattended requests, the **Asociados** or **Voluntarios** cards show the number of pending requests in the description.\n\nExample: **'3 solicitudes pendientes'**\n\n💡 Click **'Gestión'** on that card to go directly to review the requests.\n💡 The number updates automatically in the background.",
    },
  },

  // ── GRÁFICA DE BARRAS ────────────────────────────────────
  {
    keywords: ["gráfica barras", "bar chart", "comparativa departamentos", "ingresos vs egresos gráfica", "chart departments", "gráfico barras"],
    answer: {
      es: "📊 **Gráfica de Barras — Comparativa por Departamento**\n\nEsta gráfica muestra para cada departamento:\n• Barra **verde** = Ingresos de los últimos 30 días.\n• Barra **dorada** = Egresos de los últimos 30 días.\n\nTe permite ver de un vistazo qué departamentos tienen más actividad y cómo se comparan sus ingresos y egresos.\n\n💡 Pasa el cursor sobre una barra para ver el monto exacto en colones.\n💡 Los datos son de los **últimos 30 días** — para rangos distintos, usa los Reportes en el módulo de Presupuesto.",
      en: "📊 **Bar Chart — Department Comparison**\n\nThis chart shows for each department:\n• **Green** bar = Income from the last 30 days.\n• **Gold** bar = Expenses from the last 30 days.\n\nIt lets you see at a glance which departments have the most activity and how their income and expenses compare.\n\n💡 Hover over a bar to see the exact amount in colones.\n💡 Data is from the **last 30 days** — for different ranges, use Reports in the Budget module.",
    },
  },

  // ── GRÁFICA DE PASTEL ────────────────────────────────────
  {
    keywords: ["gráfica pastel", "pie chart", "distribución ingresos", "porcentaje departamentos", "gráfico circular", "income distribution"],
    answer: {
      es: "🥧 **Gráfica de Pastel — Distribución de Ingresos**\n\nEsta gráfica muestra qué porcentaje de los ingresos totales corresponde a cada departamento en los últimos 30 días.\n\nA la derecha del gráfico verás una leyenda con:\n• El **nombre** del departamento.\n• El **porcentaje** que representa.\n• El **monto** en colones (en pantallas grandes).\n\n💡 Pasa el cursor sobre una sección del pastel para ver el detalle.\n💡 Si todos los valores son 0, no hubo ingresos en ese período.",
      en: "🥧 **Pie Chart — Income Distribution**\n\nThis chart shows what percentage of total income corresponds to each department in the last 30 days.\n\nTo the right of the chart you'll see a legend with:\n• The department **name**.\n• The **percentage** it represents.\n• The **amount** in colones (on large screens).\n\n💡 Hover over a pie section to see the detail.\n💡 If all values are 0, there was no income in that period.",
    },
  },

  // ── PERÍODO DE LAS GRÁFICAS ──────────────────────────────
  {
    keywords: ["período gráficas", "últimos 30 días", "rango fechas inicio", "last 30 days", "chart period", "qué período muestran"],
    answer: {
      es: "📅 **¿Qué período muestran las gráficas?**\n\nLas gráficas del panel de inicio muestran siempre los **últimos 30 días** desde hoy.\n\nEjemplo: Si hoy es 15 de marzo, muestran datos del 14 de febrero al 15 de marzo.\n\n💡 Si necesitas ver datos de un período específico (mes, trimestre, año), ve al módulo de **Presupuesto → Reportes** donde puedes filtrar por fechas exactas.",
      en: "📅 **What period do the charts show?**\n\nThe home dashboard charts always show the **last 30 days** from today.\n\nExample: If today is March 15, they show data from February 14 to March 15.\n\n💡 If you need to see data for a specific period (month, quarter, year), go to **Presupuesto → Reportes** where you can filter by exact dates.",
    },
  },

  // ── CONTENIDO PÚBLICO ────────────────────────────────────
  {
    keywords: ["contenido público", "editar sitio web", "public content", "edit website", "web site admin"],
    answer: {
      es: "🌐 **Contenido Público**\n\nLa tarjeta **'Contenido Público'** solo aparece para usuarios con rol **ADMIN**.\n\nDesde ahí puedes ir a editar el contenido del sitio web público de la organización:\n• Página principal\n• Sección 'Acerca de'\n• Servicios\n• FAQs\n• Eventos\n\n💡 Haz clic en **'Editar'** para acceder al módulo de edición.",
      en: "🌐 **Public Content**\n\nThe **'Contenido Público'** card only appears for users with the **ADMIN** role.\n\nFrom there you can edit the public website content of the organization:\n• Main page\n• About us section\n• Services\n• FAQs\n• Events\n\n💡 Click **'Editar'** to access the editing module.",
    },
  },

  // ── PERSONAL ACTIVO ──────────────────────────────────────
  {
    keywords: ["personal activo inicio", "cuántos empleados", "active staff count", "número personal", "staff count home"],
    answer: {
      es: "👥 **Personal Activo**\n\nLa tarjeta de **Personal Activo** en el inicio muestra el número total de empleados con estado **Activo** en el sistema.\n\n💡 Haz clic en **'Gestión'** para ir al módulo de Personal y ver la lista completa, buscar empleados o editar sus datos.",
      en: "👥 **Active Staff**\n\nThe **Personal Activo** card on the home shows the total number of employees with **Active** status in the system.\n\n💡 Click **'Gestión'** to go to the Staff module and see the full list, search for employees or edit their data.",
    },
  },

  // ── NAVEGAR DESDE INICIO ─────────────────────────────────
  {
    keywords: ["cómo navegar desde inicio", "ir a módulo desde inicio", "navigate from home", "go to module home", "botón gestión"],
    answer: {
      es: "🗺️ **Navegar a un Módulo desde el Inicio**\n\nDesde el panel de inicio puedes ir a cualquier módulo directamente:\n\n1. Busca la tarjeta del módulo al que quieres ir.\n2. Haz clic en el botón **'Gestión'** (o **'Editar'** para Contenido Público).\n3. El sistema te lleva directamente a ese módulo.\n\n💡 También puedes usar el menú lateral o superior para navegar.",
      en: "🗺️ **Navigate to a Module from Home**\n\nFrom the home dashboard you can go to any module directly:\n\n1. Find the card for the module you want to go to.\n2. Click the **'Gestión'** button (or **'Editar'** for Public Content).\n3. The system takes you directly to that module.\n\n💡 You can also use the side or top menu to navigate.",
    },
  },
];

// ============================================================
// RELATED_QUESTIONS_PRINCIPAL
// ============================================================
export const RELATED_QUESTIONS_PRINCIPAL: Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
> = {
  graficas: {
    keywords: ["gráfica", "gráfico", "chart", "barras", "pastel", "bar", "pie"],
    es: [
      "¿Qué muestra la gráfica de barras?",
      "¿Qué muestra la gráfica de pastel?",
      "¿Qué período cubren las gráficas?",
      "¿Cómo veo datos de un período diferente?",
    ],
    en: [
      "What does the bar chart show?",
      "What does the pie chart show?",
      "What period do the charts cover?",
      "How do I view data for a different period?",
    ],
  },
  tarjetas: {
    keywords: ["tarjeta", "card", "módulo inicio", "acceso rápido", "module card"],
    es: [
      "¿Qué son las tarjetas de módulos?",
      "¿Cómo voy a un módulo desde el inicio?",
      "¿Por qué no veo la tarjeta de Contenido Público?",
      "¿Qué significa el número en la tarjeta de Asociados?",
    ],
    en: [
      "What are the module cards?",
      "How do I go to a module from home?",
      "Why don't I see the Public Content card?",
      "What does the number on the Associates card mean?",
    ],
  },
  presupuestoInicio: {
    keywords: ["saldo inicio", "balance home", "presupuesto inicio", "fiscal year home"],
    es: [
      "¿Qué significa el saldo en la tarjeta de Presupuesto?",
      "¿Cómo se calcula el saldo del presupuesto?",
      "¿Qué año fiscal usa el saldo del inicio?",
      "¿Dónde veo el detalle completo del presupuesto?",
    ],
    en: [
      "What does the balance on the Budget card mean?",
      "How is the budget balance calculated?",
      "Which fiscal year does the home balance use?",
      "Where do I see the full budget detail?",
    ],
  },
};