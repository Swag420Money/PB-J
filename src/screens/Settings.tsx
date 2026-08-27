import { useUser, useClerk } from "@clerk/clerk-react";
import { TopBar } from "../components/TopBar";
import { Button } from "../components/Button";
import { MOCK_BILLING } from "../data/mockAccount";
import "./Settings.css";

export function Settings({
  onBack,
  onOpenStyleTraining,
}: {
  onBack: () => void;
  onOpenStyleTraining: () => void;
}) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const pct = Math.min(
    100,
    Math.round((MOCK_BILLING.minutesUsed / MOCK_BILLING.minutesLimit) * 100)
  );
  const minutesLeft = Math.max(0, MOCK_BILLING.minutesLimit - MOCK_BILLING.minutesUsed);

  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const displayName = user?.fullName || email;

  return (
    <div className="pbj-settings">
      <TopBar onBack={onBack} />

      <div className="pbj-settings__body">
        <div className="pbj-settings__hero">
          <h1 className="pbj-settings__hero-title">your account</h1>
          <p className="pbj-settings__hero-sub">manage your plan and sign out</p>
        </div>

        <div className="pbj-settings__avatar-row">
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="" className="pbj-settings__avatar-img" />
          ) : (
            <div className="pbj-settings__avatar">
              {(displayName || "?").charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            {user?.fullName && <div className="pbj-settings__name">{user.fullName}</div>}
            <span className="pbj-settings__email">{email}</span>
          </div>
        </div>

        <section className="pbj-settings__card">
          <div className="pbj-settings__row">
            <span className="pbj-settings__row-label">subscription</span>
            <span className="pbj-settings__tier-badge">{MOCK_BILLING.tier}</span>
          </div>

          <div className="pbj-settings__divider" />

          <div className="pbj-settings__row pbj-settings__row--stack">
            <div className="pbj-settings__row">
              <span className="pbj-settings__row-label">minutes remaining</span>
              <span className="pbj-settings__row-value">
                {minutesLeft} / {MOCK_BILLING.minutesLimit}
              </span>
            </div>
            <div className="pbj-settings__meter">
              <div className="pbj-settings__meter-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </section>

        <Button variant="outline" fullWidth onClick={onOpenStyleTraining}>
          style training
        </Button>

        <Button variant="outline" fullWidth onClick={() => signOut()}>
          sign out
        </Button>
      </div>
    </div>
  );
}
