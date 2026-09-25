export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  category: "project" | "experience" | "education";
  role?: string;
  tech: string[];
  links?: {
    github?: string;
    live?: string;
  };
  stars?: number;
  images?: string[];
}

function parseYear(year: string): number {
  const match = year.match(/\d{4}/g);

  if (!match) return 0;

  return parseInt(match[match.length - 1], 10);
}

function byYearDesc(a: Project, b: Project): number {
  return parseYear(b.year) - parseYear(a.year);
}

const projectDisplayOrder = ["siftedjobs", "prop-engine", "spoti-cli"];

function byProjectDisplayOrder(a: Project, b: Project): number {
  const aOrder = projectDisplayOrder.indexOf(a.id);
  const bOrder = projectDisplayOrder.indexOf(b.id);

  if (aOrder === -1) return bOrder === -1 ? 0 : 1;
  if (bOrder === -1) return -1;

  return aOrder - bOrder;
}

export const projects: Project[] = [
  {
    id: "surface",
    title: "Surface API",
    subtitle: "Founding Engineer",
    description:
      "Surface API is a cross-exchange prediction-market API that normalizes equivalent Kalshi and Polymarket contracts into deterministic match clusters.",
    year: "Jan 2026 – May 2026",
    category: "experience",
    role: "Founding Engineer",
    tech: ["Python", "SQLite", "Pydantic AI", "OpenRouter"],
    links: {
      live: "https://surfaceapi.com",
    },
    images: ["/images/surface.png"],
  },
  {
    id: "siftedjobs",
    title: "Sifted Jobs",
    subtitle: "AI-Powered Job Board",
    description:
      "Sifted Jobs turns messy job postings into structured, searchable data so job seekers can find relevant roles faster.",
    year: "2025",
    category: "project",
    role: "Project",
    tech: ["Python", "PostgreSQL", "OpenRouter", "Structured outputs", "Vector embeddings"],
    links: {
      live: "https://siftedjobs.com",
    },
    images: ["/images/siftedjobs.png"],
  },
  {
    id: "prop-engine",
    title: "Prop Engine",
    subtitle: "Baseball Prediction Engine",
    description:
      "MLB Daily Predictions turns years of pitch-level data and matchup context into daily player projections.",
    year: "2024",
    category: "project",
    role: "Project",
    tech: ["Python", "dbt", "XGBoost"],
    links: {
      live: "https://mlbprop.com",
    },
    images: ["/images/prop_engine.png"],
  },
  {
    id: "platform-science",
    title: "Platform Science",
    subtitle: "Software Engineer Intern",
    description:
      "Authored Go test coverage for an embedded telemetry backend, exercising Protocol Buffer serialization and goroutine concurrency to reproduce timing-dependent race conditions under test.",
    year: "Jun 2023 – Aug 2023",
    category: "experience",
    role: "Software Engineer Intern",
    tech: ["Go", "Protocol Buffers", "Goroutines"],
  },
  {
    id: "berkeley",
    title: "UC Berkeley",
    subtitle: "Data Science",
    description:
      "Data engineering, ML, probability, blockchain, poker.",
    year: "Dec 2025",
    category: "education",
    role: "Data Science",
    tech: ["Python", "SQL", "Solidity"],
  },
  {
    id: "spoti-cli",
    title: "Spotify Terminal Client",
    subtitle: "Spotify Terminal App",
    description:
      "A keyboard-first Spotify client for browsing libraries, controlling playback, and navigating entirely from the terminal.",
    year: "2020",
    category: "project",
    role: "Project",
    tech: ["Python", "Spotify API"],
    links: {
      github: "https://github.com/joeysnclr/spoti-cli",
    },
    stars: 12,
    images: ["/images/spoti-cli.png"],
  },
];

export function getEducation(): Project[] {
  return projects.filter((project) => project.category === "education").sort(byYearDesc);
}

export function getExperience(): Project[] {
  return projects.filter((project) => project.category === "experience").sort(byYearDesc);
}

export function getProjects(): Project[] {
  return projects
    .filter((project) => project.category === "project")
    .sort(byProjectDisplayOrder);
}
