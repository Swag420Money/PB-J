// Every invented/placeholder value in this prototype pass lives here —
// nowhere else. Each is rendered at its call site wrapped in <Placeholder>
// (src/components/Placeholder.tsx) so it's visually obvious which parts of
// the app are real vs. stand-ins for backend work Paul hasn't built yet,
// and so removing the fake-data styling later is a one-component change.
//
// NOT included here: static product copy/taxonomy that isn't standing in
// for a future real value (e.g. the "your style" category chip names, or
// button labels) — those are real content, not placeholders for data.

// ---- Sign in --------------------------------------------------------
export const SOCIAL_PROOF_COUNT = "11,376";

// ---- Teach it (state B: analyzing) ----------------------------------
export const TEACH_IT_OBSERVATIONS = [
  "You Cut Every 1.8 Seconds",
  "You Punch in on Reactions",
  "You Never Let a Shot Sit",
  "You Always Lead With the Punchline",
  "You Love a Hard Cut on the Beat",
];

// ---- Teach it (state C: style card) ----------------------------------
export const GENERATED_STYLE_NAME = "Fast & Punchy";

// ---- New project: tier caps -------------------------------------------
export interface TierCap {
  name: "Basic" | "Intermediate" | "Pro";
  outputMinutes: number;
  footageHours: number;
}

export const TIER_CAPS: TierCap[] = [
  { name: "Basic", outputMinutes: 3, footageHours: 1 },
  { name: "Intermediate", outputMinutes: 5, footageHours: 2 },
  { name: "Pro", outputMinutes: 10, footageHours: 4 },
];

// Which tier the signed-in creator is on — fake until real billing exists.
export const CURRENT_TIER: TierCap["name"] = "Basic";

// Not fake data — real placeholder text for the real recipe input on New
// Project screen 2 only. Lowercase is deliberate brand voice (same
// exception class as "let's cook" on Sign In), not an oversight in the
// app-wide title-case pass.
export const PROMPT_PLACEHOLDER = "write your recipe";

// Stand-in art for a clip whose real thumbnail couldn't be captured (e.g.
// this environment defers video decode for backgrounded tabs, so the
// off-DOM capture below times out) — same gray-gradient language as the
// Projects grid's fake thumbnails.
export const PLACEHOLDER_CLIP_GRADIENTS = [
  "linear-gradient(160deg, #d1d1d6, #aeaeb2)",
  "linear-gradient(160deg, #c7c7cc, #8e8e93)",
  "linear-gradient(160deg, #aeaeb2, #636366)",
];

// New project screen 2: the creator's own trained styles (not generic
// presets — those were cut). Real content shape, fake data until there's a
// real trained-style backend; thumbnail reuses PLACEHOLDER_CLIP_GRADIENTS
// (cycled) as a stand-in frame, same as the clip tiles above. isDefault
// distinguishes system-shipped styles from a creator's own trained ones —
// all 6 are defaults for now; there's no user-trained style yet to compare
// against, so no visual sectioning is needed (see NewProjectPrompt).
export interface TrainedStyle {
  id: string;
  label: string;
  thumbnail: string;
  isDefault: boolean;
}

export const TRAINED_STYLES: TrainedStyle[] = [
  { id: "fast-punchy", label: "Fast & Punchy", thumbnail: PLACEHOLDER_CLIP_GRADIENTS[0], isDefault: true },
  { id: "clean", label: "Clean", thumbnail: PLACEHOLDER_CLIP_GRADIENTS[1], isDefault: true },
  { id: "loud", label: "Loud", thumbnail: PLACEHOLDER_CLIP_GRADIENTS[2], isDefault: true },
  { id: "slow-burn", label: "Slow Burn", thumbnail: PLACEHOLDER_CLIP_GRADIENTS[0], isDefault: true },
  { id: "talky", label: "Talky", thumbnail: PLACEHOLDER_CLIP_GRADIENTS[1], isDefault: true },
  { id: "chaotic", label: "Chaotic", thumbnail: PLACEHOLDER_CLIP_GRADIENTS[2], isDefault: true },
];

// ---- Home: fake render-in-progress toggle ------------------------------
// Flip to true to demo the "your edit is cooking" strip on Home.
export const RENDER_IN_PROGRESS = false;

// ---- Cooking ----------------------------------------------------------
// How long the fake progress animation takes to reach 100%. Isolated here
// (and only read by the useFakeProgress hook) so swapping in a real
// progress source later is a one-hook change, not a component rewrite.
export const FAKE_COOKING_DURATION_MS = 9000;

