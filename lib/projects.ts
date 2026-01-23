export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  year: string;
  category: "project" | "endeavor" | "experience" | "education";
  tech: string[];
  features?: string[];
  links?: {
    github?: string;
    live?: string;
  };
  isPublic: boolean;
  spotlight?: boolean;
  status?: "shipped" | "active" | "archived" | "unreleased";
  images?: string[];
}

// Sorting utilities
function parseYear(year: string): number {
  // Handle "2023-2025" → use end year (2025)
  // Handle "2025" → use as-is
  const parts = year.split("-");
  return parseInt(parts[parts.length - 1], 10);
}

function byYearDesc(a: Project, b: Project): number {
  return parseYear(b.year) - parseYear(a.year);
}

export const projects: Project[] = [
  {
    slug: "surface",
    title: "Surface",
    subtitle: "Prediction Market Terminal",
    description:
      "A cross-exchange trading terminal for prediction markets. Unified view across Kalshi, Polymarket, and more.",
    longDescription: `## The Problem
Prediction markets are fragmented. The same event trades on multiple exchanges (Kalshi, Polymarket, and others), often at different prices. Traders manually flip between platforms, miss pricing discrepancies, and have no unified view of where to get the best execution.

There's no single place to see all your options, compare prices, and understand which exchange is leading or lagging on any given market.

## What I Built
A matching system that identifies equivalent markets across exchanges and surfaces them in one place. When "Lakers to win" is priced at 55¢ on one exchange and 60¢ on another, Surface shows you both - and the spread between them.

The terminal is cross-exchange only. No exchange-specific markets cluttering the view. If a market doesn't exist on multiple platforms, it doesn't show up. This keeps the focus on what matters: finding the best price and spotting inefficiencies.

## What It Offers
- **Best price discovery**: See where any market is cheapest to buy or most profitable to sell
- **Arbitrage surfacing**: Identify pricing discrepancies between exchanges in real-time
- **Exchange analysis**: Understand which platforms lead or lag on pricing for different market types
- **Unified trading view**: One terminal for markets that exist across exchanges

## The Vision
Surface is the foundation for something bigger: an integrated sports data trading terminal. Think [Baseball Savant](https://baseballsavant.mlb.com) meets prediction markets. Live game data, player metrics, box scores, matchups, all contextualizing the markets you're trading. The goal is to help traders make statistically informed decisions, not just react to price movements.

For now, the focus is on doing cross-exchange really well. The sports data integration comes next.`,
    year: "2026",
    category: "project",
    tech: [
      "Go",
      "SQLite/Turso",
      "React",
      "DFlow",
      "Privy",
    ],
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
    images: ["/images/surface.png"],
  },
  {
    slug: "oracle-engine",
    title: "Oracle Engine",
    subtitle: "Prediction Market Backtester",
    description:
      "Prediction market backtesting and live trading system. Replicates real market conditions with clock abstraction and order simulation.",
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
    tech: ["Go", "React", "SQLite", "Kalshi API", "Polymarket API", "TradingView Charts"],
    features: [
      "Clock abstraction for live/backtest mode switching",
      "Execution delay simulation for realistic backtests",
      "Synthetic candle generation for illiquid markets",
      "YAML configured strategy parameters",
      "React dashboard with TradingView charts",
      "Performance metrics (Sharpe, max drawdown, win rate)",
    ],
    links: {},
    isPublic: true,
    status: "active",
    images: ["/images/oracle-engine.png"],
  },
  {
    slug: "latentjobs",
    title: "Latent Jobs",
    subtitle: "AI-Powered Job Search",
    description:
      "Job search aggregator with semantic resume matching. Scrapes LinkedIn and uses embeddings to rank jobs by relevance.",
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
    tech: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "OpenAI",
      "DSPy",
      "linkedin-api",
    ],
    features: [
      "Vector similarity resume-to-job matching",
      "AI-powered job metadata extraction (GPT-4o-mini)",
      "LinkedIn API integration",
      "Advanced filtering by workplace, region, experience level",
      "Analytics dashboards for market insights",
    ],
    links: {
      github: "https://github.com/joeysnclr/latentjobs",
      live: "https://latentjobs-production.up.railway.app/",
    },
    isPublic: false,
    status: "shipped",
    images: ["/images/latent-jobs.png"],
  },
  {
    slug: "mlb-prediction-system",
    title: "Prop Engine",
    subtitle: "MLB Player Props Prediction",
    description:
      "MLB player props prediction system with probability distributions. Monte Carlo backtesting on PrizePicks and similar platforms.",
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
    year: "2023-2025",
    category: "project",
    tech: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "PostgreSQL",
      "SQLAlchemy",
      "FastAPI",
      "Streamlit",
      "dbt",
    ],
    features: [
      "Custom ML models with probability distributions",
      "35+ dbt SQL models for feature engineering",
      "Rolling statistics with configurable lookback windows",
      "Batter vs pitcher matchup modeling",
      "Monte Carlo simulation for parlay backtesting",
      "Streamlit dashboard for daily props",
    ],
    links: {
      github: "https://github.com/joeysnclr/propengine",
      live: "https://propengine-production.up.railway.app/",
    },
    isPublic: false,
    status: "archived",
    images: ["/images/prop_engine.png"],
  },
  {
    slug: "mlbdatatools",
    title: "MLB Data Tools",
    subtitle: "Baseball Analytics Library",
    description:
      "Baseball analytics Python library exposing data unavailable elsewhere: Savant player page Statcast splits/percentiles and per-play OAA via hidden API. Type-safe DataFrames with plotting utilities.",
    year: "2024",
    category: "project",
    tech: ["Python", "pandas", "polars", "matplotlib"],
    longDescription: `## The Problem
Baseball data comes from multiple sources with inconsistent schemas. pybaseball provides Statcast but lacks utility functions for common analytics workflows. More importantly, some of the most useful data on Baseball Savant isn't exposed through any official API.

## Unique Data Access
- Savant player pages: Scrapes embedded JSON for career Statcast splits and percentile rankings. No API exists for this.
- Hidden OAA endpoint: Undocumented API for per-play outs above average, not just season aggregates.

## Technical Approach
Built a type-safe library for modern baseball analytics:
- Unified DataFrame interfaces across Statcast, Baseball Reference, and Fangraphs data
- Multi-source data fetching with automatic schema normalization
- Plotting utilities for common visualizations (spray charts, heatmaps, timeline graphs)
- pandas and polars backends for performance flexibility

## Interesting Challenges
Data quality issues in baseball data are subtle. Batter handedness splits, park factors, and even basic stats like ERA require careful handling. The library enforces validation at data ingestion time.

## What I'd Do Differently
The library is useful but undermaintained. Modern alternatives like pybaseball have caught up on utility functions. The unique value now is primarily the hidden data access: the Savant player page scraping and undocumented OAA endpoint remain useful.`,
    links: {
      github: "https://github.com/joeysnclr/mlbdatatools",
    },
    isPublic: true,
    status: "shipped",
    images: ["/images/mlbdatatools.png"],
  },
  {
    slug: "platform-science",
    title: "Platform Science",
    subtitle: "Software Engineer Intern",
    description:
      "Go backend testing for fleet telematics. Protocol Buffers, goroutines, and 25% coverage increase across 29 PRs.",
    longDescription: `## The Role
Software engineering intern at Platform Science, a fleet management telematics company. Focused on test coverage for the Go backend.

## What I Did
- Wrote 29 PRs covering Protocol Buffer implementations and struct declarations
- Increased repository test coverage by 25%
- Built integration tests for goroutine/channel patterns in production business logic

## What I Learned
Testing concurrent code taught me goroutines and channels better than any tutorial. Race conditions only surface under specific timing, so writing tests that reliably trigger edge cases forced deep understanding.

ProtoBuf serialization has subtle edge cases (nil vs empty slices, default values, nested messages) that only surface in tests.`,
    year: "2023",
    category: "experience",
    tech: ["Go", "Protocol Buffers", "Unit Testing", "Goroutines/Channels"],
    isPublic: true,
    status: "shipped",
    images: ["/images/plat_sci.png"],
  },
  {
    slug: "berkeley",
    title: "UC Berkeley",
    subtitle: "Data Science",
    description:
      "Data engineering, ML fundamentals, probability, blockchain, poker theory, and more.",
    year: "2025",
    category: "education",
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
    tech: ["Python", "MagicEden API", "Discord Webhooks", "QuickChart API"],
    isPublic: false,
    status: "archived",
    images: ["/images/remnants.png"],
  },
  {
    slug: "spoti-cli",
    title: "Spoti-CLI",
    subtitle: "Terminal Spotify Client",
    description:
      "Terminal Spotify client with vim keybindings. AppleScript/D-Bus control, lyrics via Genius, and queue management.",
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
    tech: [
      "Python",
      "Flask",
      "blessed (TUI)",
      "Spotify API",
      "Genius API",
      "AppleScript/D-Bus",
    ],
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
    images: ["/images/reseller.jpeg"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getSpotlightProjects(): Project[] {
  return projects.filter((p) => p.spotlight).sort(byYearDesc);
}

export function getExperienceAndEducation(): Project[] {
  return projects
    .filter((p) => p.category === "experience" || p.category === "education")
    .sort(byYearDesc);
}

export function getProjectsAndEndeavors(): Project[] {
  return projects
    .filter((p) => p.category === "project" || p.category === "endeavor")
    .filter((p) => !p.spotlight)
    .sort(byYearDesc);
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((p) => p.category === category).sort(byYearDesc);
}
