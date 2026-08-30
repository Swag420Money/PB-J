import { useEffect, useState } from "react";
import "./SandwichLoader.css";

/**
 * The Cooking screen's loading visual — a peanut-butter-and-jelly sandwich
 * assembling itself, driven entirely by `progress` (0-100, the same value
 * Cooking.tsx already computes from its own fake-progress timer). This
 * component owns no timing/progress logic of its own; it only reacts to
 * the number it's handed.
 *
 * Stages, mapped from `progress`:
 *   0%      — bottom slice springs in, then bobs gently for the rest.
 *   0-40%   — peanut butter "dollops" pop in left to right.
 *   40-80%  — jelly dollops pop in right to left, landing on the SAME
 *             spots as the peanut butter (so they visually overlap from
 *             the first one), plus a handful of small swirl accents on
 *             top for the marbled look.
 *   80-100% — top slice drops in from above with a spring settle.
 *   100%    — impact squash-and-stretch + a tight scatter of crumbs/PB/
 *             jelly that pop out and settle right next to the sandwich.
 *
 * Every reveal is a threshold crossing (progress >= X) rendered as a CSS
 * transition/keyframe on transform+opacity only — nothing here animates
 * width/clip-path/layout, so it stays compositor-only for 60fps on mobile
 * Safari. Progress arrives in ~100ms ticks; each element's own transition
 * (200-700ms) is what turns those ticks into smooth motion, and is also
 * what makes a big jump in `progress` (e.g. finishing early) resolve as a
 * quick, smooth catch-up instead of a hard cut — every stage a jump skips
 * just plays its own short transition immediately, all roughly at once,
 * rather than being skipped.
 */

const PB_COLOR = "url(#pbjPB)";
const JELLY_COLOR = "url(#pbjJelly)";

// Shared x/y layout for both fillings — jelly reuses the exact same spots
// so it visually lands ON the peanut butter already there (that overlap
// IS the marbling), rather than occupying separate territory.
const FILLING_SPOTS = [
  { x: 46, y: 116, r: -12, sx: 1.15, sy: 1.0 },
  { x: 84, y: 108, r: 8, sx: 1.05, sy: 0.95 },
  { x: 121, y: 104, r: -6, sx: 1.1, sy: 1.08 },
  { x: 158, y: 109, r: 10, sx: 1.0, sy: 0.95 },
  { x: 196, y: 116, r: -9, sx: 1.15, sy: 1.0 },
];

// Small comma/teardrop accents layered over the peanut-butter/jelly
// overlap once jelly is partway across — the actual "visible swirl".
const SWIRL_ACCENTS = [
  { x: 68, y: 106, r: 25, color: "jelly" as const, threshold: 0.32 },
  { x: 98, y: 96, r: -50, color: "pb" as const, threshold: 0.42 },
  { x: 130, y: 104, r: 65, color: "jelly" as const, threshold: 0.52 },
  { x: 151, y: 95, r: -15, color: "pb" as const, threshold: 0.64 },
  { x: 176, y: 103, r: 40, color: "jelly" as const, threshold: 0.76 },
  { x: 112, y: 118, r: -75, color: "pb" as const, threshold: 0.88 },
];

// Kept tight and close — small tx/ty, nothing that reads as "flung".
const SCATTER_PARTICLES = [
  { kind: "crumb" as const, x: 44, y: 96, tx: -18, ty: -11, delay: 0 },
  { kind: "crumb" as const, x: 198, y: 96, tx: 18, ty: -10, delay: 50 },
  { kind: "pb" as const, x: 38, y: 148, tx: -20, ty: 14, delay: 90 },
  { kind: "jelly" as const, x: 202, y: 148, tx: 20, ty: 14, delay: 90 },
  { kind: "pb" as const, x: 58, y: 162, tx: -12, ty: 20, delay: 150 },
  { kind: "jelly" as const, x: 182, y: 162, tx: 12, ty: 20, delay: 150 },
];

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

