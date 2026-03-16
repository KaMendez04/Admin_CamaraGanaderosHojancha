import type { QAEntry } from "./Home&BankBudget";

// ============================================================
export const QA_BANK_VOLUNTEERS: QAEntry[] = [

  // ── NAVEGACIÓN ───────────────────────────────────────────
  {
    keywords: ["dónde están los voluntarios", "cómo llego a voluntarios", "módulo voluntarios", "sección voluntarios", "where are volunteers", "how to get to volunteers"],
    answer: {
      es: "🙋 **Módulo de Voluntarios**\n\nPara llegar a esta sección:\n\n1. Mira el menú en la parte superior de la pantalla.\n2. Haz clic en **'Voluntarios'**.\n3. Verás dos secciones:\n   • **Solicitudes Pendientes** — personas u organizaciones que quieren ser voluntarias.\n   • **Voluntarios Aprobados** — quienes ya fueron aceptados.\n\n💡 La pestaña subrayada en verde indica cuál sección estás viendo.",
      en: "🙋 **Volunteers Module**\n\nTo get to this section:\n\n1. Look at the menu at the top of the screen.\n2. Click on **'Voluntarios'**.\n3. You will see two sections:\n   • **Solicitudes Pendientes** — people or organizations who want to volunteer.\n   • **Voluntarios Aprobados** — those who have already been accepted.\n\n💡 The tab underlined in green shows which section you're viewing.",
    },
  },

  // ── TIPOS DE VOLUNTARIO ──────────────────────────────────
  {
    keywords: ["tipos de voluntario", "individual", "organización voluntaria", "volunteer types", "individual vs organization", "qué tipos hay"],
    answer: {
      es: "👤🏢 **Tipos de Voluntario**\n\nEl sistema acepta dos tipos de solicitudes:\n\n• **Individual** — una persona que quiere voluntariar por su cuenta. Se identifica con su cédula.\n• **Organización** — una empresa u ONG que quiere participar. Se identifica con cédula jurídica y tiene representantes.\n\n💡 En la tabla, el badge verde oscuro indica **Individual** y el badge dorado indica **Organización**.",
      en: "👤🏢 **Types of Volunteer**\n\nThe system accepts two types of applications:\n\n• **Individual** — a person who wants to volunteer on their own. Identified by their ID number.\n• **Organization** — a company or NGO that wants to participate. Identified by legal ID and has representatives.\n\n💡 In the table, the dark green badge indicates **Individual** and the gold badge indicates **Organization**.",
    },
  },

  // ── SOLICITUDES — VER LISTA ──────────────────────────────
  {
    keywords: ["solicitudes voluntarios", "lista solicitudes voluntarios", "ver solicitudes voluntarios", "pending volunteer requests", "solicitudes pendientes voluntarios"],
    answer: {
      es: "📋 **Ver Solicitudes de Voluntarios**\n\n1. Ve a **Voluntarios → Solicitudes Pendientes**.\n2. Verás una tabla con: tipo (Individual/Organización), nombre, identificación, email, estado y fecha.\n3. Puedes **filtrar** por estado usando los botones de arriba.\n4. Puedes **buscar** por nombre o identificación.\n\n💡 Las solicitudes en amarillo están pendientes de revisión.",
      en: "📋 **View Volunteer Requests**\n\n1. Go to **Voluntarios → Solicitudes Pendientes**.\n2. You'll see a table with: type (Individual/Organization), name, ID, email, status and date.\n3. You can **filter** by status using the buttons at the top.\n4. You can **search** by name or ID.\n\n💡 Requests shown in yellow are pending review.",
    },
  },

  // ── SOLICITUDES — VER DETALLE ────────────────────────────
  {
    keywords: ["ver detalle solicitud voluntario", "abrir solicitud voluntario", "información solicitud voluntario", "view volunteer request detail"],
    answer: {
      es: "🔍 **Ver el Detalle de una Solicitud de Voluntario**\n\n1. En la tabla, busca la persona u organización.\n2. Haz clic en el ícono del **ojo** 👁️ en la columna de Acciones.\n3. Se abre una ventana con pestañas según el tipo:\n   • **Información General** — datos personales o de la organización.\n   • **Áreas de Interés** — en qué áreas quiere voluntariar (si las tiene).\n   • **Disponibilidad** — horarios disponibles (si los tiene).\n4. También puedes **descargar el PDF** o **ver documentos** adjuntos.",
      en: "🔍 **View Volunteer Request Details**\n\n1. In the table, find the person or organization.\n2. Click the **eye icon** 👁️ in the Actions column.\n3. A window opens with tabs depending on the type:\n   • **Información General** — personal or organization data.\n   • **Áreas de Interés** — areas they want to volunteer in (if any).\n   • **Disponibilidad** — available schedules (if any).\n4. You can also **download the PDF** or **view attached documents**.",
    },
  },

  // ── SOLICITUDES — APROBAR ────────────────────────────────
  {
    keywords: ["aprobar solicitud voluntario", "aceptar voluntario", "aprobar voluntario", "cómo apruebo voluntario", "approve volunteer request"],
    answer: {
      es: "✅ **Aprobar una Solicitud de Voluntario**\n\n1. Ve a **Solicitudes Pendientes**.\n2. Busca la solicitud con estado **'PENDIENTE'**.\n3. Haz clic en el botón verde ✓ en la columna de Acciones.\n4. El voluntario queda aprobado y aparece en **Voluntarios Aprobados**.\n\n⚠️ Solo puedes aprobar solicitudes en estado 'PENDIENTE' o 'RECHAZADO'.\n💡 Si tu rol es **JUNTA**, solo puedes ver — no aprobar.",
      en: "✅ **Approve a Volunteer Request**\n\n1. Go to **Solicitudes Pendientes**.\n2. Find the request with status **'PENDIENTE'**.\n3. Click the green ✓ button in the Actions column.\n4. The volunteer is approved and appears in **Voluntarios Aprobados**.\n\n⚠️ You can only approve 'PENDIENTE' or 'RECHAZADO' requests.\n💡 If your role is **JUNTA**, you can only view — not approve.",
    },
  },

  // ── SOLICITUDES — RECHAZAR ───────────────────────────────
  {
    keywords: ["rechazar solicitud voluntario", "denegar voluntario", "cómo rechazo voluntario", "motivo rechazo voluntario", "reject volunteer request"],
    answer: {
      es: "❌ **Rechazar una Solicitud de Voluntario**\n\n1. Ve a **Solicitudes Pendientes**.\n2. Busca la solicitud con estado **'PENDIENTE'**.\n3. Haz clic en el botón rojo ✕ en la columna de Acciones.\n4. Se abre una ventana — escribe el **motivo del rechazo** (mínimo 5 letras).\n5. Haz clic en **'Rechazar solicitud'**.\n\n⚠️ El motivo es obligatorio. El solicitante será notificado.\n💡 Solo las solicitudes 'PENDIENTE' se pueden rechazar.",
      en: "❌ **Reject a Volunteer Request**\n\n1. Go to **Solicitudes Pendientes**.\n2. Find the request with status **'PENDIENTE'**.\n3. Click the red ✕ button in the Actions column.\n4. A window opens — write the **reason for rejection** (at least 5 characters).\n5. Click **'Rechazar solicitud'**.\n\n⚠️ The reason is required. The applicant will be notified.\n💡 Only 'PENDIENTE' requests can be rejected.",
    },
  },

  // ── SOLICITUDES — APROBAR RECHAZADA ──────────────────────
  {
    keywords: ["aprobar rechazada voluntario", "revertir rechazo voluntario", "solicitud rechazada aprobar voluntario", "approve rejected volunteer"],
    answer: {
      es: "🔄 **Aprobar una Solicitud Rechazada**\n\nSí es posible aprobar una solicitud de voluntario que antes fue rechazada:\n\n1. Filtra por estado **'RECHAZADO'**.\n2. Busca la solicitud.\n3. Haz clic en el botón verde de aprobación.\n4. El sistema te pedirá **confirmar** y puedes agregar una nota u observación (opcional).\n5. Confirma y la solicitud queda aprobada.\n\n💡 La nota queda guardada en la solicitud.",
      en: "🔄 **Approve a Previously Rejected Volunteer Request**\n\nYes, you can approve a volunteer request that was previously rejected:\n\n1. Filter by status **'RECHAZADO'**.\n2. Find the request.\n3. Click the green approval button.\n4. The system will ask you to **confirm** and you can add a note (optional).\n5. Confirm and the request becomes approved.\n\n💡 The note is saved with the request.",
    },
  },

  // ── SOLICITUDES — PDF ────────────────────────────────────
  {
    keywords: ["descargar pdf solicitudes voluntarios", "pdf voluntarios", "exportar solicitudes voluntarios", "download volunteer pdf"],
    answer: {
      es: "📄 **Descargar PDF de Solicitudes de Voluntarios**\n\n**Lista completa:**\n1. En la página de Solicitudes, haz clic en el botón verde **'Descargar PDF'** sobre la tabla.\n2. Se descarga el listado según los filtros activos.\n\n**Solicitud individual:**\n1. Abre el detalle (ícono del ojo 👁️).\n2. Haz clic en **'Descargar PDF'** dentro de la ventana.",
      en: "📄 **Download Volunteer Requests PDF**\n\n**Full list:**\n1. On the Requests page, click the green **'Descargar PDF'** button above the table.\n2. The list downloads based on active filters.\n\n**Individual request:**\n1. Open the detail (eye icon 👁️).\n2. Click **'Descargar PDF'** inside the window.",
    },
  },

  // ── VOLUNTARIOS APROBADOS — VER LISTA ───────────────────
  {
    keywords: ["voluntarios aprobados", "lista voluntarios aprobados", "ver voluntarios", "approved volunteers", "voluntarios activos"],
    answer: {
      es: "👥 **Ver Voluntarios Aprobados**\n\n1. Ve a **Voluntarios → Voluntarios Aprobados**.\n2. Verás una tabla unificada con individuales y organizaciones: tipo, identificación, nombre, teléfono, email y estado.\n3. Puedes **filtrar** por estado (Activo / Inactivo).\n4. Puedes **buscar** por nombre o identificación.\n\n💡 Badge verde = **activo**. Badge rojo = **inactivo**.\n💡 Badge verde oscuro = **Individual**. Badge dorado = **Organización**.",
      en: "👥 **View Approved Volunteers**\n\n1. Go to **Voluntarios → Voluntarios Aprobados**.\n2. You'll see a unified table with individuals and organizations: type, ID, name, phone, email and status.\n3. You can **filter** by status (Active / Inactive).\n4. You can **search** by name or ID.\n\n💡 Green badge = **active**. Red badge = **inactive**.\n💡 Dark green badge = **Individual**. Gold badge = **Organization**.",
    },
  },

  // ── VOLUNTARIOS APROBADOS — VER DETALLE ─────────────────
  {
    keywords: ["ver detalle voluntario aprobado", "información voluntario aprobado", "abrir voluntario", "view approved volunteer detail"],
    answer: {
      es: "🔍 **Ver el Detalle de un Voluntario Aprobado**\n\n1. En la tabla de Voluntarios Aprobados, busca la persona u organización.\n2. Haz clic en el ícono del **ojo** 👁️.\n3. Se abre una ventana con la información completa:\n   • Para **Individual**: datos personales, motivación, habilidades, experiencia.\n   • Para **Organización**: datos de la organización, representantes, razones sociales.\n4. También puedes ver sus **documentos adjuntos**.",
      en: "🔍 **View Approved Volunteer Details**\n\n1. In the Approved Volunteers table, find the person or organization.\n2. Click the **eye icon** 👁️.\n3. A window opens with full information:\n   • For **Individual**: personal data, motivation, skills, experience.\n   • For **Organization**: organization data, representatives, business reasons.\n4. You can also view their **attached documents**.",
    },
  },

  // ── VOLUNTARIOS APROBADOS — EDITAR INDIVIDUAL ───────────
  {
    keywords: ["editar voluntario individual", "modificar voluntario", "cambiar datos voluntario", "edit individual volunteer", "actualizar voluntario"],
    answer: {
      es: "✏️ **Editar un Voluntario Individual**\n\n1. En la tabla de Voluntarios Aprobados, busca la persona.\n2. Haz clic en el ícono de **lápiz** ✏️ en la columna de Acciones.\n3. Se abre un formulario donde puedes cambiar los datos del voluntario.\n4. Cambia lo que necesites y haz clic en **'Guardar cambios'**.\n\n💡 Si tu rol es **JUNTA**, no verás el botón de editar.",
      en: "✏️ **Edit an Individual Volunteer**\n\n1. In the Approved Volunteers table, find the person.\n2. Click the **pencil icon** ✏️ in the Actions column.\n3. A form opens where you can change the volunteer's data.\n4. Change what you need and click **'Guardar cambios'**.\n\n💡 If your role is **JUNTA**, you won't see the edit button.",
    },
  },

  // ── VOLUNTARIOS APROBADOS — EDITAR ORGANIZACIÓN ─────────
  {
    keywords: ["editar organización voluntaria", "modificar organización", "cambiar datos organización", "edit volunteer organization", "actualizar organización"],
    answer: {
      es: "✏️ **Editar una Organización Voluntaria**\n\n1. En la tabla de Voluntarios Aprobados, busca la organización.\n2. Haz clic en el ícono de **lápiz** ✏️.\n3. Se abre un formulario donde puedes cambiar los datos de la organización.\n4. Cambia lo que necesites y haz clic en **'Guardar cambios'**.\n\n💡 Si tu rol es **JUNTA**, no verás el botón de editar.",
      en: "✏️ **Edit a Volunteer Organization**\n\n1. In the Approved Volunteers table, find the organization.\n2. Click the **pencil icon** ✏️.\n3. A form opens where you can change the organization's data.\n4. Change what you need and click **'Guardar cambios'**.\n\n💡 If your role is **JUNTA**, you won't see the edit button.",
    },
  },

  // ── ÁREAS DE INTERÉS ─────────────────────────────────────
  {
    keywords: ["áreas de interés voluntario", "areas interes", "areas of interest volunteer", "en qué áreas voluntaria"],
    answer: {
      es: "📋 **Áreas de Interés del Voluntario**\n\nPara ver en qué áreas quiere trabajar un voluntario:\n\n1. Abre el detalle de la solicitud (ícono del ojo 👁️).\n2. Haz clic en la pestaña **'Áreas de Interés'**.\n3. Aparecen las áreas como etiquetas (badges).\n\n💡 Si no aparece la pestaña, significa que el voluntario no registró áreas de interés.",
      en: "📋 **Volunteer Areas of Interest**\n\nTo see which areas a volunteer wants to work in:\n\n1. Open the request detail (eye icon 👁️).\n2. Click the **'Áreas de Interés'** tab.\n3. The areas appear as badges.\n\n💡 If the tab doesn't appear, the volunteer didn't register any areas of interest.",
    },
  },

  // ── DISPONIBILIDAD ───────────────────────────────────────
  {
    keywords: ["disponibilidad voluntario", "horario voluntario", "cuándo puede voluntariar", "volunteer availability", "schedule volunteer"],
    answer: {
      es: "📅 **Disponibilidad del Voluntario**\n\nPara ver los horarios disponibles de un voluntario:\n\n1. Abre el detalle de la solicitud (ícono del ojo 👁️).\n2. Haz clic en la pestaña **'Disponibilidad'**.\n3. Verás los días, horarios y el período (fecha inicio — fecha fin) disponibles.\n\n💡 Si no aparece la pestaña, el voluntario no registró horarios de disponibilidad.",
      en: "📅 **Volunteer Availability**\n\nTo view a volunteer's available schedule:\n\n1. Open the request detail (eye icon 👁️).\n2. Click the **'Disponibilidad'** tab.\n3. You'll see the days, schedules and period (start date — end date) available.\n\n💡 If the tab doesn't appear, the volunteer didn't register any availability.",
    },
  },

  // ── DOCUMENTOS ───────────────────────────────────────────
  {
    keywords: ["documentos voluntario", "ver documentos voluntario", "archivos voluntario", "adjuntos voluntario", "volunteer documents"],
    answer: {
      es: "📁 **Ver Documentos de un Voluntario**\n\n1. Abre el detalle de la solicitud o voluntario aprobado (ícono del ojo 👁️).\n2. Busca el botón **'Ver documentos'** (ícono de carpeta 📂) en la parte superior.\n3. Si está disponible → haz clic y se abre una nueva pestaña con los documentos.\n4. Si dice **'Sin documentos adjuntos'** → esa persona no tiene archivos cargados.\n\n💡 Asegúrate de que el navegador no esté bloqueando ventanas emergentes.",
      en: "📁 **View Volunteer Documents**\n\n1. Open the request or approved volunteer detail (eye icon 👁️).\n2. Look for the **'Ver documentos'** button (folder icon 📂) at the top.\n3. If available → click it and a new tab opens with the documents.\n4. If it says **'Sin documentos adjuntos'** → no files have been uploaded.\n\n💡 Make sure your browser isn't blocking pop-ups.",
    },
  },

  // ── REPRESENTANTES ───────────────────────────────────────
  {
    keywords: ["representante organización", "representante voluntariado", "organization representative", "quién representa la organización"],
    answer: {
      es: "👔 **Representantes de una Organización**\n\nCada organización voluntaria puede tener uno o más representantes:\n\n1. Abre el detalle de la organización (ícono del ojo 👁️).\n2. En la pestaña **'Información General'**, busca la sección **'Representantes'**.\n3. Ahí verás: nombre completo, cargo, email y teléfono de cada representante.\n\n💡 Si no hay representantes registrados, esa sección no aparece.",
      en: "👔 **Organization Representatives**\n\nEach volunteer organization can have one or more representatives:\n\n1. Open the organization detail (eye icon 👁️).\n2. In the **'Información General'** tab, find the **'Representantes'** section.\n3. There you'll see: full name, position, email and phone of each representative.\n\n💡 If no representatives are registered, that section won't appear.",
    },
  },

  // ── ROLES / PERMISOS ─────────────────────────────────────
  {
    keywords: ["rol voluntarios", "no puedo aprobar voluntario", "no puedo editar voluntario", "no veo botón voluntario", "junta voluntarios", "permissions volunteers"],
    answer: {
      es: "🔐 **Roles y Permisos en Voluntarios**\n\n• **ADMIN** — puede ver, aprobar, rechazar y editar voluntarios y organizaciones.\n• **JUNTA** — solo puede **ver** la información. No puede aprobar, rechazar ni editar.\n\nSi no ves el botón de aprobar o editar, tu usuario tiene el rol **JUNTA**.\n\n💡 Para cambiar permisos, contacta al administrador del sistema.",
      en: "🔐 **Roles and Permissions in Volunteers**\n\n• **ADMIN** — can view, approve, reject and edit volunteers and organizations.\n• **JUNTA** — can only **view** information. Cannot approve, reject or edit.\n\nIf you don't see the approve or edit button, your user has the **JUNTA** role.\n\n💡 To change permissions, contact the system administrator.",
    },
  },

  // ── BUSCAR / FILTRAR ─────────────────────────────────────
  {
    keywords: ["buscar voluntario", "filtrar voluntarios", "encontrar voluntario", "search volunteer", "filter volunteers"],
    answer: {
      es: "🔍 **Buscar y Filtrar Voluntarios**\n\n**Por nombre o identificación:**\n1. Escribe en el cuadro de búsqueda (arriba de la tabla).\n2. La tabla se actualiza automáticamente.\n\n**Por estado:**\n1. Haz clic en uno de los botones de estado (PENDIENTE, APROBADO, RECHAZADO, ACTIVO, INACTIVO).\n2. Para ver todos, haz clic en **'Todos'**.\n\n💡 Puedes combinar búsqueda y filtro al mismo tiempo.",
      en: "🔍 **Search and Filter Volunteers**\n\n**By name or ID:**\n1. Type in the search box (above the table).\n2. The table updates automatically.\n\n**By status:**\n1. Click one of the status buttons (PENDIENTE, APROBADO, RECHAZADO, ACTIVO, INACTIVO).\n2. To see all, click **'Todos'**.\n\n💡 You can combine search and filter at the same time.",
    },
  },

  // ── ESTADOS ──────────────────────────────────────────────
  {
    keywords: ["qué significa estado voluntario", "estados voluntarios", "pendiente voluntario", "aprobado voluntario", "rechazado voluntario", "volunteer status meaning"],
    answer: {
      es: "🏷️ **¿Qué significa cada estado?**\n\n**Solicitudes:**\n• 🟡 **PENDIENTE** — llegó pero aún no fue revisada.\n• 🟢 **APROBADO** — aceptada, ya es voluntario.\n• 🔴 **RECHAZADO** — denegada con un motivo.\n\n**Voluntarios aprobados:**\n• 🟢 **Activo** — puede participar en actividades.\n• 🔴 **Inactivo** — fue desactivado.",
      en: "🏷️ **What does each status mean?**\n\n**Requests:**\n• 🟡 **PENDIENTE** — arrived but not yet reviewed.\n• 🟢 **APROBADO** — accepted, now a volunteer.\n• 🔴 **RECHAZADO** — denied with a stated reason.\n\n**Approved volunteers:**\n• 🟢 **Activo** — can participate in activities.\n• 🔴 **Inactivo** — has been deactivated.",
    },
  },

  // ── PAGINACIÓN ───────────────────────────────────────────
  {
    keywords: ["página voluntarios", "siguiente página voluntarios", "paginación voluntarios", "más voluntarios", "navegar tabla voluntarios"],
    answer: {
      es: "📄 **Navegar entre Páginas**\n\nLa tabla muestra **10 registros por página**.\n\n1. Busca los botones de paginación **debajo de la tabla**.\n2. Haz clic en el número de página que quieres ver.\n3. O usa las flechas **← →** para navegar.\n\n💡 El número en verde es la página donde estás ahora.",
      en: "📄 **Navigating Between Pages**\n\nThe table shows **10 records per page**.\n\n1. Look for the pagination buttons **below the table**.\n2. Click the page number you want to see.\n3. Or use the **← →** arrows to navigate.\n\n💡 The number in green is the page you're currently on.",
    },
  },

  // ── PDF LISTADO APROBADOS ────────────────────────────────
  {
    keywords: ["descargar pdf voluntarios aprobados", "pdf listado voluntarios", "exportar voluntarios aprobados", "download approved volunteers pdf"],
    answer: {
      es: "📄 **Descargar PDF de Voluntarios Aprobados**\n\n1. Ve a **Voluntarios → Voluntarios Aprobados**.\n2. Haz clic en el botón verde **'Descargar PDF'** sobre la tabla.\n3. Se descarga el listado completo de voluntarios aprobados.\n\n💡 El PDF incluye tanto individuales como organizaciones.",
      en: "📄 **Download Approved Volunteers PDF**\n\n1. Go to **Voluntarios → Voluntarios Aprobados**.\n2. Click the green **'Descargar PDF'** button above the table.\n3. The full list of approved volunteers downloads.\n\n💡 The PDF includes both individuals and organizations.",
    },
  },
];

