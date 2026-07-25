import type { ReactNode } from "react";
import Link from "next/link";
import {
  contactSectionHref,
  homeSectionHref,
  SECTION_IDS,
} from "./anchors";
import { projectDetailPath, ROUTES } from "./routes";
import type { ProjectsBoardTab } from "@/shared/lib/projects-board-state";
import { ProjectsBoardLink } from "@/shared/ui/projects-tag-link";

export type ProjectType = "personal" | "commissions";

export interface ProjectItem {
  title: string;
  description: string;
  tags?: string[];
  imgSrc?: string;
  logoSrc?: string;
  star?: boolean;
  downloadLink?: string;
  url?: string;
  type?: ProjectType;
  date?: string;
}

export const CAREER_START_DATE = new Date(2022, 0, 1);

export const PROJECTS: ProjectItem[] = [
  {
    title: "Better Bedrock",
    description:
      "A comprehensive, highly customizable UI and texture modification for MCBE. Enhances gameplay functionality with nearly 300 configuration options, fully supported across all platforms.",
    tags: ["JsonUI", "Models", "React", "Web"],
    imgSrc: "bbReleaseThumbnail",
    logoSrc: "better_bedrock",
    star: true,
    downloadLink: "https://betterbedrock.com/downloads/better-bedrock",
    url: "better_bedrock",
    type: "personal",
    date: "Feb 2022 - Present",
  },
  {
    title: "One Slime Block Adventure",
    description:
      "A large-scale adventure map commissioned by YouTuber Slime Block. Engineered and developed advanced custom interfaces, including specialized HUDs and interactive server forms.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "obsba",
    logoSrc: "one_slime_block_adventure",
    star: true,
    downloadLink:
      "https://www.minecraft.net/en-us/marketplace/pdp/mush-co/one-slime-block-adventure/ade4af56-a677-445d-a6ed-628e28eb7d88",
    url: "one_slime_block_adventure",
    type: "commissions",
    date: "Jul 2025",
  },
  {
    title: "Ra Survival",
    description:
      "A Call of Duty Zombies-inspired survival map for MCBE. Commissioned to design and implement immersive custom UI systems that match the game's dark aesthetic.",
    tags: ["JsonUI", "HUD", "Inventory"],
    imgSrc: "raThumbnail",
    logoSrc: "ra_survival",
    star: true,
    url: "ra_survival",
    type: "commissions",
    date: "Sep 2025",
  },
  {
    title: "Zeqa UI",
    description:
      "Custom JsonUI commissioned by InPvP for Zeqa, the largest Minecraft Bedrock PvP server. Clean layouts, smooth animations, and optimized server forms with selective HUD work.",
    tags: ["JsonUI", "Server Form", "HUD"],
    imgSrc: "zeqa_ui0",
    logoSrc: "zeqa_ui",
    star: true,
    url: "zeqa_ui",
    type: "commissions",
    date: "Jul 2026",
  },
  {
    title: "Mineville UI",
    description:
      "A complex, clean, and animated custom user interface suite. Featuring highly optimized client-side minimaps, modular trade UIs, armor HUD trackers, and custom server forms.",
    tags: ["JsonUI", "Server Form", "HUD"],
    imgSrc: "main",
    logoSrc: "mineville_ui",
    star: true,
    url: "mineville_ui",
    type: "commissions",
    date: "Apr 2026",
  },
  {
    title: "Murder Detector+",
    description:
      "An experimental utility pack designed to test the limits of JsonUI capabilities and model modifications. Created as a diagnostic tool to demonstrate server-side vulnerability mechanics.",
    tags: ["Entities", "Models"],
    imgSrc: "murder_detector",
    logoSrc: "murder_detector",
    star: true,
    downloadLink: "https://betterbedrock.com/project/preview/murder_detector",
    url: "murder_detector",
    type: "personal",
    date: "Sep 2022",
  },
  {
    title: "Bedrock Portal UI",
    description:
      "A sophisticated, OreUI-themed interface. Features a dark-mode layout with scalable elements, subtle animations, and highly optimized rendering controllers.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "bpui1",
    url: "bedrock_portal_ui",
    type: "commissions",
    date: "Oct 2025",
  },
  {
    title: "Shop UI",
    description:
      "A vanilla-styled commercial interface designed from scratch. Initially an experimental layout, later acquired by a private client for a custom server economy.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "shop_form1",
    url: "shop_ui",
    type: "commissions",
    date: "Dec 2024",
  },
  {
    title: "DUI",
    description:
      "A sleek, modern and highly optimized custom user interface. Featuring clean, premium dark themed UI.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "dui1",
    downloadLink: "https://youtu.be/xFdnwd2tj8E",
    url: "dui",
    type: "commissions",
    date: "Apr 2026",
  },
  {
    title: "Synergy UI",
    description:
      "A clean, TFT-inspired responsive interface commissioned by a private client. Focuses on clear data presentation and seamless user interactions.",
    tags: ["JsonUI", "HUD"],
    imgSrc: "synergy_ui0",
    url: "synergy_ui",
    type: "commissions",
    date: "Aug 2025",
  },
  {
    title: "OS UI",
    description:
      "A personal R&D project exploring full-screen operating system aesthetics within the MCBE engine. Showcases advanced layout structuring.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "osui1",
    url: "os_ui",
    type: "personal",
    date: "Sep 2025",
  },
  {
    title: "Hugo SMP UI",
    description:
      "A Java Edition-styled Pause Menu commissioned for a cross-play bedrock-java server. Includes a custom scoreboard integration to ensure cross-platform visual consistency.",
    tags: ["JsonUI", "HUD"],
    imgSrc: "hugo_smp_ui1",
    url: "hugo_smp_ui",
    type: "commissions",
    date: "Nov 2025",
  },
  {
    title: "Hometree UI",
    description:
      "A minimalist, colorful server form interface tailored to client specifications.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "hometree1",
    url: "hometree_ui",
    type: "commissions",
    date: "Dec 2023",
  },
  {
    title: "Simple UI",
    description:
      "An experimental server form layout created to test responsive JsonUI bindings.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "simple_server_form1",
    url: "simple_ui",
    type: "personal",
    date: "Aug 2024",
  },
  {
    title: "Red UI",
    description:
      "An ongoing experimental project focusing on aggressive, red-themed in-game UI layouts and custom component styling.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "redui1",
    url: "red_ui",
    type: "personal",
    date: "Sep 2024",
  },
  {
    title: "Custom Sky Overlay",
    description:
      "A comprehensive collection of 16 custom skyboxes for MCBE. Engineered with subpack support for seamless user customization without modifying core files.",
    tags: ["Textures"],
    imgSrc: "custom_sky_overlay1",
    url: "custom_sky_overlay",
    downloadLink:
      "https://betterbedrock.com/project/preview/custom_sky_overlay",
    type: "personal",
    date: "Oct 2021",
  },
  {
    title: "This Website",
    description:
      "My personal portfolio and technical sandbox. Developed from the ground up with React and Next.js to showcase my Minecraft Bedrock UI work and frontend development.",
    tags: ["React", "JavaScript", "TypeScript", "CSS", "Web"],
    imgSrc: "thisweb",
    type: "personal",
    date: "Nov 2024 - Present",
  },
];

