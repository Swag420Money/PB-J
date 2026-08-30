import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Placeholder } from "../components/Placeholder";
import { SandwichLoader } from "../components/SandwichLoader";
import { COOKING_NARRATION, FAKE_COOKING_DURATION_MS } from "../data/placeholders";
import "./Cooking.css";

const PUSH_PROMPT_SEEN_KEY = "pbj_seen_push_prompt";

function hasSeenPushPrompt(): boolean {
  try {
    return localStorage.getItem(PUSH_PROMPT_SEEN_KEY) === "true";
  } catch {
    return false;
  }
}

function markPushPromptSeen(): void {
  try {
    localStorage.setItem(PUSH_PROMPT_SEEN_KEY, "true");
  } catch {
    // Best-effort.
  }
}

/** Counts a fake progress value 0-100 over `durationMs`. Isolated in its
 *  own hook specifically so swapping this for a real render-progress
 *  source later (websocket, poll, whatever Paul builds) means changing
 *  this one hook, not Cooking.tsx's structure. */
function useFakeProgress(durationMs: number): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / durationMs) * 100));
      setProgress(pct);
      if (pct >= 100) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [durationMs]);
  return progress;
}

export function Cooking({
  prompt,
  onCancel,
  onEdit,
  onComplete,
}: {
  prompt: string;
  onCancel: () => void;
  onEdit: () => void;
  onComplete: () => void;
}) {
  const progress = useFakeProgress(FAKE_COOKING_DURATION_MS);
  const [narrationIndex, setNarrationIndex] = useState(0);
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const [showPushPrompt] = useState(() => !hasSeenPushPrompt());
  const [pinged, setPinged] = useState(false);
  const completeRef = useRef(onComplete);
  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const id = setInterval(() => {
      setNarrationIndex((i) => (i + 1) % (COOKING_NARRATION.length + 1));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Guarded on confirmingCancel too: reaching 100% while the creator is
    // mid-decision on the cancel confirmation must never silently yank
    // them into Studio out from under it. If they dismiss the dialog
    // ("keep cooking") after this point, this effect re-runs and
    // completes normally.
    if (progress >= 100 && !confirmingCancel) {
      const timer = setTimeout(() => completeRef.current(), 600);
      return () => clearTimeout(timer);
    }
  }, [progress, confirmingCancel]);

  useEffect(() => {
    markPushPromptSeen();
  }, []);

  // Last slot in the narration cycle echoes the creator's real prompt —
  // everything else is fake.
  const isEchoSlot = narrationIndex === COOKING_NARRATION.length;
  const narrationText = isEchoSlot ? `You Said: "${prompt || "just make it good"}"` : COOKING_NARRATION[narrationIndex];

  return (
    <div className="pbj-cooking">
      <div className="pbj-cooking__body">
        <SandwichLoader progress={progress} />

        {isEchoSlot ? (
          <p key={narrationIndex} className="pbj-cooking__narration pbj-cooking__narration--echo">
            {narrationText}
          </p>
        ) : (
          <Placeholder key={narrationIndex} className="pbj-cooking__narration">
            {narrationText}
          </Placeholder>
        )}

        <div className="pbj-cooking__controls">
          {/* "change settings" (safe — just goes back to New Project) is
              the more prominent of the two; "cancel" (leads to abandoning
              the render) stays quieter. One abandon path, not two — the
              back chevron this screen used to also have is gone. */}
          <Button
            type="button"
            variant="text"
            onClick={onEdit}
            className="pbj-cooking__control-safe"
          >
            Change Settings
          </Button>
          <Button type="button" variant="text" onClick={() => setConfirmingCancel(true)}>
            Cancel
          </Button>
        </div>
      </div>

      {showPushPrompt && !confirmingCancel && (
        <div className="pbj-cooking__push">
          <p className="pbj-cooking__push-benefit">We'll Ping You the Second Your Edit's Ready</p>
          {pinged ? (
            <p className="pbj-cooking__push-confirmed">You're Set — We'll Ping You</p>
          ) : (
            <Button type="button" fullWidth onClick={() => setPinged(true)}>
              Ping Me When It's Done
            </Button>
          )}
        </div>
      )}

      {confirmingCancel && (
        <div className="pbj-cooking__confirm-backdrop" onClick={() => setConfirmingCancel(false)}>
          <div className="pbj-cooking__confirm" onClick={(e) => e.stopPropagation()}>
            <p className="pbj-cooking__confirm-text">Cancel Now and This Render Is Gone — You'll Have to Start Over</p>
            <Button type="button" fullWidth onClick={() => setConfirmingCancel(false)}>
              Keep Cooking
            </Button>
            <Button
              type="button"
              variant="text"
              fullWidth
              onClick={onCancel}
              className="pbj-cooking__confirm-danger-text"
            >
              Cancel Anyway
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
