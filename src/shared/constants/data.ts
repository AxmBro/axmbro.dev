export type ProjectType = "personal" | "commissions";

export interface ProjectItem {
  title: string;
  description: string;
  tags?: string[];
  image?: string;
  logo?: string;
  featured?: boolean;
  downloadLink?: string;
  slug?: string;
  type?: ProjectType;
}

export const PROJECTS: ProjectItem[] = [
  {
    title: "Better Bedrock",
    description: "Is a free, powerful and customizable texture pack for Minecraft Bedrock Edition! Enhance your gameplay with multiple features and almost 300 config options, supported on all platforms.",
    tags: ["JsonUI", "Models", "React"],
    image: "bbReleaseThumbnail",
    logo: "bbLogo",
    featured: true,
    downloadLink: "https://betterbedrock.com/downloads/better-bedrock",
    slug: "better_bedrock",
    type: "personal"
  },
  {
    title: "One Slime Block Adventure",
    description: "Adventure map created with Slime Block the YouTuber. I got hired to implement fancy UI stuff to either HUD and server forms. This project was the most complex one I have ever worked on!",
    tags: ["JsonUI", "Server Form"],
    image: "obsba",
    featured: true,
    downloadLink: "https://www.minecraft.net/en-us/marketplace/pdp/mush-co/one-slime-block-adventure/ade4af56-a677-445d-a6ed-628e28eb7d88",
    slug: "one_slime_block_adventure",
    type: "commissions"
  },
  {
    title: "Ra Survival",
    description: "Inspired by Call of Duty Zombie mode map for MCBE. I got hired to implement fancy UI stuff to game!",
    tags: ["JsonUI"],
    image: "raThumbnail",
    featured: true,
    slug: "ra_survival",
    type: "commissions"
  },
  {
    title: "Mineville UI",
    description: "A complex, clean, and animated custom user interface suite. Featuring highly optimized client-side minimaps, modular trade UIs, armor HUD trackers, and custom server forms.",
    tags: ["JsonUI", "HUD", "Server Form"],
    image: "main",
    featured: true,
    slug: "mineville_ui",
    type: "commissions"
  },
  {
    title: "Bedrock Portal UI",
    description: "Nice looking oreUI themed UI. Mainly in dark theme with cool subtle features and great layout.",
    tags: ["JsonUI", "Server Form"],
    image: "bpui1",
    slug: "bedrock_portal_ui",
    type: "commissions"
  },
  {
    title: "Shop UI",
    description: "Great looking and vanilla styled UI fully designed and created by me. Previously I used this for experimenting, but sold to interested customer.",
    tags: ["JsonUI", "Server Form"],
    image: "shop_form1",
    slug: "shop_ui",
    type: "commissions"
  },
  {
    title: "DUI",
    description: "A sleek, modern and highly optimized custom user interface. Featuring clean, premium dark themed UI.",
    tags: ["JsonUI", "Server Form"],
    image: "dui1",
    featured: false,
    downloadLink: "https://youtu.be/xFdnwd2tj8E",
    slug: "dui",
    type: "commissions"
  },
  {
    title: "Synergy UI",
    description: "Simple UI inspired by TFT game. Fully responsive and clear looking interface for customer.",
    tags: ["JsonUI", "Server Form"],
    image: "synergy_ui0",
    slug: "synergy_ui",
    type: "commissions"
  },
  {
    title: "OS UI",
    description: "Experimental UI for personal use! General appearance and in-game UI was fully created by me.",
    tags: ["JsonUI", "Server Form"],
    image: "osui1",
    slug: "os_ui",
    type: "personal"
  },
  {
    title: "Hugo SMP UI",
    description: "Java styled Pause Menu UI for bedrock-java server. With little edited scoreboard to match style from java version. UI created for customer.",
    tags: ["JsonUI"],
    image: "hugo_smp_ui1",
    slug: "hugo_smp_ui",
    type: "commissions"
  },
  {
    title: "Hometree UI",
    description: "Colorful and simple UI for customer.",
    tags: ["JsonUI", "Server Form"],
    image: "hometree1",
    slug: "hometree_ui",
    type: "commissions"
  },
  {
    title: "Simple UI",
    description: "Experimental UI  for personal use.",
    tags: ["JsonUI", "Server Form"],
    image: "simple_server_form1",
    slug: "simple_ui",
    type: "personal"
  },
  {
    title: "Red UI",
    description: "Experimental UI for personal use! General appearance and in-game UI was fully created by me. It's not finished project.",
    tags: ["JsonUI", "Server Form"],
    image: "redui1",
    slug: "red_ui",
    type: "personal"
  },
  {
    title: "Murder Detector+",
    description: "Simple CHEAT by just TEXTURE PACK. I created this pack to test texture pack possibilities and decided to increase ban rate on servers LOL",
    tags: ["JsonUI", "Models"],
    image: "murder_detector",
    logo: "mdLogo",
    featured: true,
    downloadLink: "https://betterbedrock.com/project/preview/murder_detector",
    slug: "murder_detector",
    type: "personal"
  },
  {
    title: "Custom Sky Overlay",
    description: "Collection of 16 custom skies for Minecraft Bedrock Edition. Adjust them using subpacks.",
    image: "custom_sky_overlay1",
    slug: "custom_sky_overlay",
    downloadLink: "https://betterbedrock.com/project/preview/custom_sky_overlay",
    type: "personal"
  },
  {
    title: "This Website",
    description: "My whole journey with learning how websites work and how to create them. Currently using JS, TS and React, but previously it was only HTML, JS and CSS.",
    tags: ["React", "JavaScript", "TypeScript", "CSS"],
    image: "thisweb",
    type: "personal"
  },
];

