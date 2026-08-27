/** Formats seconds as a compact duration label, scaling with magnitude:
 *  0-59s -> "45s", exact minutes -> "5m", otherwise -> "2m 30s". */
export function formatDuration(totalSec: number): string {
  const sec = Math.max(0, Math.round(totalSec));
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  const rem = sec % 60;
  if (rem === 0) return `${min}m`;
  return `${min}m ${rem}s`;
}

/** Formats seconds as a player-style timestamp, e.g. "1:05". */
export function formatTimestamp(totalSec: number): string {
  const sec = Math.max(0, Math.round(totalSec));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Time-of-day greeting, e.g. "good morning" / "good afternoon" / "good evening". */
export function timeGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "good morning";
  if (hour < 18) return "good afternoon";
  return "good evening";
}
