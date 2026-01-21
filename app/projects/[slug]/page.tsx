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
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="text-sm text-muted hover:text-foreground transition-colors mb-8 inline-block"
      >
        &larr; back
      </Link>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl">{project.title}</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted mb-4 flex-wrap">
              <span>{project.subtitle} | {project.year}</span>
            </div>
            <p className="text-muted leading-relaxed">{project.description}</p>
          </header>

          {project.links && (
            <div className="flex items-center gap-4 mb-8">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1 bg-blue-500/20 text-blue-600 border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                >
                  site
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1 bg-amber-500/20 text-amber-600 border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
                >
                  code
                </a>
              )}
            </div>
          )}

          {project.longDescription && (
            <div className="prose prose-sm text-muted">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-foreground text-base font-normal mb-2 mt-6 first:mt-0">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => <p className="mb-3 text-muted">{children}</p>,
                  ul: ({ children }) => (
                    <ul className="space-y-0.5 list-disc pl-4 mb-3 text-muted">{children}</ul>
                  ),
                  li: ({ children }) => <li className="text-muted">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="text-foreground font-medium">{children}</strong>
                  ),
                  code: ({ children }) => (
                    <code className="bg-muted/20 px-1 rounded text-sm">{children}</code>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-2 hover:text-muted transition-colors inline-flex items-center gap-1"
                    >
                      {children}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ),
                }}
              >
                {project.longDescription}
              </ReactMarkdown>
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm text-muted mb-3">Key Features</h2>
              <ul className="space-y-2">
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
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-sm px-3 py-1 border border-border">
                    {t}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="hidden md:block md:col-span-1">
          <div className="sticky top-8 space-y-4">
            {project.images &&
              project.images.map((image, i) => (
                <div
                  key={i}
                  className="aspect-video bg-muted/10 border border-border relative overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
