import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { clerkAppearance } from "./clerkAppearance";
import "./Auth.css";

export function SignIn({ onSwitchToSignUp }: { onSwitchToSignUp: () => void }) {
  return (
    <div className="pbj-auth">
      <div className="pbj-auth__scroll">
        <div className="pbj-auth__lockup">
          <img src="/logo.jpg" alt="" className="pbj-auth__mark" />
          <span className="pbj-auth__wordmark">pb&j</span>
        </div>

        <h1 className="pbj-auth__title">welcome back</h1>
        <p className="pbj-auth__sub">sign in to keep editing</p>

        <div className="pbj-auth__form">
          <ClerkSignIn
            routing="virtual"
            appearance={clerkAppearance}
            signUpUrl="#"
          />
        </div>

        <p className="pbj-auth__switch">
          don't have an account?{" "}
          <button type="button" className="pbj-auth__switch-link" onClick={onSwitchToSignUp}>
            sign up
          </button>
        </p>
      </div>
    </div>
  );
}