// Each line names something specific rather than a generic verb; the last
// one lands on possession ("making yours"), not process — matching the
// specific, second-person, observational voice of TEACH_IT_OBSERVATIONS.
export const COOKING_NARRATION = [
  "Counting Your Cuts",
  "Clocking Your Reactions",
  "Reading Your Pace",
  "Matching Your Style",
  "Making Yours",
];

// ---- Projects grid ------------------------------------------------------
export interface FakeProject {
  id: string;
  title: string;
  durationLabel: string;
  thumbGradient: string;
}

export const FAKE_PROJECTS: FakeProject[] = [
  { id: "proj_1", title: "Beach Day Recap", durationLabel: "0:32", thumbGradient: "linear-gradient(160deg, #d1d1d6, #aeaeb2)" },
  { id: "proj_2", title: "Weekend in Tulum", durationLabel: "0:45", thumbGradient: "linear-gradient(160deg, #c7c7cc, #8e8e93)" },
  { id: "proj_3", title: "Studio Session", durationLabel: "0:28", thumbGradient: "linear-gradient(160deg, #aeaeb2, #636366)" },
  { id: "proj_4", title: "Road Trip Edit", durationLabel: "1:02", thumbGradient: "linear-gradient(160deg, #e5e5ea, #c7c7cc)" },
  { id: "proj_5", title: "Golden Hour", durationLabel: "0:38", thumbGradient: "linear-gradient(160deg, #8e8e93, #636366)" },
  { id: "proj_6", title: "Friends Vlog", durationLabel: "0:51", thumbGradient: "linear-gradient(160deg, #d1d1d6, #8e8e93)" },
];

// ---- Studio: mock AI-arranged timeline ---------------------------------
// Fallback ONLY — used when Studio genuinely has no real uploaded clips to
// show (e.g. opening an existing project, which isn't backed by real footage
// yet). When a real New project draft carries real clips, Studio uses those
// instead of this. thumbBackground is a plain gray gradient here since it's
// fake, but the same field on a real clip holds a real `url(...)` thumbnail
// — see Studio.tsx's WorkingClip.
export interface TimelineClip {
  id: string;
  thumbBackground: string;
  durationSec: number;
}

export const MOCK_TIMELINE_CLIPS: TimelineClip[] = [
  { id: "snip_1", thumbBackground: "linear-gradient(160deg, #d1d1d6, #aeaeb2)", durationSec: 3.2 },
  { id: "snip_2", thumbBackground: "linear-gradient(160deg, #c7c7cc, #8e8e93)", durationSec: 2.4 },
  { id: "snip_3", thumbBackground: "linear-gradient(160deg, #aeaeb2, #636366)", durationSec: 4.1 },
  { id: "snip_4", thumbBackground: "linear-gradient(160deg, #e5e5ea, #c7c7cc)", durationSec: 1.8 },
  { id: "snip_5", thumbBackground: "linear-gradient(160deg, #8e8e93, #636366)", durationSec: 3.6 },
  { id: "snip_6", thumbBackground: "linear-gradient(160deg, #d1d1d6, #8e8e93)", durationSec: 2.2 },
  { id: "snip_7", thumbBackground: "linear-gradient(160deg, #c7c7cc, #aeaeb2)", durationSec: 3.0 },
  { id: "snip_8", thumbBackground: "linear-gradient(160deg, #aeaeb2, #8e8e93)", durationSec: 2.7 },
];

// The one line under Studio's preview that's the app's actual trust
// moment — proof the edit came from the creator's own footage/style, not a
// template. Same voice as TEACH_IT_OBSERVATIONS (specific, observational,
// second person, lowercase), and literally references GENERATED_STYLE_NAME
// rather than repeating it as a second, disconnected string. Real
// generation is backend work; honest stand-in text until that exists.
export const EDIT_RECEIPT =
  `Fast Cuts, Punchy Reactions, Zero Dead Air — Pulled Straight From Your ${GENERATED_STYLE_NAME} Style`;

// Not fake data — real placeholder text for the real revision-prompt input.
// Scope changes automatically based on whether a clip is selected — see
// Studio.tsx's prompt bar.
export const REVISION_PROMPT_PLACEHOLDER = "Want to Change Anything About This Edit?";
export const REVISION_PROMPT_PLACEHOLDER_CLIP = "Change Just This Clip";

// ---- Settings / usage meter (moved from the old mockAccount.ts) --------
export interface MockBilling {
  tier: "Free" | "Pro" | "Studio";
  minutesUsed: number;
  minutesLimit: number;
}

export const MOCK_BILLING: MockBilling = {
  tier: "Free",
  minutesUsed: 18,
  minutesLimit: 30,
};
