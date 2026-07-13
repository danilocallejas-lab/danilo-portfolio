import type { ProjectDisciplineTagValue } from "@/lib/project-tags";

export type PrototypeType = "iframe" | "local";
export type PrototypeLifecycle =
  | "planned"
  | "local-preview"
  | "published"
  | "blocked";
export type PrototypeStatus = PrototypeLifecycle;
export type PrototypeFrameSurface =
  | "opendoor"
  | "dropbox"
  | "draftkings"
  | "coinbase";

export type FallbackComponentKey =
  | "OpendoorSellerDemo"
  | "OpendoorHomeInsightsDemo"
  | "OpendoorToolingDemo"
  | "DraftKingsSportsbookDemo"
  | "CoinbasePaymentsDemo"
  | "DropboxSpacesDemo"
  | "DropboxPaperDemo";

export type IntroSection = {
  section_id: string;
  section_type: "intro";
  eyebrow_label: string;
  heading: string;
  title: string;
  summary: string;
  notes?: string;
  accent: string;
};

export type CaseStudyImage = {
  src: string;
  alt: string;
};

export type CaseStudyMediaImage = CaseStudyImage & {
  frameClassName?: string;
  imageClassName?: string;
};

export type CaseStudyImageSection = {
  title: string;
  summary: string;
  caption: string;
  presentation?: "image" | "carousel";
  image: CaseStudyMediaImage;
  slides?: readonly CaseStudyMediaImage[];
};

export type CaseStudyVideoEmbedSection = {
  title: string;
  summary: string;
  caption: string;
  presentation: "video-embed";
  embedUrl: string;
  embedTitle: string;
  frameClassName?: string;
};

export type CaseStudyMediaSection =
  | CaseStudyImageSection
  | CaseStudyVideoEmbedSection;

export type PrototypeDeploymentTarget = {
  intendedVercelProject: string;
  expectedStableUrl: string;
  sourceWorkspace: string | null;
  healthPath: string;
};

export type PrototypeRetiredDeployment = {
  formerVercelProject: string;
  formerProjectId: string;
  formerUrl: string;
  sourceWorkspace: string | null;
};

export type PrototypeLocalDevTarget = {
  workspace: string;
  port: number;
  path: string;
  startCommand: string;
};

export type PrototypeBacklog = PrototypeDeploymentTarget & {
  publishChecklist: readonly string[];
  notes?: string;
};

export type ProjectSection = {
  section_id: string;
  section_type: "project";
  company: string;
  product_line?: string;
  role: string;
  title: string;
  time_period: string;
  discipline_tags: readonly ProjectDisciplineTagValue[];
  summary: string;
  problem: string;
  what_i_did: readonly string[];
  impact_metrics: readonly string[];
  prototype: {
    source: PrototypeType;
    slug: string;
    embedUrl: string | null;
    openUrl: string | null;
    frameSurface: PrototypeFrameSurface | null;
    frameScale: number | null;
    fallbackComponent: FallbackComponentKey;
    lifecycle: PrototypeLifecycle;
    status: PrototypeStatus;
    allowPreviewEmbed: boolean;
    posterImage: CaseStudyImage | null;
    deployment: PrototypeDeploymentTarget | null;
    backlog: PrototypeBacklog | null;
    localDev: PrototypeLocalDevTarget | null;
  };
  notes?: string;
  accent: string;
  show_on_homepage: boolean;
  case_study_gallery?: readonly CaseStudyImage[];
  case_study_sections?: readonly CaseStudyMediaSection[];
  left_panel: {
    eyebrow_label: string;
    short_title: string;
    short_summary: string;
    why_it_mattered?: string;
  };
  right_panel: {
    loading_label: string;
    allow_expand: boolean;
    expand_label?: string;
  };
};

export type PortfolioSection = IntroSection | ProjectSection;

type LegacyProjectSection = Omit<
  ProjectSection,
  "prototype" | "right_panel" | "show_on_homepage"
> & {
  show_on_homepage?: boolean;
  prototype_type: PrototypeType;
  prototype_embed_url: string | null;
  prototype_open_url?: string | null;
  prototype_lifecycle?: PrototypeLifecycle;
  prototype_frame_surface?: PrototypeFrameSurface;
  prototype_frame_scale?: number;
  right_panel: {
    fallback_component: FallbackComponentKey;
    loading_label: string;
    allow_expand: boolean;
    expand_label?: string;
  };
};

const DEFAULT_PUBLISH_CHECKLIST = [
  "Build and verify the prototype locally.",
  "Move the public version into this portfolio under /embedded-prototypes/<slug>.",
  "Use same-origin embed and open URLs from the portfolio deployment.",
  "Deploy the portfolio production URL.",
  "Verify the portfolio route returns 200 and mounts in the portfolio frame.",
  "Update this registry to lifecycle published with same-origin embedUrl and openUrl.",
] as const;

const retiredPrototypeDeployments: Partial<
  Record<string, PrototypeRetiredDeployment>
> = {
  "opendoor-seller-experience": {
    formerVercelProject: "opendoor-seller-prototype",
    formerProjectId: "prj_5eLbj0ALXp09kKJiLapvpXjeUwLJ",
    formerUrl: "https://opendoor-seller-prototype.vercel.app",
    sourceWorkspace:
      "/Users/redeemer/Desktop/danilo-prototypes/opendoor/seller-experience",
  },
  "opendoor-home-insights": {
    formerVercelProject: "opendoor-home-insights-prototype",
    formerProjectId: "prj_z6VoTu6RUfvORlM3sYbN4g8IHo2i",
    formerUrl: "https://opendoor-home-insights-prototype.vercel.app",
    sourceWorkspace:
      "/Users/redeemer/Desktop/danilo-prototypes/opendoor/home-insights",
  },
  "opendoor-agent-led-offers-tooling-platform": {
    formerVercelProject: "opendoor-agent-led-offers-prototype",
    formerProjectId: "prj_o9BomcXNbzUQQz0tHbcmSig03LZ2",
    formerUrl: "https://opendoor-cargo-prototype.vercel.app",
    sourceWorkspace:
      "/Users/redeemer/Desktop/danilo-prototypes/opendoor/agent-led-offers-tooling-platform/web",
  },
  "draftkings-quick-betslip": {
    formerVercelProject: "draftkings-quick-betslip",
    formerProjectId: "prj_Pu7AV9QpAYlicnAJrIPeOu8k6AVv",
    formerUrl: "https://draftkings-quick-betslip.vercel.app",
    sourceWorkspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/quick-betslip",
  },
  "draftkings-player-pages": {
    formerVercelProject: "player-pages",
    formerProjectId: "prj_q9Rz8NlyxM2hvMx38EwIJdAzprTX",
    formerUrl: "https://player-pages.vercel.app",
    sourceWorkspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/player-pages",
  },
  "draftkings-global-switcher": {
    formerVercelProject: "draftkings-switchers-prototype",
    formerProjectId: "prj_EDwFg9BXM3jZ4C5AklOTqwKmKmVH",
    formerUrl: "https://draftkings-switchers-prototype.vercel.app",
    sourceWorkspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/global-switcher",
  },
  "draftkings-betslip-redesign-migration": {
    formerVercelProject: "draftkings-betslip-migration",
    formerProjectId: "prj_iGOknQ4s7aqjkPrHXoSJUPkweNoa",
    formerUrl: "https://draftkings-betslip-migration.vercel.app",
    sourceWorkspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/betslip-redesign-migration",
  },
  "draftkings-pools-one-and-done": {
    formerVercelProject: "draftkings-pools-one-and-done",
    formerProjectId: "prj_TXH7llDjbUIwUSeWh09OGPnVNJkv",
    formerUrl: "https://draftkings-pools-one-and-done.vercel.app",
    sourceWorkspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/pools-one-and-done",
  },
  "draftkings-baseball-play-by-play": {
    formerVercelProject: "draftkings-baseball-play-by-play",
    formerProjectId: "prj_5145Vnt8UInjxB6iZwxhf67seZpE",
    formerUrl: "https://draftkings-baseball-play-by-play.vercel.app",
    sourceWorkspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/baseball-play-by-play",
  },
  "draftkings-player-props-stats-scores": {
    formerVercelProject: "draftkings-player-props",
    formerProjectId: "prj_lmsH9wFugqM55nKhHuqof4t49p81",
    formerUrl: "https://draftkings-player-props.vercel.app",
    sourceWorkspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/player-props-stats-scores",
  },
  "coinbase-pay-tab-architecture": {
    formerVercelProject: "react-native-app",
    formerProjectId: "prj_aCpJCOd9dqOWz99A8KbIdYLJNQf4",
    formerUrl: "https://react-native-app-rho.vercel.app",
    sourceWorkspace:
      "/Users/redeemer/Desktop/danilo-prototypes/coinbase/pay-tab/react-native-app",
  },
};

