"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { WA_BASE } from "@/lib/utils";

const quickReplies = [
  { label: "Website Development", text: "Hi AnasTech, I'm interested in Website Development" },
  { label: "Mobile App", text: "Hi AnasTech, I'm interested in Mobile App Development" },
  { label: "Software", text: "Hi AnasTech, I'm interested in Software Development" },
  { label: "Other Inquiry", text: "Hi AnasTech, I have an inquiry" },
];

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const handleSend = () => {
    if (!customMsg.trim()) return;
    window.open(`${WA_BASE}?text=${encodeURIComponent(customMsg)}`, "_blank");
    setCustomMsg("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl border border-border w-80 overflow-hidden self-start"
          >
            {/* Header */}
            <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="text-white size-5" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">AnasTech Solutions</p>
                <p className="text-white/70 text-xs">Typically replies instantly</p>
              </div>
            </div>

            {/* Chat bubble */}
            <div className="p-4 bg-[#E5DDD5]">
              <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm max-w-[85%]">
                <p className="text-ink-soft text-sm">
                  Hi! 👋 How can we help you today?
                </p>
                <p className="text-ink-subtle text-xs mt-1">AnasTech</p>
              </div>
            </div>

            {/* Quick replies */}
            <div className="p-4 flex flex-col gap-2">
              <p className="text-xs text-ink-muted font-medium mb-1">Quick replies:</p>
              {quickReplies.map((qr) => (
                <a
                  key={qr.label}
                  href={`${WA_BASE}?text=${encodeURIComponent(qr.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-blue border border-brand-blue/30 rounded-lg px-3 py-2 hover:bg-brand-blue hover:text-white transition-colors text-left"
                >
                  {qr.label}
                </a>
              ))}

              {/* Custom message */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-brand-blue"
                />
                <button
                  onClick={handleSend}
                  className="bg-[#25D366] text-white rounded-lg p-2 hover:bg-[#128C7E] transition-colors"
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="size-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="size-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
