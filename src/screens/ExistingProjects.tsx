import { MOCK_PROJECTS } from "../data/mockProjects";
import type { MockProject } from "../data/mockProjects";
import { TopBar } from "../components/TopBar";
import { ProjectCard } from "../components/ProjectCard";
import "./ExistingProjects.css";

interface ExistingProjectsProps {
  onOpenProject: (project: MockProject) => void;
  onBack: () => void;
}

export function ExistingProjects({ onOpenProject, onBack }: ExistingProjectsProps) {
  return (
    <div className="pbj-projects">
      <TopBar onBack={onBack} />

      <div className="pbj-projects__body">
        <div className="pbj-projects__hero">
          <h1 className="pbj-projects__title">your projects</h1>
          <p className="pbj-projects__sub">pick up where you left off</p>
        </div>

        {MOCK_PROJECTS.length === 0 ? (
          <p className="pbj-projects__empty">no projects yet — start a new one from the home screen.</p>
        ) : (
          <div className="pbj-projects__grid">
            {MOCK_PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={onOpenProject} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
