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
  const imageClassName = "aspect-[16/10]";

  if (!imageSrc) {
    return <div className={`${imageClassName} w-full border border-border bg-background`} />;
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
        className={`${imageClassName} h-auto w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.015]`}
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

  if (links.length === 0) return null;

  return (
    <div className="text-sm text-muted">
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
    </div>
  );
}

function TechLine({ project }: { project: Project }) {
  if (project.category === "education" || project.tech.length === 0) return null;

  return <div className="text-sm text-muted">{project.tech.join(" · ")}</div>;
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
  const isProject = project.category === "project";
  const imageElement = <ProjectImage project={project} onOpenImage={onOpenImage} />;
  const textElement = (
    <div className="space-y-2">
      <div className="space-y-1 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <div className="min-w-0">
            <span className="text-foreground">{project.title}</span>
            <span className="text-muted"> | {project.subtitle}</span>
          </div>
          {!isProject ? (
            <span className="shrink-0 text-right text-muted">{project.year}</span>
          ) : null}
        </div>
      </div>
      <p className="text-sm text-muted leading-relaxed">{project.description}</p>
      <LinkLine project={project} />
      <TechLine project={project} />
    </div>
  );

  return (
    <article
      className={`border-t border-border first:border-t-0 first:pt-0 ${
        isProject ? "space-y-4 pt-5" : "space-y-2 pt-4"
      }`}
    >
      {isProject ? (
        <div className="grid gap-5 sm:grid-cols-2 sm:items-start">
          {textElement}
          {imageElement}
        </div>
      ) : (
        textElement
      )}
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
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.title} className="space-y-4">
          <SectionLabel label={section.title} />
          <div className="space-y-5">
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
    {
      title: "Education & Experience",
      items: [...getEducation(), ...getExperience()],
    },
    { title: "Projects", items: getProjects() },
  ];

  return (
    <>
      <PageHeader />
      <div className="max-w-3xl mx-auto px-6 py-8 pb-16">
        <HomeOneLayout
          sections={sections}
          onOpenImage={(src, alt) => setActiveImage({ src, alt })}
        />
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
