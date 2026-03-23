import React, { useEffect, useMemo, useRef, useState } from "react"
import { showSuccessAlert } from "../../../utils/alerts"
import { ActionButtons } from "../../../components/ActionButtons"
import { useCloudinaryUpload } from "../../../hooks/Cloudinary/useCloudinaryUpload"
import { Loader2, Upload } from "lucide-react"
import { cropToBlob, blobToFile } from "../../../utils/mediaBuildTransformed"

const CROP_W = 1200
const CROP_H = 630

export default function ServicesInformativeCreator({ onSubmit }: any) {
  const [title, setTitle] = useState("")
  const [cardDescription, setCardDescription] = useState("")
  const [modalDescription, setModalDescription] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [imageUrlDraft, setImageUrlDraft] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const upload = useCloudinaryUpload()
  const fileRef = useRef<HTMLInputElement>(null)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [localPreview, setLocalPreview] = useState<string>("")

  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const dragState = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
    pointerId: -1,
  })

  useEffect(() => {
    const changed =
      title.trim() !== "" ||
      cardDescription.trim() !== "" ||
      modalDescription.trim() !== "" ||
      imageUrlDraft.trim() !== "" ||
      images.length > 0 ||
      !!pendingFile
    setHasChanges(changed)
  }, [title, cardDescription, modalDescription, imageUrlDraft, images.length, pendingFile])

  useEffect(() => {
    setOffset({ x: 0, y: 0 })
  }, [localPreview, imageUrlDraft])

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview)
    }
  }, [localPreview])

  const previewSrc = useMemo(() => {
    if (pendingFile && localPreview) return localPreview
    return imageUrlDraft || ""
  }, [pendingFile, localPreview, imageUrlDraft])

  const positionAsPercent = useMemo(() => {
    if (!dragRef.current || !imageRef.current) return { x: 50, y: 50 }

    const container = dragRef.current.getBoundingClientRect()
    const img = imageRef.current

    const imgWidth = img.naturalWidth
    const imgHeight = img.naturalHeight
    if (!imgWidth || !imgHeight) return { x: 50, y: 50 }

    const containerRatio = container.width / container.height
    const imageRatio = imgWidth / imgHeight

    let renderedWidth: number, renderedHeight: number
    if (imageRatio > containerRatio) {
      renderedHeight = container.height
      renderedWidth = renderedHeight * imageRatio
    } else {
      renderedWidth = container.width
      renderedHeight = renderedWidth / imageRatio
    }

    const maxOffsetX = Math.max(0, (renderedWidth - container.width) / 2)
    const maxOffsetY = Math.max(0, (renderedHeight - container.height) / 2)

    const percentX = maxOffsetX > 0 ? 50 + (offset.x / maxOffsetX) * 50 : 50
    const percentY = maxOffsetY > 0 ? 50 - (offset.y / maxOffsetY) * 50 : 50

    return {
      x: Math.max(0, Math.min(100, percentX)),
      y: Math.max(0, Math.min(100, percentY)),
    }
  }, [offset])

  const handlePick = () => fileRef.current?.click()

  const onPickFile = (file: File | null) => {
    if (!file) return

    if (localPreview) URL.revokeObjectURL(localPreview)
    const obj = URL.createObjectURL(file)

    setPendingFile(file)
    setLocalPreview(obj)
    setImageUrlDraft("")
    setOffset({ x: 0, y: 0 })

    if (fileRef.current) fileRef.current.value = ""
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (!dragRef.current || !previewSrc) return

    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startOffsetX: offset.x,
      startOffsetY: offset.y,
      pointerId: e.pointerId,
    }

    const target = e.currentTarget as HTMLElement
    target.setPointerCapture(e.pointerId)
    e.preventDefault()
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return
    if (e.pointerId !== dragState.current.pointerId) return

    e.preventDefault()

    const dx = e.clientX - dragState.current.startX
    const dy = e.clientY - dragState.current.startY

    if (!dragRef.current || !imageRef.current) return

    const container = dragRef.current.getBoundingClientRect()
    const img = imageRef.current
    const imgWidth = img.naturalWidth
    const imgHeight = img.naturalHeight
    if (!imgWidth || !imgHeight) return

    const containerRatio = container.width / container.height
    const imageRatio = imgWidth / imgHeight

    let renderedWidth: number, renderedHeight: number
    if (imageRatio > containerRatio) {
      renderedHeight = container.height
      renderedWidth = renderedHeight * imageRatio
    } else {
      renderedWidth = container.width
      renderedHeight = renderedWidth / imageRatio
    }

    const maxOffsetX = Math.max(0, (renderedWidth - container.width) / 2)
    const maxOffsetY = Math.max(0, (renderedHeight - container.height) / 2)

    const newX = dragState.current.startOffsetX + dx
    const newY = dragState.current.startOffsetY + dy

    setOffset({
      x: Math.max(-maxOffsetX, Math.min(maxOffsetX, newX)),
      y: Math.max(-maxOffsetY, Math.min(maxOffsetY, newY)),
    })
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragState.current.pointerId === e.pointerId) {
      const target = e.currentTarget as HTMLElement
      try {
        target.releasePointerCapture(e.pointerId)
      } catch {}
      dragState.current.dragging = false
    }
  }

  const onPointerCancel = (e: React.PointerEvent) => {
    if (dragState.current.pointerId === e.pointerId) {
      const target = e.currentTarget as HTMLElement
      try {
        target.releasePointerCapture(e.pointerId)
      } catch {}
      dragState.current.dragging = false
    }
  }

  const uploadAsync = (file: File) =>
    new Promise<any>((resolve, reject) => {
      upload.mutate(file, {
        onSuccess: resolve,
        onError: reject,
      })
    })

  const addFromUrl = () => {
    const url = imageUrlDraft.trim()
    if (!url) return
    setImages((prev) => [...prev, url])
    setImageUrlDraft("")
    setOffset({ x: 0, y: 0 })
  }

  const addFromFile = async () => {
    if (!pendingFile || !localPreview) return
    try {
      const blob = await cropToBlob(localPreview, positionAsPercent, CROP_W, CROP_H)
      const croppedFile = blobToFile(blob, `service_${Date.now()}.jpg`)

      const asset = await uploadAsync(croppedFile)
      const url = asset?.url ?? asset?.secure_url
      if (!url) return

      setImages((prev) => [...prev, url])

      setPendingFile(null)
      if (localPreview) URL.revokeObjectURL(localPreview)
      setLocalPreview("")
      setOffset({ x: 0, y: 0 })
    } catch (e) {
      console.error("Error subiendo imagen:", e)
    }
  }

  const removeAt = (idx: number) => setImages((prev) => prev.filter((_, i) => i !== idx))

  const handleSave = async () => {
    if (!title.trim() || !cardDescription.trim() || !modalDescription.trim()) return

    setIsSaving(true)
    try {
      let finalImages = [...images]

      if (pendingFile && localPreview) {
        const blob = await cropToBlob(localPreview, positionAsPercent, CROP_W, CROP_H)
        const croppedFile = blobToFile(blob, `service_${Date.now()}.jpg`)
        const asset = await uploadAsync(croppedFile)
        const url = asset?.url ?? asset?.secure_url
        if (url) {
          finalImages.push(url)
        }
      } else if (imageUrlDraft.trim() !== "") {
        finalImages.push(imageUrlDraft.trim())
      }

      await onSubmit({
        title,
        cardDescription,
        modalDescription,
        images: finalImages,
      })

      setTitle("")
      setCardDescription("")
      setModalDescription("")
      setImages([])
      setImageUrlDraft("")
      setPendingFile(null)
      if (localPreview) URL.revokeObjectURL(localPreview)
      setLocalPreview("")
      setOffset({ x: 0, y: 0 })

      showSuccessAlert("Servicio creado exitosamente")
    } catch (err: any) {
      console.error("Error al guardar:", err?.response?.data ?? err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setTitle("")
    setCardDescription("")
    setModalDescription("")
    setImages([])
    setImageUrlDraft("")
    setPendingFile(null)
    if (localPreview) URL.revokeObjectURL(localPreview)
    setLocalPreview("")
    setOffset({ x: 0, y: 0 })
  }

  const canSave =
    title.trim() !== "" &&
    cardDescription.trim() !== "" &&
    modalDescription.trim() !== ""

  const canAdd = (!!pendingFile && !!localPreview) || imageUrlDraft.trim() !== ""

  return (
    <div className="space-y-3 rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
      <div className="mb-1">
        <h3 className="text-lg font-semibold text-[#243018] md:text-xl">
          Crear nuevo servicio
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Completa la información básica y agrega imágenes si lo necesitás.
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
          placeholder="Título del servicio"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={75}
          disabled={isSaving || upload.isPending}
        />
        <div className="mt-1 text-xs text-slate-500">
          Quedan {75 - title.length} de 75 caracteres
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
          Descripción de la tarjeta <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full resize-none rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
          rows={2}
          placeholder="Descripción breve que aparecerá en la tarjeta"
          value={cardDescription}
          onChange={(e) => setCardDescription(e.target.value)}
          maxLength={250}
          disabled={isSaving || upload.isPending}
        />
        <div className="mt-1 text-xs text-slate-500">
          Quedan {250 - cardDescription.length} de 250 caracteres
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
          Descripción del modal <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full resize-none rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
          rows={4}
          placeholder="Descripción detallada que aparecerá en el modal"
          value={modalDescription}
          onChange={(e) => setModalDescription(e.target.value)}
          maxLength={250}
          disabled={isSaving || upload.isPending}
        />
        <div className="mt-1 text-xs text-slate-500">
          Quedan {250 - modalDescription.length} de 250 caracteres
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#2F3C22]">
          Imagen (opcional)
        </label>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={handlePick}
            disabled={isSaving || upload.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm hover:bg-[#F7F8F3] disabled:opacity-60"
          >
            {isSaving || upload.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Elegir imagen
          </button>

          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
          />

          <input
            className="w-full flex-1 rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
            placeholder="...o pega una URL (https://...)"
            value={imageUrlDraft}
            onChange={(e) => {
              setImageUrlDraft(e.target.value)
              if (pendingFile) setPendingFile(null)
              if (localPreview) {
                URL.revokeObjectURL(localPreview)
                setLocalPreview("")
              }
            }}
            maxLength={1000}
            disabled={isSaving || upload.isPending}
          />
        </div>

        {previewSrc && (
          <div className="pt-1">
            <p className="mb-2 text-sm font-medium text-[#2F3C22]">
              Vista previa
            </p>

            <div
              ref={dragRef}
              className="relative w-full aspect-[1200/630] overflow-hidden rounded-xl border border-[#DCD6C9] bg-[#F8F9F3] cursor-grab active:cursor-grabbing"
              style={{ touchAction: "none", WebkitUserSelect: "none", userSelect: "none" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerCancel}
            >
              <img
                ref={imageRef}
                src={previewSrc}
                alt="Vista previa"
                className="h-full w-full object-cover select-none pointer-events-none"
                draggable={false}
                style={{
                  objectPosition: `${positionAsPercent.x}% ${positionAsPercent.y}%`,
                  transform: `translate(${offset.x}px, ${offset.y}px)`,
                }}
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = "none"
                }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-slate-500">
            La primera imagen será la portada.
          </span>

          <ActionButtons
            size="sm"
            showCreate={true}
            createText="Agregar imagen"
            onCreate={pendingFile ? addFromFile : addFromUrl}
            disabled={!canAdd || isSaving || upload.isPending}
            showText={true}
            isSaving={upload.isPending}
          />
        </div>

        {images.length > 0 && (
          <div className="space-y-2 pt-1">
            <p className="text-sm font-medium text-[#2F3C22]">
              Imágenes del servicio
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.map((url, idx) => (
                <div
                  key={`${url}-${idx}`}
                  className="overflow-hidden rounded-2xl border border-[#E7E2D7] bg-white p-2"
                >
                  <img
                    src={url}
                    className="h-20 w-full rounded-lg object-cover"
                    alt={`Imagen ${idx + 1}`}
                  />

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span
                      className={`text-xs ${
                        idx === 0 ? "font-semibold text-[#5B732E]" : "text-slate-400"
                      }`}
                    >
                      {idx === 0 ? "Portada" : "—"}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) => {
                            if (idx <= 0) return prev
                            const copy = [...prev]
                            const [item] = copy.splice(idx, 1)
                            copy.unshift(item)
                            return copy
                          })
                        }
                        disabled={idx === 0}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm leading-none ${
                          idx === 0
                            ? "border-[#5B732E] bg-[#5B732E] text-white"
                            : "border-[#5B732E] bg-white text-[#5B732E] hover:bg-[#EAEFE0]"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                        title={idx === 0 ? "Portada" : "Poner como portada"}
                        aria-label="Poner como portada"
                      >
                        ★
                      </button>

                      <button
                        type="button"
                        onClick={() => removeAt(idx)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#B85C4C] bg-white text-[#B85C4C] hover:bg-[#F8E3DE]"
                        title="Quitar"
                        aria-label="Quitar"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500">
              ★ = poner como portada.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-1">
        <ActionButtons
          size="sm"
          onSave={handleSave}
          onCancel={handleCancel}
          showCancel={true}
          showSave={true}
          showText={true}
          isSaving={isSaving || upload.isPending}
          disabled={!canSave}
          requireConfirmCancel={hasChanges}
          cancelConfirmText="Los datos ingresados se perderán."
          cancelText="Cancelar"
          saveText="Crear servicio"
        />
      </div>
    </div>
  )
}