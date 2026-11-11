"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Inbox as InboxIcon, Search, User, ListFilter, Filter, ArrowUp, Plus, Folder, MessagesSquare, ChevronDown, CheckCircle,
  MoreVertical, Smile, Type, Mic, Send, Check, CheckCheck, PanelRightClose, Image as ImageIcon, PenLine, LayoutGrid, UserPlus,
  Archive, Headset, RefreshCw, Bell, Zap, UserCheck, StickyNote, AtSign,
} from "lucide-react";
import { Section, SectionHeading, Reveal, Glow } from "@/components/ui/Section";
import { BotMark } from "@/components/brand/Logo";
import { ChannelBadge, CHANNELS, type ChannelId } from "@/components/channels";
import { useCycle } from "@/lib/hooks";
import { cn } from "@/lib/cn";

/* A faithful copy of the real AgentAwk inbox (app.agentawk.com/conversations/inbox):
   floating top bar, then conversation list · chat thread · contact panel. */

const P = "#25d366"; // the app's primary green

const PASTEL = [
  "bg-green-100 text-green-700", "bg-sky-100 text-sky-700", "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-700", "bg-teal-100 text-teal-700",
];

const STATUS: Record<string, string> = {
  active: "bg-blue-50 text-blue-700",
  queued: "bg-yellow-50 text-yellow-700",
  unassigned: "bg-red-50 text-red-700",
  completed: "bg-green-50 text-green-700",
};

type Msg = { out: boolean; text: string; time: string };
type Convo = {
  name: string; phone: string; channel: ChannelId; status: keyof typeof STATUS; time: string; preview: string;
  isNew?: boolean; agent: string; chat: Msg[];
};

const CONVOS: Convo[] = [
  {
    name: "Sara Khan", phone: "+92 321 4471 482", channel: "instagram", status: "active", time: "2:41 PM", preview: "Blue please! 💙",
    isNew: true, agent: "Hamza Ali",
    chat: [
      { out: false, text: "Hi! Is the blue bag still available? 👜", time: "2:38 PM" },
      { out: true, text: "Yes Sara! Want me to reserve one for you?", time: "2:39 PM" },
      { out: false, text: "Blue please! 💙", time: "2:41 PM" },
    ],
  },
  {
    name: "Ali Raza", phone: "+92 300 5512 219", channel: "whatsapp", status: "queued", time: "2:30 PM", preview: "Can I change my address?",
    agent: "Ayesha Noor",
    chat: [
      { out: false, text: "Salam, my order #2381 is on the way?", time: "2:26 PM" },
      { out: true, text: "Wa alaikum salam! Yes, it left today 🚚", time: "2:28 PM" },
      { out: false, text: "Can I change my address?", time: "2:30 PM" },
    ],
  },
  {
    name: "Hina Malik", phone: "+92 333 7801 760", channel: "messenger", status: "unassigned", time: "1:55 PM", preview: "Table for 4 at 8pm",
    isNew: true, agent: "Bilal Ahmed",
    chat: [
      { out: false, text: "Hello, can I book a table for tonight?", time: "1:52 PM" },
      { out: true, text: "Of course! For how many people?", time: "1:53 PM" },
      { out: false, text: "Table for 4 at 8pm", time: "1:55 PM" },
    ],
  },
  {
    name: "Omar Sheikh", phone: "@omar_sheikh", channel: "telegram", status: "completed", time: "1:20 PM", preview: "Thanks for the quick help!",
    agent: "Hamza Ali",
    chat: [
      { out: false, text: "My promo code isn't working 😕", time: "1:14 PM" },
      { out: true, text: "Fixed! Please try EID30 again 🎉", time: "1:17 PM" },
      { out: false, text: "Thanks for the quick help!", time: "1:20 PM" },
    ],
  },
  {
    name: "Website visitor", phone: "agentawk.com", channel: "webchat", status: "active", time: "12:48 PM", preview: "Do you deliver to Dubai?",
    agent: "Ayesha Noor",
    chat: [
      { out: false, text: "Hi there! Do you ship abroad?", time: "12:45 PM" },
      { out: true, text: "We do 🌍 Which country are you in?", time: "12:46 PM" },
      { out: false, text: "Do you deliver to Dubai?", time: "12:48 PM" },
    ],
  },
];

