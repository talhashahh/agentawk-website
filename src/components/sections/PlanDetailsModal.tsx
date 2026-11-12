"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, Check, Infinity as InfinityIcon, LayoutGrid, Headset, Radio, Contact, Bot, MessagesSquare, Workflow, Megaphone, Code,
  Rocket, TrendingUp, Briefcase, Crown, Star,
} from "lucide-react";
import { PLAN_FEATURES, formatLimit, type LimitValue, type Plan, type PlanFeatureKey } from "@/config/site";
import { cn } from "@/lib/cn";

export const PLAN_ICON = { rocket: Rocket, trending: TrendingUp, briefcase: Briefcase, crown: Crown } as const;

export const FEATURE_ICON: Record<PlanFeatureKey, typeof Bot> = {
  workspaces: LayoutGrid,
  agents: Headset,
  channels: Radio,
  contacts: Contact,
  aiAgents: Bot,
  aiReplies: MessagesSquare,
  automations: Workflow,
  campaigns: Megaphone,
  api: Code,
};

export const FEATURE_COLOR: Record<PlanFeatureKey, string> = {
  workspaces: "#0ea5e9",
  agents: "#8b5cf6",
  channels: "#f59e0b",
  contacts: "#10b981",
  aiAgents: "#6366f1",
  aiReplies: "#ec4899",
  automations: "#2563eb",
  campaigns: "#f97316",
  api: "#64748b",
};

/** A plan value as a small badge: number, Unlimited, Included or Not included. */
export function LimitBadge({ value, onDark }: { value: LimitValue; onDark?: boolean }) {
  if (value === "unlimited") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[13px] font-semibold text-emerald-600">
        <InfinityIcon size={14} /> Unlimited
      </span>
    );
  }
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white" title="Included">
        <Check size={14} strokeWidth={3} />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 text-rose-500" title="Not included">
        <X size={14} strokeWidth={3} />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span className={cn("text-[15px] font-bold", onDark ? "text-white" : "text-fg")}>{formatLimit(value)}</span>;
}

export function PlanDetailsModal({ plan, onClose }: { plan: Plan | null; onClose: () => void }) {
  // Close on Escape and stop the page behind from scrolling while open.
  useEffect(() => {
    if (!plan) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [plan, onClose]);

  // Render into <body> so no transformed parent section can trap the fixed overlay.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {plan && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${plan.name} plan details`}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-[0_40px_120px_-30px_rgba(15,23,42,0.6)]"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-slate-500 transition hover:bg-slate-200 hover:text-fg"
            >
              <X size={18} />
            </button>

            <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1.4fr_1fr]">
              <PlanFeatures plan={plan} />
              <PlanSummary plan={plan} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function PlanFeatures({ plan }: { plan: Plan }) {
  const Icon = PLAN_ICON[plan.icon];
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4 pr-14 md:pr-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Icon size={19} />
        </span>
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-bold text-fg">
            {plan.name}
            {plan.popular && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-600">
                <Star size={11} className="fill-amber-400 text-amber-400" /> Popular
              </span>
            )}
          </p>
          <p className="text-[12px] text-muted">Everything included in this plan</p>
        </div>
      </div>
      <ul>
        {PLAN_FEATURES.map((f, i) => {
          const FIcon = FEATURE_ICON[f.key];
          const color = FEATURE_COLOR[f.key];
          const note = plan.notes?.[f.key];
          return (
            <motion.li
              key={f.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 + i * 0.04 }}
              className="flex items-center gap-4 border-b border-line px-5 py-3.5 last:border-b-0"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `color-mix(in oklab, ${color} 12%, white)`, color }}
              >
                <FIcon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-fg">{f.label}</p>
                {note && <p className="text-[12px] text-muted">{note}</p>}
              </div>
              <LimitBadge value={plan.limits[f.key]} />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

function PlanSummary({ plan }: { plan: Plan }) {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-soft/60 p-5 sm:p-6">
      <p className="font-display text-lg font-bold text-fg">Pricing summary</p>
      <p className="mt-1 text-sm text-muted">{plan.tagline}</p>

      <div className="mt-6 flex items-start justify-between gap-3">
        <p className="font-semibold text-fg">{plan.name} plan: monthly</p>
        <p className="font-display text-lg font-bold text-fg">${plan.price.toFixed(2)}</p>
      </div>
      {plan.notes?.workspaces && (
        <div className="mt-2 flex items-start justify-between gap-3 text-[13px] text-muted">
          <p>Extra workspaces</p>
          <p>{plan.notes.workspaces.replace(/ per extra workspace$/, " each")}</p>
        </div>
      )}

      <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
        <p className="font-semibold text-fg">Total</p>
        <p>
          <span className="font-display text-3xl font-extrabold text-fg">${plan.price.toFixed(2)}</span>
          <span className="ml-1 text-sm text-muted">/month</span>
        </p>
      </div>
    </div>
  );
}
