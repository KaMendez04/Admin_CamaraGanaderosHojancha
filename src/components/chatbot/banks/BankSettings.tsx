import type { QAEntry } from "./Home&BankBudget";

export const QA_BANK_SETTINGS: QAEntry[] = [

  // ── NAVEGACIÓN ───────────────────────────────────────────
  {
    keywords: ["configuración", "settings", "dónde está configuración", "cómo llego a configuración", "where is settings"],
    answer: {
      es: "⚙️ **Módulo de Configuración**\n\nPara llegar a esta sección:\n\n1. Busca el ícono de tu perfil o el menú en la parte superior derecha.\n2. Haz clic en **'Configuración'**.\n3. Verás dos secciones en el menú lateral:\n   • **Cuenta** — tu perfil, correo y contraseña.\n   • **Usuarios** — gestión de usuarios del sistema (solo ADMIN).\n\n💡 Si no ves la sección **'Usuarios'**, tu rol es **JUNTA** y no tienes acceso a esa parte.",
      en: "⚙️ **Settings Module**\n\nTo get to this section:\n\n1. Look for your profile icon or menu at the top right.\n2. Click on **'Configuración'**.\n3. You'll see two sections in the side menu:\n   • **Cuenta** — your profile, email and password.\n   • **Usuarios** — system user management (ADMIN only).\n\n💡 If you don't see the **'Usuarios'** section, your role is **JUNTA** and you don't have access to that part.",
    },
  },

  // ── CAMBIAR USERNAME ─────────────────────────────────────
  {
    keywords: ["cambiar nombre usuario", "cambiar username", "editar perfil", "change username", "update profile", "nombre de usuario"],
    answer: {
      es: "👤 **Cambiar tu Nombre de Usuario**\n\n1. Ve a **Configuración → Cuenta**.\n2. En la parte superior verás tu avatar con tu nombre actual.\n3. Haz clic en el ícono de **lápiz** ✏️ junto a tu nombre.\n4. Escribe el nuevo nombre de usuario.\n5. Haz clic en **'Guardar'**.\n\n💡 El cambio se refleja inmediatamente en tu sesión.",
      en: "👤 **Change Your Username**\n\n1. Go to **Configuración → Cuenta**.\n2. At the top you'll see your avatar with your current name.\n3. Click the **pencil icon** ✏️ next to your name.\n4. Type the new username.\n5. Click **'Guardar'**.\n\n💡 The change is reflected immediately in your session.",
    },
  },

  // ── CAMBIAR CORREO ───────────────────────────────────────
  {
    keywords: ["cambiar correo", "cambiar email", "change email", "actualizar correo", "nuevo correo", "correo electrónico"],
    answer: {
      es: "📧 **Cambiar tu Correo Electrónico**\n\nPor seguridad, el cambio de correo requiere confirmación:\n\n1. Ve a **Configuración → Cuenta**.\n2. Busca la sección **'Correo'**.\n3. Escribe tu **nuevo correo** en el primer campo.\n4. Escribe el mismo correo en **'Confirmar nuevo correo'**.\n5. Haz clic en **'Enviar enlace'**.\n6. Revisa la bandeja de entrada del **nuevo correo** — te llegará un enlace de confirmación.\n7. Haz clic en el enlace del correo para confirmar el cambio.\n\n⚠️ Si no ves el correo, revisa la carpeta de spam.",
      en: "📧 **Change Your Email Address**\n\nFor security, changing your email requires confirmation:\n\n1. Go to **Configuración → Cuenta**.\n2. Find the **'Correo'** section.\n3. Enter your **new email** in the first field.\n4. Enter the same email in **'Confirmar nuevo correo'**.\n5. Click **'Enviar enlace'**.\n6. Check the inbox of the **new email** — you'll receive a confirmation link.\n7. Click the link in the email to confirm the change.\n\n⚠️ If you don't see the email, check the spam folder.",
    },
  },

  // ── CONFIRMAR CAMBIO DE CORREO ───────────────────────────
  {
    keywords: ["confirmar cambio correo", "confirmar email", "confirm email change", "enlace correo", "no llega correo", "link correo"],
    answer: {
      es: "📧 **Confirmar el Cambio de Correo**\n\nDespués de solicitar el cambio:\n\n1. Revisa la bandeja de entrada del **nuevo correo** que escribiste.\n2. Busca un correo del sistema con un enlace de confirmación.\n3. Haz clic en el botón **'Confirmar correo'** del correo.\n4. Se abre una página — haz clic en **'Confirmar correo'**.\n\n⚠️ Si no llegó el correo:\n• Revisa la carpeta de **spam o correo no deseado**.\n• Verifica que escribiste bien el nuevo correo.\n• Intenta enviar el enlace nuevamente.",
      en: "📧 **Confirm Email Change**\n\nAfter requesting the change:\n\n1. Check the inbox of the **new email** you entered.\n2. Look for a system email with a confirmation link.\n3. Click the **'Confirmar correo'** button in the email.\n4. A page opens — click **'Confirmar correo'**.\n\n⚠️ If the email didn't arrive:\n• Check the **spam or junk mail** folder.\n• Make sure you typed the new email correctly.\n• Try sending the link again.",
    },
  },

  // ── CAMBIAR CONTRASEÑA ───────────────────────────────────
  {
    keywords: ["cambiar contraseña", "change password", "actualizar contraseña", "nueva contraseña", "contraseña segura", "olvidé contraseña"],
    answer: {
      es: "🔒 **Cambiar tu Contraseña**\n\n1. Ve a **Configuración → Cuenta**.\n2. Busca la sección **'Contraseña'** (debajo de la sección de Correo).\n3. Escribe tu **contraseña actual**.\n4. Escribe la **nueva contraseña** — debe tener:\n   • Al menos 8 caracteres.\n   • Una letra mayúscula, una minúscula, un número y un símbolo.\n5. Confirma la nueva contraseña.\n6. Haz clic en **'Guardar'**.\n\n💡 Si olvidaste tu contraseña actual, usa la opción **'¿Olvidaste tu contraseña?'** en la pantalla de inicio de sesión.",
      en: "🔒 **Change Your Password**\n\n1. Go to **Configuración → Cuenta**.\n2. Find the **'Contraseña'** section (below the Email section).\n3. Enter your **current password**.\n4. Enter the **new password** — it must have:\n   • At least 8 characters.\n   • One uppercase letter, one lowercase, one number and one symbol.\n5. Confirm the new password.\n6. Click **'Guardar'**.\n\n💡 If you forgot your current password, use the **'¿Olvidaste tu contraseña?'** option on the login screen.",
    },
  },

  // ── VER USUARIOS ─────────────────────────────────────────
  {
    keywords: ["ver usuarios", "lista usuarios", "usuarios del sistema", "view users", "user list", "gestionar usuarios"],
    answer: {
      es: "👥 **Ver Usuarios del Sistema**\n\n1. Ve a **Configuración → Usuarios** (solo visible para ADMIN).\n2. Verás una tabla con todos los usuarios:\n   • **Usuario** — nombre de usuario.\n   • **Email** — correo electrónico.\n   • **Rol** — ADMIN (verde) o JUNTA (dorado).\n   • **Acciones** — interruptor para activar/desactivar.\n\n💡 Los roles no se pueden cambiar después de crear el usuario.",
      en: "👥 **View System Users**\n\n1. Go to **Configuración → Usuarios** (only visible to ADMIN).\n2. You'll see a table with all users:\n   • **Usuario** — username.\n   • **Email** — email address.\n   • **Rol** — ADMIN (green) or JUNTA (gold).\n   • **Acciones** — toggle to activate/deactivate.\n\n💡 Roles cannot be changed after the user is created.",
    },
  },

  // ── CREAR USUARIO ────────────────────────────────────────
  {
    keywords: ["crear usuario", "nuevo usuario", "agregar usuario", "create user", "add user", "registrar usuario"],
    answer: {
      es: "➕ **Crear un Nuevo Usuario**\n\n1. Ve a **Configuración → Usuarios**.\n2. Haz clic en el botón **'Crear'** (esquina superior derecha).\n3. Se abre un formulario — llena los campos:\n   • **Nombre de usuario** (ej: Junta Directiva)\n   • **Email**\n   • **Contraseña** (mínimo 8 caracteres, mayúscula, número y símbolo)\n   • **Confirmar contraseña**\n   • **Rol** — elige ADMIN o JUNTA\n4. Haz clic en **'Crear usuario'**.\n\n⚠️ El rol solo se define al crear — no se puede cambiar después.",
      en: "➕ **Create a New User**\n\n1. Go to **Configuración → Usuarios**.\n2. Click the **'Crear'** button (top right corner).\n3. A form opens — fill in the fields:\n   • **Nombre de usuario** (e.g.: Junta Directiva)\n   • **Email**\n   • **Contraseña** (min 8 characters, uppercase, number and symbol)\n   • **Confirmar contraseña**\n   • **Rol** — choose ADMIN or JUNTA\n4. Click **'Crear usuario'**.\n\n⚠️ The role is only set when creating — it cannot be changed afterwards.",
    },
  },

  // ── ACTIVAR / DESACTIVAR USUARIO ─────────────────────────
  {
    keywords: ["activar usuario", "desactivar usuario", "activate user", "deactivate user", "bloquear usuario", "habilitar usuario", "interruptor usuario"],
    answer: {
      es: "🔘 **Activar o Desactivar un Usuario**\n\n1. Ve a **Configuración → Usuarios**.\n2. Busca al usuario en la tabla.\n3. En la columna **'Acciones'**, hay un **interruptor**:\n   • Si está **verde (activo)** → el usuario puede iniciar sesión.\n   • Si está **gris (inactivo)** → el usuario NO puede iniciar sesión.\n4. Haz clic en el interruptor para cambiar el estado.\n5. Aparece una ventana de **confirmación** — confírmala.\n\n⚠️ Un usuario desactivado no puede acceder al sistema hasta que lo vuelvas a activar.",
      en: "🔘 **Activate or Deactivate a User**\n\n1. Go to **Configuración → Usuarios**.\n2. Find the user in the table.\n3. In the **'Acciones'** column, there is a **toggle switch**:\n   • If it's **green (active)** → the user can log in.\n   • If it's **gray (inactive)** → the user CANNOT log in.\n4. Click the toggle to change the status.\n5. A **confirmation** window appears — confirm it.\n\n⚠️ A deactivated user cannot access the system until you reactivate them.",
    },
  },

  // ── ROLES ────────────────────────────────────────────────
  {
    keywords: ["rol admin", "rol junta", "diferencia roles", "qué puede admin", "qué puede junta", "roles sistema", "admin vs junta", "user roles"],
    answer: {
      es: "🔐 **Roles del Sistema**\n\nEl sistema tiene dos roles:\n\n• **ADMIN** — acceso completo:\n  → Puede ver, crear, editar y gestionar todo el sistema.\n  → Accede a Usuarios en Configuración.\n  → Puede aprobar, rechazar y editar en todos los módulos.\n\n• **JUNTA** — acceso de solo lectura:\n  → Solo puede **ver** información.\n  → No puede crear, editar ni aprobar en ningún módulo.\n  → No ve la sección de Usuarios en Configuración.\n\n⚠️ El rol se asigna al crear el usuario y no se puede cambiar después.",
      en: "🔐 **System Roles**\n\nThe system has two roles:\n\n• **ADMIN** — full access:\n  → Can view, create, edit and manage everything.\n  → Access to Users in Settings.\n  → Can approve, reject and edit in all modules.\n\n• **JUNTA** — read-only access:\n  → Can only **view** information.\n  → Cannot create, edit or approve in any module.\n  → Does not see the Users section in Settings.\n\n⚠️ The role is assigned when creating the user and cannot be changed afterwards.",
    },
  },

  // ── CONTRASEÑA SEGURA ────────────────────────────────────
  {
    keywords: ["contraseña segura", "requisitos contraseña", "strong password", "password requirements", "cómo crear contraseña"],
    answer: {
      es: "🔑 **Requisitos de Contraseña Segura**\n\nLa contraseña debe cumplir:\n\n✅ Al menos **8 caracteres**\n✅ Al menos una **letra mayúscula** (A, B, C...)\n✅ Al menos una **letra minúscula** (a, b, c...)\n✅ Al menos un **número** (1, 2, 3...)\n✅ Al menos un **símbolo** (!, @, #, $...)\n✅ Máximo **75 caracteres**\n\nEjemplo válido: `MiClave2024!`",
      en: "🔑 **Strong Password Requirements**\n\nThe password must meet:\n\n✅ At least **8 characters**\n✅ At least one **uppercase letter** (A, B, C...)\n✅ At least one **lowercase letter** (a, b, c...)\n✅ At least one **number** (1, 2, 3...)\n✅ At least one **symbol** (!, @, #, $...)\n✅ Maximum **75 characters**\n\nValid example: `MiClave2024!`",
    },
  },

  // ── NO VEO USUARIOS ──────────────────────────────────────
  {
    keywords: ["no veo usuarios", "no aparece usuarios", "don't see users tab", "no tengo acceso usuarios", "falta sección usuarios"],
    answer: {
      es: "👁️ **No veo la sección de Usuarios**\n\nLa sección **'Usuarios'** en Configuración solo es visible para el rol **ADMIN**.\n\nSi tu rol es **JUNTA**, esta sección no aparece porque no tienes permiso para gestionarla.\n\n💡 Si crees que deberías tener acceso, contacta al administrador del sistema para que revise tu rol.",
      en: "👁️ **I don't see the Users section**\n\nThe **'Usuarios'** section in Settings is only visible for the **ADMIN** role.\n\nIf your role is **JUNTA**, this section doesn't appear because you don't have permission to manage it.\n\n💡 If you think you should have access, contact the system administrator to review your role.",
    },
  },
];