const TABS = [
  { label: "All", count: 128 }, { label: "Read", count: 94 }, { label: "Unread", count: 12 },
  { label: "Queue", count: 7 }, { label: "Upcoming", count: 3 }, { label: "Done", count: 412 },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function PastelAvatar({ name, i, size = "h-10 w-10 text-xs" }: { name: string; i: number; size?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-semibold", size, PASTEL[i % PASTEL.length])}>
      {initials(name)}
    </span>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500">
      {children}
    </span>
  );
}

function Ticks({ read }: { read: boolean }) {
  return read ? <CheckCheck size={14} className="text-blue-500" /> : <Check size={14} className="text-slate-400" />;
}

function InboxMock() {
  const { ref, index } = useCycle<HTMLDivElement>(CONVOS.length, 4600);
  const active = CONVOS[index];
  const ch = CHANNELS[active.channel];

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_50px_120px_-45px_rgba(15,40,90,0.45)]">
      {/* browser bar */}
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto rounded-full bg-white px-4 py-1 text-[11px] text-slate-500 ring-1 ring-slate-200">app.agentawk.com/conversations/inbox</span>
      </div>

      <div className="bg-[#f2f5f9] p-3">
        {/* floating top bar */}
        <div className="flex h-14 items-center justify-between rounded-2xl border border-slate-200/70 bg-white px-4 shadow-[0_8px_24px_-14px_rgba(15,40,90,0.3)]">
          <div className="flex items-center gap-3">
            <BotMark className="h-7 w-auto" />
            <div className="hidden leading-tight sm:block">
              <p className="font-display text-[15px] font-black uppercase tracking-tight text-slate-900">
                AGEN<span style={{ color: P }}>TAWK</span>
              </p>
              <p className="text-[10px] text-slate-400">Workspace Manager</p>
            </div>
            <span className="ml-2 hidden items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[12px] font-semibold text-slate-700 md:flex" style={{ background: `${P}0d`, borderColor: `${P}1a` }}>
              <LayoutGrid size={14} style={{ color: P }} /> Menu <ChevronDown size={12} />
            </span>
            <span className="hidden h-8 w-8 items-center justify-center rounded-xl text-slate-500 md:flex">
              <Search size={16} />
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="relative text-slate-500">
              <Bell size={18} />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">3</span>
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: P }}>HA</span>
            <div className="hidden leading-tight sm:block">
              <p className="text-[12px] font-bold text-slate-900">Hamza Ali</p>
              <p className="flex items-center gap-1 text-[9px] font-semibold uppercase text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: P }} /> Online
              </p>
            </div>
          </div>
        </div>

        {/* three columns */}
        <div className="mt-3 flex h-[540px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* A — conversation list */}
          <div className="flex w-full shrink-0 flex-col border-r border-slate-200 md:w-[320px]">
            <div className="flex border-b border-slate-100 px-2">
              {TABS.map((t, i) => (
                <div key={t.label} className="relative flex flex-1 flex-col items-center py-2.5">
                  <span className={cn("text-[11.5px] font-semibold", i === 0 ? "text-slate-900" : "text-slate-500")}>{t.label}</span>
                  <span className="text-[10px] text-slate-500 opacity-60">{t.count}</span>
                  {i === 0 && <span className="absolute inset-x-1 bottom-0 h-0.5 rounded-full" style={{ background: P }} />}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 p-3">
              <div className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3 text-[12px] text-slate-400">
                <Search size={14} /> Search
              </div>
              <IconBtn><User size={15} /></IconBtn>
              <IconBtn><ListFilter size={15} /></IconBtn>
              <span className="hidden sm:contents">
                <IconBtn><Filter size={15} /></IconBtn>
                <IconBtn><ArrowUp size={15} /></IconBtn>
              </span>
              <IconBtn><Plus size={15} /></IconBtn>
            </div>
            <label className="flex items-center gap-2 px-4 pb-2 text-[11px] text-slate-500">
              <span className="h-3.5 w-3.5 rounded border border-slate-300" /> Select all
            </label>
            <ul className="relative flex-1 space-y-0.5 overflow-hidden px-2">
              {CONVOS.map((c, i) => (
                <li key={c.name} className="relative">
                  {i === index && (
                    <motion.div layoutId="real-inbox-active" className="absolute inset-0 rounded-md bg-slate-100" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                  )}
                  <div className="relative flex items-start gap-3 rounded-md p-3">
                    <div className="relative">
                      <PastelAvatar name={c.name} i={i} />
                      <ChannelBadge id={c.channel} className="absolute -bottom-0.5 -right-0.5 h-4 w-4 ring-2 ring-white" iconClassName="h-2.5 w-2.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className={cn("truncate text-[13px] text-slate-900", c.isNew && i !== index ? "font-bold" : "font-semibold")}>{c.name}</p>
                        <span className={cn("rounded px-1.5 py-px text-[9.5px] font-medium", STATUS[c.status])}>{c.status}</span>
                        <span className="ml-auto shrink-0 text-[10.5px] text-slate-400">{c.time}</span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2">
                        <p className="truncate text-[11.5px] text-slate-500">{c.preview}</p>
                        {c.isNew && i !== index && (
                          <span className="ml-auto flex shrink-0 items-center gap-1 text-[10.5px] font-medium text-red-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> New
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* B — chat thread */}
          <div className="hidden min-w-0 flex-1 flex-col md:flex">
            <div className="flex items-center gap-1 border-b border-slate-100 px-3 py-2.5">
              <span className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-600">
                <Folder size={14} /> Folder <ChevronDown size={12} />
              </span>
              <span className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-600">
                <MessagesSquare size={14} /> Bot &amp; Inbox <ChevronDown size={12} />
              </span>
              <span className="ml-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-emerald-600">
                <CheckCircle size={14} /> Mark as done
              </span>
              <MoreVertical size={16} className="text-slate-400" />
            </div>

            <div className="relative flex flex-1 flex-col justify-end gap-2 overflow-hidden bg-slate-50 px-5 py-4">
              <div aria-hidden className="absolute inset-0 opacity-[0.55]" style={{ backgroundImage: "url(/images/chat-doodle-bg.svg)", backgroundSize: "300px" }} />
              <div className="relative mb-auto flex justify-center pt-1">
                <span className="rounded-full bg-slate-200/80 px-3 py-1 text-[11px] text-slate-600">Today</span>
              </div>
              <AnimatePresence mode="popLayout">
                {active.chat.map((m, i) => (
                  <motion.div
                    key={active.name + i}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 + i * 0.4, type: "spring", stiffness: 320, damping: 26 }}
                    className={cn("relative flex", m.out ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-lg px-2.5 py-1.5 text-[13.5px] leading-snug text-[#111827] shadow-sm",
                        m.out ? "bg-[#dcf8c6]" : "border border-black/5 bg-white",
                      )}
                    >
                      {m.text}
                      <span className="ml-2 inline-flex translate-y-0.5 items-center gap-0.5 align-bottom text-[10.5px] text-slate-500">
                        {m.time} {m.out && <Ticks read />}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* composer */}
            <div className="border-t border-slate-100 bg-white p-3">
              <div className="mb-2 flex gap-1.5">
                <span className="rounded-full px-3 py-1 text-[11.5px] font-semibold" style={{ background: `${P}1a`, color: "#15803d" }}>Reply</span>
                <span className="rounded-full px-3 py-1 text-[11.5px] font-semibold text-slate-500">Note</span>
              </div>
              <div className="relative rounded-2xl border border-slate-200 px-3 pb-2 pt-3">
                <span className="absolute left-1/2 top-1 h-1 w-8 -translate-x-1/2 rounded-full bg-slate-200" />
                <p className="text-[12.5px] text-slate-400">Type a message…</p>
                <div className="mt-3 flex items-center gap-3 text-slate-500">
                  <Plus size={16} />
                  <Smile size={16} />
                  <span className="text-[12px] font-black">AI</span>
                  <Type size={15} />
                  <Mic size={16} className="ml-auto" />
                  <motion.span
                    className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-bold text-white"
                    style={{ background: P }}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
                  >
                    <Send size={13} /> Send
                  </motion.span>
                </div>
              </div>
            </div>
          </div>

          {/* C — contact panel */}
          <div className="hidden w-[290px] shrink-0 flex-col border-l border-slate-200 xl:flex">
            <AnimatePresence mode="wait">
              <motion.div key={active.name} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-3 border-b border-slate-100 p-4">
                  <PastelAvatar name={active.name} i={index} size="h-11 w-11 text-sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-slate-900">{active.name}</p>
                    <p className="truncate text-[11.5px] text-slate-500">{active.phone}</p>
                  </div>
                  <PanelRightClose size={16} className="text-slate-400" />
                </div>
                <div className="flex justify-between border-b border-slate-100 px-4 py-2.5 text-slate-400">
                  {[User, ImageIcon, PenLine, LayoutGrid, UserPlus, Archive].map((I, k) => (
                    <span key={k} className="flex h-8 w-8 items-center justify-center rounded-lg" style={k === 0 ? { background: `${P}1a`, color: P } : undefined}>
                      <I size={15} />
                    </span>
                  ))}
                </div>
                <div className="space-y-4 p-4 text-[12px]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700">Assigned to</span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: P }}>
                        <Zap size={11} /> Assign to myself
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <PastelAvatar name={active.agent} i={index + 2} size="h-6 w-6 text-[9px]" />
                      <span className="flex-1 text-slate-700">{active.agent}</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border" style={{ borderColor: P, color: P }}>
                        <ChevronDown size={14} />
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">Support Number</p>
                    <p className="mt-1.5 flex items-center gap-2 text-slate-500"><Headset size={13} /> +92 42 111 000 222</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">Chatting with channel</p>
                    <span className="mt-1.5 flex items-center gap-2 rounded-lg bg-slate-100/70 px-2.5 py-2 text-slate-600">
                      <ChannelBadge id={active.channel} className="h-5 w-5" iconClassName="h-3 w-3" />
                      <span className="truncate">{ch.name} · Our Store</span>
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700">In Bot</span>
                      <RefreshCw size={13} className="text-slate-400" />
                    </div>
                    <p className="mt-1.5 text-slate-500">Not currently part of any Bot.</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
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
          <Reveal key={f.title} delay={i * 0.08} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <f.icon size={20} className="text-brand" />
            <h3 className="mt-3 font-semibold text-fg">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{f.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