export function SandwichLoader({ progress }: { progress: number }) {
  const reducedMotion = usePrefersReducedMotion();

  const pbFraction = clamp01(progress / 40);
  const jellyFraction = clamp01((progress - 40) / 40);
  const hasDropped = reducedMotion || progress >= 80;
  const hasImpacted = !reducedMotion && progress >= 100;

  const n = FILLING_SPOTS.length;

  return (
    <div className={"pbj-sandwich" + (reducedMotion ? " pbj-sandwich--static" : "")}>
      <svg viewBox="0 0 240 200" className="pbj-sandwich__svg" aria-hidden="true">
        <defs>
          <linearGradient id="pbjBreadCrumb" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6D896" />
            <stop offset="100%" stopColor="#E7B563" />
          </linearGradient>
          <linearGradient id="pbjBreadCrust" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D89A4E" />
            <stop offset="100%" stopColor="#B87830" />
          </linearGradient>
          <linearGradient id="pbjPB" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C88A46" />
            <stop offset="100%" stopColor="#9C6328" />
          </linearGradient>
          <linearGradient id="pbjJelly" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9B3E6B" />
            <stop offset="100%" stopColor="#5C1F45" />
          </linearGradient>
          <radialGradient id="pbjShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(20,16,14,0.20)" />
            <stop offset="100%" stopColor="rgba(20,16,14,0)" />
          </radialGradient>
          <path
            id="pbjBlob"
            d="M -22 0 C -22 -14 -10 -22 2 -21 C 14 -20 24 -12 23 0 C 22 12 12 20 0 20 C -12 20 -22 12 -22 0 Z"
          />
          <path
            id="pbjSwirl"
            d="M 0 0 C 8 -2 14 -8 12 -16 C 10 -22 2 -24 -4 -20 C -10 -16 -12 -8 -8 -2 C -6 2 -2 2 0 0 Z"
          />
        </defs>

        <ellipse className="pbj-sandwich__shadow" cx="120" cy="177" rx="86" ry="11" fill="url(#pbjShadow)" />

        <g className="pbj-sandwich__bob">
          <g className={"pbj-sandwich__impact" + (hasImpacted ? " pbj-sandwich__impact--go" : "")}>
            {/* Bottom slice — Stage 1 */}
            <g className="pbj-sandwich__bottom-slice-enter">
              <rect x="26" y="118" width="188" height="60" rx="28" fill="url(#pbjBreadCrust)" />
              <rect x="33" y="122" width="174" height="46" rx="22" fill="url(#pbjBreadCrumb)" />
              <rect x="46" y="127" width="110" height="7" rx="3.5" fill="#fff" opacity="0.3" />
              <rect x="42" y="159" width="150" height="6" rx="3" fill="#8B5A2B" opacity="0.15" />
            </g>

            {/* Peanut butter — Stage 2 */}
            <g className="pbj-sandwich__pb">
              {FILLING_SPOTS.map((s, i) => {
                // (i+1)/(n+1) spacing (not i/n) so the first dollop needs a
                // touch of real progress — otherwise it'd appear at exactly
                // 0%, before Stage 1's bare-slice moment ever reads clean.
                const visible = pbFraction >= (i + 1) / (n + 1);
                return (
                  <g key={i} transform={`translate(${s.x} ${s.y}) rotate(${s.r}) scale(${s.sx} ${s.sy})`}>
                    <use
                      href="#pbjBlob"
                      fill={PB_COLOR}
                      className={"pbj-sandwich__blob" + (visible ? " pbj-sandwich__blob--visible" : "")}
                      style={{ transitionDelay: `${i * 55}ms` }}
                    />
                  </g>
                );
              })}
            </g>

            {/* Jelly, marbling into the peanut butter — Stage 3 */}
            <g className="pbj-sandwich__jelly">
              {FILLING_SPOTS.map((s, i) => {
                const order = n - 1 - i; // rightmost spot reveals first
                const visible = jellyFraction >= (order + 1) / (n + 1);
                return (
                  <g
                    key={i}
                    transform={`translate(${s.x} ${s.y}) rotate(${s.r + 16}) scale(${s.sx * 0.92} ${s.sy * 0.92})`}
                  >
                    <use
                      href="#pbjBlob"
                      fill={JELLY_COLOR}
                      className={"pbj-sandwich__blob" + (visible ? " pbj-sandwich__blob--visible" : "")}
                      style={{ transitionDelay: `${order * 55}ms` }}
                    />
                  </g>
                );
              })}
              {SWIRL_ACCENTS.map((a, i) => {
                const visible = jellyFraction >= a.threshold;
                return (
                  <g key={i} transform={`translate(${a.x} ${a.y}) rotate(${a.r})`}>
                    <use
                      href="#pbjSwirl"
                      fill={a.color === "jelly" ? JELLY_COLOR : PB_COLOR}
                      className={"pbj-sandwich__blob pbj-sandwich__swirl" + (visible ? " pbj-sandwich__blob--visible" : "")}
                    />
                  </g>
                );
              })}
            </g>

            {/* Top slice — Stage 4 */}
            <g className={"pbj-sandwich__top-slice" + (hasDropped ? " pbj-sandwich__top-slice--dropped" : "")}>
              <rect x="26" y="40" width="188" height="60" rx="28" fill="url(#pbjBreadCrust)" />
              <rect x="33" y="44" width="174" height="46" rx="22" fill="url(#pbjBreadCrumb)" />
              <rect x="46" y="49" width="110" height="7" rx="3.5" fill="#fff" opacity="0.3" />
              <rect x="42" y="81" width="150" height="6" rx="3" fill="#8B5A2B" opacity="0.15" />
            </g>
          </g>

          {/* Stage 5 — impact scatter, sits outside the squash group so it
              travels independently rather than squishing with the sandwich */}
          <g className={"pbj-sandwich__scatter" + (hasImpacted ? " pbj-sandwich__scatter--go" : "")}>
            {SCATTER_PARTICLES.map((p, i) => {
              const fill = p.kind === "pb" ? PB_COLOR : p.kind === "jelly" ? JELLY_COLOR : "#D89A4E";
              const style = {
                "--tx": `${p.tx}px`,
                "--ty": `${p.ty}px`,
                animationDelay: `${p.delay}ms`,
              } as React.CSSProperties;
              return (
                <g key={i} transform={`translate(${p.x} ${p.y})`}>
                  {p.kind === "crumb" ? (
                    <circle r="3.5" className="pbj-sandwich__scatter-particle" fill={fill} style={style} />
                  ) : (
                    // Static size scale lives on this wrapper <g> (SVG attribute)
                    // so the CSS-driven transform below (translate+scale for the
                    // scatter motion) doesn't clobber it — CSS transform on an
                    // element replaces its SVG transform attribute outright.
                    <g transform="scale(0.34)">
                      <use href="#pbjBlob" className="pbj-sandwich__scatter-particle" fill={fill} style={style} />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}
