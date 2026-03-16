import type { QAEntry } from "./Home&BankBudget";

export const QA_BANK_LOGS: QAEntry[] = [

  // ── NAVEGACIÓN ───────────────────────────────────────────
  {
    keywords: ["módulo bitácora", "dónde está bitácora", "cómo llego a bitácora", "logs module", "where is logs", "acceder bitácora"],
    answer: {
      es: "📋 **Módulo de Bitácora**\n\nPara llegar a esta sección:\n\n1. Mira el menú en la parte superior de la pantalla.\n2. Haz clic en **'Bitácora'**.\n3. Verás el panel lateral con dos secciones: **Presupuesto** y **Usuarios**.\n\n💡 Esta sección es exclusiva para el rol **ADMIN**. Si no la ves en el menú, tu usuario no tiene acceso.",
      en: "📋 **Logs Module**\n\nTo get to this section:\n\n1. Look at the menu at the top of the screen.\n2. Click on **'Bitácora'**.\n3. You'll see the side panel with two sections: **Presupuesto** and **Usuarios**.\n\n💡 This section is exclusive to the **ADMIN** role. If you don't see it in the menu, your user does not have access.",
    },
  },

  // ── SECCIONES DE BITÁCORA ────────────────────────────────
  {
    keywords: ["secciones bitácora", "tipos bitácora", "presupuesto vs usuarios bitácora", "log sections", "bitácora presupuesto", "bitácora usuarios"],
    answer: {
      es: "🗂️ **Secciones de la Bitácora**\n\nEl módulo tiene dos secciones separadas:\n\n• **Presupuesto** — registra todos los cambios en ingresos, egresos, proyecciones y movimientos extraordinarios.\n• **Usuarios** — registra acciones sobre cuentas de usuario: creaciones, ediciones, activaciones, cambios de contraseña, etc.\n\nUsa el menú lateral izquierdo para cambiar entre una y otra.",
      en: "🗂️ **Log Sections**\n\nThe module has two separate sections:\n\n• **Presupuesto** — records all changes to income, expenses, projections and extraordinary movements.\n• **Usuarios** — records actions on user accounts: creations, edits, activations, password changes, etc.\n\nUse the left side menu to switch between them.",
    },
  },

  // ── VER LISTA DE REGISTROS ───────────────────────────────
  {
    keywords: ["ver registros bitácora", "lista bitácora", "tabla bitácora", "view logs", "registros sistema"],
    answer: {
      es: "📋 **Ver Registros de la Bitácora**\n\nLa tabla de registros muestra las siguientes columnas:\n\n• **Fecha** — cuándo ocurrió el cambio.\n• **Usuario** — quién realizó la acción (nombre y correo).\n• **Módulo** — sección del sistema afectada.\n• **Entidad** — tipo de dato modificado (ingreso, egreso, etc.).\n• **Acción** — tipo de cambio (Creación, Actualización, Eliminación, etc.).\n• **Descripción** — resumen automático del cambio.\n• **Detalle** — ícono para ver información completa del registro.\n\n💡 Abajo de la tabla verás cuántos resultados se encontraron.",
      en: "📋 **View Log Records**\n\nThe records table shows the following columns:\n\n• **Fecha** — when the change occurred.\n• **Usuario** — who performed the action (name and email).\n• **Módulo** — system section affected.\n• **Entidad** — type of data modified (income, expense, etc.).\n• **Acción** — type of change (Creation, Update, Deletion, etc.).\n• **Descripción** — automatic summary of the change.\n• **Detalle** — icon to view complete record information.\n\n💡 Below the table you'll see how many results were found.",
    },
  },

  // ── VER DETALLE DE UN REGISTRO ───────────────────────────
  {
    keywords: ["ver detalle bitácora", "abrir registro bitácora", "detalle log", "view log detail", "información completa bitácora"],
    answer: {
      es: "🔍 **Ver el Detalle de un Registro**\n\n1. En la tabla, ubica el registro que quieres revisar.\n2. Haz clic en el ícono del **ojo** 👁️ en la columna **Detalle**.\n3. Se abre una ventana con:\n   • **Información general** — fecha, usuario, módulo, acción, descripción.\n   • **Cambios detectados** — valores anteriores y nuevos (monto, fecha, nombre, etc.).\n   • **Snapshot anterior** — estado del dato antes del cambio.\n   • **Snapshot nuevo** — estado del dato después del cambio.\n\n💡 Los campos resaltados en amarillo indican los valores que cambiaron.",
      en: "🔍 **View a Record's Detail**\n\n1. In the table, find the record you want to review.\n2. Click the **eye icon** 👁️ in the **Detalle** column.\n3. A window opens with:\n   • **Información general** — date, user, module, action, description.\n   • **Cambios detectados** — previous and new values (amount, date, name, etc.).\n   • **Snapshot anterior** — state of the data before the change.\n   • **Snapshot nuevo** — state of the data after the change.\n\n💡 Fields highlighted in yellow indicate values that changed.",
    },
  },

  // ── SNAPSHOTS ────────────────────────────────────────────
  {
    keywords: ["snapshot bitácora", "qué es snapshot", "antes después bitácora", "valor anterior nuevo", "snapshot anterior nuevo"],
    answer: {
      es: "📸 **Snapshots (Antes y Después)**\n\nDentro del detalle de cada registro encontrarás dos tarjetas:\n\n• **Snapshot anterior** — cómo estaba el dato *antes* del cambio.\n• **Snapshot nuevo** — cómo quedó el dato *después* del cambio.\n\nCada campo aparece en su propia tarjeta. Los campos que **cambiaron** se resaltan en color amarillo para que los identifiques fácilmente.\n\n💡 Si el registro fue una **creación**, el snapshot anterior estará vacío.",
      en: "📸 **Snapshots (Before and After)**\n\nInside each record's detail you'll find two cards:\n\n• **Snapshot anterior** — how the data looked *before* the change.\n• **Snapshot nuevo** — how the data looks *after* the change.\n\nEach field appears in its own card. Fields that **changed** are highlighted in yellow so you can identify them easily.\n\n💡 If the record was a **creation**, the previous snapshot will be empty.",
    },
  },

  // ── BUSCAR EN BITÁCORA ───────────────────────────────────
  {
    keywords: ["buscar bitácora", "buscar registro", "search logs", "filtrar bitácora", "buscar por usuario bitácora"],
    answer: {
      es: "🔍 **Buscar en la Bitácora**\n\n1. En la sección de Bitácora, ubica el panel de **Filtros** en la parte superior.\n2. Escribe en el campo **Buscar** el término que necesitas:\n   • Nombre o correo del usuario.\n   • Descripción del cambio.\n   • Tipo de entidad o acción.\n3. La tabla se actualiza automáticamente con los resultados.\n\n💡 Puedes combinar la búsqueda de texto con los demás filtros (módulo, acción, entidad, fechas) para resultados más precisos.",
      en: "🔍 **Search in Logs**\n\n1. In the Logs section, find the **Filters** panel at the top.\n2. Type in the **Buscar** field what you need:\n   • Username or email.\n   • Change description.\n   • Entity or action type.\n3. The table updates automatically with the results.\n\n💡 You can combine text search with the other filters (module, action, entity, dates) for more precise results.",
    },
  },

  // ── FILTROS BITÁCORA PRESUPUESTO ─────────────────────────
  {
    keywords: ["filtros bitácora presupuesto", "filtrar por módulo", "filtrar por entidad", "filtrar por acción bitácora", "budget log filters"],
    answer: {
      es: "🎛️ **Filtros de Bitácora de Presupuesto**\n\nEl panel de filtros tiene las siguientes opciones:\n\n• **Buscar** — texto libre (usuario, descripción, entidad, acción).\n• **Módulo** — filtra por sección: Presupuesto real, Proyectado, Extraordinarios o Usuarios.\n• **Acción** — tipo de cambio: Creación, Actualización, Eliminación, Asignación, etc.\n• **Entidad** — dato modificado: Ingreso real, Egreso real, Ingreso proyectado, etc.\n• **Desde / Hasta** — rango de fechas.\n\nHaz clic en **Limpiar filtros** para resetear todo.",
      en: "🎛️ **Budget Log Filters**\n\nThe filter panel has the following options:\n\n• **Buscar** — free text (user, description, entity, action).\n• **Módulo** — filter by section: Real budget, Projected, Extraordinary or Users.\n• **Acción** — type of change: Creation, Update, Deletion, Allocation, etc.\n• **Entidad** — modified data: Real income, Real expense, Projected income, etc.\n• **Desde / Hasta** — date range.\n\nClick **Limpiar filtros** to reset everything.",
    },
  },

  // ── FILTROS BITÁCORA USUARIOS ────────────────────────────
  {
    keywords: ["filtros bitácora usuarios", "filtrar logs usuarios", "user log filters", "buscar cambios usuario"],
    answer: {
      es: "🎛️ **Filtros de Bitácora de Usuarios**\n\nEn la sección **Usuarios** de la bitácora, los filtros disponibles son:\n\n• **Buscar** — texto libre: nombre del actor, usuario afectado, descripción.\n• **Acción** — tipo de evento: Creación, Actualización, Activación, Desactivación, Cambio de contraseña, Solicitud/Confirmación de cambio de correo.\n• **Desde / Hasta** — rango de fechas.\n\nHaz clic en **Limpiar filtros** para resetear todo.",
      en: "🎛️ **User Log Filters**\n\nIn the **Usuarios** section of the logs, the available filters are:\n\n• **Buscar** — free text: actor name, affected user, description.\n• **Acción** — event type: Creation, Update, Activation, Deactivation, Password change, Email change request/confirmation.\n• **Desde / Hasta** — date range.\n\nClick **Limpiar filtros** to reset everything.",
    },
  },

  // ── ACCIONES DISPONIBLES ─────────────────────────────────
  {
    keywords: ["tipos de acción bitácora", "qué es creación bitácora", "qué es actualización bitácora", "qué es eliminación bitácora", "action types logs", "asignación bitácora"],
    answer: {
      es: "🏷️ **Tipos de Acción en la Bitácora**\n\nCada registro muestra una etiqueta de color indicando el tipo de cambio:\n\n• 🟢 **Creación** — se agregó un nuevo dato al sistema.\n• 🔵 **Actualización** — se modificó un dato existente.\n• 🔴 **Eliminación** — se eliminó un dato del sistema.\n• 🟡 **Asignación** — se asignó un monto a una partida.\n• 🟠 **Asignación a ingreso** — un extraordinario fue asignado a un ingreso.\n• **Activación / Desactivación** — cambio de estado de un usuario.\n• **Cambio de contraseña** — usuario cambió su contraseña.",
      en: "🏷️ **Action Types in Logs**\n\nEach record shows a color label indicating the type of change:\n\n• 🟢 **Creación** — a new record was added to the system.\n• 🔵 **Actualización** — an existing record was modified.\n• 🔴 **Eliminación** — a record was deleted from the system.\n• 🟡 **Asignación** — an amount was allocated to a budget line.\n• 🟠 **Asignación a ingreso** — an extraordinary was assigned to an income.\n• **Activación / Desactivación** — a user's status changed.\n• **Cambio de contraseña** — a user changed their password.",
    },
  },

  // ── BITÁCORA DE USUARIOS (COLUMNAS) ─────────────────────
  {
    keywords: ["columnas bitácora usuarios", "realizado por", "usuario afectado", "actor bitácora", "target user log"],
    answer: {
      es: "👤 **Bitácora de Usuarios — Columnas**\n\nLa tabla de bitácora de usuarios muestra:\n\n• **Fecha** — cuándo ocurrió el evento.\n• **Realizado por** — usuario que ejecutó la acción (nombre y correo).\n• **Usuario afectado** — cuenta sobre la que se hizo el cambio (nombre y correo).\n• **Acción** — tipo de evento (creación, activación, cambio de contraseña, etc.).\n• **Descripción** — resumen automático de los cambios detectados.\n• **Detalle** — ícono 👁️ para ver la información completa.",
      en: "👤 **User Logs — Columns**\n\nThe user logs table shows:\n\n• **Fecha** — when the event occurred.\n• **Realizado por** — user who performed the action (name and email).\n• **Usuario afectado** — account on which the change was made (name and email).\n• **Acción** — event type (creation, activation, password change, etc.).\n• **Descripción** — automatic summary of detected changes.\n• **Detalle** — 👁️ icon to view complete information.",
    },
  },

  // ── FILTRAR POR FECHA ────────────────────────────────────
  {
    keywords: ["filtrar por fecha bitácora", "rango fechas bitácora", "desde hasta bitácora", "date range logs", "buscar por fecha bitácora"],
    answer: {
      es: "📅 **Filtrar por Fecha en la Bitácora**\n\n1. En el panel de **Filtros**, ubica los campos **Desde** y **Hasta**.\n2. Haz clic en **Desde** y selecciona la fecha de inicio del rango.\n3. Haz clic en **Hasta** y selecciona la fecha de fin del rango.\n4. La tabla se actualiza automáticamente mostrando solo los registros dentro de ese período.\n\n💡 Puedes usar solo **Desde** o solo **Hasta** para filtrar desde una fecha en adelante o hasta una fecha específica.",
      en: "📅 **Filter by Date in Logs**\n\n1. In the **Filters** panel, find the **Desde** and **Hasta** fields.\n2. Click **Desde** and select the start date of the range.\n3. Click **Hasta** and select the end date of the range.\n4. The table updates automatically showing only records within that period.\n\n💡 You can use only **Desde** or only **Hasta** to filter from a date forward or up to a specific date.",
    },
  },

  // ── PAGINACIÓN ───────────────────────────────────────────
  {
    keywords: ["página bitácora", "siguiente página bitácora", "paginación bitácora", "navegar tabla bitácora", "más registros bitácora"],
    answer: {
      es: "📄 **Navegar entre Páginas de la Bitácora**\n\n1. Busca los botones de paginación **debajo de la tabla**.\n2. Haz clic en la flecha **→** para ir a la siguiente página.\n3. Haz clic en la flecha **←** para regresar.\n4. El texto **'Página X de Y'** indica en qué página estás.\n\n💡 Cada página muestra hasta **8 registros**. Si buscas algo específico, usa los filtros para reducir los resultados.",
      en: "📄 **Navigating Log Pages**\n\n1. Look for the pagination buttons **below the table**.\n2. Click the **→** arrow to go to the next page.\n3. Click the **←** arrow to go back.\n4. The text **'Página X de Y'** shows which page you're on.\n\n💡 Each page shows up to **8 records**. If you're looking for something specific, use the filters to narrow down the results.",
    },
  },

  // ── LIMPIAR FILTROS ──────────────────────────────────────
  {
    keywords: ["limpiar filtros bitácora", "resetear filtros bitácora", "quitar filtros bitácora", "clear filters logs"],
    answer: {
      es: "🧹 **Limpiar Filtros de la Bitácora**\n\n1. En el panel de **Filtros**, busca el botón **'Limpiar filtros'** (esquina inferior derecha del panel).\n2. Haz clic en él.\n3. Todos los filtros se resetean: búsqueda, módulo, entidad, acción y fechas vuelven a sus valores predeterminados.\n4. La tabla mostrará todos los registros disponibles nuevamente.",
      en: "🧹 **Clear Log Filters**\n\n1. In the **Filters** panel, find the **'Limpiar filtros'** button (bottom right of the panel).\n2. Click it.\n3. All filters reset: search, module, entity, action and dates return to their default values.\n4. The table will show all available records again.",
    },
  },

  // ── ROLES / ACCESO ───────────────────────────────────────
  {
    keywords: ["acceso bitácora", "quién puede ver bitácora", "rol bitácora", "permisos bitácora", "junta bitácora", "log access"],
    answer: {
      es: "🔐 **Acceso a la Bitácora**\n\n• **ADMIN** — acceso completo a ambas secciones: Presupuesto y Usuarios.\n• **JUNTA** — acceso **solo** a la sección de **Presupuesto**. No puede ver la bitácora de Usuarios.\n• Otros roles — no tienen acceso al módulo de Bitácora.\n\nLa bitácora es de **solo lectura**: nadie puede editar ni eliminar registros desde esta sección.",
      en: "🔐 **Log Access**\n\n• **ADMIN** — full access to both sections: Presupuesto and Usuarios.\n• **JUNTA** — access **only** to the **Presupuesto** section. Cannot view the Users log.\n• Other roles — no access to the Logs module.\n\nThe log is **read-only**: no one can edit or delete records from this section.",
    },
  },

  // ── QUÉ SE REGISTRA ──────────────────────────────────────
  {
    keywords: ["qué registra bitácora", "qué guarda bitácora", "cambios registrados", "what does log track", "log qué captura"],
    answer: {
      es: "📝 **¿Qué registra la Bitácora?**\n\nEl sistema guarda automáticamente un registro cada vez que:\n\n**Presupuesto:**\n• Se crea, edita o elimina un ingreso o egreso real.\n• Se crea, edita o elimina una proyección de ingreso o egreso.\n• Se registra o asigna un movimiento extraordinario.\n\n**Usuarios:**\n• Se crea, edita, activa o desactiva un usuario.\n• Se cambia la contraseña de un usuario.\n• Se solicita o confirma un cambio de correo electrónico.\n\n💡 No es necesario hacer nada — el sistema lo registra solo.",
      en: "📝 **What does the Log track?**\n\nThe system automatically saves a record every time:\n\n**Budget:**\n• A real income or expense is created, edited or deleted.\n• A projected income or expense is created, edited or deleted.\n• An extraordinary movement is recorded or assigned.\n\n**Users:**\n• A user is created, edited, activated or deactivated.\n• A user's password is changed.\n• An email change is requested or confirmed.\n\n💡 No action needed — the system records it automatically.",
    },
  },
];

