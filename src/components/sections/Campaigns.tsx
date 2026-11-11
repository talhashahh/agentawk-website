"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, Send, Users, CalendarClock, CheckCheck, Eye, Tag, UserRound, Check } from "lucide-react";
import { Section, SectionHeading, Reveal, Glow } from "@/components/ui/Section";
import { Avatar } from "@/components/ui/Avatar";
import { ChannelBadge } from "@/components/channels";
import { useCycle } from "@/lib/hooks";
import { cn } from "@/lib/cn";

function Counter({ to, ms = 1400 }: { to: number; ms?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return <>{v.toLocaleString()}</>;
}

const FIRST = ["Ali", "Sara", "Omar", "Ayesha", "Hamza", "Zara", "Bilal", "Hina", "Usman", "Maryam", "Fahad", "Noor", "Daniyal", "Iqra", "Saad", "Fatima"];
const LAST = ["Khan", "Ahmed", "Raza", "Malik", "Shah", "Qureshi", "Butt", "Iqbal", "Siddiqui", "Javed", "Hussain", "Chaudhry"];
// 48 contacts with varied names, so every avatar gets its own initials and colour.
const AUDIENCE = Array.from({ length: 48 }, (_, i) => `${FIRST[(i * 5) % FIRST.length]} ${LAST[(i * 7) % LAST.length]}`);

function CampaignDemo() {
  // 0 = ready, 1 = sending, 2 = delivered
  const { ref, index: phase } = useCycle<HTMLDivElement>(3, 2600);
  const [round, setRound] = useState(0);
  useEffect(() => {
    if (phase === 1) setRound((r) => r + 1);
  }, [phase]);

  return (
    <div ref={ref} className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
      {/* composer */}
      <div className="glass rounded-3xl p-5">
        <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-muted">
          <Megaphone size={14} className="text-brand" /> New campaign
        </p>
        <div className="mt-4 rounded-2xl bg-soft p-4">
          <p className="text-[11px] text-slate-500">Message</p>
          <p className="mt-1 text-[14px] leading-relaxed text-fg">
            Eid Mubarak! 🌙 Enjoy <span className="font-bold text-brand">30% off</span> on everything this weekend. Reply YES to get your code.
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
          <div className="flex items-center gap-2 rounded-xl bg-soft px-3 py-2.5 text-slate-600">
            <Tag size={14} className="text-amber-500" /> VIP customers
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-soft px-3 py-2.5 text-slate-600">
            <CalendarClock size={14} className="text-sky-500" /> Send now
          </div>
        </div>
        <motion.div
          className={cn("mt-4 flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold transition-colors", phase === 0 ? "bg-brand text-white" : "bg-slate-200 text-fg")}
          animate={phase === 0 ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={{ duration: 0.9, repeat: phase === 0 ? Infinity : 0 }}
        >
          <Send size={16} /> {phase === 0 ? "Send to 2,400 contacts" : phase === 1 ? "Sending…" : "Sent!"}
        </motion.div>
      </div>

      {/* flying messages */}
      <div className="relative hidden h-40 w-28 lg:block" aria-hidden>
        {phase === 1 &&
          Array.from({ length: 7 }).map((_, i) => (
            <motion.span
              key={`${round}-${i}`}
              className="absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white shadow-[0_0_20px_var(--brand)]"
              style={{ top: `${10 + ((i * 37) % 80)}%` }}
              initial={{ x: 0, opacity: 0, scale: 0.4 }}
              animate={{ x: 110, opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.6] }}
              transition={{ duration: 1, delay: i * 0.18, ease: "easeInOut" }}
            >
              <Send size={12} />
            </motion.span>
          ))}
      </div>

      {/* audience */}
      <div className="glass rounded-3xl p-5">
        <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-muted">
          <Users size={14} className="text-brand" /> Audience
        </p>
        <div className="mt-4 grid grid-cols-8 gap-2">
          {AUDIENCE.map((name, i) => (
            <span key={i} className="relative aspect-square">
              {/* empty slot before the campaign goes out */}
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-100 text-slate-300">
                <UserRound className="h-1/2 w-1/2" />
              </span>
              {/* the contact's avatar pops in as their message is sent */}
              {phase >= 1 && (
                <motion.span
                  key={round}
                  className="absolute inset-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                  transition={{ delay: i * 0.035, duration: 0.4, ease: "easeOut" }}
                >
                  <Avatar name={name} className="h-full w-full text-[9px] sm:text-[11px] lg:text-xs" />
                  <motion.span
                    className="absolute -bottom-0.5 -right-0.5 hidden h-[38%] w-[38%] items-center justify-center rounded-full bg-[#25d366] text-white ring-2 ring-white sm:flex"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.035, duration: 0.25 }}
                  >
                    <Check className="h-3/4 w-3/4" strokeWidth={3} />
                  </motion.span>
                </motion.span>
              )}
            </span>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Sent", to: 2400, icon: Send },
            { label: "Delivered", to: 2381, icon: CheckCheck },
            { label: "Read", to: 1964, icon: Eye },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-soft py-2.5">
              <s.icon size={14} className="mx-auto text-brand" />
              <p className="mt-1 font-display text-lg font-bold text-fg">
                {phase >= 1 ? <Counter key={`${round}-${s.label}`} to={s.to} /> : 0}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Campaigns() {
  return (
    <Section id="campaigns">
      <SectionHeading
        eyebrow="Campaigns"
        icon={<Megaphone size={14} />}
        title="Write once."
        highlight="Reach thousands in one click."
        subtitle="Announce a sale, share news or send reminders to hundreds of contacts at once. Pick who should get it by tag, schedule it, and watch delivered and read numbers climb."
      />
      <div className="relative mt-16">
        <Glow className="left-1/3 top-0 h-80 w-80" />
        <Reveal><CampaignDemo /></Reveal>
      </div>
      <Reveal className="mt-8 flex items-center justify-center gap-3 text-sm text-muted">
        <span className="flex -space-x-1.5">
          <ChannelBadge id="whatsapp" className="h-7 w-7 ring-2 ring-white" />
          <ChannelBadge id="messenger" className="h-7 w-7 ring-2 ring-white" />
        </span>
        Broadcast on WhatsApp and Messenger
      </Reveal>
    </Section>
  );
}
