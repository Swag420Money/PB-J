import { useCallback, useRef, useState } from "react";
import type { MediaAsset, ProjectResult, ProjectStage } from "../types";
import type { ProcessingStep } from "../services/interfaces";
import { processingOrchestrator } from "../services";
import type { MockProject } from "../data/mockProjects";
import { buildResultFromMockProject } from "../utils/mockProjectToResult";
import { PRESET_STYLES } from "../data/presetStyles";

export interface ProjectFlow {
  stage: ProjectStage;
  assets: MediaAsset[];
  targetDurationSec: number;
  prompt: string;
  styleReferenceUrl: string;
  selectedPresetId: string | null;
  processingStep: ProcessingStep | null;
  result: ProjectResult | null;
  error: string | null;

  startNewProject: () => void;
  setAssets: (assets: MediaAsset[] | ((prev: MediaAsset[]) => MediaAsset[])) => void;
  setTargetDurationSec: (sec: number) => void;
  setPrompt: (prompt: string) => void;
  setStyleReferenceUrl: (url: string) => void;
  setSelectedPresetId: (id: string | null) => void;
  submitForProcessing: () => Promise<void>;
  setResult: (result: ProjectResult) => void;
  reset: () => void;
  discardAndRestart: () => void;
  openExistingProject: (project: MockProject) => void;
  openSettings: () => void;
  closeSettings: () => void;
  /** Leaves the "ready" celebration screen and enters the editor. */
  proceedToResults: () => void;
  openProjectsGrid: () => void;
  openStyleLibrary: () => void;
  openStyleTraining: () => void;
  closeStyleTraining: () => void;
  backToLanding: () => void;
}

const DEFAULT_DURATION = 30;

export function useProjectFlow(): ProjectFlow {
  const [stage, setStage] = useState<ProjectStage>("landing");
  const [assets, setAssetsState] = useState<MediaAsset[]>([]);
  const [targetDurationSec, setTargetDurationSec] = useState(DEFAULT_DURATION);
  const [prompt, setPrompt] = useState("");
  const [styleReferenceUrl, setStyleReferenceUrl] = useState("");
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState<ProcessingStep | null>(null);
  const [result, setResult] = useState<ProjectResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const runIdRef = useRef(0);

  const startNewProject = useCallback(() => {
    setStage("setup");
  }, []);

  const setAssets = useCallback((next: MediaAsset[] | ((prev: MediaAsset[]) => MediaAsset[])) => {
    setAssetsState(next);
  }, []);

  const submitForProcessing = useCallback(async () => {
    const runId = ++runIdRef.current;
    setStage("processing");
    setError(null);
    setProcessingStep("uploading");
    try {
      const { videoUrl, posterUrl, plan, warnings } = await processingOrchestrator.run(
        assets,
        targetDurationSec,
        prompt,
        {
          url: styleReferenceUrl.trim() || undefined,
          presetName:
            PRESET_STYLES.find((p) => p.id === selectedPresetId)?.name ?? undefined,
        },
        (step) => {
          if (runIdRef.current === runId) setProcessingStep(step);
        }
      );
      if (runIdRef.current !== runId) return;
      setResult({ id: plan.id, videoUrl, posterUrl, plan, warnings: warnings.length > 0 ? warnings : undefined });
      setStage("ready");
    } catch (err) {
      if (runIdRef.current !== runId) return;
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStage("setup");
    }
  }, [assets, targetDurationSec, prompt, styleReferenceUrl, selectedPresetId]);

  const reset = useCallback(() => {
    runIdRef.current += 1;
    setStage("landing");
    setAssetsState([]);
    setTargetDurationSec(DEFAULT_DURATION);
    setPrompt("");
    setStyleReferenceUrl("");
    setSelectedPresetId(null);
    setProcessingStep(null);
    setResult(null);
    setError(null);
  }, []);

  const discardAndRestart = useCallback(() => {
    runIdRef.current += 1;
    setAssetsState([]);
    setTargetDurationSec(DEFAULT_DURATION);
    setPrompt("");
    setStyleReferenceUrl("");
    setSelectedPresetId(null);
    setProcessingStep(null);
    setResult(null);
    setError(null);
    setStage("setup");
  }, []);

  const openExistingProject = useCallback((project: MockProject) => {
    runIdRef.current += 1;
    setResult(buildResultFromMockProject(project));
    setStage("results");
  }, []);

  const openSettings = useCallback(() => setStage("settings"), []);
  const closeSettings = useCallback(() => setStage("landing"), []);
  const proceedToResults = useCallback(() => setStage("results"), []);
  const openProjectsGrid = useCallback(() => setStage("projects"), []);
  const openStyleLibrary = useCallback(() => setStage("styleLibrary"), []);
  // Reached from Settings, so closing it returns there, not to landing.
  const openStyleTraining = useCallback(() => setStage("styleTraining"), []);
  const closeStyleTraining = useCallback(() => setStage("settings"), []);
  const backToLanding = useCallback(() => setStage("landing"), []);

  return {
    stage,
    assets,
    targetDurationSec,
    prompt,
    styleReferenceUrl,
    selectedPresetId,
    processingStep,
    result,
    error,
    startNewProject,
    setAssets,
    setTargetDurationSec,
    setPrompt,
    setStyleReferenceUrl,
    setSelectedPresetId,
    submitForProcessing,
    setResult,
    reset,
    discardAndRestart,
    openExistingProject,
    openSettings,
    closeSettings,
    proceedToResults,
    openProjectsGrid,
    openStyleLibrary,
    openStyleTraining,
    closeStyleTraining,
    backToLanding,
  };
}