// ============================================================
// RELATED_QUESTIONS_LOGS
// ============================================================
export const RELATED_QUESTIONS_LOGS: Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
> = {
  navegacionLogs: {
    keywords: ["bitácora", "logs", "módulo", "sección", "acceder"],
    es: [
      "¿Cuántas secciones tiene la bitácora?",
      "¿Quién puede acceder a la bitácora?",
      "¿Qué registra la bitácora automáticamente?",
      "¿Cómo llego al módulo de bitácora?",
    ],
    en: [
      "How many sections does the log have?",
      "Who can access the logs?",
      "What does the log track automatically?",
      "How do I get to the logs module?",
    ],
  },
  filtroBusquedaLogs: {
    keywords: ["filtrar", "buscar", "fecha", "módulo filtro", "acción filtro", "entidad filtro"],
    es: [
      "¿Cómo filtro por módulo en la bitácora?",
      "¿Cómo filtro por rango de fechas?",
      "¿Cómo busco un registro específico?",
      "¿Cómo limpio los filtros de la bitácora?",
    ],
    en: [
      "How do I filter by module in the logs?",
      "How do I filter by date range?",
      "How do I search for a specific record?",
      "How do I clear log filters?",
    ],
  },
  detalleLogs: {
    keywords: ["detalle", "snapshot", "antes", "después", "cambio", "valor anterior", "valor nuevo"],
    es: [
      "¿Cómo veo el detalle de un registro?",
      "¿Qué son los snapshots en la bitácora?",
      "¿Qué significa el campo resaltado en amarillo?",
      "¿Qué información muestra la sección de cambios detectados?",
    ],
    en: [
      "How do I view a record's detail?",
      "What are snapshots in the logs?",
      "What does a field highlighted in yellow mean?",
      "What information does the detected changes section show?",
    ],
  },
  accionesLogs: {
    keywords: ["acción", "creación", "actualización", "eliminación", "asignación", "activación", "contraseña"],
    es: [
      "¿Qué tipos de acción registra la bitácora?",
      "¿Qué significa la acción 'Asignación a ingreso'?",
      "¿Cómo filtro por tipo de acción?",
      "¿Qué diferencia hay entre Activación y Creación de usuario?",
    ],
    en: [
      "What action types does the log record?",
      "What does the 'Asignación a ingreso' action mean?",
      "How do I filter by action type?",
      "What is the difference between user Activation and Creation?",
    ],
  },
  permisosLogs: {
    keywords: ["rol bitácora", "admin logs", "junta logs", "permiso bitácora", "acceso usuarios log"],
    es: [
      "¿Puede el rol JUNTA ver la bitácora de usuarios?",
      "¿Qué puede hacer el rol ADMIN en la bitácora?",
      "¿Se pueden eliminar registros de la bitácora?",
      "¿Por qué no veo la sección de Usuarios en la bitácora?",
    ],
    en: [
      "Can the JUNTA role see the users log?",
      "What can the ADMIN role do in the logs?",
      "Can log records be deleted?",
      "Why don't I see the Users section in the logs?",
    ],
  },
};