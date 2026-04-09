export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  year: string;
  category: "project" | "endeavor" | "experience" | "education";
  role?: string;
  tech: string[];
  features?: string[];
  links?: {
    github?: string;
    live?: string;
  };
  isPublic: boolean;
  spotlight?: boolean;
  status?: "shipped" | "active" | "archived" | "unreleased";
  scale?: 1 | 2 | 3 | 4 | 5;
  stars?: number;
  images?: string[];
  current?: boolean;
  hidden?: boolean;
}

// Sorting utilities
function parseYear(year: string): number {
  // Handle "2023-2025" → use end year (2025)
  // Handle "Dec 2025", "Summer 2023" → extract 4-digit year
  // Handle "2025" → use as-is
  const match = year.match(/\d{4}/g);
  if (!match) return 0;
  return parseInt(match[match.length - 1], 10);
}

function byYearDesc(a: Project, b: Project): number {
  return parseYear(b.year) - parseYear(a.year);
}

export const projects: Project[] = [
  {
    slug: "surface",
    title: "Surface",
    subtitle: "Matching API",
    description:
      "Cross-exchange prediction market matching API. Normalize fragmented market schemas and map equivalent contracts across Kalshi and Polymarket.",
    longDescription: `## The Problem
Prediction markets are fragmented. The same event trades on multiple exchanges, but each platform uses its own market structure, naming, and contract schema. Building on top of multiple venues means constantly translating between incompatible representations of the same underlying event.

That fragmentation makes even basic cross-exchange workflows painful. Before you can compare prices, run analytics, or build trading tools, you first need reliable contract-level matching.

## What I Built
A matching API that identifies equivalent markets across exchanges and exposes them through a normalized interface. When two platforms list the same event with different naming, sides, or schema conventions, Surface maps them back to the same underlying contract.

The core job is schema normalization and contract equivalence. Kalshi and Polymarket represent markets differently, so the system has to reconcile market metadata, outcomes, and naming conventions without leaking exchange-specific quirks into downstream consumers.

## What It Offers
- **Cross-exchange contract matching**: Identify equivalent markets across platforms
- **Normalized market schema**: Consume one API instead of exchange-specific payloads
- **Foundation for downstream tooling**: Power analytics, pricing, and trading systems on top of matched markets
- **Cleaner integrations**: Add new exchanges without rewriting consumer logic around each schema

## The Vision
Surface is infrastructure first. The goal is to make cross-exchange prediction market data composable: one contract model, one matching layer, and a clean foundation for anything built on top.

This is the hard part most products skip past. If the matching layer is unreliable, everything downstream breaks. Surface exists to solve that problem well.`,
    year: "2026",
    category: "project",
    role: "Founder",
    tech: ["Go", "SQLite", "DSPy"],
    features: [
      "Cross-exchange market matching",
      "Real-time price comparison across platforms",
      "Arbitrage opportunity detection",
      "Exchange price analysis (leading/lagging)",
      "Unified view of equivalent markets",
    ],
    links: {
      live: "https://surface.surf",
    },
    isPublic: false,
    spotlight: true,
    status: "active",
    scale: 5,
    current: true,
    images: ["/images/surface.png"],
  },
  {
    slug: "pmfees",
    title: "PM Fees",
    subtitle: "Prediction Market Fee Comparison",
    description:
      "Prediction market fee intelligence for traders. Compare fee curves, exchange rules, waivers, and scheduled pricing changes in one place.",
    year: "2026",
    category: "project",
    role: "Project",
    tech: ["Go", "React"],
    links: {
      live: "https://pmfees.com",
    },
    isPublic: false,
    status: "active",
    scale: 3,
    images: ["/images/pmfees.png"],
  },
  {
    slug: "oracle-engine",
    title: "Oracle Engine",
    subtitle: "Multi-Exchange Strategy Engine",
    description:
      "A multi-exchange live-trading and backtesting engine for prediction markets built around a shared execution model. Write a strategy once, then run it against historical order books or live markets.",
    longDescription: `## The Problem
Backtesting prediction market strategies requires realistic simulation of order execution, timing, and market impact. Most backtesting frameworks make assumptions that work for traditional markets but fail for prediction markets' unique characteristics: low liquidity, long settlement times, and binary outcomes.

## Technical Approach
The system depends on Dome API for historical L2 order book snapshots on both Kalshi and Polymarket. Neither exchange exposes historical book data through their APIs - Dome provides this infrastructure.

I designed a clock abstraction that enables identical strategy code to run live or in backtest mode. The clock interface handles time progression, price updates, and order lifecycle uniformly regardless of execution context.

The system separates concerns cleanly:
- Exchange adapters normalize API responses from Kalshi, Polymarket, and future markets
- Dome client handles snapshot ingestion with rate limiting and pagination
- Strategy logic remains completely decoupled from execution mode

## Interesting Challenges
The core challenge was designing a system where live and backtest share the same code path. The clock abstraction lets strategies subscribe to price updates and submit orders without knowing whether they're running against historical data or live markets. Flipping between modes is a config change, not a code change.

Getting the abstractions right took iteration. The exchange interface, the clock, the order lifecycle - each needed to be general enough to handle both contexts without leaking implementation details into strategy code.

## What I'd Do Differently
The current architecture is synchronous. An event-driven approach with a message queue would better handle high-frequency updates from multiple exchanges simultaneously.`,
    year: "2025",
    category: "project",
    role: "Project",
    tech: ["Go", "Dome API"],
    features: [
      "Clock abstraction for live/backtest mode switching",
      "Execution delay simulation for realistic backtests",
      "Synthetic candle generation for illiquid markets",
      "YAML configured strategy parameters",
      "React dashboard with TradingView charts",
      "Performance metrics (Sharpe, max drawdown, win rate)",
    ],
    links: {
      github: "https://github.com/joeysnclr/oracle-engine",
    },
    isPublic: true,
    status: "active",
    scale: 4,
    images: ["/images/oracle-engine.png"],
  },
  {
    slug: "siftedjobs",
    title: "Sifted Jobs",
    subtitle: "AI-Powered Job Search",
    description:
      "A better way to browse LinkedIn jobs. LLM-powered metadata extraction makes filtering actually useful, and embeddings power personalized recommendations from a single resume upload.",
    longDescription: `## The Problem
LinkedIn's job search is keyword-based and doesn't account for how well a role matches your actual background. A resume highlighting "Python, ML, analytics" might match "Java backend developer" on keyword overlap despite being a poor fit. Candidates need semantic matching, not just string matching.

## Technical Approach
The pipeline scrapes LinkedIn via a reverse-engineered API, then uses GPT-4o-mini via DSPy to extract structured metadata from each job: summarized descriptions, technologies used, workplace type, seniority level, salary ranges, and YOE requirements.

Jobs are embedded using OpenAI's text-embedding-3-small (768 dimensions) and stored in PostgreSQL with pgvector. When users upload their resume, it's embedded and matched using cosine similarity. The frontend shows match percentages and allows sorting by relevance.

## Interesting Challenges
LinkedIn aggressively rate-limits automated requests. The data pipeline runs in constrained bursts with exponential backoff. The site still works with preloaded job data from peak crawling periods.

Extracting consistent metadata from varied job descriptions required prompt engineering. DSPy's structured outputs helped, but edge cases still produce inconsistent results.

## What I'd Do Differently
The resume embedding approach treats the entire document as one vector. Chunking the resume (skills section, experience section, projects) and matching against corresponding job sections could improve relevance.`,
    year: "2025",
    category: "project",
    role: "Project",
    tech: ["Python", "pgvector", "OpenAI embeddings"],
    features: [
      "Vector similarity resume-to-job matching",
      "AI-powered job metadata extraction (GPT-4o-mini)",
      "LinkedIn API integration",
      "Advanced filtering by workplace, region, experience level",
      "Analytics dashboards for market insights",
    ],
    links: {
      live: "https://siftedjobs.com",
    },
    isPublic: false,
    status: "shipped",
    scale: 3,
    images: ["/images/siftedjobs.png"],
  },
  {
    slug: "mlb-prediction-system",
    title: "Prop Engine",
    subtitle: "MLB Player Props Prediction",
    description:
      "MLB player props prediction system built with 35+ dbt models, custom probability-distribution ML, and Monte Carlo backtesting for parlay evaluation.",
    longDescription: `## The Problem
MLB player props (hits, strikeouts, runs, etc.) are binary over/under markets. Traditional point estimation models output a single predicted value, but the actual betting decision depends on the full probability distribution. A predicted 7.5 strikeouts with 90% confidence is very different from a predicted 7.5 with 55% confidence.

## Technical Approach
I built two custom models that output probability distributions:
- XGDiscrete: XGBoost with softmax activation for discrete outcome probabilities
- RidgeKNN: Ridge regression for feature weighting combined with KNN neighbor voting for distribution estimation

Feature engineering via dbt includes:
- Rolling statistics (xwOBA, hard hit rate, K rate) with handedness and pitch type splits
- Park factors scraped from Baseball Savant
- Defensive metrics, handedness adjustments, wind, and temperature

The backtesting framework uses Monte Carlo simulation to evaluate parlay strategies across different payout structures (PrizePicks flex, Underdog power). Kelly criterion integration for bankroll sizing.

## Interesting Challenges
Player props markets are efficient. The edge from statistical models is small, requiring disciplined bankroll management. The Monte Carlo simulation was essential for understanding variance in multi-leg parlays.

Player injuries and lineup changes introduce noise that rolling statistics can't fully capture.

## What I'd Do Differently
The system treats each prop independently. A full game simulator would capture the correlation structure between props and players - when one batter gets on base, it affects the next batter's RBI opportunities. That correlation is where parlay edge lives.`,
    year: "2024",
    category: "project",
    role: "Project",
    tech: ["Python", "dbt", "XGBoost"],
    features: [
      "Custom ML models with probability distributions",
      "35+ dbt SQL models for feature engineering",
      "Monte Carlo simulation for parlay backtesting",
      "Rolling statistics with configurable lookback windows",
      "Batter vs pitcher matchup modeling",
      "Streamlit dashboard for daily props",
    ],
    links: {
      live: "https://propengine-production.up.railway.app/",
    },
    isPublic: false,
    status: "archived",
    scale: 5,
    images: ["/images/prop_engine.png"],
  },

  {
    slug: "platform-science",
    title: "Platform Science",
    subtitle: "Software Engineer Intern",
    description:
      "Backend testing for truck fleet telematics in Go. Wrote 29 PRs, increased coverage by 25%, and tested Protocol Buffer and goroutine-heavy production systems.",
    longDescription: `## The Role
Software engineering intern at Platform Science, a truck fleet telematics company. Focused on test coverage for the Go backend.

## What I Did
- Wrote 29 PRs covering Protocol Buffer implementations and struct declarations
- Increased repository test coverage by 25%
- Built integration tests for goroutine/channel patterns in production business logic

## What I Learned
Testing concurrent code taught me goroutines and channels better than any tutorial. Race conditions only surface under specific timing, so writing tests that reliably trigger edge cases forced deep understanding.

ProtoBuf serialization has subtle edge cases (nil vs empty slices, default values, nested messages) that only surface in tests.`,
    year: "Summer 2023",
    category: "experience",
    role: "SWE Intern",
    tech: ["Go", "Protocol Buffers", "Unit Testing", "Goroutines/Channels"],
    isPublic: true,
    status: "shipped",
    scale: 3,
    images: ["/images/plat_sci.png"],
  },
  {
    slug: "berkeley",
    title: "UC Berkeley",
    subtitle: "Data Science",
    description:
      "Studied data engineering, machine learning, probability, blockchain, and poker at Berkeley. A lot of building, modeling, and learning how to think under uncertainty.",
    year: "Dec 2025",
    category: "education",
    role: "Data Science",
    tech: ["Python", "SQL", "Solidity"],
    longDescription: `## Data 101: Data Engineering
- Relational algebra as foundation for understanding query execution
- Query optimization: how the database plans and executes SQL
- Declarative language paradigm: specify what, engine figures out how

## Blockchain for Developers (CS 198-077)
- Built blockchain from scratch in Python
- Solidity smart contracts: deployment, testing, ERC-20 tokens
- Web3.js integration with Ethereum

## Intro to Poker (STAT 198)
- Expected value and variance as decision-making framework
- Hand ranges and combinatorics
- GTO concepts and preflop range construction`,
    isPublic: true,
    status: "shipped",
    images: ["/images/berkeley.jpg"],
  },
  {
    slug: "solana-nft-tooling",
    title: "Solana NFT Tools",
    subtitle: "MagicEden Sniping Notifications, NFT Game Autoplay Bot",
    description:
      "Discord webhook bots for NFT collection sniping. Undercut and rare trait alerts with historical price charts. Also built an autoplay bot for an NFT idle game.",
    longDescription: `## Chartboy - Sniping Notifications

Good sniping opportunities disappear in seconds. Undercuts and rare trait listings get swept before you can manually refresh MagicEden. I needed real-time alerts for specific collections I was watching.

Discord webhook bots monitoring MagicEden for specific NFT collections:
- Alerts for undercuts (listings below recent floor)
- Alerts for rare trait listings at reasonable prices
- Historical price charts embedded directly in Discord messages using QuickChart API (generates chart images from a URL, no image hosting needed)

Attempted to build out database storage for historical data and more sophisticated analytics, but it never worked out (MongoDB). The webhook bots were the useful part.

## Remnants Autoplay - Game Bot

Remnants is a Solana NFT idle game where you send characters on timed expeditions to earn tokens. Expeditions take anywhere from 10 minutes to 8 hours. Manually checking and redeploying NFTs constantly is tedious and guarantees you'll miss expedition completions.

The bot handles the complete expedition lifecycle:
- Wallet auth via Solana message signing and JWT flow to integrate with their backend API
- Multi-NFT state machine tracking expedition status and timers
- Discord webhook notifications for completed expeditions with loot summaries
- Automatic redeployment of NFTs immediately after completion`,
    year: "2021-2022",
    category: "endeavor",
    role: "Project",
    tech: ["Python", "MagicEden API", "Discord Webhooks", "QuickChart API"],
    isPublic: false,
    status: "archived",
    hidden: true,
    images: ["/images/remnants.png"],
  },
  {
    slug: "spoti-cli",
    title: "Spoti-CLI",
    subtitle: "Terminal Spotify Client",
    description:
      "A keyboard-first Spotify client for the terminal with vim motions, lyrics, queue controls, and a custom TUI architecture behind it.",
    longDescription: `## The Problem
During a period where I was deep into vim and optimizing my dev workflow, Spotify became a friction point. Switching windows to change tracks or browse playlists broke my flow. I wanted music control integrated directly into my terminal, something with vim keybindings that stayed out of my way.

## Technical Approach
Built a TUI using Python's blessed library with vim-style keybindings for navigation and playback.

Architecture highlights:
- Component-based TUI: Base Component class handles render lifecycle (update/output/handleInput). ViewManager orchestrates the ~30 FPS render loop with a view history stack for back-navigation.
- Template system: Menu and TextLines templates handle pagination, scrolling, and active item highlighting. New views just subclass and inherit all navigation behavior.
- Action-based keybind system: Keys map to semantic actions ("j" -> "down" -> handler), making keybindings user-configurable via JSON config.
- API layer: Wrapper handles automatic pagination and rate limiting. Endpoint-keyed caching persists to ~/.cache/spoti-cli/.

Playback control goes through AppleScript (macOS) or D-Bus (Linux) rather than Spotify's Web API. System-level calls are significantly faster, resulting in instant response to play/pause/skip commands.

## Interesting Challenges
Spotify OAuth: The authorization code flow with token refresh was its own mini-project. Spun up a local Flask server to catch the callback, then polled for the code before exchanging it for tokens. Auto-refresh handles session expiration transparently.

Genius song matching: Genius's search API returns fuzzy matches, not exact. The matching algorithm searches "{song} {artist}", iterates results looking for case-insensitive artist name matches, and falls back to the first result. Then scrapes the actual lyrics from the Genius webpage since their API doesn't return lyrics directly. Not perfect, but works surprisingly well in practice.

## What I'd Do Differently
If I revisited this, I'd expand the scope: album art rendering in the terminal (sixel or kitty graphics protocol), richer queue management with reordering, and artist/genre radio for discovery. The core abstractions are solid enough to support these without major refactoring.`,
    year: "2020",
    category: "project",
    role: "Project",
    tech: ["Python", "Spotify API"],
    features: [
      "Vim keybindings for navigation (j/k/h/l)",
      "Full playback control",
      "Lyrics display via Genius API",
      "Playlist and liked songs browsing",
      "Queue management",
      "Cross-platform (macOS + Linux)",
    ],
    links: {
      github: "https://github.com/joeysnclr/spoti-cli",
    },
    isPublic: true,
    status: "shipped",
    scale: 3,
    stars: 12,
    images: ["/images/spoti-cli.png"],
  },
  {
    slug: "reseller-tools",
    title: "Reseller Tools",
    subtitle: "Supreme Bot, Shopify Monitors, StockX Analytics",
    description:
      "Supreme checkout bots, Shopify restock monitors, and StockX analytics. The tooling stack that drove sneaker resale volume.",
    year: "2017-2019",
    category: "endeavor",
    role: "Project",
    tech: ["Python", "FastAPI", "PostgreSQL", "Selenium", "Requests", "Discord Webhooks"],
    features: [
      "Selenium browser automation for Supreme drops",
      "Shopify restock detection with Discord alerts",
      "StockX historical price tracking by model/size",
      "Multi-retailer support (Nike, Foot Locker, etc.)",
      "Web scraping pipeline with anti-bot evasion",
    ],
    longDescription: `## The Problem
Supreme drops new products every Thursday at 11AM EST. Popular items sell out in under 3 seconds. I was 16, in high school, and drops happened during class. Manual purchasing was impossible.

## Technical Approach
Built two systems: checkout automation and market intelligence.

Checkout Automation:
- Selenium browser automation for Supreme checkout flow
- Requests-based approach for speed (browser overhead was too slow)
- Hybrid method using ATC (add-to-cart) links to skip product pages entirely
- Form autofill for shipping/payment to minimize checkout time

Market Intelligence:
- Shopify endpoint polling for restock detection
- StockX price scraping for resale value research (Premebase - unfinished)
- Discord webhooks for instant alerts

## Interesting Challenges
reCAPTCHA was the wall. Only triggered on checkout submission (button click or POST endpoint), but enough to kill most automation attempts.

The bypass I missed: Supreme's checkout accepted an empty string for \`g_captcha_response\` in the POST body, completely bypassing verification. People printed. I found out after it was patched.

Python + Selenium issues: GIL meant my multi-window approach never worked reliably. Combined with being stuck in class during drops, I never successfully botted a hyped release.

What did work: Successfully purchased socks outside of peak drop times. Small wins.

## What I Learned
The bots didn't work, but the failures taught me reverse engineering, session management, anti-bot evasion, and proxy rotation. These skills transferred directly to later projects.`,
    isPublic: false,
    status: "archived",
    hidden: true,
    images: ["/images/reseller.jpeg"],
  },
];

// Query functions

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getEducation(): Project[] {
  return projects.filter((p) => p.category === "education" && !p.hidden).sort(byYearDesc);
}

export function getExperience(): Project[] {
  return projects.filter((p) => p.category === "experience" && !p.hidden).sort(byYearDesc);
}

export function getAllWork(): Project[] {
  return projects
    .filter((p) => (p.category === "project" || p.category === "endeavor") && !p.hidden)
    .sort(byYearDesc);
}

export function getExperienceAndEducation(): Project[] {
  return projects
    .filter((p) => (p.category === "experience" || p.category === "education") && !p.hidden)
    .sort(byYearDesc);
}
