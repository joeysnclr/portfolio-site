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
I designed a clock abstraction that enables identical strategy code to run live or in backtest mode. The clock interface handles time progression, price updates, and order lifecycle uniformly regardless of execution context.

The system separates concerns cleanly:
- Exchange adapters normalize API responses from Kalshi, Polymarket, and future markets
- Candle aggregators handle sparse data and synthetic bar generation
- Order simulators apply realistic execution delays to prevent lookahead bias
- Strategy logic remains completely decoupled from execution mode

## Interesting Challenges
Prediction markets often have illiquid periods with sparse trades. Standard candlestick algorithms break when there are gaps. I built synthetic candle generation that interpolates during quiet periods without introducing artificial patterns.

Execution delay simulation was critical. In backtest mode, filling orders at current prices introduces severe lookahead bias. The system now simulates realistic fill prices by sampling from recent trade distributions.

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
- Rolling statistics (xwOBA, hard hit rate, K rate) with configurable lookback windows
- Batter vs pitcher matchup history with split statistics
- Park factors scraped from Baseball Savant
- Defensive metrics and handedness adjustments

The backtesting framework uses Monte Carlo simulation to evaluate parlay strategies across different payout structures (PrizePicks flex, Underdog power). Kelly criterion integration for bankroll sizing.

## Interesting Challenges
Player props markets are efficient. The edge from statistical models is small, requiring disciplined bankroll management. The Monte Carlo simulation was essential for understanding variance in multi-leg parlays.

Player injuries and lineup changes introduce noise that rolling statistics can't fully capture. Weather and umpire effects also matter but were deprioritized.