type ExperienceButton =
  | { text: string; href: string; projectsTab?: never }
  | { text: string; projectsTab: ProjectsBoardTab; href?: never };

interface ExperienceItem {
  role: string;
  date: string;
  company: string;
  items: { name: ReactNode }[];
  buttons?: ExperienceButton[];
}

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

interface SkillCard {
  title: string;
  items: { name: string; value: string }[];
}

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

export interface SocialLink {
  href: string;
  text: string;
  iconId: SocialIconId;
  copyText?: string;
  channel: "direct" | "extra";
}

export type SocialIconId =
  | "github"
  | "discord"
  | "youtube"
  | "twitter"
  | "instagram"
  | "mail"
  | "betterbedrock";

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

export const FOOTER_SOCIAL_ENTRIES: FooterSocialEntry[] = [
  { iconId: "github" },
  { iconId: "mail" },
  { iconId: "discord", text: "Discord (DM)" },
  { iconId: "youtube", text: "YouTube" },
  { iconId: "betterbedrock", text: "Better Bedrock Profile" },
  { iconId: "instagram" },
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

const HOME_SELECTED_PROJECT_URLS = [
  "better_bedrock",
  "one_slime_block_adventure",
  "ra_survival",
  "zeqa_ui",
];

interface ClientStudio {
  name: string;
  href: string;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
}

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

export const getHomeSelectedProjects = () =>
  HOME_SELECTED_PROJECT_URLS.map((url) =>
    PROJECTS.find((p) => p.url === url),
  ).filter((p): p is ProjectItem => Boolean(p));

export function getFeaturedProjects(): ProjectItem[] {
  return PROJECTS.filter((project) => Boolean(project.star));
}

export function getProjectTypeLabel(project: ProjectItem): string {
  if (project.type === "commissions") return "Client Commission";
  if (project.type === "personal") return "Personal Project";
  return "Portfolio Project";
}

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
        <Link href={projectDetailPath("zeqa_ui")}>Zeqa UI (InPvP)</Link>.
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
    description: (
      <>
        My background combines commercial Minecraft Bedrock UI work, freelance
        web development, leading a project with more than 2M downloads, and
        ongoing Computer Science studies.{" "}
        <ProjectsBoardLink tab="commissions">Browse Client Work</ProjectsBoardLink>
        {" "}to see commissioned projects.
      </>
    ),
  },
  contact: {
    description: (
      <>
        Ready to commission Minecraft Bedrock UI or discuss a web project? Review{" "}
        <Link href={homeSectionHref(SECTION_IDS.selectedWork)}>
          Selected Work
        </Link>{" "}
        for recent examples, then send your project brief directly.
      </>
    ),
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

export interface CommissionInfoItem {
  title: string;
  description: string;
}

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

export interface FAQItem {
  question: string;
  /** Plain-text answer for FAQPage JSON-LD (and default UI when `answer` is omitted). */
  answerText: string;
  /** Rich UI answer; defaults to `answerText`. */
  answer?: ReactNode;
  slug?: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What value do you bring to my project?",
    slug: "value",
    answerText:
      "You get a developer who builds JsonUI around Bedrock constraints and player flow, including custom HUDs, server forms, chest UIs, and menu systems that integrate with your resource pack and scripts. I can also take on matching responsive web work when needed. See Selected Work for recent examples.",
    answer: (
      <>
        You get a developer who builds JsonUI around Bedrock constraints and
        player flow, including custom HUDs, server forms, chest UIs, and menu
        systems that integrate with your resource pack and scripts. I can also
        take on matching responsive web work when needed.{" "}
        <Link href={homeSectionHref(SECTION_IDS.selectedWork)}>
          See Selected Work
        </Link>{" "}
        for recent examples.
      </>
    ),
  },
  {
    question: "Are you currently accepting new commissions?",
    slug: "availability",
    answerText:
      "Yes. I am currently accepting Minecraft Bedrock JsonUI commissions. Send your scope, target version, required screens, and any mockups or textures through the contact form so I can review the fit.",
    answer: (
      <>
        Yes. I am currently accepting Minecraft Bedrock JsonUI commissions. Send
        your scope, target version, required screens, and any mockups or textures
        through the{" "}
        <Link href={contactSectionHref(SECTION_IDS.startProject)}>
          contact form
        </Link>{" "}
        so I can review the fit.
      </>
    ),
  },
  {
    question:
      "Do you focus on frontend UI or backend development in Minecraft Bedrock?",
    slug: "scope",
    answerText:
      "In Minecraft Bedrock, I specialize entirely on the frontend side: custom JsonUI (HUDs, server forms, chest UIs, and other interfaces). I also handle resource packs, custom entities, Molang, and technical animations/render controllers. While I don't write complex backend Behavior Pack scripts, I structure my UIs to integrate cleanly with custom ScriptAPIs. On the web side, I am actively building my skills and currently consider myself beginner-to-intermediate in that field.",
  },
  {
    question:
      "Do I need to provide complete UI designs, or do you handle the styling?",
    slug: "mockups",
    answerText:
      "I highly prefer that you have a plan or visual concept ready before we start. If I have to design the interface layout completely from scratch, it will take more time, cost more, and increase the risk of back-and-forth changes. Even a rough sketch made in Paint, a screenshot, or a text outline works, but the cleaner and more detailed the mockup, the faster and more cost-effective the development process will be.",
  },
  {
    question: "What is your typical turnaround time for commissions?",
    slug: "turnaround",
    answerText:
      "For Minecraft Bedrock commissions, turnaround times vary depending on the depth of the project. Simple UI panels or adjustments take about 3 to 7 days, while complex custom UI overhauls typically require 1 to 3 weeks. For other projects, such as web development, timelines vary and are discussed and adjusted individually to meet your schedule. A precise timeline estimate will be provided after we review your exact requirements. More on Commissions.",
    answer: (
      <>
        For Minecraft Bedrock commissions, turnaround times vary depending on the
        depth of the project. Simple UI panels or adjustments take about 3 to 7
        days, while complex custom UI overhauls typically require 1 to 3 weeks.
        For other projects, such as web development, timelines vary and are
        discussed and adjusted individually to meet your schedule. A precise
        timeline estimate will be provided after we review your exact
        requirements.{" "}
        <Link href={contactSectionHref(SECTION_IDS.startProject)}>
          Start a Project
        </Link>.
      </>
    ),
  },
  {
    question: "How do you handle project pricing and payments?",
    slug: "pricing",
    answerText:
      "Pricing is calculated individually based on the project's specific scope and complexity. Once we agree on terms and technical requirements, I require a 50% upfront advance before starting development. The remaining 50% is paid upon successful completion and delivery of the assets. I am generally flexible and open to custom contracts or tailored business terms depending on your project needs.",
    answer: (
      <>
        Pricing is calculated individually based on the project's specific
        scope and complexity. Once we agree on terms and technical requirements,
        I require a 50% upfront advance before starting development. The
        remaining 50% is paid upon successful completion and delivery of the
        assets. I am generally flexible and open to custom contracts or tailored
        business terms depending on your project needs.{" "}
        <Link href={contactSectionHref(SECTION_IDS.startProject)}>
          Start a Project
        </Link>.
      </>
    ),
  },
  {
    question: "What happens if a future Minecraft update breaks the UI?",
    slug: "support",
    answerText:
      "Minecraft Bedrock updates frequently modify UI files, which can break custom screens. For all commissioned projects, I provide 30 days of free technical support after delivery to fix any layout issues caused by official game updates. After this period, updates or maintenance work can be arranged as needed.",
  },
  {
    question: "Do I receive full ownership and raw source files of the UI?",
    slug: "ownership",
    answerText:
      "Typically yes, but this is an individual matter depending on the scale and nature of the project. For standard, straightforward commissions, full file usage is included. For complex commercial platforms or large-scale integrations, custom licensing terms or an IP transfer fee may be negotiated based on your specific legal requirements.",
  },
];

const COMMISSION_FAQ_SLUGS = [
  "availability",
  "scope",
  "mockups",
  "turnaround",
  "pricing",
  "support",
  "ownership",
];

export const COMMISSION_FAQ_ITEMS = FAQ_ITEMS.filter(
  (item) => item.slug && COMMISSION_FAQ_SLUGS.includes(item.slug),
);

const CONTACT_FAQ_SLUGS = ["value", "availability"];

export const CONTACT_FAQ_ITEMS = FAQ_ITEMS.filter(
  (item) => item.slug && CONTACT_FAQ_SLUGS.includes(item.slug),
);
