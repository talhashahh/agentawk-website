"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight, MessageCircle } from "lucide-react";
import { Section, Reveal } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CHANNEL_LIST, ChannelBadge } from "@/components/channels";
import { company, links } from "@/config/site";

function CtaBanner() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[2rem] border border-brand/30 px-6 py-16 text-center sm:px-16">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--brand)_35%,transparent),transparent_65%)]" />
        <div aria-hidden className="bg-grid absolute inset-0" />
        {CHANNEL_LIST.map((c, i) => (
          <motion.span
            key={c.id}
            aria-hidden
            className="absolute hidden sm:block"
            style={{ left: `${[6, 88, 12, 82, 48][i]}%`, top: `${[20, 18, 70, 72, 8][i]}%` }}
            animate={{ y: [0, -14, 0], rotate: [0, i % 2 ? 8 : -8, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChannelBadge id={c.id} className="h-12 w-12 opacity-80" />
          </motion.span>
        ))}
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            Ready to talk to <span className="text-gradient">every customer?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
            Set up AgentAwk in minutes. Connect a channel, invite your team and watch the conversations roll in.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={links.signup} size="lg">
              Start free <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" size="lg" variant="ghost">
              <MessageCircle size={18} /> Chat with us on WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`AgentAwk demo request from ${form.name}`)}&body=${encodeURIComponent(body)}`;
  };

  const field = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-brand focus:bg-white/[0.07]";

  const details = [
    { icon: Mail, label: "Email us", value: company.email, href: `mailto:${company.email}` },
    { icon: Phone, label: "Call or WhatsApp", value: company.phone, href: `tel:${company.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Find us", value: company.address },
  ];

  return (
    <Section id="contact">
      <CtaBanner />

      <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Let&apos;s talk. <span className="text-gradient">Book your free demo.</span>
          </h3>
          <p className="mt-4 text-slate-400">
            Tell us a little about your business and we&apos;ll show you AgentAwk live, set up for your channels and your team.
          </p>
          <ul className="mt-8 grid gap-3">
            {details.map((d) => {
              const inner = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <d.icon size={19} />
                  </span>
                  <div>
                    <p className="text-[12px] uppercase tracking-wider text-slate-500">{d.label}</p>
                    <p className="font-semibold text-white">{d.value}</p>
                  </div>
                </>
              );
              return (
                <li key={d.label}>
                  {d.href ? (
                    <a href={d.href} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-brand/30">
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="glass grid gap-4 rounded-3xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm text-slate-300">
                Your name
                <input required className={field} placeholder="Ali Raza" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label className="grid gap-1.5 text-sm text-slate-300">
                Phone / WhatsApp
                <input className={field} placeholder="+92 3xx xxxxxxx" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm text-slate-300">
              Work email
              <input required type="email" className={field} placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label className="grid gap-1.5 text-sm text-slate-300">
              How can we help?
              <textarea rows={4} className={field} placeholder="We get lots of WhatsApp and Instagram messages and want one inbox for our team…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </label>
            <button type="submit" className="group flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 font-bold text-ink transition hover:shadow-[0_0_40px_-6px_var(--brand)]">
              Request a demo <Send size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
