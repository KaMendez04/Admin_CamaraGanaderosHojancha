import type { QAEntry } from "./Home&BankBudget";

export const QA_BANK_STAFF: QAEntry[] = [

  // ── NAVEGACIÓN ───────────────────────────────────────────
  {
    keywords: ["módulo personal", "gestión personal", "dónde está el personal", "staff module", "where is staff", "cómo llego a personal"],
    answer: {
      es: "👤 **Módulo de Personal**\n\nPara llegar a esta sección:\n\n1. Mira el menú en la parte superior de la pantalla.\n2. Haz clic en **'Personal'** o **'Staff'**.\n3. Verás la lista de todo el personal registrado en el sistema.\n\n💡 Puedes buscar cualquier persona por nombre, apellido o cédula usando la barra de búsqueda.",
      en: "👤 **Staff Module**\n\nTo get to this section:\n\n1. Look at the menu at the top of the screen.\n2. Click on **'Personal'** or **'Staff'**.\n3. You'll see the list of all registered staff in the system.\n\n💡 You can search for anyone by name, last name or ID using the search bar.",
    },
  },

  // ── VER LISTA ────────────────────────────────────────────
  {
    keywords: ["ver personal", "lista personal", "ver staff", "list staff", "personal registrado", "registered staff"],
    answer: {
      es: "📋 **Ver Lista de Personal**\n\nLa tabla de personal muestra:\n\n• **Cédula** — número de identificación.\n• **Nombre Completo** — nombre y apellidos.\n• **Teléfono** — número de contacto.\n• **Email** — correo electrónico.\n• **Puesto** — ocupación o cargo.\n• **Estado** — Activo o Inactivo.\n• **Acciones** — ver detalle o editar.\n\n💡 Usa la barra de búsqueda arriba de la tabla para encontrar a alguien rápidamente.",
      en: "📋 **View Staff List**\n\nThe staff table shows:\n\n• **Cédula** — ID number.\n• **Nombre Completo** — full name.\n• **Teléfono** — contact number.\n• **Email** — email address.\n• **Puesto** — position or role.\n• **Estado** — Active or Inactive.\n• **Acciones** — view detail or edit.\n\n💡 Use the search bar above the table to find someone quickly.",
    },
  },

  // ── BUSCAR PERSONAL ──────────────────────────────────────
  {
    keywords: ["buscar personal", "buscar empleado", "search staff", "encontrar personal", "filtrar personal", "buscar por cédula personal"],
    answer: {
      es: "🔍 **Buscar Personal**\n\n1. En la página de Personal, busca el cuadro de texto grande arriba de la tabla.\n2. Escribe el **nombre**, **apellido** o **cédula** de la persona.\n3. La tabla se filtra automáticamente mostrando solo los resultados que coincidan.\n\n💡 Puedes escribir parte del nombre y el sistema encontrará los resultados.\n💡 El número de resultados aparece debajo de la tabla a la izquierda.",
      en: "🔍 **Search Staff**\n\n1. On the Staff page, find the large text box above the table.\n2. Type the person's **name**, **last name** or **ID number**.\n3. The table filters automatically showing only matching results.\n\n💡 You can type part of the name and the system will find matches.\n💡 The number of results appears below the table on the left.",
    },
  },

  // ── VER DETALLE ──────────────────────────────────────────
  {
    keywords: ["ver detalle personal", "información personal", "abrir empleado", "view staff detail", "detalles empleado"],
    answer: {
      es: "🔍 **Ver el Detalle de un Empleado**\n\n1. En la tabla de Personal, busca la persona.\n2. Haz clic en el ícono del **ojo** 👁️ en la columna de Acciones.\n3. Se abre una ventana con toda la información dividida en secciones:\n   • **Identificación** — nombre, apellidos, cédula, fecha de nacimiento.\n   • **Contacto** — teléfono, email, dirección.\n   • **Perfil laboral** — puesto, estado, fecha de inicio y salida (si aplica).\n4. Desde ahí también puedes **descargar el PDF** del empleado.",
      en: "🔍 **View Employee Details**\n\n1. In the Staff table, find the person.\n2. Click the **eye icon** 👁️ in the Actions column.\n3. A window opens with all information divided into sections:\n   • **Identificación** — name, last names, ID, date of birth.\n   • **Contacto** — phone, email, address.\n   • **Perfil laboral** — position, status, start date and end date (if applicable).\n4. From there you can also **download the PDF** for the employee.",
    },
  },

  // ── AGREGAR PERSONAL ─────────────────────────────────────
  {
    keywords: ["agregar personal", "nuevo empleado", "crear personal", "add staff", "new employee", "registrar empleado", "cómo agrego"],
    answer: {
      es: "➕ **Agregar un Nuevo Empleado**\n\n1. En la página de Personal, haz clic en el botón **+** (círculo verde, esquina superior derecha).\n2. Se abre un formulario — llena los datos:\n   • Cédula, nombre, apellidos, fecha de nacimiento.\n   • Teléfono, email, dirección.\n   • Puesto, fecha de inicio laboral.\n3. Haz clic en **Guardar** para registrar al empleado.\n\n💡 Si tu rol es **JUNTA**, no verás el botón **+** — solo puedes ver la información.",
      en: "➕ **Add a New Employee**\n\n1. On the Staff page, click the **+** button (green circle, top right corner).\n2. A form opens — fill in the data:\n   • ID, name, last names, date of birth.\n   • Phone, email, address.\n   • Position, work start date.\n3. Click **Guardar** to register the employee.\n\n💡 If your role is **JUNTA**, you won't see the **+** button — you can only view information.",
    },
  },

  // ── EDITAR PERSONAL ──────────────────────────────────────
  {
    keywords: ["editar personal", "modificar empleado", "cambiar datos empleado", "edit staff", "update employee", "actualizar personal"],
    answer: {
      es: "✏️ **Editar un Empleado**\n\n1. En la tabla de Personal, busca la persona.\n2. Haz clic en el ícono de **lápiz** ✏️ en la columna de Acciones.\n3. Se abre un formulario con los datos actuales — modifica lo que necesites.\n4. Haz clic en **Guardar** para confirmar los cambios.\n\n💡 Si tu rol es **JUNTA**, no verás el botón de editar.",
      en: "✏️ **Edit an Employee**\n\n1. In the Staff table, find the person.\n2. Click the **pencil icon** ✏️ in the Actions column.\n3. A form opens with current data — modify what you need.\n4. Click **Guardar** to confirm the changes.\n\n💡 If your role is **JUNTA**, you won't see the edit button.",
    },
  },

  // ── DESCARGAR PDF ────────────────────────────────────────
  {
    keywords: ["descargar pdf personal", "pdf empleado", "exportar personal", "download staff pdf", "imprimir empleado"],
    answer: {
      es: "📄 **Descargar PDF de un Empleado**\n\n1. Abre el detalle del empleado (ícono del ojo 👁️).\n2. En la parte superior de la ventana, haz clic en el botón verde **'Descargar PDF'**.\n3. El PDF se genera y descarga automáticamente.\n\n💡 El PDF contiene toda la información del empleado: identificación, contacto y perfil laboral.",
      en: "📄 **Download Employee PDF**\n\n1. Open the employee detail (eye icon 👁️).\n2. At the top of the window, click the green **'Descargar PDF'** button.\n3. The PDF is generated and downloads automatically.\n\n💡 The PDF contains all employee information: identification, contact and work profile.",
    },
  },

  // ── ESTADO ACTIVO / INACTIVO ─────────────────────────────
  {
    keywords: ["estado personal", "activo inactivo personal", "empleado inactivo", "activar empleado", "desactivar empleado", "staff status"],
    answer: {
      es: "🏷️ **Estado de un Empleado (Activo / Inactivo)**\n\n• 🟢 **Activo** — el empleado trabaja actualmente en la organización.\n• 🔴 **Inactivo** — el empleado ya no trabaja (tiene fecha de salida registrada).\n\nPara cambiar el estado:\n1. Abre el formulario de edición (ícono ✏️).\n2. Cambia el campo **Estado** y si aplica, agrega la **fecha de salida**.\n3. Haz clic en **Guardar**.",
      en: "🏷️ **Employee Status (Active / Inactive)**\n\n• 🟢 **Activo** — the employee currently works in the organization.\n• 🔴 **Inactivo** — the employee no longer works (has a registered end date).\n\nTo change the status:\n1. Open the edit form (✏️ icon).\n2. Change the **Estado** field and if applicable, add the **end date**.\n3. Click **Guardar**.",
    },
  },

  // ── PAGINACIÓN ───────────────────────────────────────────
  {
    keywords: ["página personal", "siguiente página personal", "paginación personal", "más personal", "navegar tabla personal"],
    answer: {
      es: "📄 **Navegar entre Páginas de Personal**\n\n1. Busca los botones de paginación **debajo de la tabla**.\n2. Haz clic en la flecha **→** para ir a la siguiente página.\n3. Haz clic en la flecha **←** para regresar a la página anterior.\n4. El texto **'Página X de Y'** indica en qué página estás.\n\n💡 Si buscas a alguien específico, usa la barra de búsqueda para encontrarlo sin navegar páginas.",
      en: "📄 **Navigating Staff Pages**\n\n1. Look for the pagination buttons **below the table**.\n2. Click the **→** arrow to go to the next page.\n3. Click the **←** arrow to go back to the previous page.\n4. The text **'Página X de Y'** shows which page you're on.\n\n💡 If you're looking for someone specific, use the search bar to find them without browsing pages.",
    },
  },

  // ── REGRESAR ─────────────────────────────────────────────
  {
    keywords: ["regresar personal", "volver personal", "go back staff", "back button staff"],
    answer: {
      es: "↩️ **Regresar desde Personal**\n\nEn la parte inferior derecha de la página de Personal hay un botón **'Regresar'**.\n\nHaz clic en él para volver a la página principal del sistema.",
      en: "↩️ **Go Back from Staff**\n\nAt the bottom right of the Staff page there is a **'Regresar'** button.\n\nClick it to return to the main page of the system.",
    },
  },

  // ── ROLES / PERMISOS ─────────────────────────────────────
  {
    keywords: ["rol personal", "no puedo editar personal", "no veo botón personal", "junta personal", "permissions staff", "no puedo agregar personal"],
    answer: {
      es: "🔐 **Roles y Permisos en Personal**\n\n• **ADMIN** — puede ver, agregar y editar empleados.\n• **JUNTA** — solo puede **ver** la información. No puede agregar ni editar.\n\nSi no ves el botón **+** o el ícono de editar, tu usuario tiene el rol **JUNTA**.\n\n💡 Para cambiar permisos, contacta al administrador del sistema.",
      en: "🔐 **Roles and Permissions in Staff**\n\n• **ADMIN** — can view, add and edit employees.\n• **JUNTA** — can only **view** information. Cannot add or edit.\n\nIf you don't see the **+** button or the edit icon, your user has the **JUNTA** role.\n\n💡 To change permissions, contact the system administrator.",
    },
  },
];