const PORTFOLIO_PRODUCTION_ORIGIN =
  "https://danilo-callejas-portfolio.vercel.app";
const dropboxSpacesCargoImageBase = "/images/cargo/dropbox-spaces";
const dropboxSpacesCargoMediaFrame =
  "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef2ee_0%,#fbfcfb_100%)]";

const prototypeFrameSurfaceByCompany: Record<string, PrototypeFrameSurface> = {
  Opendoor: "opendoor",
  Dropbox: "dropbox",
  DraftKings: "draftkings",
  Coinbase: "coinbase",
};

const embeddedPrototypeUrls: Partial<Record<string, string>> = {
  "opendoor-seller-experience":
    "/embedded-prototypes/opendoor-seller-experience/hub/",
  "opendoor-home-insights":
    "/embedded-prototypes/opendoor-home-insights/hub/",
  "opendoor-agent-led-offers-tooling-platform":
    "/embedded-prototypes/opendoor-agent-led-offers-tooling-platform/dashboard?embed=1",
  "draftkings-betslip-redesign-migration":
    "/embedded-prototypes/draftkings-betslip-redesign-migration/",
  "draftkings-quick-betslip":
    "/embedded-prototypes/draftkings-quick-betslip/",
  "draftkings-player-pages":
    "/embedded-prototypes/draftkings-player-pages/",
  "draftkings-global-switcher":
    "/embedded-prototypes/draftkings-global-switcher/events/new-orleans-pelicans-at-sacramento-kings/",
  "draftkings-pools-one-and-done":
    "/embedded-prototypes/draftkings-pools-one-and-done/",
  "draftkings-player-props-stats-scores":
    "/embedded-prototypes/draftkings-player-props-stats-scores/",
  "draftkings-baseball-play-by-play":
    "/embedded-prototypes/draftkings-baseball-play-by-play/",
  "coinbase-pay-tab-architecture":
    "/embedded-prototypes/coinbase-pay-tab-architecture/",
  "coinbase-crypto-payroll":
    "/embedded-prototypes/coinbase-crypto-payroll/",
  "coinbase-crypto-gifting":
    "/embedded-prototypes/coinbase-crypto-gifting/",
  "dropbox-spaces-tasks":
    "/embedded-prototypes/dropbox-spaces-tasks/",
  "dropbox-paper-desktop":
    "/embedded-prototypes/dropbox-paper-desktop/",
  "dropbox-paper-marketing-page":
    "/embedded-prototypes/dropbox-paper-marketing-page/",
  "dropbox-paper-templates":
    "/embedded-prototypes/dropbox-paper-templates/",
};

const localPrototypeTargets: Partial<Record<string, PrototypeLocalDevTarget>> = {
  "opendoor-seller-experience": {
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/opendoor/seller-experience",
    port: 4101,
    path: "/hub",
    startCommand: "npm run dev -- --port 4101",
  },
  "opendoor-agent-led-offers-tooling-platform": {
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/opendoor/agent-led-offers-tooling-platform/web",
    port: 4173,
    path: "/dashboard?embed=1",
    startCommand: "npm run dev -- --host 127.0.0.1 --port 4173",
  },
  "draftkings-quick-betslip": {
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/quick-betslip",
    port: 4202,
    path: "/",
    startCommand: "npm run dev -- --port 4202",
  },
  "draftkings-global-switcher": {
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/global-switcher",
    port: 4204,
    path:
      "/events/new-orleans-pelicans-at-sacramento-kings",
    startCommand: "npm run dev -- --port 4204",
  },
  "coinbase-pay-tab-architecture": {
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/coinbase/pay-tab/react-native-app",
    port: 4301,
    path: "/",
    startCommand: "npx expo start --web --port 4301",
  },
  "coinbase-crypto-payroll": {
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/coinbase/crypto-payroll",
    port: 4302,
    path: "/",
    startCommand: "npm run dev -- --port 4302",
  },
  "coinbase-crypto-gifting": {
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/coinbase/p2p-gifting",
    port: 4303,
    path: "/",
    startCommand: "npm run dev -- --port 4303",
  },
  "dropbox-spaces-tasks": {
    workspace: "/Users/redeemer/Desktop/danilo-prototypes/dropbox/spaces-tasks",
    port: 4401,
    path: "/spaces-smartworkspace",
    startCommand: "npm run dev -- --port 4401",
  },
  "dropbox-paper-desktop": {
    workspace: "/Users/redeemer/Desktop/danilo-prototypes/dropbox/paper-desktop",
    port: 4402,
    path: "/paper-desktop",
    startCommand: "npm run dev -- --port 4402",
  },
  "dropbox-paper-marketing-page": {
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/dropbox/paper-marketing-page",
    port: 4403,
    path: "/",
    startCommand: "npm run dev -- --port 4403",
  },
  "dropbox-paper-templates": {
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/dropbox/paper-templates",
    port: 4404,
    path: "/",
    startCommand: "npm run dev -- --port 4404",
  },
};

const prototypeBacklogBySectionId: Partial<
  Record<string, Omit<PrototypeBacklog, "publishChecklist">>
> = {
  "coinbase-instant-sell": {
    intendedVercelProject: "danilo-callejas-portfolio",
    expectedStableUrl:
      "https://danilo-callejas-portfolio.vercel.app/embedded-prototypes/coinbase-instant-sell",
    sourceWorkspace: null,
    healthPath: "/embedded-prototypes/coinbase-instant-sell",
  },
};

const prototypeLifecycleBySectionId: Partial<
  Record<string, PrototypeLifecycle>
