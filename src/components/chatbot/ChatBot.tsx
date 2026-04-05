import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useRouterState } from "@tanstack/react-router";
import { MessageCircle, Send, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  findAnswer,
  getRelatedQuestions,
  getChatbotContext,
  type Lang,
} from "./banks/Home&BankBudget";
import { callGroq, type Message } from "@/hooks/ChatBot/ChatBotIA";

// ============================================================
// CONFIG
// ============================================================
const BUTTON_SIZE = 52;
const PILL_WIDTH = 180;
const PANEL_MAX_W = 360;
const PANEL_MAX_H = 480;

// Breakpoints
const MD = 768;

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
// MAIN COMPONENT
// ============================================================
interface BudgetChatbotProps {
  sidebarOpen?: boolean;
  isMobileLayout?: boolean;
}

export default function BudgetChatbot({
  sidebarOpen = false,
  isMobileLayout = false,
}: BudgetChatbotProps) {
  const [open, setOpen] = useState(false);
  const [showLauncher, setShowLauncher] = useState(true);
  const [lang, setLang] = useState<Lang>("es");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const [shellSize, setShellSize] = useState({
    w: PANEL_MAX_W,
    h: PANEL_MAX_H,
  });
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MD : isMobileLayout
  );

  const [hasOpenModal, setHasOpenModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  const shouldReduceMotion = useReducedMotion();

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const chatbotContext = useMemo(
    () => getChatbotContext(pathname),
    [pathname]
  );

  const ui = chatbotContext.ui[lang];
  const suggestions = chatbotContext.suggestions[lang];

  useEffect(() => {
    const updateShellSize = () => {
      if (typeof window === "undefined") return;

      const mobile = window.innerWidth < MD;
      setIsMobile(mobile);

      if (mobile) {
        setShellSize({
          w: Math.min(window.innerWidth - 20, 320),
          h: Math.min(window.innerHeight * 0.62, 430),
        });
      } else {
        setShellSize({
          w: Math.min(PANEL_MAX_W, window.innerWidth - 32),
          h: Math.min(PANEL_MAX_H, window.innerHeight - 64 - 28 - 16),
        });
      }
    };

    updateShellSize();
    window.addEventListener("resize", updateShellSize);
    return () => window.removeEventListener("resize", updateShellSize);
  }, []);

  useEffect(() => {
    setMessages([
      {
        id: idRef.current++,
        role: "bot",
        text: ui.welcome,
        timestamp: new Date(),
      },
    ]);
    setShowSuggestions(true);
    setRelatedQuestions([]);
    setInput("");
  }, [lang, chatbotContext.key, ui.welcome]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const checkModalOpen = () => {
      const selectors = [
        '[role="dialog"]',
        '[aria-modal="true"]',
        '[data-state="open"][role="dialog"]',
        '[data-state="open"][data-slot="dialog-content"]',
        '[data-slot="dialog-content"]',
        '[data-slot="dialog-overlay"]',
        '.swal2-container',
        '.ReactModal__Overlay',
      ];

      const hasVisibleDialog = selectors.some((selector) => {
        const elements = Array.from(document.querySelectorAll(selector));

        return elements.some((el) => {
          const style = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();

          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            style.opacity !== "0" &&
            rect.width > 0 &&
            rect.height > 0
          );
        });
      });

      setHasOpenModal(hasVisibleDialog);
    };

    checkModalOpen();

    const observer = new MutationObserver(() => {
      checkModalOpen();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        "class",
        "style",
        "data-state",
        "aria-hidden",
        "open",
      ],
    });

    window.addEventListener("resize", checkModalOpen);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkModalOpen);
    };
  }, []);

  useEffect(() => {
    if (hasOpenModal) {
      setOpen(false);
      setShowLauncher(false);
      return;
    }

    setShowLauncher(true);
  }, [hasOpenModal]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!open) return;

    scrollToBottom();

    const timer = setTimeout(
      () => inputRef.current?.focus(),
      shouldReduceMotion ? 80 : 420
    );

    return () => clearTimeout(timer);
  }, [open, messages, scrollToBottom, shouldReduceMotion]);

  const openChat = useCallback(() => {
    if (hasOpenModal) return;
    setShowLauncher(false);
    setOpen(true);
  }, [hasOpenModal]);

  const closeChat = useCallback(() => {
    setOpen(false);
  }, []);

  const handleShellExitComplete = useCallback(() => {
    setShowLauncher(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e: MouseEvent) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(e.target as Node)
      ) {
        closeChat();
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open, closeChat]);

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
      const localAnswer = findAnswer(userText, lang, pathname);

      const contextualPrompt =
        lang === "es"
          ? `${chatbotContext.aiContext.es}\nRuta actual: ${pathname}\nPregunta del usuario: ${userText}`
          : `${chatbotContext.aiContext.en}\nCurrent route: ${pathname}\nUser question: ${userText}`;

      const botText =
        localAnswer ??
        (await callGroq(contextualPrompt, [...messages, userMsg], lang));

      const related = getRelatedQuestions(userText, lang, pathname)
        .filter((q) => q.trim().toLowerCase() !== userText.trim().toLowerCase())
        .slice(0, 4);

      const fallback = suggestions
        .filter((q) => q.trim().toLowerCase() !== userText.trim().toLowerCase())
        .slice(0, 4);

      setRelatedQuestions(related.length > 0 ? related : fallback);

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
          text: ui.error,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" });

  const mobileRadiusOpen = isMobile ? "16px" : 24;
  const mobileRadiusClose = isMobile ? "16px" : 14;

  const shellInitial = {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 14,
  };

  const shellAnimate = shouldReduceMotion
    ? {
        width: shellSize.w,
        height: shellSize.h,
        borderRadius: mobileRadiusOpen,
        transition: { duration: 0.16 },
      }
    : {
        width: [BUTTON_SIZE, PILL_WIDTH, shellSize.w],
        height: [BUTTON_SIZE, BUTTON_SIZE, shellSize.h],
        borderRadius: [14, 18, mobileRadiusOpen],
        transition: {
          duration: 0.66,
          times: [0, 0.42, 1],
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

  const shellExit = shouldReduceMotion
    ? {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: mobileRadiusClose,
        transition: { duration: 0.15 },
      }
    : {
        width: [shellSize.w, PILL_WIDTH, BUTTON_SIZE],
        height: [shellSize.h, BUTTON_SIZE, BUTTON_SIZE],
        borderRadius: [mobileRadiusOpen, 18, 14],
        transition: {
          duration: 0.52,
          times: [0, 0.6, 1],
          ease: [0.4, 0, 0.2, 1] as const,
        },
      };

  const launcherIconAnimate = shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: [1, 1, 0.4, 0],
        x: [0, -34, -58, -62],
        scale: [1, 1, 0.96, 0.92],
        transition: {
          duration: 0.62,
          times: [0, 0.34, 0.76, 1],
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

  const launcherIconExit = shouldReduceMotion
    ? { opacity: 1 }
    : {
        opacity: [0, 0.45, 1],
        x: [-62, -30, 0],
        scale: [0.92, 0.97, 1],
        transition: {
          duration: 0.42,
          times: [0, 0.55, 1],
          ease: [0.4, 0, 0.2, 1] as const,
        },
      };

  const contentAnimate = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : {
        opacity: [0, 0, 0.45, 1],
        y: [10, 10, 4, 0],
        transition: {
          duration: 0.66,
          times: [0, 0.5, 0.78, 1],
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

  const contentExit = shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: [1, 0.3, 0],
        y: [0, 4, 8],
        transition: {
          duration: 0.2,
          times: [0, 0.5, 1],
          ease: [0.4, 0, 0.2, 1] as const,
        },
      };

  if (typeof document === "undefined") return null;
  if (hasOpenModal) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes chatbotBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        .chatbot-msg-area::-webkit-scrollbar { width: 4px; }
        .chatbot-msg-area::-webkit-scrollbar-track { background: transparent; }
        .chatbot-msg-area::-webkit-scrollbar-thumb {
          background: #c8d2b8;
          border-radius: 4px;
        }
      `}</style>

      {showLauncher && !sidebarOpen && !hasOpenModal && (
        <button
          onClick={openChat}
          title={lang === "es" ? "Ayuda" : "Help"}
          aria-label={lang === "es" ? "Abrir asistente" : "Open assistant"}
          className="fixed z-[9999] flex items-center justify-center rounded-[14px] bg-[#6F8A2D] shadow-[0_4px_14px_rgba(111,138,45,0.28)] transition-all duration-200 hover:bg-[#637C27] hover:shadow-[0_8px_20px_rgba(111,138,45,0.34)] active:scale-95"
          style={{
            width: isMobile ? 48 : 52,
            height: isMobile ? 48 : 52,
            right: isMobile ? 14 : 28,
            bottom: isMobile ? 14 : 28,
          }}
        >
          <MessageCircle
            size={isMobile ? 20 : 22}
            color="white"
            strokeWidth={1.8}
          />
        </button>
      )}

      <AnimatePresence onExitComplete={handleShellExitComplete}>
        {open && (
          <motion.div
            key="budget-chatbot-shell"
            ref={chatWindowRef}
            initial={shellInitial}
            animate={shellAnimate}
            exit={shellExit}
            className="fixed z-[9999] overflow-hidden bg-[#6F8A2D]"
            style={{
              bottom: isMobile ? 14 : 28,
              right: isMobile ? 14 : 28,
              boxShadow:
                "0 8px 48px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <motion.div
              initial={{ opacity: 1, x: 0, scale: 1 }}
              animate={launcherIconAnimate}
              exit={launcherIconExit}
              className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
            >
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px]">
                <MessageCircle size={22} color="white" strokeWidth={1.8} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={contentAnimate}
              exit={contentExit}
              className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-[#DCE4CF] bg-[#F8FAF5]"
            >
              <div className="flex h-[56px] shrink-0 items-center gap-3 bg-[#6F8A2D] px-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <MessageCircle
                    size={16}
                    color="rgba(255,255,255,0.95)"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold tracking-[0.01em] text-white">
                    {ui.title}
                  </div>
                  <div className="mt-[1px] text-[11px] text-white/75">
                    {ui.subtitle} · {loading ? `${ui.typing}…` : ui.online}
                  </div>
                </div>

                <div className="flex shrink-0 gap-[2px] rounded-lg bg-white/10 p-[2px]">
                  {(["es", "en"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`rounded-md px-2 py-1.5 text-[12px] tracking-[0.02em] transition-all ${
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
                  onClick={closeChat}
                  aria-label={lang === "es" ? "Cerrar" : "Close"}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white/65 transition-colors hover:text-white"
                >
                  <ChevronDown size={20} strokeWidth={2} />
                </button>
              </div>

              <div className="chatbot-msg-area min-h-0 flex-1 overflow-y-auto bg-[#F2F5EC] p-3">
                <div className="flex flex-col gap-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${
                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div
                        className={`max-w-[88%] px-[12px] py-[9px] text-[12px] leading-[1.6] md:text-[13px] ${
                          msg.role === "user"
                            ? "rounded-[12px_12px_3px_12px] bg-gradient-to-r from-[#6F8A2D] to-[#556B1A] text-[#F8FFF1] shadow-[0_4px_14px_rgba(86,107,26,0.24)]"
                            : "rounded-[12px_12px_12px_3px] border border-[#DCE4CF] bg-white text-[#27303F] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                        }`}
                      >
                        <FormattedText text={msg.text} />
                        <div
                          className={`mt-[5px] text-right text-[10px] ${
                            msg.role === "user"
                              ? "text-white/70"
                              : "text-[#98A2B3]"
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
                        {ui.suggestions}
                      </p>
                      <div className="flex flex-col gap-[6px]">
                        {suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => sendMessage(s)}
                            className="flex min-h-[42px] items-center justify-between gap-2 rounded-lg border border-[#DCE4CF] bg-white px-3 py-2 text-left text-[12px] text-[#3B4454] transition-all duration-150 hover:border-[#B8C99B] hover:bg-[#F5F9EF] hover:text-[#556B1A]"
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
                            className="min-h-[34px] rounded-full border border-[#D6E0C7] bg-white px-3 py-1.5 text-[11px] text-[#4A5565] transition-all hover:border-[#B7C98F] hover:bg-[#F4F8EC] hover:text-[#556B1A]"
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

              <div
                className="flex shrink-0 items-center gap-2 border-t border-[#DCE4CF] bg-white px-3 py-2.5"
                style={{
                  paddingBottom: isMobile
                    ? "max(10px, env(safe-area-inset-bottom))"
                    : undefined,
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && sendMessage()
                  }
                  placeholder={ui.placeholder}
                  disabled={loading}
                  className="flex-1 rounded-lg border border-[#DCE4CF] bg-[#FAFCF7] px-3 py-[9px] text-[13px] text-[#27303F] outline-none transition-colors placeholder:text-[#98A2B3] focus:border-[#6F8A2D] focus:bg-white"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  aria-label={lang === "es" ? "Enviar" : "Send"}
                  className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg transition-all ${
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}