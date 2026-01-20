import { projects } from "@/lib/projects";
import { TimelineEntry } from "./TimelineEntry";

const TIMELINE_ORDER = [
  "surface",
  "berkeley",
  "platform-science",
  "oracle-engine",
  "latentjobs",
  "mlb-prediction-system",
  "mlbdatatools",
  "solana-nft-tooling",
  "spoti-cli",
  "reseller-tools",
];

export function Timeline() {
  const orderedProjects = TIMELINE_ORDER.map((slug) =>
    projects.find((p) => p.slug === slug)
  ).filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="space-y-0">
      {orderedProjects.map((project, index) => (
        <TimelineEntry
          key={project.slug}
          project={project}
          showLine={index < orderedProjects.length - 1}
        />
      ))}
    </div>
  );
}
