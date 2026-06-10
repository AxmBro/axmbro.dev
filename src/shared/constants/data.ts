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
}

export const CAREER_START_DATE = new Date(2022, 0, 1);

export const PROJECTS: ProjectItem[] = [
  {
    title: "Better Bedrock",
    description:
      "A comprehensive, highly customizable UI and texture modification for MCBE. Enhances gameplay functionality with nearly 300 configuration options, fully supported across all platforms.",
    tags: ["JsonUI", "Models", "React"],
    imgSrc: "bbReleaseThumbnail",
    logoSrc: "bbLogo",
    star: true,
    downloadLink: "https://betterbedrock.com/downloads/better-bedrock",
    url: "better_bedrock",
    type: "personal",
  },
  {
    title: "One Slime Block Adventure",
    description:
      "A large-scale adventure map commissioned by YouTuber Slime Block. Architected and developed advanced custom interfaces, including specialized HUDs and interactive server forms.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "obsba",
    star: true,
    downloadLink:
      "https://www.minecraft.net/en-us/marketplace/pdp/mush-co/one-slime-block-adventure/ade4af56-a677-445d-a6ed-628e28eb7d88",
    url: "one_slime_block_adventure",
    type: "commissions",
  },
  {
    title: "Ra Survival",
    description:
      "A Call of Duty Zombies-inspired survival map for MCBE. Commissioned to design and implement immersive, custom UI architectures that match the game's dark aesthetic.",
    tags: ["JsonUI"],
    imgSrc: "raThumbnail",
    star: true,
    url: "ra_survival",
    type: "commissions",
  },
  {
    title: "Mineville UI",
    description:
      "A complex, clean, and animated custom user interface suite. Featuring highly optimized client-side minimaps, modular trade UIs, armor HUD trackers, and custom server forms.",
    tags: ["JsonUI", "HUD", "Server Form"],
    imgSrc: "main",
    star: true,
    url: "mineville_ui",
    type: "commissions",
  },
  {
    title: "Murder Detector+",
    description:
      "An experimental utility pack designed to test the limits of JsonUI capabilities and model modifications. Created as a diagnostic tool to demonstrate server-side vulnerability mechanics.",
    tags: ["JsonUI", "Models"],
    imgSrc: "murder_detector",
    logoSrc: "mdLogo",
    star: true,
    downloadLink: "https://betterbedrock.com/project/preview/murder_detector",
    url: "murder_detector",
    type: "personal",
  },
  {
    title: "Bedrock Portal UI",
    description:
      "A sophisticated, OreUI-themed interface. Features a dark-mode layout with scalable elements, subtle animations, and highly optimized rendering controllers.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "bpui1",
    url: "bedrock_portal_ui",
    type: "commissions",
  },
  {
    title: "Shop UI",
    description:
      "A vanilla-styled commercial interface designed from scratch. Initially an experimental layout, later acquired by a private client for a custom server economy.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "shop_form1",
    url: "shop_ui",
    type: "commissions",
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
  },
  {
    title: "Synergy UI",
    description:
      "A clean, TFT-inspired responsive interface commissioned by a private client. Focuses on clear data presentation and seamless user interactions.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "synergy_ui0",
    url: "synergy_ui",
    type: "commissions",
  },
  {
    title: "OS UI",
    description:
      "A personal R&D project exploring full-screen operating system aesthetics within the MCBE engine. Showcases advanced layout structuring.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "osui1",
    url: "os_ui",
    type: "personal",
  },
  {
    title: "Hugo SMP UI",
    description:
      "A Java Edition-styled Pause Menu commissioned for a cross-play bedrock-java server. Includes a custom scoreboard integration to ensure cross-platform visual consistency.",
    tags: ["JsonUI"],
    imgSrc: "hugo_smp_ui1",
    url: "hugo_smp_ui",
    type: "commissions",
  },
  {
    title: "Hometree UI",
    description: "A minimalist, colorful server form interface tailored to client specifications.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "hometree1",
    url: "hometree_ui",
    type: "commissions",
  },
  {
    title: "Simple UI",
    description: "An experimental server form layout created to test responsive JsonUI bindings.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "simple_server_form1",
    url: "simple_ui",
    type: "personal",
  },
  {
    title: "Red UI",
    description:
      "An ongoing experimental project focusing on aggressive, red-themed in-game UI layouts and custom component styling.",
    tags: ["JsonUI", "Server Form"],
    imgSrc: "redui1",
    url: "red_ui",
    type: "personal",
  },
  {
    title: "Custom Sky Overlay",
    description:
      "A comprehensive collection of 16 custom skyboxes for MCBE. Engineered with subpack support for seamless user customization without modifying core files.",
    imgSrc: "custom_sky_overlay1",
    url: "custom_sky_overlay",
    downloadLink:
      "https://betterbedrock.com/project/preview/custom_sky_overlay",
    type: "personal",
  },
  {
    title: "This Website",
    description:
      "My personal portfolio and technical sandbox. Developed from the ground up using modern web technologies to showcase my transition into scalable frontend architecture.",
    tags: ["React", "JavaScript", "TypeScript", "CSS"],
    imgSrc: "thisweb",
    type: "personal",
  },
];

