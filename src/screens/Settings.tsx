import { TopBar } from "../components/TopBar";
import { Button } from "../components/Button";
import { MOCK_ACCOUNT } from "../data/mockAccount";
import "./Settings.css";

export function Settings({
  onBack,
  onSignOut,
  onOpenStyleTraining,
}: {
  onBack: () => void;
  onSignOut: () => void;
  onOpenStyleTraining: () => void;
}) {
  const pct = Math.min(
    100,
    Math.round((MOCK_ACCOUNT.minutesUsed / MOCK_ACCOUNT.minutesLimit) * 100)
  );
  const minutesLeft = Math.max(0, MOCK_ACCOUNT.minutesLimit - MOCK_ACCOUNT.minutesUsed);

  return (
    <div className="pbj-settings">
      <TopBar onBack={onBack} />

      <div className="pbj-settings__body">
        <div className="pbj-settings__hero">
          <h1 className="pbj-settings__hero-title">your account</h1>
          <p className="pbj-settings__hero-sub">manage your plan and sign out</p>
        </div>

        <div className="pbj-settings__avatar-row">
          <div className="pbj-settings__avatar">
            {MOCK_ACCOUNT.email.charAt(0).toUpperCase()}
          </div>
          <span className="pbj-settings__email">{MOCK_ACCOUNT.email}</span>
        </div>

        <section className="pbj-settings__card">
          <div className="pbj-settings__row">
            <span className="pbj-settings__row-label">subscription</span>
            <span className="pbj-settings__tier-badge">{MOCK_ACCOUNT.tier}</span>
          </div>

          <div className="pbj-settings__divider" />

          <div className="pbj-settings__row pbj-settings__row--stack">
            <div className="pbj-settings__row">
              <span className="pbj-settings__row-label">minutes remaining</span>
              <span className="pbj-settings__row-value">
                {minutesLeft} / {MOCK_ACCOUNT.minutesLimit}
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

        <Button variant="outline" fullWidth onClick={onSignOut}>
          sign out
        </Button>
      </div>
    </div>
  );
}