// ============================================================
// RELATED_QUESTIONS_VOLUNTEERS
// ============================================================
export const RELATED_QUESTIONS_VOLUNTEERS: Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
> = {
  solicitudesVoluntarios: {
    keywords: ["solicitud voluntario", "solicitudes voluntarios", "volunteer request", "pendiente voluntario"],
    es: [
      "¿Cómo apruebo una solicitud de voluntario?",
      "¿Cómo rechazo una solicitud de voluntario?",
      "¿Cómo veo el detalle de una solicitud?",
      "¿Cómo descargo el PDF de solicitudes?",
    ],
    en: [
      "How do I approve a volunteer request?",
      "How do I reject a volunteer request?",
      "How do I view request details?",
      "How do I download the PDF of requests?",
    ],
  },
  tiposVoluntario: {
    keywords: ["individual", "organización voluntaria", "tipo voluntario", "organization volunteer"],
    es: [
      "¿Cuál es la diferencia entre Individual y Organización?",
      "¿Cómo edito un voluntario individual?",
      "¿Cómo edito una organización voluntaria?",
      "¿Cómo veo los representantes de una organización?",
    ],
    en: [
      "What is the difference between Individual and Organization?",
      "How do I edit an individual volunteer?",
      "How do I edit a volunteer organization?",
      "How do I view organization representatives?",
    ],
  },
  voluntariosAprobados: {
    keywords: ["voluntario aprobado", "voluntarios aprobados", "approved volunteer", "activo voluntario"],
    es: [
      "¿Cómo veo los voluntarios aprobados?",
      "¿Cómo edito un voluntario aprobado?",
      "¿Cómo veo el detalle de un voluntario aprobado?",
      "¿Cómo descargo el PDF de voluntarios aprobados?",
    ],
    en: [
      "How do I view approved volunteers?",
      "How do I edit an approved volunteer?",
      "How do I view approved volunteer details?",
      "How do I download the approved volunteers PDF?",
    ],
  },
  disponibilidadAreas: {
    keywords: ["disponibilidad", "área interés", "horario voluntario", "availability", "areas interest"],
    es: [
      "¿Cómo veo la disponibilidad de un voluntario?",
      "¿Cómo veo las áreas de interés de un voluntario?",
      "¿Qué pasa si no hay áreas de interés registradas?",
      "¿Qué pasa si no hay disponibilidad registrada?",
    ],
    en: [
      "How do I view a volunteer's availability?",
      "How do I view a volunteer's areas of interest?",
      "What happens if no areas of interest are registered?",
      "What happens if no availability is registered?",
    ],
  },
  documentosVoluntarios: {
    keywords: ["documento voluntario", "documentos voluntarios", "archivo voluntario", "volunteer document"],
    es: [
      "¿Cómo veo los documentos de un voluntario?",
      "¿Qué hago si dice 'Sin documentos adjuntos'?",
      "¿Cómo abro los documentos de una solicitud de voluntario?",
    ],
    en: [
      "How do I view a volunteer's documents?",
      "What do I do if it says 'Sin documentos adjuntos'?",
      "How do I open a volunteer request's documents?",
    ],
  },
  estadosVoluntarios: {
    keywords: ["estado voluntario", "pendiente voluntario", "aprobado voluntario", "rechazado voluntario", "activo voluntario", "inactivo voluntario"],
    es: [
      "¿Qué significa estado PENDIENTE en voluntarios?",
      "¿Qué significa estado APROBADO en voluntarios?",
      "¿Qué significa estado RECHAZADO en voluntarios?",
      "¿Cuál es la diferencia entre activo e inactivo en voluntarios?",
    ],
    en: [
      "What does PENDIENTE status mean in volunteers?",
      "What does APROBADO status mean in volunteers?",
      "What does RECHAZADO status mean in volunteers?",
      "What is the difference between active and inactive in volunteers?",
    ],
  },
  permisosVoluntarios: {
    keywords: ["rol voluntarios", "junta voluntarios", "admin voluntarios", "permiso voluntarios"],
    es: [
      "¿Qué puede hacer el rol ADMIN en voluntarios?",
      "¿Qué puede hacer el rol JUNTA en voluntarios?",
      "¿Por qué no veo el botón de aprobar voluntarios?",
      "¿Por qué no puedo editar un voluntario?",
    ],
    en: [
      "What can the ADMIN role do in volunteers?",
      "What can the JUNTA role do in volunteers?",
      "Why don't I see the approve button for volunteers?",
      "Why can't I edit a volunteer?",
    ],
  },
};