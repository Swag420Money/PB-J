import type { MockProject } from "../data/mockProjects";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: MockProject;
  onClick?: (project: MockProject) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <button type="button" className="pbj-project-card" onClick={() => onClick?.(project)}>
      <div className="pbj-project-card__thumb" style={{ background: project.thumbGradient }}>
        <span className="pbj-project-card__duration">{project.durationLabel}</span>
      </div>
      <div className="pbj-project-card__meta">
        <span className="pbj-project-card__name">{project.name}</span>
        <span className="pbj-project-card__date">{project.dateLabel}</span>
      </div>
    </button>
  );
}
