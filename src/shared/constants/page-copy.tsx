import Link from "next/link";
import { HashLink } from "@/shared/ui/hash-link";
import { ProjectsBoardLink } from "@/shared/ui/projects-tag-link";
import {
  commissionFaqItemHref,
  commissionSectionHref,
  contactFormHref,
  SECTION_IDS,
} from "./anchors";
import { projectDetailPath, ROUTES } from "./routes";
import { CONTACT_FORM_LIMITS } from "./contact-form-limits";
import type {
  ClientStudio,
  ExperienceItem,
  HeroPortrait,
  ProjectsBoardSort,
  ProjectsBoardTab,
  SkillCard,
  SocialLink,
  SocialIconId,
  CommissionInfoItem,
} from "./types";

/** Canonical site role - H1, metadata, JSON-LD, experience. Use Developer, not Engineer. */
export const SITE_ROLE = {
  headline: "Minecraft Bedrock UI & Web Developer",
  projectCredit: "UI Developer",
} as const;

export const SITE_BRAND = {
  name: "AxmBro",
  siteName: "AxmBro.dev",
  socialHandle: "@AxmBro",
} as const;

/** Document title shape for every route: `AxmBro.dev | Page`. */
export const pageTitle = (title: string) => `${SITE_BRAND.siteName} | ${title}`;

export const EXPERIENCE_TREE: ExperienceItem[] = [
  {
    role: "Freelance JsonUI & Web Developer",
    date: "Dec 2023 - Present",
    company: "Self-Employed",
    items: [
      {
        name: "Ship custom Bedrock JsonUI for studios, servers, and creators - from single screens to full UI systems.",
      },
      {
        name: "Clients and studio partners include InPvP, Mush Co, A30x1, and Radium Studio.",
      },
      {
        name: "Build React and Next.js websites and landing pages for commission and freelance clients.",
      },
      {
        name: "Handle scoping, client communication, delivery, contracts, and invoicing on JsonUI work end to end.",
      },
    ],
  },
  {
    role: "Founder & Lead Developer",
    date: "Feb 2022 - Present",
    company: "Better Bedrock",
    items: [
      {
        name: (
          <>
            Founded{" "}
            <Link href={projectDetailPath("better_bedrock")}>Better Bedrock</Link>{" "}
            and grew it past 2M downloads as a Bedrock UI and texture pack. Now
            building a{" "}
            <a
              href="https://betterbedrock.com/monetization"
              target="_blank"
              rel="noopener noreferrer"
            >
              creator monetization platform
            </a>{" "}
            where Bedrock creators publish projects and earn ad revenue.
          </>
        ),
      },
      {
        name: "Lead releases, community, and promotional content across video and graphics.",
      },
      {
        name: "Designed the JsonUI system and co-built the project website with a technical partner.",
      },
    ],
  },
  {
    role: "Computer Science Student",
    date: "Oct 2025 - Present",
    company: "University of Silesia",
    items: [
      {
        name: "Building a foundation in software engineering and computer systems.",
      },
      {
        name: "Coursework includes algorithms, programming, databases, computer networks, operating systems, and digital logic.",
      },
    ],
  },
];

export const SKILLS_CARDS: SkillCard[] = [
  {
    title: "Minecraft Bedrock JsonUI",
    items: [
      { name: "JsonUI", value: "Expert" },
      { name: "Resource Packs", value: "Advanced" },
      { name: "Entities & Molang", value: "Intermediate" },
      { name: "ScriptAPI", value: "Beginner" },
    ],
  },
  {
    title: "Web Development",
    items: [
      { name: "JavaScript & TypeScript", value: "Intermediate" },
      { name: "React & Next.js", value: "Intermediate" },
      { name: "HTML & SCSS", value: "Intermediate" },
      { name: "Vercel", value: "Beginner" },
    ],
  },
  {
    title: "Computer Science & Tools",
    items: [
      { name: "Git & GitHub", value: "Intermediate" },
      { name: "Algorithms & OOP", value: "Intermediate" },
      { name: "Databases & SQL", value: "Beginner" },
      { name: "C++", value: "Beginner" },
      { name: "Java", value: "Beginner" },
      { name: "Python", value: "Beginner" },
      { name: "Linux", value: "Beginner" },
    ],
  },
  {
    title: "Professional",
    items: [
      { name: "Community Management", value: "Advanced" },
      { name: "Project Scoping", value: "Intermediate" },
      { name: "Client Communication", value: "Intermediate" },
      { name: "Contracts & Invoicing", value: "Intermediate" },
      { name: "Polish", value: "Native" },
      { name: "English", value: "B2" },
    ],
  },
];

