import { useLayoutEffect, useRef, useState } from "react";
import { BackButton } from "../components/BackButton";
import { Button } from "../components/Button";
import { TRAINED_STYLES, PROMPT_PLACEHOLDER } from "../data/placeholders";
import "./NewProjectPrompt.css";

const MAX_STYLES = 3;

function PlusGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12.5l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MicGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" fill="currentColor" />
      <path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Height cap for the recipe textarea — 5 lines at 19px/1.4 line-height,
// matched by .pbj-np2__prompt's CSS max-height. Auto-grows freely below
// this; scrolls internally past it so it can never push the style row,
// mic, or CTA off screen.
const PROMPT_MAX_HEIGHT_PX = 133;

/**
 * New Project, screen 2 of 2 — prompt as the hero (plain text on a blank
 * page, no field chrome), a swipeable style row, and a mic button as the
 * primary input affordance. Prompt text and style selection are fully
 * independent state; nothing here ever writes one into the other.
 */
export function NewProjectPrompt({
  styleIds,
  onStyleIdsChange,
  prompt,
  onPromptChange,
  onBack,
  onSubmit,
}: {
  styleIds: string[];
  onStyleIdsChange: (ids: string[]) => void;
  prompt: string;
  onPromptChange: (value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isRecording, setIsRecording] = useState(false);

  function toggleStyle(id: string) {
    if (styleIds.includes(id)) {
      onStyleIdsChange(styleIds.filter((s) => s !== id));
    } else if (styleIds.length < MAX_STYLES) {
      onStyleIdsChange([...styleIds, id]);
    }
  }

  const capReached = styleIds.length >= MAX_STYLES;

  // Auto-grow: height tracks content exactly, so the textarea itself never
  // scrolls internally — everything below it (row, mic, footer) shifts
  // down in normal flow instead. Re-measures on every keystroke and once
  // on mount (covers a prompt seeded from back-nav before any typing).
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, PROMPT_MAX_HEIGHT_PX)}px`;
  }, [prompt]);

  function tapMic() {
    setIsRecording((r) => !r);
    // TODO(voice input): stub only — no real speech recognition wired yet.
    // See the task report for the Web Speech API / iOS Safari viability
    // writeup; this just toggles the visual state.
  }

  return (
    <div className="pbj-np2">
      <BackButton onClick={onBack} className="pbj-back-btn--floating" />

      <div className="pbj-np2__body">
        <div className="pbj-np2__hero">
          <h1 className="pbj-np2__title">What's The Recipe?</h1>
        </div>

        <textarea
          ref={textareaRef}
          className="pbj-np2__prompt"
          placeholder={PROMPT_PLACEHOLDER}
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onFocus={(e) => e.currentTarget.scrollIntoView({ block: "center", behavior: "smooth" })}
          rows={1}
          autoCapitalize="sentences"
          autoCorrect="on"
          spellCheck
        />

        <div className="pbj-np2__grid">
          {TRAINED_STYLES.map((style) => {
            const isSelected = styleIds.includes(style.id);
            const isMuted = !isSelected && capReached;
            return (
              <button
                key={style.id}
                type="button"
                className={
                  "pbj-np2__tile" +
                  (isSelected ? " pbj-np2__tile--selected" : "") +
                  (isMuted ? " pbj-np2__tile--muted" : "")
                }
                disabled={isMuted}
                onClick={() => toggleStyle(style.id)}
              >
                <span className="pbj-np2__tile-image" style={{ background: style.thumbnail }} />
                <span className="pbj-np2__tile-scrim" />
                <span className="pbj-np2__tile-badge">{isSelected ? <CheckGlyph /> : <PlusGlyph />}</span>
                <span className="pbj-np2__tile-name">{style.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom-anchored cluster — mic, caption, CTA read as one paired
          unit pinned to the true bottom, not a mic marooned in mid-screen
          void. The slack from removing the old scroll-row/peek layout is
          absorbed by .body's own flex:1 (default top-alignment, so it
          collects as a single gap right here, before this cluster —
          nothing inside .body fights it for the leftover space). */}
      <div className="pbj-np2__footer">
        <div className="pbj-np2__mic-cluster">
          <button
            type="button"
            className={"pbj-np2__mic" + (isRecording ? " pbj-np2__mic--active" : "")}
            onClick={tapMic}
            aria-pressed={isRecording}
            aria-label={isRecording ? "Stop voice input" : "Start voice input"}
          >
            {isRecording && (
              <>
                <span className="pbj-np2__mic-ring" aria-hidden="true" />
                <span className="pbj-np2__mic-ring pbj-np2__mic-ring--delay" aria-hidden="true" />
              </>
            )}
            <MicGlyph />
          </button>
          <p className="pbj-np2__mic-caption">or say it out loud</p>
        </div>

        <Button fullWidth onClick={onSubmit} disabled={styleIds.length === 0}>
          let's cook!
        </Button>
      </div>
    </div>
  );
}