// ============================================================
// RELATED_QUESTIONS_STAFF
// ============================================================
export const RELATED_QUESTIONS_STAFF: Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
> = {
  gestionPersonal: {
    keywords: ["personal", "empleado", "staff", "employee", "agregar", "editar"],
    es: [
      "¿Cómo agrego un nuevo empleado?",
      "¿Cómo edito los datos de un empleado?",
      "¿Cómo veo el detalle de un empleado?",
      "¿Cómo descargo el PDF de un empleado?",
    ],
    en: [
      "How do I add a new employee?",
      "How do I edit an employee's data?",
      "How do I view an employee's details?",
      "How do I download an employee's PDF?",
    ],
  },
  busquedaPersonal: {
    keywords: ["buscar", "search", "filtrar", "cédula", "nombre empleado"],
    es: [
      "¿Cómo busco un empleado?",
      "¿Puedo buscar por cédula?",
      "¿Cómo navego entre páginas de personal?",
      "¿Cuántos resultados muestra la búsqueda?",
    ],
    en: [
      "How do I search for an employee?",
      "Can I search by ID number?",
      "How do I navigate staff pages?",
      "How many results does the search show?",
    ],
  },
  estadoPersonal: {
    keywords: ["activo", "inactivo", "estado", "active", "inactive", "status employee"],
    es: [
      "¿Qué significa estado Activo en personal?",
      "¿Qué significa estado Inactivo en personal?",
      "¿Cómo cambio el estado de un empleado?",
      "¿Qué es la fecha de salida laboral?",
    ],
    en: [
      "What does Active status mean in staff?",
      "What does Inactive status mean in staff?",
      "How do I change an employee's status?",
      "What is the work end date?",
    ],
  },
  permisosPersonal: {
    keywords: ["rol personal", "junta personal", "admin personal", "permiso personal"],
    es: [
      "¿Qué puede hacer el rol ADMIN en personal?",
      "¿Qué puede hacer el rol JUNTA en personal?",
      "¿Por qué no veo el botón de agregar personal?",
      "¿Por qué no puedo editar un empleado?",
    ],
    en: [
      "What can the ADMIN role do in staff?",
      "What can the JUNTA role do in staff?",
      "Why don't I see the add staff button?",
      "Why can't I edit an employee?",
    ],
  },
};