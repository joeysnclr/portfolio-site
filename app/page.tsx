import Link from "next/link";
import {
  getSpotlightProjects,
  getExperienceAndEducation,
  getProjectsAndEndeavors,
} from "@/lib/projects";
import { TimelineSection } from "@/components/TimelineSection";

export default function Home() {
  const spotlight = getSpotlightProjects();
  const experienceAndEducation = getExperienceAndEducation();
  const projectsAndEndeavors = getProjectsAndEndeavors();

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
      {/* Hero */}
      <section className="mb-12 sm:mb-16">
        <p className="text-muted max-w-xl leading-relaxed mb-6 text-sm sm:text-base">
          Software engineer and data scientist. Finding signals. Building tools.
        </p>
        <p className="text-muted max-w-xl leading-relaxed mb-8 text-sm sm:text-base">
          Currently building{" "}
          <Link
            href="/projects/surface"
            className="text-foreground hover:underline underline-offset-4"
          >
            surface.surf
          </Link>
          , a cross-exchange prediction market aggregator.
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href="https://github.com/joeysnclr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
          >
            github
          </a>
          <a
            href="https://x.com/jitcommit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
          >
            x/twitter
          </a>
        </div>
      </section>

      {/* Spotlight */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-base sm:text-lg mb-5 sm:mb-6">Spotlight</h2>
        <TimelineSection projects={spotlight} />
      </section>

      {/* Education & Experience */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-base sm:text-lg mb-5 sm:mb-6">Education & Experience</h2>
        <TimelineSection projects={experienceAndEducation} />
      </section>

      {/* Projects & Endeavors */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-base sm:text-lg mb-5 sm:mb-6">Projects & Endeavors</h2>
        <TimelineSection projects={projectsAndEndeavors} />
      </section>


    </div>
  );
}
