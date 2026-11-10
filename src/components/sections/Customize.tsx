"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Upload, RotateCcw, Sun, Moon, Inbox, Users, Megaphone, Bot, Check, Globe } from "lucide-react";
import { Section, SectionHeading, Reveal, Glow } from "@/components/ui/Section";
import { BotMark } from "@/components/brand/Logo";
import { DEFAULT_BRAND, useBrand } from "@/components/providers/BrandProvider";
import { cn } from "@/lib/cn";

const SWATCHES = ["#25d366", "#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#eab308", "#14b8a6", "#ef4444"];

export function Customize() {
  const { brand, setBrand } = useBrand();
  const [name, setName] = useState("Your Brand");
  const [logo, setLogo] = useState<string | null>(null);
  const [dark, setDark] = useState(true);

  useEffect(() => () => { if (logo) URL.revokeObjectURL(logo); }, [logo]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith("image/")) return;
    setLogo(URL.createObjectURL(f));
  };

  const reset = () => {
    setBrand(DEFAULT_BRAND);
    setName("Your Brand");
    setLogo(null);
    setDark(true);
  };

  return (
    <Section id="customize">
      <SectionHeading
        eyebrow="Make it yours"
        icon={<Palette size={14} />}
        title="Your logo. Your colors."
        highlight="Your product."
        subtitle="AgentAwk can wear your brand: change the logo, icon and colors, and your team and clients see your name everywhere. Go on, try it: pick a color below and watch this whole website change."
      />

      <div className="relative mt-16 grid items-center gap-10 lg:grid-cols-[1fr_1.25fr]">
        <Glow className="right-10 top-0 h-96 w-96" />
        <Reveal className="glass rounded-3xl p-6">
          <p className="text-sm font-semibold text-white">1. Pick a brand color</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {SWATCHES.map((c) => (
              <button
                key={c}
                onClick={() => setBrand(c)}
                aria-label={`Use color ${c}`}
                className={cn("relative h-10 w-10 rounded-full transition-transform hover:scale-110", brand === c && "scale-110")}
                style={{ background: c, boxShadow: brand === c ? `0 0 0 3px #070b16, 0 0 0 5px ${c}` : undefined }}
              >
                {brand === c && <Check size={18} className="absolute inset-0 m-auto text-white" />}
              </button>
            ))}
            <label className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-dashed border-white/30 text-slate-300 hover:border-white/60" title="Any color">
              <Palette size={16} />
              <input type="color" value={brand} onChange={(e) => setBrand(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" aria-label="Pick any color" />
            </label>
          </div>

          <p className="mt-6 text-sm font-semibold text-white">2. Name it</p>
          <input
            value={name}
            maxLength={18}
            onChange={(e) => setName(e.target.value)}
            className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-brand"
            aria-label="Brand name"
          />

          <p className="mt-6 text-sm font-semibold text-white">3. Drop in your logo</p>
          <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-3.5 text-sm text-slate-400 transition hover:border-brand hover:text-white">
            <Upload size={18} className="text-brand" /> {logo ? "Logo added, try another" : "Upload an image (stays in your browser)"}
            <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          </label>

          <div className="mt-6 flex items-center justify-between">
            <button onClick={() => setDark((d) => !d)} className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-[13px] text-slate-300 hover:bg-white/10">
              {dark ? <Moon size={14} /> : <Sun size={14} />} {dark ? "Dark" : "Light"} theme
            </button>
            <button onClick={reset} className="flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-white">
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            layout
            className={cn(
              "overflow-hidden rounded-3xl border shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] transition-colors duration-500",
              dark ? "border-white/10 bg-[#0b1122]" : "border-slate-200 bg-white",
            )}
          >
            <div className={cn("flex items-center gap-2 border-b px-4 py-2.5", dark ? "border-white/5" : "border-slate-100")}>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className={cn("mx-auto flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[11px]", dark ? "bg-white/5 text-slate-400" : "bg-slate-100 text-slate-500")}>
                <Globe size={11} /> app.{name.toLowerCase().replace(/[^a-z0-9]/g, "") || "yourbrand"}.com
              </span>
            </div>
            <div className="flex h-[380px]">
              <div className={cn("flex w-44 flex-col gap-1 border-r p-3 sm:w-52", dark ? "border-white/5" : "border-slate-100")}>
                <div className="mb-3 flex items-center gap-2 px-1">
                  <AnimatePresence mode="wait">
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <motion.img key={logo} src={logo} alt="" className="h-8 w-8 rounded-lg object-contain" initial={{ scale: 0 }} animate={{ scale: 1 }} />
                    ) : (
                      <motion.span key="bot" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <BotMark className="h-8 w-auto" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className={cn("truncate font-display text-sm font-extrabold uppercase", dark ? "text-white" : "text-slate-900")}>{name || "Your Brand"}</span>
                </div>
                {[{ i: Inbox, l: "Inbox" }, { i: Users, l: "Contacts" }, { i: Megaphone, l: "Campaigns" }, { i: Bot, l: "Bots" }].map((x, k) => (
                  <span
                    key={x.l}
                    className={cn("flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] font-medium", k === 0 ? "text-white" : dark ? "text-slate-400" : "text-slate-500")}
                    style={k === 0 ? { background: brand } : undefined}
                  >
                    <x.i size={14} /> {x.l}
                  </span>
                ))}
              </div>
              <div className="flex-1 p-4">
                <p className={cn("text-sm font-semibold", dark ? "text-white" : "text-slate-900")}>Good morning 👋</p>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {["Open chats", "Resolved today"].map((t, k) => (
                    <div key={t} className={cn("rounded-xl p-3", dark ? "bg-white/5" : "bg-slate-50")}>
                      <p className={cn("text-[11px]", dark ? "text-slate-400" : "text-slate-500")}>{t}</p>
                      <p className="font-display text-xl font-bold" style={{ color: brand }}>{k ? 86 : 24}</p>
                    </div>
                  ))}
                </div>
                <div className={cn("mt-3 flex h-28 items-end gap-1.5 rounded-xl p-3", dark ? "bg-white/5" : "bg-slate-50")}>
                  {[40, 65, 50, 80, 60, 95, 75].map((h, k) => (
                    <motion.span
                      key={k}
                      className="flex-1 rounded-t-md"
                      style={{ background: brand, opacity: 0.35 + k * 0.09 }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: k * 0.07, duration: 0.6 }}
                    />
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="rounded-lg px-3 py-2 text-[12px] font-semibold text-white" style={{ background: brand }}>New campaign</span>
                  <span className={cn("rounded-lg border px-3 py-2 text-[12px] font-semibold", dark ? "border-white/10 text-slate-300" : "border-slate-200 text-slate-600")}>Invite team</span>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}
