import { ShieldAlert} from "lucide-react"

export default function ForbiddenPage() {

  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] px-6 py-10 pt-20">
      <div className="max-w-xl w-full text-center mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#FAF1DF] flex items-center justify-center border-2 border-[#A3853D]">
              <ShieldAlert className="w-10 h-10 text-[#A3853D]" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#fff9ec] border-2 border-[#A3853D] flex items-center justify-center shadow-lg">
              <span className="text-sm font-bold text-[#A3853D]">!</span>
            </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-[#2E321B] mb-3">
          Acceso denegado
        </h2>

        <h3 className="text-xl md:text-2xl font-semibold text-[#A3853D] mb-4">
          No tienes permisos para ver esta sección. 
        </h3>

        <div className="mb-6 flex justify-center">
          <img
            src="https://res.cloudinary.com/dyigmavwq/image/upload/v1770422997/pg9tvoxhldxnobr5ruaj.png"
            alt="Acceso denegado"
            className="h-36 w-36 object-contain md:h-40 md:w-40"
          />
        </div>
      </div>
    </div>
  )
}