
import type { QAEntry } from "./Home&BankBudget";

// ============================================================
export const QA_BANK_ASSOCIATES: QAEntry[] = [

  // ── NAVEGACIÓN ───────────────────────────────────────────
  {
    keywords: ["dónde están los asociados", "cómo llego a asociados", "módulo asociados", "sección asociados", "where are associates", "how to get to associates"],
    answer: {
      es: "👥 **Módulo de Asociados**\n\nPara llegar a esta sección:\n\n1. Mira el menú en la parte superior de la pantalla.\n2. Haz clic en **'Asociados'**.\n3. Verás dos secciones:\n   • **Solicitudes Pendientes** — personas que quieren ser asociadas.\n   • **Asociados Aprobados** — personas que ya son asociadas.\n\n💡 La pestaña subrayada en verde indica cuál sección estás viendo.",
      en: "👥 **Associates Module**\n\nTo get to this section:\n\n1. Look at the menu at the top of the screen.\n2. Click on **'Asociados'**.\n3. You will see two sections:\n   • **Solicitudes Pendientes** — people who want to become associates.\n   • **Asociados Aprobados** — people who are already associates.\n\n💡 The tab underlined in green shows which section you're viewing.",
    },
  },

  // ── SOLICITUDES — VER LISTA ──────────────────────────────
  {
    keywords: ["solicitudes pendientes", "lista solicitudes", "ver solicitudes", "solicitud nueva", "pending requests", "view requests"],
    answer: {
      es: "📋 **Ver Solicitudes Pendientes**\n\nAquí aparecen las personas que han pedido ser asociadas:\n\n1. Ve a **Asociados → Solicitudes Pendientes**.\n2. Verás una tabla con: cédula, nombre, teléfono, email, estado y fecha.\n3. Puedes **filtrar** por estado usando los botones de arriba.\n4. Puedes **buscar** por nombre o cédula en el cuadro de búsqueda.\n\n💡 Las solicitudes en amarillo están pendientes de revisión.",
      en: "📋 **View Pending Requests**\n\nHere you see people who have applied to become associates:\n\n1. Go to **Asociados → Solicitudes Pendientes**.\n2. You'll see a table with: ID, name, phone, email, status and date.\n3. You can **filter** by status using the buttons at the top.\n4. You can **search** by name or ID in the search box.\n\n💡 Requests shown in yellow are pending review.",
    },
  },

  // ── SOLICITUDES — VER DETALLE ────────────────────────────
  {
    keywords: ["ver detalle solicitud", "abrir solicitud", "información solicitud", "detalles solicitud", "view request detail", "open request"],
    answer: {
      es: "🔍 **Ver el Detalle de una Solicitud**\n\n1. En la tabla de solicitudes, busca la persona.\n2. Haz clic en el ícono del **ojo** 👁️ en la columna de Acciones.\n3. Se abre una ventana con:\n   • **Información General** — datos personales, teléfono, dirección.\n   • **Finca** — datos de la finca (si tiene).\n4. Desde ahí puedes **descargar el PDF** de la solicitud o **ver documentos** adjuntos.",
      en: "🔍 **View Request Details**\n\n1. In the requests table, find the person.\n2. Click the **eye icon** 👁️ in the Actions column.\n3. A window opens with:\n   • **Información General** — personal data, phone, address.\n   • **Finca** — farm data (if applicable).\n4. From there you can **download the PDF** or **view attached documents**.",
    },
  },

  // ── SOLICITUDES — APROBAR ────────────────────────────────
  {
    keywords: ["aprobar solicitud", "aceptar solicitud", "aprobar asociado", "cómo apruebo", "approve request", "accept associate"],
    answer: {
      es: "✅ **Aprobar una Solicitud**\n\nPara aprobar a alguien como nuevo asociado:\n\n1. Ve a **Solicitudes Pendientes**.\n2. Busca la solicitud con estado **'PENDIENTE'**.\n3. Haz clic en el botón verde ✓ en la columna de Acciones.\n4. La persona pasa a ser un **Asociado Aprobado**.\n\n⚠️ Solo puedes aprobar solicitudes en estado 'PENDIENTE' o 'RECHAZADO'.\n💡 Si tu rol es **JUNTA**, solo puedes ver — no aprobar.",
      en: "✅ **Approve a Request**\n\nTo approve someone as a new associate:\n\n1. Go to **Solicitudes Pendientes**.\n2. Find the request with status **'PENDIENTE'**.\n3. Click the green ✓ button in the Actions column.\n4. The person becomes an **Approved Associate**.\n\n⚠️ You can only approve 'PENDIENTE' or 'RECHAZADO' requests.\n💡 If your role is **JUNTA**, you can only view — not approve.",
    },
  },

  // ── SOLICITUDES — RECHAZAR ───────────────────────────────
  {
    keywords: ["rechazar solicitud", "denegar solicitud", "cómo rechazo", "motivo rechazo", "reject request", "deny request"],
    answer: {
      es: "❌ **Rechazar una Solicitud**\n\n1. Ve a **Solicitudes Pendientes**.\n2. Busca la solicitud con estado **'PENDIENTE'**.\n3. Haz clic en el botón rojo ✕ en la columna de Acciones.\n4. Se abre una ventana — escribe el **motivo del rechazo** (mínimo 5 letras).\n5. Haz clic en **'Rechazar solicitud'**.\n\n⚠️ El motivo es obligatorio. La persona será notificada.\n💡 Solo las solicitudes 'PENDIENTE' se pueden rechazar.",
      en: "❌ **Reject a Request**\n\n1. Go to **Solicitudes Pendientes**.\n2. Find the request with status **'PENDIENTE'**.\n3. Click the red ✕ button in the Actions column.\n4. A window opens — write the **reason for rejection** (at least 5 characters).\n5. Click **'Rechazar solicitud'**.\n\n⚠️ The reason is required. The person will be notified.\n💡 Only 'PENDIENTE' requests can be rejected.",
    },
  },

  // ── SOLICITUDES — APROBAR RECHAZADA ──────────────────────
  {
    keywords: ["aprobar rechazada", "revertir rechazo", "solicitud rechazada aprobar", "approve rejected", "reverse rejection"],
    answer: {
      es: "🔄 **Aprobar una Solicitud Rechazada**\n\nSí es posible aprobar una solicitud que antes fue rechazada:\n\n1. Filtra por estado **'RECHAZADO'**.\n2. Busca la solicitud.\n3. Haz clic en el botón verde de aprobación.\n4. El sistema te pedirá **confirmar** y escribir el motivo del cambio.\n5. Confirma y la solicitud queda aprobada.",
      en: "🔄 **Approve a Previously Rejected Request**\n\nYes, you can approve a request that was previously rejected:\n\n1. Filter by status **'RECHAZADO'**.\n2. Find the request.\n3. Click the green approval button.\n4. The system will ask you to **confirm** and provide a reason for the change.\n5. Confirm and the request becomes approved.",
    },
  },

  // ── SOLICITUDES — PDF ────────────────────────────────────
  {
    keywords: ["descargar pdf solicitud", "pdf solicitudes", "exportar solicitudes", "imprimir solicitudes", "download pdf request"],
    answer: {
      es: "📄 **Descargar PDF de Solicitudes**\n\n**Lista completa:**\n1. En la página de Solicitudes, haz clic en el botón verde **'Descargar PDF'** sobre la tabla.\n2. Se descarga un PDF con las solicitudes según los filtros activos.\n\n**Solicitud individual:**\n1. Abre el detalle (ícono del ojo 👁️).\n2. Haz clic en **'Descargar PDF'** dentro de la ventana.",
      en: "📄 **Download PDF of Requests**\n\n**Full list:**\n1. On the Requests page, click the green **'Descargar PDF'** button above the table.\n2. A PDF downloads based on the active filters.\n\n**Individual request:**\n1. Open the detail (eye icon 👁️).\n2. Click **'Descargar PDF'** inside the window.",
    },
  },

  // ── ASOCIADOS APROBADOS — VER LISTA ─────────────────────
  {
    keywords: ["asociados aprobados", "lista asociados", "ver asociados", "asociados activos", "approved associates", "view associates"],
    answer: {
      es: "👥 **Ver Asociados Aprobados**\n\n1. Ve a **Asociados → Asociados Aprobados**.\n2. Verás la lista con: cédula, nombre, teléfono, email, marca de ganado, estado y fecha.\n3. Puedes **filtrar** por estado (Activo / Inactivo) con los botones de arriba.\n4. Puedes **buscar** por nombre o cédula.\n\n💡 Badge verde = **activo**. Badge rojo = **inactivo**.",
      en: "👥 **View Approved Associates**\n\n1. Go to **Asociados → Asociados Aprobados**.\n2. You'll see: ID, name, phone, email, cattle brand, status and date.\n3. You can **filter** by status (Active / Inactive).\n4. You can **search** by name or ID.\n\n💡 Green badge = **active**. Red badge = **inactive**.",
    },
  },

  // ── ASOCIADOS — VER DETALLE ──────────────────────────────
  {
    keywords: ["ver detalle asociado", "información asociado", "abrir asociado", "detalles asociado", "view associate detail"],
    answer: {
      es: "🔍 **Ver el Detalle de un Asociado**\n\n1. En la tabla de Asociados Aprobados, busca la persona.\n2. Haz clic en el ícono del **ojo** 👁️.\n3. Se abre una ventana con tres pestañas:\n   • **Información General** — datos personales y del asociado.\n   • **Finca** — datos de su finca.\n   • **Necesidades y Observaciones** — necesidades registradas.\n4. También puedes ver sus **documentos adjuntos**.",
      en: "🔍 **View Associate Details**\n\n1. In the Approved Associates table, find the person.\n2. Click the **eye icon** 👁️.\n3. A window opens with three tabs:\n   • **Información General** — personal and associate data.\n   • **Finca** — farm data.\n   • **Necesidades y Observaciones** — registered needs.\n4. You can also view their **attached documents**.",
    },
  },

  // ── ASOCIADOS — EDITAR ───────────────────────────────────
  {
    keywords: ["editar asociado", "modificar asociado", "cambiar datos asociado", "actualizar asociado", "edit associate", "update associate"],
    answer: {
      es: "✏️ **Editar un Asociado**\n\n1. En la tabla de Asociados Aprobados, busca la persona.\n2. Haz clic en el ícono de **lápiz** ✏️ en la columna de Acciones.\n3. Se abre un formulario donde puedes cambiar:\n   • Teléfono, Correo, Dirección, Marca de Ganado, CVO.\n4. Cambia lo que necesites y haz clic en **'Guardar cambios'**.\n\n💡 Si tu rol es **JUNTA**, no verás el botón de editar.",
      en: "✏️ **Edit an Associate**\n\n1. In the Approved Associates table, find the person.\n2. Click the **pencil icon** ✏️ in the Actions column.\n3. A form opens where you can change:\n   • Phone, Email, Address, Cattle Brand, CVO.\n4. Change what you need and click **'Guardar cambios'**.\n\n💡 If your role is **JUNTA**, you won't see the edit button.",
    },
  },

  // ── ASOCIADOS — ACTIVAR / DESACTIVAR ─────────────────────
  {
    keywords: ["activar asociado", "desactivar asociado", "inhabilitar asociado", "estado asociado", "interruptor asociado", "activate associate", "deactivate associate"],
    answer: {
      es: "🔘 **Activar o Desactivar un Asociado**\n\n1. Abre el formulario de edición (ícono ✏️).\n2. En la parte superior verás un **interruptor** con el estado actual.\n3. Haz clic en el interruptor:\n   • **Verde (activo)** → pasa a **gris (inactivo)**.\n   • **Gris (inactivo)** → pasa a **verde (activo)**.\n4. Aparece una ventana de **confirmación** — confírmala.\n\n",
      en: "🔘 **Activate or Deactivate an Associate**\n\n1. Open the edit form (✏️ icon).\n2. At the top you'll see a **toggle switch** with the current status.\n3. Click the toggle:\n   • **Green (active)** → becomes **gray (inactive)**.\n   • **Gray (inactive)** → becomes **green (active)**.\n4. A **confirmation** window appears — confirm it.\n\n",
    },
  },

  // ── DOCUMENTOS ───────────────────────────────────────────
  {
    keywords: ["documentos asociado", "ver documentos asociado", "archivos asociado", "adjuntos asociado", "documents associate"],
    answer: {
      es: "📁 **Ver Documentos de un Asociado o Solicitud**\n\n1. Abre el detalle del asociado o solicitud (ícono del ojo 👁️).\n2. Busca el botón **'Ver documentos'** (ícono de carpeta 📂) en la parte superior.\n3. Si está disponible → haz clic y se abre una nueva pestaña con los documentos.\n4. Si dice **'Sin documentos adjuntos'** → esa persona no tiene archivos cargados.\n\n💡 Asegúrate de que el navegador no esté bloqueando ventanas emergentes.",
      en: "📁 **View Associate or Request Documents**\n\n1. Open the associate or request detail (eye icon 👁️).\n2. Look for the **'Ver documentos'** button (folder icon 📂) at the top.\n3. If available → click it and a new tab opens with the documents.\n4. If it says **'Sin documentos adjuntos'** → no files have been uploaded.\n\n💡 Make sure your browser isn't blocking pop-ups.",
    },
  },

  // ── ROLES / PERMISOS ─────────────────────────────────────
  {
    keywords: ["rol asociados", "no puedo aprobar", "no puedo editar asociado", "no veo botón asociado", "junta asociados", "permissions associates"],
    answer: {
      es: "🔐 **Roles y Permisos en Asociados**\n\n• **ADMIN** — puede ver, aprobar, rechazar, editar y cambiar el estado.\n• **JUNTA** — solo puede **ver** la información. No puede aprobar, rechazar ni editar.\n\nSi no ves el botón de editar o aprobar, tu usuario tiene el rol **JUNTA**.\n\n",
      en: "🔐 **Roles and Permissions in Associates**\n\n• **ADMIN** — can view, approve, reject, edit and change status.\n• **JUNTA** — can only **view** information. Cannot approve, reject or edit.\n\nIf you don't see the edit or approve button, your user has the **JUNTA** role.\n\n",
    },
  },

  // ── FINCA ────────────────────────────────────────────────
  {
    keywords: ["finca asociado", "datos finca", "ver finca", "farm associate", "farm data"],
    answer: {
      es: "🏡 **Información de Finca**\n\n1. Abre el detalle del asociado (ícono del ojo 👁️).\n2. Haz clic en la pestaña **'Finca'**.\n3. Cada finca aparece en un acordeón — haz clic para expandirla.\n\nDatos incluidos: nombre, ubicación, área y si el asociado es propietario.\n\n💡 Si dice 'No hay fincas registradas', el asociado no tiene fincas en el sistema.",
      en: "🏡 **Farm Information**\n\n1. Open the associate detail (eye icon 👁️).\n2. Click the **'Finca'** tab.\n3. Each farm appears in an accordion — click to expand it.\n\nData includes: name, location, area and whether the associate is the owner.\n\n💡 If it says 'No hay fincas registradas', no farms are registered yet.",
    },
  },

  // ── NECESIDADES ──────────────────────────────────────────
  {
    keywords: ["necesidades asociado", "observaciones asociado", "necesidades y observaciones", "needs associate"],
    answer: {
      es: "📝 **Necesidades y Observaciones**\n\n1. Abre el detalle del asociado (ícono del ojo 👁️).\n2. Haz clic en la pestaña **'Necesidades y Observaciones'**.\n3. Aparece la lista numerada de necesidades del asociado.",
      en: "📝 **Needs and Observations**\n\n1. Open the associate detail (eye icon 👁️).\n2. Click the **'Necesidades y Observaciones'** tab.\n3. The numbered list of needs appears.",
    },
  },

  // ── ESTADOS ──────────────────────────────────────────────
  {
    keywords: ["qué significa pendiente asociado", "qué significa aprobado", "qué significa rechazado", "qué significa activo", "qué significa inactivo", "status meaning associates"],
    answer: {
      es: "🏷️ **¿Qué significa cada estado?**\n\n**Solicitudes:**\n• 🟡 **PENDIENTE** — llegó pero aún no fue revisada.\n• 🟢 **APROBADO** — aceptada, la persona ya es asociada.\n• 🔴 **RECHAZADO** — denegada con un motivo.\n\n**Asociados:**\n• 🟢 **Activo** — puede acceder a la plataforma.\n• 🔴 **Inactivo** — fue desactivado y no puede acceder.",
      en: "🏷️ **What does each status mean?**\n\n**Requests:**\n• 🟡 **PENDIENTE** — arrived but not yet reviewed.\n• 🟢 **APROBADO** — accepted, the person is now an associate.\n• 🔴 **RECHAZADO** — denied with a stated reason.\n\n**Associates:**\n• 🟢 **Activo** — can access the platform.\n• 🔴 **Inactivo** — deactivated and cannot access.",
    },
  },

  // ── BUSCAR / FILTRAR ─────────────────────────────────────
  {
    keywords: ["buscar asociado", "filtrar asociados", "encontrar asociado", "search associate", "filter associates"],
    answer: {
      es: "🔍 **Buscar y Filtrar Asociados**\n\n**Por nombre o cédula:**\n1. Escribe en el cuadro de búsqueda (arriba de la tabla).\n2. La tabla se actualiza automáticamente.\n\n**Por estado:**\n1. Haz clic en uno de los botones de estado (ACTIVO, INACTIVO).\n2. La tabla muestra solo los registros de ese estado.\n3. Para ver todos, haz clic en **'Todos'**.\n\n💡 Puedes combinar búsqueda y filtro al mismo tiempo.",
      en: "🔍 **Search and Filter Associates**\n\n**By name or ID:**\n1. Type in the search box (above the table).\n2. The table updates automatically.\n\n**By status:**\n1. Click one of the status buttons (ACTIVO, INACTIVO).\n2. The table shows only records with that status.\n3. To see all, click **'Todos'**.\n\n💡 You can combine search and filter at the same time.",
    },
  },

  // ── PAGINACIÓN ───────────────────────────────────────────
  {
    keywords: ["página asociados", "siguiente asociados", "paginación asociados", "más asociados", "navegar tabla asociados"],
    answer: {
      es: "📄 **Navegar entre Páginas**\n\nLa tabla muestra **10 registros por página**.\n\n1. Busca los botones de paginación **debajo de la tabla**.\n2. Haz clic en el número de página que quieres ver.\n3. O usa las flechas **← →** para navegar.\n\n💡 El número en verde es la página donde estás ahora.",
      en: "📄 **Navigating Between Pages**\n\nThe table shows **10 records per page**.\n\n1. Look for the pagination buttons **below the table**.\n2. Click the page number you want to see.\n3. Or use the **← →** arrows to navigate.\n\n💡 The number in green is the page you're currently on.",
    },
  },
];

