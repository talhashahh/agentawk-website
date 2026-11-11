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
  email: "hello@agentawk.com",
  // Leave empty to hide them on the site; fill in when the real numbers are ready.
  phone: "",
  whatsapp: "", // digits only, used for wa.me links
  address: "Pakistan",
};

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  /** Monthly price in USD. */
  price: number;
  icon: "gift" | "wallet" | "zap" | "building";
  workspaces: number;
  contactsPerWorkspace: number;
  popular?: boolean;
};

// Same plans, prices and limits as the agency Billing → Plans page in the app.
export const plans: Plan[] = [
  { id: "free-plan", name: "Free", tagline: "Try it out, on us", price: 0, icon: "gift", workspaces: 1, contactsPerWorkspace: 50 },
  { id: "premium-plan", name: "Premium plan", tagline: "For growing businesses", price: 19, icon: "wallet", workspaces: 5, contactsPerWorkspace: 1000 },
  { id: "ignite-plan", name: "Ignite plan", tagline: "For scaling teams", price: 299, icon: "zap", workspaces: 15, contactsPerWorkspace: 3000, popular: true },
  { id: "enterprise-plan", name: "Enterprise plan", tagline: "Built for resellers", price: 599, icon: "building", workspaces: 50, contactsPerWorkspace: 10000 },
];
