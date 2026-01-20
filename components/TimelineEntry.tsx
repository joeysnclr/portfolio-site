"use client";

import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

interface TimelineEntryProps {
  project: Project;
  showLine?: boolean;
}

export function TimelineEntry({ project, showLine = true }: TimelineEntryProps) {
  const [mainTitle, type] = project.title.split(" | ");
  return (
    <div className="relative pb-8 last:pb-0">
      <div className="flex gap-6">
        <div className="flex-shrink-0 w-1/4">
          <Link href={`/projects/${project.slug}`} className="block group">
            <div className="aspect-video bg-muted/10 border border-border relative overflow-hidden">
              {project.images && project.images[0] ? (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted text-xs text-center px-2">
                  {project.title}
                </div>
              )}
            </div>
          </Link>
        </div>

        <div className="relative flex flex-col items-center flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-foreground z-10" />
          {showLine && (
            <div className="absolute top-3 bottom-0 w-px bg-border -z-0" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <Link href={`/projects/${project.slug}`} className="block group">
            <h3 className="text-foreground group-hover:underline underline-offset-4 mb-1">
              {mainTitle}
            </h3>
            <p className="text-xs text-muted mb-3">
              {type} | {project.year}
            </p>
            <p className="text-sm text-muted line-clamp-2 mb-3">
              {project.description}
            </p>
          </Link>

          <div className="flex flex-wrap gap-2 items-center">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-600 border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                  >
                    site
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-600 border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
                  >
                    code
                  </a>
                )}

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
        </div>
      </div>
    </div>
  );
}
