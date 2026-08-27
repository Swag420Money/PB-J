// Shared by SignIn.tsx and SignUp.tsx so both Clerk forms pick up pb&j's
// actual design tokens (src/index.css) instead of Clerk's default look.
// Untyped here deliberately — Clerk's theme type name/path has moved
// across versions; TS still validates the shape structurally wherever
// this is actually passed to <SignIn appearance={...}>/<SignUp ...>.
export const clerkAppearance = {
  variables: {
    colorPrimary: "#8b5cf6",
    colorBackground: "#ffffff",
    colorText: "#1d1d1f",
    colorTextSecondary: "#8e8e93",
    colorInputBackground: "#f5f5f5",
    colorInputText: "#1d1d1f",
    colorDanger: "#d64545",
    borderRadius: "16px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
  },
  elements: {
    rootBox: { width: "100%" },
    card: {
      boxShadow: "none",
      border: "none",
      // Not 0 — the top padding is what keeps field labels (e.g. "Email
      // address") clear of the card's rounded top edge instead of
      // clipping against it.
      padding: "20px 0 0",
      width: "100%",
    },
    header: { display: "none" },
    // This app has no router (App.tsx is a stage-based switch, not URLs),
    // so Clerk's built-in "already have an account? sign in" footer link
    // — which expects a real signInUrl/signUpUrl route — can't work here.
    // SignIn.tsx/SignUp.tsx render their own switch link instead.
    footerAction: { display: "none" },
    formButtonPrimary: {
      backgroundColor: "#8b5cf6",
      boxShadow: "0 10px 24px rgba(139, 92, 246, 0.28)",
      fontSize: "15px",
      textTransform: "none",
      "&:hover": { backgroundColor: "#7c3aed" },
    },
    socialButtonsBlockButton: {
      borderRadius: "16px",
      borderColor: "#e5e5ea",
    },
    formFieldInput: {
      borderRadius: "10px",
      borderColor: "#e5e5ea",
    },
  },
};
