"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageSquareText, GitBranch, UserPlus, Clock, Sparkles, LifeBuoy, Send, Wand2 } from "lucide-react";
import { Section, SectionHeading, Reveal, Glow } from "@/components/ui/Section";
import { ChannelBadge } from "@/components/channels";
import { Bubble, TypingDots } from "@/components/ui/Chat";
import { BotMark } from "@/components/brand/Logo";
import { useCycle, useSequence } from "@/lib/hooks";
import { cn } from "@/lib/cn";

const NODES = [
  { icon: MessageSquareText, kind: "Trigger", title: "Customer writes “price”", color: "#f59e0b" },
  { icon: Send, kind: "Action", title: "Send the price list 📋", color: "var(--brand)" },
  { icon: GitBranch, kind: "Condition", title: "Tapped “Order now”?", color: "#a855f7" },
  { icon: UserPlus, kind: "Action", title: "Assign to Sales team", color: "#06b6d4" },
];

const FLOW_CHAT = [
  { from: "customer" as const, text: "price?" },
  { from: "bot" as const, text: "Here's our price list 📋 Tap Order now to buy!" },
  { from: "customer" as const, text: "Order now 🛒" },
  { from: "bot" as const, text: "Great! Connecting you with our sales team 🙌" },
];

function FlowDemo() {
  const { ref, index } = useCycle<HTMLDivElement>(NODES.length + 1, 1700);
  const step = Math.min(index, NODES.length - 1);
  const chatShown = index === 0 ? 1 : Math.min(FLOW_CHAT.length, index + 1);

  return (
    <div ref={ref} className="relative grid gap-6 overflow-hidden rounded-3xl border border-blue-200/70 bg-gradient-to-br from-[#e6f0ff] via-[#eef5ff] to-[#dbeafe] p-6 shadow-[0_40px_100px_-45px_rgba(37,99,235,0.55)] md:grid-cols-[1.2fr_1fr]">
      <div className="relative">
        <p className="mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-brand">
          <Bot size={14} /> Bot · Price enquiry
        </p>
        <div className="flex flex-col items-start">
          {NODES.map((n, i) => {
            const active = i === step && index < NODES.length + 1;
            const done = i < step;
            return (
              <div key={n.title} className="flex w-full flex-col items-start">
                <motion.div
                  animate={{ scale: active ? 1.03 : 1 }}
                  className={cn(
                    "flex w-full max-w-[320px] items-center gap-3 rounded-2xl border bg-white p-3 shadow-sm transition-all duration-500",
                    active ? "border-brand/40" : "border-blue-100",
                  )}
                  style={active ? { boxShadow: `0 12px 36px -10px ${n.color}` } : undefined}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `color-mix(in oklab, ${n.color} 14%, white)`, color: n.color }}>
                    <n.icon size={17} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: n.color }}>{n.kind}</p>
                    <p className="text-[13px] font-medium text-fg">{n.title}</p>
                  </div>
                  {i === 0 && (
                    <span className="ml-auto flex -space-x-1.5">
                      <ChannelBadge id="whatsapp" className="h-5 w-5" />
                      <ChannelBadge id="instagram" className="h-5 w-5" />
                    </span>
                  )}
                  {done && <span className="ml-auto text-[12px] font-bold text-brand">✓</span>}
                </motion.div>
                {i < NODES.length - 1 && (
                  <div className="relative ml-[26px] h-7 w-0.5 overflow-hidden bg-brand/15">
                    {i < step && <motion.span initial={{ y: "-100%" }} animate={{ y: "100%" }} transition={{ duration: 0.6 }} className="absolute inset-x-0 h-full bg-brand" />}
                    {i < step && <span className="absolute inset-0 bg-brand/60" />}
                  </div>
                )}
              </div>
            );
          })}
          <div className="ml-[26px] mt-3 flex items-center gap-2 text-[11px] text-muted">
            <Clock size={12} /> No? Follow up automatically after 1 day
          </div>
        </div>
      </div>

      <div className="relative flex flex-col justify-end gap-2.5 rounded-2xl border border-blue-100 bg-white/70 p-4 backdrop-blur-sm">
        <div className="mb-auto flex items-center gap-2 border-b border-blue-100 pb-3">
          <ChannelBadge id="whatsapp" className="h-7 w-7" />
          <span className="text-[13px] font-semibold text-fg">Customer chat</span>
          <span className="ml-auto rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">BOT ON</span>
        </div>
        <AnimatePresence mode="popLayout">
          {FLOW_CHAT.slice(0, chatShown).map((m, i) => (
            <Bubble key={i} msg={m} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Types `text` out character by character while `play` is true. */
function useTypewriter(text: string, play: boolean, speed = 22) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!play) {
      setOut("");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, play, speed]);
  return out;
}

