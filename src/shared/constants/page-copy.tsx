import Link from "next/link";
import {
  contactSectionHref,
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

export const EXPERIENCE_TREE: ExperienceItem[] = [
  {
    role: "Freelance Minecraft Bedrock UI Engineer & Web Developer",
    date: "Present",
    company: "Self-Employed",
    items: [
      {
        name: "Deliver commercial Minecraft Bedrock JsonUI for Marketplace studios and private servers, including custom HUDs, server forms, and menu systems.",
      },
      {
        name: "Build responsive websites and landing pages with React, Next.js, TypeScript, and SCSS for commission and freelance clients.",
      },
      {
        name: "Handle JsonUI-focused technical planning, project scope, client communication, delivery, contracts, and invoicing for freelance and B2B work.",
      },
    ],
    buttons: [{ text: "Browse Client Work", projectsTab: "commissions" }],
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
            and grew it into a long-running Minecraft Bedrock UI and texture
            project with more than 2M downloads.
          </>
        ),
      },
      {
        name: "Lead product direction, release planning, community communication, and promotional content across video and graphics.",
      },
      {
        name: "Designed the interface system and co-developed the open-source project website with a technical partner.",
      },
    ],
    buttons: [
      {
        text: "View Better Bedrock",
        href: projectDetailPath("better_bedrock"),
      },
    ],
  },
  {
    role: "Computer Science Student",
    date: "Oct 2025 - Present",
    company: "University of Silesia",
    items: [
      {
        name: "Building a formal foundation in software engineering and computer systems.",
      },
      {
        name: "Current coursework includes algorithms, databases, object-oriented programming, computer networks, and digital logic.",
      },
    ],
  },
];

