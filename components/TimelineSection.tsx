import type { Project } from "@/lib/projects";
import { TimelineEntry } from "./TimelineEntry";

interface TimelineSectionProps {
  projects: Project[];
}

export function TimelineSection({ projects }: TimelineSectionProps) {
  return (
    <div className="space-y-0">
      {projects.map((project, index) => (
        <TimelineEntry
          key={project.slug}
          project={project}
          showLine={index < projects.length - 1}
        />
      ))}
    </div>
  );
}
