export function DefaultNotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF9F5] px-6 text-center">
      <img
        src="/vaca2.png"
        alt="Página no encontrada"
        className="mb-6 h-48 w-auto object-contain"
      />
      <h1 className="text-2xl font-bold text-[#33361D]">Página no encontrada</h1>
      <p className="mt-2 max-w-md text-slate-500">
        La ruta no existe o no tienes acceso.
      </p>
      <button
        onClick={() => window.location.assign("/Principal")}
        className="mt-6 inline-flex items-center rounded-lg bg-[#708C3E] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#5D741C]"
      >
        Volver al inicio
      </button>
    </div>
  );
}