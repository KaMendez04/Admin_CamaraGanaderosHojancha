import Swal from 'sweetalert2';

(function injectSwalCssOnce() {
  const id = 'swal2-default-styles';
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css';
  document.head.appendChild(link);

  const style = document.createElement('style');
  style.textContent = `
    .no-border-button { border: 0 !important; box-shadow: none !important; }
    div.swal2-popup { border-radius: 16px !important; }
    button.swal2-confirm, button.swal2-cancel { 
      border-radius: 9999px !important; 
      padding: 10px 24px !important; 
      font-weight: 600 !important; 
      font-size: 15px !important;
    }
  `;
  document.head.appendChild(style);
  
})();

// ─── Configuración base de apariencia (solo fondo + tipografía + icono) ───────

const LIGHT_BG = '#FAF9F5';
const COLOR_VERDE = '#708C3E';
const COLOR_ROJO = '#8C3A33';

const lightClass = {
  popup: 'camara-popup',
  title: 'camara-title',
  htmlContainer: 'camara-text',
  timerProgressBar: 'camara-progress',
};

const BaseSwal = Swal.mixin({
  background: LIGHT_BG,
  heightAuto: false,
  scrollbarPadding: false,

didOpen: () => {
  document.body.classList.add("overflow-hidden");
},

willClose: () => {
  document.body.classList.remove("overflow-hidden");
}
});

// ─── Login ────────────────────────────────────────────────────────────────────

export const showSuccessAlertLogin = (message: string) => {
  return BaseSwal.fire({
    icon: 'success',
    title: 'Inicio de sesión exitoso',
    text: message,
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    background: LIGHT_BG,
    backdrop: true,
    customClass: { ...lightClass, icon: 'camara-icon-success' },
    heightAuto: false,
    scrollbarPadding: false,
  });
};

export const showErrorAlertLogin = (message: string) => {
  return BaseSwal.fire({
    icon: 'error',
    title: 'Inicio de sesión fallido',
    text: message,
    confirmButtonColor: COLOR_ROJO,
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: { ...lightClass, confirmButton: 'no-border-button', icon: 'camara-icon-error' },
    background: LIGHT_BG,
    heightAuto: false,
    scrollbarPadding: false,
    backdrop: true,
  });
};

// ─── Registro ─────────────────────────────────────────────────────────────────

export const showSuccessAlertRegister = (message: string) => {
  return BaseSwal.fire({
    icon: 'success',
    title: 'Registro exitoso',
    text: message,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    background: LIGHT_BG,
    customClass: { ...lightClass, icon: 'camara-icon-success' },
    heightAuto: false,
    scrollbarPadding: false,
    backdrop: true,
  });
};

export const showErrorAlertEmpty = (message: string, title: string = 'Error') => {
  return BaseSwal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: COLOR_ROJO,
    background: LIGHT_BG,
    customClass: { ...lightClass, icon: 'camara-icon-error', confirmButton: 'no-border-button' },
    heightAuto: false,
    scrollbarPadding: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    backdrop: true,
  });
};

export const showErrorDuplicateEmail = (message: string) => {
  return BaseSwal.fire({
    icon: 'warning',
    title: 'Email duplicado',
    text: message,
    confirmButtonColor: COLOR_ROJO,
    customClass: { ...lightClass, confirmButton: 'no-border-button', icon: 'camara-icon-error' },
    background: LIGHT_BG,
    heightAuto: false,
    scrollbarPadding: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    backdrop: true,
  });
};

export const showWarningAlert = (message: string) => {
  return BaseSwal.fire({
    title: '¿Desea continuar?',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: COLOR_VERDE,
    cancelButtonColor: COLOR_ROJO,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: false,
    customClass: { ...lightClass, confirmButton: 'no-border-button', cancelButton: 'no-border-button', icon: 'camara-icon-error' },
    background: LIGHT_BG,
    heightAuto: false,
    scrollbarPadding: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    backdrop: true,
  });
};

export const showErrorAlertRegister = (message: string, title: string = 'Error') => {
  return BaseSwal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: COLOR_ROJO,
    customClass: { ...lightClass, confirmButton: 'no-border-button', icon: 'camara-icon-error' },
    background: LIGHT_BG,
    heightAuto: false,
    scrollbarPadding: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    backdrop: true,
  });
};

// ─── Confirmaciones ───────────────────────────────────────────────────────────

export const showConfirmAlert = async (title: string, text: string) => {
  const result = await BaseSwal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: COLOR_VERDE,
    cancelButtonColor: COLOR_ROJO,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar',
    reverseButtons: false,
    background: LIGHT_BG,
    customClass: { ...lightClass, confirmButton: 'no-border-button', cancelButton: 'no-border-button', icon: 'camara-icon-error' },
    heightAuto: false,
    scrollbarPadding: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    backdrop: true,
  });

  return result.isConfirmed;
};

export const showConfirmDeleteAlert = async (title: string, text: string, confirmButtonText: string = "Sí, eliminar") => {
  const result = await BaseSwal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: COLOR_ROJO,
    cancelButtonColor: COLOR_VERDE,
    confirmButtonText,
    cancelButtonText: "Cancelar",
    reverseButtons: false,
    background: LIGHT_BG,
    customClass: { ...lightClass, confirmButton: 'no-border-button', cancelButton: 'no-border-button', icon: "camara-icon-error" },
    heightAuto: false,
    scrollbarPadding: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    backdrop: true,
  });

  return result.isConfirmed;
};

export const showConfirmApproveRejectedAlert = async () => {
  const result = await BaseSwal.fire({
    title: 'Aprobar solicitud rechazada',
    text: '¿Estás seguro de querer aprobar a este solicitante que había sido rechazado?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: COLOR_VERDE,
    cancelButtonColor: COLOR_ROJO,
    confirmButtonText: 'Sí, aprobar',
    cancelButtonText: 'Cancelar',
    reverseButtons: false,
    background: LIGHT_BG,
    customClass: { ...lightClass, confirmButton: 'no-border-button', cancelButton: 'no-border-button', icon: 'camara-icon-error' },
    heightAuto: false,
    scrollbarPadding: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    backdrop: true,
  });

  return result.isConfirmed;
};

export const showConfirmOutAlert = async (title: string, text: string) => {
  const result = await BaseSwal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: COLOR_ROJO,
    cancelButtonColor: COLOR_VERDE,
    confirmButtonText: 'Sí, salir',
    cancelButtonText: 'Cancelar',
    reverseButtons: false,
    background: LIGHT_BG,
    customClass: { ...lightClass, confirmButton: 'no-border-button', cancelButton: 'no-border-button', icon: 'camara-icon-error' },
    heightAuto: false,
    scrollbarPadding: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    backdrop: true,
  });

  return result.isConfirmed;
};

// ─── Éxito genérico ───────────────────────────────────────────────────────────

export const showSuccessAlert = (message: string, title: string = 'Éxito') => {
  return BaseSwal.fire({
    icon: 'success',
    title,
    text: message,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    confirmButtonColor: COLOR_VERDE,
    background: LIGHT_BG,
    customClass: { ...lightClass, icon: 'camara-icon-success' },
    heightAuto: false,
    scrollbarPadding: false,
    backdrop: true,
  });
};

export const showSuccessDeleteAlert = (message: string) => {
  return BaseSwal.fire({
    icon: 'success',
    title: 'Eliminado con éxito',
    text: message,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    confirmButtonColor: COLOR_VERDE,
    background: LIGHT_BG,
    customClass: { ...lightClass, icon: 'camara-icon-success' },
    heightAuto: false,
    scrollbarPadding: false,
    backdrop: true,
  });
};