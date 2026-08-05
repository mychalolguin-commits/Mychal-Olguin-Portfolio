export type BookMotif =
  | "lattice"
  | "corrosion"
  | "efficiency"
  | "network"
  | "boom"
  | "organization"
  | "schematic"
  | "flight"
  | "circuit"
  | "orbit"
  | "branches"
  | "wave"
  | "runner"
  | "gather"
  | "maze"
  | "fracture"
  | "continuum"
  | "windows"
  | "steps";

export type CatalogBook = {
  id: string;
  title: string;
  shortTitle: string;
  /** Issuing organization — rendered where the demo rendered an author. */
  author: string;
  description: string;
  /** Repurposed: a one-line statement of the capability the credential covers. */
  quote: string;
  /** Repurposed: the skills LinkedIn associates with the credential. */
  quoteBy: string;
  /** Repurposed: issue and expiry dates. */
  format: string;
  /** Repurposed: credential ID or status. */
  availability: string;
  url: string;
  cover: string;
  accent: string;
  ink: string;
  motif: BookMotif;
  height: number;
  thickness: number;
  coverImage?: string;
  linkLabel?: string;
  living?: boolean;
};

/**
 * Ordered newest to oldest so the shelf reads left-to-right as a timeline.
 * The upstream demo sorted by height for a clean silhouette; here the
 * chronology carries more meaning, so heights vary organically instead.
 *
 * `url` points at the LinkedIn certifications page for every entry. Swap in
 * the individual "Show credential" links from LinkedIn as you collect them.
 */
const LINKEDIN_CERTIFICATIONS =
  "https://www.linkedin.com/in/mychalolguin/details/certifications/";

