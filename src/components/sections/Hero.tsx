"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Zap, CheckCheck, BadgeCheck } from "lucide-react";
import { SiMeta } from "react-icons/si";
import { BotMark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { CHANNEL_LIST, ChannelBadge, type ChannelId } from "@/components/channels";
import { Avatar } from "@/components/ui/Avatar";
import { useCycle } from "@/lib/hooks";
import { links } from "@/config/site";

const FEED: { channel: ChannelId; name: string; text: string }[] = [
  { channel: "instagram", name: "Sara Khan", text: "Is the blue bag still in stock? 👜" },
  { channel: "whatsapp", name: "Ali Raza", text: "Can I change my delivery address?" },
  { channel: "messenger", name: "Hina Malik", text: "What time do you open tomorrow?" },
  { channel: "telegram", name: "Omar Sheikh", text: "Got my order, thank you! 🙌" },
  { channel: "webchat", name: "Website visitor", text: "Do you offer cash on delivery?" },
  { channel: "whatsapp", name: "Ayesha Noor", text: "Please send me the price list" },
];

function Orbit({ size, duration, reverse, items }: { size: string; duration: number; reverse?: boolean; items: ChannelId[] }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full border border-brand/15"
      style={{ width: size, height: size, x: "-50%", y: "-50%" }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {items.map((id, i) => {
        const rad = ((360 / items.length) * i - 90) * (Math.PI / 180);
        return (
          <div
            key={id + i}
            className="absolute"
            style={{ left: `${50 + 50 * Math.cos(rad)}%`, top: `${50 + 50 * Math.sin(rad)}%` }}
          >
            <motion.div
              className="-translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: reverse ? 360 : -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
              <ChannelBadge id={id} className="h-11 w-11 ring-4 ring-white sm:h-14 sm:w-14" iconClassName="h-6 w-6 sm:h-7 sm:w-7" />
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}

function HeroHub() {
  const { ref, index } = useCycle<HTMLDivElement>(FEED.length, 2300);
  const visible = [0, 1, 2].map((k) => FEED[(index + k) % FEED.length]).reverse();

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[540px]">
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-gradient-to-br from-blue-100/80 via-white/40 to-cyan-100/70 blur-2xl" />

      {/* rings */}
      <Orbit size="100%" duration={46} items={["whatsapp", "instagram", "messenger"]} />
      <Orbit size="68%" duration={34} reverse items={["telegram", "webchat"]} />
      <div className="absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand/20" />

      {/* core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand/40"
            animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i, ease: "easeOut" }}
          />
        ))}
        <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-brand/20 bg-white shadow-[0_25px_60px_-15px_var(--brand)]">
          <BotMark className="h-14 w-auto animate-float" />
        </div>
      </div>

      {/* live feed: sits above the orbit so passing icons slide behind it */}
      <div className="glass absolute -bottom-12 -left-2 z-20 w-[80%] max-w-[330px] rounded-2xl p-3 sm:-left-14">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Live inbox</span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-brand">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" /> All channels
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((m) => (
              <motion.div
                key={m.name + m.text}
                layout
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="flex items-center gap-2.5 rounded-xl bg-soft p-2"
              >
                <div className="relative">
                  <Avatar name={m.name} className="h-9 w-9 text-[11px]" />
                  <ChannelBadge id={m.channel} className="absolute -bottom-1 -right-1 h-4.5 w-4.5 ring-2 ring-white" iconClassName="h-2.5 w-2.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-fg">{m.name}</p>
                  <p className="truncate text-[12px] text-muted">{m.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* floating stat */}
      <motion.div
        className="glass absolute -right-2 top-4 z-20 rounded-2xl px-4 py-3 sm:-right-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Zap size={16} />
          </span>
          <div>
            <p className="text-[11px] text-muted">Bot replied</p>
            <p className="flex items-center gap-1 text-sm font-bold text-fg">
              instantly <CheckCheck size={14} className="text-sky-500" />
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const words = ["Every customer.", "Every channel."];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-[#eaf3fc] via-[#f4f9fe] to-white px-4 pb-32 pt-36 sm:px-6 sm:pt-44">
      {/* background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[560px] w-[560px] animate-aurora rounded-full bg-brand opacity-[0.07] blur-[140px]" />
        <div className="absolute -right-40 top-20 h-[520px] w-[520px] animate-aurora rounded-full bg-cyan-400 opacity-[0.09] blur-[140px] [animation-delay:-6s]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#0866ff]/25 bg-white py-1.5 pl-2 pr-4 text-sm font-semibold text-fg shadow-[0_8px_24px_-12px_rgba(8,102,255,0.6)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0866ff]/10">
                <SiMeta size={17} className="text-[#0866ff]" />
              </span>
              Official Meta Partner
              <BadgeCheck size={17} className="fill-[#0866ff] text-white" />
            </motion.span>
          </div>

          <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-fg sm:text-6xl lg:text-7xl">
            {words.map((w, i) => (
              <motion.span
                key={w}
                className="block"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.15 }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              className="text-gradient block pb-1"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              One brilliant inbox.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            AgentAwk brings WhatsApp, Instagram, Messenger, Telegram and your website chat into one shared inbox,
            with bots, campaigns and AI that keep working while your team takes a break.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href={links.signup} size="lg">
              Start free <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="#contact" size="lg" variant="ghost">
              Book a demo
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {CHANNEL_LIST.map((c) => (
                <ChannelBadge key={c.id} id={c.id} className="h-9 w-9 ring-2 ring-white" />
              ))}
            </div>
            <p className="text-sm text-muted">
              <span className="font-semibold text-fg">5 channels</span>, one place to answer them all
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="px-8 sm:px-14"
        >
          <HeroHub />
        </motion.div>
      </div>
    </section>
  );
}