export const SOCIAL_LINK_BUTTONS: SocialLink[] = [
  {
    href: "https://github.com/AxmBro",
    text: "GitHub",
    iconId: "github",
    channel: "direct",
  },
  {
    href: "mailto:axmbro@gmail.com",
    text: "axmbro@gmail.com",
    iconId: "mail",
    copyText: "axmbro@gmail.com",
    channel: "direct",
  },
  {
    href: "https://discord.com/users/679603350236299266",
    text: "Discord (DM)",
    iconId: "discord",
    copyText: "axmbro",
    channel: "direct",
  },
  {
    href: "https://discord.gg/wJhH86c2wb",
    text: "Personal Discord",
    iconId: "discord",
    channel: "extra",
  },
  {
    href: "https://discord.gg/ZGK5WYXnEY",
    text: "Better Bedrock Discord",
    iconId: "discord",
    channel: "extra",
  },
  {
    href: "https://www.youtube.com/@axmbro",
    text: "YouTube",
    iconId: "youtube",
    channel: "extra",
  },
  {
    href: "https://www.youtube.com/@axmbro2",
    text: "YouTube (2nd)",
    iconId: "youtube",
    channel: "extra",
  },
  {
    href: "https://betterbedrock.com/profile/AxmBro",
    text: "Better Bedrock Profile",
    iconId: "betterbedrock",
    channel: "extra",
  },
  {
    href: "https://twitter.com/AxmBro",
    text: "Twitter / X",
    iconId: "twitter",
    channel: "extra",
  },
  {
    href: "https://www.instagram.com/axmbro_",
    text: "Instagram",
    iconId: "instagram",
    channel: "extra",
  },
];

type FooterSocialEntry = {
  iconId: SocialIconId;
  text?: string;
};

const FOOTER_SOCIAL_ENTRIES: FooterSocialEntry[] = [
  { iconId: "github" },
  { iconId: "mail" },
  { iconId: "discord", text: "Discord (DM)" },
  { iconId: "youtube", text: "YouTube" },
  { iconId: "betterbedrock", text: "Better Bedrock Profile" },
];

export const getFooterSocialLinks = (): SocialLink[] =>
  FOOTER_SOCIAL_ENTRIES.flatMap((entry) => {
    const link = SOCIAL_LINK_BUTTONS.find(
      (item) =>
        item.iconId === entry.iconId &&
        (!entry.text || item.text === entry.text),
    );

    return link ? [link] : [];
  });

export const PROJECT_PAGE_TEXTS = {
  breadcrumbs: {
    home: "Home",
    projects: "Projects",
  },
  previewAlt: (title: string) => `${title} project preview`,
  overview: { eyebrow: "Project", title: "Overview" },
  credits: { eyebrow: "Team", title: "Credits" },
  videos: { eyebrow: "Media", tocLabel: "Videos" },
  showcaseEyebrow: "Showcase",
  untitledSection: (index: number) => `Section ${index}`,
  relatedWorkSuffix: " for more commissioned JsonUI.",
  toc: {
    label: "On this page",
    scrollLeft: "Scroll tabs left",
    scrollRight: "Scroll tabs right",
  },
  creditsDefaultDescription: "People involved in creating this project.",
  comingSoon: {
    eyebrow: "Status",
    title: "Coming soon",
    description: "Full project showcase coming soon.",
  },
  imageSection: {
    stepCounter: (current: number, total: number) => `${current}/${total}`,
    stepPosition: (current: number, total: number) =>
      `Item ${current} of ${total}`,
  },
} as const;

