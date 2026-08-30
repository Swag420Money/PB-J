import { useCallback, useState } from "react";

export type AppStage =
  | "yourStyle"
  | "teachIt"
  | "home"
  | "newProject"
  | "cooking"
  | "studio"
  | "projects"
  | "settings";

/** A clip New project already read the duration for and (best-effort)
 *  captured a real thumbnail frame from — carried through the draft so nothing
 *  downstream (Studio) has to re-decode the same video to get a preview. */
export interface UploadedClip {
  id: string;
  fileName: string;
  /** null means unknown — still reading, or genuinely unreadable after a
   *  retry. There is no separate "failed" state: the UI renders both the
   *  same way (no duration pill) since neither is something the creator
   *  can act on. Never 0 as a stand-in for unknown. */
  durationSec: number | null;
  /** A captured first-frame data URL, or null if capture failed/timed out —
   *  null should render a flagged placeholder tile, never a fake photo. */
  thumbnailUrl: string | null;
}

/** What New project collected, carried through to Cooking (to echo the
 *  prompt back) and back to New project again if the creator taps "edit"
 *  mid-cook — "returns to New project with all previous inputs still
 *  populated" only works if this lives above both screens. Also carried on
 *  to Studio so its timeline/preview can reuse the same clips (and their
 *  already-captured thumbnails) New project collected, instead of Studio
 *  inventing its own mock footage.
 *
 *  durationSec is the source of truth (seconds precision, from the
 *  duration wheel). durationCapMin is kept alongside it — derived from
 *  durationSec, never edited directly — purely for its existing consumers
 *  (see New Project's own reseed-on-edit read, and App.tsx's EMPTY_DRAFT
 *  fallback); nothing downstream (Cooking, Studio) reads either field. */
export interface NewProjectDraft {
  title: string;
  clipCount: number;
  totalFootageSec: number;
  durationSec: number;
  durationCapMin: number;
  prompt: string;
  styleIds: string[];
  clips: UploadedClip[];
}

const ONBOARDED_KEY = "pbj_onboarded";

/** "Your style"/"Teach it" are shown once ever — this is that memory.
 *  Also what Splash reads to decide its 1.5s-vs-0.5s duration. */
export function hasOnboarded(): boolean {
  try {
    return localStorage.getItem(ONBOARDED_KEY) === "true";
  } catch {
    return false;
  }
}

function markOnboarded(): void {
  try {
    localStorage.setItem(ONBOARDED_KEY, "true");
  } catch {
    // Best-effort — worst case, onboarding shows again next launch.
  }
}

export interface AppFlow {
  stage: AppStage;
  newProjectDraft: NewProjectDraft | null;
  /** The categories picked on "Your Style" during onboarding (fitness,
   *  travel, etc.) — carried at the creator level, not the project level,
   *  so it stays put across whichever project is open. Empty if the
   *  creator skipped that step. */
  creatorStyles: string[];
  setCreatorStyles: (styles: string[]) => void;
  goToYourStyle: () => void;
  goToTeachIt: () => void;
  goToHome: () => void;
  goToNewProject: () => void;
  goToCooking: (draft: NewProjectDraft) => void;
  goToStudio: () => void;
  goToProjects: () => void;
  goToSettings: () => void;
}

/** Mounted fresh whenever a signed-in creator reaches the app (see
 *  App.tsx) — starts on "yourStyle" the very first time, "home" every
 *  time after.
 *
 *  "First time" is tracked via a browser-scoped localStorage flag, not
 *  anything tied to the account itself — there's no per-account onboarding
 *  state to check yet. That means a *new* account created in a browser
 *  that has ever finished onboarding before (any account, including the
 *  dev-bypass test account) would otherwise land straight on Home, skipping
 *  "your style"/"teach it" entirely. `forceOnboarding` is how callers that
 *  know a fresh account was just created (real sign-up, dev bypass) route
 *  around that stale flag instead of trusting it. */
export function useAppFlow(forceOnboarding = false): AppFlow {
  const [stage, setStage] = useState<AppStage>(() =>
    forceOnboarding || !hasOnboarded() ? "yourStyle" : "home"
  );
  const [newProjectDraft, setNewProjectDraft] = useState<NewProjectDraft | null>(null);
  const [creatorStyles, setCreatorStyles] = useState<string[]>([]);

  const goToYourStyle = useCallback(() => setStage("yourStyle"), []);
  const goToTeachIt = useCallback(() => setStage("teachIt"), []);
  const goToHome = useCallback(() => {
    markOnboarded();
    setStage("home");
  }, []);
  const goToNewProject = useCallback(() => setStage("newProject"), []);
  const goToCooking = useCallback((draft: NewProjectDraft) => {
    setNewProjectDraft(draft);
    setStage("cooking");
  }, []);
  const goToStudio = useCallback(() => setStage("studio"), []);
  const goToProjects = useCallback(() => {
    // Browsing the projects list breaks the link between whatever draft is
    // still sitting in state (from a New project session) and Studio —
    // without this, opening an unrelated *existing* project from that list
    // would show Studio the previous session's clips instead of its own
    // (nonexistent, still-mock) footage.
    setNewProjectDraft(null);
    setStage("projects");
  }, []);
  const goToSettings = useCallback(() => setStage("settings"), []);

  return {
    stage,
    newProjectDraft,
    creatorStyles,
    setCreatorStyles,
    goToYourStyle,
    goToTeachIt,
    goToHome,
    goToNewProject,
    goToCooking,
    goToStudio,
    goToProjects,
    goToSettings,
  };
}
