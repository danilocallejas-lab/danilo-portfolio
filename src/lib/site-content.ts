import type { ProjectDisciplineTagValue } from "./project-tags";

export type ProjectSectionImage = {
  src: string;
  alt: string;
  frameClassName?: string;
  imageClassName?: string;
};

export type ProjectSectionCopyPresentation = "default" | "title-only" | "none";

export type ProjectImageSection = {
  title: string;
  summary: string;
  caption: string;
  copyPresentation?: ProjectSectionCopyPresentation;
  presentation?: "image" | "carousel";
  image: ProjectSectionImage;
  slides?: ProjectSectionImage[];
};

export type ProjectVideoEmbedSection = {
  title: string;
  summary: string;
  caption: string;
  copyPresentation?: ProjectSectionCopyPresentation;
  presentation: "video-embed";
  embedUrl: string;
  embedTitle: string;
  frameClassName?: string;
};

export type ProjectSection = ProjectImageSection | ProjectVideoEmbedSection;

export type FeaturedProject = {
  slug: string;
  title: string;
  company: string;
  category: string;
  discipline_tags: readonly ProjectDisciplineTagValue[];
  year: string;
  era: string;
  roomLabel: string;
  galleryNote: string;
  detailPresentation?: "case-study" | "image-archive";
  detailContentPresentation?: "full" | "overview-only";
  renderMediaImmediately?: boolean;
  showProjectMedia?: boolean;
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
  discipline_tags: readonly ProjectDisciplineTagValue[];
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

const recordLabelDesignImageBase = "/images/cargo/record-label-designs";
const dropboxSpacesImageBase = "/images/cargo/dropbox-spaces";

function getRecordLabelDesignImagePath(index: number) {
  return `${recordLabelDesignImageBase}/record-label-designs-${String(index).padStart(2, "0")}.jpg`;
}

function getRecordLabelDesignImage(
  index: number,
  label = `Record label design ${String(index).padStart(2, "0")}`,
): ProjectSectionImage {
  return {
    src: getRecordLabelDesignImagePath(index),
    alt: `${label}.`,
    frameClassName:
      "aspect-[16/10] bg-[linear-gradient(180deg,#f5f0ea_0%,#ffffff_100%)]",
    imageClassName: "object-cover",
  };
}

function getRecordLabelDesignSection(index: number): ProjectSection {
  const label = `Record label design ${String(index).padStart(2, "0")}`;

  return {
    title: label,
    summary:
      "A record label design artifact from the archived 2009-2016 collection.",
    caption:
      "Part of a legacy Cargo archive set preserved as an image-led project.",
    image: getRecordLabelDesignImage(index, label),
  };
}

function getRecordLabelDesignSections(): ProjectSection[] {
  const superGramsSlides = Array.from({ length: 7 }, (_, slideIndex) => {
    const imageIndex = slideIndex + 2;
    return getRecordLabelDesignImage(
      imageIndex,
      `Super Grams interface ${String(imageIndex).padStart(2, "0")}`,
    );
  });
  const elvisSlides = Array.from({ length: 4 }, (_, slideIndex) => {
    const imageIndex = slideIndex + 10;
    return getRecordLabelDesignImage(
      imageIndex,
      `Elvis archive interface ${String(imageIndex).padStart(2, "0")}`,
    );
  });

  return [
    {
      title: "Super Grams",
      summary:
        "A set of Super Grams browser and game interface screens from the record label archive.",
      caption:
        "Grouped as a manual image carousel so the related Super Grams sequence reads as one project moment.",
      presentation: "carousel",
      image: superGramsSlides[0],
      slides: superGramsSlides,
    },
    getRecordLabelDesignSection(9),
    {
      title: "Elvis",
      summary:
        "A compact sequence of Elvis-themed interface screens from the record label archive.",
      caption:
        "Grouped as a manual image carousel so the Elvis set can be viewed as one sequence.",
      presentation: "carousel",
      image: elvisSlides[0],
      slides: elvisSlides,
    },
    ...Array.from({ length: 13 }, (_, sectionIndex) =>
      getRecordLabelDesignSection(sectionIndex + 14),
    ),
  ];
}

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
    discipline_tags: ["product", "internal-tools"],
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
    discipline_tags: ["product"],
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
        title: "The Betslip",
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
    discipline_tags: ["product"],
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
    discipline_tags: ["product"],
    year: "2018-2019",
    era: "Archive work",
    roomLabel: "South hall",
    galleryNote: "A longer corridor about reframing a company from storage to workspace.",
    teaser:
      "Turning Dropbox from a destination for files into a living workspace for projects, context, and team momentum.",
    role: "Product Designer",
    collaborators: ["Walter Somerville", "John Saito", "Jason Perez"],
    thesis:
      "Dropbox Spaces 2.0 is a virtual workspace that brings together teams and projects.",
    overview:
      "Spaces was designed so small, content-centric teams could streamline their work, prioritize their day, and stay connected from anywhere.",
    problem:
      "Teams needed a stronger sense of project context, shared momentum, and living workspaces that went beyond folders and scattered task lists.",
    constraints: [
      "Tasks needed to live close to content without making the workspace feel heavier.",
      "The experience had to stay cohesive across platforms, devices, and browser sizes.",
      "The beta request experience needed to drive awareness and create a feedback pool for launch.",
    ],
    designStrategy:
      "Use the workspace as a connective layer where files, docs, tasks, decisions, and people could sit together in a more legible narrative about the work.",
    outcomes: [
      "Helped broaden Dropbox's product story beyond file storage.",
      "Made project context and collaboration feel more native to the product.",
      "Created a more team-centered frame for tracking, prioritizing, and revisiting work.",
    ],
    reflection:
      "This project sharpened my interest in product framing. Sometimes the biggest design move is helping people see an existing platform differently.",
    wallTone: "sage",
    cover: {
      src: `${dropboxSpacesImageBase}/cover.jpg`,
      alt: "Dropbox Spaces 2.0 workspace hero image.",
      frameClassName:
        "aspect-[1200/519] bg-[linear-gradient(180deg,#eef2ee_0%,#fbfcfb_100%)]",
      imageClassName: "object-cover",
    },
    sections: [],
  },
  {
    slug: "apple-edu",
    title: "Apple EDU",
    company: "Apple",
    category: "Education and campaign work",
    discipline_tags: ["marketing", "web-design", "art-direction"],
    year: "2018",
    era: "Archive work",
    roomLabel: "Archive room",
    galleryNote:
      "Apple EDU social and learning center work from the legacy archive.",
    teaser:
      "Embedded with the App Store and Apple EDU teams to shape iOS 11 social systems and Apple Learning Center how-to storytelling.",
    role: "Senior Designer",
    collaborators: ["Matt Brant"],
    thesis:
      "Make Apple EDU learning stories feel immediate, creative, and useful across social branding and feature-driven how-to films.",
    overview:
      "At Kettle, I worked on-site at Apple headquarters in Cupertino, CA, embedded with the App Store and Apple EDU teams. I assisted with the iOS 11 social channels branding design system and storyboarding videos for new features and promotional campaigns for the Apple Learning Center. Client: Apple. Agency: Kettle. Role: Senior Designer. Collaborator: Matt Brant.",
    problem:
      "Education stories need to teach without feeling instructional in a flat way. Apple EDU needed short-form work that made product features feel creative, clear, and classroom-ready.",
    constraints: [
      "The work had to align with Apple standards while staying legible across social and learning surfaces.",
      "The videos needed to make feature value visible quickly.",
      "The storytelling had to support both teachers and students without overexplaining.",
    ],
    designStrategy:
      "Use tight storyboards, clean visual framing, and simple instructional arcs so each feature felt like a creative prompt.",
    outcomes: [
      "Supported Apple EDU and App Store storytelling for iOS 11 and Apple Learning Center campaigns.",
      "Helped feature-led lessons read as creative invitations.",
      "Created how-to narratives that balanced clarity, product value, and inspiration.",
    ],
    reflection:
      "Apple EDU taught me how much can be expressed inside constraint when the framing is exact. Strong systems do not eliminate voice; they make precision matter more.",
    wallTone: "sunset",
    cover: {
      src: "/images/cargo/apple-edu/header.jpg",
      alt: "Apple EDU campaign header artwork.",
      frameClassName:
        "aspect-[3/2] bg-[linear-gradient(180deg,#fdf2ec_0%,#fffaf6_100%)]",
      imageClassName: "object-cover",
    },
    sections: [
      {
        title: "Discover Shapes In Keynote",
        summary:
          "As part of the Apple Learning Center, we created a how-to video for Apple EDU demonstrating how to build new shapes in Keynote with the shape tool to promote creativity and exploration.",
        caption:
          "The video treated a product feature as a creative exercise.",
        presentation: "video-embed",
        embedUrl: "https://player.vimeo.com/video/237159710",
        embedTitle: "Apple EDU Discover Shapes In Keynote video",
        frameClassName: "aspect-video bg-black",
      },
      {
        title: "Discover Shapes In Keynote still",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/apple-edu/frame-2248.png",
          alt: "Apple EDU Discover Shapes In Keynote storyboard frame.",
          frameClassName:
            "aspect-[3/2] bg-[linear-gradient(180deg,#fdf1e8_0%,#fff9f4_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Create Silhouettes In Keynote",
        summary:
          "Apple EDU helped bridge the student-teacher gap through Silhouettes in Keynote. Students could customize silhouettes that matched their personalities and fill them with shapes to identify themselves.",
        caption:
          "The story connected self-expression to a practical classroom activity.",
        presentation: "video-embed",
        embedUrl: "https://player.vimeo.com/video/237160589",
        embedTitle: "Apple EDU Create Silhouettes In Keynote video",
        frameClassName: "aspect-video bg-black",
      },
      {
        title: "Create Silhouettes In Keynote still",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/apple-edu/frame-2249.png",
          alt: "Apple EDU Create Silhouettes In Keynote storyboard frame.",
          frameClassName:
            "aspect-[3/2] bg-[linear-gradient(180deg,#fff5ee_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
    ],
  },
  {
    slug: "bellwether-coffee",
    title: "Bellwether Coffee",
    company: "Bellwether Coffee",
    category: "Brand and digital experience",
    discipline_tags: ["branding-identity", "marketing", "web-design"],
    year: "2018",
    era: "Archive work",
    roomLabel: "Archive room",
    galleryNote:
      "A venture rebrand and digital experience from the legacy archive.",
    teaser:
      "A Frog Design venture rebrand and end-to-end digital experience for Bellwether Coffee.",
    role: "Interactive, Visual Designer",
    collaborators: ["Andreas Markdalen"],
    thesis:
      "Design an end-to-end digital experience that made Bellwether Coffee's venture story feel premium, credible, and market-ready.",
    overview:
      "I worked closely with the ECD on rebranding Frog Design's venture client Bellwether Coffee. My role was to conceptualize, design, and execute the entire end-to-end digital experience for Bellwether Coffee while my partner refreshed the identity. Client: Bellwether Coffee. Agency: Frog Design. Role: Interactive, Visual Designer. Collaborator: Andreas Markdalen.",
    problem:
      "New ventures often have an idea people can explain but not yet a presence people can trust. Bellwether needed a stronger digital experience that made the product feel premium and real in the market.",
    constraints: [
      "The work had to connect a refreshed identity to a complete digital experience.",
      "The site needed to balance venture storytelling, product credibility, and premium presentation.",
      "The digital system had to support narrative, conversion, and the product's physical presence.",
    ],
    designStrategy:
      "Use a confident editorial structure, rich product imagery, and a sharper digital system so the company felt intentional from the first glance.",
    outcomes: [
      "Designed the end-to-end digital experience for the Bellwether Coffee rebrand.",
      "Helped translate the venture story into a more premium product presence.",
      "Connected brand identity, product education, and digital storytelling into one system.",
    ],
    reflection:
      "Bellwether is a reminder that product, brand, and interface can be one conversation. Some of the most persuasive product work begins before the UI ever appears.",
    wallTone: "espresso",
    cover: {
      src: "/images/cargo/bellwether-coffee/cover.jpg",
      alt: "Bellwether Coffee brand and website work.",
      frameClassName:
        "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1ebe6_0%,#fbf8f5_100%)]",
      imageClassName: "object-cover",
    },
    sections: [
      {
        title: "Bellwether Coffee hero",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/cover.jpg",
          alt: "Bellwether Coffee hero artwork.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee landing page",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/landing-page.jpg",
          alt: "Bellwether Coffee landing page design.",
          frameClassName:
            "aspect-[4/3] bg-[linear-gradient(180deg,#f7f1eb_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee brand system",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/brand-system.jpg",
          alt: "Bellwether Coffee brand system.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee brand film",
        summary: "",
        caption: "",
        copyPresentation: "none",
        presentation: "video-embed",
        embedUrl: "https://player.vimeo.com/video/249776769",
        embedTitle: "Bellwether Coffee brand film",
        frameClassName: "aspect-video bg-black",
      },
      {
        title: "Bellwether Coffee product story 01",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/product-story-01.jpg",
          alt: "Bellwether Coffee product story layout.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee product story 02",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/product-story-02.jpg",
          alt: "Bellwether Coffee product detail layout.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee product story 03",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/product-story-03.jpg",
          alt: "Bellwether Coffee product storytelling page.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee product film",
        summary: "",
        caption: "",
        copyPresentation: "none",
        presentation: "video-embed",
        embedUrl: "https://player.vimeo.com/video/249777003",
        embedTitle: "Bellwether Coffee product film",
        frameClassName: "aspect-video bg-black",
      },
      {
        title: "Bellwether Coffee experience 01",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/experience-01.jpg",
          alt: "Bellwether Coffee experience screen.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee experience 02",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/experience-02.jpg",
          alt: "Bellwether Coffee digital experience page.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee experience 03",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/experience-03.jpg",
          alt: "Bellwether Coffee website module.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee experience 04",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/experience-04.jpg",
          alt: "Bellwether Coffee website detail.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee experience 05",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/experience-05.jpg",
          alt: "Bellwether Coffee digital brand page.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee experience 06",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/experience-06.jpg",
          alt: "Bellwether Coffee digital system screen.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee experience 07",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/experience-07.jpg",
          alt: "Bellwether Coffee product storytelling screen.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f1e9e3_0%,#fffdfa_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee identity detail 01",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/identity-detail-01.png",
          alt: "Bellwether Coffee identity detail.",
          frameClassName:
            "aspect-video bg-[linear-gradient(180deg,#f7f1eb_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Bellwether Coffee identity detail 02",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/bellwether-coffee/identity-detail-02.png",
          alt: "Bellwether Coffee identity detail screen.",
          frameClassName:
            "aspect-video bg-[linear-gradient(180deg,#f7f1eb_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
    ],
  },
  {
    slug: "dropbox-paper",
    title: "Dropbox Paper",
    company: "Dropbox",
    category: "Co-editing and collaboration",
    discipline_tags: ["product"],
    year: "2018-2021",
    era: "Archive work",
    roomLabel: "Archive room",
    galleryNote: "A focused look at creation, coordination, and collaborative documents.",
    teaser:
      "Connecting writing, planning, templates, and team coordination inside Dropbox Paper.",
    role: "Product Designer",
    collaborators: ["Dropbox Paper team"],
    thesis:
      "Make Paper feel like a calmer collaboration space where people can move from a blank document into coordinated team work.",
    overview:
      "Dropbox Paper sat at the intersection of document creation and project coordination. This work focused on making the product feel more useful across writing, editing, templates, and repeatable team workflows.",
    problem:
      "Collaborative documents can become either too empty to guide teams or too rigid to feel like a workspace. Paper needed to support both expressive creation and practical coordination.",
    constraints: [
      "The product had to stay lightweight while making more workflow value visible.",
      "Templates and editing surfaces needed to support many kinds of teams without becoming generic.",
      "The experience had to feel connected to Dropbox without losing Paper's softer creation-first personality.",
    ],
    designStrategy:
      "Use document surfaces as starting points for momentum: clearer editing states, more helpful templates, and tighter bridges between writing and organizing.",
    outcomes: [
      "Made Paper's collaboration value easier to understand from first use.",
      "Helped frame templates as a practical path into repeatable team work.",
      "Extended the product story beyond documents into coordinated workspaces.",
    ],
    reflection:
      "Paper reinforced how much collaboration design depends on tone. A good workspace has to guide people without making the document feel overdetermined.",
    wallTone: "sage",
    cover: {
      src: "/images/archive/dropbox-paper.jpg",
      alt: "Dropbox Paper collaboration surface.",
      frameClassName:
        "aspect-[16/10] bg-[linear-gradient(180deg,#eef2ee_0%,#fbfcfb_100%)]",
      imageClassName: "object-cover",
    },
    sections: [
      {
        title: "Writing and Editing",
        summary:
          "The editing surface kept creation central while making collaboration feel more visible and easier to act on.",
        caption:
          "The document needed to stay quiet, but not empty. The strongest patterns helped teams understand what to do next without interrupting the work.",
        image: {
          src: "/images/cargo/dropbox-paper/editor.jpg",
          alt: "Dropbox Paper editor interface.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#edf3ef_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Templates",
        summary:
          "Templates gave teams a faster way into recurring workflows without turning Paper into a rigid project management tool.",
        caption:
          "The goal was to make a new document feel useful immediately, especially for repeated collaboration patterns.",
        image: {
          src: "/images/cargo/dropbox-paper/templates.png",
          alt: "Dropbox Paper templates surface.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#f2f6f3_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Dark Mode",
        summary:
          "Dark mode extended Paper's product language into a more comfortable reading and writing context.",
        caption:
          "Even a visual mode shift had to preserve Paper's softness and legibility.",
        image: {
          src: "/images/cargo/dropbox-paper/dark-mode.png",
          alt: "Dropbox Paper dark mode interface.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#eef2ee_0%,#fbfcfb_100%)]",
          imageClassName: "object-cover",
        },
      },
    ],
  },
  {
    slug: "paper-desktop-app",
    title: "Paper Desktop App",
    company: "Dropbox",
    category: "Desktop app",
    discipline_tags: ["product"],
    year: "2018-2019",
    era: "Archive work",
    roomLabel: "Archive room",
    galleryNote:
      "A dedicated Paper desktop app story from the legacy archive.",
    showProjectMedia: true,
    teaser:
      "A dedicated Paper desktop app for creating and accessing docs quickly, staying organized, and reducing distractions.",
    role: "Product Designer",
    collaborators: ["Kevin Tunc"],
    thesis:
      "Bring Paper closer to daily work with a dedicated desktop app for faster creation, retrieval, and focused document workflows.",
    overview:
      "Create and access docs quickly, keep your workspace organized, and focus on your work without distractions with a dedicated Paper desktop app. I inherited a nascent initiative and was responsible for growing and expanding its features and user base. In-house: Dropbox Paper. Role: Product Designer. Collaborator: Kevin Tunc.",
    problem:
      "Browser-based collaboration tools often make returning to work feel heavier than it should. Paper needed a desktop presence that made retrieval, activation, and resumption feel immediate.",
    constraints: [
      "The app had to feel close to desktop habits while remaining recognizably Paper.",
      "Closed beta and activation experiments needed to grow the product funnel thoughtfully.",
      "Search, migration parity, and power-user workflows had to evolve without turning the app into a heavy file manager.",
    ],
    designStrategy:
      "Treat the desktop app as a fast doorway back into work: lightweight activation, shared system foundations, stronger search, multi-window workflows, and a beta path toward broader access.",
    outcomes: [
      "Expanded a nascent desktop app initiative into a fuller product surface.",
      "Supported activation testing, infrastructure migration, search parity, power-user workflows, and beta distribution.",
      "Helped connect Paper workflows to daily operating system habits.",
    ],
    reflection:
      "This work made the value of proximity clear. Sometimes the design problem is not the document itself, but how quickly someone can get back to it.",
    wallTone: "sage",
    cover: {
      src: "/images/cargo/paper-desktop/cover.jpg",
      alt: "Dropbox Paper desktop app interface.",
      frameClassName:
        "aspect-[1200/795] bg-[linear-gradient(180deg,#eef2ee_0%,#fbfcfb_100%)]",
      imageClassName: "object-cover",
    },
    sections: [
      {
        title: "Paper Desktop Activation Experiment",
        summary:
          "While the Paper Desktop app was in closed beta, we launched a three-way A/B test to understand the impact on new user activation in Paper Desktop's product funnel and identify a thoughtful solution for upselling users.",
        caption:
          "The activation experiment made the app's value clearer during closed beta.",
        image: {
          src: "/images/cargo/paper-desktop/activation-overview.jpg",
          alt: "Paper Desktop activation experiment overview.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef2ee_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Paper Desktop activation test A",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/activation-test-a.jpg",
          alt: "Paper Desktop activation test screen.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#f3f7f4_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Paper Desktop activation test B",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/activation-test-b.jpg",
          alt: "Paper Desktop activation test variation.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Paper Desktop activation test C",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/activation-test-c.jpg",
          alt: "Paper Desktop activation test screen variation.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Paper Desktop activation flow",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/activation-flow.jpg",
          alt: "Paper Desktop activation flow.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Desktop Design System",
        summary:
          "In an effort for Paper Desktop to be ready for an infrastructure migration, we revamped our design system to accommodate new users. We did this with an incremental gain on various aspects of the product.",
        caption:
          "The system work helped the desktop app evolve without losing its Paper foundation.",
        image: {
          src: "/images/cargo/paper-desktop/design-system-01.jpg",
          alt: "Paper Desktop design system screen.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Desktop Design System details",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/design-system-02.jpg",
          alt: "Paper Desktop design system details.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Desktop Search",
        summary:
          "To support the Paper 2020 document migration into Dropbox, Paper Desktop needed to match changes made to users' accounts on the web. This included a new search experience for new and legacy docs across both Dropbox and Paper.",
        caption:
          "Search became a bridge between legacy Paper documents and the Dropbox migration.",
        image: {
          src: "/images/cargo/paper-desktop/search-overview.jpg",
          alt: "Paper Desktop search overview.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Paper Desktop search results 01",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/search-results-01.jpg",
          alt: "Paper Desktop search results screen.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Paper Desktop search results 02",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/search-results-02.jpg",
          alt: "Paper Desktop search results variation.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Paper Desktop search results 03",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/search-results-03.jpg",
          alt: "Paper Desktop search results detail.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Desktop Multi-Window",
        summary:
          "Over time, we found that there seemed to be a need for referencing completed or work-in-progress docs with many power users. During Hackweek, I worked on designing a multi-doc experience that would enable a quicker workflow.",
        caption:
          "Multi-window workflows supported power users who needed to reference more than one Paper doc at a time.",
        image: {
          src: "/images/cargo/paper-desktop/multi-window-overview.jpg",
          alt: "Paper Desktop multi-window overview.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Paper Desktop multi-window docs",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/multi-window-docs.jpg",
          alt: "Paper Desktop multi-window document screens.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Paper Desktop multi-window workflow",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/multi-window-workflow.jpg",
          alt: "Paper Desktop multi-window workflow.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Desktop Beta Page",
        summary:
          "In response to users actively requesting the desktop app, I designed a series of beta milestones from closed to open. The deliverables included a beta marketing page and distribution mechanism, gradually allowing an expanded set of users into the app to improve quality and feature set before the full GA release.",
        caption:
          "The beta page and distribution flow helped expand access while the product matured.",
        image: {
          src: "/images/cargo/paper-desktop/beta-page-hero.jpg",
          alt: "Paper Desktop beta page.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Paper Desktop beta page flow",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/beta-page-flow.jpg",
          alt: "Paper Desktop beta page flow.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Paper Desktop beta distribution",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/beta-page-distribution.jpg",
          alt: "Paper Desktop beta distribution screen.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Paper Desktop beta final state",
        summary: "",
        caption: "",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/paper-desktop/beta-page-final.jpg",
          alt: "Paper Desktop beta page final state.",
          frameClassName:
            "aspect-[4098/2715] bg-[linear-gradient(180deg,#eef3f0_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
    ],
  },
  {
    slug: "vision-platform",
    title: "Vision Platform",
    company: "Sato Global",
    category: "Inventory intelligence",
    discipline_tags: ["product", "internal-tools", "design-systems"],
    year: "2017-2018",
    era: "Archive work",
    roomLabel: "Archive room",
    galleryNote:
      "A systems story about RFID, video, and retail operations.",
    teaser:
      "A retail platform connecting tags, sensors, gateways, and video into actionable inventory and customer engagement insight.",
    role: "Product Designer",
    collaborators: ["Jesus Rivera", "Svetlana Sidorovskaya"],
    thesis:
      "Make a complex physical retail system readable across associate, fitting room, and management workflows.",
    overview:
      "The VISION Retail Platform connects tags, sensors, gateways, and video to deliver actionable insight across inventory management and customer engagement. The product centered on three connected surfaces: the sales associate app, smart fitting room, and management console.",
    problem:
      "Retail teams needed hardware-driven signals to become clear software actions: what was happening, where it was happening, and who should respond next.",
    constraints: [
      "Agency: Sato Global; role: Product Designer; years: 2017-2018; collaborators: Jesus Rivera and Svetlana Sidorovskaya.",
      "The product had to make RFID zones, readers, inventory states, tasks, and customer requests feel part of one operational system.",
      "The design system needed to hold together desktop management workflows and mobile associate tasks.",
    ],
    designStrategy:
      "Use a restrained dashboard and design-system language that connected system status, inventory metadata, task management, and mobile requests without overwhelming the primary action.",
    outcomes: [
      "Designed management-console views for analytics, inventory, users, zones, readers, and account personalization.",
      "Extended the platform to mobile associate workflows for customer requests from fitting rooms.",
      "Maintained and developed Vision and Aware design-system patterns across supported platforms and devices.",
    ],
    reflection:
      "Vision Platform sat squarely between hardware and software. The useful design move was making invisible systems feel inspectable, assignable, and ready for action.",
    wallTone: "cobalt",
    renderMediaImmediately: true,
    cover: {
      src: "/images/cargo/vision-platform/cover.jpg",
      alt: "Vision Platform retail intelligence dashboard.",
      frameClassName:
        "aspect-[1366/905] bg-[linear-gradient(180deg,#eef3ff_0%,#fdfefe_100%)]",
      imageClassName: "object-contain",
    },
    sections: [
      {
        title: "Analytics Dashboard",
        summary:
          "The analytics dashboard allows managers and admins to quickly see and control open, closed, or ongoing tasks, total available or sold items, and each item's location across all locations.",
        caption:
          "Cargo source image: Group-Copy-5.jpg.",
        image: {
          src: "/images/cargo/vision-platform/group-copy-5.jpg",
          alt: "Vision Platform analytics dashboard interface.",
          frameClassName:
            "aspect-[456/347] bg-[linear-gradient(180deg,#eef3ff_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Analytics Dashboard Detail",
        summary:
          "A second analytics view from the Cargo source sequence.",
        caption:
          "Cargo source image: Group-Copy-6.jpg.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/vision-platform/group-copy-6.jpg",
          alt: "Vision Platform analytics detail interface.",
          frameClassName:
            "aspect-[456/347] bg-[linear-gradient(180deg,#f2f5fd_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Inventory",
        summary:
          "The inventory page grants managers access and control to view, locate, and retrieve items with robust metadata.",
        caption:
          "Cargo source image: Group-Copy-7.jpg.",
        image: {
          src: "/images/cargo/vision-platform/inventory.jpg",
          alt: "Vision Platform inventory management interface.",
          frameClassName:
            "aspect-[456/347] bg-[linear-gradient(180deg,#eef3ff_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "User Management Console",
        summary:
          "With the user management console, administrators can supervise active employee tasks and redirect jobs more efficiently.",
        caption:
          "Cargo source image: Group-Copy-3.jpg.",
        image: {
          src: "/images/cargo/vision-platform/user-management-console.jpg",
          alt: "Vision Platform user management console interface.",
          frameClassName:
            "aspect-[456/347] bg-[linear-gradient(180deg,#f2f5fd_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "RFID Zones Tag Reader",
        summary:
          "For zones to work correctly, clients need to identify, control, and locate readers wherever they are in the space at a moment's notice.",
        caption:
          "Cargo source image: Group-Copy-8.jpg.",
        image: {
          src: "/images/cargo/vision-platform/rfid-zones-tag-reader.jpg",
          alt: "Vision Platform RFID zones tag reader interface.",
          frameClassName:
            "aspect-[456/347] bg-[linear-gradient(180deg,#eef3ff_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Account Personalization",
        summary:
          "Because Vision is a B2B product, businesses needed to customize the app by changing themes and uploading a logo.",
        caption:
          "Cargo source image: Group-Copy.jpg.",
        image: {
          src: "/images/cargo/vision-platform/account-personalization.jpg",
          alt: "Vision Platform account personalization interface.",
          frameClassName:
            "aspect-[456/347] bg-[linear-gradient(180deg,#f2f5fd_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Sales Associate App",
        summary:
          "Retail associates working with customers on the floor receive client requests from fitting rooms, review all tasks, accept new ones, and track ongoing tasks from their phones.",
        caption:
          "Cargo source image: Group-Copy-2.jpg.",
        image: {
          src: "/images/cargo/vision-platform/sales-associate-app.jpg",
          alt: "Vision Platform sales associate app interface.",
          frameClassName:
            "aspect-[456/347] bg-[linear-gradient(180deg,#eef3ff_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Vision & Aware Design System",
        summary:
          "To maintain consistency and speed up design and development across supported platforms and devices, the design system patterns were maintained and developed alongside the product.",
        caption:
          "Cargo source image: icons.jpg.",
        image: {
          src: "/images/cargo/vision-platform/design-system-icons.jpg",
          alt: "Vision and Aware design system icon board.",
          frameClassName:
            "aspect-[1500/1007] bg-[linear-gradient(180deg,#eef3ff_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Vision & Aware Design System Alternate",
        summary:
          "A second design-system icon board from the Cargo source sequence.",
        caption:
          "Cargo source image: icons-copy-1.jpg.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/vision-platform/design-system-icons-alt.jpg",
          alt: "Vision and Aware design system alternate icon board.",
          frameClassName:
            "aspect-[1500/1081] bg-[linear-gradient(180deg,#f2f5fd_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Retail Context",
        summary:
          "A retail context image from the Cargo source sequence.",
        caption:
          "Cargo source image: 21294749.jpg.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/vision-platform/retail-store-photo.jpg",
          alt: "Vision Platform retail store context.",
          frameClassName:
            "aspect-[1366/905] bg-[linear-gradient(180deg,#eef3ff_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Vision Platform Film",
        summary:
          "The Cargo source page closes with a product film for the Vision Platform.",
        caption: "Vision Platform Vimeo film.",
        copyPresentation: "none",
        presentation: "video-embed",
        embedUrl: "https://player.vimeo.com/video/476999202",
        embedTitle: "Vision Platform film",
        frameClassName: "aspect-video bg-black",
      },
    ],
  },
  {
    slug: "food-labs",
    title: "Food Labs",
    company: "Seaport District NYC",
    category: "Event and experience design",
    discipline_tags: ["branding-identity", "art-direction"],
    year: "2017",
    era: "Archive work",
    roomLabel: "Archive room",
    galleryNote:
      "A culinary experiment for the Seaport, built around two-week chef residencies.",
    teaser:
      "A culinary residency at the Seaport translated into an editorial brand, web presence, films, and chef programming.",
    role: "Senior Designer",
    collaborators: ["Kiser Barnes", "Alicia Adamerovich"],
    thesis:
      "Invite visitors into a culinary experiment while making the Seaport feel like a destination for innovative food concepts and culturally specific chef residencies.",
    overview:
      "Food Labs invited visitors to be part of a culinary experiment as it welcomed a series of celebrated chefs in two-week residencies. The Food Lab showcased the Seaport as a destination for innovative culinary concepts, letting guests experience some of the world's most forward-thinking chefs as they took inspiration from a neighborhood with deep historical roots.",
    problem:
      "The residency needed to feel alive before guests arrived: part restaurant, part cultural program, and part neighborhood story. The digital system had to make the concept legible while giving each chef enough room to feel distinct.",
    constraints: [
      "Client: Seaport District NYC; in-house: The Howard Hughes Corporation; role: Senior Designer; collaborators: Kiser Barnes and Alicia Adamerovich.",
      "The identity needed to support two-week residencies, chef-specific stories, films, and event context.",
      "The system had to balance atmosphere with practical information for visitors.",
    ],
    designStrategy:
      "Use an editorial brand and web system that could foreground food, chef programming, and Seaport context while staying direct enough for event discovery.",
    outcomes: [
      "Created a digital frame for the Food Labs residency concept and its programming.",
      "Supported chef-led moments for Jessica Koslow, Hugh Acheson, and Alon Shaya.",
      "Helped position the Seaport as a destination for experimental culinary experiences.",
    ],
    reflection:
      "Food Labs was a useful reminder that hospitality design is mostly anticipation. The work had to make the room, the chef, and the neighborhood feel real before anyone arrived.",
    wallTone: "sunset",
    cover: {
      src: "/images/cargo/food-labs/header.png",
      alt: "Food Labs editorial landing page.",
      frameClassName:
        "aspect-[16/10] bg-[linear-gradient(180deg,#fdf2ec_0%,#fffaf6_100%)]",
      imageClassName: "object-cover",
    },
    sections: [
      {
        title: "Opening Visual System",
        summary:
          "The first visual layer introduced Food Labs as a culinary experiment with enough editorial texture to feel alive before the residency opened.",
        caption:
          "Cargo source image: image1.jpg.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/food-labs/opening-visual-system.png",
          alt: "Food Labs opening editorial image.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#fff7f1_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Residency Page",
        summary:
          "The web presence framed the Seaport residency around programming, chef stories, and a clear invitation to visit.",
        caption:
          "Cargo source image: 3.png.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/food-labs/residency.png",
          alt: "Food Labs residency page.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#fff1e8_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Event Story Detail",
        summary:
          "Supporting layouts gave the concept room to explain the experiment, the location, and the cadence of the chef residencies.",
        caption:
          "Cargo source image: 2.png.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/food-labs/residency-detail.png",
          alt: "Food Labs residency detail page.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#fff7f1_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Chef Lineup",
        summary:
          "The page sequence introduced the residency as a series of celebrated chefs taking inspiration from the neighborhood's history.",
        caption:
          "Cargo source image: 3Inrow.png.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/food-labs/chef-lineup.png",
          alt: "Food Labs chef lineup page.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#fff1e8_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Food Labs Film",
        summary:
          "The source page paired the digital system with motion to make the culinary experiment feel immediate and atmospheric.",
        caption: "Food Labs Vimeo overview.",
        copyPresentation: "none",
        presentation: "video-embed",
        embedUrl: "https://player.vimeo.com/video/264297895",
        embedTitle: "Food Labs overview film",
        frameClassName: "aspect-video bg-black",
      },
      {
        title: "Event Detail",
        summary:
          "Additional web layouts carried practical event context while preserving the editorial rhythm of the residency.",
        caption:
          "Cargo source image: 1.png.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/food-labs/event-detail.png",
          alt: "Food Labs event detail page.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#fff7f1_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Jessica Koslow",
        summary:
          "Jessica Koslow's residency was presented as its own programming moment within the broader Food Labs series.",
        caption: "Jessica Koslow Vimeo feature.",
        copyPresentation: "title-only",
        presentation: "video-embed",
        embedUrl: "https://player.vimeo.com/video/263803284",
        embedTitle: "Food Labs Jessica Koslow film",
        frameClassName: "aspect-video bg-black",
      },
      {
        title: "Jessica Koslow Image",
        summary:
          "The chef-specific visual treatment gave each residency a distinct point of entry while staying inside the Food Labs system.",
        caption:
          "Cargo source image: jess-K.png.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/food-labs/jessica-koslow.png",
          alt: "Food Labs Jessica Koslow residency page.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#fff1e8_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Hugh Acheson",
        summary:
          "Hugh Acheson's residency continued the source page's rhythm of chef title, film, and supporting visual.",
        caption: "Hugh Acheson Vimeo feature.",
        copyPresentation: "title-only",
        presentation: "video-embed",
        embedUrl: "https://player.vimeo.com/video/263803156",
        embedTitle: "Food Labs Hugh Acheson film",
        frameClassName: "aspect-video bg-black",
      },
      {
        title: "Hugh Acheson Image",
        summary:
          "The chef page layout preserved the event story while making the individual residency feel ownable.",
        caption:
          "Cargo source image: Hugh-A2.png.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/food-labs/hugh-acheson.png",
          alt: "Food Labs Hugh Acheson residency page.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#fff7f1_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
      {
        title: "Alon Shaya",
        summary:
          "Alon Shaya's residency completed the chef sequence preserved from the original Cargo page.",
        caption: "Alon Shaya Vimeo feature.",
        copyPresentation: "title-only",
        presentation: "video-embed",
        embedUrl: "https://player.vimeo.com/video/263803351",
        embedTitle: "Food Labs Alon Shaya film",
        frameClassName: "aspect-video bg-black",
      },
      {
        title: "Alon Shaya Image",
        summary:
          "The final chef visual kept the page grounded in food, place, and the temporary nature of the residency.",
        caption:
          "Cargo source image: alonshaya1.png.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/food-labs/alon-shaya.png",
          alt: "Food Labs Alon Shaya residency page.",
          frameClassName:
            "aspect-[16/10] bg-[linear-gradient(180deg,#fff1e8_0%,#ffffff_100%)]",
          imageClassName: "object-cover",
        },
      },
    ],
  },
  {
    slug: "garden-bar",
    title: "Garden Bar",
    company: "Seaport District",
    category: "Campaign and spatial storytelling",
    discipline_tags: [
      "branding-identity",
      "marketing",
      "art-direction",
    ],
    year: "2017",
    era: "Archive work",
    roomLabel: "Archive room",
    galleryNote:
      "A place-led campaign built around New York history and neighborhood culture.",
    detailContentPresentation: "overview-only",
    teaser:
      "A Seaport District campaign and summer concert series celebrating New York history, people, and neighborhood culture.",
    role: "Senior Designer",
    collaborators: ["Kiser Barnes", "Christina Nyguen"],
    thesis:
      "Turn a seasonal bar and summer event program into a place-specific campaign rooted in the Seaport District.",
    overview:
      "Summer Garden Bar partnered with Chase to promote one of New York City's most historic neighborhoods, the Seaport District. The Garden Bar celebrated people, history, and culture, and along with the summer concert series the events resulted in 200k visitors, 150 digital impressions, and a lot of smiles.",
    problem:
      "Place-based campaigns can feel generic when they borrow culture instead of building from it. Garden Bar needed to make a seasonal destination feel hosted by the neighborhood and supported by the partnership.",
    constraints: [
      "Client: Seaport District; in-house: The Howard Hughes Corporation; role: Senior Designer; collaborators: Kiser Barnes and Christina Nyguen.",
      "The system had to support digital, environmental, event-facing, and motion moments.",
      "Historical references needed to enrich the campaign without slowing down event discovery.",
    ],
    designStrategy:
      "Use a clean campaign system with enough local texture, film, and event rhythm to make the bar feel like part of the district's story.",
    outcomes: [
      "Created a visual and digital frame for a place-led event experience and summer concert series.",
      "Connected Chase participation to a clearer Seaport District neighborhood narrative.",
      "Supported a campaign that drew 200k visitors and 150 digital impressions.",
    ],
    reflection:
      "Garden Bar sits in the part of design where brand, place, and event behavior overlap. The strongest work gave the setting a voice before the visitor arrived.",
    wallTone: "sand",
    cover: {
      src: "/images/cargo/garden-bar/cover.jpg",
      alt: "Garden Bar campaign landing page.",
      frameClassName:
        "aspect-[2500/1447] bg-[linear-gradient(180deg,#f7f0e8_0%,#fbf7f2_100%)]",
      imageClassName: "object-contain",
    },
    sections: [
      {
        title: "Garden Bar Film",
        summary:
          "The Cargo source page opens the Garden Bar media sequence with a film.",
        caption: "Garden Bar Vimeo film.",
        copyPresentation: "none",
        presentation: "video-embed",
        embedUrl: "https://player.vimeo.com/video/477002766",
        embedTitle: "Garden Bar film",
        frameClassName: "aspect-video bg-black",
      },
      {
        title: "Garden Bar Campaign Layout",
        summary:
          "The first campaign layout from the Cargo source sequence.",
        caption:
          "Cargo source image: Frame-2257_2.png.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/garden-bar/frame-2257.png",
          alt: "Garden Bar campaign layout.",
          frameClassName:
            "aspect-[2500/1667] bg-[linear-gradient(180deg,#fbf4ed_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Garden Bar Campaign Layout Two",
        summary:
          "The second campaign layout from the Cargo source sequence.",
        caption:
          "Cargo source image: Frame-2260_2.png.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/garden-bar/frame-2260.png",
          alt: "Garden Bar second campaign layout.",
          frameClassName:
            "aspect-[2500/1667] bg-[linear-gradient(180deg,#f7f0e8_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Garden Bar Wide Campaign Detail",
        summary:
          "A wide-format campaign detail from the Cargo source sequence.",
        caption:
          "Cargo source image: Frame-2259_3.png.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/garden-bar/frame-2259.png",
          alt: "Garden Bar wide campaign detail.",
          frameClassName:
            "aspect-[1250/403] bg-[linear-gradient(180deg,#f8f1ea_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Garden Bar Event Detail",
        summary:
          "A supporting event layout from the Cargo source sequence.",
        caption:
          "Cargo source image: Frame-2258_2.png.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/garden-bar/frame-2258.png",
          alt: "Garden Bar event detail layout.",
          frameClassName:
            "aspect-[2500/1669] bg-[linear-gradient(180deg,#fbf4ed_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Garden Bar Campaign Surface",
        summary:
          "A final campaign surface from the Cargo source sequence.",
        caption:
          "Cargo source image: Frame-2254_2.jpg.",
        copyPresentation: "none",
        image: {
          src: "/images/cargo/garden-bar/frame-2254.jpg",
          alt: "Garden Bar campaign surface.",
          frameClassName:
            "aspect-[2500/1667] bg-[linear-gradient(180deg,#f7f0e8_0%,#ffffff_100%)]",
          imageClassName: "object-contain",
        },
      },
      {
        title: "Garden Bar Concert Film",
        summary:
          "The Cargo source page closes with a second Garden Bar film.",
        caption: "Garden Bar Vimeo concert film.",
        copyPresentation: "none",
        presentation: "video-embed",
        embedUrl: "https://player.vimeo.com/video/508213277",
        embedTitle: "Garden Bar concert film",
        frameClassName: "aspect-video bg-black",
      },
    ],
  },
  {
    slug: "record-label-designs",
    title: "Record label designs",
    company: "Independent",
    category: "Record label design",
    discipline_tags: ["branding-identity", "art-direction"],
    year: "2009-2016",
    era: "Archive work",
    roomLabel: "Archive room",
    galleryNote: "A preserved image-led collection from the legacy Cargo archive.",
    detailPresentation: "image-archive",
    teaser:
      "A collection of record label design work preserved from the legacy 2009-2016 archive.",
    role: "Art Direction and Design",
    collaborators: [],
    thesis:
      "Collect the record label design work into one quiet archive page where the visual artifacts can carry the story.",
    overview:
      "This project gathers record label design images from the legacy Cargo archive into a single local portfolio page. The current treatment keeps the copy intentionally light and lets the collection read as a visual record.",
    problem:
      "Older archive work can disappear into legacy platforms and broad index pages. The goal here is to preserve the images locally and make them easier to browse inside the current portfolio.",
    constraints: [
      "The imported images needed to preserve their original order from the Cargo archive page.",
      "The page needed to stay lightweight enough for the current portfolio despite the larger image set.",
      "The project copy is provisional while the collection title and story are still being refined.",
    ],
    designStrategy:
      "Use the existing archive case-study system and keep the presentation image-led: one cover image, then the full record label design sequence in order.",
    outcomes: [
      "Brought the record label design images into the portfolio as local assets.",
      "Added a dedicated route for the full collection.",
      "Kept the archive grid concise with one card that links to the complete project.",
    ],
    reflection:
      "This is a preservation pass first: enough structure to make the work visible again, with room to refine the story later.",
    wallTone: "espresso",
    cover: {
      src: getRecordLabelDesignImagePath(1),
      alt: "Record label design 01.",
      frameClassName:
        "aspect-[16/10] bg-[linear-gradient(180deg,#f5f0ea_0%,#ffffff_100%)]",
      imageClassName: "object-cover",
    },
    sections: getRecordLabelDesignSections(),
  },
];

export const archiveProjects: ArchiveProject[] = [
  {
    title: "Record label designs",
    company: "Independent",
    category: "Record label design",
    year: "2009-2016",
    summary:
      "A collection of record label design work preserved from the legacy archive.",
    discipline_tags: ["branding-identity", "art-direction"],
    href: "/work/record-label-designs",
    image: getRecordLabelDesignImagePath(1),
  },
  {
    title: "Apple EDU",
    company: "Apple",
    category: "Education and campaign work",
    year: "2018",
    summary:
      "Apple EDU social systems and Apple Learning Center how-to storytelling for Keynote creativity prompts.",
    discipline_tags: ["marketing", "web-design", "art-direction"],
    href: "/work/apple-edu",
    image: "/images/cargo/apple-edu/header.jpg",
  },
  {
    title: "Bellwether Coffee",
    company: "Bellwether Coffee",
    category: "Brand and digital experience",
    year: "2018",
    summary:
      "A Frog Design venture rebrand translated into an end-to-end digital experience for Bellwether Coffee.",
    discipline_tags: ["branding-identity", "marketing", "web-design"],
    href: "/work/bellwether-coffee",
    image: "/images/cargo/bellwether-coffee/cover.jpg",
  },
  {
    title: "Dropbox Paper",
    company: "Dropbox",
    category: "Co-editing and collaboration",
    year: "2018-2021",
    summary:
      "A collaboration experience built to connect creation and coordination inside the same workspace.",
    discipline_tags: ["product"],
    href: "/work/dropbox-paper",
    image: "/images/archive/dropbox-paper.jpg",
  },
  {
    title: "Paper Desktop App",
    company: "Dropbox",
    category: "Desktop product",
    year: "2018-2021",
    summary:
      "A dedicated desktop surface focused on quicker access, calmer workflow, and fewer distractions.",
    discipline_tags: ["product"],
    href: "/work/paper-desktop-app",
    image: "/images/archive/paper-desktop-app.jpg",
  },
  {
    title: "Vision Platform",
    company: "Sato Global",
    category: "Inventory intelligence",
    year: "2017-2018",
    summary:
      "A retail platform connecting tags, sensors, gateways, and video into actionable inventory and customer engagement insight.",
    discipline_tags: ["product", "internal-tools", "design-systems"],
    href: "/work/vision-platform",
    image: "/images/cargo/vision-platform/cover.jpg",
  },
  {
    title: "Food Labs",
    company: "Seaport District NYC",
    category: "Event and experience design",
    year: "2017",
    summary:
      "A culinary residency at the Seaport translated into an editorial brand, web presence, films, and chef programming.",
    discipline_tags: ["branding-identity", "art-direction"],
    href: "/work/food-labs",
    image: "/images/cargo/food-labs/header.png",
  },
  {
    title: "Garden Bar",
    company: "Seaport District",
    category: "Campaign and spatial storytelling",
    year: "2017",
    summary:
      "A Seaport District campaign and summer concert series celebrating New York history, people, and neighborhood culture.",
    discipline_tags: [
      "branding-identity",
      "marketing",
      "art-direction",
    ],
    href: "/work/garden-bar",
    image: "/images/cargo/garden-bar/cover.jpg",
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
    label: "CV",
    href: "https://www.linkedin.com/in/danilo-callejas/",
  },
];

export function getProjectBySlug(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}
