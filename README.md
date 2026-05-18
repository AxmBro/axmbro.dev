# axmbro.dev | Portfolio Website

A modern, high-performance developer portfolio built with Next.js 16 (App Router), React 19, and SCSS Modules. This project was fully migrated from a legacy Vite static build to a modern server-optimized architecture to improve SEO, leverage React Server Components, and support dynamic, markdown-driven project pages.

---

## 🚀 Key Features

- **Next.js 16 & React Server Components**: High-performance hybrid rendering combining pre-rendered static generation (SSG) with React Server Components (RSC) to maximize load speed and indexability.
- **Markdown-Driven Case Studies**: Project pages are loaded dynamically from structured Markdown files under `src/shared/constants/projects/`. Metadata (frontmatter) is parsed via `gray-matter` and rendered using `react-markdown`.
- **Custom SCSS Design System**: Zero-dependency layout using SCSS Modules, leveraging Vanilla CSS custom properties for global variables, fluid typography tokens, and responsive break-points.
- **Secure Route Handlers**: Secure contact form processing built on Next.js API Routes and integration with `nodemailer` for email deliveries.
- **Advanced SEO Integration**: Dynamically generated sitemaps, robots.txt, custom manifest.webmanifest, metadata profiles, and clean semantic markup complying with search engine web standards.
- **Modern ESLint 9 Flat Config**: Quality assurance and code hygiene powered by the newest flat configuration standard.

---

## 🛠️ Tech Stack

| Technology | Purpose | Description |
| :--- | :--- | :--- |
| **Next.js 16** | Framework | React App Router framework for static generation, routing, and API endpoints. |
| **React 19** | Core Library | UI construction with Server Components and advanced hooks. |
| **TypeScript** | Language | Type safety and enhanced IDE autocompletion across the codebase. |
| **Sass / SCSS Modules** | Styling | Fully scoped, module-level styles with complex nesting and variables. |
| **gray-matter** | Data Parser | Extractor of frontmatter metadata from Markdown project sheets. |
| **react-markdown** | Renderer | Markdown interpreter rendering safe HTML components dynamically. |
| **nodemailer** | API Mailer | Direct integration with SMTP servers for reliable message delivery. |

---

## 📁 Project Architecture

The directory layout adheres to a highly structured modular design system, separating features, widgets, and shared logic:

```text
src/
├── app/                  # Next.js App Router (Pages, layouts, dynamic routes, API endpoints)
│   ├── api/              # Secure backend mailer API route
│   ├── projects/         # Portfolio lists and dynamic project parameters ([projectId])
│   ├── globals.scss      # Base design tokens, resets, and layout guidelines
│   └── layout.tsx        # Global HTML5 shell & Metadata configurations
├── shared/               # Reusable utility libraries, typings, and constants
│   ├── constants/        # Global static text objects and Markdown raw data sheets
│   ├── lib/              # Markdown loading operations and general helpers
│   ├── styles/           # Global SCSS variables and shared tokens
│   ├── types/            # TypeScript type declaration files
│   └── ui/               # Modular UI base components (Button, Input, Accordion, Tabs)
└── widgets/              # Page-level complex assemblies
    ├── footer/           # Animated global footer component
    ├── header/           # Sticky navigation header with mobile anchor configurations
    ├── home/             # Home page assemblies (SkillsGrid, ExperienceGrid, HeroStats)
    └── projects/         # Project case-study assemblies (ImageSection, ProjectCard)
```

---

## 💻 Local Development

### 1. Prerequisites
- Node.js (v18.x or newer recommended)
- Package Manager: `yarn`

### 2. Installation
Clone the repository and install the dependencies:
```bash
yarn install
```

### 3. Environment Setup
Create a `.env` file in the root directory and supply your SMTP configuration for the contact form:
```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_TO=destination-email@address.com
```

### 4. Running the Development Server
Launch the local Next.js compiler with Turbopack:
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) inside your browser.

### 5. Production Compilation
To build and optimize the application for production deployment:
```bash
yarn build
```

---

## 🌐 Deployment

The codebase is ready for **Vercel** out of the box:
1. Push your repository to GitHub / GitLab.
2. Import the project to Vercel.
3. **IMPORTANT**: In the Project Settings under the **General** tab, set the **Framework Preset** to **Next.js** (do not leave it as Vite or Other).
4. Configure the environment variables from your `.env` file in Vercel.
5. Deploy.
