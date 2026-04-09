"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { getEducation, getExperience, getAllWork, Project } from "@/lib/projects";
import { Header } from "@/components/Header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ImageModal = dynamic(() => import("@/components/ImageModal"), {
  ssr: false,
});

function formatLinkLabel(url: string): string {
  const hostname = new URL(url).hostname.replace(/^www\./, "");

  if (hostname.length <= 20) {
    return hostname;
  }

  return `${hostname.slice(0, 20)}...`;
}

function AccordionItem({
  project,
  open,
  onToggle,
  onOpenImage,
  isLast = false,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
  onOpenImage: (imageSrc: string, imageAlt: string) => void;
  isLast?: boolean;
}) {
  const scale = project.scale;
  const stars = project.stars;
  const showScale =
    scale && (project.category === "project" || project.category === "endeavor");

  const hasLinks =
    project.links &&
    (project.links.live || project.links.github);

  const hasImage = project.images && project.images.length > 0;
  return (
    <div className={open && !isLast ? "pb-4 border-b border-border" : undefined}>
      <button
        onClick={onToggle}
        className="w-full flex items-baseline justify-between gap-8 group text-left cursor-pointer"
      >
        <span className="flex items-baseline gap-3 min-w-0 flex-1">
          <span className="text-sm text-foreground group-hover:underline underline-offset-4 shrink-0">
            {project.title}
          </span>
          {project.role && (
            <span className="text-sm text-muted flex items-baseline gap-2">
              {project.role}
              {project.current && (
                <span className="text-xs px-1.5 py-0.5 bg-blue-500/15 text-blue-400 leading-none">
                  current
                </span>
              )}
            </span>
          )}
        </span>
        <span className="flex items-center justify-end gap-3 shrink-0">
          {stars && (
            <span
              className="hidden sm:flex items-center gap-1 text-sm text-muted shrink-0"
              aria-label={`${stars} GitHub stars`}
              title={`${stars} GitHub stars`}
            >
              <svg
                className="text-[#c9a227]/80"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 1L7.54508 4.13028L11 4.63397L8.5 7.0718L9.09017 10.516L6 8.8918L2.90983 10.516L3.5 7.0718L1 4.63397L4.45492 4.13028L6 1Z"
                  fill="currentColor"
                />
              </svg>
              <span>{stars}</span>
            </span>
          )}
          {showScale && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className="hidden sm:flex items-center gap-1 shrink-0"
                  aria-label={`Scope: ${scale}/5`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={`h-3 w-2 ${index < scale ? "bg-foreground" : "bg-border"}`}
                    />
                  ))}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <span>Scope: {scale}/5</span>
              </TooltipContent>
            </Tooltip>
          )}
          <span className="text-sm text-muted shrink-0">{project.year}</span>
        </span>
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          <p className="text-sm text-muted leading-relaxed">
            {project.description}
          </p>
          {hasLinks && (
            <div className="flex items-center justify-between gap-4 min-w-0">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:underline underline-offset-4 truncate"
                    title={new URL(project.links.live).hostname.replace(/^www\./, "")}
                  >
                    {formatLinkLabel(project.links.live)} ↗
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:underline underline-offset-4 whitespace-nowrap"
                    >
                      github ↗
                    </a>
                )}
                {hasImage && (
                  <span className="relative group/img">
                    <button
                      type="button"
                      onClick={() => onOpenImage(project.images![0], project.title)}
                      className="text-muted hover:text-foreground transition-colors cursor-pointer"
                      aria-label={`Open image for ${project.title}`}
                    >
                       <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
                         <rect x="1" y="1" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                         <circle cx="4.5" cy="4.5" r="1" fill="currentColor"/>
                         <path d="M1 9.5L4 6.5L6.5 9L9 7L13 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                       </svg>
                    </button>
                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover/img:block z-10 pointer-events-none w-72">
                      <Image
                        src={project.images![0]}
                        alt={project.title}
                        width={288}
                        height={162}
                        className="w-72 max-w-none border border-border object-cover block"
                      />
                    </div>
                  </span>
                )}
              </div>
              {project.tech && project.tech.length > 0 && (
                <span className="text-sm text-muted whitespace-nowrap shrink-0">
                  {project.tech.slice(0, 3).join(" · ")}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [activeImage, setActiveImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const education = getEducation();
  const experience = getExperience();
  const work = getAllWork();
  const allItems = useMemo(
    () => [...education, ...experience, ...work].map((project) => project.slug),
    [education, experience, work]
  );
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const allExpanded = allItems.length > 0 && allItems.every((slug) => openItems.has(slug));

  function toggleItem(slug: string) {
    setOpenItems((current) => {
      const next = new Set(current);

      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }

      return next;
    });
  }

  function toggleAll() {
    setOpenItems(allExpanded ? new Set() : new Set(allItems));
  }

  return (
    <TooltipProvider>
      <Header allExpanded={allExpanded} onToggleAll={toggleAll} />
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Social Links */}
        <nav className="flex items-center gap-6 mb-16">
          <a
            href="https://github.com/joeysnclr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://x.com/jitcommit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            X
          </a>
          </nav>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-sm mb-6">Education</h2>
          <div className="space-y-3">
            {education.map((p, index) => (
              <AccordionItem
                key={p.slug}
                project={p}
                open={openItems.has(p.slug)}
                onToggle={() => toggleItem(p.slug)}
                onOpenImage={(src, alt) => setActiveImage({ src, alt })}
                isLast={index === education.length - 1}
              />
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-sm mb-6">Experience</h2>
          <div className="space-y-3">
            {experience.map((p, index) => (
              <AccordionItem
                key={p.slug}
                project={p}
                open={openItems.has(p.slug)}
                onToggle={() => toggleItem(p.slug)}
                onOpenImage={(src, alt) => setActiveImage({ src, alt })}
                isLast={index === experience.length - 1}
              />
            ))}
          </div>
        </section>

        {/* Endeavors */}
        <section>
          <h2 className="text-sm mb-6">Endeavors</h2>
          <div className="space-y-3">
            {work.map((p, index) => (
              <AccordionItem
                key={p.slug}
                project={p}
                open={openItems.has(p.slug)}
                onToggle={() => toggleItem(p.slug)}
                onOpenImage={(src, alt) => setActiveImage({ src, alt })}
                isLast={index === work.length - 1}
              />
            ))}
          </div>
        </section>
      </div>

      <ImageModal
        isOpen={activeImage !== null}
        imageSrc={activeImage?.src ?? null}
        imageAlt={activeImage?.alt ?? "Project image"}
        onClose={() => setActiveImage(null)}
      />
    </TooltipProvider>
  );
}
