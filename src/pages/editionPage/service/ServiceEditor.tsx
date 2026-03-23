import React, { useEffect, useMemo, useRef, useState } from "react"
import { showSuccessAlert, showSuccessDeleteAlert } from "../../../utils/alerts"
import { CustomSelect } from "../../../components/CustomSelect"
import { ActionButtons } from "../../../components/ActionButtons"
import { useCloudinaryUpload } from "../../../hooks/Cloudinary/useCloudinaryUpload"
import { cropToBlob, blobToFile } from "../../../utils/mediaBuildTransformed"
import { StarIcon, XCircle } from "lucide-react"

const CROP_W = 1200
const CROP_H = 630

export default function ServicesInformativeEditor({
  items,
  selectedId,
  setSelectedId,
  onUpdate,
  onDelete,
}: any) {
  const selected = items.find((i: any) => i.id === selectedId) ?? null

  const [title, setTitle] = useState("")
  const [cardDescription, setCardDescription] = useState("")
  const [modalDescription, setModalDescription] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [imageUrlDraft, setImageUrlDraft] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [initialTitle, setInitialTitle] = useState("")
  const [initialCardDescription, setInitialCardDescription] = useState("")
  const [initialModalDescription, setInitialModalDescription] = useState("")
  const [initialImages, setInitialImages] = useState<string[]>([])
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
    if (selected) {
      setTitle(selected.title)
      setCardDescription(selected.cardDescription)
      setModalDescription(selected.modalDescription)
      const selImages = Array.isArray(selected.images) ? selected.images : []
      setImages(selImages)
      setActiveIndex(0)
      setInitialTitle(selected.title)
      setInitialCardDescription(selected.cardDescription)
      setInitialModalDescription(selected.modalDescription)
      setInitialImages(selImages)
      setImageUrlDraft("")
      setPendingFile(null)
      if (localPreview) URL.revokeObjectURL(localPreview)
      setLocalPreview("")
      setOffset({ x: 0, y: 0 })
    } else {
      setTitle("")
      setCardDescription("")
      setModalDescription("")
      setImages([])
      setActiveIndex(0)
      setInitialTitle("")
      setInitialCardDescription("")
      setInitialModalDescription("")
      setInitialImages([])
      setImageUrlDraft("")
      setPendingFile(null)
      if (localPreview) URL.revokeObjectURL(localPreview)
      setLocalPreview("")
      setOffset({ x: 0, y: 0 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  useEffect(() => {
    if (!selected) return
    const changed =
      title !== initialTitle ||
      cardDescription !== initialCardDescription ||
      modalDescription !== initialModalDescription ||
      imageUrlDraft.trim() !== "" ||
      JSON.stringify(images) !== JSON.stringify(initialImages) ||
      !!pendingFile
    setHasChanges(changed)
  }, [
    title,
    cardDescription,
    modalDescription,
    imageUrlDraft,
    images,
    initialTitle,
    initialCardDescription,
    initialModalDescription,
    initialImages,
    pendingFile,
    selected,
  ])

  useEffect(() => {
    setOffset({ x: 0, y: 0 })
  }, [localPreview, imageUrlDraft, activeIndex])

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview)
    }
  }, [localPreview])

  const handlePick = () => fileRef.current?.click()

  const onPickFile = (file: File | null) => {
    if (!file) return
    if (localPreview) URL.revokeObjectURL(localPreview)
    const obj = URL.createObjectURL(file)
    setPendingFile(file)
    setLocalPreview(obj)
    setOffset({ x: 0, y: 0 })
    setImageUrlDraft("")
    if (fileRef.current) fileRef.current.value = ""
  }

  const previewSrc = useMemo(() => {
    if (pendingFile && localPreview) return localPreview
    if (imageUrlDraft.trim()) return imageUrlDraft.trim()
    return images[activeIndex] || images[0] || ""
  }, [pendingFile, localPreview, imageUrlDraft, images, activeIndex])

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
      upload.mutate(file, { onSuccess: resolve, onError: reject })
    })

  const addFromUrl = () => {
    const url = imageUrlDraft.trim()
    if (!url) return
    setImages((prev) => {
      const next = [...prev, url]
      setActiveIndex(next.length - 1)
      return next
    })
    setImageUrlDraft("")
    setOffset({ x: 0, y: 0 })
  }

  const addFromFile = async () => {
    if (!pendingFile || !localPreview) return
    try {
      const blob = await cropToBlob(localPreview, positionAsPercent, CROP_W, CROP_H)
      const croppedFile = blobToFile(blob, `service_${selected?.id ?? "x"}_${Date.now()}.jpg`)
      const asset = await uploadAsync(croppedFile)
      const url = asset?.url ?? asset?.secure_url
      if (!url) return
      setImages((prev) => {
        const next = [...prev, url]
        setActiveIndex(next.length - 1)
        return next
      })
      setPendingFile(null)
      if (localPreview) URL.revokeObjectURL(localPreview)
      setLocalPreview("")
      setOffset({ x: 0, y: 0 })
    } catch (e) {
      console.error("Error subiendo imagen:", e)
    }
  }

  const clearDraft = () => {
    setImageUrlDraft("")
    setPendingFile(null)
    if (localPreview) URL.revokeObjectURL(localPreview)
    setLocalPreview("")
    setOffset({ x: 0, y: 0 })
  }

  const removeAt = (idx: number) => {
    setImages((prev) => {
      const next = prev.filter((_, i) => i !== idx)
      setActiveIndex((prevIdx) => {
        if (next.length === 0) return 0
        if (idx === 0) return 0
        if (prevIdx >= idx) return Math.max(0, prevIdx - 1)
        return Math.min(prevIdx, next.length - 1)
      })
      return next
    })
  }

  const setAsCover = (idx: number) => {
    setImages((prev) => {
      if (idx <= 0 || idx >= prev.length) return prev
      const copy = [...prev]
      const [item] = copy.splice(idx, 1)
      copy.unshift(item)
      return copy
    })
    setActiveIndex(0)
  }

  const canAdd = (!!pendingFile && !!localPreview) || imageUrlDraft.trim() !== ""

  const handleSave = async () => {
    if (!selected) return
    setIsSaving(true)
    try {
      let finalImages = [...images]
      if (pendingFile && localPreview) {
        const blob = await cropToBlob(localPreview, positionAsPercent, CROP_W, CROP_H)
        const croppedFile = blobToFile(blob, `service_${selected?.id ?? "x"}_${Date.now()}.jpg`)
        const asset = await uploadAsync(croppedFile)
        const url = asset?.url ?? asset?.secure_url
        if (url) finalImages.push(url)
      } else if (imageUrlDraft.trim() !== "") {
        finalImages.push(imageUrlDraft.trim())
      }

      await onUpdate({
        id: selected.id,
        title,
        cardDescription,
        modalDescription,
        images: finalImages,
      })

      showSuccessAlert("Actualización completada")
      setInitialTitle(title)
      setInitialCardDescription(cardDescription)
      setInitialModalDescription(modalDescription)
      setInitialImages(finalImages)
      setImages(finalImages)
      clearDraft()
    } catch (err) {
      console.error("Error al guardar:", err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selected) return
    setIsDeleting(true)
    try {
      await onDelete(selected.id)
      showSuccessDeleteAlert("Eliminación completada")
      setSelectedId(null)
    } catch (err) {
      console.error("Error al eliminar:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    setTitle(initialTitle)
    setCardDescription(initialCardDescription)
    setModalDescription(initialModalDescription)
    setImages(initialImages)
    setActiveIndex(0)
    clearDraft()
    setSelectedId(null)
  }

  const serviceOptions = items.map((s: any) => ({ value: s.id, label: s.title }))

  return (
    <div className="space-y-4 rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
      <div className="mb-1">
        <h2 className="text-lg font-semibold text-[#243018] md:text-xl">
          Editar servicio existente
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Seleccioná un servicio para actualizarlo o eliminarlo.
        </p>
      </div>

      <CustomSelect
        value={selectedId ?? ""}
        onChange={(value) => setSelectedId(value ? Number(value) : null)}
        options={serviceOptions}
        placeholder="Selecciona un servicio"
        searchable={true}
        searchPlaceholder="Buscar servicio..."
      />

      {selected && (
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
                  Título
                </label>
                <input
                  className="w-full rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título"
                  maxLength={75}
                  disabled={isSaving || isDeleting || upload.isPending}
                />
                <div className="mt-1 text-xs text-slate-500">
                  Quedan {75 - title.length} de 75 caracteres
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
                  Descripción de la tarjeta
                </label>
                <textarea
                  className="w-full resize-none rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
                  rows={2}
                  value={cardDescription}
                  onChange={(e) => setCardDescription(e.target.value)}
                  placeholder="Descripción de la tarjeta"
                  maxLength={250}
                  disabled={isSaving || isDeleting || upload.isPending}
                />
                <div className="mt-1 text-xs text-slate-500">
                  Quedan {250 - cardDescription.length} de 250 caracteres
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
                  Descripción del modal
                </label>
                <textarea
                  className="w-full resize-none rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
                  rows={4}
                  value={modalDescription}
                  onChange={(e) => setModalDescription(e.target.value)}
                  placeholder="Descripción del modal"
                  maxLength={250}
                  disabled={isSaving || isDeleting || upload.isPending}
                />
                <div className="mt-1 text-xs text-slate-500">
                  Quedan {250 - modalDescription.length} de 250 caracteres
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
                  Imágenes (portada = primera)
                </label>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handlePick}
                    disabled={isSaving || isDeleting || upload.isPending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm hover:bg-[#F7F8F3] disabled:opacity-60 sm:w-auto"
                  >
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
                    value={imageUrlDraft}
                    onChange={(e) => {
                      setImageUrlDraft(e.target.value)
                      if (pendingFile) setPendingFile(null)
                      if (localPreview) {
                        URL.revokeObjectURL(localPreview)
                        setLocalPreview("")
                      }
                    }}
                    placeholder="...o pega una URL (https://...)"
                    maxLength={1000}
                    disabled={isSaving || isDeleting || upload.isPending}
                  />
                </div>
              </div>

              {previewSrc && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#2F3C22]">
                    Vista previa
                  </label>

                  <div
                    ref={dragRef}
                    className="relative aspect-[1200/630] w-full overflow-hidden rounded-xl border border-[#DCD6C9] bg-[#F8F9F3] cursor-grab active:cursor-grabbing"
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
                      onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                  </div>

                  <div className="flex justify-end">
                    <ActionButtons
                      size="sm"
                      showCreate={true}
                      createText="Agregar imagen"
                      onCreate={pendingFile ? addFromFile : addFromUrl}
                      disabled={!canAdd || isSaving || isDeleting || upload.isPending}
                      showText={true}
                      isSaving={upload.isPending}
                    />
                  </div>
                </div>
              )}

              {images.length > 0 && (
                <div className="space-y-2 ">
                  <p className="text-sm font-medium text-[#2F3C22]">
                    Imágenes actuales
                    {images.length > 1 ? ` (${activeIndex + 1}/${images.length})` : ""}
                  </p>

                  <div className="flex flex-wrap gap-2 border border-[#E7E2D7] rounded-2xl">
                    {images.map((url, idx) => (
                      <div
                        key={`${url}-${idx}`}
                        className="overflow-hidden rounded-2xl border border-[#E7E2D7] bg-white p-2"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          className="w-full overflow-hidden rounded-lg"
                          title="Ver en grande"
                        >
                          <img
                            src={url}
                            className="h-20 w-full rounded-lg object-cover sm:h-24"
                            alt={`Imagen ${idx + 1}`}
                          />
                        </button>

                        <div className="mt-2 flex items-center justify-between gap-2">
                          <span
                            className={`text-xs ${
                              idx === 0 ? "font-semibold text-[#5B732E]" : "text-slate-400"
                            }`}
                          >
                            {idx === 0 ? "Portada" : ""}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setAsCover(idx)}
                              disabled={idx === 0}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm leading-none ${
                                idx === 0
                                  ? "border-[#5B732E] bg-[#5B732E] text-white"  
                                  : "border-[#5B732E] bg-white text-[#5B732E] hover:bg-[#EAEFE0]"
                              } disabled:cursor-not-allowed disabled:opacity-60`}
                              title={idx === 0 ? "Portada" : "Poner como portada"}
                              aria-label="Poner como portada"
                            >
                              <StarIcon className={`h-4 w-4 ${idx === 0 ? "fill-white" : "fill-[#5B732E]"}`} />
                            </button>

                            <button
                              type="button"
                              onClick={() => removeAt(idx)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#B85C4C] bg-white text-[#B85C4C] hover:bg-[#F8E3DE]"
                              title="Quitar"
                              aria-label="Quitar"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500">
                    ★ = Seleccionar como portada.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <ActionButtons
              size="sm"
              onCancel={handleCancel}
              onSave={handleSave}
              onDelete={handleDelete}
              showCancel={true}
              showSave={true}
              showDelete={true}
              showText={true}
              isSaving={isSaving || upload.isPending}
              isDeleting={isDeleting}
              requireConfirmCancel={hasChanges}
              requireConfirmDelete={true}
              cancelConfirmText="Los cambios no guardados se perderán."
              deleteConfirmTitle="¿Eliminar servicio?"
              deleteConfirmText={`¿Está seguro que desea eliminar el servicio "${selected.title}"? Esta acción no se puede deshacer.`}
              cancelText="Cancelar"
              saveText="Guardar cambios"
              deleteText="Eliminar"
            />
          </div>
        </div>
      )}
    </div>
  )
}