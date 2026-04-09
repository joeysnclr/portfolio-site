import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getProjectBySlug, projects } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | ${project.subtitle} - Joey Sinclair`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Link
        href="/"
        className="text-sm text-muted hover:text-foreground transition-colors mb-12 inline-block"
      >
        &larr; back
      </Link>

      <header className="mb-8">
        <h1 className="text-lg mb-2">{project.title}</h1>
        <p className="text-sm text-muted mb-4">
          {project.subtitle} &middot; {project.year}
        </p>
        <p className="text-sm text-muted leading-relaxed">
          {project.description}
        </p>
      </header>

      {project.links && (project.links.live || project.links.github) && (
        <div className="flex items-center gap-6 mb-8">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:underline underline-offset-4"
            >
              site &rarr;
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:underline underline-offset-4"
            >
              code &rarr;
            </a>
          )}
        </div>
      )}

      {project.images && project.images[0] && (
        <div className="relative aspect-video mb-8 border border-border overflow-hidden">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {project.longDescription && (
        <div className="prose text-sm text-muted">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-foreground text-sm font-normal mb-2 mt-8 first:mt-0">
                  {children}
                </h2>
              ),
              p: ({ children }) => (
                <p className="mb-3 text-muted leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-0.5 list-disc pl-4 mb-3 text-muted">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-muted">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="text-foreground font-medium">
                  {children}
                </strong>
              ),
              code: ({ children }) => (
                <code className="bg-muted/20 px-1 rounded text-sm">
                  {children}
                </code>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2 hover:text-muted transition-colors"
                >
                  {children}
                </a>
              ),
            }}
          >
            {project.longDescription}
          </ReactMarkdown>
        </div>
      )}

      {project.features && project.features.length > 0 && (
        <section className="mt-8 mb-8">
          <h2 className="text-sm text-muted mb-3">Key Features</h2>
          <ul className="space-y-1">
            {project.features.map((feature, i) => (
              <li
                key={i}
                className="text-sm text-muted flex items-start gap-2"
              >
                <span className="text-foreground shrink-0">-</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.tech.length > 0 && (
        <section>
          <h2 className="text-sm text-muted mb-3">Tech</h2>
          <p className="text-sm text-muted">{project.tech.join(", ")}</p>
        </section>
      )}
    </div>
  );
}
