import { FileText, Clock } from "lucide-react"

export default function ManualesPage() {
  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] px-6 py-10 pt-20">
      <div className="max-w-xl w-full text-center mx-auto">
        {/* Icon container */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#FAF1DF] flex items-center justify-center border-2 border-[#A3853D]">
              <FileText className="w-10 h-10 text-[#A3853D]" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#fff9ec] border-2 border-[#A3853D] flex items-center justify-center shadow-lg">
              <Clock className="w-4 h-4 text-[#A3853D]" strokeWidth={2} />
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#2E321B] mb-3 text-balance">Próximamente</h1>

        <h2 className="text-xl md:text-2xl font-semibold text-[#A3853D] mb-4 text-balance">Manuales de Usuario</h2>

        <p className="text-base text-[#2E321B]/70 mb-6 leading-relaxed text-pretty max-w-lg mx-auto">
          Estamos trabajando en crear manuales completos y detallados para ayudarte a aprovechar al máximo nuestro
          sistema.
        </p>
</div>

    </div>
  )
}
