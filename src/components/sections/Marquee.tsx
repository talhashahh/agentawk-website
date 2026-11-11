"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import {
  Inbox, Workflow, Megaphone, Sparkles, LayoutGrid, ShieldCheck, Images, UsersRound, MessagesSquare, Palette, Contact, FileText,
  type LucideIcon,
} from "lucide-react";

const loop = (duration: number, extra: object = {}) => ({ duration, repeat: Infinity, ease: "easeInOut" as const, ...extra });

// Shown like a "trusted by" logo strip: grey wordmarks that slowly scroll by.
const ITEMS: { label: string; icon: LucideIcon; move: TargetAndTransition }[] = [
  { label: "Shared Inbox", icon: Inbox, move: { y: [0, -3, 0], transition: loop(2.2) } },
  { label: "Smart Flows", icon: Workflow, move: { rotate: [0, 10, -10, 0], transition: loop(3) } },
  { label: "Campaigns", icon: Megaphone, move: { rotate: [0, -12, 8, 0], transition: loop(1.8, { repeatDelay: 0.8 }) } },
  { label: "AI Assistants", icon: Sparkles, move: { scale: [1, 1.2, 1], transition: loop(2.4) } },
  { label: "Workspaces", icon: LayoutGrid, move: { rotate: [0, 90, 90, 180], transition: loop(3.4) } },
  { label: "Roles & Teams", icon: ShieldCheck, move: { scale: [1, 1.12, 1], transition: loop(2) } },
  { label: "Media Gallery", icon: Images, move: { rotateY: [0, 180, 360], transition: loop(3.4) } },
  { label: "WhatsApp Groups", icon: UsersRound, move: { x: [0, -2, 2, 0], transition: loop(2.6) } },
  { label: "Website Chat", icon: MessagesSquare, move: { y: [0, -4, 0], transition: loop(1.6, { repeatDelay: 0.6 }) } },
  { label: "White-label", icon: Palette, move: { rotate: [0, 360], transition: { duration: 6, repeat: Infinity, ease: "linear" } } },
  { label: "Contacts & Tags", icon: Contact, move: { rotate: [0, -8, 8, 0], transition: loop(2.8) } },
  { label: "WhatsApp Templates", icon: FileText, move: { y: [0, -3, 0], transition: loop(2.2) } },
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative bg-gradient-to-b from-[#0d0f14] to-[#0a0a0c]">
      {/* hairline glows on the top and bottom edges */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto flex max-w-7xl items-center gap-7 px-4 py-6 sm:px-6">
        <p className="hidden shrink-0 items-center gap-2.5 border-r border-white/10 pr-7 text-[12px] font-semibold uppercase tracking-[0.22em] text-gray-400 sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-logo opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-logo" />
          </span>
          All in one app
        </p>
        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
            {row.map((it, i) => (
              <span key={i} aria-hidden={i >= ITEMS.length} className="flex shrink-0 items-center">
                <span className="group flex items-center gap-2.5 px-8 text-gray-400 transition-colors duration-300 hover:text-white">
                  <motion.span
                    animate={it.move}
                    className="text-gray-500 transition-colors duration-300 group-hover:text-logo"
                    style={{ display: "inline-flex", transformPerspective: 400 }}
                  >
                    <it.icon size={19} strokeWidth={2} />
                  </motion.span>
                  <span className="whitespace-nowrap text-[16px] font-medium tracking-wide">{it.label}</span>
                </span>
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/15" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
