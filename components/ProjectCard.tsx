import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  showYear?: boolean;
}

export function ProjectCard({ project, showYear = true }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block group"
    >
      <article className="py-4 border-b border-border group-hover:border-foreground transition-colors duration-150">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-foreground group-hover:underline underline-offset-4">
                {project.title}
              </h3>
              {project.status === "active" && (
                <span className="text-xs px-2 py-0.5 bg-foreground text-background">
                  active
                </span>
              )}
              {project.isPublic && (
                <span className="text-xs text-muted">public</span>
              )}
            </div>
            <p className="text-sm text-muted line-clamp-2">
              {project.description}
            </p>
          </div>
          {showYear && (
            <span className="text-sm text-muted shrink-0">{project.year}</span>
          )}
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
