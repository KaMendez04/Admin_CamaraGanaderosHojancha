import {
  Eye,
  CheckCircle,
  XCircle,
  Pencil,
  Trash2,
  ArrowLeft,
  Download,
  Upload,
  RefreshCw,
  Save,
  Plus,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";

type ActionButtonSize = "sm" | "md" | "lg";

type ActionButtonsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onApprove?: () => void;
  onReject?: () => void;

  onDelete?: () => void;
  onBack?: () => void;
  onDownload?: () => void;
  onUpload?: () => void;
  onRefresh?: () => void;
  onSave?: () => void;
  onCreate?: () => void;
  onSend?: () => void;
  onCancel?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;

  showEdit?: boolean;
  showApproveReject?: boolean;
  showDelete?: boolean;
  showBack?: boolean;
  showDownload?: boolean;
  showUpload?: boolean;
  showRefresh?: boolean;
  showSave?: boolean;
  showCreate?: boolean;
  showSend?: boolean;
  showCancel?: boolean;
  showPrevious?: boolean;
  showNext?: boolean;
  disabled?: boolean;

  isApproving?: boolean;
  isDeleting?: boolean;
  isSaving?: boolean;
  isUploading?: boolean;
  isLoading?: boolean;

  isReadOnly?: boolean;

  disablePrevious?: boolean;
  disableNext?: boolean;

  saveButtonType?: "button" | "submit";

  requireConfirmApprove?: boolean;
  requireConfirmReject?: boolean;
  requireConfirmDelete?: boolean;
  requireConfirmCancel?: boolean;
  requireConfirmSave?: boolean;

  approveConfirmTitle?: string;
  approveConfirmText?: string;
  rejectConfirmTitle?: string;
  rejectConfirmText?: string;
  deleteConfirmTitle?: string;
  deleteConfirmText?: string;
  cancelConfirmTitle?: string;
  cancelConfirmText?: string;
  saveConfirmTitle?: string;
  saveConfirmText?: string;

  showText?: boolean;
  size?: ActionButtonSize;

  saveText?: string;
  cancelText?: string;
  backText?: string;
  createText?: string;
  editText?: string;
  deleteText?: string;
  approveText?: string;
  rejectText?: string;
  previousText?: string;
  nextText?: string;
  downloadText?: string;
  uploadText?: string;
  refreshText?: string;
  sendText?: string;
  viewText?: string;

  onCreateAlt?: () => void;
  onCancelAlt?: () => void;

  showCreateAlt?: boolean;
  showCancelAlt?: boolean;

  requireConfirmCreateAlt?: boolean;
  requireConfirmCancelAlt?: boolean;

  createAltText?: string;
  cancelAltText?: string;

  createAltConfirmTitle?: string;
  createAltConfirmText?: string;
  cancelAltConfirmTitle?: string;
  cancelAltConfirmText?: string;
};

