"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Receipt, Ticket, ShieldCheck, Gauge, Eye, Star, Check } from "lucide-react";
import {
  PlanDetailsModal, LimitBadge, PLAN_ICON, FEATURE_ICON, FEATURE_COLOR,
} from "@/components/sections/PlanDetailsModal";
import { Section, SectionHeading, Reveal, Glow } from "@/components/ui/Section";
import { BotMark } from "@/components/brand/Logo";
import { plans, PLAN_FEATURES, formatLimit, type LimitValue, type Plan } from "@/config/site";
import { useSequence } from "@/lib/hooks";
import { cn } from "@/lib/cn";

const PLAN_TINT = { rocket: "#0ea5e9", trending: "#2563eb", briefcase: "#8b5cf6", crown: "#f59e0b" } as const;

/** Short card bullets, e.g. "3 human agents" or "Unlimited channels". */
function highlight(value: LimitValue, one: string, many: string) {
  if (value === "unlimited") return `Unlimited ${many}`;
  if (typeof value === "number") return `${formatLimit(value)} ${value === 1 ? one : many}`;
  return many;
}

function PlanCard({ plan, i, onView }: { plan: Plan; i: number; onView: (p: Plan) => void }) {
  const hot = !!plan.popular;
  const Icon = PLAN_ICON[plan.icon];
  const tint = PLAN_TINT[plan.icon];
  const l = plan.limits;
  const bullets = [
    highlight(l.workspaces, "workspace", "workspaces"),
    highlight(l.agents, "human agent", "human agents"),
    highlight(l.channels, "channel", "channels"),
    highlight(l.contacts, "contact", "contacts"),
    highlight(l.aiAgents, "AI assistant", "AI assistants"),
    `${highlight(l.aiReplies, "AI reply", "AI replies")} / month`,
  ];

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
            className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star size={12} className="fill-white" /> Most popular
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

        <ul className={cn("mt-6 grid gap-2.5 border-t pt-5 text-sm", hot ? "border-white/15" : "border-line")}>
          {bullets.map((b) => (
            <li key={b} className={cn("flex items-center gap-2.5", hot ? "text-blue-50" : "text-slate-600")}>
              <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full", hot ? "bg-white/20 text-white" : "bg-brand/10 text-brand")}>
                <Check size={12} strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7" />
        <button
          type="button"
          onClick={() => onView(plan)}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all",
            hot
              ? "bg-white text-brand hover:shadow-[0_0_40px_-6px_rgba(255,255,255,0.8)]"
              : "border border-line bg-white text-fg hover:border-brand/40 hover:text-brand",
          )}
        >
          <Eye size={15} /> View plans
        </button>
      </motion.div>
    </Reveal>
  );
}

/** Full side-by-side list of every limit, the same rows as the boss's pricing table. */
function CompareTable({ onView }: { onView: (p: Plan) => void }) {
  return (
    <Reveal className="mt-20">
      <div className="text-center">
        <h3 className="font-display text-3xl font-bold text-fg sm:text-4xl">
          Compare <span className="text-gradient">every plan</span>
        </h3>
        <p className="mt-3 text-muted">Everything you get, side by side.</p>
      </div>

      <div className="glass mt-10 overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="w-[26%] px-6 py-5 text-sm font-semibold text-muted">Features</th>
                {plans.map((p) => (
                  <th key={p.id} className={cn("px-4 py-5 text-center align-bottom", p.popular && "bg-brand/[0.06]")}>
                    {p.popular && (
                      <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                        <Star size={10} className="fill-amber-400 text-amber-400" /> Popular
                      </span>
                    )}
                    <p className="font-display text-lg font-bold text-fg">{p.name}</p>
                    <p className="text-sm text-muted">
                      <span className="font-display text-xl font-extrabold text-fg">${p.price}</span> /month
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLAN_FEATURES.map((f, r) => {
                const FIcon = FEATURE_ICON[f.key];
                const color = FEATURE_COLOR[f.key];
                return (
                  <motion.tr
                    key={f.key}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: r * 0.05 }}
                    className="border-b border-line last:border-b-0 hover:bg-soft/70"
                  >
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-3 font-medium text-fg">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: `color-mix(in oklab, ${color} 12%, white)`, color }}
                        >
                          <FIcon size={16} />
                        </span>
                        {f.label}
                      </span>
                    </td>
                    {plans.map((p) => (
                      <td key={p.id} className={cn("px-4 py-4 text-center", p.popular && "bg-brand/[0.06]")}>
                        <LimitBadge value={p.limits[f.key]} />
                        {p.notes?.[f.key] && <p className="mt-0.5 text-[11px] text-muted">{p.notes[f.key]}</p>}
                      </td>
                    ))}
                  </motion.tr>
                );
              })}
              <tr>
                <td className="px-6 py-5" />
                {plans.map((p) => (
                  <td key={p.id} className={cn("px-4 py-5 text-center", p.popular && "bg-brand/[0.06]")}>
                    <button
                      type="button"
                      onClick={() => onView(p)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-bold transition",
                        p.popular ? "bg-brand text-white hover:shadow-[0_10px_24px_-10px_var(--brand)]" : "border border-line bg-white text-fg hover:border-brand/40 hover:text-brand",
                      )}
                    >
                      <Eye size={14} /> View plans
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}

const LINES = [
  { label: "Growth plan · monthly", amount: "$99" },
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
        subtitle="Pick the plan that fits your team. Every plan includes the shared inbox and campaigns; bigger plans add more human agents, channels, contacts and AI assistants."
      />

      <div className="relative mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p, i) => (
          <PlanCard key={p.id} plan={p} i={i} onView={setViewing} />
        ))}
      </div>

      <CompareTable onView={setViewing} />
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
