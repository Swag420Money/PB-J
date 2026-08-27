// Placeholder account/subscription data for the Settings screen.
// No real auth or billing yet — swap for a real account service later.

export interface MockAccount {
  name: string;
  email: string;
  tier: "Free" | "Pro" | "Studio";
  minutesUsed: number;
  minutesLimit: number;
}

export const MOCK_ACCOUNT: MockAccount = {
  name: "Troy",
  email: "you@example.com",
  tier: "Free",
  minutesUsed: 18,
  minutesLimit: 30,
};