export interface ExperienceItem {
  role: string;
  date: string;
  company: string;
  items: { name: string; value?: string }[];
  buttons?: { text: string; href: string; variant: 'primary' | 'secondary' | 'white' }[];
}

export const EXPERIENCE_TREE: ExperienceItem[] = [
  {
    role: "Freelance Developer",
    date: "Present",
    company: "Self-Employed",
    items: [
      { name: "Minecraft Bedrock Edition (MCBE): Architecting and programming advanced custom interfaces (JsonUI), custom HUDs, server forms, and rendering controllers." },
      { name: "Web Development: Building modern, lightweight responsive landing pages and web applications (Intermediate level, open for collaborations & new projects)." },
      { name: "Available for freelance hire! Feel free to reach out and check out my portfolio." }
    ],
    buttons: [
      { text: "View All Projects", href: "/projects", variant: "white" }
    ]
  },
  {
    role: "Computer Science Student",
    date: "Oct 2025 - Present",
    company: "College",
    items: [
      { name: "Actively studying CS in college, expanding my theoretical knowledge in algorithms and general software engineering." }
    ]
  },
  {
    role: "Owner & Lead Developer",
    date: "Feb 2022 - Present",
    company: "Better Bedrock",
    items: [
      { name: "Architected and developed one of the most complex UI/Texture packs in MCBE history, achieving millions of downloads." },
      { name: "Leading community management: creating promotional graphics, recording video showcases, writing announcements, and planning project roadmaps." },
      { name: "Co-developed and partially coded the official project website." },
    ],
    buttons: [
      { text: "See It in Action", href: "/projects/better_bedrock", variant: "white" }
    ]
  }
];

export interface SkillCard {
  title: string;
  items: { name: string; value: string }[];
}

export const SKILLS_CARDS: SkillCard[] = [
  {
    title: "Minecraft Bedrock Edition",
    items: [
      { name: "JsonUI (User Interface)", value: "Advanced" },
      { name: "Resource Packs (General)", value: "Intermediate+" },
      { name: "Entities, Molang", value: "Intermediate" },
      { name: "ScriptAPI", value: "Beginner+" },
      { name: "Regolith", value: "Beginner" },
    ]
  },
  {
    title: "Frontend & Web Dev",
    items: [
      { name: "Javascript", value: "Intermediate" },
      { name: "Typescript", value: "Intermediate" },
      { name: "React", value: "Intermediate" },
      { name: "HTML, CSS, SCSS", value: "Intermediate" },
      { name: "TailwindCSS", value: "Beginner" },
      { name: "Vite", value: "Beginner" },
    ]
  },
  {
    title: "Backend & Languages",
    items: [
      { name: "Java", value: "Beginner+" },
      { name: "C++", value: "Beginner+" },
      { name: "Python", value: "Beginner" },
      { name: "Vercel", value: "Beginner" },
    ]
  },
  {
    title: "General & Design",
    items: [
      { name: "Git, Github", value: "Intermediate" },
      { name: "UI/UX", value: "Intermediate" },
      { name: "Problem Solving", value: "Intermediate" },
    ]
  },
  {
    title: "Languages",
    items: [
      { name: "Polish Language", value: "Native" },
      { name: "English Language", value: "B2 (Learning)" },
    ]
  }
];

export interface SocialLink {
  href: string;
  text: string;
  icon: "github" | "discord" | "youtube" | "twitter" | "instagram" | "mail";
}

export const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://github.com/AxmBro", text: "GitHub Profile", icon: "github" },
  { href: "mailto:axmbro@gmail.com", text: "axmbro@gmail.com", icon: "mail" },
  { href: "https://discord.com/users/679603350236299266", text: "Discord Direct Message", icon: "discord" },
  { href: "https://discord.gg/wJhH86c2wb", text: "Personal Discord Server", icon: "discord" },
  { href: "https://discord.gg/ZGK5WYXnEY", text: "Better Bedrock Discord", icon: "discord" },
  { href: "https://www.youtube.com/@axmbro", text: "YouTube Channel", icon: "youtube" },
  { href: "https://www.youtube.com/@axmbro2", text: "YouTube Second Channel", icon: "youtube" },
  { href: "https://twitter.com/AxmBro", text: "Twitter / X Profile", icon: "twitter" },
  { href: "https://www.instagram.com/axmbro_", text: "Instagram Profile", icon: "instagram" },
];

export const NAV_LINKS = [
  { href: "/", text: "Home" },
  { href: "/projects", text: "Projects" },
  { href: "/contact", text: "Contact" },
];

