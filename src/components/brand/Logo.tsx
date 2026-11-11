import { cn } from "@/lib/cn";

/**
 * The AgentAwk bot mark. Defaults to the official logo green; pass
 * `color="var(--brand)"` to draw it in the live brand color instead.
 */
export function BotMark({ className, color = "var(--logo)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 52" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3 H34 A4 4 0 0 1 38 7 V17 A4 4 0 0 1 34 21 H6 A4 4 0 0 1 2 17 V7 A4 4 0 0 1 6 3 Z M11 12 a3.2 3.2 0 1 0 6.4 0 a3.2 3.2 0 1 0 -6.4 0 Z M22.6 12 a3.2 3.2 0 1 0 6.4 0 a3.2 3.2 0 1 0 -6.4 0 Z"
        fill={color}
      />
      <rect x="4" y="25" width="32" height="5.5" rx="2" fill={color} />
      <rect x="16.5" y="30" width="7" height="20" rx="2" fill={color} />
    </svg>
  );
}

/** The official wordmark: AGEN in ink (white on dark) + TAWK in logo green. */
export function Logo({ className, onDark }: { className?: string; onDark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <BotMark className="h-8 w-auto" />
      <span className={cn("font-display text-[19px] font-extrabold tracking-wide", onDark ? "text-white" : "text-fg")}>
        AGEN<span className="text-logo">TAWK</span>
      </span>
    </span>
  );
}
