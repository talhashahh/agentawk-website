"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { links } from "@/config/site";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "#channels", label: "Channels" },
  { href: "#inbox", label: "Inbox" },
  { href: "#automation", label: "Bots & AI" },
  { href: "#team", label: "Teams" },
  { href: "#customize", label: "Customize" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5",
          scrolled ? "glass shadow-2xl shadow-black/40" : "border border-transparent",
        )}
      >
        <a href="#top" aria-label="AgentAwk home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={links.login} className="px-3 py-2 text-sm font-semibold text-slate-200 hover:text-white">
            Log in
          </a>
          <ButtonLink href={links.signup}>Start free</ButtonLink>
        </div>

        <button
          className="rounded-xl p-2 text-white lg:hidden"
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
                    className="block rounded-xl px-3 py-2.5 text-[15px] font-medium text-slate-200 hover:bg-white/5"
                  >
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
