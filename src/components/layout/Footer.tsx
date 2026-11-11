import { Logo } from "@/components/brand/Logo";
import { CHANNEL_LIST, ChannelBadge } from "@/components/channels";
import { company, links } from "@/config/site";

const COLUMNS = [
  {
    title: "Product",
    items: [
      { label: "Channels", href: "#channels" },
      { label: "Unified inbox", href: "#inbox" },
      { label: "Workspaces", href: "#workspaces" },
      { label: "Campaigns", href: "#campaigns" },
      { label: "Bots & AI", href: "#automation" },
    ],
  },
  {
    title: "Why AgentAwk",
    items: [
      { label: "Teams & security", href: "#team" },
      { label: "Contacts & groups", href: "#contacts" },
      { label: "Make it yours", href: "#customize" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Get started",
    items: [
      { label: "Create free account", href: links.signup },
      { label: "Log in", href: links.login },
      { label: "Book a demo", href: "#contact" },
      { label: company.email, href: `mailto:${company.email}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a0a0c] px-4 pb-10 pt-16 sm:px-6">
      <div aria-hidden className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
            One inbox for WhatsApp, Instagram, Messenger, Telegram and your website, with bots, campaigns and AI built in.
          </p>
          <div className="mt-5 flex gap-2">
            {CHANNEL_LIST.map((c) => (
              <ChannelBadge key={c.id} id={c.id} className="h-8 w-8" />
            ))}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-4 grid gap-2.5">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-gray-500 sm:flex-row">
        <p>© {new Date().getFullYear()} {company.name} by {company.legalName}. All rights reserved.</p>
        <p>Made with care in Pakistan</p>
      </div>
    </footer>
  );
}
