"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Radio, Phone, Video, ChevronLeft } from "lucide-react";
import { Section, SectionHeading, Reveal, Glow } from "@/components/ui/Section";
import { CHANNELS, ChannelBadge, type ChannelId } from "@/components/channels";
import { Bubble, TypingDots, type ChatMsg } from "@/components/ui/Chat";
import { Avatar } from "@/components/ui/Avatar";
import { useSequence } from "@/lib/hooks";
import { cn } from "@/lib/cn";

type Story = { id: ChannelId; title: string; desc: string; customer: string; chat: ChatMsg[] };

const STORIES: Story[] = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    desc: "Official Business API, Coexistence with the WhatsApp app, or a quick QR scan. Templates, voice notes and campaigns included.",
    customer: "Ali Raza",
    chat: [
      { from: "customer", text: "Salam! Is the order #2381 shipped? 📦" },
      { from: "bot", text: "Wa alaikum salam Ali! Yes, it left our warehouse today 🚚" },
      { from: "customer", text: "Great, can I get the tracking link?" },
      { from: "agent", text: "Sure! Here it is: trk.example/2381 ✅" },
    ],
  },
  {
    id: "instagram",
    title: "Instagram",
    desc: "DMs, story replies, mentions and comments on your posts all land in the same inbox, so nothing slips through.",
    customer: "Sara Khan",
    chat: [
      { from: "customer", text: "Loved your story! Is this bag available? 😍" },
      { from: "agent", text: "Thank you Sara! Yes, in blue and black 👜" },
      { from: "customer", text: "Blue please! Do you deliver to Lahore?" },
      { from: "agent", text: "We do, it arrives in 2–3 days 🎉" },
    ],
  },
  {
    id: "messenger",
    title: "Messenger",
    desc: "Every message to your Facebook Page, with ice breakers, a main menu and default replies that answer in seconds.",
    customer: "Hina Malik",
    chat: [
      { from: "customer", text: "Hi, what are your opening hours?" },
      { from: "bot", text: "Hi Hina! We're open 10am – 10pm, every day ⏰" },
      { from: "customer", text: "Can I book a table for 4 tonight?" },
      { from: "agent", text: "Done! Table for 4 at 8pm is reserved 🍽️" },
    ],
  },
  {
    id: "telegram",
    title: "Telegram",
    desc: "Create a bot, paste its token and you're live. Chat with your Telegram customers right from AgentAwk.",
    customer: "Omar Sheikh",
    chat: [
      { from: "customer", text: "/start" },
      { from: "bot", text: "Welcome to our store bot! How can we help? 🤖" },
      { from: "customer", text: "I want to talk to a person" },
      { from: "agent", text: "Hi Omar, Hamza here 👋 How can I help?" },
    ],
  },
  {
    id: "webchat",
    title: "Webchat",
    desc: "A beautiful chat widget for your website. Visitors talk to your team live, and can even continue from WhatsApp.",
    customer: "Website visitor",
    chat: [
      { from: "customer", text: "Do you offer cash on delivery?" },
      { from: "bot", text: "Yes! Cash on delivery is available everywhere 💵" },
      { from: "customer", text: "Awesome, placing my order now" },
      { from: "agent", text: "Thank you! We'll confirm it in a minute 😊" },
    ],
  },
];

