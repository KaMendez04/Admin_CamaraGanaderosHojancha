import type { Lang } from "@/components/chatbot/ChatBotBank";

export const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY ?? "";

export type Role = "bot" | "user";

export interface Message {
  id: number;
  role: Role;
  text: string;
  timestamp: Date;
}


const SYSTEM_PROMPT = `Eres un asistente profesional para un sistema administrativo de presupuesto llamado "Sistema de Presupuesto".
El sistema tiene las siguientes secciones:
- Inicio: resumen general con totales de ingresos, egresos y saldo.
- Ingresos: registro de ingresos reales (departamento → tipo → subtipo → fecha → monto).
- Egresos: registro de egresos reales (misma estructura que ingresos).
- Proyección de Ingresos: estimaciones de ingresos esperados.
- Proyección de Egresos: estimaciones de gastos planeados.
- Extraordinarios: movimientos especiales (donaciones, rifas) con saldo asignable a ingresos.
- Reportes: comparación real vs proyectado, exportación PDF y Excel, con filtros por fecha, departamento, tipo, subtipo.
- Catálogos: administración de tipos y subtipos de ingresos/egresos.
- Año Fiscal: selector y gestión del año activo.

Reglas:
- Responde SIEMPRE en el idioma que el usuario ha seleccionado manualmente (español o inglés).
- Usa lenguaje claro y sencillo — los usuarios pueden no tener experiencia con computadoras.
- Usa listas con viñetas para estructurar respuestas.
- Da pasos numerados cuando expliques un proceso.
- Si no sabes algo, di "No tengo información sobre eso. Por favor contacta al administrador del sistema."
- Máximo 200 palabras por respuesta.`;

// ============================================================
// GROQ FALLBACK
// ============================================================

export async function callGroq(userMessage: string, _history: Message[], lang: Lang): Promise<string> {
  if (!GROQ_API_KEY) {
    return lang === "es"
      ? "⚠️ No se encontró VITE_GROQ_API_KEY en el .env"
      : "⚠️ VITE_GROQ_API_KEY was not found in .env";
  }

  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    {
      role: "user",
      content:
        lang === "es"
          ? `Responde únicamente en español y de forma clara.\n\n${userMessage}`
          : `Respond only in English and clearly.\n\n${userMessage}`,
    },
  ];

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.3,
      max_tokens: 300,
    }),
  });

  const raw = await res.text();
  console.log("Groq status:", res.status);
  console.log("Groq raw response:", raw);

  if (!res.ok) {
    return lang === "es"
      ? `⚠️ Groq devolvió ${res.status}. Revisa la consola.`
      : `⚠️ Groq returned ${res.status}. Check the console.`;
  }

  const data = JSON.parse(raw);
  return data?.choices?.[0]?.message?.content ?? "Sin respuesta.";
}