"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Contact, Heart, Star, Users, Image as ImageIcon, Play, FileText, Mic, CloudUpload, Plus, Phone, MapPin, Cake, UsersRound,
} from "lucide-react";
import { Section, SectionHeading, Reveal, Glow } from "@/components/ui/Section";
import { Avatar } from "@/components/ui/Avatar";
import { ChannelBadge, type ChannelId } from "@/components/channels";
import { useCycle, useSequence } from "@/lib/hooks";

const OUTER = ["Sara Khan", "Ali Raza", "Hina Malik", "Omar Sheikh", "Ayesha Noor", "Bilal Ahmed", "Zara Shah", "Fahad Khan"];
const INNER = ["Maria Aslam", "Usman Tariq", "Sana Iqbal", "Hamza Ali", "Nida Pervez"];

function Ring({ names, size, duration, reverse, avatar }: { names: string[]; size: number; duration: number; reverse?: boolean; avatar: string }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/10"
      style={{ width: `${size}%`, height: `${size}%`, x: "-50%", y: "-50%" }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {names.map((n, i) => {
        const rad = ((360 / names.length) * i) * (Math.PI / 180);
        return (
          <div key={n} className="absolute" style={{ left: `${50 + 50 * Math.cos(rad)}%`, top: `${50 + 50 * Math.sin(rad)}%` }}>
            <motion.div
              className="-translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: reverse ? 360 : -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
              <Avatar name={n} className={avatar} />
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}

const TAGS = [
  { label: "Friends", icon: Heart, cls: "left-[2%] top-[18%] text-pink-300 bg-pink-500/15" },
  { label: "VIP", icon: Star, cls: "right-[0%] top-[30%] text-amber-300 bg-amber-500/15" },
  { label: "Family", icon: Users, cls: "left-[8%] bottom-[12%] text-sky-300 bg-sky-500/15" },
];

const PROFILES: { name: string; phone: string; city: string; birthday: string; tags: string[]; channels: ChannelId[] }[] = [
  { name: "Sara Khan", phone: "+92 321 •••• 482", city: "Lahore", birthday: "12 March", tags: ["VIP", "Friends"], channels: ["instagram", "whatsapp"] },
  { name: "Omar Sheikh", phone: "+92 300 •••• 219", city: "Karachi", birthday: "5 July", tags: ["Family"], channels: ["telegram", "whatsapp"] },
  { name: "Hina Malik", phone: "+92 333 •••• 760", city: "Islamabad", birthday: "21 Nov", tags: ["Lead", "Friends"], channels: ["messenger", "webchat"] },
];

function FriendsCircle() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <Ring names={OUTER} size={100} duration={60} avatar="h-12 w-12 text-sm" />
      <Ring names={INNER} size={62} duration={45} reverse avatar="h-10 w-10 text-xs" />
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-brand/30 bg-ink-2 shadow-[0_0_70px_-12px_var(--brand)]">
        <UsersRound size={26} className="text-brand" />
        <span className="mt-1 text-[11px] font-semibold text-slate-300">Your circle</span>
      </div>
      {TAGS.map((t, i) => (
        <motion.span
          key={t.label}
          className={`absolute flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold backdrop-blur ${t.cls}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <t.icon size={13} /> {t.label}
        </motion.span>
      ))}
    </div>
  );
}

function ProfileCard() {
  const { ref, index } = useCycle<HTMLDivElement>(PROFILES.length, 3200);
  const p = PROFILES[index];
  return (
    <div ref={ref} className="glass relative overflow-hidden rounded-3xl p-6" style={{ perspective: 900 }}>
      <AnimatePresence mode="wait">
        <motion.div key={p.name} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} transition={{ duration: 0.45 }}>
          <div className="flex items-center gap-4">
            <Avatar name={p.name} className="h-14 w-14 text-base" />
            <div>
              <p className="font-display text-lg font-semibold text-white">{p.name}</p>
              <div className="mt-1 flex gap-1.5">
                {p.channels.map((c) => (
                  <ChannelBadge key={c} id={c} className="h-6 w-6" />
                ))}
              </div>
            </div>
          </div>
          <ul className="mt-5 grid gap-2 text-[13px]">
            <li className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5 text-slate-300"><Phone size={14} className="text-brand" /> {p.phone}</li>
            <li className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5 text-slate-300"><MapPin size={14} className="text-brand" /> {p.city}</li>
            <li className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5 text-slate-300"><Cake size={14} className="text-brand" /> Birthday · {p.birthday}</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full bg-brand/15 px-2.5 py-1 text-[11px] font-semibold text-brand">{t}</span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const GROUP_CHAT = [
  { name: "Hamza", text: "Weekend trip plan ready? 🏔️" },
  { name: "Sana", text: "Yes! Leaving Saturday 7am" },
  { name: "Usman", text: "I'll bring the snacks 😄" },
  { name: "Nida", text: "Count me in! 🙌" },
];

function GroupsCard() {
  const { ref, shown } = useSequence<HTMLDivElement>(GROUP_CHAT.length, 1200, 2600);
  return (
    <div ref={ref} className="glass flex h-full flex-col rounded-3xl p-6">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12">
          <Avatar name="Hamza Ali" className="absolute left-0 top-0 h-8 w-8 text-[10px]" />
          <Avatar name="Sana Iqbal" className="absolute bottom-0 right-0 h-8 w-8 text-[10px]" />
        </div>
        <div className="flex-1">
          <p className="font-display font-semibold text-white">Friends Circle 🎉</p>
          <p className="text-[12px] text-slate-400">WhatsApp group · 4 members</p>
        </div>
        <ChannelBadge id="whatsapp" className="h-8 w-8" />
      </div>
      <div className="mt-4 flex min-h-[190px] flex-1 flex-col justify-end gap-2">
        <AnimatePresence mode="popLayout">
          {GROUP_CHAT.slice(0, shown).map((m, i) => (
            <motion.div
              key={m.name + i}
              layout
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-end gap-2"
            >
              <Avatar name={m.name} className="h-6 w-6 text-[9px]" />
              <div className="rounded-2xl rounded-bl-md bg-white/10 px-3 py-1.5 text-[12px] text-slate-100">
                <span className="block text-[10px] font-semibold text-brand">{m.name}</span>
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-brand/40 py-2.5 text-[13px] font-semibold text-brand">
        <Plus size={15} /> Create a WhatsApp group
      </div>
    </div>
  );
}

const MEDIA = [
  { kind: "image", bg: "linear-gradient(135deg,#f97316,#ec4899)", icon: ImageIcon, tall: true },
  { kind: "video", bg: "linear-gradient(135deg,#6366f1,#06b6d4)", icon: Play },
  { kind: "doc", bg: "linear-gradient(135deg,#334155,#1e293b)", icon: FileText },
  { kind: "voice", bg: "linear-gradient(135deg,#10b981,#065f46)", icon: Mic },
  { kind: "image", bg: "linear-gradient(135deg,#eab308,#f43f5e)", icon: ImageIcon, tall: true },
  { kind: "image", bg: "linear-gradient(135deg,#8b5cf6,#d946ef)", icon: ImageIcon },
];

function GalleryCard() {
  return (
    <div className="glass flex h-full flex-col rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display font-semibold text-white">Media Gallery</p>
          <p className="text-[12px] text-slate-400">Photos, videos, voice notes & files</p>
        </div>
        <motion.span
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <CloudUpload size={20} />
        </motion.span>
      </div>
      <div className="mt-4 grid flex-1 auto-rows-[64px] grid-cols-3 gap-2">
        {MEDIA.map((m, i) => (
          <motion.div
            key={i}
            className={`relative flex items-center justify-center overflow-hidden rounded-xl ${m.tall ? "row-span-2" : ""}`}
            style={{ background: m.bg }}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 200, damping: 18 }}
            whileHover={{ scale: 1.05 }}
          >
            {m.kind === "voice" ? (
              <div className="flex h-6 items-center gap-0.5">
                {[6, 14, 9, 18, 11, 16, 7, 12].map((h, k) => (
                  <motion.span key={k} className="w-1 rounded-full bg-white/80" animate={{ height: [h, h / 2.5, h] }} transition={{ duration: 0.9, repeat: Infinity, delay: k * 0.08 }} />
                ))}
              </div>
            ) : (
              <m.icon size={20} className="text-white/85" />
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>Every file a customer sends is saved</span>
          <span className="font-semibold text-brand">Searchable</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
          <motion.div className="h-full rounded-full bg-brand" initial={{ width: "0%" }} whileInView={{ width: "72%" }} viewport={{ once: true }} transition={{ duration: 1.8, ease: "easeOut" }} />
        </div>
      </div>
    </div>
  );
}

export function People() {
  return (
    <Section id="contacts">
      <SectionHeading
        eyebrow="Contacts, groups & media"
        icon={<Contact size={14} />}
        title="Keep everyone you know"
        highlight="in one friendly place."
        subtitle="Every person who messages you becomes a contact automatically. Save your friends and customers, tag them, add details like birthdays and cities, and find anyone in seconds."
      />

      <div className="relative mt-16 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <Glow className="left-10 top-10 h-96 w-96" color="#ec4899" />
        <Reveal><FriendsCircle /></Reveal>
        <Reveal delay={0.1}><ProfileCard /></Reveal>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        <Reveal><GroupsCard /></Reveal>
        <Reveal delay={0.1}><GalleryCard /></Reveal>
      </div>
    </Section>
  );
}
