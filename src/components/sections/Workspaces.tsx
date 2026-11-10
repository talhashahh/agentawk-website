"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building2, LayoutGrid, Plus, Store, ShoppingBag, Headphones } from "lucide-react";
import { Section, SectionHeading, Reveal } from "@/components/ui/Section";
import { BotMark } from "@/components/brand/Logo";
import { ChannelBadge, type ChannelId } from "@/components/channels";
import { Avatar } from "@/components/ui/Avatar";
import { useSequence } from "@/lib/hooks";

const WORKSPACES: { name: string; icon: typeof Store; channels: ChannelId[]; team: string[]; color: string }[] = [
  { name: "Downtown Store", icon: Store, channels: ["whatsapp", "instagram"], team: ["Hamza Ali", "Sana Iqbal", "Usman Tariq"], color: "#f59e0b" },
  { name: "Online Shop", icon: ShoppingBag, channels: ["instagram", "messenger", "webchat"], team: ["Ayesha Noor", "Bilal Ahmed"], color: "#ec4899" },
  { name: "Support Desk", icon: Headphones, channels: ["whatsapp", "telegram"], team: ["Zara Shah", "Fahad Khan", "Maria Aslam"], color: "#06b6d4" },
];

const STEPS = [
  { n: "01", title: "Create a workspace", text: "One for every brand, branch or client. Each one is its own world." },
  { n: "02", title: "Connect its channels", text: "Give every workspace its own WhatsApp, Instagram, Messenger and more." },
  { n: "03", title: "Assign your team", text: "Agents join only the workspaces you choose, and see only those chats." },
];

function WorkspaceCard({ ws, delay }: { ws: (typeof WORKSPACES)[number]; delay: number }) {
  const { ref, shown } = useSequence<HTMLDivElement>(ws.team.length, 1100, 3000);
  return (
    <Reveal delay={delay}>
      <div ref={ref} className="glass relative rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${ws.color}22`, color: ws.color }}>
            <ws.icon size={20} />
          </span>
          <div>
            <p className="font-semibold text-white">{ws.name}</p>
            <p className="text-[11px] text-slate-500">Workspace</p>
          </div>
        </div>
        <div className="mt-4 flex gap-1.5">
          {ws.channels.map((c) => (
            <ChannelBadge key={c} id={c} className="h-7 w-7" />
          ))}
        </div>
        <div className="mt-4 flex min-h-9 items-center justify-between rounded-xl bg-white/5 px-3 py-2">
          <div className="flex -space-x-2">
            <AnimatePresence>
              {ws.team.slice(0, shown).map((m) => (
                <motion.span key={m} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                  <Avatar name={m} className="h-7 w-7 text-[10px]" />
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
          <motion.span
            className="flex items-center gap-1 rounded-full bg-brand/15 px-2.5 py-1 text-[11px] font-semibold text-brand"
            animate={{ scale: shown < ws.team.length ? [1, 1.08, 1] : 1 }}
            transition={{ duration: 0.6, repeat: shown < ws.team.length ? Infinity : 0 }}
          >
            <Plus size={12} /> {shown < ws.team.length ? "Assigning" : `${ws.team.length} agents`}
          </motion.span>
        </div>
      </div>
    </Reveal>
  );
}

export function Workspaces() {
  return (
    <Section id="workspaces">
      <SectionHeading
        eyebrow="Workspaces"
        icon={<LayoutGrid size={14} />}
        title="One account."
        highlight="As many businesses as you run."
        subtitle="Run every brand, branch or client from a single agency account. Create a workspace, connect its channels, assign your people, and you're done."
      />

      <div className="relative mx-auto mt-16 max-w-5xl">
        {/* agency */}
        <Reveal className="relative z-10 mx-auto w-fit">
          <div className="flex items-center gap-3 rounded-2xl border border-brand/30 bg-ink-2 px-5 py-4 shadow-[0_0_60px_-15px_var(--brand)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15">
              <BotMark className="h-7 w-auto" />
            </span>
            <div>
              <p className="flex items-center gap-1.5 font-semibold text-white">
                <Building2 size={15} className="text-brand" /> Your Agency
              </p>
              <p className="text-[12px] text-slate-400">Billing, users & every workspace</p>
            </div>
          </div>
        </Reveal>

        {/* connectors */}
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="hidden h-24 w-full md:block" aria-hidden>
          {[167, 500, 833].map((x, i) => (
            <g key={x}>
              <motion.path
                d={`M500 0 C 500 60, ${x} 50, ${x} 120`}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + i * 0.15 }}
              />
              <motion.path
                d={`M500 0 C 500 60, ${x} 50, ${x} 120`}
                stroke="var(--brand)"
                strokeWidth="2.5"
                strokeDasharray="6 14"
                fill="none"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
            </g>
          ))}
        </svg>
        <div className="mx-auto h-10 w-px bg-gradient-to-b from-brand to-transparent md:hidden" />

        <div className="grid gap-4 md:grid-cols-3">
          {WORKSPACES.map((ws, i) => (
            <WorkspaceCard key={ws.name} ws={ws} delay={0.2 + i * 0.12} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1} className="relative">
            <span className="font-display text-5xl font-extrabold text-white/5">{s.n}</span>
            <h3 className="-mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
