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

export const projects: Project[] = [
  {
    id: "surface",
    title: "Surface",
    subtitle: "Founder & Engineer",
    description:
      "Cross-exchange prediction market matching API. Normalize fragmented market schemas and map equivalent contracts across Kalshi and Polymarket.",
    year: "Winter/Spring 2026",
    category: "experience",
    role: "Founder",
    tech: ["Go", "SQLite", "DSPy"],
    links: {
      live: "https://surfaceapi.com",
    },
    images: ["/images/surface.png"],
  },
  {
    id: "siftedjobs",
    title: "Sifted Jobs",
    subtitle: "AI-Powered Job Search",
    description:
      "A better way to browse LinkedIn jobs. LLM-powered metadata extraction makes filtering actually useful, and embeddings power personalized recommendations from a single resume upload.",
    year: "2025",
    category: "project",
    role: "Project",
    tech: ["Python", "pgvector", "OpenAI embeddings"],
    links: {
      live: "https://siftedjobs.com",
    },
    images: ["/images/siftedjobs.png"],
  },
  {
    id: "prop-engine",
    title: "Prop Engine",
    subtitle: "MLB Player Props Prediction",
    description:
      "MLB player props prediction system built with 35+ dbt models, custom probability-distribution ML, and Monte Carlo backtesting for parlay evaluation.",
    year: "2024",
    category: "project",
    role: "Project",
    tech: ["Python", "dbt", "XGBoost"],
    links: {
      live: "https://propengine-production.up.railway.app/",
    },
    images: ["/images/prop_engine.png"],
  },
  {
    id: "platform-science",
    title: "Platform Science",
    subtitle: "Software Engineer Intern",
    description:
      "Backend testing for truck fleet telematics in Go. Wrote 29 PRs, increased coverage by 25%, and tested Protocol Buffer and goroutine-heavy production systems.",
    year: "Summer 2023",
    category: "experience",
    role: "Intern",
    tech: ["Go", "Protocol Buffers", "Unit Testing", "Goroutines/Channels"],
    links: {
      live: "https://www.platformscience.com/",
    },
    images: ["/images/plat_sci.png"],
  },
  {
    id: "berkeley",
    title: "UC Berkeley",
    subtitle: "Data Science",
    description:
      "Studied data engineering, machine learning, probability, blockchain, and poker at Berkeley. A lot of building, modeling, and learning how to think under uncertainty.",
    year: "Dec 2025",
    category: "education",
    role: "Data Science",
    tech: ["Python", "SQL", "Solidity"],
    images: ["/images/berkeley.jpg"],
  },
  {
    id: "spoti-cli",
    title: "Spoti-CLI",
    subtitle: "Terminal Spotify Client",
    description:
      "A keyboard-first Spotify client for the terminal with vim motions, lyrics, queue controls, and a custom TUI architecture behind it.",
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
  return projects.filter((project) => project.category === "project").sort(byYearDesc);
}
