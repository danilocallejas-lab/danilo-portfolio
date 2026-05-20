export const embeddedPrototypeTargets = [
  {
    slug: "opendoor-seller-experience",
    label: "Opendoor Seller Experience",
    type: "next",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/opendoor/seller-experience",
    entryPath: "/hub/",
  },
  {
    slug: "opendoor-home-insights",
    label: "Opendoor Home Insights",
    type: "next",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/opendoor/home-insights",
    entryPath: "/hub/",
  },
  {
    slug: "opendoor-agent-led-offers-tooling-platform",
    label: "Opendoor Agent Led Offers",
    type: "vite",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/opendoor/agent-led-offers-tooling-platform/web",
    entryPath: "/?embed=1",
  },
  {
    slug: "draftkings-betslip-redesign-migration",
    label: "DraftKings Betslip Migration",
    type: "next",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/betslip-redesign-migration",
    entryPath: "/",
  },
  {
    slug: "draftkings-quick-betslip",
    label: "DraftKings Quick Betslip",
    type: "next",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/quick-betslip",
    entryPath: "/",
  },
  {
    slug: "draftkings-player-pages",
    label: "DraftKings Player Pages",
    type: "next",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/player-pages",
    entryPath: "/",
  },
  {
    slug: "draftkings-global-switcher",
    label: "DraftKings Global Switcher",
    type: "next",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/global-switcher",
    entryPath: "/events/new-orleans-pelicans-at-sacramento-kings/",
  },
  {
    slug: "draftkings-pools-one-and-done",
    label: "DraftKings Pools One And Done",
    type: "next",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/pools-one-and-done",
    entryPath: "/",
  },
  {
    slug: "draftkings-player-props-stats-scores",
    label: "DraftKings Player Props",
    type: "next",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/player-props-stats-scores",
    entryPath: "/",
    presentation: "framed",
  },
  {
    slug: "draftkings-baseball-play-by-play",
    label: "DraftKings Baseball Play By Play",
    type: "next",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/draftkings/baseball-play-by-play",
    entryPath: "/",
  },
  {
    slug: "coinbase-pay-tab-architecture",
    label: "Coinbase Pay Tab",
    type: "expo",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/coinbase/pay-tab/react-native-app",
    entryPath: "/",
  },
  {
    slug: "coinbase-crypto-payroll",
    label: "Coinbase Crypto Payroll",
    type: "next",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/coinbase/crypto-payroll",
    entryPath: "/",
  },
  {
    slug: "coinbase-crypto-gifting",
    label: "Coinbase Crypto Gifting",
    type: "next",
    workspace:
      "/Users/redeemer/Desktop/danilo-prototypes/coinbase/p2p-gifting",
    entryPath: "/",
    presentation: "phone-only",
  },
  {
    slug: "dropbox-spaces-tasks",
    label: "Dropbox Spaces Tasks",
    type: "next",
    workspace: "/Users/redeemer/Desktop/danilo-prototypes/dropbox/spaces-tasks",
    entryPath: "/",
    presentation: "framed",
  },
  {
    slug: "dropbox-paper-desktop",
    label: "Dropbox Paper Desktop",
    type: "next",
    workspace: "/Users/redeemer/Desktop/danilo-prototypes/dropbox/paper-desktop",
    entryPath: "/",
    presentation: "framed",
  },
];

export const retiredPrototypeHosts = [
  "opendoor-seller-prototype.vercel.app",
  "opendoor-home-insights-prototype.vercel.app",
  "opendoor-cargo-prototype.vercel.app",
  "draftkings-quick-betslip.vercel.app",
  "player-pages.vercel.app",
  "draftkings-switchers-prototype.vercel.app",
  "draftkings-betslip-migration.vercel.app",
  "draftkings-pools-one-and-done.vercel.app",
  "draftkings-player-props.vercel.app",
  "draftkings-baseball-play-by-play.vercel.app",
  "react-native-app-rho.vercel.app",
];

export function getEmbeddedPrototypeBasePath(slug) {
  return `/embedded-prototypes/${slug}`;
}

export function getEmbeddedPrototypeUrlPath(target) {
  return `${getEmbeddedPrototypeBasePath(target.slug)}${target.entryPath}`;
}