export const CONTACT_FORM_TEXTS = {
  emailLabel: "Email",
  emailPlaceholder: "Your email",
  discordLabel: "Discord (optional)",
  discordPlaceholder: "Username or ID",
  topicLabel: "Topic (optional)",
  messageLabel: "Message",
  messagePlaceholder: "Your ideas, sketches, scope, or questions...",
  submit: "Send Message",
  submitting: "Sending...",
  success: "Message sent. I will reply as soon as possible.",
  error: "Could not send. Try again or use email.",
  errorUnavailable:
    "The contact form is temporarily unavailable. Email axmbro@gmail.com directly.",
  errorTooMany:
    "Too many messages from your connection. Please email axmbro@gmail.com directly.",
  validation: {
    email: "Enter a valid email address.",
    emptyMessage: "Write your message.",
    presetOnly: "Add your details below the preset line.",
    messageTooLong: `Keep the message under ${CONTACT_FORM_LIMITS.message} characters.`,
  },
} as const;

export const CONTACT_FORM_INTENTS = [
  {
    id: "complete-ui",
    label: "Complete UI System",
    template:
      "Hello AxmBro! I want to discuss a full Bedrock JsonUI system. ",
  },
  {
    id: "hud-overlay",
    label: "HUD or Overlay",
    template:
      "Hello AxmBro! I want to discuss a custom HUD or overlay. ",
  },
  {
    id: "forms-menus",
    label: "Server Forms or Menus",
    template:
      "Hello AxmBro! I want to discuss server forms or menus. ",
  },
  {
    id: "web-project",
    label: "Web Project",
    template:
      "Hello AxmBro! I want to discuss a web project - happy to continue on Discord DM. ",
  },
  {
    id: "other",
    label: "Other",
    template: "Hello AxmBro! I have a project idea. ",
  },
];

export const HOME_CLIENT_STUDIOS: ClientStudio[] = [
  {
    name: "InPvP",
    href: "https://inpvp.net/",
    logoSrc: "/images/companies-logos/inpvp.png",
    logoWidth: 796,
    logoHeight: 266,
  },
  {
    name: "Mush Co",
    href: "https://www.mushco.games/",
    logoSrc: "/images/companies-logos/mushco.png",
    logoWidth: 676,
    logoHeight: 218,
  },
  {
    name: "A30x1",
    href: "https://www.a30x1.com/",
    logoSrc: "/images/companies-logos/a30x1.png",
    logoWidth: 88,
    logoHeight: 80,
  },
  {
    name: "Radium Studio",
    href: "https://www.radium-studio.com/",
    logoSrc: "/images/companies-logos/radium-studio.png",
    logoWidth: 256,
    logoHeight: 256,
  },
];

export const NAV_LINKS = [
  { href: ROUTES.home, text: "Home" },
  { href: ROUTES.projects, text: "Projects" },
  { href: ROUTES.commissions, text: "Commissions" },
  { href: ROUTES.contact, text: "Contact" },
];

