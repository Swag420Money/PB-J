import type { EditPlan, ExportOptions } from "../../types";
import type { RenderService, RenderResult } from "../interfaces";
import { apiBase, apiFetch } from "./apiBase";

/**
 * Real RenderService: sends the plan's shot list (source asset id + exact
 * trim points per clip, already computed by PatternEditPlanService) to the
 * backend, which resolves each sourceAssetId back to its uploaded file and
 * runs the actual ffmpeg trim + concat.
 *
 * When `exportOptions` is passed, the backend crops the output to exactly
 * that aspect ratio/resolution instead of just normalizing clips enough to
 * concatenate — see server/src/index.ts's /api/render handler.
 */
export class FfmpegRenderService implements RenderService {
  async render(plan: EditPlan, exportOptions?: ExportOptions): Promise<RenderResult> {
    const clips = plan.clips.map((c) => ({
      sourceAssetId: c.sourceAssetId,
      sourceInSec: c.sourceInSec,
      sourceOutSec: c.sourceOutSec,
    }));

    const res = await apiFetch("/api/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clips, exportOptions }),
    });

    const body: { videoUrl: string } = await res.json();
    return { videoUrl: `${apiBase()}${body.videoUrl}` };
  }
}
