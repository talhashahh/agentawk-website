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
  // TODO(confirm): real public contact details before going live.
  email: "hello@agentawk.com",
  phone: "+92 300 0000000",
  whatsapp: "923000000000", // digits only, used for wa.me links
  address: "Pakistan",
};

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  /** Monthly price in USD. null = shown as "Talk to us". */
  price: number | null;
  popular?: boolean;
  highlights: string[];
  note?: string;
};

// TODO(confirm): prices come from the live billing plans (billing_item_prices)
// and the limits below are the plan defaults — confirm both before going live.
export const plans: Plan[] = [
  {
    id: "free-plan",
    name: "Free",
    tagline: "Try AgentAwk on your own",
    price: 0,
    highlights: [
      "1 workspace",
      "1 agent seat",
      "2 channels",
      "1,000 contacts",
      "Shared inbox",
      "Help Assistant",
    ],
  },
  {
    id: "premium-plan",
    name: "Premium",
    tagline: "For growing businesses",
    price: null,
    highlights: [
      "5 channels per workspace",
      "Up to 10 AI chat assistants",
      "Campaigns & broadcasts",
      "Bots & Smart Flows",
      "Contact import & custom fields",
      "Roles & permissions",
    ],
  },
  {
    id: "ignite-plan",
    name: "Ignite",
    tagline: "For scaling teams",
    price: null,
    popular: true,
    highlights: [
      "10 workspaces included",
      "15 agent seats",
      "Up to 20 AI chat assistants",
      "Teams & assignment rules",
      "Your logo & colors",
      "API access",
    ],
    note: "$19 per extra workspace",
  },
  {
    id: "enterprise-plan",
    name: "Enterprise",
    tagline: "Built for resellers",
    price: null,
    highlights: [
      "20 workspaces included",
      "25 agent seats",
      "Up to 50 AI chat assistants",
      "Full white-label",
      "Agency dashboard",
      "Priority support",
    ],
    note: "$16 per extra workspace",
  },
];
