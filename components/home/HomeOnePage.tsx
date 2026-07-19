"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { getEducation, getExperience, getProjects, Project } from "@/lib/projects";

const ImageModal = dynamic(() => import("@/components/ImageModal"), {
  ssr: false,
});

type ActiveImage = {
  src: string;
  alt: string;
} | null;

function formatLinkLabel(url: string): string {
  const hostname = new URL(url).hostname.replace(/^www\./, "");

  if (hostname.length <= 20) {
    return hostname;
  }

  return `${hostname.slice(0, 20)}...`;
}

function getPrimaryImage(project: Project): string | null {
  return project.images?.[0] ?? null;
}

function PageHeader() {
  return (
    <header>
      <div className="max-w-3xl mx-auto px-6 pt-12 sm:pt-16 flex items-center justify-between">
        <span className="text-sm text-muted">JS</span>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <a
            href="https://github.com/joeysnclr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/joseph--sinclair/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  );
}

function ProjectImage({
  project,
  onOpenImage,
}: {
  project: Project;
  onOpenImage: (imageSrc: string, imageAlt: string) => void;
}) {
  const imageSrc = getPrimaryImage(project);

  if (!imageSrc) {
    return <div className="aspect-[16/10] w-full border border-border bg-background" />;
  }

  return (
    <button
      type="button"
      onClick={() => onOpenImage(imageSrc, project.title)}
      className="group block w-full overflow-hidden border border-border bg-background text-left cursor-pointer"
      aria-label={`Open image for ${project.title}`}
    >
      <Image
        src={imageSrc}
        alt={project.title}
        width={1200}
        height={780}
        sizes="(min-width: 768px) 24rem, calc(100vw - 3rem)"
        className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
      />
    </button>
  );
}

function LinkLine({ project }: { project: Project }) {
  const links = [] as Array<{ href: string; label: string; title?: string }>;

  if (project.links?.live) {
    links.push({
      href: project.links.live,
      label: `${formatLinkLabel(project.links.live)} ↗`,
      title: new URL(project.links.live).hostname.replace(/^www\./, ""),
    });
  }

  if (project.links?.github) {
    links.push({
      href: project.links.github,
      label: "github ↗",
    });
  }

  return (
    <div className="min-h-5 text-sm text-muted">
      {links.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline underline-offset-4"
              title={link.title}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function TechLine({ project }: { project: Project }) {
  if (project.category === "education") {
    return <div className="min-h-5 text-sm text-muted" />;
  }

  return (
    <div className="min-h-5 text-sm text-muted">
      {project.tech.length > 0 ? project.tech.join(" · ") : null}
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return <h2 className="text-base font-semibold text-foreground">{label}</h2>;
}

function ProjectEntry({
  project,
  onOpenImage,
}: {
  project: Project;
  onOpenImage: (imageSrc: string, imageAlt: string) => void;
}) {
  return (
    <article className="space-y-4 border-t border-border pt-5 first:border-t-0 first:pt-0">
      <div className="flex items-start justify-between gap-4 text-sm">
        <div className="min-w-0">
          <span className="text-foreground">{project.title}</span>
          <span className="text-muted"> | {project.subtitle}</span>
        </div>
        {project.category !== "project" && (
          <span className="shrink-0 text-muted">{project.year}</span>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:items-start">
        <ProjectImage project={project} onOpenImage={onOpenImage} />

        <div className="space-y-2">
          <p className="text-sm text-muted leading-relaxed">{project.description}</p>
          <LinkLine project={project} />
          <TechLine project={project} />
        </div>
      </div>
    </article>
  );
}

function HomeOneLayout({
  sections,
  onOpenImage,
}: {
  sections: Array<{ title: string; items: Project[] }>;
  onOpenImage: (imageSrc: string, imageAlt: string) => void;
}) {
  return (
    <div className="space-y-16">
      {sections.map((section) => (
        <section key={section.title} className="space-y-6">
          <SectionLabel label={section.title} />
          <div className="space-y-8">
            {section.items.map((project) => (
              <ProjectEntry
                key={project.id}
                project={project}
                onOpenImage={onOpenImage}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function HomeOnePage() {
  const [activeImage, setActiveImage] = useState<ActiveImage>(null);
  const sections = [
    { title: "Education", items: getEducation() },
    { title: "Experience", items: getExperience() },
    { title: "Projects", items: getProjects() },
  ];

  return (
    <>
      <PageHeader />
      <div className="max-w-3xl mx-auto px-6 py-8 pb-16">
        <HomeOneLayout sections={sections} onOpenImage={setActiveImage} />
      </div>

      <ImageModal
        isOpen={activeImage !== null}
        imageSrc={activeImage?.src ?? null}
        imageAlt={activeImage?.alt ?? "Project image"}
        onClose={() => setActiveImage(null)}
      />
    </>
  );
}