## What I'd Do Differently
The system treats each prop independently. A multi-output model capturing correlations between props (e.g., a pitcher's strikeouts and hits allowed) could find parlay edges that independent models miss.`,
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
    },
    isPublic: false,
    featured: true,
    status: "archived",
    type: "research",
  },
  {
    slug: "mlbdatatools",
    title: "mlbdatatools | Baseball Analytics Library",
    description:
      "Baseball analytics Python library. Type-safe DataFrames, multi-source fetching, and plotting utilities for Statcast analysis.",
    year: "2024",
    era: "Baseball Modeling",
    tech: ["Python", "pandas", "polars", "matplotlib"],
    longDescription: `## The Problem
Baseball data comes from multiple sources with inconsistent schemas. pybaseball provides Statcast but lacks utility functions for common analytics workflows. Copy-pasting code between projects was error-prone.

## Technical Approach
Built a type-safe library for modern baseball analytics:
- Unified DataFrame interfaces across Statcast, Baseball Reference, and Fangraphs data
- Multi-source data fetching with automatic schema normalization
- Plotting utilities for common visualizations (spray charts, heatmaps, timeline graphs)
- pandas and polars backends for performance flexibility

## Interesting Challenges
Data quality issues in baseball data are subtle. Batter handedness splits, park factors, and even basic stats like ERA require careful handling. The library enforces validation at data ingestion time.

## What I'd Do Differently
The library is useful but undermaintained. Modern alternatives like pybaseball have caught up on utility functions. The value now is primarily in my personal workflow rather than as a public library.`,
    links: {
      github: "https://github.com/joeysnclr/mlbdatatools",
    },
    isPublic: true,
    status: "shipped",
    type: "library",
  },
  {
    slug: "baseball-research",
    title: "Baseball Research",
    description:
      "Collection of baseball modeling experiments including pitch classification, Statcast analysis, and swing/miss severity tracking.",
    year: "2023-2025",
    era: "Baseball Modeling",
    tech: ["Python", "pandas", "scikit-learn", "Statcast", "XGBoost"],
    longDescription: `## The Problem
Beyond the main prop prediction system, I explored various baseball modeling questions that didn't fit into the main pipeline.

## Research Projects
- Pitch classification usingStatcast trackman data and XGBoost
- Swing severity analysis tracking where in the zone batters miss
- Batter/pitcher split modeling with rolling statistics
- Park factor calculations and adjustment methodologies

## What I Learned
Baseball has incredibly rich data but modeling edge is hard to find. Most obvious signals are already priced into the market. The real edge comes from novel data sources or alternative modeling approaches.`,
    isPublic: false,
  },

  // 2025 Dec: Berkeley
  {
    slug: "berkeley",
    title: "UC Berkeley | Data Science",
    description:
      "Graduated December 2025. Data Engineering, Blockchain for Developers, and Intro to Poker. Game theory meets quantitative analysis.",
    year: "2025",
    era: "Education",
    tech: ["Python", "SQL", "Spark", "Solidity", "Game Theory"],
    longDescription: `## The Problem
Data science curriculum focuses heavily on analysis but less on engineering. I wanted exposure to production-grade systems work alongside the theoretical foundations.

## Relevant Coursework
- Data Engineering: Large-scale data pipelines with Spark, dbt, and Airflow. Built ETL pipelines processing millions of records.
- Blockchain for Developers: Solidity smart contracts, DeFi protocols, and EVM internals. Built a prediction market contract as the final project.
- Intro to Poker: Game theory, expected value calculations, and decision making under uncertainty. Connected directly to my interest in prediction markets.

## What I Got Out of It
The poker course was surprisingly relevant to quantitative work. EV calculations, range thinking, and Bayesian updating transfer directly to sports modeling and prediction markets.

Data Engineering shifted how I think about ML systems. Feature stores, data quality monitoring, and pipeline orchestration are as important as the models themselves.`,
    features: [
      "Data Engineering - large-scale data pipelines",
      "Blockchain for Developers - Solidity smart contracts",
      "Intro to Poker - game theory and decision making under uncertainty",
    ],
    isPublic: true,
    status: "shipped",
    type: "education",
  },

  // 2021-2022: NFT/Solana Era
  {
    slug: "remnants-autoplay",
    title: "Remnants Autoplay | Solana NFT Game Bot",
    description:
      "Solana NFT game bot with Ed25519 wallet authentication. Multi-NFT state machine, Discord notifications, and automatic redeployment.",
    longDescription: `## The Problem
Remnants is a Solana NFT idle game where you send characters on timed expeditions to earn tokens. Expeditions take anywhere from 10 minutes to 8 hours. Manually checking and redeploying NFTs constantly is tedious and guarantees you'll miss expedition completions.

## Technical Approach
The bot handles the complete expedition lifecycle:
- Solana keypair loading from base58-encoded private keys
- Wallet authentication via Ed25519 message signing (challenge/response JWT flow)
- Multi-NFT state machine tracking expedition status and timers
- Discord webhook notifications for completed expeditions with loot summaries
- Automatic redeployment of NFTs immediately after completion

## Interesting Challenges
Solana's Ed25519 signature scheme requires careful implementation. I built raw signature verification into the authentication flow rather than relying on high-level libraries.

The state machine handles partial completions and network failures gracefully. If an expedition completes while the bot is offline, it catches up on missed claims on next run.

## What I'd Do Differently
The current implementation polls continuously. Webhook-based notifications from the game server would be more efficient, but the game doesn't support them. The bot is essentially a workaround for game design that assumes constant player attention.`,
    year: "2022",
    era: "NFT/Solana",
    tech: ["Python", "Solana", "Ed25519", "Discord Webhooks"],
    features: [
      "Solana keypair loading and message signing",
      "Wallet based JWT authentication",
      "Multi-NFT expedition management",
      "Discord notifications for loot claims",
    ],
    links: {
      github: "https://github.com/joeysnclr/remnants_autoplay",
    },
    isPublic: true,
    featured: false,
    status: "archived",
    type: "tool",
    images: ["/images/remnants.png"],
  },
  {
    slug: "chartboy",
    title: "Chartboy | NFT Collection Analytics",
    description:
      "NFT collection analytics API with Twitter sales announcements. Metaplex metadata parsing, trait-based floor prices, historical tracking, and automated announcements.",
    year: "2021",
    era: "NFT/Solana",
    tech: ["TypeScript", "Express", "Solana Web3.js", "Metaplex", "Twitter API"],
    longDescription: `## The Problem
NFT collections have complex metadata structures. Floor prices and average sale prices are misleading because each NFT has unique traits. Additionally, sales happen constantly across marketplaces, and Twitter was where the community gathered. There was no automated way to announce sales from specific collections.

## Technical Approach
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

## Interesting Challenges
Solana's RPC is rate-limited and slow. I implemented request batching and caching to avoid rate limits while maintaining responsive charts.

This was my first TypeScript project. The type safety caught numerous bugs during development, especially around metadata parsing where API responses varied unexpectedly.

Twitter's API has strict rate limits. The bot had to batch transactions and spread posts over time to avoid being locked out.

## What I'd Do Differently
The project solved a real problem during the NFT boom but was narrowly scoped to one collection. A generalized tool for any Metaplex collection would have been more valuable but required more upfront schema work.

The project worked well but was brittle. Twitter API changes have broken similar bots multiple times. A more robust architecture would separate detection from posting and use a message queue for durability.`,
    isPublic: false,
    status: "archived",
    type: "tool",
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
  {
    slug: "url-short",
    title: "URL Shortener | Link Analytics",
    description:
      "URL shortener with click analytics. MongoDB storage, geographic tracking, referrer analysis, and custom short codes.",
    year: "2020",
    era: "COVID / Senior Year",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    longDescription: `## The Problem
URL shorteners like Bitly were popular but the analytics were limited. I wanted click tracking with geographic data, referrer analysis, and custom short codes.

## Technical Approach
MERN stack application:
- MongoDB for link storage and click event logs
- Express API for link creation and click tracking
- React dashboard for analytics visualization
- 301 redirects for SEO preservation

## Interesting Challenges
High-volume click tracking requires careful database design. I used capped collections for click logs to prevent unbounded growth while maintaining aggregate statistics.

This was my first full-stack project. The architecture is naive by modern standards but it worked for personal use.

## What I'd Do Differently
The project solved a problem I didn't actually have at scale. Bitly's free tier was sufficient for actual use cases. The value was in learning full-stack development, not in the utility of the final product.`,
    links: {
      github: "https://github.com/joeysnclr/url-short",
    },
    isPublic: true,
    status: "archived",
    type: "product",
  },

  // 2017-2019: Reseller Era
  {
    slug: "premebase",
    title: "PremeBase | StockX Analytics Platform",
    description:
      "StockX analytics platform. Web scraping pipeline, historical price tracking by model/size, and trend analysis models.",
    year: "2019",
    era: "Reseller Era",
    tech: ["Python", "FastAPI", "PostgreSQL"],
    longDescription: `## The Problem
StockX and GOAT have opaque pricing. Historical sale data is behind paywalls or requires manual searching. For sneaker resale, understanding price trends was essential for profitable flipping.

## Technical Approach
Data collection and analytics platform:
- Web scraping of StockX sale listings
- Historical price tracking by model and size
- Trend analysis and price prediction models
- REST API for programmatic access

## Interesting Challenges
StockX's anti-scraping measures required careful request pacing and header management. I learned about rate limiting, IP rotation, and session management.

The analytics were useful but the predictions were naive. Price prediction in resale markets is heavily influenced by hype and influencer behavior that statistical models can't capture.

## What I'd Do Differently
The project was technically functional but didn't produce actionable predictions. The real value would have been in faster data collection or better data sources, not improved models. I pivoted to baseball modeling where the underlying phenomena are more predictable.`,
    isPublic: false,
    status: "unreleased",
    type: "product",
  },
  {
    slug: "reseller-bots",
    title: "Reseller Bots | Supreme & Shopify Automation",
    description:
      "Supreme checkout automation and Shopify restock monitoring. Selenium browser automation and Discord notification system.",
    year: "2017-2018",
    era: "Reseller Era",
    tech: ["Python", "Selenium", "Requests", "Discord Webhooks"],
    longDescription: `## The Problem
Supreme drops new products every Wednesday at 10AM EST. Popular items sell out in seconds. Nike and Adidas restock inventory randomly. By the time you check, shoes are already sold out. Manual monitoring and purchasing was impractical.

## Technical Approach
Built two complementary automation tools:

**Supreme Bots:**
- Selenium-based browser automation for checkout
- Form filling for shipping and payment
- Timing optimization to hit checkout the instant products dropped
- API pattern discovery for faster navigation

**Restock Monitors:**
- Polled Shopify product availability endpoints
- Detected restock patterns and notification triggers
- Multi-retailer support (Nike, Foot Locker, etc.)
- Discord webhook integration for instant alerts

## Interesting Challenges
reCAPTCHA v3 was essentially unbeatable. The behavioral analysis flags automated patterns instantly. Most Supreme bots didn't get past the initial page load.

Retailers use various anti-bot measures. Timing and request patterns matter. The monitoring approach needed to be stealthy enough to avoid IP blocks while responsive enough to catch brief restock windows.

## What I'd Do Differently
The Supreme bots didn't work, but the failures taught me more than success would have. Browser fingerprinting, proxy rotation, and session management are all relevant skills I've used since. This was the beginning of my programming journey - $16k StockX volume at age 16.`,
    features: [
      "Browser automation for Supreme checkouts",
      "Shopify restock monitoring",
      "Discord notifications for alerts",
      "Multi-retailer support",
      "$16k StockX volume at age 16",
    ],
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
