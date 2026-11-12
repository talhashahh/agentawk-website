"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard, Receipt, Ticket, ShieldCheck, Gauge, Sparkles, ArrowRight, Gift, Wallet, Zap, Building2, LayoutGrid, Contact, Eye,
} from "lucide-react";
import { PlanDetailsModal } from "@/components/sections/PlanDetailsModal";
import { Section, SectionHeading, Reveal, Glow } from "@/components/ui/Section";
import { BotMark } from "@/components/brand/Logo";
import { plans, links, type Plan } from "@/config/site";
import { useCountUp, useSequence } from "@/lib/hooks";
import { cn } from "@/lib/cn";

const PLAN_ICON = { gift: Gift, wallet: Wallet, zap: Zap, building: Building2 } as const;
const PLAN_TINT = { gift: "#f59e0b", wallet: "#10b981", zap: "#2563eb", building: "#6366f1" } as const;

function Stat({ value, label, icon: Icon, hot }: { value: number; label: string; icon: typeof LayoutGrid; hot: boolean }) {
  const { ref, value: v } = useCountUp<HTMLDivElement>(value, 1400);
  return (
    <div ref={ref} className={cn("flex-1 rounded-2xl px-3 py-3", hot ? "bg-white/10" : "bg-soft")}>
      <Icon size={15} className={hot ? "text-blue-100" : "text-brand"} />
      <p className={cn("mt-1 font-display text-xl font-extrabold", hot ? "text-white" : "text-fg")}>{v.toLocaleString()}</p>
      <p className={cn("text-[11px]", hot ? "text-blue-100" : "text-muted")}>{label}</p>
    </div>
  );
}