export const catalog: CatalogBook[] = [
  {
    id: "hubspot-digital-marketing",
    title: "Digital Marketing Certified",
    shortTitle: "Digital Marketing",
    author: "HubSpot",
    description:
      "Full-funnel digital marketing across content, email, social, and analytics — the connective tissue between campaign execution and revenue reporting.",
    quote: "Campaigns are only as good as the funnel they feed.",
    quoteBy: "Digital Marketing",
    format: "Issued Aug 2026 · Expires Sep 2027",
    availability: "Active credential",
    url: LINKEDIN_CERTIFICATIONS,
    linkLabel: "Verify on LinkedIn",
    cover: "#D8452A",
    accent: "#E8C07A",
    ink: "#FFF1E8",
    motif: "network",
    height: 2.18,
    thickness: 0.27,
  },
  {
    id: "apple-ads",
    title: "Apple Ads Certification",
    shortTitle: "Apple Ads",
    author: "Apple",
    description:
      "Campaign structure, bidding, and measurement inside Apple's search advertising platform, including privacy-first attribution.",
    quote: "Attribution that holds up without third-party signal.",
    quoteBy: "Search Advertising",
    format: "Issued May 2026",
    availability: "Active credential",
    url: LINKEDIN_CERTIFICATIONS,
    linkLabel: "Verify on LinkedIn",
    cover: "#1D1D1F",
    accent: "#B9BEC6",
    ink: "#F5F5F7",
    motif: "orbit",
    height: 2.05,
    thickness: 0.21,
  },
  {
    id: "claude-cowork",
    title: "Introduction to Claude Cowork",
    shortTitle: "Claude Cowork",
    author: "Anthropic",
    description:
      "Working alongside AI agents on real deliverables — delegation, review, and knowing which parts of a workflow stay human.",
    quote: "Leverage is knowing what to hand off.",
    quoteBy: "AI Collaboration",
    format: "Issued May 2026",
    availability: "Credential ID 8u2divsds6nw",
    url: LINKEDIN_CERTIFICATIONS,
    linkLabel: "Verify on LinkedIn",
    cover: "#C4633F",
    accent: "#E6D2B5",
    ink: "#FBF6EF",
    motif: "gather",
    height: 1.96,
    thickness: 0.18,
  },
  {
    id: "claude-code-in-action",
    title: "Claude Code in Action",
    shortTitle: "Claude Code",
    author: "Anthropic",
    description:
      "Building and automating with Claude Code — hooks, custom workflows, and turning repetitive marketing operations into repeatable systems.",
    quote: "Automate the reporting, keep the judgment.",
    quoteBy: "Hooks · Automation",
    format: "Issued May 2026",
    availability: "Credential ID 2moi3btksrb7",
    url: LINKEDIN_CERTIFICATIONS,
    linkLabel: "Verify on LinkedIn",
    cover: "#4A3428",
    accent: "#D97757",
    ink: "#F2E8DF",
    motif: "circuit",
    height: 2.11,
    thickness: 0.24,
  },
  {
    id: "search-ads-360",
    title: "Search Ads 360 Certification",
    shortTitle: "Search Ads 360",
    author: "Google",
    description:
      "Managing search at scale across engines and accounts, with centralized bidding, budgets, and cross-channel reporting.",
    quote: "One view across every engine you buy.",
    quoteBy: "Search Management",
    format: "Issued Mar 2026",
    availability: "Active credential",
    url: LINKEDIN_CERTIFICATIONS,
    linkLabel: "Verify on LinkedIn",
    cover: "#14702F",
    accent: "#CBA95E",
    ink: "#EFF6F0",
    motif: "continuum",
    height: 1.92,
    thickness: 0.19,
  },
  {
    id: "google-ads-measurement",
    title: "Google Ads Measurement Certification",
    shortTitle: "Ads Measurement",
    author: "Google",
    description:
      "Conversion tracking, attribution modeling, and marketing mix modeling — proving what media actually moved the number.",
    quote: "If it isn't measured cleanly, it didn't happen.",
    quoteBy: "Marketing Mix Modeling",
    format: "Issued Mar 2026",
    availability: "Credential ID 177627704",
    url: LINKEDIN_CERTIFICATIONS,
    linkLabel: "Verify on LinkedIn",
    cover: "#14488F",
    accent: "#E0B84C",
    ink: "#EAF1FB",
    motif: "efficiency",
    height: 2.16,
    thickness: 0.29,
  },
  {
    id: "meta-media-buying-professional",
    title: "Meta Certified Media Buying Professional",
    shortTitle: "Meta Media Buying",
    author: "Meta",
    description:
      "Professional-level paid social buying across Facebook and Instagram: campaign architecture, budget scaling, creative testing, and optimization against business outcomes.",
    quote: "Scale the winners, kill the rest, quickly.",
    quoteBy: "Media Buying · Campaign Optimization",
    format: "Issued Jan 2026 · Expires Jan 2027",
    availability: "Credential ID 0839f0ac-f7ec-4a97-9d68-92d5d050c386",
    url: LINKEDIN_CERTIFICATIONS,
    linkLabel: "Verify on LinkedIn",
    cover: "#0B3FA8",
    accent: "#9DC0F5",
    ink: "#EAF1FF",
    motif: "boom",
    height: 2.20,
    thickness: 0.30,
    living: true,
  },
  {
    id: "google-ads-shopping",
    title: "Google Ads Shopping Certification",
    shortTitle: "Ads Shopping",
    author: "Google",
    description:
      "Product feed strategy, Shopping campaign structure, and bidding for retail catalogs.",
    quote: "The feed is the campaign.",
    quoteBy: "Search Advertising",
    format: "Issued Apr 2025 · Expired Apr 2026",
    availability: "Credential ID 139579332",
    url: LINKEDIN_CERTIFICATIONS,
    linkLabel: "Verify on LinkedIn",
    cover: "#8A5B00",
    accent: "#EBBF57",
    ink: "#FFF6E4",
    motif: "windows",
    height: 1.99,
    thickness: 0.22,
  },
  {
    id: "google-ads-search",
    title: "Google Ads Search Certification",
    shortTitle: "Ads Search",
    author: "Google",
    description:
      "Search campaign fundamentals — keyword strategy, ad relevance, quality score, and bulk management in Google Ads Editor.",
    quote: "Intent is the highest-converting audience there is.",
    quoteBy: "Google Ads · Ads Editor",
    format: "Issued Apr 2025 · Expired Apr 2026",
    availability: "Credential ID 139185683",
    url: LINKEDIN_CERTIFICATIONS,
    linkLabel: "Verify on LinkedIn",
    cover: "#96271D",
    accent: "#D9A05B",
    ink: "#FBEDEA",
    motif: "maze",
    height: 2.08,
    thickness: 0.25,
  },
  {
    id: "stukent-social-simternship",
    title: "Social Media Simternship",
    shortTitle: "Social Simternship",
    author: "Stukent",
    description:
      "A simulated agency engagement running social strategy end to end — audience targeting, content calendar, and budget allocation against performance targets.",
    quote: "Where the budget goes, the strategy follows.",
    quoteBy: "Social Outreach · Budget Management",
    format: "Issued Nov 2023 · Expires Nov 2026",
    availability: "Active credential",
    url: LINKEDIN_CERTIFICATIONS,
    linkLabel: "Verify on LinkedIn",
    cover: "#16545C",
    accent: "#C4A468",
    ink: "#EAF4F4",
    motif: "steps",
    height: 1.90,
    thickness: 0.17,
  },
] satisfies CatalogBook[];
