"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export type ChatMsg = { from: "customer" | "agent" | "bot"; text: string; name?: string };

export function Bubble({ msg, accent }: { msg: ChatMsg; accent?: string }) {
  const mine = msg.from !== "customer";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={cn("flex", mine ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-sm",
          mine ? "rounded-br-md text-white" : "rounded-bl-md bg-white/10 text-slate-100",
        )}
        style={mine ? { background: accent ?? "var(--brand)", color: accent ? "white" : "var(--ink)" } : undefined}
      >
        {msg.from === "bot" && (
          <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider opacity-70">Auto reply</span>
        )}
        {msg.name && msg.from === "customer" && (
          <span className="mb-0.5 block text-[10px] font-semibold text-brand">{msg.name}</span>
        )}
        {msg.text}
      </div>
    </motion.div>
  );
}

export function TypingDots({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-3", className)}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-blink rounded-full bg-slate-300"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}
