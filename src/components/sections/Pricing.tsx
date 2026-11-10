"use client";

import { motion } from "framer-motion";
import { Check, CreditCard, Receipt, Ticket, ShieldCheck, Gauge, Sparkles, ArrowRight } from "lucide-react";
import { Section, SectionHeading, Reveal, Glow } from "@/components/ui/Section";
import { BotMark } from "@/components/brand/Logo";
import { plans, links, type Plan } from "@/config/site";
import { useSequence } from "@/lib/hooks";
import { cn } from "@/lib/cn";

function PlanCard({ plan, i }: { plan: Plan; i: number }) {
  const free = plan.price === 0;
  const priced = plan.price !== null;
  const href = priced ? links.signup : "#contact";
  const cta = free ? "Start free" : priced ? "Get started" : "Talk to us";

  return (
    <Reveal delay={i * 0.1} className="h-full">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={cn(
          "relative flex h-full flex-col rounded-3xl p-6",
          plan.popular ? "glow-border bg-ink-2 shadow-[0_30px_100px_-30px_var(--brand)]" : "glass",
        )}
      >
        {plan.popular && (
          <motion.span
            className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={12} /> Most popular
          </motion.span>
        )}
        <p className="font-display text-xl font-bold text-white">{plan.name}</p>
        <p className="mt-1 text-sm text-slate-400">{plan.tagline}</p>

        <div className="mt-6 flex items-end gap-1">
          {priced ? (
            <>
              <span className="font-display text-5xl font-extrabold tracking-tight text-white">${plan.price}</span>
              <span className="mb-1.5 text-sm text-slate-400">/month</span>
            </>
          ) : (
            <span className="font-display text-3xl font-extrabold tracking-tight text-white">Let&apos;s talk</span>
          )}
        </div>
        {plan.note ? <p className="mt-1 text-[12px] text-brand">{plan.note}</p> : <p className="mt-1 text-[12px] text-transparent">.</p>}

        <a
          href={href}
          className={cn(
            "group mt-6 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all",
            plan.popular ? "bg-brand text-ink hover:shadow-[0_0_40px_-6px_var(--brand)]" : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
          )}
        >
          {cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </a>

        <ul className="mt-6 grid gap-3">
          {plan.highlights.map((h, k) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + k * 0.06 }}
              className="flex items-start gap-2.5 text-sm text-slate-300"
            >
              <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                <Check size={11} strokeWidth={3} />
              </span>
              {h}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </Reveal>
  );
}

const LINES = [
  { label: "Ignite plan · monthly", amount: "Plan" },
  { label: "Extra workspaces × 2", amount: "+ usage" },
  { label: "Coupon WELCOME", amount: "− discount" },
];

function InvoiceDemo() {
  const { ref, shown } = useSequence<HTMLDivElement>(LINES.length + 2, 900, 3000);
  return (
    <div ref={ref} className="glass relative overflow-hidden rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BotMark className="h-7 w-auto" />
          <div>
            <p className="text-sm font-semibold text-white">Invoice</p>
            <p className="text-[11px] text-slate-500">Billed on the 1st of every month</p>
          </div>
        </div>
        <Receipt size={20} className="text-slate-500" />
      </div>
      <ul className="mt-5 grid gap-2">
        {LINES.map((l, i) => (
          <motion.li
            key={l.label}
            initial={false}
            animate={{ opacity: shown > i ? 1 : 0.15, x: shown > i ? 0 : -8 }}
            className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5 text-[13px]"
          >
            <span className="text-slate-300">{l.label}</span>
            <span className="font-semibold text-white">{l.amount}</span>
          </motion.li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-sm text-slate-400">Total this month</span>
        <motion.span animate={{ opacity: shown > LINES.length ? 1 : 0.2 }} className="font-display text-lg font-bold text-white">
          Clear & upfront
        </motion.span>
      </div>
      <motion.div
        initial={false}
        animate={{ scale: shown === LINES.length + 2 ? 1 : 0, rotate: -12, opacity: shown === LINES.length + 2 ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 14 }}
        className="absolute right-6 top-20 rounded-xl border-2 border-brand px-4 py-1.5 font-display text-xl font-extrabold uppercase tracking-widest text-brand"
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
  return (
    <Section id="pricing" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full">
        <div className="absolute left-1/2 top-40 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand opacity-[0.08] blur-[120px]" />
      </div>
      <SectionHeading
        eyebrow="Pricing & billing"
        icon={<CreditCard size={14} />}
        title="Simple plans."
        highlight="Honest billing."
        subtitle="Start free and upgrade when you're ready. Every plan gives you the shared inbox, and bigger plans add more workspaces, seats, AI and white-label."
      />

      <div className="relative mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p, i) => (
          <PlanCard key={p.id} plan={p} i={i} />
        ))}
      </div>

      <div className="relative mt-20 grid items-center gap-10 lg:grid-cols-2">
        <Glow className="left-0 top-0 h-80 w-80" />
        <Reveal>
          <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Billing that <span className="text-gradient">never surprises you.</span>
          </h3>
          <p className="mt-4 text-slate-400">
            Your agency&apos;s billing lives in one clean screen: your plan, what you&apos;ve used, your coupons and every invoice.
            No hidden fees, and no digging through emails.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {BILLING.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <b.icon size={18} />
                </span>
                <div>
                  <p className="font-semibold text-white">{b.title}</p>
                  <p className="text-sm text-slate-400">{b.text}</p>
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
