import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { FeaturedGrid } from "@/components/FeaturedGrid";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="mb-16">
          <h1 className="text-2xl mb-4">Joey Sinclair <span className="text-muted text-lg font-normal">Berkeley Data Science '25</span></h1>
        <p className="text-muted max-w-xl leading-relaxed mb-6">
          Software engineer and data scientist. Finding signals. Building tools.
        </p>
        <p className="text-muted max-w-xl leading-relaxed mb-8">
          Currently building{" "}
            <Link
              href="/projects/surface"
              className="text-foreground hover:underline underline-offset-4"
            >
              surface.surf
            </Link>
            , a cross-exchange prediction market aggregator.
          </p>
          <div className="flex items-center gap-6">
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

      {/* Featured Projects - 2x2 Grid */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg">Projects</h2>
        </div>
        <FeaturedGrid projects={featured} />
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg">Timeline</h2>
        </div>
        <Timeline />
      </section>

      {/* Background */}
      <section className="mb-16">
        <h2 className="text-lg mb-6">Background</h2>
        <div className="space-y-4 text-muted text-sm leading-relaxed">
          <p>
            Currently building{" "}
            <Link
              href="/projects/surface"
              className="text-foreground hover:underline underline-offset-4"
            >
              surface.surf
            </Link>
            , a cross-exchange prediction market aggregator. The space is fragmented and inefficient—I'm fixing that.
          </p>
          <p>
            My approach: find edges in inefficient systems, then build end-to-end tools that capture them.
          </p>
          <p>
            Started at 16 with Supreme bots—learned reverse engineering and browser automation. Moved to Solana NFTs in 2021, built DAO tools, moved on before the market cooled. Spent 2023-2025 on MLB player props modeling: ridge regression, rolling stats, Monte Carlo backtesting. Full prediction system, end-to-end.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-lg mb-6">Technical</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="text-foreground mb-2">Languages</h3>
            <p className="text-muted">
              Python (ML/ETL), Go (systems/APIs), TypeScript (frontend), SQL
            </p>
          </div>
          <div>
            <h3 className="text-foreground mb-2">Data / ML</h3>
            <p className="text-muted">
              pandas, scikit-learn, XGBoost, dbt, PostgreSQL, pgvector
            </p>
          </div>
          <div>
            <h3 className="text-foreground mb-2">Backend</h3>
            <p className="text-muted">
              FastAPI, Go chi, SQLite/Turso, Redis for caching
            </p>
          </div>
          <div>
            <h3 className="text-foreground mb-2">Frontend</h3>
            <p className="text-muted">
              React, Next.js, Tailwind, Streamlit, Bubbletea TUI
            </p>
          </div>
          <div>
            <h3 className="text-foreground mb-2">Infra</h3>
            <p className="text-muted">
              Docker, Vercel, Railway, GitHub Actions CI/CD
            </p>
          </div>
          <div>
            <h3 className="text-foreground mb-2">Interests</h3>
            <p className="text-muted">
              Prediction markets, sports analytics, reverse engineering, TUIs
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
