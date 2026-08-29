import Link from "next/link";
import { HashLink } from "@/shared/ui/hash-link";
import { ProjectsBoardLink } from "@/shared/ui/projects-tag-link";
import {
  commissionFaqItemHref,
  commissionSectionHref,
  contactFormHref,
  homeSectionHref,
  SECTION_IDS,
} from "./anchors";
import { projectDetailPath, ROUTES } from "./routes";
import type {
  ClientStudio,
  ExperienceItem,
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

export const EXPERIENCE_TREE: ExperienceItem[] = [
  {
    role: `Freelance ${SITE_ROLE.headline}`,
    date: "Present",
    company: "Self-Employed",
    items: [
      {
        name: "Ship custom Bedrock JsonUI for studios, servers, and creators - from single screens to full UI systems.",
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
      { name: "C++, Java & Python", value: "Beginner" },
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

export const GALLERY_TEXTS = {
  typeLabel: {
    commissions: "Commissioned",
    personal: "Personal Project",
  },
  imageAlt: (title: string, imageNumber: number) =>
    `${title} interface screenshot ${imageNumber}`,
  aria: {
    region: "Project showcase gallery",
    prevProject: "Previous project",
    nextProject: "Next project",
    chooseProject: "Choose project",
  },
} as const;

export const CONTACT_FORM_TEXTS = {
  emailLabel: "Email",
  emailPlaceholder: "Your email",
  discordLabel: "Discord (optional)",
  discordPlaceholder: "Username or ID",
  topicLabel: "Topic (optional)",
  messagePlaceholder: "Your ideas, sketches, scope, or questions...",
  submit: "Send Message",
  submitting: "Sending...",
  success: "Message sent. I will reply as soon as possible.",
  error: "Could not send. Try again or use email.",
  errorUnavailable:
    "The contact form is temporarily unavailable. Email axmbro@gmail.com directly.",
  validation: {
    email: "Enter a valid email address.",
    emptyMessage: "Write your message.",
    presetOnly: "Add your details below the preset line.",
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
    logoHeight: 88,
  },
  {
    name: "Radium Studio",
    href: "https://www.radium-studio.com/",
    logoSrc: "/images/companies-logos/radium-studio.png",
    logoWidth: 370,
    logoHeight: 370,
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
    `Computer Science student and ${SITE_ROLE.headline} from Poland. Mainly custom Bedrock JsonUI for studios and creators - plus React sites.`,
  projectsDescription:
    "Portfolio of mainly Bedrock JsonUI commissions and personal releases for studios and creators, plus web work - including Better Bedrock and studio client work.",
  commissionsDescription:
    "Commission custom Bedrock JsonUI for studios, servers, and creators. Scope, process, FAQ, and how to start.",
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
    "AxmBro",
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
  myWork: "My Work",
  getInTouch: "Get in Touch",
  browseAllProjects: "All Projects",
  viewSelectedWork: "View Selected Projects",
  browseClientWork: "Browse Client Work",
  commissionDetails: "Commission Details",
  minecraftBedrockCommissions: "Minecraft Bedrock Commissions",
  contactOptions: "Contact Options",
  requestSimilarWork: "Request Similar Work",
  viewFeaturedProjects: "Featured Projects",
  nextPhoto: "Next photo",
} as const;

export const HOME_ANNOUNCEMENT = {
  title: "Commissions open",
  text: "Mainly custom Bedrock JsonUI commissions",
  contactHref: contactFormHref(),
  contactLabel: CTA_LABELS.getInTouch,
} as const;

export const HOME_PAGE_TEXTS = {
  hero: {
    description:
      "I am a 20-year-old Computer Science student from Poland, specializing in Minecraft Bedrock Edition development - mainly custom JsonUI for studios, servers, and creators.\n\nI also build React and Next.js sites, explore new tools and use AI in a smart way. I take time on every project and focus on clean design, reliable code, and getting the small details right.",
    ctaWork: CTA_LABELS.myWork,
    ctaContact: CTA_LABELS.getInTouch,
  },
  trackRecord: {
    description: (
      <>
        Numbers from paid JsonUI work, personal releases, and content - for
        example, <Link href={projectDetailPath("zeqa_ui")}>Zeqa UI</Link> for
        InPvP.
      </>
    ),
    clientsTitle: "Selected Clients & Studios",
    clientsDescription:
      "Commercial Bedrock JsonUI clients and studio partners.",
  },
  selectedWork: {
    description:
      "Recent JsonUI for studios and creators, plus my own projects.",
    footerTitle: "Explore More Projects",
    footerDescription:
      "More client JsonUI projects, personal releases, and featured work.",
  },
  skills: {
    description:
      "Bedrock JsonUI first. Web and CS fundamentals in active use. Honest levels - based on what I ship in real projects.",
  },
  experience: {
    description: (
      <>
        Bedrock & Web freelancer. Better Bedrock founder. CS student. Check{" "}
        <ProjectsBoardLink tab="commissions">Client Work</ProjectsBoardLink> for
        real shipped JsonUI projects.
      </>
    ),
  },
  workWithMe: {
    description: (
      <>
        I am open to hearing from you anytime. Mainly custom Bedrock JsonUI
        commissions for studios, servers, and creators. Review{" "}
        <HashLink href={homeSectionHref(SECTION_IDS.selectedWork)}>
          Selected Projects
        </HashLink>{" "}
        for recent work, or see{" "}
        <Link href={ROUTES.commissions}>Commissions</Link> for scope and how to
        start.
      </>
    ),
    ctaPrimary: CTA_LABELS.contactMe,
  },
  footer: {
    description: SITE_METADATA.footerDescription,
  },
  contactPage: {
    socials:
      "Email, Discord, and GitHub if you prefer a direct channel. Extra profiles and community links here.",
    form: (
      <>
        Mainly custom Bedrock JsonUI commissions - use the form below for ideas,
        sketches, or scope. For web development, message me on Discord DM first -
        we arrange that there. For what I take on and limits, see the{" "}
        <HashLink href={commissionFaqItemHref("scope")}>scope FAQ</HashLink> on
        Commissions. Review{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionServices)}>
          scope
        </HashLink>{" "}
        and{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionProcess)}>
          workflow
        </HashLink>{" "}
        there when you are ready.
      </>
    ),
    quickQuestions: (
      <>
        Availability in brief below. For fit and service scope, see the{" "}
        <HashLink href={commissionFaqItemHref("scope")}>scope FAQ</HashLink>. For
        pricing, process, delivery, and the rest, see{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionFaq)}>
          Commissions FAQ
        </HashLink>
        .
      </>
    ),
  },
  projectsPage: {
    description: (count: number) =>
      `${count} projects - mainly Bedrock JsonUI commissions and personal releases for studios and creators, plus web work.`,
    closerDescription: (
      <>
        Want something similar? Review{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionServices)}>
          what I build
        </HashLink>{" "}
        and the{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionProcess)}>
          commission workflow
        </HashLink>{" "}
        before you get in touch.
      </>
    ),
  },
};

export const SITEMAP_PAGE_TEXTS = {
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
  intro: (
    <>
      Custom Bedrock JsonUI for studios, servers, and creators.{" "}
      <ProjectsBoardLink tab="commissions">
        {CTA_LABELS.browseClientWork}
      </ProjectsBoardLink>
      . I am currently{" "}
      <HashLink href={commissionFaqItemHref("availability")}>
        accepting commissions
      </HashLink>
      .
    </>
  ),
  clientsTitle: "Selected Clients & Studios",
  clientsDescription:
    "Commercial Bedrock JsonUI clients and studio partners.",
  services: (
    <>
      Single screens up to full connected UI sets. JsonUI and resource pack
      integration only - not full Behavior Pack backend or complex server logic.
      For what fits and what does not, see the{" "}
      <HashLink href={commissionFaqItemHref("scope")}>scope FAQ</HashLink> or
      the cards below.
    </>
  ),
  requirements: (
    <>
      The more context you share up front, the closer the result.{" "}
      <Link href={contactFormHref()}>Contact me</Link> with scope, references,
      or a short brief when you are ready.
    </>
  ),
  process:
    "We agree on scope, pricing, and timeline first, then I build the UI, and finish with delivery and support.",
  delivery: (
    <>
      Production-ready JsonUI files and a clear handoff for your team.
      Post-delivery support is included - see the cards below and the{" "}
      <HashLink href={commissionFaqItemHref("support")}>support FAQ</HashLink>.
    </>
  ),
  faq: (
    <>
      Common questions on scope, design files,{" "}
      <HashLink href={commissionFaqItemHref("pricing")}>pricing</HashLink>,{" "}
      <HashLink href={commissionFaqItemHref("turnaround")}>timelines</HashLink>,{" "}
      <HashLink href={commissionFaqItemHref("revisions")}>revisions</HashLink>,{" "}
      <HashLink href={commissionFaqItemHref("payments")}>payments</HashLink>,{" "}
      <HashLink href={commissionFaqItemHref("ownership")}>ownership</HashLink>,{" "}
      <HashLink href={commissionFaqItemHref("nda")}>confidentiality</HashLink>,
      and{" "}
      <HashLink href={commissionFaqItemHref("support")}>
        post-delivery support
      </HashLink>
      .
    </>
  ),
  cta: "Share your ideas, sketches, or scope - or describe what you need in plain words. I will review and reply with next steps.",
  ctaContact: CTA_LABELS.contactMe,
  ctaProjects: CTA_LABELS.browseAllProjects,
};

export const COMMISSION_SERVICES: CommissionInfoItem[] = [
  {
    title: "Server Forms & Menu Systems",
    description:
      "Custom server forms and complete menu layouts - bespoke designs, chest-style screens, shops, and connected form flows. UI animation and polish when the scope needs it.",
  },
  {
    title: "Custom HUDs & Overlays",
    description:
      "Custom HUDs and everything tied to them - overlays, trackers, status UI, popups, custom layouts, and related UI animation.",
  },
  {
    title: "Custom UI",
    description:
      "Other screen work - chat, pause menu, settings, and similar interfaces - plus JsonUI, textures, and layouts wired into your pack and ScriptAPI flow.",
  },
  {
    title: "Other JsonUI Work",
    description:
      "Anything else Bedrock UI related that does not fit the categories above. Not sure if your idea fits? Ask - I usually handle the full JsonUI side of a project.",
  },
];

export const COMMISSION_REQUIREMENTS: CommissionInfoItem[] = [
  {
    title: "Project Scope",
    description:
      "Which screens you need - server forms, HUDs, menus, or other JsonUI - how they connect, and what the UI should do in-game.",
  },
  {
    title: "Visual Direction",
    description:
      "Mockups from you, an artist, or your studio team are ideal. Sketches, screenshots, or a clear text outline work too. Full interface design from scratch can be quoted separately.",
  },
  {
    title: "Technical Context",
    description:
      "Your resource pack, ScriptAPI hooks, file limits, and systems the UI must plug into - including when your team handles scripts on their side.",
  },
];

export const COMMISSION_DELIVERABLES: CommissionInfoItem[] = [
  {
    title: "Production Files",
    description:
      "Organized JsonUI and resource pack files ready for your project.",
  },
  {
    title: "Project Handoff",
    description:
      "How the files are structured and what matters for integration.",
  },
  {
    title: "30 Days of Support",
    description:
      "Layout fixes for issues caused by official Bedrock updates during the 30 days after delivery. Further maintenance can be arranged after that.",
  },
];

export const PROCESS_STEPS = [
  {
    title: "1. Scope & Planning",
    description:
      "We align on screens, mockups, constraints, scope, timeline, and payment. You get a firm estimate before build starts.",
  },
  {
    title: "2. JsonUI Development",
    description:
      "I build and connect the UI, test layouts, and prepare files for your pack and scripts. I share progress at agreed checkpoints so layout and flow stay on track before final delivery.",
  },
  {
    title: "3. Delivery & Support",
    description:
      "You receive the agreed files and handoff notes, plus the post-delivery support period agreed in scope.",
  },
];
