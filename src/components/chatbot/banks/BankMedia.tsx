import type { QAEntry } from "./Home&BankBudget";

export const QA_BANK_MEDIA: QAEntry[] = [

  // ── NAVEGACIÓN ───────────────────────────────────────────
  {
    keywords: ["dónde están los archivos", "módulo media", "galería de medios", "where are files", "media module", "cómo llego a media"],
    answer: {
      es: "🖼️ **Módulo de Media (Galería de Medios)**\n\nPara llegar a esta sección:\n\n1. Mira el menú en la parte superior de la pantalla.\n2. Haz clic en **'Media'** o **'Galería de Medios'**.\n3. Verás todos los archivos subidos — imágenes y videos.\n\n💡 Los archivos se muestran ordenados del más reciente al más antiguo.",
      en: "🖼️ **Media Module (Media Gallery)**\n\nTo get to this section:\n\n1. Look at the menu at the top of the screen.\n2. Click on **'Media'** or **'Galería de Medios'**.\n3. You'll see all uploaded files — images and videos.\n\n💡 Files are shown ordered from most recent to oldest.",
    },
  },

  // ── SUBIR ARCHIVOS ───────────────────────────────────────
  {
    keywords: ["subir archivo", "subir imagen", "subir video", "upload file", "upload image", "upload video", "agregar archivo", "cómo subo"],
    answer: {
      es: "⬆️ **Subir Archivos**\n\nHay dos formas de subir archivos:\n\n**Opción 1 — Arrastrar:**\n1. Haz clic en el botón **+** (esquina superior derecha).\n2. Se abre un panel lateral.\n3. Arrastra tus archivos desde tu computadora hasta la zona punteada.\n\n**Opción 2 — Explorar:**\n1. Haz clic en el botón **+**.\n2. En el panel, haz clic en **'Seleccionar archivos'**.\n3. Elige los archivos desde tu computadora.\n\n⚠️ Límite: **10 MB por archivo**. Formatos: JPG, PNG, WEBP, GIF, AVIF e imágenes y videos.",
      en: "⬆️ **Upload Files**\n\nThere are two ways to upload files:\n\n**Option 1 — Drag and drop:**\n1. Click the **+** button (top right corner).\n2. A side panel opens.\n3. Drag your files from your computer into the dotted zone.\n\n**Option 2 — Browse:**\n1. Click the **+** button.\n2. In the panel, click **'Seleccionar archivos'**.\n3. Choose files from your computer.\n\n⚠️ Limit: **10 MB per file**. Formats: JPG, PNG, WEBP, GIF, AVIF, and videos.",
    },
  },

  // ── COLA DE SUBIDA ───────────────────────────────────────
  {
    keywords: ["cola de subida", "upload queue", "archivos en espera", "estado subida", "progreso subida", "cuánto falta"],
    answer: {
      es: "⏳ **Cola de Subida**\n\nCuando subes archivos, aparecen en una cola dentro del panel lateral:\n\n• **En espera** — el archivo está esperando su turno.\n• **Subiendo** — se muestra una barra de progreso y un ícono girando.\n• **Subida completada** ✅ — el archivo se subió correctamente.\n• **Error** ❌ — algo falló. Puedes hacer clic en **'Reintentar'**.\n\n💡 Para limpiar los archivos terminados, haz clic en **'Limpiar terminados'** en el panel.",
      en: "⏳ **Upload Queue**\n\nWhen you upload files, they appear in a queue inside the side panel:\n\n• **En espera** — the file is waiting its turn.\n• **Subiendo** — a progress bar and spinning icon appear.\n• **Subida completada** ✅ — the file uploaded successfully.\n• **Error** ❌ — something failed. Click **'Reintentar'** to try again.\n\n💡 To clean up finished files, click **'Limpiar terminados'** in the panel.",
    },
  },

  // ── ERROR AL SUBIR ───────────────────────────────────────
  {
    keywords: ["error subir archivo", "no se subió", "fallo subida", "upload error", "failed upload", "error al subir"],
    answer: {
      es: "🛠️ **Error al Subir un Archivo**\n\nSi un archivo muestra error ❌:\n\n1. El archivo aparece en rojo en la cola de subida.\n2. Haz clic en el botón **'Reintentar'** junto al archivo.\n3. Si el error persiste, verifica:\n   • El archivo no supere **10 MB**.\n   • El formato sea JPG, PNG, WEBP, GIF, AVIF o video.\n   • Tu conexión a internet esté activa.\n\n💡 Si el problema continúa, contacta al administrador del sistema.",
      en: "🛠️ **File Upload Error**\n\nIf a file shows an error ❌:\n\n1. The file appears in red in the upload queue.\n2. Click the **'Reintentar'** button next to the file.\n3. If the error persists, verify:\n   • The file doesn't exceed **10 MB**.\n   • The format is JPG, PNG, WEBP, GIF, AVIF or video.\n   • Your internet connection is active.\n\n💡 If the issue continues, contact the system administrator.",
    },
  },

  // ── VER ARCHIVO ──────────────────────────────────────────
  {
    keywords: ["ver archivo", "abrir imagen", "abrir video", "ver imagen", "ver video", "preview", "view file", "open file"],
    answer: {
      es: "👁️ **Ver un Archivo en Grande**\n\n1. En la galería, busca la imagen o video que quieres ver.\n2. Haz clic en el ícono del **ojo** 👁️ debajo del archivo.\n3. Se abre una ventana grande con el archivo.\n   • Si es una **imagen** → se muestra en pantalla completa.\n   • Si es un **video** → se reproduce automáticamente con controles.\n4. Haz clic en **'Cerrar'** o fuera de la ventana para salir.",
      en: "👁️ **View a File Full Size**\n\n1. In the gallery, find the image or video you want to view.\n2. Click the **eye icon** 👁️ below the file.\n3. A large window opens with the file.\n   • If it's an **image** → it's shown full screen.\n   • If it's a **video** → it plays automatically with controls.\n4. Click **'Cerrar'** or outside the window to exit.",
    },
  },

  // ── COPIAR ENLACE ────────────────────────────────────────
  {
    keywords: ["copiar enlace", "copiar url", "link archivo", "copy link", "copy url", "compartir archivo"],
    answer: {
      es: "🔗 **Copiar el Enlace de un Archivo**\n\n1. En la galería, busca el archivo.\n2. Haz clic en el ícono de **copiar** 📋 debajo del archivo.\n3. El enlace (URL) se copia al portapapeles automáticamente.\n4. Aparece un ✅ verde por un momento confirmando la copia.\n\n💡 Puedes pegar ese enlace en cualquier lugar (email, documento, etc.) con **Ctrl+V** en Windows o **Cmd+V** en Mac.",
      en: "🔗 **Copy a File's Link**\n\n1. In the gallery, find the file.\n2. Click the **copy icon** 📋 below the file.\n3. The link (URL) is automatically copied to your clipboard.\n4. A green ✅ briefly appears confirming the copy.\n\n💡 You can paste that link anywhere (email, document, etc.) with **Ctrl+V** on Windows or **Cmd+V** on Mac.",
    },
  },

  // ── ELIMINAR ARCHIVO ─────────────────────────────────────
  {
    keywords: ["eliminar archivo", "borrar archivo", "delete file", "remove file", "eliminar imagen", "borrar imagen", "eliminar video"],
    answer: {
      es: "🗑️ **Eliminar un Archivo**\n\n1. En la galería, busca el archivo que quieres eliminar.\n2. Haz clic en el ícono de **papelera** 🗑️ debajo del archivo.\n3. Aparece una ventana de confirmación — lee el mensaje.\n4. Haz clic en **'Confirmar'** para eliminarlo definitivamente.\n\n⚠️ **Esta acción no se puede deshacer.** El archivo se eliminará permanentemente.",
      en: "🗑️ **Delete a File**\n\n1. In the gallery, find the file you want to delete.\n2. Click the **trash icon** 🗑️ below the file.\n3. A confirmation window appears — read the message.\n4. Click **'Confirmar'** to permanently delete it.\n\n⚠️ **This action cannot be undone.** The file will be permanently deleted.",
    },
  },

  // ── CAMBIAR VISTA ────────────────────────────────────────
  {
    keywords: ["cambiar vista", "tamaño galería", "vista pequeña", "vista mediana", "vista grande", "change view", "grid size", "gallery size"],
    answer: {
      es: "🔲 **Cambiar el Tamaño de los Archivos en la Galería**\n\nPuedes ver los archivos en tres tamaños:\n\n1. Haz clic en el botón de **vista** (ícono de cuadrícula) en la esquina superior derecha.\n2. Elige el tamaño:\n   • **Pequeños** — más archivos en pantalla.\n   • **Medianos** — balance entre tamaño y cantidad.\n   • **Grandes** — menos archivos pero más grandes.\n\n💡 El sistema cambia la cantidad de archivos por página automáticamente según el tamaño elegido.",
      en: "🔲 **Change File Size in the Gallery**\n\nYou can view files in three sizes:\n\n1. Click the **view button** (grid icon) in the top right corner.\n2. Choose the size:\n   • **Pequeños** — more files on screen.\n   • **Medianos** — balance between size and quantity.\n   • **Grandes** — fewer but larger files.\n\n💡 The system automatically changes the number of files per page based on the chosen size.",
    },
  },

  // ── PAGINACIÓN ───────────────────────────────────────────
  {
    keywords: ["página media", "siguiente página media", "paginación media", "más archivos", "navegar galería"],
    answer: {
      es: "📄 **Navegar entre Páginas de la Galería**\n\nLa galería muestra un número de archivos por página según el tamaño elegido:\n• Vista **pequeña**: 24 archivos por página.\n• Vista **mediana**: 12 archivos por página.\n• Vista **grande**: 8 archivos por página.\n\n1. Busca los botones de paginación **debajo de la galería**.\n2. Haz clic en el número de página o usa las flechas **← →**.\n\n💡 El número en verde es la página donde estás ahora.",
      en: "📄 **Navigating Gallery Pages**\n\nThe gallery shows a number of files per page based on the chosen size:\n• **Small** view: 24 files per page.\n• **Medium** view: 12 files per page.\n• **Large** view: 8 files per page.\n\n1. Look for the pagination buttons **below the gallery**.\n2. Click the page number or use the **← →** arrows.\n\n💡 The number in green is the page you're currently on.",
    },
  },

  // ── FORMATOS PERMITIDOS ──────────────────────────────────
  {
    keywords: ["qué formatos", "qué tipo de archivos", "formatos permitidos", "allowed formats", "file types", "qué puedo subir"],
    answer: {
      es: "📁 **Formatos y Límites Permitidos**\n\n**Imágenes:** JPG, PNG, WEBP, GIF, AVIF\n**Videos:** MP4 y otros formatos de video comunes\n\n**Límite de tamaño:** máximo **10 MB por archivo**\n\n⚠️ Si tu archivo pesa más de 10 MB, debes reducir su tamaño antes de subirlo.\n💡 Puedes subir varios archivos al mismo tiempo.",
      en: "📁 **Allowed Formats and Limits**\n\n**Images:** JPG, PNG, WEBP, GIF, AVIF\n**Videos:** MP4 and other common video formats\n\n**Size limit:** maximum **10 MB per file**\n\n⚠️ If your file is larger than 10 MB, you must reduce its size before uploading.\n💡 You can upload multiple files at the same time.",
    },
  },

  // ── CONTADOR DE ARCHIVOS ─────────────────────────────────
  {
    keywords: ["cuántos archivos hay", "total archivos", "how many files", "total files", "contador archivos"],
    answer: {
      es: "🔢 **Ver el Total de Archivos**\n\nEl total de archivos aparece en la parte superior de la galería, debajo del borde superior de la tabla, en texto verde.\n\nEjemplo: **'12 archivos'** o **'1 archivo'**.\n\n💡 Este número se actualiza automáticamente cuando subes o eliminas archivos.",
      en: "🔢 **View Total Files**\n\nThe total number of files appears at the top of the gallery, below the table's top border, in green text.\n\nExample: **'12 archivos'** or **'1 archivo'**.\n\n💡 This number updates automatically when you upload or delete files.",
    },
  },

  // ── COLA PENDIENTE ───────────────────────────────────────
  {
    keywords: ["archivos en cola", "en cola", "cuántos en cola", "files in queue", "pending files", "cola pendiente"],
    answer: {
      es: "📥 **Archivos en Cola Pendiente**\n\nSi hay archivos esperando ser subidos, aparece un badge con el número en el botón **+** de la esquina superior derecha.\n\nTambién aparece un botón **'X en cola'** en la parte superior de la galería.\n\n1. Haz clic en el **+** o en el botón de cola.\n2. Se abre el panel lateral con la lista de archivos pendientes.\n3. Los archivos se suben automáticamente en orden.",
      en: "📥 **Files in Pending Queue**\n\nIf there are files waiting to be uploaded, a badge with the count appears on the **+** button in the top right corner.\n\nA **'X en cola'** button also appears at the top of the gallery.\n\n1. Click the **+** or the queue button.\n2. The side panel opens with the list of pending files.\n3. Files upload automatically in order.",
    },
  },
];

