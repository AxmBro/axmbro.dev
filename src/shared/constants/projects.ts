import type { ProjectItem } from "./types";

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
    date: "Feb 2022",
    isPresent: true,
  },
  {
    title: "One Slime Block Adventure",
    description:
      "A large-scale adventure map commissioned by YouTuber Slime Block. Engineered and developed advanced custom interfaces, including specialized HUDs and interactive server forms.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "obsba",
    heroImgSrc: "osba27",
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
    heroImgSrc: "ra15",
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
    heroImgSrc: "mm4",
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
    date: "Nov 2024",
    isPresent: true,
  },
];

const HOME_SELECTED_PROJECT_URLS = [
  "better_bedrock",
  "one_slime_block_adventure",
  "ra_survival",
  "zeqa_ui",
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
