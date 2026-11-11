"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight, MessageCircle } from "lucide-react";
import { Section, Reveal } from "@/components/ui/Section";
import { CHANNEL_LIST, ChannelBadge } from "@/components/channels";
import { company, links } from "@/config/site";

function CtaBanner() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0b2a7a] via-[#1d4ed8] to-[#06b6d4] px-6 py-16 text-center shadow-[0_40px_100px_-35px_rgba(37,99,235,0.8)] sm:px-16">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent_60%)]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]"
        />
        {CHANNEL_LIST.map((c, i) => (
          <motion.span
            key={c.id}
            aria-hidden
            className="absolute hidden sm:block"
            style={{ left: `${[6, 88, 12, 82, 48][i]}%`, top: `${[20, 18, 70, 72, 8][i]}%` }}
            animate={{ y: [0, -14, 0], rotate: [0, i % 2 ? 8 : -8, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChannelBadge id={c.id} className="h-12 w-12 ring-4 ring-white/30" />
          </motion.span>
        ))}
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            Ready to talk to every customer?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-blue-100">
            Set up AgentAwk in minutes. Connect a channel, invite your team and watch the conversations roll in.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={links.signup}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-brand shadow-lg transition hover:-translate-y-0.5"
            >
              Start free <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            {company.whatsapp ? (
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <MessageCircle size={18} /> Chat with us on WhatsApp
              </a>
            ) : (
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <MessageCircle size={18} /> Book a free demo
              </a>
            )}
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

  const field =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-fg placeholder:text-slate-400 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";

  const details = [
    { icon: Mail, label: "Email us", value: company.email, href: `mailto:${company.email}` },
    ...(company.phone
      ? [{ icon: Phone, label: "Call or WhatsApp", value: company.phone, href: `tel:${company.phone.replace(/\s/g, "")}` }]
      : []),
    { icon: MapPin, label: "Find us", value: company.address },
  ];

  return (
    <Section id="contact">
      <CtaBanner />

      <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <h3 className="font-display text-3xl font-bold text-fg sm:text-4xl">
            Let&apos;s talk. <span className="text-gradient">Book your free demo.</span>
          </h3>
          <p className="mt-4 text-muted">
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
                    <p className="font-semibold text-fg">{d.value}</p>
                  </div>
                </>
              );
              return (
                <li key={d.label}>
                  {d.href ? (
                    <a href={d.href} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm transition hover:border-brand/40">
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form id="contact-form" onSubmit={submit} className="glass grid scroll-mt-28 gap-4 rounded-3xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium text-slate-600">
                Your name
                <input required className={field} placeholder="Ali Raza" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-slate-600">
                Phone / WhatsApp
                <input className={field} placeholder="+92 3xx xxxxxxx" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-medium text-slate-600">
              Work email
              <input required type="email" className={field} placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-600">
              How can we help?
              <textarea rows={4} className={field} placeholder="We get lots of WhatsApp and Instagram messages and want one inbox for our team…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </label>
            <button type="submit" className="group flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 font-bold text-white shadow-[0_12px_30px_-10px_var(--brand)] transition hover:-translate-y-0.5">
              Request a demo <Send size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