export const SKILLS_CARDS: SkillCard[] = [
  {
    title: "Minecraft Bedrock Edition (Core Expertise)",
    items: [
      { name: "JsonUI (Custom UI, HUDs, Server Forms)", value: "Expert" },
      { name: "Resource Packs", value: "Advanced" },
      { name: "Entities & Molang", value: "Intermediate" },
      { name: "ScriptAPI & Regolith", value: "Beginner" },
    ],
  },
  {
    title: "Frontend & Web Development (Active Learning)",
    items: [
      { name: "JavaScript & TypeScript", value: "Intermediate" },
      { name: "React & Next.js", value: "Intermediate" },
      { name: "HTML, SCSS & Responsive UI", value: "Intermediate" },
      { name: "Vercel Deployment", value: "Beginner" },
    ],
  },
  {
    title: "Computer Science Fundamentals",
    items: [
      { name: "Algorithms & Data Structures", value: "Intermediate" },
      { name: "Object-Oriented Programming", value: "Intermediate" },
      { name: "Databases & SQL", value: "Beginner" },
      { name: "Computer Networks & Digital Logic", value: "Beginner" },
    ],
  },
  {
    title: "Development Tools & Languages",
    items: [
      { name: "Git & GitHub", value: "Intermediate" },
      { name: "C++, Java & Python", value: "Beginner" },
      { name: "Linux", value: "Beginner" },
    ],
  },
  {
    title: "Management & Professional Skills",
    items: [
      { name: "Community Management", value: "Advanced" },
      { name: "Project Scoping & Roadmapping", value: "Intermediate" },
      { name: "Client Communication (B2B)", value: "Intermediate" },
      { name: "Contracts & Invoicing", value: "Intermediate" },
    ],
  },
  {
    title: "Languages",
    items: [
      { name: "Polish", value: "Native" },
      { name: "English", value: "B2 (Learning)" },
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

export const CONTACT_FORM_INTENTS = [
  {
    id: "complete-ui",
    label: "Complete UI System",
    template:
      "Hello AxmBro! I'd like to discuss a complete UI system for my Minecraft Bedrock project. Here are the details: ",
  },
  {
    id: "hud-overlay",
    label: "HUD or Overlay",
    template:
      "Hello AxmBro! I'd like to discuss a custom HUD or overlay for my Minecraft Bedrock project. Here are the details: ",
  },
  {
    id: "forms-menus",
    label: "Server Forms or Menus",
    template:
      "Hello AxmBro! I'd like to discuss server forms or menus for my Minecraft Bedrock project. Here are the details: ",
  },
  {
    id: "web-project",
    label: "Web Project",
    template:
      "Hello AxmBro! I'd like to discuss a responsive web project. Here are the details: ",
  },
  {
    id: "other",
    label: "Other",
    template:
      "Hello AxmBro! I'd like to discuss a custom project. Here are the details: ",
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
    "20-year-old Computer Science student and Minecraft Bedrock UI Engineer from Poland. Custom JsonUI, HUDs, server forms, and React and Next.js websites for Marketplace studios and creators.",
  footerDescription:
    "Computer Science student and Minecraft Bedrock UI Engineer from Poland. Custom JsonUI, HUDs, server forms, and React websites for studios and creators.",
  projectsDescription:
    "Portfolio of Minecraft Bedrock UI commissions, personal JsonUI releases, and web projects, including Better Bedrock, client HUDs, server forms, and featured studio work.",
  commissionsDescription:
    "Commission custom Minecraft Bedrock JsonUI, HUDs, server forms, and menu systems for studios, servers, and creators. Review scope, process, delivery, and FAQ before starting a project.",
  contactDescription:
    "Contact AxmBro for Minecraft Bedrock UI commissions and web projects. Send a project brief or reach out via email, Discord, or GitHub.",
  sitemapDescription:
    "Browse AxmBro.dev pages, portfolio sections, project views, commission information, contact options, and legal pages.",
  privacyPolicyDescription:
    "Privacy Policy for AxmBro.dev - how personal data is collected and processed through the portfolio site and contact form.",
  termsOfUseDescription:
    "Terms of Use for AxmBro.dev - rules for using this portfolio website and related services.",
  notFoundDescription:
    "This page does not exist on AxmBro.dev. Check the URL or return to the homepage.",
  keywords: [
    "AxmBro",
    "Minecraft Bedrock",
    "Minecraft Bedrock UI Engineer",
    "JsonUI",
    "MCBE UI",
    "custom HUD",
    "server forms",
    "Marketplace studio",
    "UI Engineer",
    "web developer",
    "React",
    "Next.js",
    "Better Bedrock",
    "Poland",
  ],
  ogImageAlt:
    "AxmBro - Minecraft Bedrock UI Engineer portfolio and commission work",
};

export const CTA_LABELS = {
  startProject: "Start a Project",
  browseAllProjects: "Browse All Projects",
  viewSelectedWork: "View Selected Work",
  browseClientWork: "Browse Client Work",
  commissionDetails: "Commission Details",
  minecraftBedrockCommissions: "Minecraft Bedrock Commissions",
  contactOptions: "Contact Options",
  requestSimilarWork: "Request Similar Work",
  viewFeaturedProjects: "View Featured Projects",
} as const;

export const HOME_ANNOUNCEMENT = {
  label: "Commissions open",
  text: "Taking new Minecraft Bedrock UI work (JsonUI, HUDs, and server forms)",
} as const;

export const HOME_PAGE_TEXTS = {
  hero: {
    description:
      "I am a 20-year-old Computer Science student from Poland, specializing in Minecraft Bedrock Edition development. I engineer advanced interfaces for Marketplace studios, private servers, and independent creators, including custom JsonUI, HUDs, and server forms.\n\nI also build responsive websites with React and Next.js, explore AI tools to grow my software engineering skills, and keep pushing personal projects. I focus on pixel-perfect layouts, scalable code, and seamless user experience",
    ctaWork: CTA_LABELS.browseAllProjects,
    ctaCommissions: CTA_LABELS.minecraftBedrockCommissions,
  },
  trackRecord: {
    description: (
      <>
        Paid commissions, independent releases, and technical content that show
        the scope of my Minecraft Bedrock UI work, project reach, and audience
        growth, including work for studios such as{" "}
        <Link href={projectDetailPath("zeqa_ui")}>InPvP (Zeqa UI)</Link>.
      </>
    ),
    clientsDescription:
      "Studios and creators I have worked with on commercial Minecraft Bedrock projects, including custom game UIs, HUDs, and server forms.",
  },
  selectedWork: {
    description:
      "Selected studio commissions and independent projects that show technical scope, interface quality, and real player reach.",
    exploreMore:
      "Browse the full portfolio across client commissions, personal releases, and featured JsonUI work. Filter by all projects, featured work, personal releases, or client commissions.",
  },
  skills: {
    description:
      "A focused view of the tools I use in real projects, the skills I apply through practical work, and the areas I am still learning.",
  },
  experience: {
    description:
      "My background combines commercial Minecraft Bedrock UI work, freelance web development, leading a project with more than 2M downloads, and ongoing Computer Science studies.",
  },
  footer: {
    description: SITE_METADATA.footerDescription,
  },
  contactPage: {
    socials:
      "Prefer direct contact? Use email, Discord, or GitHub. Additional profiles and community links are available below.",
    form: (
      <>
        Send your project brief through the form below. For scope, pricing context, and
        process, see{" "}
        <Link href={ROUTES.commissions}>Commissions</Link>
        . Include the target version, required screens, and any existing mockups or
        textures. I usually respond within 24 hours.
      </>
    ),
  },
  projectsPage: {
    description: (count: number) =>
      `A collection of ${count} projects, from custom Minecraft Bedrock interfaces (JsonUI) for marketplace studios and private clients to web development. Each one reflects a real problem solved and skills applied.`,
  },
};

export const COMMISSIONS_PAGE_TEXTS = {
  intro: (
    <>
      Custom Minecraft Bedrock JsonUI for studios, servers, and creators who need
      more than a simple reskin. I build HUDs, server forms, menus, and connected
      UI systems around your designs and technical requirements. Currently
      accepting new Minecraft Bedrock UI commissions.{" "}
      <Link href={ROUTES.projects}>{CTA_LABELS.browseAllProjects}</Link> for
      recent examples.
    </>
  ),
  services:
    "Focused Minecraft Bedrock interface work, from individual screens to complete UI systems.",
  requirements: (
    <>
      A clear starting point keeps the project faster, easier to estimate, and
      closer to the result you expect. When you are ready,{" "}
      <Link href={contactSectionHref(SECTION_IDS.startProject)}>
        send the brief through the contact form
      </Link>
      .
    </>
  ),
  process:
    "A simple three-step workflow from the first technical review to final delivery and support.",
  delivery:
    "You receive organized project files, a clear handoff, and support after release.",
  faq: "Answers about scope, design files, pricing, timelines, ownership, and support.",
  cta: "Send the project scope, required screens, target Minecraft version, and any mockups or textures you already have. I will review the details and reply with the next steps.",
  ctaContact: CTA_LABELS.startProject,
  ctaProof: CTA_LABELS.viewSelectedWork,
  ctaSecondary: CTA_LABELS.contactOptions,
};

export const COMMISSION_SERVICES: CommissionInfoItem[] = [
  {
    title: "Custom HUDs & Overlays",
    description:
      "Gameplay HUDs, status displays, trackers, overlays, and interface elements built around your visual direction.",
  },
  {
    title: "Server Forms & Menu Systems",
    description:
      "Custom server forms, navigation menus, chest screens, shops, and connected interfaces for Bedrock projects.",
  },
  {
    title: "Resource Pack UI Integration",
    description:
      "JsonUI structure, textures, animations, and layouts prepared to work cleanly with your resource pack and ScriptAPI flow.",
  },
];

export const COMMISSION_REQUIREMENTS: CommissionInfoItem[] = [
  {
    title: "Project Scope",
    description:
      "A list of required screens, expected interactions, target platforms, and the Minecraft version you support.",
  },
  {
    title: "Visual Direction",
    description:
      "Ready textures and mockups are ideal. Clear sketches, references, or a structured text brief can also work.",
  },
  {
    title: "Technical Context",
    description:
      "Share the existing resource pack, ScriptAPI requirements, file constraints, and any systems the UI must connect to.",
  },
];

export const COMMISSION_DELIVERABLES: CommissionInfoItem[] = [
  {
    title: "Production Files",
    description:
      "Organized JsonUI, texture, and resource pack files prepared for testing and deployment in your project.",
  },
  {
    title: "Project Handoff",
    description:
      "A clear explanation of the delivered structure, important integration details, and any agreed usage terms.",
  },
  {
    title: "30 Days of Support",
    description:
      "Technical support after delivery for agreed fixes and Minecraft updates that affect the commissioned interface.",
  },
];

export const PROCESS_STEPS = [
  {
    title: "1. Scope & Planning",
    description:
      "We review the required screens, technical constraints, existing files, mockups, and textures. You receive a clear scope and timeline before development starts.",
  },
  {
    title: "2. JsonUI Development",
    description:
      "I build the interface, connect the required screens, test the layouts, and prepare the UI for your resource pack and ScriptAPI workflow.",
  },
  {
    title: "3. Delivery & Support",
    description:
      "You receive the agreed project files and a clear handoff, followed by 30 days of technical support for the delivered interface.",
  },
];
