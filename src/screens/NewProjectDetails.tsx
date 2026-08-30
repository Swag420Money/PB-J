import { useRef, useState } from "react";
import { BackButton } from "../components/BackButton";
import { Button } from "../components/Button";
import { DurationRangeSlider } from "../components/DurationRangeSlider";
import { PLACEHOLDER_CLIP_GRADIENTS } from "../data/placeholders";
import { formatDuration } from "../utils/format";
import type { UploadedClip } from "../state/useAppFlow";
import "./NewProjectDetails.css";

/**
 * New Project, screen 1 of 2 — title, footage, length. The prompt (the
 * product's actual differentiator) deliberately isn't here; it's the whole
 * of screen 2, so it can't read as "one optional field among three."
 */
export function NewProjectDetails({
  title,
  onTitleChange,
  clips,
  onAddFiles,
  totalFootageSec,
  isOverLimit,
  footageCapSec,
  onRemoveLastClip,
  onRemoveClip,
  durationSec,
  onDurationChange,
  onBack,
  onNext,
}: {
  title: string;
  onTitleChange: (title: string) => void;
  clips: UploadedClip[];
  onAddFiles: (files: FileList | null) => void;
  totalFootageSec: number;
  isOverLimit: boolean;
  footageCapSec: number;
  onRemoveLastClip: () => void;
  onRemoveClip: (id: string) => void;
  durationSec: number;
  onDurationChange: (sec: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [upgradeNoteVisible, setUpgradeNoteVisible] = useState(false);

  function startEditingTitle() {
    setTitleDraft(title);
    setEditingTitle(true);
  }

  function commitTitle() {
    onTitleChange(titleDraft.trim() || "New Project");
    setEditingTitle(false);
  }

  function tapUpgrade() {
    setUpgradeNoteVisible(true);
    setTimeout(() => setUpgradeNoteVisible(false), 2500);
  }

  const canProceed = durationSec > 0 && clips.length > 0;

  return (
    <div className="pbj-np1">
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        multiple
        className="pbj-np1__file-input"
        onChange={(e) => {
          onAddFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <BackButton onClick={onBack} className="pbj-back-btn--floating" />

      <div className="pbj-np1__body">
        <div className="pbj-np1__hero">
          {editingTitle ? (
            <input
              autoFocus
              className="pbj-np1__title-input"
              value={titleDraft}
              placeholder="New Project"
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
                if (e.key === "Escape") {
                  setTitleDraft(title);
                  setEditingTitle(false);
                }
              }}
            />
          ) : (
            <button type="button" className="pbj-np1__title-display" onClick={startEditingTitle}>
              <span className="pbj-np1__title-text">{title}</span>
              <svg
                className="pbj-np1__title-pencil"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="pbj-np1__middle">
        <section className="pbj-np1__section">
          {clips.length === 0 ? (
            <button
              type="button"
              className="pbj-np1__dropzone-empty"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="15" rx="3" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor" />
                <path
                  d="M4 17l4.5-4.5a2 2 0 0 1 2.8 0L16 17M14.5 15.5l1.2-1.2a2 2 0 0 1 2.8 0L21 17"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Add Your Footage</span>
            </button>
          ) : (
            <div className="pbj-np1__clip-grid">
              {clips.map((c, i) => (
                <div key={c.id} className="pbj-np1__clip-tile-wrap">
                  <div
                    className="pbj-np1__clip-tile"
                    style={
                      c.thumbnailUrl
                        ? { backgroundImage: `url(${c.thumbnailUrl})` }
                        : { background: PLACEHOLDER_CLIP_GRADIENTS[i % PLACEHOLDER_CLIP_GRADIENTS.length] }
                    }
                  >
                    {/* null (still reading, or unreadable even after a
                        retry) renders nothing here — no badge, no dash, no
                        spinner. A real value fades the pill in over 200ms
                        (see the CSS keyframe) rather than popping it in. */}
                    {c.durationSec !== null && (
                      <span className="pbj-np1__clip-duration">
                        {formatDuration(c.durationSec)}
                      </span>
                    )}
                  </div>
                  {/* Sibling of .pbj-np1__clip-tile, not a child of it — the
                      tile has overflow:hidden (so its background-image stays
                      clipped to the rounded corners), which would clip this
                      badge too if it lived inside. Sitting on the wrap
                      instead keeps it visible at the true corner. */}
                  <button
                    type="button"
                    className="pbj-np1__clip-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveClip(c.id);
                    }}
                    aria-label={`Remove ${c.fileName}`}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M5 5l14 14M19 5L5 19"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="pbj-np1__dropzone-add"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Add more footage"
              >
                +
              </button>
            </div>
          )}

          {clips.length > 0 && !isOverLimit && (
            <p className="pbj-np1__footage-total">{formatDuration(totalFootageSec)} of Footage</p>
          )}

          {isOverLimit && (
            <div className="pbj-np1__warning">
              <p className="pbj-np1__warning-text">
                That's {Math.round(totalFootageSec / 60)} Minutes, You've Got{" "}
                {Math.round(footageCapSec / 60)} Left
              </p>
              <div className="pbj-np1__warning-actions">
                <button type="button" className="pbj-np1__warning-link" onClick={onRemoveLastClip}>
                  Remove Footage
                </button>
                <button type="button" className="pbj-np1__warning-link" onClick={tapUpgrade}>
                  Upgrade
                </button>
              </div>
              {upgradeNoteVisible && <p className="pbj-np1__upgrade-note">Upgrading Isn't Set Up Yet</p>}
            </div>
          )}
        </section>

        <section className="pbj-np1__section">
          <DurationRangeSlider valueSec={durationSec} onChange={onDurationChange} />
        </section>
        </div>
      </div>

      <div className="pbj-np1__footer">
        <Button fullWidth onClick={onNext} disabled={!canProceed}>
          Next
        </Button>
      </div>
    </div>
  );
}
