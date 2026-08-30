import { Button } from "../components/Button";
import { Placeholder } from "../components/Placeholder";
import { RENDER_IN_PROGRESS } from "../data/placeholders";
import "./Home.css";

interface HomeProps {
  onNewProject: () => void;
  onOpenProjects: () => void;
  onOpenSettings: () => void;
  onOpenCooking: () => void;
}

/**
 * Deliberately minimal, and deliberately the SAME on day one and day
 * ninety — no thumbnails, no usage meter, no legal text. The only thing
 * that ever changes here is the render-in-progress strip, and that's
 * driven by a fake flag (RENDER_IN_PROGRESS in placeholders.ts) this pass.
 */
export function Home({ onNewProject, onOpenProjects, onOpenSettings, onOpenCooking }: HomeProps) {
  return (
    <div className="pbj-home">
      <button
        type="button"
        className="pbj-home__settings"
        onClick={onOpenSettings}
        aria-label="Settings"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 3 13.09H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 3.6a1.65 1.65 0 0 0 1-1.51V2a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="pbj-home__center">
        <img src="/sandwich-logo.png" alt="pb&j" className="pbj-home__mark" />

        {RENDER_IN_PROGRESS && (
          <Placeholder className="pbj-home__cooking-strip-wrap">
            <button type="button" className="pbj-home__cooking-strip" onClick={onOpenCooking}>
              <span className="pbj-home__cooking-dot" />
              Your Edit Is Cooking
              <span className="pbj-home__cooking-arrow">›</span>
            </button>
          </Placeholder>
        )}

        <div className="pbj-home__actions">
          <Button fullWidth onClick={onNewProject}>
            New Project
          </Button>
          <Button fullWidth variant="secondary" onClick={onOpenProjects}>
            Your Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
