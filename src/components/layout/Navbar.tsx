"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Radio, Inbox, Bot, Users, Palette, CreditCard, Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { links } from "@/config/site";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "#channels", label: "Channels", icon: Radio },
  { href: "#inbox", label: "Inbox", icon: Inbox },
  { href: "#automation", label: "Bots & AI", icon: Bot },
  { href: "#team", label: "Teams", icon: Users },
  { href: "#customize", label: "Customize", icon: Palette },
  { href: "#pricing", label: "Pricing", icon: CreditCard },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section the reader is in: the last nav section
  // whose top has passed 35% of the screen height. Sections without a nav
  // link (workspaces, campaigns…) keep the previous link lit.
  useEffect(() => {
    const onScroll = () => {
      // Page order differs from nav order (Teams sits above Bots & AI), so pick
      // the passed section that is lowest on the page, not the last nav item.
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      let best = -Infinity;
      for (const n of NAV) {
        const el = document.querySelector(n.href);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > best) {
          best = top;
          current = n.href;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5",
          scrolled
            ? "glass shadow-[0_18px_40px_-20px_rgba(15,40,90,0.35)]"
            : "border border-line bg-white/85 shadow-[0_10px_30px_-18px_rgba(15,40,90,0.35)] backdrop-blur-md",
        )}
      >
        <a href="#top" aria-label="AgentAwk home">
          <Logo />
        </a>

        <ul
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV.map((n) => {
            const isActive = active === n.href;
            const showPill = hovered ? hovered === n.href : isActive;
            return (
              <li key={n.href} className="relative">
                {showPill && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-brand/[0.07]"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <a
                  href={n.href}
                  onMouseEnter={() => setHovered(n.href)}
                  className={cn(
                    "group relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-semibold transition-colors",
                    isActive || hovered === n.href ? "text-brand" : "text-slate-600",
                  )}
                >
                  <n.icon
                    size={15}
                    className={cn(
                      "transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110",
                      isActive || hovered === n.href ? "text-brand" : "text-slate-400",
                    )}
                  />
                  {n.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-brand to-cyan-400"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={links.login} className="px-3 py-2 text-sm font-semibold text-fg hover:text-brand">
            Log in
          </a>
          <ButtonLink href={links.signup}>Start free</ButtonLink>
        </div>

        <button
          className="rounded-xl p-2 text-fg lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <motion.div
        aria-hidden
        className="mx-auto mt-1 h-[2px] max-w-7xl origin-left rounded-full bg-brand"
        style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-4 lg:hidden"
          >
            <ul className="grid gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-fg hover:bg-soft hover:text-brand"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <n.icon size={16} />
                    </span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex gap-2">
              <ButtonLink href={links.login} variant="ghost" className="flex-1">
                Log in
              </ButtonLink>
              <ButtonLink href={links.signup} className="flex-1">
                Start free
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