// ============================================================
// RELATED_QUESTIONS_SETTINGS
// ============================================================
export const RELATED_QUESTIONS_SETTINGS: Record<
  string,
  { es: string[]; en: string[]; keywords: string[] }
> = {
  cuenta: {
    keywords: ["cuenta", "perfil", "account", "profile", "username", "nombre usuario"],
    es: [
      "¿Cómo cambio mi nombre de usuario?",
      "¿Cómo cambio mi correo electrónico?",
      "¿Cómo cambio mi contraseña?",
      "¿Qué requisitos tiene la contraseña?",
    ],
    en: [
      "How do I change my username?",
      "How do I change my email?",
      "How do I change my password?",
      "What are the password requirements?",
    ],
  },
  correo: {
    keywords: ["correo", "email", "cambio correo", "confirmar correo", "email change"],
    es: [
      "¿Cómo cambio mi correo?",
      "¿Por qué tengo que confirmar el cambio de correo?",
      "No me llegó el correo de confirmación, ¿qué hago?",
      "¿Cuánto tiempo tarda en llegar el enlace de confirmación?",
    ],
    en: [
      "How do I change my email?",
      "Why do I need to confirm the email change?",
      "I didn't receive the confirmation email, what do I do?",
      "How long does it take for the confirmation link to arrive?",
    ],
  },
  usuarios: {
    keywords: ["usuario", "usuarios", "crear usuario", "rol", "activar usuario", "desactivar usuario"],
    es: [
      "¿Cómo creo un nuevo usuario?",
      "¿Cómo activo o desactivo un usuario?",
      "¿Puedo cambiar el rol de un usuario?",
      "¿Cuál es la diferencia entre ADMIN y JUNTA?",
    ],
    en: [
      "How do I create a new user?",
      "How do I activate or deactivate a user?",
      "Can I change a user's role?",
      "What is the difference between ADMIN and JUNTA?",
    ],
  },
  roles: {
    keywords: ["rol", "roles", "admin", "junta", "permisos", "role", "permissions"],
    es: [
      "¿Qué puede hacer el rol ADMIN?",
      "¿Qué puede hacer el rol JUNTA?",
      "¿Por qué no veo la sección de Usuarios?",
      "¿Se puede cambiar el rol de un usuario?",
    ],
    en: [
      "What can the ADMIN role do?",
      "What can the JUNTA role do?",
      "Why don't I see the Users section?",
      "Can a user's role be changed?",
    ],
  },
};