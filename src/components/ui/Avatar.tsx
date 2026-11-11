import { cn } from "@/lib/cn";

const PALETTE = [
  "linear-gradient(135deg,#f97316,#f43f5e)",
  "linear-gradient(135deg,#06b6d4,#3b82f6)",
  "linear-gradient(135deg,#a855f7,#ec4899)",
  "linear-gradient(135deg,#22c55e,#14b8a6)",
  "linear-gradient(135deg,#eab308,#f97316)",
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#0ea5e9,#22d3ee)",
  "linear-gradient(135deg,#f43f5e,#a855f7)",
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Initials avatar with a stable gradient per name (no photos needed). */
export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ring-2 ring-white",
        className ?? "h-9 w-9 text-xs",
      )}
      style={{ background: PALETTE[hash(name) % PALETTE.length] }}
      aria-hidden
    >
      {initials}
    </span>
  );
}
