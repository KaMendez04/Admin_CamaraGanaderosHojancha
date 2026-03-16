import type { Lang } from "@/components/chatbot/banks/Home&BankBudget";

export const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY ?? "";

export type Role = "bot" | "user";

export interface Message {
  id: number;
  role: Role;
  text: string;
  timestamp: Date;
}


const BASE_RULES = `
Eres un asistente de ayuda para un sistema administrativo interno.

Reglas estrictas:
- Responde ÚNICAMENTE sobre lo que describe el contexto del módulo actual que se te indica abajo.
- Si la pregunta del usuario no tiene relación con ese contexto, responde: "No tengo información sobre eso en este módulo. Por favor navega al módulo correspondiente o contacta al administrador."
- NO inventes funcionalidades, rutas, botones ni procesos que no estén descritos en el contexto.
- NO asumas que el usuario está en otro módulo distinto al indicado.
- Usa lenguaje claro y sencillo — los usuarios pueden no tener experiencia con computadoras.
- Da pasos numerados cuando expliques un proceso.
- Usa listas con viñetas para estructurar respuestas.
- Máximo 200 palabras por respuesta.
- Responde SIEMPRE en el idioma indicado (español o inglés).
`;

// ============================================================
// GROQ FALLBACK
// ============================================================

export async function callGroq(
  userMessage: string,
  _history: Message[],
  lang: Lang,
  moduleContext?: string
): Promise<string> {
  if (!GROQ_API_KEY) {
    return lang === "es"
      ? "⚠️ No se encontró VITE_GROQ_API_KEY en el .env"
      : "⚠️ VITE_GROQ_API_KEY was not found in .env";
  }

  // Build system prompt: base rules + dynamic module context from ChatBot.tsx
  const contextBlock = moduleContext
    ? `\n\nCONTEXTO DEL MÓDULO ACTUAL:\n${moduleContext}`
    : "";
  const systemPrompt = `${BASE_RULES}${contextBlock}`;

  const messages = [
    {
      role: "system",
      content: systemPrompt,
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