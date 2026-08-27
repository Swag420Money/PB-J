import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { clerkAppearance } from "./clerkAppearance";
import "./Auth.css";

export function SignUp({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  return (
    <div className="pbj-auth">
      <div className="pbj-auth__scroll">
        <div className="pbj-auth__lockup">
          <img src="/logo.jpg" alt="" className="pbj-auth__mark" />
          <span className="pbj-auth__wordmark">pb&j</span>
        </div>

        <h1 className="pbj-auth__title">create your account</h1>
        <p className="pbj-auth__sub">AI-powered video editing</p>

        <div className="pbj-auth__form">
          <ClerkSignUp
            routing="virtual"
            appearance={clerkAppearance}
            signInUrl="#"
          />
        </div>

        <p className="pbj-auth__switch">
          already have an account?{" "}
          <button type="button" className="pbj-auth__switch-link" onClick={onSwitchToSignIn}>
            sign in
          </button>
        </p>
      </div>
    </div>
  );
}
