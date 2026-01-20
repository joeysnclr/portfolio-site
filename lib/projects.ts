export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  year: string;
  era: string;
  tech: string[];
  features?: string[];
  links?: {
    github?: string;
    live?: string;
  };
  isPublic: boolean;
  featured?: boolean;
  status?: "shipped" | "active" | "archived" | "unreleased";
  type?: "product" | "tool" | "library" | "research" | "education";
  images?: string[];
}

export const projects: Project[] = [
  // 2025-2026: Prediction Markets
  {
    slug: "surface",
    title: "Surface | Cross-Exchange Arbitrage",
    description:
      "Cross-exchange prediction market arbitrage scanner. Finds pricing edges between Kalshi and Polymarket using semantic matching.",
    longDescription: `## The Problem
Prediction markets on Kalshi (regulated, US-based) and Polymarket (crypto, offshore) often have equivalent contracts trading at different prices. A contract on Kalshi like "Will the Lakers win?" might be priced at 55¢ while the equivalent on Polymarket "Lakers vs Celtics - Lakers" trades at 60¢. These arbitrage opportunities exist but are hard to spot because contracts describe the same events differently.

## Technical Approach
I built a hybrid search system combining BM25 for lexical matching with Gemini embeddings for semantic similarity. When new contracts appear, the system scores potential matches across both dimensions. A structured LLM agent then validates matches by extracting numeric lines (spreads, totals) and confirming event equivalence.

Key technical decisions:
- Pure Go architecture with no CGO dependencies for easy deployment
- SQLite/Turso for local storage with full-text search
- Bubbletea TUI for manual mapping verification when matches are uncertain
- 3-second polling interval for high-confidence real-time signals

## Interesting Challenges
Contract vocabulary varies wildly between exchanges. "Will Trump win?" vs "2024 US Presidential Election - Trump" require semantic understanding to match correctly. The BM25 + embedding hybrid approach handles both exact phrase matches and conceptual overlap.

Execution speed matters for arbitrage. I optimized the pipeline to surface high-confidence matches within seconds of price updates.

## What I'd Do Differently
The current matching is pairwise. A graph-based approach tracking all contracts simultaneously might find multi-leg arbitrage opportunities I currently miss. The Gemini API costs also add up - local embedding models could reduce expenses at some accuracy tradeoff.`,
    year: "2026",
    era: "Prediction Markets",
    tech: [
      "Go",
      "SQLite/Turso",
      "React",
      "Gemini API",
      "DSPy-Go",
      "Bubbletea TUI",
      "chi router",
    ],
    features: [
      "LLM-powered contract matching with hybrid search (BM25 + vector)",
      "Real-time price monitoring across exchanges",
      "Gemini embeddings for semantic search (768 dimensions)",
      "TUI for manual mapping verification",
      "Pure Go architecture - no CGO required",
      "Multi-stage Docker deployment",
    ],
    links: {
      live: "https://surface.surf",
    },
    isPublic: false,
    featured: true,
    status: "active",
    type: "product",
    images: ["/images/surface.png"],
  },
  {
    slug: "oracle-engine",
    title: "Oracle Engine | Prediction Market Backtester",
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
    era: "Prediction Markets",
    tech: ["Go", "React", "SQLite", "Kalshi API", "Polymarket API", "TradingView Charts"],
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
    featured: true,
    status: "active",
    type: "tool",
    images: ["/images/oracle-engine.png"],
  },

  // 2025: Job Search Tools
  {
    slug: "latentjobs",
    title: "Latent Jobs | AI-Powered Job Search",
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
    era: "Job Search Tools",
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
    featured: true,
    status: "shipped",
    type: "product",
    images: ["/images/latent-jobs.png"],
  },

  // 2023-2025: Baseball Modeling
  {
    slug: "mlb-prediction-system",
    title: "PropEngine | MLB Player Props Prediction",
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
    era: "Baseball Modeling",
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
    featured: true,
    status: "archived",
    type: "research",
    images: ["/images/prop_engine.png"],
  },
  {
    slug: "mlbdatatools",
    title: "mlbdatatools | Baseball Analytics Library",
    description:
      "Baseball analytics Python library exposing data unavailable elsewhere—Savant player page Statcast splits/percentiles and per-play OAA via hidden API. Type-safe DataFrames with plotting utilities.",
    year: "2024",
    era: "Baseball Modeling",
    tech: ["Python", "pandas", "polars", "matplotlib"],
    longDescription: `## The Problem
Baseball data comes from multiple sources with inconsistent schemas. pybaseball provides Statcast but lacks utility functions for common analytics workflows. More importantly, some of the most useful data on Baseball Savant isn't exposed through any official API.

## Unique Data Access
- Savant player pages: Scrapes embedded JSON for career Statcast splits and percentile rankings—no API exists for this.
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
The library is useful but undermaintained. Modern alternatives like pybaseball have caught up on utility functions. The unique value now is primarily the hidden data access—the Savant player page scraping and undocumented OAA endpoint remain useful.`,
    links: {
      github: "https://github.com/joeysnclr/mlbdatatools",
    },
    isPublic: true,
    status: "shipped",
    type: "library",
    images: ["/images/mlbdatatools.png"],
  },


  // 2023: Platform Science Internship
  {
    slug: "platform-science",
    title: "Platform Science | Software Engineer Intern",
    description:
      "Go backend testing for fleet telematics. Protocol Buffers, goroutines, and 25% coverage increase across 29 PRs.",
    longDescription: `## The Role
Software engineering intern at Platform Science, a fleet management telematics company. Focused on test coverage for the Go backend.

## What I Did
- Wrote 29 PRs covering Protocol Buffer implementations and struct declarations
- Increased repository test coverage by 25%
- Built integration tests for goroutine/channel patterns in production business logic

## What I Learned
Testing concurrent code taught me goroutines and channels better than any tutorial. Race conditions only surface under specific timing—writing tests that reliably trigger edge cases forced deep understanding.

ProtoBuf serialization has subtle edge cases (nil vs empty slices, default values, nested messages) that only surface in tests.`,
    year: "2023",
    era: "Work Experience",
    tech: ["Go", "Protocol Buffers", "Unit Testing", "Goroutines/Channels"],
    isPublic: true,
    status: "shipped",
    type: "tool",
  },

  // 2025 Dec: Berkeley
  {
    slug: "berkeley",
    title: "UC Berkeley | Data Science",
    description:
      "Data engineering, ML fundamentals, probability, blockchain, poker theory, and more.",
    year: "2025",
    era: "Education",
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
    type: "education",
  },

  // 2021-2022: NFT/Solana Era
  {
    slug: "solana-nft-tooling",
    title: "Solana NFT Tooling | MagicEden Analytics, NFT Game Autoplay Bot",
    description:
      "NFT collection analytics and game automation tools. Metaplex metadata parsing, trait-based floor prices, Twitter sales announcements, and automated game bot with Ed25519 wallet authentication.",
    longDescription: `## Chartboy - Collection Analytics

### The Problem
NFT collections have complex metadata structures. Floor prices and average sale prices are misleading because each NFT has unique traits. Additionally, sales happen constantly across marketplaces, and Twitter was where the community gathered. There was no automated way to announce sales from specific collections.

### Technical Approach
Express API with Solana Web3.js for blockchain queries and Metaplex for NFT metadata:
- Batch fetch all NFTs in a collection
- Parse on-chain and Arweave metadata for trait extraction
- Calculate floor prices by trait combination
- Historical price tracking for market analysis

Twitter integration for automated announcements:
- Monitor Solana blockchain for marketplace transactions
- Filter by collection address
- Format tweets with sale price, NFT image, and marketplace link
- Rate limiting handling for Twitter's API constraints

---

## Remnants Autoplay - Game Bot

### The Problem
Remnants is a Solana NFT idle game where you send characters on timed expeditions to earn tokens. Expeditions take anywhere from 10 minutes to 8 hours. Manually checking and redeploying NFTs constantly is tedious and guarantees you'll miss expedition completions.

### Technical Approach
The bot handles the complete expedition lifecycle:
- Solana keypair loading from base58-encoded private keys
- Wallet authentication via Ed25519 message signing (challenge/response JWT flow)
- Multi-NFT state machine tracking expedition status and timers
- Discord webhook notifications for completed expeditions with loot summaries
- Automatic redeployment of NFTs immediately after completion`,
    year: "2021-2022",
    era: "NFT/Solana",
    tech: ["TypeScript", "Python", "Express", "Solana Web3.js", "Metaplex", "Ed25519", "Twitter API", "Discord Webhooks"],
    isPublic: false,
    status: "archived",
    type: "tool",
    images: ["/images/remnants.png"],
  },

  // 2020: COVID / Senior Year
  {
    slug: "spoti-cli",
    title: "spoti-cli | Terminal Spotify Client",
    description:
      "Terminal Spotify client with vim keybindings. AppleScript/D-Bus control, lyrics via Genius, and queue management.",
    longDescription: `## The Problem
Spotify's desktop app is fine but requires mouse navigation. During COVID, I wanted a terminal-based solution for music control without leaving my development environment. The existing Spotify terminal clients were either abandonware or required DBus permissions that didn't work on macOS.

## Technical Approach
Built a TUI using Python's blessed library with vim-style keybindings:
- j/k: navigate up/down
- h/l: navigate left/right (playlists, albums, tracks)
- space: play/pause
- H/L: previous/next track
- Queue management with dedicated keybindings
- Lyrics fetching via Genius API

Playback control communicates with the Spotify desktop app via AppleScript (macOS) or D-Bus (Linux). This avoids authentication complexity since the desktop app handles credentials.

## Interesting Challenges
AppleScript integration on macOS was brittle. The Spotify COM interface changes between versions. I added error handling and retry logic for common failure modes.

Genius's API doesn't always have lyrics available. The fallback to "lyrics not found" was a better user experience than failing silently.

## What I'd Do Differently
This was a COVID senior year project. The architecture is fine for what it does, but modern alternatives (Spotify's Web API with OAuth) would be more cross-platform. The AppleScript dependency limits the project to macOS effectively.`,
    year: "2020",
    era: "COVID / Senior Year",
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
    featured: false,
    status: "shipped",
    type: "tool",
    images: ["/images/spoti-cli.png"],
  },
  // 2017-2019: Reseller Era
  {
    slug: "reseller-tools",
    title: "Reseller Tools | Supreme Bot, Shopify Monitors, StockX Analytics",
    description:
      "Supreme checkout bots, Shopify restock monitors, and StockX analytics. The tooling stack that drove sneaker resale volume.",
    year: "2017-2019",
    era: "Reseller Era",
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

**Checkout Automation:**
- Selenium browser automation for Supreme checkout flow
- Requests-based approach for speed (browser overhead was too slow)
- Hybrid method using ATC (add-to-cart) links to skip product pages entirely
- Form autofill for shipping/payment to minimize checkout time

**Market Intelligence:**
- Shopify endpoint polling for restock detection
- StockX price scraping for resale value research (Premebase - unfinished)
- Discord webhooks for instant alerts

## Interesting Challenges
**reCAPTCHA was the wall.** Only triggered on checkout submission (button click or POST endpoint), but enough to kill most automation attempts.

**The bypass I missed:** Supreme's checkout accepted an empty string for \`g_captcha_response\` in the POST body, completely bypassing verification. People printed. I found out after it was patched.

**Python + Selenium issues:** GIL meant my multi-window approach never worked reliably. Combined with being stuck in class during drops, I never successfully botted a hyped release.

**What did work:** Successfully purchased socks outside of peak drop times. Small wins.

## What I Learned
The bots didn't work, but the failures taught me reverse engineering, session management, anti-bot evasion, and proxy rotation. These skills transferred directly to later projects.`,
    isPublic: false,
    status: "archived",
    type: "tool",
  },
];

export const eras = [
  { name: "Prediction Markets", years: "2025-2026" },
  { name: "Job Search Tools", years: "2025" },
  { name: "Education", years: "2025" },
  { name: "Baseball Modeling", years: "2023-2025" },
  { name: "NFT/Solana", years: "2021-2022" },
  { name: "COVID / Senior Year", years: "2020" },
  { name: "Reseller Era", years: "2017-2019" },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByEra(era: string): Project[] {
  return projects.filter((p) => p.era === era);
}
