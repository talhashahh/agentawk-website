"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Inbox as InboxIcon, Search, Users, Megaphone, Bot, Settings, BarChart3, AtSign, StickyNote,
  UserCheck, Zap, CheckCheck, Tag, Paperclip, Smile, Send,
} from "lucide-react";
import { Section, SectionHeading, Reveal, Glow } from "@/components/ui/Section";
import { ChannelBadge, CHANNELS, type ChannelId } from "@/components/channels";
import { Avatar } from "@/components/ui/Avatar";
import { Bubble, type ChatMsg } from "@/components/ui/Chat";
import { useCycle } from "@/lib/hooks";
import { cn } from "@/lib/cn";

type Convo = {
  name: string;
  channel: ChannelId;
  preview: string;
  time: string;
  unread: number;
  tag: string;
  agent: string;
  chat: ChatMsg[];
};

const CONVOS: Convo[] = [
  {
    name: "Sara Khan", channel: "instagram", preview: "Blue please! 💙", time: "now", unread: 2, tag: "New lead", agent: "Hamza",
    chat: [
      { from: "customer", text: "Is the blue bag still available?" },
      { from: "agent", text: "Yes Sara! Want me to reserve one? 👜" },
      { from: "customer", text: "Blue please! 💙" },
    ],
  },
  {
    name: "Ali Raza", channel: "whatsapp", preview: "Tracking link received ✅", time: "2m", unread: 0, tag: "Order", agent: "Ayesha",
    chat: [
      { from: "customer", text: "Where is my order #2381?" },
      { from: "bot", text: "It's on the way! Tracking: trk.example/2381" },
      { from: "customer", text: "Tracking link received ✅" },
    ],
  },
  {
    name: "Hina Malik", channel: "messenger", preview: "Table for 4 at 8pm", time: "5m", unread: 1, tag: "Booking", agent: "Bilal",
    chat: [
      { from: "customer", text: "Can I book a table for tonight?" },
      { from: "agent", text: "Of course! For how many people?" },
      { from: "customer", text: "Table for 4 at 8pm" },
    ],
  },
  {
    name: "Omar Sheikh", channel: "telegram", preview: "Thanks for the quick help!", time: "12m", unread: 0, tag: "Support", agent: "Hamza",
    chat: [
      { from: "customer", text: "My promo code isn't working" },
      { from: "agent", text: "Fixed! Try EID30 again 🎉" },
      { from: "customer", text: "Thanks for the quick help!" },
    ],
  },
  {
    name: "Website visitor", channel: "webchat", preview: "I'm in Dubai 🇦🇪", time: "18m", unread: 3, tag: "Question", agent: "Ayesha",
    chat: [
      { from: "customer", text: "Hello! Do you ship abroad?" },
      { from: "bot", text: "We do 🌍 Which country are you in?" },
      { from: "customer", text: "I'm in Dubai 🇦🇪" },
    ],
  },
];

const RAIL = [InboxIcon, Users, Megaphone, Bot, BarChart3, Settings];

