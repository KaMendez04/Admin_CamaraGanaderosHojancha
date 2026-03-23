import { useState, useEffect } from "react"
import { showSuccessAlert } from "../../../utils/alerts"
import { ActionButtons } from "../../../components/ActionButtons"

export default function FAQCreator({ onSubmit }: any) {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const MAX_Q = 75
  const MAX_A = 250

  useEffect(() => {
    const changed = question.trim() !== "" || answer.trim() !== ""
    setHasChanges(changed)
  }, [question, answer])

  const handleSave = async () => {
    if (!question.trim() || !answer.trim()) return

    setIsSaving(true)
    try {
      await onSubmit({ question, answer })

      setQuestion("")
      setAnswer("")

      showSuccessAlert("Pregunta frecuente creada exitosamente")
    } catch (err) {
      console.error("Error al guardar:", err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setQuestion("")
    setAnswer("")
  }

  const canSave = question.trim() !== "" && answer.trim() !== ""

  return (
    <section className="space-y-3 rounded-[24px] border border-[#E6E0D2] bg-[#FCFDF9] p-4 md:p-5">
      <div>
        <h3 className="text-lg font-semibold text-[#243018] md:text-xl">
          Crear nueva pregunta frecuente
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Agrega una nueva pregunta y su respuesta para mostrarla públicamente.
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#2F3C22]">
          Pregunta <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full rounded-xl border border-[#D8DCCF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#A8B77A] focus:ring-2 focus:ring-[#DDE7C2]"
          placeholder="Escribe la pregunta"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={MAX_Q}
          disabled={isSaving}
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
          placeholder="Escribe la respuesta"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          maxLength={MAX_A}
          disabled={isSaving}
        />
        <div className="mt-1 text-xs text-slate-500">
          Quedan {Math.max(0, MAX_A - answer.length)} de {MAX_A} caracteres
        </div>
      </div>

      <div className="flex justify-end pt-1">
        <ActionButtons
          size="sm"
          onSave={handleSave}
          onCancel={handleCancel}
          showCancel={true}
          showSave={true}
          showText={true}
          isSaving={isSaving}
          disabled={!canSave}
          requireConfirmCancel={hasChanges}
          cancelConfirmText="Los datos ingresados se perderán."
          cancelText="Cancelar"
          saveText="Crear pregunta"
        />
      </div>
    </section>
  )
}