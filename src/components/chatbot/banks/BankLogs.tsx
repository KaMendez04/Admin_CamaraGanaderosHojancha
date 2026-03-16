import type { QAEntry } from "./Home&BankBudget";   

// ============================================================
// QA_BANK_EDITION
// ============================================================
export const QA_BANK_EDITION: QAEntry[] = [

  // ── QUÉ ES ESTE MÓDULO ───────────────────────────────────
  {
    keywords: ["qué es edición", "qué es contenido público", "what is edition", "public content", "editar sitio web", "módulo edición"],
    answer: {
      es: "🌐 **Módulo de Edición de Contenido**\n\nDesde aquí editas el contenido que aparece en el **sitio web público** de la organización.\n\nPuedes editar estas secciones:\n• **Página Principal** — descripción de inicio.\n• **Sobre Nosotros** — quiénes somos, misión y visión.\n• **Servicios** — crear, editar y eliminar servicios.\n• **Asociados** — encabezado, beneficios y requisitos.\n• **Voluntarios** — encabezado, beneficios y requisitos.\n• **Eventos** — crear, editar y eliminar eventos.\n• **Preguntas Frecuentes (FAQ)** — crear, editar y eliminar FAQs.\n\n💡 Solo los usuarios con rol **ADMIN** tienen acceso a este módulo.",
      en: "🌐 **Content Edition Module**\n\nFrom here you edit the content that appears on the organization's **public website**.\n\nYou can edit these sections:\n• **Página Principal** — home description.\n• **Sobre Nosotros** — who we are, mission and vision.\n• **Servicios** — create, edit and delete services.\n• **Asociados** — header, benefits and requirements.\n• **Voluntarios** — header, benefits and requirements.\n• **Eventos** — create, edit and delete events.\n• **Preguntas Frecuentes (FAQ)** — create, edit and delete FAQs.\n\n💡 Only users with the **ADMIN** role have access to this module.",
    },
  },

  // ── NAVEGAR ENTRE SECCIONES ──────────────────────────────
  {
    keywords: ["cómo navego edición", "menú edición", "cambiar sección edición", "navigate edition", "edition menu", "barra navegación edición"],
    answer: {
      es: "🗺️ **Navegar entre Secciones de Edición**\n\nEn la parte superior de cada página de edición hay una **barra de navegación** con accesos a todas las secciones editables.\n\nHaz clic en el nombre de la sección que quieres editar para ir directamente a ella.\n\n💡 En cada página de edición hay un botón **'Regresar'** en la parte inferior derecha para volver al panel de inicio.",
      en: "🗺️ **Navigate Between Edition Sections**\n\nAt the top of each edition page there is a **navigation bar** with access to all editable sections.\n\nClick the name of the section you want to edit to go directly to it.\n\n💡 On each edition page there is a **'Regresar'** button at the bottom right to return to the home dashboard.",
    },
  },

  // ── PÁGINA PRINCIPAL ─────────────────────────────────────
  {
    keywords: ["editar página principal", "editar descripción inicio", "edit main page", "principal edition", "descripción principal"],
    answer: {
      es: "🏠 **Editar la Página Principal**\n\n1. Ve a **Edición → Página Principal**.\n2. Verás el **Título** (fijo, no se puede cambiar).\n3. En el campo **Descripción**, escribe o modifica el texto (máximo 250 caracteres).\n4. Haz clic en **'Guardar cambios'**.\n\n⚠️ El título de la organización es fijo y no se puede editar.",
      en: "🏠 **Edit the Main Page**\n\n1. Go to **Edición → Página Principal**.\n2. You'll see the **Title** (fixed, cannot be changed).\n3. In the **Descripción** field, write or modify the text (maximum 250 characters).\n4. Click **'Guardar cambios'**.\n\n⚠️ The organization title is fixed and cannot be edited.",
    },
  },

  // ── SOBRE NOSOTROS ───────────────────────────────────────
  {
    keywords: ["editar sobre nosotros", "quiénes somos", "misión visión", "edit about us", "about us edition", "misión organización"],
    answer: {
      es: "📖 **Editar Sobre Nosotros**\n\n1. Ve a **Edición → Sobre Nosotros**.\n2. Verás tres campos:\n   • **¿Quiénes somos?** — descripción de la organización.\n   • **Misión** — la misión institucional.\n   • **Visión** — la visión de la organización.\n3. Modifica los campos que necesites (máximo 1000 caracteres cada uno).\n4. Haz clic en **'Guardar cambios'**.\n\n💡 El contador debajo de cada campo muestra cuántos caracteres te quedan.",
      en: "📖 **Edit About Us**\n\n1. Go to **Edición → Sobre Nosotros**.\n2. You'll see three fields:\n   • **¿Quiénes somos?** — description of the organization.\n   • **Misión** — the institutional mission.\n   • **Visión** — the organization's vision.\n3. Modify the fields you need (maximum 1000 characters each).\n4. Click **'Guardar cambios'**.\n\n💡 The counter below each field shows how many characters you have left.",
    },
  },

  // ── SERVICIOS — CREAR ────────────────────────────────────
  {
    keywords: ["crear servicio", "nuevo servicio", "agregar servicio", "create service", "add service", "nuevo servicio sitio web"],
    answer: {
      es: "➕ **Crear un Nuevo Servicio**\n\n1. Ve a **Edición → Servicios**.\n2. En la sección superior **'Crear Nuevo Servicio'**, llena:\n   • **Título** del servicio.\n   • **Descripción** del servicio.\n3. Haz clic en **'Crear servicio'**.\n\n💡 El nuevo servicio aparecerá en la lista de edición y en el sitio web público.\n💡 Respeta los límites de caracteres mostrados debajo de cada campo.",
      en: "➕ **Create a New Service**\n\n1. Go to **Edición → Servicios**.\n2. In the upper **'Crear Nuevo Servicio'** section, fill in:\n   • **Título** of the service.\n   • **Descripción** of the service.\n3. Click **'Crear servicio'**.\n\n💡 The new service will appear in the edit list and on the public website.\n💡 Respect the character limits shown below each field.",
    },
  },

  // ── SERVICIOS — EDITAR / ELIMINAR ────────────────────────
  {
    keywords: ["editar servicio", "eliminar servicio", "edit service", "delete service", "modificar servicio"],
    answer: {
      es: "✏️🗑️ **Editar o Eliminar un Servicio**\n\n1. Ve a **Edición → Servicios**.\n2. En la sección inferior **'Editar Servicio'**, usa el selector para elegir el servicio.\n3. Modifica el **título** o la **descripción**.\n4. Para guardar → haz clic en **'Guardar cambios'**.\n5. Para eliminar → haz clic en **'Eliminar'** y confirma la acción.\n\n⚠️ La eliminación es permanente y no se puede deshacer.",
      en: "✏️🗑️ **Edit or Delete a Service**\n\n1. Go to **Edición → Servicios**.\n2. In the lower **'Editar Servicio'** section, use the selector to choose the service.\n3. Modify the **title** or **description**.\n4. To save → click **'Guardar cambios'**.\n5. To delete → click **'Eliminar'** and confirm the action.\n\n⚠️ Deletion is permanent and cannot be undone.",
    },
  },

  // ── ASOCIADOS — EDITAR ───────────────────────────────────
  {
    keywords: ["editar sección asociados", "encabezado asociados", "beneficios asociados", "requisitos asociados", "edition associates", "edit associates section"],
    answer: {
      es: "👥 **Editar la Sección de Asociados**\n\nEsta sección tiene tres bloques con sus propios botones de guardar:\n\n**1. Encabezado:**\n• Edita el título y la descripción de la sección.\n• Haz clic en **'Guardar'** en ese bloque.\n\n**2. Beneficios:**\n• Usa el selector para elegir qué beneficio editar.\n• Cambia el título o la descripción.\n• Haz clic en **'Guardar'** en ese bloque.\n\n**3. Requisitos:**\n• Usa el selector para elegir qué requisito editar.\n• Modifica el texto.\n• Haz clic en **'Guardar'** en ese bloque.\n\n💡 Cada bloque se guarda de forma independiente.",
      en: "👥 **Edit the Associates Section**\n\nThis section has three blocks with their own save buttons:\n\n**1. Header:**\n• Edit the section title and description.\n• Click **'Guardar'** in that block.\n\n**2. Benefits:**\n• Use the selector to choose which benefit to edit.\n• Change the title or description.\n• Click **'Guardar'** in that block.\n\n**3. Requirements:**\n• Use the selector to choose which requirement to edit.\n• Modify the text.\n• Click **'Guardar'** in that block.\n\n💡 Each block is saved independently.",
    },
  },

  // ── VOLUNTARIOS — EDITAR ─────────────────────────────────
  {
    keywords: ["editar sección voluntarios", "encabezado voluntarios", "beneficios voluntarios", "requisitos voluntarios", "edition volunteers", "edit volunteers section"],
    answer: {
      es: "🙋 **Editar la Sección de Voluntarios**\n\nFunciona igual que la sección de Asociados — tiene tres bloques independientes:\n\n1. Ve a **Edición → Voluntarios**.\n2. Edita el **Encabezado** (título y descripción) y guarda.\n3. Elige un **Beneficio** con el selector, edítalo y guarda.\n4. Elige un **Requisito** con el selector, edítalo y guarda.\n\n💡 Cada bloque tiene su propio botón **'Guardar'** — no se guardan todos juntos.",
      en: "🙋 **Edit the Volunteers Section**\n\nWorks the same as the Associates section — it has three independent blocks:\n\n1. Go to **Edición → Voluntarios**.\n2. Edit the **Header** (title and description) and save.\n3. Choose a **Benefit** with the selector, edit it and save.\n4. Choose a **Requirement** with the selector, edit it and save.\n\n💡 Each block has its own **'Guardar'** button — they don't all save together.",
    },
  },

  // ── EVENTOS — CREAR ──────────────────────────────────────
  {
    keywords: ["crear evento", "nuevo evento", "agregar evento", "create event", "add event", "nuevo evento sitio web"],
    answer: {
      es: "📅 **Crear un Nuevo Evento**\n\n1. Ve a **Edición → Eventos**.\n2. En la sección superior **'Crear Nuevo Evento'**, llena los datos del evento:\n   • Nombre, descripción, fecha, lugar, etc.\n3. Haz clic en **'Crear evento'**.\n\n💡 El nuevo evento aparecerá en el sitio web público.\n💡 Respeta los límites de caracteres indicados.",
      en: "📅 **Create a New Event**\n\n1. Go to **Edición → Eventos**.\n2. In the upper **'Crear Nuevo Evento'** section, fill in the event data:\n   • Name, description, date, location, etc.\n3. Click **'Crear evento'**.\n\n💡 The new event will appear on the public website.\n💡 Respect the indicated character limits.",
    },
  },

  // ── EVENTOS — EDITAR / ELIMINAR ──────────────────────────
  {
    keywords: ["editar evento", "eliminar evento", "edit event", "delete event", "modificar evento"],
    answer: {
      es: "✏️🗑️ **Editar o Eliminar un Evento**\n\n1. Ve a **Edición → Eventos**.\n2. En la sección inferior **'Editar Evento'**, usa el selector para elegir el evento.\n3. Modifica los campos necesarios.\n4. Para guardar → haz clic en **'Guardar cambios'**.\n5. Para eliminar → haz clic en **'Eliminar'** y confirma.\n\n⚠️ La eliminación es permanente.",
      en: "✏️🗑️ **Edit or Delete an Event**\n\n1. Go to **Edición → Eventos**.\n2. In the lower **'Editar Evento'** section, use the selector to choose the event.\n3. Modify the necessary fields.\n4. To save → click **'Guardar cambios'**.\n5. To delete → click **'Eliminar'** and confirm.\n\n⚠️ Deletion is permanent.",
    },
  },

  // ── FAQ — CREAR ──────────────────────────────────────────
  {
    keywords: ["crear faq", "nueva pregunta frecuente", "agregar faq", "create faq", "add faq", "nueva pregunta"],
    answer: {
      es: "❓ **Crear una Nueva Pregunta Frecuente (FAQ)**\n\n1. Ve a **Edición → Preguntas Frecuentes**.\n2. En la sección superior **'Crear Nueva Pregunta Frecuente'**, llena:\n   • **Pregunta** (máximo 75 caracteres).\n   • **Respuesta** (máximo 250 caracteres).\n3. Haz clic en **'Crear pregunta'**.\n\n💡 La nueva FAQ aparecerá en el sitio web público en la sección de preguntas frecuentes.",
      en: "❓ **Create a New FAQ**\n\n1. Go to **Edición → Preguntas Frecuentes**.\n2. In the upper **'Crear Nueva Pregunta Frecuente'** section, fill in:\n   • **Pregunta** (maximum 75 characters).\n   • **Respuesta** (maximum 250 characters).\n3. Click **'Crear pregunta'**.\n\n💡 The new FAQ will appear on the public website in the frequently asked questions section.",
    },
  },

  // ── FAQ — EDITAR / ELIMINAR ──────────────────────────────
  {
    keywords: ["editar faq", "eliminar faq", "edit faq", "delete faq", "modificar pregunta frecuente", "editar pregunta frecuente"],
    answer: {
      es: "✏️🗑️ **Editar o Eliminar una FAQ**\n\n1. Ve a **Edición → Preguntas Frecuentes**.\n2. En la sección inferior **'Editar Pregunta Frecuente'**, usa el selector para elegir la FAQ.\n3. Modifica la **pregunta** o la **respuesta**.\n4. Para guardar → haz clic en **'Guardar cambios'**.\n5. Para eliminar → haz clic en **'Eliminar'** y confirma.\n\n⚠️ La eliminación es permanente y no se puede deshacer.",
      en: "✏️🗑️ **Edit or Delete a FAQ**\n\n1. Go to **Edición → Preguntas Frecuentes**.\n2. In the lower **'Editar Pregunta Frecuente'** section, use the selector to choose the FAQ.\n3. Modify the **question** or **answer**.\n4. To save → click **'Guardar cambios'**.\n5. To delete → click **'Eliminar'** and confirm.\n\n⚠️ Deletion is permanent and cannot be undone.",
    },
  },

  // ── BENEFICIOS E ÍCONOS ──────────────────────────────────
  {
    keywords: ["ícono beneficio", "icono no editable", "benefit icon", "icon not editable", "cambiar ícono"],
    answer: {
      es: "🎨 **Íconos de Beneficios**\n\nEn las secciones de Asociados y Voluntarios, cada beneficio tiene un ícono visual.\n\n⚠️ Los íconos **no se pueden cambiar** desde esta interfaz — son fijos para cada beneficio.\n\nSolo puedes editar el **título** y la **descripción** de cada beneficio. El ícono se muestra como referencia visual.",
      en: "🎨 **Benefit Icons**\n\nIn the Associates and Volunteers sections, each benefit has a visual icon.\n\n⚠️ Icons **cannot be changed** from this interface — they are fixed for each benefit.\n\nYou can only edit the **title** and **description** of each benefit. The icon is shown as a visual reference.",
    },
  },

  // ── LÍMITES DE CARACTERES ────────────────────────────────
  {
    keywords: ["límite caracteres", "caracteres restantes", "character limit", "cuántos caracteres puedo", "máximo caracteres"],
    answer: {
      es: "🔢 **Límites de Caracteres**\n\nCada campo tiene un límite máximo de caracteres:\n\n• **Descripción principal**: 250 caracteres\n• **Quiénes somos / Misión / Visión**: 1000 caracteres\n• **Pregunta (FAQ)**: 75 caracteres\n• **Respuesta (FAQ)**: 250 caracteres\n• **Beneficio título**: varía según configuración\n• **Beneficio descripción**: varía según configuración\n• **Requisito**: varía según configuración\n\n💡 Debajo de cada campo hay un contador que muestra cuántos caracteres te quedan.",
      en: "🔢 **Character Limits**\n\nEach field has a maximum character limit:\n\n• **Main description**: 250 characters\n• **Who we are / Mission / Vision**: 1000 characters\n• **Question (FAQ)**: 75 characters\n• **Answer (FAQ)**: 250 characters\n• **Benefit title**: varies by configuration\n• **Benefit description**: varies by configuration\n• **Requirement**: varies by configuration\n\n💡 Below each field there is a counter showing how many characters you have left.",
    },
  },

  // ── CANCELAR SIN GUARDAR ─────────────────────────────────
  {
    keywords: ["cancelar cambios", "perder cambios", "cancel changes", "no guardar", "descartar cambios", "restore original"],
    answer: {
      es: "↩️ **Cancelar sin Guardar**\n\nCuando haces cambios y presionas **'Cancelar'**:\n\n1. Si hay cambios no guardados, el sistema te preguntará si estás seguro.\n2. Confirma para descartar los cambios — los campos vuelven a sus valores originales.\n\n⚠️ Una vez que confirmas la cancelación, los cambios se pierden permanentemente.\n\n💡 Si quieres conservar los cambios, haz clic en **'Guardar'** antes de cancelar.",
      en: "↩️ **Cancel Without Saving**\n\nWhen you make changes and press **'Cancelar'**:\n\n1. If there are unsaved changes, the system will ask if you're sure.\n2. Confirm to discard the changes — the fields return to their original values.\n\n⚠️ Once you confirm the cancellation, the changes are permanently lost.\n\n💡 If you want to keep the changes, click **'Guardar'** before canceling.",
    },
  },

  // ── ACCESO (SOLO ADMIN) ──────────────────────────────────
  {
    keywords: ["acceso edición", "quién puede editar", "solo admin edición", "edition access", "who can edit"],
    answer: {
      es: "🔐 **Acceso al Módulo de Edición**\n\nEl módulo de **Edición de Contenido** solo está disponible para usuarios con rol **ADMIN**.\n\nSi tienes rol **JUNTA**, no verás la opción de **'Contenido Público'** en el panel de inicio y no podrás acceder a ninguna sección de edición.\n\n💡 Para obtener acceso, contacta al administrador del sistema.",
      en: "🔐 **Access to the Edition Module**\n\nThe **Content Edition** module is only available for users with the **ADMIN** role.\n\nIf you have the **JUNTA** role, you won't see the **'Contenido Público'** option on the home dashboard and cannot access any edition section.\n\n💡 To get access, contact the system administrator.",
    },
  },
];