function InboxMock() {
  const { ref, index } = useCycle<HTMLDivElement>(CONVOS.length, 4200);
  const active = CONVOS[index];

  return (
    <div ref={ref} className="glass relative overflow-hidden rounded-3xl shadow-[0_50px_140px_-40px_rgba(0,0,0,0.9)]">
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto rounded-full bg-white/5 px-4 py-1 text-[11px] text-slate-400">app.agentawk.com/inbox</span>
      </div>

      <div className="flex h-[480px]">
        {/* rail */}
        <div className="hidden w-14 flex-col items-center gap-4 border-r border-white/5 py-4 sm:flex">
          {RAIL.map((I, i) => (
            <span key={i} className={cn("flex h-9 w-9 items-center justify-center rounded-xl", i === 0 ? "bg-brand/15 text-brand" : "text-slate-500")}>
              <I size={18} />
            </span>
          ))}
        </div>

        {/* list */}
        <div className="w-full shrink-0 border-r border-white/5 sm:w-[270px]">
          <div className="p-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-[12px] text-slate-500">
              <Search size={14} /> Search conversations
            </div>
            <div className="mt-3 flex gap-1.5 text-[11px] font-semibold">
              <span className="rounded-full bg-brand px-2.5 py-1 text-ink">All</span>
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-slate-400">Mine</span>
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-slate-400">Unassigned</span>
            </div>
          </div>
          <ul className="relative px-2">
            {CONVOS.map((c, i) => (
              <li key={c.name} className="relative">
                {i === index && (
                  <motion.div layoutId="inbox-active" className="absolute inset-0 rounded-xl bg-white/[0.07] ring-1 ring-white/10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
                <div className="relative flex items-center gap-2.5 rounded-xl p-2.5">
                  <div className="relative">
                    <Avatar name={c.name} className="h-10 w-10 text-[11px]" />
                    <ChannelBadge id={c.channel} className="absolute -bottom-0.5 -right-0.5 h-4.5 w-4.5 ring-2 ring-ink" iconClassName="h-2.5 w-2.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-[13px] font-semibold text-white">{c.name}</p>
                      <span className="text-[10px] text-slate-500">{c.time}</span>
                    </div>
                    <p className="truncate text-[12px] text-slate-400">{c.preview}</p>
                  </div>
                  {c.unread > 0 && i !== index && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-ink">{c.unread}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* thread */}
        <div className="hidden min-w-0 flex-1 flex-col sm:flex">
          <div className="flex items-center gap-3 border-b border-white/5 px-5 py-3">
            <AnimatePresence mode="wait">
              <motion.div key={active.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar name={active.name} className="h-9 w-9 text-[11px]" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{active.name}</p>
                  <p className="text-[11px]" style={{ color: CHANNELS[active.channel].color }}>{CHANNELS[active.channel].name}</p>
                </div>
                <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 md:inline-flex">
                  <UserCheck size={12} className="text-brand" /> {active.agent}
                </span>
                <span className="hidden items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-[11px] text-amber-300 md:inline-flex">
                  <Tag size={11} /> {active.tag}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden px-5 py-4">
            <AnimatePresence mode="popLayout">
              {active.chat.map((m, i) => (
                <motion.div key={active.name + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 + i * 0.35 }}>
                  <Bubble msg={m} />
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.div
              key={"read" + active.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex items-center justify-end gap-1 text-[10px] text-slate-500"
            >
              Seen <CheckCheck size={12} className="text-sky-400" />
            </motion.div>
          </div>
          <div className="m-3 flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2.5">
            <Paperclip size={16} className="text-slate-500" />
            <Smile size={16} className="text-slate-500" />
            <Zap size={16} className="text-brand" />
            <span className="flex-1 text-[12px] text-slate-500">Reply to {active.name.split(" ")[0]}…</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-ink">
              <Send size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: UserCheck, title: "Assign & transfer", text: "Send any chat to the right teammate with one click." },
  { icon: StickyNote, title: "Private notes", text: "Leave notes on a chat that only your team can see." },
  { icon: AtSign, title: "@mentions", text: "Pull a colleague into the conversation instantly." },
  { icon: Zap, title: "Quick replies", text: "Answer common questions with saved replies in a tap." },
];

export function InboxSection() {
  return (
    <Section id="inbox" className="overflow-hidden">
      <SectionHeading
        eyebrow="Unified inbox"
        icon={<InboxIcon size={14} />}
        title="Every message, from every app,"
        highlight="in one beautiful inbox."
        subtitle="No more jumping between apps. Instagram DMs, WhatsApp chats, Messenger, Telegram and website visitors all arrive in one place, ready for your team to answer."
      />
      <Reveal className="relative mt-16">
        <Glow className="-left-20 top-10 h-96 w-96" />
        <Glow className="-right-20 bottom-0 h-96 w-96" color="#6366f1" />
        <InboxMock />
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <f.icon size={20} className="text-brand" />
            <h3 className="mt-3 font-semibold text-white">{f.title}</h3>
            <p className="mt-1.5 text-sm text-slate-400">{f.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