function PlanCard({ plan, i, onView }: { plan: Plan; i: number; onView: (p: Plan) => void }) {
  const free = plan.price === 0;
  const hot = !!plan.popular;
  const Icon = PLAN_ICON[plan.icon];
  const tint = PLAN_TINT[plan.icon];

  return (
    <Reveal delay={i * 0.1} className="h-full">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={cn(
          "relative flex h-full flex-col rounded-3xl p-6",
          hot
            ? "glow-border bg-gradient-to-b from-[#0b2a7a] via-[#1d4ed8] to-[#2563eb] text-white shadow-[0_30px_80px_-25px_rgba(37,99,235,0.7)]"
            : "glass",
        )}
      >
        {hot && (
          <motion.span
            className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={12} /> Most popular
          </motion.span>
        )}

        <motion.span
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: hot ? "rgba(255,255,255,0.15)" : `color-mix(in oklab, ${tint} 12%, white)`, color: hot ? "#fff" : tint }}
          whileHover={{ rotate: [0, -12, 12, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon size={22} />
        </motion.span>

        <p className={cn("mt-5 font-display text-xl font-bold", hot ? "text-white" : "text-fg")}>{plan.name}</p>
        <p className={cn("mt-1 text-sm", hot ? "text-blue-100" : "text-muted")}>{plan.tagline}</p>

        <div className="mt-5 flex items-end gap-1">
          <span className={cn("font-display text-5xl font-extrabold tracking-tight", hot ? "text-white" : "text-fg")}>${plan.price}</span>
          <span className={cn("mb-1.5 text-sm font-medium", hot ? "text-blue-100" : "text-muted")}>/month</span>
        </div>
        <p className={cn("mt-2 text-[13px]", hot ? "text-blue-100" : "text-muted")}>
          {plan.workspaces} workspace{plan.workspaces === 1 ? "" : "s"} · {plan.contactsPerWorkspace.toLocaleString()} contacts each
        </p>

        <div className="mt-5 flex gap-2">
          <Stat value={plan.workspaces} label={plan.workspaces === 1 ? "workspace" : "workspaces"} icon={LayoutGrid} hot={hot} />
          <Stat value={plan.contactsPerWorkspace} label="contacts each" icon={Contact} hot={hot} />
        </div>

        <div className="mt-auto pt-6" />
        {(() => {
          const btn = cn(
            "group flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all",
            hot
              ? "bg-white text-brand hover:shadow-[0_0_40px_-6px_rgba(255,255,255,0.8)]"
              : free
                ? "bg-brand text-white hover:shadow-[0_12px_30px_-10px_var(--brand)]"
                : "border border-line bg-white text-fg hover:border-brand/40 hover:text-brand",
          );
          // Paid plans open the plan details popup; the free plan goes straight to sign-up.
          return plan.details ? (
            <button type="button" onClick={() => onView(plan)} className={btn}>
              <Eye size={15} /> View plans
            </button>
          ) : (
            <a href={links.signup} className={btn}>
              Start free <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          );
        })()}
      </motion.div>
    </Reveal>
  );
}

const LINES = [
  { label: "Ignite plan · monthly", amount: "$299" },
  { label: "Extra workspaces", amount: "+ usage" },
  { label: "Coupon applied", amount: "− discount" },
];

function InvoiceDemo() {
  const { ref, shown } = useSequence<HTMLDivElement>(LINES.length + 2, 900, 3000);
  const paid = shown === LINES.length + 2;
  return (
    <div ref={ref} className="glass relative overflow-hidden rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BotMark className="h-7 w-auto" />
          <div>
            <p className="text-sm font-semibold text-fg">Invoice</p>
            <p className="text-[11px] text-slate-500">Billed on the 1st of every month</p>
          </div>
        </div>
        <Receipt size={20} className="text-slate-400" />
      </div>
      <ul className="mt-5 grid gap-2">
        {LINES.map((l, i) => (
          <motion.li
            key={l.label}
            initial={false}
            animate={{ opacity: shown > i ? 1 : 0.25, x: shown > i ? 0 : -8 }}
            className="flex items-center justify-between rounded-xl bg-soft px-3.5 py-2.5 text-[13px]"
          >
            <span className="text-slate-600">{l.label}</span>
            <span className="font-semibold text-fg">{l.amount}</span>
          </motion.li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="text-sm text-muted">Total this month</span>
        <motion.span animate={{ opacity: shown > LINES.length ? 1 : 0.25 }} className="font-display text-lg font-bold text-fg">
          Clear & upfront
        </motion.span>
      </div>
      <motion.div
        initial={false}
        animate={{ scale: paid ? 1 : 0, rotate: -12, opacity: paid ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 14 }}
        className="absolute right-6 top-20 rounded-xl border-2 border-emerald-500 bg-white/80 px-4 py-1.5 font-display text-xl font-extrabold uppercase tracking-widest text-emerald-600"
      >
        Paid ✓
      </motion.div>
    </div>
  );
}

const BILLING = [
  { icon: CreditCard, title: "Secure checkout", text: "Pay safely online in a few clicks." },
  { icon: Receipt, title: "Invoices on tap", text: "Download every invoice whenever you need it." },
  { icon: Ticket, title: "Coupons & discounts", text: "Apply a coupon and the price updates instantly." },
  { icon: Gauge, title: "Live usage", text: "See workspaces, agents and contacts used this month." },
  { icon: ShieldCheck, title: "Upgrade anytime", text: "Move to a bigger plan as your team grows." },
];

export function Pricing() {
  const [viewing, setViewing] = useState<Plan | null>(null);
  const closeDetails = useCallback(() => setViewing(null), []);

  return (
    <Section id="pricing" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full">
        <div className="absolute left-1/2 top-40 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand opacity-[0.10] blur-[120px]" />
      </div>
      <SectionHeading
        eyebrow="Pricing & billing"
        icon={<CreditCard size={14} />}
        title="Simple plans."
        highlight="Honest billing."
        subtitle="Start free and upgrade when you're ready. Every plan gives you the shared inbox; bigger plans give you more workspaces and more contacts in each one."
      />

      <div className="relative mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p, i) => (
          <PlanCard key={p.id} plan={p} i={i} onView={setViewing} />
        ))}
      </div>
      <PlanDetailsModal plan={viewing} onClose={closeDetails} />

      <div className="relative mt-20 grid items-center gap-10 lg:grid-cols-2">
        <Glow className="left-0 top-0 h-80 w-80" />
        <Reveal>
          <h3 className="font-display text-3xl font-bold text-fg sm:text-4xl">
            Billing that <span className="text-gradient">never surprises you.</span>
          </h3>
          <p className="mt-4 text-muted">
            Your organization&apos;s billing lives in one clean screen: your plan, what you&apos;ve used, your coupons and every invoice.
            No hidden fees, and no digging through emails.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {BILLING.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <b.icon size={18} />
                </span>
                <div>
                  <p className="font-semibold text-fg">{b.title}</p>
                  <p className="text-sm text-muted">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <InvoiceDemo />
        </Reveal>
      </div>
    </Section>
  );
}