// ============================================================
// RELATED_QUESTIONS_MEDIA
// ============================================================
export const RELATED_QUESTIONS_MEDIA: Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
> = {
  subirArchivos: {
    keywords: ["subir", "upload", "agregar archivo", "subir imagen", "subir video"],
    es: [
      "¿Cómo subo un archivo?",
      "¿Qué formatos puedo subir?",
      "¿Cuál es el tamaño máximo de archivo?",
      "¿Por qué falló la subida de un archivo?",
    ],
    en: [
      "How do I upload a file?",
      "What formats can I upload?",
      "What is the maximum file size?",
      "Why did a file upload fail?",
    ],
  },
  gestionArchivos: {
    keywords: ["eliminar", "copiar", "ver archivo", "delete", "copy", "view file"],
    es: [
      "¿Cómo elimino un archivo?",
      "¿Cómo copio el enlace de un archivo?",
      "¿Cómo veo un archivo en grande?",
      "¿Se puede recuperar un archivo eliminado?",
    ],
    en: [
      "How do I delete a file?",
      "How do I copy a file's link?",
      "How do I view a file full size?",
      "Can I recover a deleted file?",
    ],
  },
  colaSubida: {
    keywords: ["cola", "queue", "en espera", "progreso", "estado subida"],
    es: [
      "¿Qué significa 'En espera' en la cola?",
      "¿Cómo limpio los archivos terminados?",
      "¿Cómo reintento una subida fallida?",
      "¿Puedo subir varios archivos al mismo tiempo?",
    ],
    en: [
      "What does 'En espera' mean in the queue?",
      "How do I clear finished files?",
      "How do I retry a failed upload?",
      "Can I upload multiple files at the same time?",
    ],
  },
  vistaGaleria: {
    keywords: ["vista", "tamaño galería", "pequeño", "mediano", "grande", "grid", "view size"],
    es: [
      "¿Cómo cambio el tamaño de los archivos en la galería?",
      "¿Cuántos archivos muestra cada vista?",
      "¿Cómo navego entre páginas de la galería?",
      "¿Cuántos archivos hay en total?",
    ],
    en: [
      "How do I change the file size in the gallery?",
      "How many files does each view show?",
      "How do I navigate gallery pages?",
      "How many files are there in total?",
    ],
  },
};