function PhoneChat({ story }: { story: Story }) {
  const c = CHANNELS[story.id];
  const { ref, shown } = useSequence<HTMLDivElement>(story.chat.length, 1500, 2400);
  const next = story.chat[shown];
  const typing = next && shown < story.chat.length;

  return (
    <div ref={ref} className="relative mx-auto w-[300px] sm:w-[320px]">
      <div className="relative rounded-[2.6rem] border border-slate-700 bg-slate-900 p-2.5 shadow-[0_40px_100px_-30px_rgba(30,64,175,0.55)]">
        <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="overflow-hidden rounded-[2.1rem] bg-[#0d1426]">
          {/* header */}
          <div className="flex items-center gap-2.5 px-4 pb-3 pt-9" style={{ background: `color-mix(in oklab, ${c.color} 22%, #0d1426)` }}>
            <ChevronLeft size={18} className="text-white/70" />
            <div className="relative">
              <Avatar name={story.customer} className="h-9 w-9 text-[11px] ring-[#0d1426]!" />
              <ChannelBadge id={story.id} className="absolute -bottom-1 -right-1 h-4.5 w-4.5 ring-2 ring-[#0d1426]" iconClassName="h-2.5 w-2.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{story.customer}</p>
              <p className="text-[11px] text-white/60">via {c.name}</p>
            </div>
            <Phone size={16} className="text-white/60" />
            <Video size={17} className="text-white/60" />
          </div>
          {/* messages */}
          <div className="flex h-[360px] flex-col justify-end gap-2.5 px-3.5 py-4">
            <AnimatePresence mode="popLayout">
              {story.chat.slice(0, shown).map((m, i) => (
                <Bubble key={story.id + i} msg={m} dark accent={m.from === "customer" ? undefined : c.color} />
              ))}
              {typing && (
                <motion.div
                  key={"typing" + shown}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn("flex", next.from === "customer" ? "justify-start" : "justify-end")}
                >
                  <TypingDots dark />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-2 border-t border-white/5 px-3.5 py-3">
            <div className="h-9 flex-1 rounded-full bg-white/5 px-4 text-[12px] leading-9 text-slate-500">Type a message…</div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ background: c.bg }}>
              <c.Icon size={16} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Channels() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boxRef, { margin: "-20% 0px" });

  useEffect(() => {
    if (!auto || !inView) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % STORIES.length), 8000);
    return () => clearTimeout(id);
  }, [active, auto, inView]);

  const story = STORIES[active];

  return (
    <Section id="channels">
      <SectionHeading
        eyebrow="Channels"
        icon={<Radio size={14} />}
        title="Your customers are everywhere."
        highlight="Now you are too."
        subtitle="Connect the apps your customers already love. Someone messages you on Instagram, Messenger, Telegram, WhatsApp or your website, and AgentAwk is right there to talk back."
      />

      <div ref={boxRef} className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
        <div className="grid gap-3 lg:order-1">
          {STORIES.slice(0, 3).map((s, i) => (
            <ChannelCard key={s.id} story={s} active={active === i} onClick={() => { setActive(i); setAuto(false); }} />
          ))}
        </div>

        <Reveal className="relative order-first lg:order-2">
          <Glow className="left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2" color={CHANNELS[story.id].color} />
          <AnimatePresence mode="wait">
            <motion.div
              key={story.id}
              initial={{ opacity: 0, rotateY: -25, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 25, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              style={{ perspective: 1000 }}
            >
              <PhoneChat story={story} />
            </motion.div>
          </AnimatePresence>
        </Reveal>

        <div className="grid gap-3 lg:order-3">
          {STORIES.slice(3).map((s, i) => (
            <ChannelCard key={s.id} story={s} active={active === i + 3} onClick={() => { setActive(i + 3); setAuto(false); }} />
          ))}
          <Reveal delay={0.2} className="rounded-2xl border border-dashed border-brand/25 bg-white/50 p-5 text-sm text-muted">
            <span className="font-semibold text-fg">One contact, every channel.</span> When the same customer writes from two apps,
            you still see one person and one history.
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function ChannelCard({ story, active, onClick }: { story: Story; active: boolean; onClick: () => void }) {
  const c = CHANNELS[story.id];
  return (
    <Reveal>
      <button
        onClick={onClick}
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500",
          active
            ? "border-brand/30 bg-white shadow-[0_20px_50px_-25px_rgba(37,99,235,0.45)]"
            : "border-line bg-white/60 hover:border-brand/30 hover:bg-white",
        )}
      >
        {active && (
          <motion.span
            layoutId="channel-active"
            className="absolute inset-y-0 left-0 w-1 rounded-r"
            style={{ background: c.bg }}
          />
        )}
        <div className="flex items-center gap-3">
          <ChannelBadge id={story.id} className="h-10 w-10" />
          <h3 className="font-display text-lg font-semibold text-fg">{story.title}</h3>
          {active && <span className="ml-auto h-2 w-2 animate-pulse rounded-full" style={{ background: c.color }} />}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{story.desc}</p>
      </button>
    </Reveal>
  );
}
