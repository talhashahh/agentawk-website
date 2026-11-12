"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Building2, MessageSquare, Users, Bot, Sparkles, Upload, Gift, Wallet, Zap, Crown } from "lucide-react";
import type { Plan } from "@/config/site";

const PLAN_ICON = { gift: Gift, wallet: Wallet, zap: Zap, building: Crown } as const;

/** Rows mirror the plan checkout page in the app, minus the payment form. */
function featureRows(plan: Plan) {
  const d = plan.details;
  if (!d) return [];
  return [
    { name: "Workspaces", sub: `${plan.workspaces} included`, icon: Building2, color: "#0ea5e9" },
    { name: "Contacts", sub: `${plan.contactsPerWorkspace.toLocaleString()} per workspace`, icon: MessageSquare, color: "#10b981" },
    { name: "Human Agents", sub: `${d.agentsPerWorkspace} per workspace`, icon: Users, color: "#8b5cf6" },
    { name: "AI Assistants", sub: `${d.aiAssistantsPerWorkspace} per workspace`, icon: Bot, color: "#6366f1" },
    {
      name: "Communication Channels",
      sub: `${d.channelsEach} of each included${d.whatsappQrExcluded ? " (WhatsApp QR excluded)" : ""}`,
      icon: Sparkles,
      color: "#f59e0b",
    },
    ...(d.importExportContacts
      ? [{ name: "Import / Export Contacts", sub: "Included", icon: Upload, color: "var(--brand)" }]
      : []),
  ];
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
            aria-label={`${plan.name} pricing details`}
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

            <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1.35fr_1fr]">
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
  const rows = featureRows(plan);
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Icon size={19} />
        </span>
        <div>
          <p className="font-display text-lg font-bold text-fg">{plan.name}</p>
          <p className="text-[12px] text-muted">Everything included in this plan</p>
        </div>
      </div>
      <ul>
        {rows.map((r, i) => (
          <motion.li
            key={r.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.05 }}
            className="flex items-center gap-4 border-b border-line px-5 py-4 last:border-b-0"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `color-mix(in oklab, ${r.color} 12%, white)`, color: r.color }}
            >
              <r.icon size={18} />
            </span>
            <div>
              <p className="font-semibold text-fg">{r.name}</p>
              <p className="text-sm text-muted">{r.sub}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function PlanSummary({ plan }: { plan: Plan }) {
  const d = plan.details;
  const includes = [
    `${plan.workspaces} workspaces`,
    `${plan.contactsPerWorkspace.toLocaleString()} contacts/workspace`,
    ...(d
      ? [
          `${d.agentsPerWorkspace} agents/workspace`,
          `${d.aiAssistantsPerWorkspace} AI assistants/workspace`,
          `${d.channelsEach} channel/workspace`,
        ]
      : []),
  ].join(" · ");

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-soft/60 p-5 sm:p-6">
      <p className="font-display text-lg font-bold text-fg">Pricing summary</p>
      <div className="mt-5 flex items-start justify-between gap-3">
        <p className="font-semibold text-fg">{plan.name}: monthly</p>
        <p className="font-display text-lg font-bold text-fg">${plan.price.toFixed(2)}</p>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">Includes: {includes}</p>
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
