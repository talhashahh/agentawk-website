"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
      {icon}
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  icon,
  title,
  highlight,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  icon?: React.ReactNode;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-fg sm:text-5xl">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {subtitle && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32", className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

/** Soft colored glow placed behind mock-ups */
export function Glow({ className, color = "var(--brand)" }: { className?: string; color?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-[110px]", className)}
      style={{ background: color, opacity: 0.16 }}
    />
  );
}
