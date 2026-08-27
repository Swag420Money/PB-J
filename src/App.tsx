import type { ReactElement } from "react";
import type { ProjectFlow } from "./state/useProjectFlow";
import { useProjectFlow } from "./state/useProjectFlow";
import { Landing } from "./screens/Landing";
import { Setup } from "./screens/Setup";
import { Processing } from "./screens/Processing";
import { Ready } from "./screens/Ready";
import { Results } from "./screens/Results";
import { Settings } from "./screens/Settings";
import { ExistingProjects } from "./screens/ExistingProjects";
import { StyleLibrary } from "./screens/StyleLibrary";
import { StyleTraining } from "./screens/StyleTraining";

function App() {
  const flow = useProjectFlow();

  const landing = (
    <Landing
      onNewProject={flow.startNewProject}
      onOpenProjects={flow.openProjectsGrid}
      onOpenSettings={flow.openSettings}
      onOpenStyleLibrary={flow.openStyleLibrary}
    />
  );

  return renderScreen(flow, landing);
}

function renderScreen(flow: ProjectFlow, landing: ReactElement) {
  switch (flow.stage) {
    case "setup":
      return (
        <Setup
          assets={flow.assets}
          targetDurationSec={flow.targetDurationSec}
          prompt={flow.prompt}
          styleReferenceUrl={flow.styleReferenceUrl}
          onAssetsChange={flow.setAssets}
          onDurationChange={flow.setTargetDurationSec}
          onPromptChange={flow.setPrompt}
          onStyleReferenceUrlChange={flow.setStyleReferenceUrl}
          onSubmit={flow.submitForProcessing}
          onExitToLanding={flow.reset}
        />
      );

    case "processing":
      return <Processing step={flow.processingStep} />;

    case "ready":
      return flow.result ? (
        <Ready result={flow.result} onContinue={flow.proceedToResults} />
      ) : (
        landing
      );

    case "results":
      return flow.result ? (
        <Results
          result={flow.result}
          onResultChange={flow.setResult}
          onStartOver={flow.reset}
          onDiscardAndRestart={flow.discardAndRestart}
        />
      ) : (
        landing
      );

    case "projects":
      return (
        <ExistingProjects onOpenProject={flow.openExistingProject} onBack={flow.backToLanding} />
      );

    case "styleLibrary":
      return <StyleLibrary onBack={flow.backToLanding} />;

    case "settings":
      return (
        <Settings
          onBack={flow.closeSettings}
          onSignOut={flow.closeSettings}
          onOpenStyleTraining={flow.openStyleTraining}
        />
      );

    case "styleTraining":
      return <StyleTraining onBack={flow.closeStyleTraining} />;

    case "landing":
    default:
      return landing;
  }
}

export default App;