// ============================================================
// RELATED_QUESTIONS_EDITION
// ============================================================
export const RELATED_QUESTIONS_EDITION: Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
> = {
  paginaPrincipal: {
    keywords: ["página principal", "descripción inicio", "main page", "principal edition"],
    es: [
      "¿Cómo edito la página principal?",
      "¿Se puede cambiar el título de la organización?",
      "¿Cuántos caracteres tiene la descripción principal?",
      "¿Cómo regreso al inicio después de editar?",
    ],
    en: [
      "How do I edit the main page?",
      "Can the organization title be changed?",
      "How many characters does the main description have?",
      "How do I go back to home after editing?",
    ],
  },
  serviciosEventos: {
    keywords: ["servicio", "evento", "crear", "eliminar", "service", "event", "create", "delete"],
    es: [
      "¿Cómo creo un nuevo servicio?",
      "¿Cómo elimino un servicio?",
      "¿Cómo creo un nuevo evento?",
      "¿Cómo elimino un evento?",
    ],
    en: [
      "How do I create a new service?",
      "How do I delete a service?",
      "How do I create a new event?",
      "How do I delete an event?",
    ],
  },
  faq: {
    keywords: ["faq", "pregunta frecuente", "frequently asked", "question answer"],
    es: [
      "¿Cómo creo una pregunta frecuente?",
      "¿Cómo edito una FAQ existente?",
      "¿Cómo elimino una FAQ?",
      "¿Cuál es el límite de caracteres para las FAQs?",
    ],
    en: [
      "How do I create a FAQ?",
      "How do I edit an existing FAQ?",
      "How do I delete a FAQ?",
      "What is the character limit for FAQs?",
    ],
  },
  asociadosVoluntariosEdicion: {
    keywords: ["editar asociados", "editar voluntarios", "beneficio", "requisito", "encabezado edición"],
    es: [
      "¿Cómo edito la sección de Asociados?",
      "¿Cómo edito la sección de Voluntarios?",
      "¿Cómo edito un beneficio?",
      "¿Puedo cambiar el ícono de un beneficio?",
    ],
    en: [
      "How do I edit the Associates section?",
      "How do I edit the Volunteers section?",
      "How do I edit a benefit?",
      "Can I change a benefit's icon?",
    ],
  },
};