export interface ExperienceItem {
  role: string;
  date: string;
  company: string;
  items: { name: string; value?: string }[];
  buttons?: {
    text: string;
    href: string;
    variant: "primary" | "secondary" | "white";
  }[];
}

export const EXPERIENCE_TREE: ExperienceItem[] = [
  {
    role: "Freelance UI Architect & Developer",
    date: "Present",
    company: "Self-Employed",
    items: [
      {
        name: "Minecraft Bedrock Edition: Delivering commercial UI solutions (JsonUI) for official Marketplace studios and private servers. Architecting advanced custom HUDs, Server Forms.",
      },
      {
        name: "Web Development: Building modern, responsive web applications and lightweight landing pages tailored to client specifications.",
      },
      {
        name: "Actively accepting B2B contracts and freelance commissions.",
      },
    ],
    buttons: [
      { text: "Browse Portfolio", href: "/projects", variant: "primary" },
      { text: "Hire Me", href: "/contact", variant: "secondary" },
    ],
  },
  {
    role: "Founder & Lead Developer",
    date: "Feb 2022 - Present",
    company: "Better Bedrock",
    items: [
      {
        name: "Architected and maintained a large-scale UI/Texture modification within the MCBE ecosystem, generating over 2M+ downloads.",
      },
      {
        name: "Directing project roadmaps, community engagement, and producing promotional media (video showcases, graphics).",
      },
      {
        name: "Designed the UI/UX vision and co-developed the official open-source project website alongside a technical partner",
      },
    ],
    buttons: [
      {
        text: "Explore Project",
        href: "/projects/better_bedrock",
        variant: "primary",
      },
      { text: "Official Website", href: "https://betterbedrock.com/", variant: "secondary" },
    ],
  },
  {
    role: "Computer Science Student",
    date: "Oct 2025 - Present",
    company: "University of Silesia",
    items: [
      {
        name: "Successfully completing the first year of my degree, building a strong academic foundation in software engineering and low-level system architecture.",
      },
      {
        name: "Key subjects mastered: Algorithms, Database Systems, Object-Oriented Programming, Computer Networks, and Digital Logic.",
      },
    ],
  },
];

export interface SkillCard {
  title: string;
  items: { name: string; value: string }[];
}