export const SITE_METADATA = {
  homeDescription:
    `20-year-old Computer Science student and ${SITE_ROLE.headline} from Poland. Mainly custom Bedrock JsonUI, HUDs, and server forms for studios, servers, and creators - plus React and Next.js web work.`,
  footerDescription:
    `Computer Science student and ${SITE_ROLE.headline} from Poland. Custom Bedrock JsonUI for studios and creators, with the same care on React and Next.js web work.`,
  projectsDescription:
    "Minecraft Bedrock UI projects by AxmBro: JsonUI commissions for InPvP, Mush Co, and other servers, plus Better Bedrock and web work.",
  commissionsDescription:
    "Hire AxmBro for custom Minecraft Bedrock UI: JsonUI server forms, HUDs, and full UI systems for servers and studios. Scope, process, and FAQ.",
  contactDescription:
    "Contact AxmBro for custom Bedrock JsonUI commissions via the form, email, Discord, or GitHub. Web work - reach out on Discord DM first.",
  sitemapDescription:
    "Sitemap for AxmBro.dev - main pages, home sections, commissions, contact, projects, and legal.",
  privacyPolicyDescription:
    "Privacy Policy for AxmBro.dev - what data is collected, legal basis, retention, and your GDPR rights.",
  termsOfUseDescription:
    "Terms of Use for AxmBro.dev - permitted use, intellectual property, disclaimers, and governing law.",
  notFoundDescription:
    "This page is not on AxmBro.dev. Browse projects for recent work or see Commissions for Bedrock JsonUI scope and process.",
  keywords: [
    SITE_BRAND.name,
    "Minecraft Bedrock",
    SITE_ROLE.headline,
    "JsonUI",
    "MCBE UI",
    "custom HUD",
    "server forms",
    "Marketplace studio",
    SITE_ROLE.projectCredit,
    "web developer",
    "React",
    "Next.js",
    "Better Bedrock",
    "Poland",
  ],
  ogImageAlt: `AxmBro - ${SITE_ROLE.headline} portfolio and commission work`,
};

export const CTA_LABELS = {
  startProject: "Start a Project",
  contactMe: "Contact Me",
  contactForm: "Contact",
  commissions: "Commissions",
  myWork: "My Work",
  getInTouch: "Get in Touch",
  browseAllProjects: "All Projects",
  browseClientWork: "Browse Client Work",
  commissionDetails: "Commission Details",
  contactOptions: "Contact Options",
  requestSimilarWork: "Request Similar Work",
  viewFeaturedProjects: "Featured Projects",
  download: "Download",
  backToHome: "Back to Home",
} as const;

export const HOME_ANNOUNCEMENT = {
  title: "Commissions open",
  text: "Taking on mainly new Minecraft Bedrock UI work (JsonUI, HUDs, server forms, and more)",
  contactHref: contactFormHref(),
  contactLabel: CTA_LABELS.getInTouch,
  ariaLabel: "Availability",
} as const;

