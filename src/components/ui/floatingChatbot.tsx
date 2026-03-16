import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const panelVariants: Variants = {
    closed: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.96,
      y: shouldReduceMotion ? 0 : 14,
      filter: "blur(4px)",
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: shouldReduceMotion
        ? {
            duration: 0.15,
          }
        : {
            type: "spring",
            stiffness: 340,
            damping: 28,
            mass: 0.9,
          },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
      y: shouldReduceMotion ? 0 : 8,
      filter: "blur(2px)",
      transition: {
        duration: 0.18,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3">
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="chat-panel"
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="h-[520px] w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl"
          >
            <div className="flex h-16 items-center justify-between border-b px-4">
              <div>
                <h3 className="text-sm font-semibold">Asistente virtual</h3>
                <p className="text-xs text-muted-foreground">
                  ¿En qué te puedo ayudar?
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 transition hover:bg-black/5"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-[calc(100%-4rem)] p-4">
              {/* contenido */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.96 }}
        animate={{
          scale: open ? 1.03 : 1,
          rotate: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl"
        aria-label={open ? "Cerrar chatbot" : "Abrir chatbot"}
      >
        <motion.div
          animate={{ rotate: open ? 90 : 0, scale: open ? 0.95 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <MessageCircle className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </div>
  );
}