// ============================================================
// RELATED_QUESTIONS_ASSOCIATES
// ============================================================
export const RELATED_QUESTIONS_ASSOCIATES: Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
> = {
  solicitudes: {
    keywords: ["solicitud", "solicitudes", "request", "requests", "pendiente", "pending"],
    es: [
      "¿Cómo apruebo una solicitud?",
      "¿Cómo rechazo una solicitud?",
      "¿Cómo veo el detalle de una solicitud?",
      "¿Cómo descargo el PDF de solicitudes?",
    ],
    en: [
      "How do I approve a request?",
      "How do I reject a request?",
      "How do I view request details?",
      "How do I download the PDF of requests?",
    ],
  },
  asociadosAprobados: {
    keywords: ["asociado aprobado", "asociados aprobados", "approved associate", "activo", "inactivo"],
    es: [
      "¿Cómo veo los asociados aprobados?",
      "¿Cómo edito un asociado?",
      "¿Cómo activo o desactivo un asociado?",
      "¿Cómo veo el detalle de un asociado?",
    ],
    en: [
      "How do I view approved associates?",
      "How do I edit an associate?",
      "How do I activate or deactivate an associate?",
      "How do I view associate details?",
    ],
  },
  documentos: {
    keywords: ["documento", "documentos", "archivo", "archivos", "adjunto", "document", "file"],
    es: [
      "¿Cómo veo los documentos de un asociado?",
      "¿Qué hago si dice 'Sin documentos adjuntos'?",
      "¿Cómo abro los documentos de una solicitud?",
    ],
    en: [
      "How do I view an associate's documents?",
      "What do I do if it says 'Sin documentos adjuntos'?",
      "How do I open a request's documents?",
    ],
  },
  finca: {
    keywords: ["finca", "fincas", "farm", "farms", "propietario"],
    es: [
      "¿Cómo veo la finca de un asociado?",
      "¿Qué datos tiene la finca?",
      "¿Qué pasa si no hay fincas registradas?",
    ],
    en: [
      "How do I view an associate's farm?",
      "What data does the farm have?",
      "What happens if no farms are registered?",
    ],
  },
  estados: {
    keywords: ["estado", "estados", "activo", "inactivo", "pendiente", "aprobado", "rechazado", "status"],
    es: [
      "¿Qué significa estado PENDIENTE?",
      "¿Qué significa estado APROBADO?",
      "¿Qué significa estado RECHAZADO?",
      "¿Qué diferencia hay entre activo e inactivo?",
    ],
    en: [
      "What does PENDIENTE status mean?",
      "What does APROBADO status mean?",
      "What does RECHAZADO status mean?",
      "What is the difference between active and inactive?",
    ],
  },
  permisos: {
    keywords: ["rol", "roles", "junta", "admin", "permiso", "permisos", "role", "permission"],
    es: [
      "¿Qué puede hacer el rol ADMIN en asociados?",
      "¿Qué puede hacer el rol JUNTA en asociados?",
      "¿Por qué no veo el botón de aprobar?",
      "¿Por qué no puedo editar un asociado?",
    ],
    en: [
      "What can the ADMIN role do in associates?",
      "What can the JUNTA role do in associates?",
      "Why don't I see the approve button?",
      "Why can't I edit an associate?",
    ],
  },
};