export const SKILLS_CARDS: SkillCard[] = [
  {
    title: "Minecraft Bedrock Edition (Core Expertise)",
    items: [
      { name: "JsonUI (User Interface)", value: "Expert" },
      { name: "Resource Packs", value: "Advanced" },
      { name: "Entities & Molang", value: "Intermediate" },
      { name: "ScriptAPI & Regolith", value: "Beginner" },
    ],
  },
  {
    title: "Frontend & Web Development (Active Learning)",
    items: [
      { name: "JavaScript & TypeScript", value: "Intermediate" },
      { name: "React Ecosystem (Next.js, Vite)", value: "Intermediate" },
      { name: "UI Styling (HTML, SCSS, Tailwind)", value: "Intermediate" },
    ],
  },
  {
    title: "CS Fundamentals & Tools",
    items: [
      { name: "Algorithms & Data Structures", value: "Intermediate" },
      { name: "Git, GitHub", value: "Intermediate" },
      { name: "Hosting & Deployment (Vercel)", value: "Beginner" },
      { name: "Digital Logic & Linux", value: "Beginner" },
    ],
  },
  {
    title: "Backend, Databases & Languages",
    items: [
      { name: "Academic Languages (C++, Java, Python)", value: "Beginner" },
      { name: "SQL", value: "Beginner" },
    ],
  },
  {
    title: "Management & Professional Skills",
    items: [
      { name: "Community Management", value: "Advanced" },
      { name: "Project Scoping & Roadmapping", value: "Intermediate" },
      { name: "Client Communication (B2B)", value: "Intermediate" },
      { name: "Contract Management & Invoicing", value: "Intermediate" },
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
  socialUrl: string;
  iconId: "github" | "discord" | "youtube" | "twitter" | "instagram" | "mail";
}

export const SOCIAL_LINK_BUTTONS: SocialLink[] = [
  {
    href: "https://github.com/AxmBro",
    text: "GitHub",
    socialUrl: "https://github.com",
    iconId: "github",
  },
  {
    href: "mailto:axmbro@gmail.com",
    text: "axmbro@gmail.com",
    socialUrl: "https://mail.google.com/",
    iconId: "mail",
  },
  {
    href: "https://discord.com/users/679603350236299266",
    text: "Discord (DM)",
    socialUrl: "https://discord.gg",
    iconId: "discord",
  },
  {
    href: "https://discord.gg/wJhH86c2wb",
    text: "Personal Discord",
    socialUrl: "https://discord.gg",
    iconId: "discord",
  },
  {
    href: "https://discord.gg/ZGK5WYXnEY",
    text: "Better Bedrock Discord",
    socialUrl: "https://discord.gg",
    iconId: "discord",
  },
  {
    href: "https://www.youtube.com/@axmbro",
    text: "YouTube",
    socialUrl: "https://www.youtube.com",
    iconId: "youtube",
  },
  {
    href: "https://www.youtube.com/@axmbro2",
    text: "YouTube (2nd)",
    socialUrl: "https://www.youtube.com",
    iconId: "youtube",
  },
  {
    href: "https://twitter.com/AxmBro",
    text: "Twitter / X",
    socialUrl: "https://x.com",
    iconId: "twitter",
  },
  {
    href: "https://www.instagram.com/axmbro_",
    text: "Instagram",
    socialUrl: "https://www.instagram.com",
    iconId: "instagram",
  },
];

export const NAV_LINKS = [
  { href: "/", text: "Home" },
  { href: "/projects", text: "Projects" },
  { href: "/contact", text: "Contact" },
];

export const HOME_PAGE_TEXTS = {
  about: {
    description:
      "I am a 20-year-old Computer Science student and UI Architect from Poland. My core expertise is Minecraft Bedrock Edition modding, where I specialize in engineering advanced custom interfaces (JsonUI). I collaborate directly with official marketplace studios and private clients to deliver high-performance game UI.\n\nWhile my professional focus lies in game architecture, I actively build web applications and explore AI tools to strengthen my general software engineering fundamentals. I approach every project with a perfectionist mindset, focusing on pixel-perfect layouts, scalable code, and seamless user experiences.",
  },
  skills: {
    description:
      "An overview of the core technologies, languages, and tools I use to architect custom Minecraft Bedrock interfaces, build modern web applications, and develop reliable technical projects.",
  },
  experience: {
    description:
      "With over 4 years of active development, my experience ranges from architecting UI for commercial Minecraft marketplace studios to leading Better Bedrock, a project reaching millions of players. Currently, I balance my freelance client work with formal Computer Science studies and expanding my web development portfolio.",
  },
  contact: {
    description:
      "Looking for a specialized UI Architect for your Minecraft Bedrock project, or need a modern web application? I am currently open for B2B contracts and freelance commissions. Reach out to discuss your technical requirements.",
  },
  footer: {
    description:
      "Computer Science student and UI Architect from Poland. Specializing in engineering custom Minecraft Bedrock interfaces (JsonUI) and modern web applications.",
  },
  contactPage: {
    socials:
      "Ready to discuss your project? Reach me directly through any of the channels below for UI commissions, B2B contracts, or general inquiries.",
    form: "Prefer email? Send a message directly through the form below. I review all inquiries and usually respond within 24 hours to discuss scope, timelines, and technical details.",
  },
  projectsPage: {
    description: (count: number) =>
      `A collection of ${count} projects, from custom Minecraft Bedrock interfaces (JsonUI) for marketplace studios and private clients to web development. Each one reflects a real problem solved and skills applied.`,
  },
};

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What value do you bring to my project?",
    answer:
      "You get a developer who understands both interface design and player behavior. I don't just write layout code - I build custom HUDs, server forms, and chest UIs that make your server stand out, keep players engaged, and boost your store conversions. I handle the entire Minecraft Bedrock JsonUI side so you can focus on running your game. I also take on web development, building matching, responsive landing pages for a complete, professional presence - so if you have a web concept in mind, let me know.",
  },
  {
    question: "Are you currently accepting new commissions?",
    answer:
      "Yes, I am actively open for new freelance commissions regarding Minecraft Bedrock JsonUI development. For other custom technical modifications or special inquiries, feel free to reach out directly to discuss them privately.",
  },
  {
    question:
      "Do you focus on frontend UI or backend development in Minecraft Bedrock?",
    answer:
      "In Minecraft Bedrock, I specialize entirely on the frontend side: custom JsonUI (HUDs, server forms, chest UIs, and other interfaces). I also handle resource packs, custom entities, Molang, and technical animations/render controllers. While I don't write complex backend Behavior Pack scripts, I structure my UIs to integrate cleanly with custom ScriptAPIs. On the web side, I am actively building my skills and currently consider myself beginner-to-intermediate in that field.",
  },
  {
    question:
      "Do I need to provide complete UI designs, or do you handle the styling?",
    answer:
      "I highly prefer that you have a plan or visual concept ready before we start. If I have to design the interface layout completely from scratch, it will take more time, cost more, and increase the risk of back-and-forth changes. Even a rough sketch made in Paint, a screenshot, or a text outline works, but the cleaner and more detailed the mockup, the faster and more cost-effective the development process will be.",
  },
  {
    question: "What is your typical turnaround time for commissions?",
    answer:
      "For Minecraft Bedrock commissions, turnaround times vary depending on the depth of the project. Simple UI panels or adjustments take about 3 to 7 days, while complex custom UI overhauls typically require 1 to 3 weeks. For other projects, such as web development, timelines vary and are discussed and adjusted individually to meet your schedule. A precise timeline estimate will be provided after we review your exact requirements.",
  },
  {
    question: "How do you handle project pricing and payments?",
    answer:
      "Pricing is calculated individually based on the project's specific scope and complexity. Once we agree on terms and technical requirements, I require a 50% upfront advance before starting development. The remaining 50% is paid upon successful completion and delivery of the assets. I am generally flexible and open to custom contracts or tailored business terms depending on your project needs.",
  },
  {
    question: "What happens if a future Minecraft update breaks the UI?",
    answer:
      "Minecraft Bedrock updates frequently modify UI files, which can break custom screens. For all commissioned projects, I provide 30 days of free technical support after delivery to fix any layout issues caused by official game updates. After this period, updates or maintenance work can be arranged as needed.",
  },
  {
    question: "Do I receive full ownership and raw source files of the UI?",
    answer:
      "Typically yes, but this is an individual matter depending on the scale and nature of the project. For standard, straightforward commissions, full file usage is included. For complex commercial platforms or large-scale integrations, custom licensing terms or an IP transfer fee may be negotiated based on your specific legal requirements.",
  },
];
