export type Plan = "free" | "pro" | "enterprise";
export type SubscriptionStatus = "active" | "expired" | "none";
export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  plan: Plan;
  subscriptionStatus: SubscriptionStatus;
  subscriptionStart: string | null;
  subscriptionExpiry: string | null;
}

export interface PlanDetails {
  id: Plan;
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const plans: PlanDetails[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Get started with basic access",
    features: ["Basic access", "Community support", "1 project", "Limited storage"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    description: "For professionals who need more",
    features: ["Priority support", "Advanced features", "10 projects", "50GB storage", "Custom integrations"],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    description: "Unlimited everything for teams",
    features: ["Dedicated support", "Unlimited projects", "Unlimited storage", "SSO & SAML", "SLA guarantee", "Custom onboarding"],
  },
];

export const mockUsers: User[] = [
  { id: "1", name: "Admin User", email: "admin@demo.com", password: "admin123", role: "admin", plan: "enterprise", subscriptionStatus: "active", subscriptionStart: "2025-01-01", subscriptionExpiry: "2026-01-01" },
  { id: "2", name: "Jane Smith", email: "jane@demo.com", password: "pass123", role: "user", plan: "pro", subscriptionStatus: "active", subscriptionStart: "2025-06-01", subscriptionExpiry: "2026-06-01" },
  { id: "3", name: "Bob Wilson", email: "bob@demo.com", password: "pass123", role: "user", plan: "free", subscriptionStatus: "none", subscriptionStart: null, subscriptionExpiry: null },
  { id: "4", name: "Alice Brown", email: "alice@demo.com", password: "pass123", role: "user", plan: "pro", subscriptionStatus: "expired", subscriptionStart: "2024-01-01", subscriptionExpiry: "2025-01-01" },
  { id: "5", name: "Charlie Davis", email: "charlie@demo.com", password: "pass123", role: "user", plan: "enterprise", subscriptionStatus: "active", subscriptionStart: "2025-03-15", subscriptionExpiry: "2026-03-15" },
  { id: "6", name: "Diana Evans", email: "diana@demo.com", password: "pass123", role: "user", plan: "free", subscriptionStatus: "none", subscriptionStart: null, subscriptionExpiry: null },
  { id: "7", name: "Frank Green", email: "frank@demo.com", password: "pass123", role: "user", plan: "pro", subscriptionStatus: "active", subscriptionStart: "2025-09-01", subscriptionExpiry: "2026-09-01" },
  { id: "8", name: "Grace Hall", email: "grace@demo.com", password: "pass123", role: "user", plan: "enterprise", subscriptionStatus: "expired", subscriptionStart: "2024-06-01", subscriptionExpiry: "2025-06-01" },
  { id: "9", name: "Henry Irving", email: "henry@demo.com", password: "pass123", role: "user", plan: "pro", subscriptionStatus: "active", subscriptionStart: "2025-11-01", subscriptionExpiry: "2026-11-01" },
  { id: "10", name: "Ivy Jones", email: "ivy@demo.com", password: "pass123", role: "user", plan: "free", subscriptionStatus: "none", subscriptionStart: null, subscriptionExpiry: null },
];
