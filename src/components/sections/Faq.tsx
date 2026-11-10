"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Plus } from "lucide-react";
import { Section, SectionHeading, Reveal } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

const FAQS = [
  {
    q: "Which channels can I connect?",
    a: "WhatsApp (Business API, Coexistence with the WhatsApp app, or a QR scan), Instagram, Facebook Messenger, Telegram and a chat widget for your website. All of them arrive in the same inbox.",
  },
  {
    q: "Can I try it for free?",
    a: "Yes. Sign up and you start on the Free plan right away, so you can connect a channel and answer your first chats before you decide to upgrade.",
  },
  {
    q: "Can my whole team use AgentAwk together?",
    a: "Absolutely. Invite agents, group them into teams, assign and transfer chats, leave private notes and @mention each other. Roles decide exactly what each person can see and do.",
  },
  {
    q: "I run more than one business. Do I need separate accounts?",
    a: "No. One agency account holds as many workspaces as your plan allows: one per brand, branch or client, each with its own channels and its own team.",
  },
  {
    q: "Can I put my own logo and colors on it?",
    a: "Yes. Paid plans let you add your logo, icon and brand colors, and higher plans support full white-label for agencies that resell AgentAwk.",
  },
  {
    q: "Do I need to know coding to build bots?",
    a: "Not at all. Bots are built by joining blocks like “when a customer says…”, “send a message” and “assign to a team”. If you get stuck, the Help Assistant walks you through it.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <SectionHeading eyebrow="FAQ" icon={<HelpCircle size={14} />} title="Questions?" highlight="We've got answers." />
      <div className="mx-auto mt-14 grid max-w-3xl gap-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className={cn("rounded-2xl border transition-colors", isOpen ? "border-brand/30 bg-white/[0.04]" : "border-white/8 bg-white/[0.02]")}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-white">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full", isOpen ? "bg-brand text-ink" : "bg-white/5 text-slate-300")}>
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-[15px] leading-relaxed text-slate-400">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
