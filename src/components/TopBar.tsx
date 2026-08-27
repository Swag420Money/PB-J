import type { ReactNode } from "react";
import "./TopBar.css";

interface TopBarProps {
  title?: string;
  onBack?: () => void;
  right?: ReactNode;
}

export function TopBar({ title, onBack, right }: TopBarProps) {
  return (
    <header className="pbj-topbar">
      <div className="pbj-topbar__side">
        {onBack && (
          <button className="pbj-topbar__back" onClick={onBack} aria-label="Back">
            <svg width="11" height="18" viewBox="0 0 11 18" fill="none">
              <path
                d="M9.5 1.5L2 9L9.5 16.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
      {title && <h1 className="pbj-topbar__title">{title}</h1>}
      <div className="pbj-topbar__side pbj-topbar__side--right">{right}</div>
    </header>
  );
}