function AiChat({
  title, badge, icon: Icon, question, answer, accent,
}: {
  title: string; badge: string; icon: typeof Bot; question: string; answer: string; accent: string;
}) {
  const { ref, shown } = useSequence<HTMLDivElement>(3, 1300, 4200);
  const typed = useTypewriter(answer, shown >= 3);
  return (
    <div ref={ref} className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-5">
      <div className="flex items-center gap-3">
        <motion.span
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ background: `color-mix(in oklab, ${accent} 18%, transparent)`, color: accent }}
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2 }}
        >
          <Icon size={22} />
        </motion.span>
        <div>
          <p className="font-display font-semibold text-fg">{title}</p>
          <p className="text-[12px] text-muted">{badge}</p>
        </div>
      </div>
      <div className="mt-5 flex min-h-[210px] flex-1 flex-col justify-end gap-2.5">
        <AnimatePresence mode="popLayout">
          {shown >= 1 && <Bubble key="q" msg={{ from: "customer", text: question }} />}
          {shown === 2 && (
            <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-end">
              <TypingDots />
            </motion.div>
          )}
          {shown >= 3 && (
            <motion.div key="a" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
              <div
                className="max-w-[88%] rounded-2xl rounded-br-md border px-3.5 py-2.5 text-[13px] leading-relaxed text-fg"
                style={{ background: `color-mix(in oklab, ${accent} 10%, white)`, borderColor: `color-mix(in oklab, ${accent} 30%, white)` }}
              >
                <span className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                  <Sparkles size={11} /> AI
                </span>
                {typed}
                <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-blink bg-fg align-middle" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const BOT_FEATURES = [
  "Keyword & first-message triggers",
  "Instagram comment and story replies",
  "Default replies when you're away",
  "Questions, tags and custom fields",
  "Hand-off to a human anytime",
  "Works on every channel",
];

export function Automation() {
  return (
    <Section id="automation">
      <SectionHeading
        eyebrow="Bots & AI"
        icon={<Bot size={14} />}
        title="Let bots do the busy work."
        highlight="Let AI lend a hand."
        subtitle="Build a bot by joining a few blocks together. It replies, asks questions and passes the chat to your team at the right moment, day and night."
      />

      <div className="relative mt-16">
        <Glow className="-right-10 top-0 h-96 w-96" color="#a855f7" />
        <Reveal><FlowDemo /></Reveal>
      </div>

      <Reveal className="mt-6 flex flex-wrap justify-center gap-2.5">
        {BOT_FEATURES.map((f) => (
          <span key={f} className="rounded-full border border-line bg-white px-4 py-2 text-[13px] text-slate-600 shadow-sm">
            {f}
          </span>
        ))}
      </Reveal>

      <div className="mt-20 grid items-stretch gap-5 lg:grid-cols-[1fr_1.1fr_1.1fr]">
        <Reveal className="flex flex-col justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10">
            <BotMark className="h-8 w-auto" />
          </span>
          <h3 className="mt-5 font-display text-3xl font-bold text-fg">
            An AI friend for you <span className="text-gradient">and your customers.</span>
          </h3>
          <p className="mt-4 leading-relaxed text-muted">
            Train AI chat assistants on your own products and answers, so customers get help even at 3am. And when you&apos;re
            unsure how to do something in AgentAwk, just ask the built-in Help Assistant. It explains every step like a friendly
            colleague.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <AiChat
            title="AI Chat Assistant"
            badge="Answers your customers 24/7"
            icon={Wand2}
            accent="#a855f7"
            question="Kya aap Karachi mein deliver karte hain?"
            answer="Ji haan! 🚚 Karachi mein delivery 1–2 din mein ho jati hai, aur cash on delivery bhi available hai."
          />
        </Reveal>
        <Reveal delay={0.2}>
          <AiChat
            title="Help Assistant"
            badge="Your guide inside AgentAwk"
            icon={LifeBuoy}
            accent="#06b6d4"
            question="How do I connect my Instagram?"
            answer="Easy! 😊 Open Settings → Channels → Instagram and click Connect Instagram. Log in, tap Allow, and your DMs start arriving in the inbox."
          />
        </Reveal>
      </div>
    </Section>
  );
}
