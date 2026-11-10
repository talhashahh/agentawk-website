import type { IconType } from "react-icons";
import { FaWhatsapp, FaInstagram, FaFacebookMessenger, FaTelegramPlane } from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { cn } from "@/lib/cn";

export type ChannelId = "whatsapp" | "instagram" | "messenger" | "telegram" | "webchat";

export type Channel = {
  id: ChannelId;
  name: string;
  color: string;
  /** CSS background for the round badge */
  bg: string;
  Icon: IconType;
};

export const CHANNELS: Record<ChannelId, Channel> = {
  whatsapp: { id: "whatsapp", name: "WhatsApp", color: "#25D366", bg: "#25D366", Icon: FaWhatsapp },
  instagram: {
    id: "instagram",
    name: "Instagram",
    color: "#E1306C",
    bg: "linear-gradient(45deg,#feda75,#fa7e1e 25%,#d62976 50%,#962fbf 75%,#4f5bd5)",
    Icon: FaInstagram,
  },
  messenger: {
    id: "messenger",
    name: "Messenger",
    color: "#0A7CFF",
    bg: "linear-gradient(45deg,#0695ff,#a334fa 60%,#ff6968)",
    Icon: FaFacebookMessenger,
  },
  telegram: { id: "telegram", name: "Telegram", color: "#29A9EB", bg: "#29A9EB", Icon: FaTelegramPlane },
  webchat: { id: "webchat", name: "Webchat", color: "#8B5CF6", bg: "linear-gradient(45deg,#8b5cf6,#6366f1)", Icon: HiChatBubbleLeftRight },
};

export const CHANNEL_LIST: Channel[] = Object.values(CHANNELS);

export function ChannelBadge({ id, className, iconClassName }: { id: ChannelId; className?: string; iconClassName?: string }) {
  const c = CHANNELS[id];
  return (
    <span
      className={cn("inline-flex items-center justify-center rounded-full text-white shadow-lg", className ?? "h-9 w-9")}
      style={{ background: c.bg }}
      title={c.name}
    >
      <c.Icon className={iconClassName ?? "h-1/2 w-1/2"} />
    </span>
  );
}
