import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

interface FeaturedGridProps {
  projects: Project[];
}

export function FeaturedGrid({ projects }: FeaturedGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="block group"
        >
          <article className="border border-border group-hover:border-foreground group-hover:shadow-md transition-all duration-150 h-full">
            <div className="aspect-video bg-muted/10 border-b border-border relative overflow-hidden">
              {project.images && project.images[0] ? (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
                  {project.title}
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-foreground group-hover:underline underline-offset-4">
                  {project.title}
                </h3>
                <span className="text-sm text-muted">{project.year}</span>
              </div>

              <p className="text-sm text-muted line-clamp-2 mb-3">
                {project.description}
              </p>

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
                {project.links?.github && !project.links?.live && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-600 border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
                  >
                    code
                  </a>
                )}

                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-xs text-muted px-2 py-0.5 border border-border"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-xs text-muted">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
