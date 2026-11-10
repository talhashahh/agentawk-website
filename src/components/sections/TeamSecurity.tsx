"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ShieldCheck, Users, Lock, Inbox, Contact, Megaphone, Bot, Settings, CreditCard, ArrowRightLeft } from "lucide-react";
import { Section, SectionHeading, Reveal, Glow } from "@/components/ui/Section";
import { Avatar } from "@/components/ui/Avatar";
import { ChannelBadge } from "@/components/channels";
import { useCycle } from "@/lib/hooks";
import { cn } from "@/lib/cn";

const PERMS = [
  { key: "inbox", label: "Inbox", icon: Inbox },
  { key: "contacts", label: "Contacts", icon: Contact },
  { key: "campaigns", label: "Campaigns", icon: Megaphone },
  { key: "bots", label: "Bots", icon: Bot },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "billing", label: "Billing", icon: CreditCard },
] as const;

const ROLES: { name: string; person: string; allowed: string[]; sees: string }[] = [
  { name: "Owner", person: "Rehan Ahmed", allowed: ["inbox", "contacts", "campaigns", "bots", "settings", "billing"], sees: "Everything" },
  { name: "Admin", person: "Ayesha Noor", allowed: ["inbox", "contacts", "campaigns", "bots", "settings"], sees: "All workspaces, no billing" },
  { name: "Agent", person: "Hamza Ali", allowed: ["inbox", "contacts"], sees: "Only chats assigned to him" },
  { name: "Marketing", person: "Sana Iqbal", allowed: ["contacts", "campaigns"], sees: "Contacts & campaigns only" },
];

function RolesCard() {
  const { ref, index } = useCycle<HTMLDivElement>(ROLES.length, 2800);
  const role = ROLES[index];
  return (
    <div ref={ref} className="glass relative h-full overflow-hidden rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
          <ShieldCheck size={20} className="text-brand" /> Roles & permissions
        </h3>
        <motion.span
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-brand"
          animate={{ boxShadow: ["0 0 0 0 color-mix(in oklab, var(--brand) 50%, transparent)", "0 0 0 14px transparent"] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <Lock size={16} />
        </motion.span>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {ROLES.map((r, i) => (
          <span key={r.name} className={cn("relative rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors", i === index ? "text-ink" : "text-slate-400")}>
            {i === index && <motion.span layoutId="role-pill" className="absolute inset-0 rounded-full bg-brand" />}
            <span className="relative">{r.name}</span>
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={role.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mt-5 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
          <Avatar name={role.person} className="h-10 w-10 text-xs" />
          <div>
            <p className="text-sm font-semibold text-white">{role.person}</p>
            <p className="text-[12px] text-slate-400">Sees: {role.sees}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <ul className="mt-4 grid grid-cols-2 gap-2">
        {PERMS.map((p) => {
          const on = role.allowed.includes(p.key);
          return (
            <li key={p.key} className={cn("flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors duration-500", on ? "border-brand/30 bg-brand/[0.07]" : "border-white/5 bg-white/[0.02]")}>
              <p.icon size={15} className={cn("transition-colors duration-500", on ? "text-brand" : "text-slate-600")} />
              <span className={cn("text-[13px] transition-colors duration-500", on ? "text-white" : "text-slate-500")}>{p.label}</span>
              <span className={cn("ml-auto flex h-5 w-9 items-center rounded-full p-0.5 transition-colors duration-500", on ? "bg-brand" : "bg-white/10")}>
                <motion.span layout className="h-4 w-4 rounded-full bg-white shadow" style={{ marginLeft: on ? "auto" : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const TEAMS = ["Sales", "Support"];

function TeamCard() {
  const { ref, index } = useCycle<HTMLDivElement>(2, 2600);
  return (
    <div ref={ref} className="glass relative h-full overflow-hidden rounded-3xl p-6">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
        <Users size={20} className="text-brand" /> Teams that work together
      </h3>
      <p className="mt-2 text-sm text-slate-400">Group agents into teams and hand chats over without losing a word.</p>

      <LayoutGroup>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {TEAMS.map((t, ti) => (
            <div key={t} className="min-h-[230px] rounded-2xl border border-white/5 bg-white/[0.03] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-slate-300">{t} team</span>
                <div className="flex -space-x-1.5">
                  {(ti === 0 ? ["Hamza Ali", "Usman Tariq"] : ["Ayesha Noor", "Zara Shah"]).map((n) => (
                    <Avatar key={n} name={n} className="h-6 w-6 text-[9px]" />
                  ))}
                </div>
              </div>
              <div className="mt-3 grid gap-2">
                <div className="rounded-xl bg-white/5 p-2.5 text-[12px] text-slate-400">
                  {ti === 0 ? "New lead from Instagram" : "Order question from Messenger"}
                </div>
                {index === ti && (
                  <motion.div layoutId="moving-chat" transition={{ type: "spring", stiffness: 160, damping: 20 }} className="rounded-xl border border-brand/40 bg-brand/10 p-2.5">
                    <div className="flex items-center gap-2">
                      <ChannelBadge id="whatsapp" className="h-6 w-6" />
                      <span className="text-[12px] font-semibold text-white">Ali Raza</span>
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-300">“I need a refund for order #2381”</p>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>
      <AnimatePresence mode="wait">
        <motion.p key={index} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex items-center gap-2 text-[12px] text-slate-400">
          <ArrowRightLeft size={14} className="text-brand" />
          {index === 1 ? "Hamza transferred the chat to Support, with full history" : "Chat assigned to the Sales team"}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function TeamSecurity() {
  return (
    <Section id="team">
      <SectionHeading
        eyebrow="Teams & security"
        icon={<ShieldCheck size={14} />}
        title="Your whole team on one product."
        highlight="Everyone sees only what they should."
        subtitle="Invite your people, put them in teams and give each role exactly the access it needs. Agents see their own chats, managers see the big picture, and only owners touch billing."
      />
      <div className="relative mt-16 grid gap-5 lg:grid-cols-2">
        <Glow className="left-1/4 top-1/3 h-80 w-80" />
        <Reveal className="h-full"><TeamCard /></Reveal>
        <Reveal delay={0.1} className="h-full"><RolesCard /></Reveal>
      </div>
    </Section>
  );
}
