import { useState, useEffect } from "react"
import { showSuccessAlert, showSuccessDeleteAlert } from "../../../utils/alerts"
import { CustomSelect } from "../../../components/CustomSelect"
import { ActionButtons } from "../../../components/ActionButtons"

export default function FAQEditor({
  faqs,
  selectedFaqId,
  setSelectedFaqId,
  onUpdate,
  onDelete,
}: any) {
  const selectedFaq = faqs.find((faq: { id: any }) => faq.id === selectedFaqId) || null

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [initialQuestion, setInitialQuestion] = useState("")
  const [initialAnswer, setInitialAnswer] = useState("")
  const [hasChanges, setHasChanges] = useState(false)

  const MAX_Q = 75
  const MAX_A = 250

  useEffect(() => {
    if (selectedFaq) {
      setQuestion(selectedFaq.question)
      setAnswer(selectedFaq.answer)
      setInitialQuestion(selectedFaq.question)
      setInitialAnswer(selectedFaq.answer)
    } else {
      setQuestion("")
      setAnswer("")
      setInitialQuestion("")
      setInitialAnswer("")
    }
  }, [selectedFaq])

  useEffect(() => {
    if (selectedFaq) {
      const changed =
        question !== initialQuestion ||
        answer !== initialAnswer
      setHasChanges(changed)
    }
  }, [question, answer, initialQuestion, initialAnswer, selectedFaq])

  const handleSave = async () => {
    if (!selectedFaq) return

    setIsSaving(true)
    try {
      await onUpdate({
        id: selectedFaq.id,
        question,
        answer,
      })

      showSuccessAlert("Actualización completada")
      setInitialQuestion(question)
      setInitialAnswer(answer)
    } catch (err) {
      console.error("Error al guardar:", err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedFaq) return

    setIsDeleting(true)
    try {
      await onDelete(selectedFaq.id)
      showSuccessDeleteAlert("Eliminación completada")
      setSelectedFaqId(null)
    } catch (err) {
      console.error("Error al eliminar:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    setQuestion(initialQuestion)
    setAnswer(initialAnswer)
    setSelectedFaqId(null)
  }

  const faqOptions = faqs.map((faq: any) => ({
    value: faq.id,
    label: faq.question,
  }))

  const canSave = question.trim() !== "" && answer.trim() !== ""

  return (
    <section className="space-y-3 rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
      <div>
        <h2 className="text-lg font-semibold text-[#243018] md:text-xl">
          Editar pregunta frecuente
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Selecciona una pregunta para actualizarla o eliminarla.
        </p>
      </div>

      <CustomSelect
        value={selectedFaqId ?? ""}
        onChange={(value) => setSelectedFaqId(value ? Number(value) : null)}
        options={faqOptions}
        placeholder="Selecciona una pregunta para editar"
        searchable={true}
        searchPlaceholder="Buscar pregunta..."
      />

      {selectedFaq && (
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
              Pregunta <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Pregunta"
              maxLength={MAX_Q}
              disabled={isSaving || isDeleting}
            />
            <div className="mt-1 text-xs text-slate-500">
              Quedan {Math.max(0, MAX_Q - question.length)} de {MAX_Q} caracteres
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
              Respuesta <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              className="w-full resize-none rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Respuesta"
              maxLength={MAX_A}
              disabled={isSaving || isDeleting}
            />
            <div className="mt-1 text-xs text-slate-500">
              Quedan {Math.max(0, MAX_A - answer.length)} de {MAX_A} caracteres
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
              disabled={!canSave}
              isSaving={isSaving}
              isDeleting={isDeleting}
              requireConfirmCancel={hasChanges}
              requireConfirmDelete={true}
              cancelConfirmText="Los cambios no guardados se perderán."
              deleteConfirmTitle="¿Eliminar pregunta frecuente?"
              deleteConfirmText={`¿Está seguro que desea eliminar la pregunta "${selectedFaq.question}"? Esta acción no se puede deshacer.`}
              cancelText="Cancelar"
              saveText="Guardar cambios"
              deleteText="Eliminar"
            />
          </div>
        </div>
      )}
    </section>
  )
}