export const HOME_PAGE_TEXTS = {
  hero: {
    description:
      "I am a 20-year-old Computer Science student from Poland. I build custom Minecraft Bedrock UI in JsonUI - HUDs, server forms, and full UI systems - for studios, servers, and creators.\n\nI made Better Bedrock, a texture pack with over 2 million downloads, and built JsonUI for InPvP used by hundreds of thousands of players. I also build websites with React and Next.js.",
    ctaWork: CTA_LABELS.myWork,
    ctaContact: CTA_LABELS.getInTouch,
    eyebrow: "About",
    clientsLabel: "Worked With",
    portraitAria: (label: string) => `Switch AxmBro portrait - ${label}`,
  },
  trackRecord: {
    eyebrow: "Proof",
    title: "Track Record",
    description: (
      <>
        Numbers from client JsonUI work, my own releases, and my YouTube
        channels - for example,{" "}
        <Link href={projectDetailPath("zeqa_ui")}>Zeqa UI</Link> for InPvP.
      </>
    ),
    stats: {
      years: "Years Experience",
      downloadsValue: "2M+",
      downloads: "Personal Project Downloads",
      commissions: "Client Commissions",
      totalProjects: "Total Projects",
      youtubeSubscribers: "YouTube Subscribers",
      youtubeViews: "YouTube Views",
    },
  },
  selectedWork: {
    eyebrow: "Work",
    title: "Selected Projects",
    description:
      "Recent JsonUI for studios and creators, plus my own projects.",
    footerTitle: (totalCount: number) => `Explore All ${totalCount} Projects`,
    footerDescription: (clientCount: number) =>
      `${clientCount} are client commissions for studios, servers, and creators. The rest are my own packs, add-ons, and websites.`,
  },
  skills: {
    eyebrow: "Capabilities",
    title: "Skills",
    description:
      "JsonUI is my main skill. I also use web development and Computer Science basics in real projects. Each level reflects work I have shipped.",
    familiarLabel: "Familiar with",
  },
  experience: {
    eyebrow: "Background",
    title: "Experience",
    description: (
      <>
        I build Bedrock UI and websites as a freelancer, run Better Bedrock,
        and study Computer Science. Check{" "}
        <ProjectsBoardLink tab="commissions">Client Work</ProjectsBoardLink> for
        real shipped JsonUI projects.
      </>
    ),
  },
  workWithMe: {
    eyebrow: "Services",
    title: "Work With Me",
    description:
      "Tell me what you need, from a single screen to a full JsonUI system. Mockups, sketches, or a few lines of text are enough to start - I will reply with scope and next steps.",
    ctaPrimary: CTA_LABELS.startProject,
    ctaSecondary: CTA_LABELS.commissionDetails,
  },
  contactPage: {
    eyebrow: "Contact",
    title: CTA_LABELS.startProject,
    socialsEyebrow: "Channels",
    quickQuestionsEyebrow: "Answers",
    quickQuestionsTitle: "Quick Questions",
    socials:
      "Prefer a direct channel? Email, Discord, and GitHub work too, along with my other profiles and communities.",
    form: (
      <>
        Use the form for Minecraft Bedrock UI commissions. Ideas, sketches, or a
        rough scope are enough to start. For web projects, message me on Discord
        first. To see what I take on and how the work runs, read{" "}
        <Link href={ROUTES.commissions}>Commissions</Link>.
      </>
    ),
    quickQuestions: (
      <>
        Short answers to the most common questions. The{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionFaq)}>
          full FAQ
        </HashLink>{" "}
        covers pricing, timelines, revisions, and support.
      </>
    ),
  },
  projectsPage: {
    eyebrow: "Portfolio",
    title: "Projects",
    closerEyebrow: "Services",
    closerTitle: "Want Something Similar?",
    description: (count: number) =>
      `${count} projects - mainly Bedrock JsonUI commissions and personal releases for studios and creators, plus web work.`,
    closerDescription: (
      <>
        I build custom Bedrock UI for servers, studios, and creators. Read{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionServices)}>
          what I build
        </HashLink>{" "}
        or send a mockup or short brief, and I will reply with next steps.
      </>
    ),
  },
};

export const SITEMAP_PAGE_TEXTS = {
  eyebrow: "Directory",
  title: "Sitemap",
  allProjectsEyebrow: "Portfolio",
  allProjectsTitle: "All Projects",
  columns: {
    mainPages: "Main Pages",
    homeSections: "Homepage Sections",
    projectViews: "Project Views",
    featuredProjects: "Featured Projects",
    commissionGuide: "Commission Guide",
    contactLegal: "Contact & Legal",
  },
  projectViews: {
    all: CTA_LABELS.browseAllProjects,
    featured: CTA_LABELS.viewFeaturedProjects,
    personal: "Personal Projects",
    commissions: "Client Work",
  } satisfies Record<ProjectsBoardTab, string>,
  selectedClients: "Selected Clients",
  commissionFaqLinks: [
    { slug: "pricing", label: "Pricing FAQ" },
    { slug: "revisions", label: "Revisions FAQ" },
    { slug: "payments", label: "Payments FAQ" },
    { slug: "nda", label: "NDA FAQ" },
    { slug: "turnaround", label: "Turnaround FAQ" },
    { slug: "support", label: "Support FAQ" },
    { slug: "availability", label: "Availability FAQ" },
  ],
  intro:
    "Every main section of AxmBro.dev in one place - portfolio, commissions, contact, and legal pages.",
  allProjects: (
    <>
      The full project list - mainly client JsonUI and personal releases, plus web work.{" "}
      <Link href={ROUTES.projects}>Filter on the Projects page</Link> by featured,
      personal, or client work.
    </>
  ),
};