export function ActionButtons({
  onView,
  onEdit,
  onApprove,
  onReject,
  onDelete,
  onBack,
  onDownload,
  onUpload,
  onRefresh,
  onSave,
  onCreate,
  onSend,
  onCancel,
  onPrevious,
  onNext,

  disabled = false,
  showEdit = false,
  showApproveReject = false,
  showDelete = false,
  showBack = false,
  showDownload = false,
  showUpload = false,
  showRefresh = false,
  showSave = false,
  showCreate = false,
  showSend = false,
  showCancel = false,
  showPrevious = false,
  showNext = false,

  isApproving = false,
  isDeleting = false,
  isSaving = false,
  isUploading = false,
  isLoading = false,

  isReadOnly = false,

  disablePrevious = false,
  disableNext = false,

  saveButtonType = "button",

  requireConfirmApprove = false,
  requireConfirmReject = true,
  requireConfirmDelete = true,
  requireConfirmCancel = false,
  requireConfirmSave = false,

  approveConfirmTitle = "¿Aprobar?",
  approveConfirmText = "¿Desea aprobar esta solicitud?",
  rejectConfirmTitle = "¿Rechazar?",
  rejectConfirmText = "¿Desea rechazar esta solicitud?",
  deleteConfirmTitle = "¿Eliminar?",
  deleteConfirmText = "Esta acción no se puede deshacer.",
  cancelConfirmTitle = "¿Está seguro?",
  cancelConfirmText = "Los cambios no guardados se perderán.",
  saveConfirmTitle = "¿Guardar cambios?",
  saveConfirmText = "¿Está seguro que desea guardar los cambios?",

  showText = false,
  size = "md",

  saveText = "Guardar",
  cancelText = "Cancelar",
  backText = "Regresar",
  createText = "Crear",
  editText = "Editar",
  deleteText = "Eliminar",
  approveText = "Aprobar",
  rejectText = "Rechazar",
  previousText = "Anterior",
  nextText = "Siguiente",
  downloadText = "Descargar",
  uploadText = "Subir",
  refreshText = "Actualizar",
  sendText = "Enviar",
  viewText = "Ver",

  onCreateAlt,
  onCancelAlt,

  showCreateAlt = false,
  showCancelAlt = false,

  requireConfirmCreateAlt = false,
  requireConfirmCancelAlt = false,

  createAltText = "Crear",
  cancelAltText = "Cancelar",

  createAltConfirmTitle = "¿Crear?",
  createAltConfirmText = "¿Desea continuar?",
  cancelAltConfirmTitle = "¿Cancelar?",
  cancelAltConfirmText = "¿Desea continuar?",
}: ActionButtonsProps) {
  const swalBase = {
    background: "#FAF9F5",
    scrollbarPadding: false,
    heightAuto: false,
    focusConfirm: false,
    focusCancel: true,
    returnFocus: false,
    customClass: {
      popup: "rounded-2xl",
      confirmButton: "rounded-xl px-6 py-3 font-semibold",
      cancelButton: "rounded-xl px-6 py-3 font-semibold",
    },
  };

  const sizeMap = {
    sm: {
      icon: "h-4 w-4",
      iconOnly: "h-9 w-9",
      withText: "h-9 px-3 text-xs font-semibold",
      gap: "gap-1.5",
      wrapperGap: "gap-1.5",
    },
    md: {
      icon: "h-4.5 w-4.5",
      iconOnly: "h-10 w-10",
      withText: "h-10 px-3.5 text-sm font-semibold",
      gap: "gap-1.5",
      wrapperGap: "gap-2",
    },
    lg: {
      icon: "h-5 w-5",
      iconOnly: "h-11 w-11",
      withText: "h-11 px-4 text-sm font-semibold",
      gap: "gap-2",
      wrapperGap: "gap-2",
    },
  } as const;

  const current = sizeMap[size];
  const buttonSize = showText ? current.withText : current.iconOnly;
  const iconSize = current.icon;

  const baseGhost =
    "inline-flex items-center justify-center rounded-xl border border-[#DCE4CA] bg-[#FDFEF9] text-[#586174] transition hover:bg-[#F5F8EE] disabled:opacity-50 disabled:cursor-not-allowed";
  const basePrimary =
    "inline-flex items-center justify-center rounded-xl bg-[#5B732E] text-white transition hover:bg-[#51682A] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";
  const baseDanger =
    "inline-flex items-center justify-center rounded-xl border border-[#E7C8C3] bg-[#FFFDFC] text-[#A14B43] transition hover:bg-[#FCF1EF] disabled:opacity-50 disabled:cursor-not-allowed";
  const baseWarn =
    "inline-flex items-center justify-center rounded-xl border border-[#E6D8A8] bg-[#FFFDF7] text-[#9B7A29] transition hover:bg-[#FFF7E8] disabled:opacity-50 disabled:cursor-not-allowed";
  const baseSuccessSoft =
    "inline-flex items-center justify-center rounded-xl border border-[#D6E3B2] bg-[#FBFDF7] text-[#5F7728] transition hover:bg-[#F2F7E7] disabled:opacity-50 disabled:cursor-not-allowed";

  const handleApprove = async () => {
    if (requireConfirmApprove) {
      const result = await Swal.fire({
        ...swalBase,
        title: approveConfirmTitle,
        text: approveConfirmText,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#6F8C1F",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, aprobar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) onApprove?.();
    } else {
      onApprove?.();
    }
  };

  const handleReject = async () => {
    if (requireConfirmReject) {
      const result = await Swal.fire({
        ...swalBase,
        title: rejectConfirmTitle,
        text: rejectConfirmText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#5B732E",
        confirmButtonText: "Sí, rechazar",
        cancelButtonText: "Cancelar",
        allowOutsideClick: false,
        allowEscapeKey: true,
        stopKeydownPropagation: false,
      });
      if (result.isConfirmed) onReject?.();
    } else {
      onReject?.();
    }
  };

  const handleDelete = async () => {
    if (requireConfirmDelete) {
      const result = await Swal.fire({
        ...swalBase,
        title: deleteConfirmTitle,
        text: deleteConfirmText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#B85C4C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) onDelete?.();
    } else {
      onDelete?.();
    }
  };

  const handleCancel = async () => {
    if (requireConfirmCancel) {
      const result = await Swal.fire({
        ...swalBase,
        title: cancelConfirmTitle,
        text: cancelConfirmText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#5B732E",
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "No, continuar",
      });
      if (result.isConfirmed) onCancel?.();
    } else {
      onCancel?.();
    }
  };

  const handleSave = async () => {
    if (requireConfirmSave) {
      const result = await Swal.fire({
        ...swalBase,
        title: saveConfirmTitle,
        text: saveConfirmText,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#5B732E",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) onSave?.();
    } else {
      onSave?.();
    }
  };

  const handleCreateAlt = async () => {
    if (requireConfirmCreateAlt) {
      const result = await Swal.fire({
        ...swalBase,
        title: createAltConfirmTitle,
        text: createAltConfirmText,
        icon: "question",
        iconColor: "#C19A3D",
        showCancelButton: true,
        confirmButtonColor: "#5B732E",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, crear",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) onCreateAlt?.();
    } else {
      onCreateAlt?.();
    }
  };

  const handleCancelAlt = async () => {
    if (requireConfirmCancelAlt) {
      const result = await Swal.fire({
        ...swalBase,
        title: cancelAltConfirmTitle,
        text: cancelAltConfirmText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#5B732E",
        confirmButtonText: "Sí, cerrar",
        cancelButtonText: "No, continuar",
      });
      if (result.isConfirmed) onCancelAlt?.();
    } else {
      onCancelAlt?.();
    }
  };

  return (
    <div className={`flex flex-wrap items-center justify-center ${current.wrapperGap}`}>
      {showPrevious && onPrevious && (
        <button
          type="button"
          onClick={onPrevious}
          disabled={disablePrevious || disabled}
          className={`${baseGhost} ${buttonSize} ${current.gap}`}
          title="Anterior"
          aria-label="Anterior"
        >
          <ChevronLeft className={iconSize} />
          {showText && <span>{previousText}</span>}
        </button>
      )}

      {showNext && onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={disableNext || disabled}
          className={`${basePrimary} ${buttonSize} ${current.gap}`}
          title="Siguiente"
          aria-label="Siguiente"
        >
          {showText && <span>{nextText}</span>}
          <ChevronRight className={iconSize} />
        </button>
      )}

      {onView && (
        <button
          type="button"
          onClick={onView}
          className={`${baseGhost} ${buttonSize} ${current.gap}`}
          title="Ver detalles"
          aria-label="Ver detalles"
        >
          <Eye className={iconSize} />
          {showText && <span>{viewText}</span>}
        </button>
      )}

      {showEdit && onEdit && !isReadOnly && (
        <button
          type="button"
          onClick={onEdit}
          className={`${baseWarn} ${buttonSize} ${current.gap}`}
          title="Editar"
          aria-label="Editar"
        >
          <Pencil className={iconSize} />
          {showText && <span>{editText}</span>}
        </button>
      )}

      {showSave && onSave && !isReadOnly && (
        <button
          type={saveButtonType}
          onClick={saveButtonType === "button" ? handleSave : undefined}
          disabled={isSaving || disabled}
          className={`${basePrimary} ${buttonSize} ${current.gap}`}
          title="Guardar"
          aria-label="Guardar"
        >
          {isSaving ? <Loader2 className={`${iconSize} animate-spin`} /> : <Save className={iconSize} />}
          {showText && <span>{isSaving ? "Guardando..." : saveText}</span>}
        </button>
      )}

      {showCancel && onCancel && (
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSaving}
          className={`${baseGhost} ${buttonSize} ${current.gap}`}
          title="Cancelar"
          aria-label="Cancelar"
        >
          <X className={iconSize} />
          {showText && <span>{cancelText}</span>}
        </button>
      )}

      {showCreate && onCreate && !isReadOnly && (
        <button
          type="button"
          onClick={onCreate}
          disabled={isSaving || disabled}
          className={`${basePrimary} ${buttonSize} ${current.gap}`}
          title="Crear"
          aria-label="Crear"
        >
          <Plus className={iconSize} />
          {showText && <span>{createText}</span>}
        </button>
      )}

      {showCancelAlt && onCancelAlt && (
        <button
          type="button"
          onClick={handleCancelAlt}
          disabled={isSaving}
          className={`${baseWarn} ${showText ? `${current.withText} w-full sm:w-auto` : current.iconOnly} ${current.gap}`}
          title={cancelAltText}
          aria-label={cancelAltText}
        >
          <XCircle className={iconSize} />
          {showText && <span>{cancelAltText}</span>}
        </button>
      )}

      {showCreateAlt && onCreateAlt && !isReadOnly && (
        <button
          type="button"
          onClick={handleCreateAlt}
          disabled={isSaving || disabled}
          className={`${basePrimary} ${showText ? `${current.withText} w-full sm:w-auto` : current.iconOnly} ${current.gap}`}
          title={createAltText}
          aria-label={createAltText}
        >
          <Plus className={iconSize} />
          {showText && <span>{createAltText}</span>}
        </button>
      )}

      {showSend && onSend && !isReadOnly && (
        <button
          type="button"
          onClick={onSend}
          disabled={isSaving || disabled}
          className={`${basePrimary} ${buttonSize} ${current.gap}`}
          title="Enviar"
          aria-label="Enviar"
        >
          <Send className={iconSize} />
          {showText && <span>{sendText}</span>}
        </button>
      )}

      {showApproveReject && !isReadOnly && (
        <>
          {onApprove && (
            <button
              type="button"
              onClick={handleApprove}
              disabled={isApproving}
              className={`${baseSuccessSoft} ${buttonSize} ${current.gap}`}
              title="Aprobar"
              aria-label="Aprobar"
            >
              {isApproving ? <Loader2 className={`${iconSize} animate-spin`} /> : <CheckCircle className={iconSize} />}
              {showText && <span>{approveText}</span>}
            </button>
          )}

          {onReject && (
            <button
              type="button"
              onClick={handleReject}
              className={`${baseDanger} ${buttonSize} ${current.gap}`}
              title="Rechazar"
              aria-label="Rechazar"
            >
              <XCircle className={iconSize} />
              {showText && <span>{rejectText}</span>}
            </button>
          )}
        </>
      )}

      {showDelete && onDelete && !isReadOnly && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting || disabled}
          className={`${baseDanger} ${buttonSize} ${current.gap}`}
          title="Eliminar"
          aria-label="Eliminar"
        >
          {isDeleting ? <Loader2 className={`${iconSize} animate-spin`} /> : <Trash2 className={iconSize} />}
          {showText && <span>{deleteText}</span>}
        </button>
      )}

      {showDownload && onDownload && (
        <button
          type="button"
          onClick={onDownload}
          disabled={isLoading || disabled}
          className={`${baseGhost} ${buttonSize} ${current.gap}`}
          title="Descargar"
          aria-label="Descargar"
        >
          {isLoading ? <Loader2 className={`${iconSize} animate-spin`} /> : <Download className={iconSize} />}
          {showText && <span>{downloadText}</span>}
        </button>
      )}

      {showUpload && onUpload && !isReadOnly && (
        <button
          type="button"
          onClick={onUpload}
          disabled={isUploading || disabled}
          className={`${baseGhost} ${buttonSize} ${current.gap}`}
          title="Subir"
          aria-label="Subir"
        >
          {isUploading ? <Loader2 className={`${iconSize} animate-spin`} /> : <Upload className={iconSize} />}
          {showText && <span>{uploadText}</span>}
        </button>
      )}

      {showRefresh && onRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading || disabled}
          className={`${baseGhost} ${buttonSize} ${current.gap}`}
          title="Actualizar"
          aria-label="Actualizar"
        >
          {isLoading ? <Loader2 className={`${iconSize} animate-spin`} /> : <RefreshCw className={iconSize} />}
          {showText && <span>{refreshText}</span>}
        </button>
      )}

      {showBack && onBack && (
        <button
          type="button"
          onClick={onBack}
          disabled={disabled}
          className={`${baseGhost} ${buttonSize} ${current.gap}`}
          title="Regresar"
          aria-label="Regresar"
        >
          <ArrowLeft className={iconSize} />
          {showText && <span>{backText}</span>}
        </button>
      )}
    </div>
  );
}