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
        <h1 className="text-2xl mb-4">Joey Sinclair</h1>
        <p className="text-muted max-w-xl leading-relaxed mb-6">
          Software engineer and data scientist with a focus on finding edges in
          inefficient systems.
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
            Started programming at 16 building Supreme bots. They mostly didn't
            work, but I learned reverse engineering, browser automation, and how
            to find edges in systems. Did $16k volume on StockX.
          </p>
          <p>
            During COVID, shipped{" "}
            <Link
              href="/projects/spoti-cli"
              className="text-foreground hover:underline underline-offset-4"
            >
              spoti-cli
            </Link>
            , a terminal Spotify client with vim bindings.
          </p>
          <p>
            Got into Solana NFTs in 2021, built DAO tools, and exited before the
            crash.
          </p>
          <p>
            Spent 2023-2025 deep in baseball modeling. Built a full prediction
            system for MLB player props with ridge regression, rolling stats,
            and Monte Carlo backtesting. Never placed actual bets, but the
            system works end-to-end.
          </p>
          <p>
            Graduated from Berkeley with a Data Science degree in December 2025.
            The poker course unexpectedly connected to prediction market work.
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