export const PORTFOLIO_TEXTS = {
  about: {
    description: "I'm a 20-year-old self-taught Programmer from Poland with over 4 years of experience. I specialize in Minecraft Bedrock Edition modding, specifically architecting custom user interfaces (JsonUI). Simultaneously, I am actively building web projects and pursuing a Computer Science degree to expand my software engineering fundamentals. I pay great attention to detail and always ensure my work looks exceptional and runs smoothly.",
  },
  skills: {
    description: "A comprehensive map of my technical stack, tools, and platforms engineered for high-performance client layouts, web apps, and game modifications.",
  },
  experience: {
    description: "My professional journey spans from extensive freelance work in the MCBE modding community to leading the massive open-source project, Better Bedrock. Currently, I am focused on expanding my web development expertise, advancing my college studies, and solving complex engineering problems.",
  },
  contact: {
    description: "Have a commission in mind, a business inquiry, or want to collaborate on Minecraft Bedrock UI modding or web development? Let us team up to build something exceptionally polished and high-performing.",
  },
  footer: {
    description: "Self-taught programmer from Poland. Specializing in Minecraft Bedrock JsonUI, building projects, and studying Computer Science.",
  },
  contactPage: {
    socials: "Have a commission in mind, a business inquiry, or want to collaborate on Minecraft Bedrock UI modding or web development? Select one of the direct channels below to connect with me instantly on my official platforms.",
    form: "Prefer email? Use the secure form below to send a message directly. I actively review all inquiries and typically respond within 24 hours to discuss project details, timelines, and technical requirements.",
  },
  projectsPage: {
    description: (count: number) => `A collection of ${count} projects I've worked on - from Minecraft Bedrock UI mods to web development. Each one reflects skills learned and problems solved along the way.`,
  }
};

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What value do you personally deliver, and how can you help my project succeed?",
    answer: "By working with me, you get a dedicated developer who understands both interface design and player psychology. I don't just write layout code-I build custom HUDs, server forms, chest UIs, or other custom UIs that make your server stand out, keep players engaged longer, and directly boost your store conversions. I take the entire technical headache of Minecraft Bedrock JsonUI off your hands so you can focus on running your game. Additionally, I also handle web development projects on the side, building matching, responsive landing pages to give your project a complete, professional web presence-so if you have a web concept in mind, let me know."
  },
  {
    question: "Are you currently accepting new commissions?",
    answer: "Yes, I am actively open for new freelance commissions regarding Minecraft Bedrock JsonUI development. For other custom technical modifications or special inquiries, feel free to reach out directly to discuss them privately."
  },
  {
    question: "Do you focus on frontend UI or backend development in Minecraft Bedrock?",
    answer: "In Minecraft Bedrock, I specialize entirely on the frontend side, which is custom JsonUI (custom HUDs, server forms, chest UIs, or other custom UIs). I also handle resource packs, custom entities, Molang, and technical animations/render controllers. While I don't write complex backend Behavior Pack scripts, I ensure my UIs are perfectly structured to integrate seamlessly with custom ScriptAPIs. On the web side, I am actively building my skills in web development, though I currently consider myself a beginner-to-intermediate in that field."
  },
  {
    question: "Do I need to provide complete UI designs, or do you handle the styling?",
    answer: "I highly prefer that you have a plan or visual concept ready before we start. If I have to design the interface layout completely from scratch, it will take more time, cost more, and increase the risk of back-and-forth changes. Even a rough sketch made in Paint, a screenshot, or a text outline works, but the cleaner and more detailed the mockup, the faster and more cost-effective the development process will be."
  },
  {
    question: "What is your typical turnaround time for commissions?",
    answer: "For Minecraft Bedrock commissions, turnaround times vary depending on the depth of the project. Simple UI panels or adjustments take about 3 to 7 days, while complex custom UI overhauls typically require 1 to 3 weeks. For other projects, such as web development, timelines vary and are discussed and adjusted individually to meet your schedule. A precise timeline estimate will be provided after we review your exact requirements."
  },
  {
    question: "How do you handle project pricing and payments?",
    answer: "Pricing is calculated individually based on the project's specific scope and complexity. Once we agree on terms and technical requirements, I require a 50% upfront advance before starting development. The remaining 50% is paid upon successful completion and delivery of the assets. I am generally flexible and open to custom contracts or tailored business terms depending on your project needs."
  },
  {
    question: "What happens if a future Minecraft update breaks the UI?",
    answer: "Minecraft Bedrock updates frequently modify UI files, which can break custom screens. For all commissioned projects, I provide 30 days of free technical support after delivery to fix any layout issues caused by official game updates. After this period, updates or maintenance work can be arranged as needed."
  },
  {
    question: "Do I receive full ownership and raw source files of the UI?",
    answer: "Typically yes, but this is an individual matter depending on the scale and nature of the project. For standard, straightforward commissions, full file usage is included. For complex commercial platforms or large-scale integrations, custom licensing terms or an IP transfer fee may be negotiated based on your specific legal requirements."
  }
];
