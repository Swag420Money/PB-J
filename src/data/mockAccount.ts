// Placeholder subscription/usage data for the Settings screen — no real
// billing system yet. Identity (name/email) is no longer mocked here: it
// comes live from Clerk's useUser() in Settings.tsx.

export interface MockBilling {
  tier: "Free" | "Pro" | "Studio";
  minutesUsed: number;
  minutesLimit: number;
}

export const MOCK_BILLING: MockBilling = {
  tier: "Free",
  minutesUsed: 18,
  minutesLimit: 30,
};
