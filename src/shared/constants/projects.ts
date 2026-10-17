import type { ProjectItem } from "./types";

export const CAREER_START_DATE = new Date(2022, 0, 1);

export const PROJECTS: ProjectItem[] = [
  {
    title: "Better Bedrock",
    description:
      "A free texture pack for Minecraft Bedrock with HUD mods, a mod menu, and nearly 300 settings. Works on PC, mobile, and console. 2M+ downloads.",
    tags: ["JsonUI", "Models", "React", "Web"],
    imgSrc: "bbReleaseThumbnail",
    logoSrc: "better_bedrock",
    accentColor: "#55B737",
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
      "A large adventure map for YouTuber Slime Block, released on the Minecraft Marketplace by Mush Co. I built its custom HUDs and server forms in JsonUI.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "obsba",
    heroImgSrc: "osba27",
    logoSrc: "one_slime_block_adventure",
    accentColor: "#CC6BEE",
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
      "A zombies survival map for Minecraft Bedrock, inspired by Call of Duty Zombies. I built its custom HUD, hotbar, round counter, and inventory screen in a dark style.",
    tags: ["JsonUI", "HUD", "Inventory"],
    imgSrc: "raThumbnail",
    heroImgSrc: "ra15",
    logoSrc: "ra_survival",
    accentColor: "#DB2528",
    star: true,
    url: "ra_survival",
    type: "commissions",
    date: "Sep 2025",
  },
  {
    title: "Zeqa UI",
    description:
      "Custom JsonUI for Zeqa, one of the largest Minecraft Bedrock PvP servers, made for InPvP: profile, cosmetics, levels, ranks, and other server forms, plus selected HUD work.",
    tags: ["JsonUI", "Server Form", "HUD"],
    imgSrc: "zeqa_ui0",
    logoSrc: "zeqa_ui",
    accentColor: "#E6B422",
    star: true,
    url: "zeqa_ui",
    type: "commissions",
    date: "Jul 2026",
  },
  {
    title: "Mineville UI",
    description:
      "Animated JsonUI for Mineville: a client-side minimap, trade screens, an armor HUD tracker, and custom server forms.",
    tags: ["JsonUI", "Server Form", "HUD"],
    imgSrc: "main",
    logoSrc: "mineville_ui",
    accentColor: "#E04E75",
    star: true,
    url: "mineville_ui",
    type: "commissions",
    date: "Apr 2026",
  },
  {
    title: "Murder Detector+",
    description:
      "A texture pack for Murder Mystery minigames. It shows an icon above the sheriff and the murderer based on the item they hold, with a double check against false matches.",
    tags: ["Entities", "Models"],
    imgSrc: "murder_detector",
    logoSrc: "murder_detector",
    accentColor: "#3F992F",
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
      "A dark JsonUI set in the OreUI style, with scalable layouts, short animations, and server forms.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "bpui1",
    accentColor: "#7c4dff",
    url: "bedrock_portal_ui",
    type: "commissions",
    date: "Oct 2025",
  },
  {
    title: "Shop UI",
    description:
      "A vanilla-style shop interface built from scratch. It started as an experiment and was later bought by a private client for their server economy.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "shop_form1",
    accentColor: "#969696",
    url: "shop_ui",
    type: "commissions",
    date: "Dec 2024",
  },
  {
    title: "DUI",
    description:
      "A dark-theme JsonUI set: navigation hub, lobby selector, hover tooltips with player stats, and modal forms.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "dui1",
    accentColor: "#42a5f5",
    downloadLink: "https://youtu.be/xFdnwd2tj8E",
    url: "dui",
    type: "commissions",
    date: "Apr 2026",
  },
  {
    title: "Synergy UI",
    description:
      "A JsonUI interface inspired by TFT, made for a private client. It focuses on clear data and simple interactions.",
    tags: ["JsonUI", "HUD"],
    imgSrc: "synergy_ui0",
    accentColor: "#899AB3",
    url: "synergy_ui",
    type: "commissions",
    date: "Aug 2025",
  },
  {
    title: "OS UI",
    description:
      "A personal experiment: a full-screen operating system look built inside Minecraft Bedrock with JsonUI.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "osui1",
    accentColor: "#42a5f5",
    url: "os_ui",
    type: "personal",
    date: "Sep 2025",
  },
  {
    title: "Hugo SMP UI",
    description:
      "A Java Edition-style pause menu and scoreboard for a Bedrock and Java cross-play server, so both editions look the same.",
    tags: ["JsonUI", "HUD"],
    imgSrc: "hugo_smp_ui1",
    accentColor: "#9839D3",
    url: "hugo_smp_ui",
    type: "commissions",
    date: "Nov 2025",
  },
  {
    title: "Hometree UI",
    description:
      "A simple, colorful server form design, built to the client's specification.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "hometree1",
    accentColor: "#1AAD54",
    url: "hometree_ui",
    type: "commissions",
    date: "Dec 2023",
  },
  {
    title: "Simple UI",
    description:
      "An experimental server form layout, made to test responsive JsonUI bindings.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "simple_server_form1",
    accentColor: "#899AB3",
    url: "simple_ui",
    type: "personal",
    date: "Aug 2024",
  },
  {
    title: "Red UI",
    description:
      "An ongoing experiment with red-themed in-game UI layouts and custom component styles.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "redui1",
    accentColor: "#C30606",
    url: "red_ui",
    type: "personal",
    date: "Sep 2024",
  },
  {
    title: "Custom Sky Overlay",
    description:
      "A pack of 16 custom skyboxes for Minecraft Bedrock. Players switch skies with subpacks, without editing any files.",
    tags: ["Textures"],
    imgSrc: "custom_sky_overlay1",
    accentColor: "#B094D3",
    url: "custom_sky_overlay",
    downloadLink:
      "https://betterbedrock.com/project/preview/custom_sky_overlay",
    type: "personal",
    date: "Oct 2021",
  },
  {
    title: "This Website",
    description:
      "My portfolio, built from scratch with React, Next.js, and TypeScript. It shows my Minecraft Bedrock UI work and my web development.",
    tags: ["React", "JavaScript", "TypeScript", "CSS", "Web"],
    imgSrc: "thisweb",
    accentColor: "var(--color-accent)",
    type: "personal",
    date: "Nov 2024",
    isPresent: true,
  },
];

export function getFeaturedProjects(): ProjectItem[] {
  return PROJECTS.filter((project) => Boolean(project.star));
}

export function getProjectTypeLabel(project: ProjectItem): string {
  if (project.type === "commissions") return "Client Commission";
  if (project.type === "personal") return "Personal Project";
  return "Portfolio Project";
}
