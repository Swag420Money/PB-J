import { Button } from "../components/Button";
import "./Landing.css";

interface LandingProps {
  onNewProject: () => void;
  onOpenProjects: () => void;
  onOpenSettings: () => void;
  onOpenStyleLibrary: () => void;
}

export function Landing({
  onNewProject,
  onOpenProjects,
  onOpenSettings,
  onOpenStyleLibrary,
}: LandingProps) {
  return (
    <div className="pbj-landing">
      <div className="pbj-landing__topbar">
        <button
          type="button"
          className="pbj-landing__icon-btn"
          onClick={onOpenStyleLibrary}
          aria-label="Style Library"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="9" cy="10" r="1.4" fill="currentColor" />
            <circle cx="14.5" cy="8.5" r="1.4" fill="currentColor" />
            <circle cx="16" cy="13.5" r="1.4" fill="currentColor" />
            <path
              d="M12 21a9 9 0 0 0 0-18c-1.2 4 2 5 2 7.5s-3 3-2 10.5z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className="pbj-landing__icon-btn"
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
      </div>

      <div className="pbj-landing__scroll">
        <div className="pbj-landing__hero">
          <div className="pbj-landing__lockup">
            <img src="/logo.jpg" alt="" className="pbj-landing__mark" />
            <span className="pbj-landing__wordmark">pb&j</span>
          </div>

          <h1 className="pbj-landing__title">welcome</h1>
          <p className="pbj-landing__sub">AI-powered video editing</p>
        </div>

        <div className="pbj-landing__actions">
          <Button
            fullWidth
            className="pbj-landing__btn pbj-landing__btn--apricot"
            onClick={onNewProject}
          >
            new project
          </Button>
          <div className="pbj-landing__jelly-wrap">
            <Button
              fullWidth
              className="pbj-landing__btn pbj-landing__btn--purple"
              onClick={onOpenProjects}
            >
              existing projects
            </Button>
            <svg
              className="pbj-landing__drip"
              viewBox="0 0 300 50"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,0
                  C10,0 14,4 18,10
                  C21,14 22,20 22,26
                  C22,31 26,34 30,34
                  C34,34 38,31 38,26
                  C38,18 34,10 34,4
                  C34,1 38,0 44,0

                  C56,0 60,6 64,16
                  C67,23 68,32 68,40
                  C68,46 72,50 77,50
                  C82,50 86,46 86,40
                  C86,30 81,20 81,10
                  C81,4 85,0 92,0

                  C104,0 108,3 111,7
                  C113,10 114,13 114,17
                  C114,21 117,23 121,23
                  C125,23 128,21 128,17
                  C128,11 125,6 124,2
                  C124,1 126,0 130,0

                  C142,0 146,5 149,13
                  C151,18 152,25 152,32
                  C152,37 156,40 161,40
                  C166,40 170,37 170,32
                  C170,23 165,14 164,7
                  C164,3 167,0 173,0

                  C185,0 189,4 192,9
                  C194,13 195,17 195,21
                  C195,25 198,27 202,27
                  C206,27 209,25 209,21
                  C209,15 206,9 205,4
                  C205,1 208,0 213,0

                  C225,0 229,6 232,15
                  C234,21 235,29 235,35
                  C235,40 239,43 244,43
                  C249,43 253,40 253,35
                  C253,26 248,17 247,9
                  C247,4 250,0 256,0

                  L300,0
                  Z"
                fill="#5b21b6"
              />
            </svg>
          </div>
        </div>

        <div className="pbj-landing__spacer" />

        <p className="pbj-landing__legal">
          by continuing, you agree to our
          <br />
          <a href="#" className="pbj-landing__legal-link">
            privacy policy
          </a>{" "}
          &{" "}
          <a href="#" className="pbj-landing__legal-link">
            terms of service
          </a>
        </p>
      </div>
    </div>
  );
}