> = {
  "opendoor-seller-experience": "published",
  "opendoor-home-insights": "published",
  "opendoor-agent-led-offers-tooling-platform": "published",
  "draftkings-betslip-redesign-migration": "published",
  "draftkings-quick-betslip": "published",
  "draftkings-player-pages": "published",
  "draftkings-global-switcher": "published",
  "coinbase-pay-tab-architecture": "published",
  "draftkings-pools-one-and-done": "published",
  "draftkings-player-props-stats-scores": "published",
  "draftkings-baseball-play-by-play": "published",
  "coinbase-crypto-payroll": "published",
  "coinbase-crypto-gifting": "published",
  "dropbox-spaces-tasks": "published",
  "dropbox-paper-desktop": "published",
  "dropbox-paper-marketing-page": "published",
  "dropbox-paper-templates": "published",
};

function getPrototypeLifecycle(section: LegacyProjectSection) {
  if (section.prototype_lifecycle) {
    return section.prototype_lifecycle;
  }

  const explicitLifecycle = prototypeLifecycleBySectionId[section.section_id];

  if (explicitLifecycle) {
    return explicitLifecycle;
  }

  if (section.prototype_type === "iframe" && section.prototype_open_url) {
    return "blocked";
  }

  if (section.right_panel.fallback_component) {
    return "local-preview";
  }

  return "planned";
}

function getPrototypeBacklog(sectionId: string): PrototypeBacklog | null {
  const backlog = prototypeBacklogBySectionId[sectionId];

  if (!backlog) {
    return null;
  }

  return {
    ...backlog,
    publishChecklist: DEFAULT_PUBLISH_CHECKLIST,
  };
}

function getPrototypeDeploymentTarget(
  sectionId: string,
): PrototypeDeploymentTarget | null {
  const embeddedUrl = embeddedPrototypeUrls[sectionId];

  if (embeddedUrl) {
    return {
      intendedVercelProject: "danilo-callejas-portfolio",
      expectedStableUrl: `${PORTFOLIO_PRODUCTION_ORIGIN}${embeddedUrl}`,
      sourceWorkspace:
        localPrototypeTargets[sectionId]?.workspace ??
        retiredPrototypeDeployments[sectionId]?.sourceWorkspace ??
        null,
      healthPath: embeddedUrl,
    };
  }

  return getPrototypeBacklog(sectionId);
}

function normalizeProjectSection(section: LegacyProjectSection): ProjectSection {
  const prototypeSource = section.prototype_type;
  const retiredDeployment =
    retiredPrototypeDeployments[section.section_id] ?? null;
  const embeddedUrl = embeddedPrototypeUrls[section.section_id] ?? null;
  const prototypeEmbedUrl = embeddedUrl
    ? embeddedUrl
    : retiredDeployment
      ? null
      : section.prototype_embed_url;
  const prototypeOpenUrl = embeddedUrl
    ? embeddedUrl
    : retiredDeployment
      ? null
      : (section.prototype_open_url ?? null);
  const prototypeLifecycle = getPrototypeLifecycle(section);
  const prototypeBacklog = getPrototypeBacklog(section.section_id);

  return {
    ...section,
    show_on_homepage: section.show_on_homepage ?? true,
    prototype: {
      source: prototypeSource,
      slug: section.section_id,
      embedUrl: prototypeEmbedUrl,
      openUrl: prototypeOpenUrl,
      frameSurface:
        section.prototype_frame_surface ??
        prototypeFrameSurfaceByCompany[section.company] ??
        null,
      frameScale: section.prototype_frame_scale ?? null,
      fallbackComponent: section.right_panel.fallback_component,
      lifecycle: prototypeLifecycle,
      status: prototypeLifecycle,
      allowPreviewEmbed:
        prototypeLifecycle === "published" &&
        prototypeSource === "iframe" &&
        Boolean(prototypeEmbedUrl),
      posterImage: section.case_study_gallery?.[0] ?? null,
      deployment: getPrototypeDeploymentTarget(section.section_id),
      backlog: prototypeBacklog,
      localDev: localPrototypeTargets[section.section_id] ?? null,
    },
    right_panel: {
      loading_label: section.right_panel.loading_label,
      allow_expand: section.right_panel.allow_expand,
      expand_label: section.right_panel.expand_label,
    },
  };
}

