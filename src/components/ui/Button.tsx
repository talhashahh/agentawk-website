import { cn } from "@/lib/cn";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
};

export function ButtonLink({ variant = "primary", size = "md", className, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm",
        variant === "primary"
          ? "bg-brand text-white shadow-[0_12px_30px_-10px_var(--brand)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_var(--brand)]"
          : "border border-line bg-white text-fg shadow-sm hover:border-brand/40 hover:text-brand",
        className,
      )}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </a>
  );
}
