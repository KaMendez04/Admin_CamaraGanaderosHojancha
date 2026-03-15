import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, Send, ChevronDown } from "lucide-react";
import { findAnswer, getRelatedQuestions, type Lang } from "./ChatBotBank";
import { callGroq, type Message } from "@/hooks/ChatBot/ChatBotIA";

// ============================================================
// FORMAT MESSAGE
// ============================================================
function FormattedText({ text }: { text: string }) {
  return (
    <span>
      {text.split("\n").map((line, i, arr) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <span key={i}>
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j} className="font-semibold">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
            {i < arr.length - 1 && <br />}
          </span>
        );
      })}
    </span>
  );
}

// ============================================================
// QUICK SUGGESTIONS
// ============================================================
const SUGGESTIONS: Record<Lang, string[]> = {
  es: [
    "¿Cómo registro un ingreso?",
    "¿Cómo registro un egreso?",
    "¿Cómo veo los reportes?",
    "¿Qué es el año fiscal?",
  ],
  en: [
    "How do I register income?",
    "How do I register an expense?",
    "How do I see reports?",
    "What is the fiscal year?",
  ],
};

const UI: Record<Lang, Record<string, string>> = {
  es: {
    title: "Asistente",
    subtitle: "Sistema de Presupuesto",
    online: "En línea",
    typing: "Escribiendo",
    placeholder: "Escribe tu pregunta…",
    suggestions: "Preguntas frecuentes",
    error: "Ocurrió un error. Intenta de nuevo.",
    welcome:
      "Hola, soy tu asistente del Sistema de Presupuesto.\n¿En qué puedo ayudarte hoy?",
  },
  en: {
    title: "Assistant",
    subtitle: "Budget System",
    online: "Online",
    typing: "Typing",
    placeholder: "Type your question…",
    suggestions: "Frequently asked questions",
    error: "An error occurred. Please try again.",
    welcome:
      "Hello, I'm your Budget System assistant.\nHow can I help you today?",
  },
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function BudgetChatbot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("es");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    setMessages([
      {
        id: idRef.current++,
        role: "bot",
        text: UI[lang].welcome,
        timestamp: new Date(),
      },
    ]);
    setShowSuggestions(true);
    setRelatedQuestions([]);
  }, [lang]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages, scrollToBottom]);

  async function sendMessage(text?: string) {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    setInput("");
    setShowSuggestions(false);

    const userMsg: Message = {
      id: idRef.current++,
      role: "user",
      text: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const localAnswer = findAnswer(userText, lang);
      const botText =
        localAnswer ?? (await callGroq(userText, [...messages, userMsg], lang));

      const related = getRelatedQuestions(userText, lang)
        .filter((q) => q.trim().toLowerCase() !== userText.trim().toLowerCase())
        .slice(0, 4);

      setRelatedQuestions(related);

      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          role: "bot",
          text: botText,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          role: "bot",
          text: UI[lang].error,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" });

  return createPortal(
    <>
      <style>{`
        @keyframes chatbotBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        @keyframes chatbotFadeIn {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chatbot-window {
          animation: chatbotFadeIn 0.18s ease-out;
        }
        .chatbot-msg-area::-webkit-scrollbar { width: 4px; }
        .chatbot-msg-area::-webkit-scrollbar-track { background: transparent; }
        .chatbot-msg-area::-webkit-scrollbar-thumb {
          background: #c8d2b8;
          border-radius: 4px;
        }
      `}</style>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          title={lang === "es" ? "Ayuda" : "Help"}
          aria-label={lang === "es" ? "Abrir asistente" : "Open assistant"}
          className="fixed bottom-7 right-7 z-[9999] flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[#6F8A2D] shadow-[0_4px_14px_rgba(111,138,45,0.28)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#637C27] hover:shadow-[0_8px_20px_rgba(111,138,45,0.34)]"
        >
          <MessageCircle size={22} color="white" strokeWidth={1.8} />
        </button>
      )}

      {open && (
        <div className="chatbot-window fixed bottom-7 right-7 z-[9999] flex h-[min(600px,calc(100vh-56px))] w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-[#DCE4CF] bg-[#F8FAF5] shadow-[0_8px_48px_rgba(0,0,0,0.14),0_1px_4px_rgba(0,0,0,0.06)]">
          {/* HEADER */}
          <div className="flex h-[60px] shrink-0 items-center gap-3 bg-[#6F8A2D] px-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
              <MessageCircle
                size={16}
                color="rgba(255,255,255,0.95)"
                strokeWidth={1.8}
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold tracking-[0.01em] text-white">
                {UI[lang].title}
              </div>
              <div className="mt-[1px] text-[11px] text-white/75">
                {loading ? `${UI[lang].typing}…` : UI[lang].online}
              </div>
            </div>

            <div className="flex shrink-0 gap-[2px] rounded-lg bg-white/10 p-[2px]">
              {(["es", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-md px-2 py-1 text-[11px] tracking-[0.02em] transition-all ${
                    lang === l
                      ? "bg-white/20 font-semibold text-white"
                      : "bg-transparent font-normal text-white/55"
                  }`}
                >
                  {l === "es" ? "ES" : "EN"}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="flex shrink-0 items-center justify-center rounded-md p-1 text-white/65 transition-colors hover:text-white"
            >
              <ChevronDown size={18} strokeWidth={2} />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="chatbot-msg-area min-h-0 flex-1 overflow-y-auto bg-[#F2F5EC] p-4">
            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`max-w-[82%] px-[13px] py-[10px] text-[13px] leading-[1.6] ${
                      msg.role === "user"
                        ? "rounded-[12px_12px_3px_12px] bg-gradient-to-r from-[#6F8A2D] to-[#556B1A] text-[#F8FFF1] shadow-[0_4px_14px_rgba(86,107,26,0.24)]"
                        : "rounded-[12px_12px_12px_3px] border border-[#DCE4CF] bg-white text-[#27303F] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                    }`}
                  >
                    <FormattedText text={msg.text} />
                    <div
                      className={`mt-[5px] text-right text-[10px] ${
                        msg.role === "user" ? "text-white/70" : "text-[#98A2B3]"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-end gap-2">
                  <div className="flex items-center gap-1 rounded-[12px_12px_12px_3px] border border-[#DCE4CF] bg-white px-[14px] py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="inline-block h-[5px] w-[5px] rounded-full bg-[#7E9444]"
                        style={{
                          animation: `chatbotBounce 1.1s ease-in-out ${i * 0.18}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {showSuggestions && !loading && (
                <div className="mt-1">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.03em] text-[#6A7C3B]">
                    {UI[lang].suggestions}
                  </p>
                  <div className="flex flex-col gap-[6px]">
                    {SUGGESTIONS[lang].map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="flex items-center justify-between gap-2 rounded-lg border border-[#DCE4CF] bg-white px-3 py-2 text-left text-[12px] text-[#3B4454] transition-all duration-150 hover:border-[#B8C99B] hover:bg-[#F5F9EF] hover:text-[#556B1A]"
                      >
                        <span>{s}</span>
                        <span className="shrink-0 text-[11px] text-[#A0A8B5]">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {relatedQuestions.length > 0 && !loading && (
                <div className="mt-1 rounded-xl border border-[#DCE4CF] bg-[#F8FAF5] p-3">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.03em] text-[#6A7C3B]">
                    {lang === "es"
                      ? "También te puede servir"
                      : "You may also ask"}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {relatedQuestions.map((question) => (
                      <button
                        key={question}
                        onClick={() => sendMessage(question)}
                        className="rounded-full border border-[#D6E0C7] bg-white px-3 py-1.5 text-[12px] text-[#4A5565] transition-all hover:border-[#B7C98F] hover:bg-[#F4F8EC] hover:text-[#556B1A]"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* INPUT */}
          <div className="flex shrink-0 items-center gap-2 border-t border-[#DCE4CF] bg-white px-[14px] py-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && sendMessage()
              }
              placeholder={UI[lang].placeholder}
              disabled={loading}
              className="flex-1 rounded-lg border border-[#DCE4CF] bg-[#FAFCF7] px-3 py-[9px] text-[13px] text-[#27303F] outline-none transition-colors placeholder:text-[#98A2B3] focus:border-[#6F8A2D] focus:bg-white"
            />

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              aria-label="Enviar"
              className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg transition-all ${
                input.trim() && !loading
                  ? "cursor-pointer bg-[#6F8A2D] hover:bg-[#637C27]"
                  : "cursor-not-allowed bg-[#EEF2E6]"
              }`}
            >
              <Send
                size={14}
                color={input.trim() && !loading ? "white" : "#A0A8B5"}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}