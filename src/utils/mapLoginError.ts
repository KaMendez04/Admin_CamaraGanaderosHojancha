function isAxiosErr(err: unknown): err is {
  isAxiosError?: boolean;
  message?: string;
  response?: { status?: number };
} {
  if (typeof err !== 'object' || err === null) return false;
  const e = err as any;
  // Es error de Axios si tiene isAxiosError O si tiene la estructura de response (para errores interceptados)
  return e.isAxiosError === true || (e.response && typeof e.response.status === 'number');
}

export function mapLoginError(err: unknown): string {
  console.log("DEBUG mapLoginError:", err);
  if (isAxiosErr(err)) {
    const status = err.response?.status;
    switch (status) {
      case 400:
      case 401:
        return 'Correo o contraseña incorrecta, inténtelo de nuevo.';
      case 404:
        return 'Correo o contraseña incorrecta, inténtelo de nuevo.';
      case 429:
        return 'Demasiados intentos. Intente nuevamente más tarde.';
      case 500:
        return 'Error interno del servidor.';
      default:
        return (err as any)?.message || 'Error inesperado. Inténtelo de nuevo.';
    }
  }
  // No es un error de Axios (red caída, CORS, servidor apagado, etc.)
  return 'No se pudo conectar con el servidor.';
}