export const NOT_FOUND_PAGE_TEXTS = {
  eyebrow: "404",
  title: "Page not found",
  description: (
    <>
      This page is not on axmbro.dev - the link may be old or mistyped. Browse{" "}
      <Link href={ROUTES.projects}>{CTA_LABELS.browseAllProjects}</Link> for
      recent JsonUI work, or open{" "}
      <Link href={ROUTES.commissions}>Commissions</Link> if you want scope,
      process, and how to start before reaching out.
    </>
  ),
};

export const COMMISSIONS_PAGE_TEXTS = {
  title: "Minecraft Bedrock UI Commissions",
  intro: (
    <>
      Custom Minecraft Bedrock UI for servers, studios, and creators - from one
      server form to a full UI system. I am accepting new commissions. See{" "}
      <ProjectsBoardLink tab="commissions">past client work</ProjectsBoardLink>.
    </>
  ),
  clientsTitle: "Selected Clients & Studios",
  clientsDescription: "Servers and studios I have built JsonUI for.",
  services: (
    <>
      From a single screen to a full set of connected screens. I build the UI
      side - JsonUI and resource pack files - not Behavior Pack backend or server
      logic. Not sure your idea fits? Check the{" "}
      <HashLink href={commissionFaqItemHref("scope")}>scope FAQ</HashLink>.
    </>
  ),
  requirements:
    "The more you share at the start, the closer the first version will be to what you want.",
  process:
    "We agree on scope, price, and timeline before any work starts. Then I build, share progress, and deliver.",
  delivery:
    "You get ready-to-use JsonUI files and notes on how they fit into your pack. Support for 30 days after delivery is included.",
  faq: "Short answers about scope, pricing, timelines, revisions, payments, ownership, and support.",
  cta: "Send your idea, a sketch, or a few lines of text. I will reply with questions or a quote once the scope is clear.",
  ctaContact: CTA_LABELS.contactMe,
  ctaProjects: CTA_LABELS.browseAllProjects,
  eyebrow: "Services",
  clientsEyebrow: "Proof",
  servicesEyebrow: "Scope",
  servicesTitle: "What I Build",
  requirementsEyebrow: "Preparation",
  requirementsTitle: "What I Need From You",
  processEyebrow: "Workflow",
  processTitle: "Commission Process",
  deliveryEyebrow: "Handoff",
  deliveryTitle: "Delivery & Support",
  faqEyebrow: "Answers",
  faqTitle: "Commission FAQ",
  ctaEyebrow: "Contact",
  ctaTitle: "Ready to Discuss Your Project?",
};

export const COMMISSION_SERVICES: CommissionInfoItem[] = [
  {
    title: "Server Forms & Menus",
    description:
      "Custom server forms and full menus - shops, chest-style screens, and forms that link together. Animation when the project needs it.",
  },
  {
    title: "Custom HUDs & Overlays",
    description:
      "HUDs and everything around them - overlays, trackers, status bars, popups, and their animations.",
  },
  {
    title: "Other Game Screens",
    description:
      "Chat, pause menu, settings, and similar screens, connected to your pack and ScriptAPI flow.",
  },
  {
    title: "Other JsonUI Work",
    description:
      "Anything else in Bedrock UI. Not sure your idea fits? Ask - I usually handle the whole JsonUI side of a project.",
  },
];

export const COMMISSION_REQUIREMENTS: CommissionInfoItem[] = [
  {
    title: "Project Scope",
    description:
      "Which screens you need, how they connect, and what each one should do in game.",
  },
  {
    title: "Visual Direction",
    description:
      "Mockups from you or your artist work best. Sketches, screenshots, or a clear text outline also work. Full UI design from scratch is quoted separately.",
  },
  {
    title: "Technical Context",
    description:
      "Your resource pack, ScriptAPI hooks, file limits, and any systems the UI must connect to - including scripts your team writes.",
  },
];

export const COMMISSION_DELIVERABLES: CommissionInfoItem[] = [
  {
    title: "Production Files",
    description: "Organized JsonUI and resource pack files, ready for your project.",
  },
  {
    title: "Project Handoff",
    description: "Notes on how the files are structured and what matters for integration.",
  },
  {
    title: "30 Days of Support",
    description:
      "Fixes for layout issues caused by official Bedrock updates in the 30 days after delivery. Longer maintenance can be arranged.",
  },
];