const legacyPortfolioSections = [
  {
    section_id: "opendoor-seller-experience",
    section_type: "project",
    company: "Opendoor",
    role: "Staff Product Designer",
    title: "Seller Experience",
    time_period: "2024-Present",
    discipline_tags: ["product"],
    summary:
      "I broadened the earliest seller journey from a quick value check into a steadier experience built around readiness, trust, and clearer next steps.",
    problem:
      "A valuation alone did not move people. Sellers needed enough context and reassurance to understand their options before they were ready to act.",
    what_i_did: [
      "Shaped the end-to-end seller journey from first signal through guided action.",
      "Clarified trust-building moments around readiness, pricing, and support.",
      "Used prototyping to test calmer ways into higher-stakes decisions.",
    ],
    impact_metrics: [
      "Expanded the value story beyond an estimate",
      "Clearer bridge from curiosity to action",
      "More trust-building seller path",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    notes:
      "Published as a same-origin portfolio embed from the current Seller Experience prototype workspace.",
    accent: "warm mineral, calm, residential",
    case_study_gallery: [
      {
        src: "/case-studies/opendoor/seller-cover-3.jpg",
        alt: "Opendoor seller experience overview screens.",
      },
    ],
    left_panel: {
      eyebrow_label: "Opendoor",
      short_title: "A steadier decision path from curiosity to action.",
      short_summary:
        "A steadier seller path built around readiness, trust, and a clearer next step.",
      why_it_mattered:
        "The product became more useful earlier, before a seller was ready to fully commit.",
    },
    right_panel: {
      fallback_component: "OpendoorSellerDemo",
      loading_label: "Loading seller prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "opendoor-home-insights",
    section_type: "project",
    company: "Opendoor",
    role: "Staff Product Designer",
    title: "Home Insights",
    time_period: "2024-Present",
    discipline_tags: ["product"],
    summary:
      "Most homeowners want to know what their home is worth, but other tools stop there. Home Insights paired value with market context so curiosity could turn into confidence.",
    problem:
      "An estimate without explanation leaves people stalled. The product needed to show what the number meant, what was changing in the market, and whether it was worth acting on.",
    what_i_did: [
      "Designed a clear view of home value, market trends, and surrounding signals.",
      "Organized valuation context so the product felt more informative than transactional.",
      "Defined prototype directions for turning casual curiosity into a clearer next step.",
    ],
    impact_metrics: [
      "Turned casual curiosity into confidence",
      "Clearer view of home worth and market trends",
      "Better setup for guided next steps",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    notes:
      "The former standalone Home Insights prototype has been retired from Vercel. Public portfolio pages use the curated fallback until this work is rebuilt as a same-origin portfolio embed.",
    accent: "warm mineral, architectural, quiet",
    case_study_gallery: [
      {
        src: "/case-studies/opendoor/home-insights.jpg",
        alt: "Opendoor Home Insights market and valuation screens.",
      },
    ],
    left_panel: {
      eyebrow_label: "Opendoor",
      short_title: "Value needed to feel legible, not abstract.",
      short_summary:
        "A clear view of home worth and market trends, not just another estimate.",
      why_it_mattered:
        "Value only becomes useful when people can read it well enough to make a decision.",
    },
    right_panel: {
      fallback_component: "OpendoorHomeInsightsDemo",
      loading_label: "Loading home insights prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "opendoor-agent-led-offers-tooling-platform",
    section_type: "project",
    company: "Opendoor",
    product_line: "Agent operations",
    role: "Staff Product Designer",
    title: "Agent led offers",
    time_period: "2024-Present",
    discipline_tags: ["product", "internal-tools"],
    summary:
      "Even with strong digital tools, sellers still want human guidance. I designed the agent-led offers workflow so pricing, assessment, options, and follow-through lived in one clearer system.",
    problem:
      "Partner agents were juggling fragmented tools while sellers needed earlier support. The product had to connect guidance, offers, and next steps without creating more handoff friction.",
    what_i_did: [
      "Structured the workflow around active cases, offers, priorities, and communication.",
      "Clarified how partner agents should move from pricing and assessment into action.",
      "Used prototyping to shape a more coherent operational product system.",
    ],
    impact_metrics: [
      "Better agent workflow visibility",
      "Stronger bridge between digital and human guidance",
      "More coherent operational surface",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    notes:
      "The former standalone agent-led offers dashboard has been retired from Vercel. Public portfolio pages use the curated fallback until this work is rebuilt as a same-origin portfolio embed.",
    accent: "warm mineral, operational, calm",
    case_study_gallery: [
      {
        src: "/case-studies/opendoor/agent-led-offers.png",
        alt: "Opendoor agent-led offers dashboard screen.",
      },
    ],
    left_panel: {
      eyebrow_label: "Opendoor",
      short_title: "Internal tooling treated with the same product rigor as customer-facing work.",
      short_summary:
        "A clearer workspace for active cases, offer movement, and next-step coordination.",
      why_it_mattered:
        "It treated the human side of the product with the same rigor as the customer-facing side.",
    },
    right_panel: {
      fallback_component: "OpendoorToolingDemo",
      loading_label: "Loading agent tooling prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "draftkings-global-switcher",
    section_type: "project",
    company: "DraftKings",
    role: "Product Designer",
    title: "Global Switcher",
    time_period: "2023-2024",
    discipline_tags: ["product"],
    summary:
      "When users want to move between events, they are limited in their options. I designed a switcher that made leagues, events, teams, and players easier to reach.",
    problem:
      "Crossing contexts still felt slower and more fragmented than it should in a live product.",
    what_i_did: [
      "Designed a clearer switching pattern between major product contexts.",
      "Reduced the navigation cost of moving across surfaces.",
      "Tested how a lighter global control could preserve orientation.",
    ],
    impact_metrics: [
      "Cleaner cross-surface movement",
      "Stronger orientation during mode changes",
      "More coherent global navigation layer",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    notes:
      "The former standalone Switchers prototype has been retired from Vercel. Public portfolio pages use the same-origin embedded Global Switcher event prototype.",
    accent: "ember, utility, focused",
    case_study_gallery: [
      {
        src: "/case-studies/draftkings/global-switcher.png",
        alt: "DraftKings global switcher concept.",
      },
    ],
    left_panel: {
      eyebrow_label: "DraftKings",
      short_title: "Switching contexts needed to feel easier and more deliberate.",
      short_summary:
        "A lighter switching pattern that reduced navigation friction without adding more chrome.",
      why_it_mattered:
        "Better movement across the product made the whole system feel more unified.",
    },
    right_panel: {
      fallback_component: "DraftKingsSportsbookDemo",
      loading_label: "Loading switcher prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "draftkings-betslip-redesign-migration",
    section_type: "project",
    company: "DraftKings",
    role: "Product Designer",
    title: "The Betslip",
    time_period: "2023-2024",
    discipline_tags: ["product"],
    summary:
      "During our codebase migration, I used the redesign window to address user concerns and improve how confidently people could place their bets.",
    problem:
      "The betslip is the core decision surface, and it had to get clearer and more reliable while the system beneath it was changing.",
    what_i_did: [
      "Redesigned hierarchy and pacing inside the betslip experience.",
      "Worked through migration constraints with product and engineering partners.",
      "Focused the flow on confidence, speed, and repeatable use.",
    ],
    impact_metrics: [
      "Improved usability during migration",
      "Cleaner hierarchy at placement time",
      "More dependable bet placement flow",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    notes:
      "The former standalone Betslip Migration prototype has been retired from Vercel. Public portfolio pages use the curated fallback until this work is rebuilt as a same-origin portfolio embed.",
    accent: "ember, stadium black, sharp",
    case_study_gallery: [
      {
        src: "/case-studies/draftkings/betslip-redesign.png",
        alt: "DraftKings betslip redesign screens.",
      },
    ],
    left_panel: {
      eyebrow_label: "DraftKings",
      short_title: "Speed mattered, but the redesign still had to feel composed.",
      short_summary:
        "A clearer betslip shaped during migration, not after it.",
      why_it_mattered:
        "When the betslip becomes clearer, the entire product feels faster.",
    },
    right_panel: {
      fallback_component: "DraftKingsSportsbookDemo",
      loading_label: "Loading betslip prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "draftkings-quick-betslip",
    section_type: "project",
    company: "DraftKings",
    role: "Product Designer",
    title: "Quick Betslip",
    time_period: "2023-2024",
    discipline_tags: ["product"],
    summary:
      "Users often struggle to place successive bets quickly. Quick Betslip kept discovery and entry moving without making the flow feel disposable.",
    problem:
      "Repeat bettors needed a lighter path into the next bet without losing the context that keeps the action trustworthy.",
    what_i_did: [
      "Explored compact betslip patterns for repeat action.",
      "Balanced reduced friction with enough confidence-building detail.",
      "Prototyped simpler summary states for rapid entry.",
    ],
    impact_metrics: [
      "Faster entry into a decision",
      "Reduced interface friction",
      "More compact repeat-use pattern",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    accent: "ember, focused, compact",
    case_study_gallery: [
      {
        src: "/case-studies/draftkings/quick-betslip.png",
        alt: "DraftKings quick betslip flow.",
      },
    ],
    left_panel: {
      eyebrow_label: "DraftKings",
      short_title: "The slip needed to feel lighter without feeling risky.",
      short_summary:
        "A faster-entry pattern that kept the essential context close to the action.",
      why_it_mattered:
        "In live sports contexts, a moment lost is usually a bet lost.",
    },
    right_panel: {
      fallback_component: "DraftKingsSportsbookDemo",
      loading_label: "Loading quick betslip prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "draftkings-player-pages",
    section_type: "project",
    company: "DraftKings",
    role: "Product Designer",
    title: "Player Pages",
    time_period: "2023-2024",
    discipline_tags: ["product"],
    summary:
      "Users often find it challenging to discover specific players and their available prop bets. Player Pages brought browsing and placement into one place.",
    problem:
      "Fans think in terms of players, but the product still made them hunt through markets to find the right prop.",
    what_i_did: [
      "Explored player-led entry points and supporting page structure.",
      "Organized props, signals, and context around a single athlete view.",
      "Used prototyping to test a more discoverable player surface.",
    ],
    impact_metrics: [
      "More direct player-led discovery",
      "Clearer athlete-specific context",
      "Better product storytelling",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    accent: "ember, information-dense, precise",
    case_study_gallery: [
      {
        src: "/case-studies/draftkings/player-pages.png",
        alt: "DraftKings player pages concept.",
      },
    ],
    left_panel: {
      eyebrow_label: "DraftKings",
      short_title: "The product needed a stronger player-led path.",
      short_summary:
        "A player-first path that matched the way many fans actually browse the action.",
      why_it_mattered:
        "It connected browsing behavior more closely to real user intent.",
    },
    right_panel: {
      fallback_component: "DraftKingsSportsbookDemo",
      loading_label: "Loading player pages prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "draftkings-pools-one-and-done",
    section_type: "project",
    company: "DraftKings",
    role: "Product Designer",
    title: "Pools: One & Done",
    time_period: "2023-2024",
    discipline_tags: ["product"],
    summary:
      "One & Done introduced a new way to join and compete in golf contests, designed to meet the growing demand for pooled fantasy formats on DraftKings.",
    problem:
      "The mode had its own rules and rhythm, but it still needed to feel native to the broader product rather than bolted on.",
    what_i_did: [
      "Explored how pools could feel self-contained without feeling disconnected.",
      "Clarified participation states, rules, and entry moments.",
      "Prototyped a lighter, more confident framing for the format.",
    ],
    impact_metrics: [
      "Clearer game-mode framing",
      "More approachable participation flow",
      "Better integration with the parent product",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    notes:
      "The former standalone Pools One & Done prototype has been retired from Vercel. Public portfolio pages use the curated fallback until this work is rebuilt as a same-origin portfolio embed.",
    accent: "ember, mode-shift, composed",
    show_on_homepage: false,
    case_study_gallery: [
      {
        src: "/case-studies/draftkings/pools-one-and-done.png",
        alt: "DraftKings One and Done pools experience.",
      },
    ],
    left_panel: {
      eyebrow_label: "DraftKings",
      short_title: "A special format still had to feel like part of the system.",
      short_summary:
        "A distinct contest mode that still felt at home inside the system.",
      why_it_mattered:
        "The best mode switch is one that teaches itself quickly.",
    },
    right_panel: {
      fallback_component: "DraftKingsSportsbookDemo",
      loading_label: "Loading pools prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "draftkings-player-props-stats-scores",
    section_type: "project",
    company: "DraftKings",
    role: "Product Designer",
    title: "Player Props: Stats & Scores",
    time_period: "2023-2024",
    discipline_tags: ["product"],
    summary:
      "When bettors want to place props, they often leave the app to check stats and score history. I brought that context closer to the decision.",
    problem:
      "Supporting evidence was valuable, but it had to stay readable enough to help rather than overwhelm.",
    what_i_did: [
      "Designed lighter ways to pair props with supporting stats and live context.",
      "Explored tighter hierarchy for evidence and action.",
      "Tested how supporting data could stay close without becoming noisy.",
    ],
    impact_metrics: [
      "Stronger data-to-action bridge",
      "More readable supporting context",
      "Better confidence in props browsing",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    notes:
      "The former standalone Player Props prototype has been retired from Vercel. Public portfolio pages now use the same-origin embedded Player Stats & Scores prototype.",
    accent: "ember, analytical, sharp",
    case_study_gallery: [
      {
        src: "/case-studies/draftkings/player-props-stats-scores.png",
        alt: "DraftKings player props stats and scores concept.",
      },
    ],
    left_panel: {
      eyebrow_label: "DraftKings",
      short_title: "The trick was adding context without adding drag.",
      short_summary:
        "Props paired with just enough stats and history to support the decision.",
      why_it_mattered:
        "Well-placed context can increase confidence without slowing the user down.",
    },
    right_panel: {
      fallback_component: "DraftKingsSportsbookDemo",
      loading_label: "Loading stats and scores prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "draftkings-baseball-play-by-play",
    section_type: "project",
    company: "DraftKings",
    role: "Product Designer",
    title: "Baseball Play by Play",
    time_period: "2023-2024",
    discipline_tags: ["product"],
    show_on_homepage: false,
    summary:
      "After placing bets, users often close the app to follow the game elsewhere. I designed a live baseball surface that kept the action and the product in the same place.",
    problem:
      "Baseball has a different cadence, and the live experience needed to respect that rhythm instead of flattening it.",
    what_i_did: [
      "Explored play-by-play framing for baseball-specific moments.",
      "Designed a clearer relationship between current action and available choices.",
      "Worked through timing, density, and composure in a live context.",
    ],
    impact_metrics: [
      "More legible live baseball pacing",
      "Clearer moment-to-market relationship",
      "Better sport-specific context",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    notes:
      "The former standalone Baseball Play by Play prototype has been retired from Vercel. Public portfolio pages use the curated fallback until this work is rebuilt as a same-origin portfolio embed.",
    accent: "ember, live, sequenced",
    case_study_gallery: [
      {
        src: "/case-studies/draftkings/baseball-play-by-play.png",
        alt: "DraftKings baseball play-by-play concept.",
      },
    ],
    left_panel: {
      eyebrow_label: "DraftKings",
      short_title: "The pace of the sport needed to shape the interface.",
      short_summary:
        "A live baseball surface designed around the cadence of the sport.",
      why_it_mattered:
        "When the UI respects the rhythm of the game, the product feels smarter.",
    },
    right_panel: {
      fallback_component: "DraftKingsSportsbookDemo",
      loading_label: "Loading play by play prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "coinbase-pay-tab-architecture",
    section_type: "project",
    company: "Coinbase",
    role: "Product Designer",
    title: "Pay Tab Architecture",
    time_period: "2021-2023",
    discipline_tags: ["product"],
    summary:
      "As new users entered the space, they needed help understanding what crypto could do for them. The Pay tab became the home for everyday transactions and new use cases.",
    problem:
      "Coinbase had useful pay behaviors, but the product still made them feel secondary to buying and holding.",
    what_i_did: [
      "Helped define a more coherent architectural home for pay-related actions.",
      "Organized money movement around clearer intent and destination models.",
      "Explored how structure alone could teach utility more effectively.",
    ],
    impact_metrics: [
      "Stronger utility framing",
      "Clearer action architecture",
      "More legible money-movement model",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    accent: "cool utility blue, precise, calm",
    case_study_gallery: [
      {
        src: "/case-studies/coinbase/pay-tab-architecture.jpg",
        alt: "Coinbase pay tab architecture flow.",
      },
    ],
    left_panel: {
      eyebrow_label: "Coinbase",
      short_title: "Utility needed its own clear home in the product.",
      short_summary:
        "A clearer home for everyday crypto actions inside the product.",
      why_it_mattered:
        "The IA itself became part of how the product explained its value.",
    },
    right_panel: {
      fallback_component: "CoinbasePaymentsDemo",
      loading_label: "Loading pay tab prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "coinbase-crypto-payroll",
    section_type: "project",
    company: "Coinbase",
    role: "Product Designer",
    title: "Crypto Payroll",
    time_period: "2021-2023",
    discipline_tags: ["product"],
    summary:
      "When people struggle with their traditional banks, Crypto Payroll lets workers take a first step into economic freedom by getting paid in up to five cryptocurrencies.",
    problem:
      "Payroll asked people to adopt a much bigger behavior than a one-off transfer, so the setup had to feel especially calm and trustworthy.",
    what_i_did: [
      "Explored recurring allocation and setup flows for payroll use cases.",
      "Simplified the relationship between recurring pay and asset choice.",
      "Prototyped ways to make the product feel clearer at setup time.",
    ],
    impact_metrics: [
      "Clearer recurring-pay framing",
      "More understandable setup pattern",
      "Stronger everyday-use story",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    accent: "cool blue, utility, measured",
    case_study_gallery: [
      {
        src: "/case-studies/coinbase/crypto-payroll.jpg",
        alt: "Coinbase crypto payroll setup screens.",
      },
    ],
    left_panel: {
      eyebrow_label: "Coinbase",
      short_title: "Recurring money movement had to feel simple, not experimental.",
      short_summary:
        "A payroll setup flow designed to feel trustworthy, legible, and practical.",
      why_it_mattered:
        "A calmer setup flow helped a new behavior feel more plausible.",
    },
    right_panel: {
      fallback_component: "CoinbasePaymentsDemo",
      loading_label: "Loading payroll prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "coinbase-crypto-gifting",
    section_type: "project",
    company: "Coinbase",
    role: "Product Designer",
    title: "Crypto Gifting",
    time_period: "2021-2023",
    discipline_tags: ["product"],
    summary:
      "As more people discover crypto, they are still figuring out what to do with it. Crypto Gifting turned peer-to-peer gifting into a more legible everyday use case.",
    problem:
      "Gifting only works if it feels lightweight and self-explanatory, especially for people who are not already fluent in crypto.",
    what_i_did: [
      "Explored gifting as a simpler, more social money-movement behavior.",
      "Designed clearer framing for recipients, amount, and intent.",
      "Prototyped more human presentation layers around transfer setup.",
    ],
    impact_metrics: [
      "More approachable transfer framing",
      "Clearer recipient setup",
      "Better social-use narrative",
    ],
    prototype_type: "iframe",
    prototype_embed_url: null,
    prototype_open_url: null,
    accent: "mist blue, human, clear",
    case_study_gallery: [
      {
        src: "/case-studies/coinbase/crypto-gifting.jpg",
        alt: "Coinbase crypto gifting flow.",
      },
    ],
    left_panel: {
      eyebrow_label: "Coinbase",
      short_title: "The flow needed to feel social first, technical second.",
      short_summary:
        "A more human gifting flow that treated the transfer like an exchange, not a mechanism.",
      why_it_mattered:
        "Approachability opened the door to a less intimidating use case.",
    },
    right_panel: {
      fallback_component: "CoinbasePaymentsDemo",
      loading_label: "Loading gifting prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "coinbase-instant-sell",
    section_type: "project",
    company: "Coinbase",
    role: "Product Designer",
    title: "Instant Sell",
    time_period: "2021-2023",
    discipline_tags: ["product"],
    show_on_homepage: false,
    summary:
      "When users want to cash out directly to their bank, they cannot always do so easily. Instant Sell simplified the path from crypto to cash.",
    problem:
      "Cashing out carries higher trust demands than buying, so the path needed to get simpler without becoming opaque.",
    what_i_did: [
      "Simplified the sell and cash-out path around a clearer destination model.",
      "Reduced the amount of interface density around money movement decisions.",
      "Explored calmer confirmation patterns for off-ramp moments.",
    ],
    impact_metrics: [
      "Lower-friction cash-out story",
      "Clearer destination selection",
      "More direct sell experience",
    ],
    prototype_type: "iframe",
    prototype_embed_url: "/embedded-prototypes/dropbox-paper-templates/",
    prototype_open_url: "/embedded-prototypes/dropbox-paper-templates/",
    accent: "cool utility blue, calm, direct",
    case_study_gallery: [
      {
        src: "/case-studies/coinbase/instant-sell.jpg",
        alt: "Coinbase instant sell flow.",
      },
    ],
    left_panel: {
      eyebrow_label: "Coinbase",
      short_title: "Selling needed to feel clearer and more trustworthy.",
      short_summary:
        "A clearer off-ramp that made cashing out easier to understand at a glance.",
      why_it_mattered:
        "A simpler off-ramp made the product feel more usable in the real world.",
    },
    right_panel: {
      fallback_component: "CoinbasePaymentsDemo",
      loading_label: "Loading instant sell prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "dropbox-spaces-tasks",
    section_type: "project",
    company: "Dropbox",
    product_line: "Dropbox Spaces",
    role: "Product Designer",
    title: "Spaces Tasks",
    time_period: "2018-2019",
    discipline_tags: ["product"],
    summary:
      "Teams rely on tasks to coordinate work, but they are usually scattered. I helped make tasks a lightweight part of the workspace itself inside Dropbox Spaces.",
    problem:
      "When work is spread across files and conversations, it becomes hard to see what is moving, who owns it, and what is overdue.",
    what_i_did: [
      "Explored how tasks could live more naturally inside a workspace surface.",
      "Connected task state, project context, and ownership more closely.",
      "Designed calmer planning and detail views for team coordination.",
    ],
    impact_metrics: [
      "Stronger workspace narrative",
      "Better visibility into active work",
      "More connected planning model",
    ],
    prototype_type: "iframe",
    prototype_embed_url: "/embedded-prototypes/dropbox-spaces-tasks/",
    prototype_open_url: "/embedded-prototypes/dropbox-spaces-tasks/",
    accent: "pale slate, workspace calm, airy",
    case_study_gallery: [
      {
        src: `${dropboxSpacesCargoImageBase}/cover.jpg`,
        alt: "Dropbox Spaces 2.0 workspace hero image.",
      },
    ],
    case_study_sections: [
      {
        title: "Dropbox Spaces 2.0",
        summary:
          "Dropbox Spaces 2.0 is a virtual workspace that brings together teams and projects.",
        caption: "Dropbox Spaces launch cover image.",
        image: {
          src: `${dropboxSpacesCargoImageBase}/cover.jpg`,
          alt: "Dropbox Spaces 2.0 workspace hero image.",
          frameClassName:
            "aspect-[1200/519] bg-[linear-gradient(180deg,#eef2ee_0%,#fbfcfb_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Tasks Creation",
        summary:
          "When teams use tasks to coordinate work, they struggle to track and complete them because they are usually not in one place. I worked on creating a lightweight way for teams to track their tasks in one place to feel accountable, confident, and accomplished.",
        caption: "A slideshow of Dropbox Spaces task creation explorations.",
        presentation: "carousel",
        image: {
          src: `${dropboxSpacesCargoImageBase}/tasks-creation-1.jpg`,
          alt: "Dropbox Spaces task creation screen.",
          frameClassName: dropboxSpacesCargoMediaFrame,
          imageClassName: "object-cover",
        },
        slides: [
          {
            src: `${dropboxSpacesCargoImageBase}/tasks-creation-1.jpg`,
            alt: "Dropbox Spaces task creation screen.",
            frameClassName: dropboxSpacesCargoMediaFrame,
            imageClassName: "object-cover",
          },
          {
            src: `${dropboxSpacesCargoImageBase}/tasks-creation-2.jpg`,
            alt: "Dropbox Spaces task tracking screen.",
            frameClassName: dropboxSpacesCargoMediaFrame,
            imageClassName: "object-cover",
          },
          {
            src: `${dropboxSpacesCargoImageBase}/tasks-creation-3.jpg`,
            alt: "Dropbox Spaces task list and workspace screen.",
            frameClassName: dropboxSpacesCargoMediaFrame,
            imageClassName: "object-cover",
          },
          {
            src: `${dropboxSpacesCargoImageBase}/tasks-creation-4.jpg`,
            alt: "Dropbox Spaces task details screen.",
            frameClassName: dropboxSpacesCargoMediaFrame,
            imageClassName: "object-cover",
          },
        ],
      },
      {
        title: "Tasks on Content",
        summary:
          "When work revolves around content, it is not easy to align with others on what needs to get done. By bringing tasks closer to content and giving users the ability to create, prioritize, and delegate tasks from content, we enable teams to coordinate effectively.",
        caption: "A slideshow of tasks living closer to Dropbox Spaces content.",
        presentation: "carousel",
        image: {
          src: `${dropboxSpacesCargoImageBase}/tasks-on-content-1.jpg`,
          alt: "Dropbox Spaces content task screen.",
          frameClassName: dropboxSpacesCargoMediaFrame,
          imageClassName: "object-cover",
        },
        slides: [
          {
            src: `${dropboxSpacesCargoImageBase}/tasks-on-content-1.jpg`,
            alt: "Dropbox Spaces content task screen.",
            frameClassName: dropboxSpacesCargoMediaFrame,
            imageClassName: "object-cover",
          },
          {
            src: `${dropboxSpacesCargoImageBase}/tasks-on-content-2.jpg`,
            alt: "Dropbox Spaces task assignment on content.",
            frameClassName: dropboxSpacesCargoMediaFrame,
            imageClassName: "object-cover",
          },
          {
            src: `${dropboxSpacesCargoImageBase}/tasks-on-content-3.jpg`,
            alt: "Dropbox Spaces content coordination screen.",
            frameClassName: dropboxSpacesCargoMediaFrame,
            imageClassName: "object-cover",
          },
        ],
      },
      {
        title: "Task Responsiveness",
        summary:
          "To unblock teams and individuals and help deliver a more flexible and robust user experience, we maintained cohesiveness across platforms and devices so customers could use the product from any device and browser size they saw fit.",
        caption: "Responsive Dropbox Spaces task surfaces across device sizes.",
        image: {
          src: `${dropboxSpacesCargoImageBase}/task-responsiveness.jpg`,
          alt: "Dropbox Spaces responsive task screens.",
          frameClassName: dropboxSpacesCargoMediaFrame,
          imageClassName: "object-cover",
        },
      },
      {
        title: "Task Reminders",
        summary:
          "After tasks are assigned, it becomes increasingly difficult to keep track of them and know when they are due. To provide users with awareness, Spaces automatically reminded assignees when tasks were due or overdue across all spaces.",
        caption: "Dropbox Spaces task reminder experience.",
        image: {
          src: `${dropboxSpacesCargoImageBase}/task-reminders.jpg`,
          alt: "Dropbox Spaces task reminders screen.",
          frameClassName: dropboxSpacesCargoMediaFrame,
          imageClassName: "object-cover",
        },
      },
      {
        title: "Spaces Beta Request Page",
        summary:
          "Users who had recently become aware of Spaces needed a place to learn more and request the beta. We created a marketing page for the Spaces 2.0 launch to drive awareness and generate a pool of users to gather feedback.",
        caption: "Dropbox Spaces beta request page.",
        image: {
          src: `${dropboxSpacesCargoImageBase}/beta-request-page.jpg`,
          alt: "Dropbox Spaces beta request marketing page.",
          frameClassName: dropboxSpacesCargoMediaFrame,
          imageClassName: "object-cover",
        },
      },
      {
        title: "Spaces Overview Video",
        summary:
          "A short motion overview for the Dropbox Spaces 2.0 launch story.",
        caption: "Dropbox Spaces Vimeo overview.",
        presentation: "video-embed",
        embedUrl: "https://player.vimeo.com/video/507790102",
        embedTitle: "Dropbox Spaces overview video",
        frameClassName: "aspect-video bg-black",
      },
    ],
    left_panel: {
      eyebrow_label: "Dropbox",
      short_title: "Tasks were treated as part of the workspace, not a separate tool.",
      short_summary:
        "A lightweight task system designed to live where the work already was.",
      why_it_mattered:
        "It helped Dropbox feel more like a workspace and less like a file destination.",
    },
    right_panel: {
      fallback_component: "DropboxSpacesDemo",
      loading_label: "Loading spaces tasks prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "dropbox-paper-desktop",
    section_type: "project",
    company: "Dropbox",
    product_line: "Dropbox Paper",
    role: "Product Designer",
    title: "Paper Desktop",
    time_period: "2018-2021",
    discipline_tags: ["product"],
    summary:
      "I inherited a nascent Paper Desktop initiative and helped grow it into a more capable product around activation, search, and a more flexible desktop workflow.",
    problem:
      "The app needed to expand its features and user base without losing the clarity that made Paper feel approachable.",
    what_i_did: [
      "Designed desktop-first document and collaboration patterns.",
      "Balanced writing, planning, and lightweight project structure in one surface.",
      "Prototyped calmer detail and organization behaviors.",
    ],
    impact_metrics: [
      "Expanded the desktop product and its user base",
      "Stronger activation and search foundation",
      "More flexible workflow model",
    ],
    prototype_type: "iframe",
    prototype_embed_url: "/embedded-prototypes/dropbox-paper-desktop/",
    prototype_open_url: "/embedded-prototypes/dropbox-paper-desktop/",
    accent: "pale paper, editorial, structured",
    case_study_gallery: [
      {
        src: "/case-studies/dropbox/paper-desktop-1.jpg",
        alt: "Dropbox Paper Desktop activation experiment screens.",
      },
      {
        src: "/case-studies/dropbox/paper-desktop-2.jpg",
        alt: "Dropbox Paper Desktop search screens.",
      },
      {
        src: "/case-studies/dropbox/paper-desktop-3.jpg",
        alt: "Dropbox Paper Desktop beta page screens.",
      },
    ],
    left_panel: {
      eyebrow_label: "Dropbox",
      short_title: "The desktop product needed to feel flexible without turning diffuse.",
      short_summary:
        "A nascent desktop app grown into a more capable collaboration product.",
      why_it_mattered:
        "The desktop app made Paper easier to access, organize, and stay focused in.",
    },
    right_panel: {
      fallback_component: "DropboxPaperDemo",
      loading_label: "Loading paper desktop prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "dropbox-paper-marketing-page",
    section_type: "project",
    company: "Dropbox",
    product_line: "Dropbox Paper",
    role: "Product Designer",
    title: "Paper Marketing Page",
    time_period: "2018-2021",
    discipline_tags: ["marketing", "web-design"],
    summary:
      "I redesigned the Dropbox Paper marketing page to cut load time, sharpen the value story, and improve conversion.",
    problem:
      "Paper needed a faster, clearer external story that explained how the product actually worked.",
    what_i_did: [
      "Helped shape the page narrative and product framing for launch storytelling.",
      "Connected product behaviors to clearer external messaging.",
      "Balanced editorial clarity with product credibility.",
    ],
    impact_metrics: [
      "Load time reduced to under 3 seconds",
      "Up to 3% conversion lift",
      "Stronger external product story",
    ],
    prototype_type: "iframe",
    prototype_embed_url: "/embedded-prototypes/dropbox-paper-marketing-page/",
    prototype_open_url: "/embedded-prototypes/dropbox-paper-marketing-page/",
    accent: "pale paper, editorial, restrained",
    case_study_gallery: [
      {
        src: "/case-studies/dropbox/paper-marketing-1.jpg",
        alt: "Dropbox Paper marketing page redesign screen.",
      },
      {
        src: "/case-studies/dropbox/paper-marketing-2.jpg",
        alt: "Dropbox Paper marketing page supporting screen.",
      },
    ],
    left_panel: {
      eyebrow_label: "Dropbox",
      short_title: "The story had to sound like the product actually worked.",
      short_summary:
        "A sharper launch story with faster load times and stronger conversion.",
      why_it_mattered:
        "A more grounded launch story made the product easier to understand from the outside in.",
    },
    right_panel: {
      fallback_component: "DropboxPaperDemo",
      loading_label: "Loading paper marketing prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
  {
    section_id: "dropbox-paper-templates",
    section_type: "project",
    company: "Dropbox",
    product_line: "Dropbox Paper",
    role: "Product Designer",
    title: "Paper Templates",
    time_period: "2018-2021",
    discipline_tags: ["product", "marketing"],
    summary:
      "We shifted toward acquisition and activation by creating template packs and a template library designed around real user problems.",
    problem:
      "Too many people reached the editor without knowing how to start, so the product needed a more helpful and more opinionated on-ramp.",
    what_i_did: [
      "Explored template discovery, selection, and starting states.",
      "Designed a clearer relationship between template structure and user flexibility.",
      "Framed templates as momentum tools rather than fixed formats.",
    ],
    impact_metrics: [
      "Paper sign-up rate increased by 6%",
      "Lower-friction project starts",
      "Clearer structured entry points",
    ],
    prototype_type: "iframe",
    prototype_embed_url: "/embedded-prototypes/dropbox-paper-templates/",
    prototype_open_url: "/embedded-prototypes/dropbox-paper-templates/",
    accent: "pale paper, soft slate, clean",
    case_study_gallery: [
      {
        src: "/case-studies/dropbox/paper-templates-1.jpg",
        alt: "Dropbox Paper templates library page.",
      },
      {
        src: "/case-studies/dropbox/paper-templates-2.jpg",
        alt: "Dropbox Paper templates example screens.",
      },
    ],
    left_panel: {
      eyebrow_label: "Dropbox",
      short_title: "Starting well can matter as much as writing well.",
      short_summary:
        "Template packs and a library that made Paper easier to start.",
      why_it_mattered:
        "Good defaults helped the product feel helpful earlier in the workflow.",
    },
    right_panel: {
      fallback_component: "DropboxPaperDemo",
      loading_label: "Loading paper templates prototype",
      allow_expand: true,
      expand_label: "Open prototype",
    },
  },
] satisfies readonly LegacyProjectSection[];

export const portfolio_sections = legacyPortfolioSections.map(
  normalizeProjectSection,
) as readonly ProjectSection[];

export function getProjectByPrototypeSlug(slug: string) {
  return portfolio_sections.find((section) => section.prototype.slug === slug);
}

export function getRetiredPrototypeDeployment(slug: string) {
  return retiredPrototypeDeployments[slug] ?? null;
}

export function getPrototypeLifecycleLabel(lifecycle: PrototypeLifecycle) {
  switch (lifecycle) {
    case "published":
      return "Published";
    case "local-preview":
      return "Local preview";
    case "blocked":
      return "Embed blocked";
    case "planned":
    default:
      return "Rebuild planned";
  }
}

export function getLocalPrototypeUrl(target: PrototypeLocalDevTarget) {
  const path = target.path.startsWith("/") ? target.path : `/${target.path}`;

  return `http://localhost:${target.port}${path}`;
}

export function getPrototypeEmbedMode(
  configuredMode = process.env.NEXT_PUBLIC_PROTOTYPE_EMBED_MODE ?? "",
) {
  if (process.env.NODE_ENV !== "production" && configuredMode === "local") {
    return "local";
  }

  return "public";
}

export function shouldUseLocalPrototypeEmbed(
  prototype: Pick<ProjectSection["prototype"], "localDev">,
) {
  return getPrototypeEmbedMode() === "local" && Boolean(prototype.localDev);
}

export function getPrototypeFrameUrl(
  prototype: Pick<ProjectSection["prototype"], "embedUrl" | "localDev">,
) {
  if (shouldUseLocalPrototypeEmbed(prototype) && prototype.localDev) {
    return getLocalPrototypeUrl(prototype.localDev);
  }

  return prototype.embedUrl;
}

export function getPrototypeOpenUrl(
  prototype: Pick<ProjectSection["prototype"], "openUrl" | "localDev">,
) {
  if (shouldUseLocalPrototypeEmbed(prototype) && prototype.localDev) {
    return getLocalPrototypeUrl(prototype.localDev);
  }

  return prototype.openUrl;
}

export function getPrototypeFrameStatus(
  prototype: Pick<ProjectSection["prototype"], "status" | "localDev">,
) {
  if (shouldUseLocalPrototypeEmbed(prototype)) {
    return "published";
  }

  return prototype.status;
}

export function getPrototypeAllowPreviewEmbed(
  prototype: Pick<
    ProjectSection["prototype"],
    "allowPreviewEmbed" | "localDev"
  >,
) {
  if (shouldUseLocalPrototypeEmbed(prototype)) {
    return true;
  }

  return prototype.allowPreviewEmbed;
}

export function getPrototypeFrameSourceType(
  prototype: Pick<ProjectSection["prototype"], "source" | "localDev">,
) {
  if (shouldUseLocalPrototypeEmbed(prototype)) {
    return "iframe";
  }

  return prototype.source === "iframe" ? "iframe" : "component";
}

export function getPrototypeMetaLabel(
  project: Pick<ProjectSection, "prototype">,
  counterLabel: string,
) {
  if (shouldUseLocalPrototypeEmbed(project.prototype)) {
    return `${counterLabel} / Local preview`;
  }

  if (project.prototype.lifecycle === "published") {
    return counterLabel;
  }

  return `${counterLabel} / ${getPrototypeLifecycleLabel(project.prototype.lifecycle)}`;
}

export function getProjectCounterLabel(
  project: Pick<ProjectSection, "company" | "section_id">,
) {
  const companyProjects = portfolio_sections.filter(
    (section) => section.company === project.company,
  );
  const projectIndex = companyProjects.findIndex(
    (section) => section.section_id === project.section_id,
  );

  const index = projectIndex >= 0 ? projectIndex + 1 : 1;
  const total = Math.max(companyProjects.length, 1);

  return `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}
