import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  showYear?: boolean;
}

export function ProjectCard({ project, showYear = true }: ProjectCardProps) {
  const [mainTitle, type] = project.title.split(" | ");
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block group"
    >
      <article className="py-4 border-b border-border group-hover:border-foreground transition-colors duration-150">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-foreground group-hover:underline underline-offset-4 mb-1">
              {mainTitle}
            </h3>
            <p className="text-xs text-muted mb-2">
              {type} | {project.year}
            </p>
            <p className="text-sm text-muted line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>
        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="text-xs text-muted px-2 py-0.5 border border-border"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="text-xs text-muted">
                +{project.tech.length - 5}
              </span>
            )}
          </div>
        )}
      </article>
    </Link>
  );
}
