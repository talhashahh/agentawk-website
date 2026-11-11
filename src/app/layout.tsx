import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { BrandProvider } from "@/components/providers/BrandProvider";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://agentawk.com"),
  title: "AgentAwk | One inbox for WhatsApp, Instagram, Messenger & Telegram",
  description:
    "AgentAwk brings WhatsApp, Instagram, Messenger, Telegram and website chat into one shared inbox, with bots, campaigns, AI assistants, workspaces and team roles.",
  keywords: ["AgentAwk", "shared inbox", "WhatsApp Business API", "Instagram DM", "Messenger", "Telegram bot", "chatbot", "customer support software", "Pakistan"],
  openGraph: {
    title: "AgentAwk | Every customer. Every channel. One brilliant inbox.",
    description: "Talk to customers on WhatsApp, Instagram, Messenger, Telegram and your website, all from one place.",
    url: "https://agentawk.com",
    siteName: "AgentAwk",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "AgentAwk", description: "One inbox for every customer conversation." },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable} antialiased`}>
        <BrandProvider>{children}</BrandProvider>
      </body>
    </html>
  );
}
