type ErrorStateProps = {
  error?: string | null;
  title?: string;
  message?: string;
};

export function ErrorState({
  error,
  title = "¡Ups! Ocurrió un problema",
  message = "No se pudo cargar la información.",
}: ErrorStateProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F5] px-6 text-center">
      <img
        src="/vaca2.png"
        alt="Error de conexión"
        className="mb-6 h-48 w-auto object-contain"
      />
      <h2 className="mb-2 text-2xl font-bold text-[#33361D]">
        {title}
      </h2>
      <p className="max-w-md text-slate-500">
        {message} {error && <span>{error}</span>}
      </p>
    </div>
  );
}
