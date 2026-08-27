import type { MockProject } from "../data/mockProjects";
import type { EditPlan, ProjectResult, TimelineClip, TransitionType } from "../types";
import { CLIP_COLORS } from "../services/mock/mockEditPlan";
import { makeId } from "./id";

const TRANSITIONS: TransitionType[] = ["cut", "crossfade", "whip-pan", "zoom", "slide"];

function parseDurationLabel(label: string): number {
  const [mm, ss] = label.split(":").map((n) => parseInt(n, 10));
  if (Number.isNaN(mm) || Number.isNaN(ss)) return 30;
  return mm * 60 + ss;
}

/**
 * Synthesizes a full ProjectResult (as if it had already been generated
 * and rendered) from a placeholder project-history entry, so tapping an
 * existing project can open straight into Results with a populated
 * timeline. There is no real stored render yet, so videoUrl/posterUrl
 * stay empty and the player falls back to its neutral placeholder — swap
 * this for a real "load saved project" call once persistence exists.
 */
export function buildResultFromMockProject(project: MockProject): ProjectResult {
  const totalSec = parseDurationLabel(project.durationLabel);
  const clipCount = Math.max(3, Math.min(8, Math.round(totalSec / 5)));

  const clips: TimelineClip[] = [];
  let cursor = 0;
  for (let i = 0; i < clipCount; i++) {
    const remaining = clipCount - i;
    const len = i === clipCount - 1
      ? Math.max(1, totalSec - cursor)
      : Math.max(1, (totalSec - cursor) / remaining);
    const start = cursor;
    const end = Math.round((start + len) * 10) / 10;
    cursor = end;

    clips.push({
      id: makeId("clip"),
      sourceAssetId: makeId("asset"),
      label: `${project.name.split(" ")[0]} ${i + 1}`,
      thumbColor: CLIP_COLORS[i % CLIP_COLORS.length],
      startSec: start,
      endSec: end,
      transitionIn: i === 0 ? "cut" : TRANSITIONS[i % TRANSITIONS.length],
      overlays: [],
      sourceInSec: 0,
      sourceOutSec: len,
      speedMultiplier: i % 4 === 3 ? 1.5 : i % 5 === 2 ? 0.75 : 1,
      muted: i % 3 === 2,
    });
  }

  if (clips[0]) {
    clips[0].overlays.push({
      id: makeId("ov"),
      text: project.name,
      position: "bottom",
      startSec: clips[0].startSec,
      endSec: Math.min(clips[0].endSec, clips[0].startSec + 2.5),
    });
  }

  const plan: EditPlan = {
    id: makeId("plan"),
    targetDurationSec: totalSec,
    prompt: `${project.name} — a previously generated edit.`,
    styleSummary: "Loaded from your saved project.",
    pacing: "medium",
    clips,
    musicSuggestion: "Warm acoustic pop, 100 BPM",
    createdAt: new Date().toISOString(),
  };

  return {
    id: project.id,
    videoUrl: "",
    posterUrl: "",
    plan,
  };
}
