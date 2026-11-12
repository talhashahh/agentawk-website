// Everything a non-developer may need to change lives in this one file:
// links into the app, contact details and the pricing plans.

export const APP_URL = "https://app.agentawk.com";

export const links = {
  signup: `${APP_URL}/signup`,
  login: `${APP_URL}/login`,
};

export const company = {
  name: "AgentAwk",
  legalName: "EZAUQ Pvt Ltd",
  email: "barshan.hassan@ezauq.com",
  // Leave empty to hide them on the site; fill in when the real numbers are ready.
  phone: "",
  whatsapp: "", // digits only, used for wa.me links
  address: "Pakistan",
};

/** A plan limit: a number, "unlimited", or for yes/no features true/false. */
export type LimitValue = number | "unlimited" | boolean;

/** Every row of the plan comparison, in the order it is shown. */
export const PLAN_FEATURES = [
  { key: "workspaces", label: "Workspaces" },
  { key: "agents", label: "Human Agents" },
  { key: "channels", label: "Channels" },
  { key: "contacts", label: "Contacts" },
  { key: "aiAgents", label: "AI Assistants" },
  { key: "aiReplies", label: "AI replies / month" },
  { key: "automations", label: "Bots" },
  { key: "campaigns", label: "Campaigns" },
  { key: "api", label: "API access" },
] as const;

export type PlanFeatureKey = (typeof PLAN_FEATURES)[number]["key"];

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  /** Monthly price in USD. */
  price: number;
  icon: "rocket" | "trending" | "briefcase" | "crown";
  popular?: boolean;
  limits: Record<PlanFeatureKey, LimitValue>;
  /** Small extra line under a value, e.g. the price of extra workspaces. */
  notes?: Partial<Record<PlanFeatureKey, string>>;
};

// The pricing the boss sent on 2026-11-12.
export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For small teams getting started",
    price: 39,
    icon: "rocket",
    limits: {
      workspaces: 1, agents: 3, channels: 2, contacts: 1000, aiAgents: 1,
      aiReplies: 2000, automations: 5, campaigns: true, api: false,
    },
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For growing teams that chat all day",
    price: 99,
    icon: "trending",
    popular: true,
    limits: {
      workspaces: 1, agents: 10, channels: 5, contacts: 10000, aiAgents: 3,
      aiReplies: 10000, automations: "unlimited", campaigns: true, api: true,
    },
  },
  {
    id: "business",
    name: "Business",
    tagline: "For brands with several teams",
    price: 249,
    icon: "briefcase",
    limits: {
      workspaces: 3, agents: 25, channels: "unlimited", contacts: 50000, aiAgents: 10,
      aiReplies: 50000, automations: "unlimited", campaigns: true, api: true,
    },
  },
  {
    id: "organization",
    name: "Organization",
    tagline: "For organizations running many brands or clients",
    price: 499,
    icon: "crown",
    limits: {
      workspaces: 10, agents: "unlimited", channels: "unlimited", contacts: 100000, aiAgents: "unlimited",
      aiReplies: 100000, automations: "unlimited", campaigns: true, api: true,
    },
    notes: { workspaces: "+$20 per extra workspace" },
  },
];

/** Formats a limit for display: 1,000 / Unlimited / Included / Not included. */
export function formatLimit(v: LimitValue): string {
  if (v === "unlimited") return "Unlimited";
  if (v === true) return "Included";
  if (v === false) return "Not included";
  return v.toLocaleString("en-US");
}
