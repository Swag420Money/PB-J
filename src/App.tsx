import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Splash } from "./screens/Splash";
import { SignIn } from "./screens/SignIn";
import { YourStyle } from "./screens/YourStyle";
import { TeachIt } from "./screens/TeachIt";
import { Home } from "./screens/Home";
import { NewProject } from "./screens/NewProject";
import { Cooking } from "./screens/Cooking";
import { Studio } from "./screens/Studio";
import { ExistingProjects } from "./screens/ExistingProjects";
import { Settings } from "./screens/Settings";
import { useAppFlow, type NewProjectDraft } from "./state/useAppFlow";

function App() {
  const [splashDone, setSplashDone] = useState(false);
  // Dev-only test bypass (see SignIn.tsx) — entirely local React state, not
  // a real Clerk session. Never reachable outside import.meta.env.DEV, so
  // this branch is dead and stripped in a production build.
  const [devBypass, setDevBypass] = useState(false);
  // Set only when THIS mount just completed a real email sign-up — lets
  // AuthenticatedApp force the "your style"/"teach it" first-run flow even
  // if this browser's stale onboarding flag says otherwise (see
  // useAppFlow's forceOnboarding doc comment).
  const [justSignedUp, setJustSignedUp] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  // Shown on every screen in a dev build (Splash included) — tied to the
  // build itself, not to whether the dev-bypass shortcut has fired yet, so
  // it doesn't wait for AuthenticatedApp to mount. Statically false (and
  // stripped) in a production build.
  const devBadge = import.meta.env.DEV && <div className="pbj-dev-badge">DEV MODE</div>;

  if (!splashDone) {
    return (
      <>
        {devBadge}
        <Splash onDone={() => setSplashDone(true)} />
      </>
    );
  }

  if (devBypass) {
    return (
      <>
        {devBadge}
        <AuthenticatedApp forceOnboarding />
      </>
    );
  }

  if (!isLoaded) {
    return <div className="pbj-auth-loading" aria-hidden="true" />;
  }

  if (!isSignedIn) {
    return (
      <>
        {devBadge}
        <SignIn
          onDevBypass={() => setDevBypass(true)}
          onSignUpComplete={() => setJustSignedUp(true)}
        />
      </>
    );
  }

  return (
    <>
      {devBadge}
      <AuthenticatedApp forceOnboarding={justSignedUp} />
    </>
  );
}

const EMPTY_DRAFT: NewProjectDraft = {
  title: "New Project",
  clipCount: 0,
  totalFootageSec: 0,
  durationSec: 60,
  durationCapMin: 1,
  prompt: "",
  styleIds: [],
  clips: [],
};

function AuthenticatedApp({ forceOnboarding }: { forceOnboarding: boolean }) {
  const flow = useAppFlow(forceOnboarding);

  switch (flow.stage) {
    case "yourStyle":
      return (
        <YourStyle
          onDone={(selected) => {
            flow.setCreatorStyles(selected);
            flow.goToTeachIt();
          }}
        />
      );

    case "teachIt":
      return <TeachIt onBack={flow.goToYourStyle} onDone={() => flow.goToHome()} />;

    case "home":
      return (
        <Home
          onNewProject={flow.goToNewProject}
          onOpenProjects={flow.goToProjects}
          onOpenSettings={flow.goToSettings}
          onOpenCooking={() => flow.goToCooking(flow.newProjectDraft ?? EMPTY_DRAFT)}
        />
      );

    case "newProject":
      return (
        <NewProject
          initialDraft={flow.newProjectDraft}
          onBack={flow.goToHome}
          onSubmit={flow.goToCooking}
        />
      );

    case "cooking":
      return (
        <Cooking
          prompt={flow.newProjectDraft?.prompt ?? ""}
          onCancel={flow.goToHome}
          onEdit={flow.goToNewProject}
          onComplete={flow.goToStudio}
        />
      );

    case "studio":
      return (
        <Studio
          onBack={flow.goToHome}
          initialClips={flow.newProjectDraft?.clips ?? []}
          creatorStyles={flow.creatorStyles}
        />
      );

    case "projects":
      return <ExistingProjects onBack={flow.goToHome} onOpenProject={flow.goToStudio} />;

    case "settings":
      return <Settings onBack={flow.goToHome} />;
  }
}

export default App;
