export type ProjectSection = {
  title: string;
  summary: string;
  caption: string;
  image: {
    src: string;
    alt: string;
    frameClassName?: string;
    imageClassName?: string;
  };
};

export type FeaturedProject = {
  slug: string;
  title: string;
  company: string;
  category: string;
  year: string;
  era: string;
  roomLabel: string;
  galleryNote: string;
  teaser: string;
  role: string;
  collaborators: string[];
  thesis: string;
  overview: string;
  problem: string;
  constraints: string[];
  designStrategy: string;
  outcomes: string[];
  reflection: string;
  wallTone: "sand" | "ember" | "cobalt" | "sage" | "sunset" | "espresso";
  cover: {
    src: string;
    alt: string;
    frameClassName?: string;
    imageClassName?: string;
  };
  sections: ProjectSection[];
};

export type ArchiveProject = {
  title: string;
  company: string;
  category: string;
  year: string;
  summary: string;
  href?: string;
  image?: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  years: string;
  focus: string;
  href?: string;
};

export const siteIntro = {
  title: "Danilo Callejas",
  statement:
    "Selected work from Opendoor, DraftKings, Coinbase, Dropbox, Apple, and Bellwether.",
  summary:
    "This branch turns the portfolio into a text-first work index and continuous editorial feed: less staging, less chrome, and faster access to the work itself.",
  instruction:
    "Use the left index to jump, then open any case study from the feed.",
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "opendoor",
    title: "Opendoor",
    company: "Opendoor",
    category: "Seller experience",
    year: "2024-Present",
    era: "Current work",
    roomLabel: "North wall",
    galleryNote: "A quiet opening room about trust, guidance, and the decision to sell.",
    teaser:
      "Expanding home selling from a single estimate into a trust-building system of insight, guidance, and agent-enabled action.",
    role: "Staff Product Designer",
    collaborators: [
      "Brandon Applefield",
      "Nicci Pearson",
      "Matt Shearon",
    ],
    thesis:
      "Move Opendoor beyond a price-checking moment and into a more confidence-building selling experience that supports both homeowners and partner agents.",
    overview:
      "Opendoor is a digital real estate platform that makes selling feel more simple and certain. The work focused on shaping a fuller path: from valuation and market clarity, to agent-assisted trust, to tools that help agents manage offers and follow-through.",
    problem:
      "Most sellers start with one anxious question: what is my home worth? Most products answer that question and stop. The bigger challenge is helping people feel informed enough to actually move.",
    constraints: [
      "Trust is fragile in real estate, especially when the product crosses from self-serve to human guidance.",
      "The system had to support multiple selling paths without making the experience feel fragmented.",
      "New surfaces had to work for two audiences at once: homeowners making decisions and agents managing active pipelines.",
    ],
    designStrategy:
      "Treat the experience as a sequence instead of a collection of isolated tools: insight first, then guided action, then an agent workspace that sustains momentum after the initial decision.",
    outcomes: [
      "Expanded the value proposition from valuation into selling readiness and market context.",
      "Created clearer bridges between self-serve exploration and agent-assisted support.",
      "Helped shape a more durable system that improved clarity for sellers and efficiency for agents.",
    ],
    reflection:
      "This work pushed me to think in systems without losing tone. In high-stakes product spaces, the interface has to feel calm enough to trust and sharp enough to move people forward.",
    wallTone: "sand",
    cover: {
      src: "/images/projects/opendoor-cover.jpg",
      alt: "Opendoor seller experience cover artwork.",
      frameClassName:
        "aspect-[16/10] bg-[linear-gradient(180deg,#f7f0e8_0%,#fbf7f2_100%)]",
      imageClassName: "object-cover",
    },
    sections: [
      {
        title: "Home Insights",
        summary:
          "A clearer view of home value and market movement turned casual curiosity into something closer to confidence.",
        caption:
          "Worth and context mattered more than a single number. The surface had to signal what is happening now, not just what happened last month.",
        image: {
          src: "/images/projects/opendoor-home-insights.jpg",
          alt: "Opendoor Home Insights product surface.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#f2ede6_0%,#fcfbf8_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Agent Led Offers",
        summary:
          "Kitchen Table connected sellers with partner agents early, giving the product a more human layer exactly where trust was most fragile.",
        caption:
          "The goal was not to abandon digital flow, but to make the right human touch feel native to the system instead of bolted on.",
        image: {
          src: "/images/projects/opendoor-alo.png",
          alt: "Opendoor Agent Led Offers product concept.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#eef1f7_0%,#fbfbfd_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Opendoor Key Agent",
        summary:
          "A unified workspace for agents brought leads, offers, and communication into one place so the human side of the system could actually scale.",
        caption:
          "Agents were already doing the work. The product opportunity was to remove the tool friction around them.",
        image: {
          src: "/images/projects/opendoor-key-agent.jpg",
          alt: "Opendoor agent workspace interface.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#eef1f6_0%,#fcfcfc_100%)]",
          imageClassName: "object-cover",
        },
      },
    ],
  },
  {
    slug: "draftkings",
    title: "DraftKings",
    company: "DraftKings",
    category: "Sportsbook product design",
    year: "2023-2024",
    era: "Current work",
    roomLabel: "East turn",
    galleryNote: "A sharper, hotter room about pace, confidence, and live decisions.",
    teaser:
      "Making betting faster, clearer, and more resilient across migration work, high-frequency behavior, and live decision-making.",
    role: "Product Designer",
    collaborators: [
      "Aaron Tenbuuren",
      "Hadas Liberman",
      "Mary Feuersanger",
      "Gavin Ueland",
    ],
    thesis:
      "Reduce friction in the most time-sensitive parts of the sportsbook experience, especially where users are deciding, editing, and placing bets under pressure.",
    overview:
      "DraftKings is a digital sports entertainment and gaming company offering fantasy sports contests and sports betting. The work spanned core interaction surfaces that needed to be faster, more legible, and more forgiving under live conditions.",
    problem:
      "Sports betting amplifies every weak interaction. If discovery is slow or the betslip is confusing, users do not simply notice it, they miss the moment entirely.",
    constraints: [
      "The work happened during a codebase migration, so improvements had to land without adding fragility.",
      "Live sports contexts create extremely short decision windows and high emotional pressure.",
      "Features needed to improve both experienced bettors' speed and newer users' confidence.",
    ],
    designStrategy:
      "Focus on the highest-friction surfaces where hesitation breaks momentum: the betslip, repeat betting, and player-specific discovery. Make the system feel lighter without making it feel shallow.",
    outcomes: [
      "Modernized the betslip during migration rather than treating migration as a purely technical exercise.",
      "Improved the speed of successive betting and player-led discovery.",
      "Strengthened product clarity in places where users previously had to leave the app for context.",
    ],
    reflection:
      "DraftKings sharpened my sense of pace. Product quality here was inseparable from timing, and the best design decisions were the ones that protected momentum without creating noise.",
    wallTone: "ember",
    cover: {
      src: "/images/projects/draftkings-cover.jpeg",
      alt: "DraftKings sportsbook cover artwork.",
      frameClassName:
        "aspect-[16/10] bg-[linear-gradient(180deg,#f6f1eb_0%,#fbfaf6_100%)]",
      imageClassName: "object-cover",
    },
    sections: [
      {
        title: "Betslip Redesign",
        summary:
          "The migration window became the right moment to clean up decision-making, information hierarchy, and placement confidence inside the betslip.",
        caption:
          "The redesign was not just cosmetic. It reduced hesitation inside the most consequential screen in the product.",
        image: {
          src: "/images/projects/draftkings-betslip-redesign.png",
          alt: "DraftKings betslip redesign.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#f0efe7_0%,#faf9f5_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Quick Betslip",
        summary:
          "Quick Betslip was designed for successive action, keeping users in rhythm instead of forcing them to restart their flow after every bet.",
        caption:
          "Speed mattered, but so did confidence. The interaction had to feel immediate without feeling reckless.",
        image: {
          src: "/images/projects/draftkings-quick-betslip.png",
          alt: "DraftKings quick betslip interface.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#f3f2ee_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Player Pages",
        summary:
          "Player-led pages made prop discovery more direct, letting bettors move from curiosity to action without hunting across disconnected surfaces.",
        caption:
          "The experience had to keep context close to the choice. Good discovery was really a wayfinding problem wearing a sports layer.",
        image: {
          src: "/images/projects/draftkings-player-pages.png",
          alt: "DraftKings player pages product surface.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#f4f1ee_0%,#fcfbf8_100%)]",
          imageClassName: "object-cover",
        },
      },
    ],
  },
  {
    slug: "coinbase",
    title: "Coinbase",
    company: "Coinbase",
    category: "Payments and everyday crypto",
    year: "2021-2023",
    era: "Current work",
    roomLabel: "East gallery",
    galleryNote: "A cooler room about turning abstract crypto value into daily utility.",
    teaser:
      "Framing crypto as an everyday tool by building clearer product pathways for paying, cashing out, and trying new financial behaviors.",
    role: "Product Designer",
    collaborators: ["Joey Isaacson", "Daniel Salgado", "Angela Don"],
    thesis:
      "Help more people understand what crypto is for in daily life, not just how to buy it, watch it, or hold it.",
    overview:
      "Coinbase is a digital currency exchange and wallet where users can buy, sell, and store thousands of assets. My focus centered on product surfaces that turned abstract crypto value into practical, everyday use cases.",
    problem:
      "New users often understand crypto as an asset class before they understand it as a product behavior. Without meaningful use cases, interest stalls quickly.",
    constraints: [
      "The product needed to educate and activate at the same time.",
      "Trust and clarity mattered because the flows touched money movement, payroll, and bank connections.",
      "New use cases had to feel understandable for newcomers without oversimplifying a complex system.",
    ],
    designStrategy:
      "Use the Pay tab as an architectural anchor for everyday utility, then design specific on-ramps that show crypto as something people can actually do things with.",
    outcomes: [
      "Clarified the role of the Pay surface as a home for practical crypto behaviors.",
      "Created entry points for payroll, gifting, and direct bank cash-out flows.",
      "Made everyday value legible for people still early in their understanding of the space.",
    ],
    reflection:
      "Coinbase reminded me that education is often a structural design problem. If a product needs too much explaining, the architecture is probably doing too little.",
    wallTone: "cobalt",
    cover: {
      src: "/images/projects/coinbase-cover.jpg",
      alt: "Coinbase product design cover.",
      frameClassName:
        "aspect-[16/10] bg-[linear-gradient(180deg,#eef3ff_0%,#fdfefe_100%)]",
      imageClassName: "object-cover",
    },
    sections: [
      {
        title: "Pay Tab Architecture",
        summary:
          "The Pay tab framed crypto as something useful in the everyday, giving new users a clearer home for action instead of a collection of isolated features.",
        caption:
          "Architecture was the message. The product had to show what crypto could do before users would believe it belonged in daily life.",
        image: {
          src: "/images/projects/coinbase-pay-tab.jpg",
          alt: "Coinbase Pay tab flow.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#edf1fd_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Crypto Payroll",
        summary:
          "Crypto Payroll offered workers a direct path into financial experimentation by letting them receive pay in up to five cryptocurrencies.",
        caption:
          "The surface had to make a new behavior feel grounded, not speculative.",
        image: {
          src: "/images/projects/coinbase-payroll.jpg",
          alt: "Coinbase crypto payroll concept.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#f1f4fb_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Instant Sell",
        summary:
          "Instant Sell simplified the moment when users wanted money back in their bank, reducing the friction between a crypto balance and real-world use.",
        caption:
          "Cash-out flows are a trust moment. The interface needed to feel clear, immediate, and unsurprising.",
        image: {
          src: "/images/projects/coinbase-instant-sell.jpg",
          alt: "Coinbase instant sell interface.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#eef2ff_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
    ],
  },
  {
    slug: "dropbox-spaces",
    title: "Dropbox Spaces",
    company: "Dropbox",
    category: "Collaborative workspace",
    year: "2018-2021",
    era: "Current work",
    roomLabel: "South hall",
    galleryNote: "A longer corridor about reframing a company from storage to workspace.",
    teaser:
      "Turning Dropbox from a destination for files into a living workspace for projects, context, and team momentum.",
    role: "Product Designer",
    collaborators: ["Dropbox collaboration teams"],
    thesis:
      "Shift Dropbox from a static repository of files into a more connected workspace where people can orient around the work itself.",
    overview:
      "Dropbox Spaces was a workspace layer that brought files, docs, links, and project context closer together. The opportunity was not just shipping another surface, but helping Dropbox tell a broader story about how work happens across people and artifacts.",
    problem:
      "Dropbox was deeply associated with storage, but teams needed a stronger sense of project context, shared momentum, and living workspaces that went beyond folders.",
    constraints: [
      "The concept had to feel additive to an existing product people already understood in a narrower way.",
      "The system needed to support both lightweight browsing and deeper collaborative context.",
      "The experience had to feel useful immediately rather than aspirational from a distance.",
    ],
    designStrategy:
      "Use the workspace as a connective layer: a place where files, docs, decisions, and people could sit together in a more legible narrative about the work.",
    outcomes: [
      "Helped broaden Dropbox's product story beyond file storage.",
      "Made project context and collaboration feel more native to the product.",
      "Created a more team-centered frame for how work could be organized and revisited.",
    ],
    reflection:
      "This project sharpened my interest in product framing. Sometimes the biggest design move is helping people see an existing platform differently.",
    wallTone: "sage",
    cover: {
      src: "/images/archive/dropbox-spaces.jpg",
      alt: "Dropbox Spaces workspace interface.",
      frameClassName:
        "aspect-[16/10] bg-[linear-gradient(180deg,#eef2ee_0%,#fbfcfb_100%)]",
      imageClassName: "object-cover",
    },
    sections: [
      {
        title: "Workspace Layer",
        summary:
          "Spaces gave projects a clearer home by bringing the most relevant materials into one collaborative surface.",
        caption:
          "The move was architectural. It gave teams a place to orient around the work instead of around a file tree.",
        image: {
          src: "/images/archive/dropbox-spaces.jpg",
          alt: "Dropbox Spaces overview.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#eef2ee_0%,#fbfcfb_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Project Context",
        summary:
          "The experience treated context as a design material, making related docs, artifacts, and collaborators easier to understand together.",
        caption:
          "Good collaboration tools do more than hold content. They make the shape of a project easier to read.",
        image: {
          src: "/images/archive/dropbox-spaces.jpg",
          alt: "Dropbox Spaces project context.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#f5f8f4_0%,#ffffff_100%)]",
          imageClassName: "object-cover object-left",
        },
      },
    ],
  },
  {
    slug: "apple-edu",
    title: "Apple EDU",
    company: "Kettle x Apple",
    category: "Education and campaign work",
    year: "2017",
    era: "Current work",
    roomLabel: "West gallery",
    galleryNote: "A brighter room about embedded collaboration and educational storytelling.",
    teaser:
      "Working inside Apple to shape educational storytelling and launch-facing visuals around classroom products and iOS features.",
    role: "Art Direction and Design",
    collaborators: ["Kettle", "Apple EDU team", "App Store team"],
    thesis:
      "Translate education-focused product value into visual stories that feel clear, aspirational, and recognizably Apple without becoming generic campaign work.",
    overview:
      "At Kettle, I worked on-site at Apple in Cupertino, embedded with the App Store and Apple EDU teams. The work spanned social, launch, and educational product storytelling intended to make classroom value legible and emotionally resonant.",
    problem:
      "Educational products can easily flatten into feature lists. The real challenge was making the benefits feel immediate, visual, and human without losing product clarity.",
    constraints: [
      "The work had to align with Apple's visual standards while still making room for strong editorial choices.",
      "Messaging needed to land across both education and broader consumer-adjacent surfaces.",
      "The system had to support product value, campaign needs, and platform-specific output at once.",
    ],
    designStrategy:
      "Use clean, confident visual framing and tight narrative focus so the story stays about learning, possibility, and product usefulness rather than decoration.",
    outcomes: [
      "Supported Apple EDU and App Store storytelling with clearer visual direction.",
      "Helped educational product benefits read with more immediacy and polish.",
      "Strengthened my ability to work inside a highly constrained brand system without losing authorship.",
    ],
    reflection:
      "Apple EDU taught me how much can be expressed inside constraint when the framing is exact. Strong systems do not eliminate voice; they make precision matter more.",
    wallTone: "sunset",
    cover: {
      src: "/images/archive/apple-edu.jpg",
      alt: "Apple EDU campaign artwork.",
      frameClassName:
        "aspect-[16/10] bg-[linear-gradient(180deg,#fdf2ec_0%,#fffaf6_100%)]",
      imageClassName: "object-cover",
    },
    sections: [
      {
        title: "Embedded Collaboration",
        summary:
          "Working inside Apple meant design choices had to stay highly deliberate while moving across education, product, and social contexts.",
        caption:
          "The most useful contribution was often framing the work in a way that helped different teams rally around the same visual story.",
        image: {
          src: "/images/archive/apple-edu.jpg",
          alt: "Apple EDU campaign work.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#fdf1e8_0%,#fff9f4_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Education Storytelling",
        summary:
          "The work treated classroom value as something to be seen and felt, not just explained through product marketing language.",
        caption:
          "The challenge was balancing inspiration with usefulness so the work still felt grounded in product reality.",
        image: {
          src: "/images/archive/apple-edu.jpg",
          alt: "Apple EDU visual storytelling.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#fff5ee_0%,#ffffff_100%)]",
          imageClassName: "object-cover object-left",
        },
      },
    ],
  },
  {
    slug: "bellwether-coffee",
    title: "Bellwether Coffee",
    company: "Frog",
    category: "Branding and venture work",
    year: "2018",
    era: "Current work",
    roomLabel: "Return wall",
    galleryNote: "The closing room, where brand, digital presence, and product theater come together.",
    teaser:
      "A venture rebrand and digital presence designed to make an ambitious coffee platform feel premium, modern, and commercially credible.",
    role: "UI/UX and Branding",
    collaborators: ["Frog venture team", "Executive creative direction"],
    thesis:
      "Build a visual and digital system that makes Bellwether Coffee feel like a serious modern platform, not just a technical product with a good story.",
    overview:
      "At Frog, I worked closely with the executive creative director on rebranding Bellwether Coffee, a venture client. My role was to help conceptualize, design, and execute the brand expression and digital presence so the company felt more distinctive and market-ready.",
    problem:
      "New ventures often have an idea people can explain but not yet a presence people can trust. Bellwether needed a stronger identity that made the product feel premium and real in the market.",
    constraints: [
      "The work had to bridge brand storytelling and practical product credibility.",
      "The system needed to feel premium without becoming ornamental.",
      "Digital execution had to support both narrative and conversion.",
    ],
    designStrategy:
      "Use a cleaner, more self-assured visual system and a sharper digital presentation so the company feels intentional from the first glance.",
    outcomes: [
      "Created a stronger brand presence around the venture's product vision.",
      "Improved how Bellwether's story read across digital touchpoints.",
      "Showed how brand systems and product storytelling can reinforce one another when designed together.",
    ],
    reflection:
      "Bellwether is a reminder that product, brand, and interface can be one conversation. Some of the most persuasive product work begins before the UI ever appears.",
    wallTone: "espresso",
    cover: {
      src: "/images/archive/bellwether-coffee.jpg",
      alt: "Bellwether Coffee brand and website work.",
      frameClassName:
        "aspect-[16/10] bg-[linear-gradient(180deg,#f1ebe6_0%,#fbf8f5_100%)]",
      imageClassName: "object-cover",
    },
    sections: [
      {
        title: "Brand Presence",
        summary:
          "The identity work made the venture feel more decisive and more ready for the world it was trying to enter.",
        caption:
          "Strong venture design is often about compressing uncertainty. The visual language helped do that work.",
        image: {
          src: "/images/archive/bellwether-coffee.jpg",
          alt: "Bellwether Coffee brand system.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Digital Storytelling",
        summary:
          "The digital expression helped connect product ambition, company credibility, and a more premium point of view.",
        caption:
          "The site did not just explain the company. It staged the company.",
        image: {
          src: "/images/archive/bellwether-coffee.jpg",
          alt: "Bellwether Coffee digital experience.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#f7f1eb_0%,#ffffff_100%)]",
          imageClassName: "object-cover object-right",
        },
      },
    ],
  },
];

export const archiveProjects: ArchiveProject[] = [
  {
    title: "Dropbox Paper",
    company: "Dropbox",
    category: "Co-editing and collaboration",
    year: "2018-2021",
    summary:
      "A collaboration experience built to connect creation and coordination inside the same workspace.",
    image: "/images/archive/dropbox-paper.jpg",
  },
  {
    title: "Paper Desktop App",
    company: "Dropbox",
    category: "Desktop product",
    year: "2018-2021",
    summary:
      "A dedicated desktop surface focused on quicker access, calmer workflow, and fewer distractions.",
    image: "/images/archive/paper-desktop-app.jpg",
  },
  {
    title: "Vision Platform",
    company: "Retail platform",
    category: "Inventory intelligence",
    year: "2018",
    summary:
      "A retail platform connecting tags, sensors, gateways, and video into a more actionable view of inventory and operations.",
  },
  {
    title: "Food Labs",
    company: "Hospitality",
    category: "Event and experience design",
    year: "2017",
    summary:
      "A culinary residency concept translated into a more editorial brand and digital experience.",
  },
  {
    title: "Garden Bar",
    company: "Chase x Seaport District",
    category: "Campaign and spatial storytelling",
    year: "2017",
    summary:
      "A campaign experience celebrating New York history, place, and neighborhood culture through event design and storytelling.",
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "Opendoor",
    role: "Staff Product Designer",
    years: "2024-Present",
    focus: "Product design, research, and strategy",
    href: "https://www.opendoor.com/",
  },
  {
    company: "DraftKings",
    role: "Product Designer",
    years: "2023-2024",
    focus: "Sportsbook product design and product strategy",
    href: "https://www.draftkings.com/",
  },
  {
    company: "VectorDAO",
    role: "Creative Direction and Product Design",
    years: "2021-Present",
    focus: "Branding, product direction, and strategy",
    href: "https://vectordao.com/",
  },
  {
    company: "Coinbase",
    role: "Product Designer",
    years: "2021-2023",
    focus: "Product design and product strategy",
    href: "https://www.coinbase.com/",
  },
  {
    company: "Dropbox",
    role: "Product Designer",
    years: "2018-2021",
    focus: "Product design and product strategy",
    href: "https://www.dropbox.com/",
  },
  {
    company: "Frog Design",
    role: "UI/UX and Branding",
    years: "2017-2018",
    focus: "Product thinking, brand systems, and venture work",
    href: "https://www.frog.co/",
  },
  {
    company: "Kettle",
    role: "Art Direction and Design",
    years: "2017",
    focus: "Brand, digital design, and client collaboration",
    href: "https://wearekettle.com/",
  },
  {
    company: "Sato Global",
    role: "UI/UX and Design Systems",
    years: "2017",
    focus: "Interface systems and product foundations",
    href: "https://www.sato-global.com/",
  },
  {
    company: "Howard Hughes Studio",
    role: "Art Direction and Design",
    years: "2016-2017",
    focus: "Brand and digital design",
    href: "https://www.howardhughes.com/",
  },
  {
    company: "Halo Media",
    role: "Web Design and Art Direction",
    years: "2013-2016",
    focus: "Editorial, web design, and visual direction",
    href: "https://halopowered.com/",
  },
];

export const capabilityLabels = [
  "0-to-1 product thinking",
  "Design systems and platform work",
  "Editorial art direction",
  "Rapid prototyping",
  "Research framing",
  "Cross-functional strategy",
];

export const socialLinks = [
  {
    label: "Twitter",
    href: "https://twitter.com/DaaniloZlatan",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/danilo-callejas-68b368106/",
  },
];

export function getProjectBySlug(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}