export const PROCESS_STEPS = [
  {
    title: "1. Scope & Planning",
    description:
      "We agree on screens, mockups, limits, timeline, and payment. You get a firm quote before work starts.",
  },
  {
    title: "2. JsonUI Development",
    description:
      "I build and connect the UI, test the layouts, and prepare the files for your pack and scripts. You see progress at agreed checkpoints.",
  },
  {
    title: "3. Delivery & Support",
    description:
      "You get the files and handoff notes, plus the support period we agreed on.",
  },
];

export const HERO_PORTRAITS: readonly HeroPortrait[] = [
  {
    src: "/images/brand/axmbro-logo-irl.png",
    alt: "AxmBro portrait",
    kind: "photo",
    label: "Computer Science Student",
  },
  {
    src: "/images/brand/axmbro-logo-design.png",
    alt: "AxmBro illustrated logo",
    kind: "design",
    label: "Content Creator",
  },
  {
    src: "/images/brand/axmbro-logo-mc.png",
    alt: "AxmBro Minecraft character",
    kind: "minecraft",
    label: "Minecraft Bedrock Player",
  },
];

export const HEADER_TEXTS = {
  skipToContent: "Skip to main content",
  mainNavAria: "Main navigation",
  mobileNavAria: "Mobile navigation",
  openMenuAria: "Open menu",
  closeMenuAria: "Close menu",
  menu: "Menu",
  close: "Close",
} as const;

export const FOOTER_TEXTS = {
  description: SITE_METADATA.footerDescription,
  columns: {
    navigation: "Navigation",
    categories: "Categories",
    contact: "Contact",
  },
  /** No `tag` = whole board ("all" tab); with `tag` = one-shot board search preset. */
  categoryLinks: [
    { label: CTA_LABELS.browseAllProjects },
    { tag: "JsonUI", label: "JsonUI" },
    { tag: "Server Form", label: "Server Forms" },
    { tag: "Web", label: "Web Development" },
  ],
  copyright: (year: number) => `© ${year} ${SITE_BRAND.name} | All rights reserved`,
  sourceCode: { label: "Source Code", href: "https://github.com/AxmBro/axmbro.dev" },
  backToTop: "Back to Top",
  backToTopAria: "Back to top",
  localTime: {
    label: "Local time in Poland:",
    zone: "(GMT+1/GMT+2)",
    placeholder: "--:--",
  },
} as const;

export const PROJECTS_BOARD_TEXTS = {
  tabs: {
    all: "All",
    featured: "Featured",
    personal: "Personal",
    commissions: "Client Work",
  } satisfies Record<ProjectsBoardTab, string>,
  tabsAria: "Filter projects",
  sortOptions: {
    newest: "Newest",
    oldest: "Oldest",
    alphabetical: "Alphabetical (A-Z)",
  } satisfies Record<ProjectsBoardSort, string>,
  sortPlaceholder: "Sort by...",
  sortAria: "Sort projects",
  clearSort: "✕ Clear sort",
  searchPlaceholder: "Search...",
  searchAria: "Search projects",
  clearSearch: "Clear search",
  noResultsFor: "No results for:",
  orSwitchTo: " or switch to ",
  emptyFilter: "No projects in this filter. Switch to",
  or: " or ",
} as const;

export const PROJECT_TAG_TEXTS = {
  personal: "Personal",
  commissions: "Commissioned",
  featured: "Featured",
  aria: "Project tags",
} as const;

export const COOKIE_CONSENT_TEXTS = {
  title: "Analytics cookies",
  text: "Optional Google Analytics cookies measure site traffic and are set only if you accept. You can change this anytime in Cookie Settings in the footer.",
  accept: "Accept",
  reject: "Reject",
  settings: "Cookie Settings",
} as const;

export const SOCIAL_LINK_TEXTS = {
  copied: "Copied!",
} as const;
