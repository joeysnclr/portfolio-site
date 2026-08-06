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
    subtitle: "Prediction Market API",
    description:
      "I built Surface with the intention of connecting it to my baseball model, and started by matching equivalent markets across Kalshi and Polymarket.",
    year: "Winter/Spring 2026",
    category: "project",
    role: "Founder",
    tech: ["Go", "DSPy", "Agent design", "Tool calling", "Benchmarking"],
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
      "Reading job descriptions is tedious. Sifted Jobs pulls the useful information out of job postings so I can find roles that actually make sense.",
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
      "Baseball is the project I keep coming back to. Prop Engine turns years of pitch data, matchup context, and research into player prop predictions.",
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
    subtitle: "SWE Intern",
    description:
      "Backend testing in Go for truck fleet telematics, protobufs, and concurrency.",
    year: "Summer 2023",
    category: "experience",
    role: "Intern",
    tech: [],
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
    title: "Spoti-CLI",
    subtitle: "Spotify Terminal App",
    description:
      "I wanted to use Spotify without reaching for my mouse. Spoti CLI lets me browse my library, control playback, and navigate everything from the keyboard.",
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
