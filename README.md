# 🚀 Portfolio Website | axmbro.dev

A digital showcase of my projects, skills, and professional experience. Live site: **[axmbro.dev](https://axmbro.dev)**

This repository contains the source code for my portfolio, crafted to deliver a fast, accessible, and visually striking user experience using **Next.js** and **Sass**.

## ✨ Features

- **Fast pages:** Built with Next.js so routes load quickly; project pages are generated at build time.
- **Organized styling:** Each component has its own Sass file, so the layout stays consistent and easy to update.
- **Built-in contact:** Visitors can send a project inquiry straight from the site.
- **Detailed project pages:** Short cards on the board; full case studies with images and video when you add a Markdown file.
- **SEO basics:** Page titles, descriptions, and share previews set per route.

## 🔐 Environment Variables

All optional - the site builds and runs without them. Copy `.env.example` to `.env` when you need a feature below. Field notes live in `.env.example`.

- **SMTP_USER, SMTP_PASSWORD** - contact form email
- **YOUTUBE_API_KEY** - live subscriber and view counts on the home page
- **NEXT_PUBLIC_GA_MEASUREMENT_ID** - Google Analytics 4 (cookie consent required)

## 🛠️ Quick Start

Clone the repository and install dependencies. **Requires Node 20+ and Yarn.**

```bash
git clone https://github.com/AxmBro/axmbro.dev.git
cd axmbro.dev
yarn install
cp .env.example .env   # optional
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
yarn build   # production build
yarn start   # run build locally
yarn lint
```

## 📁 Project Structure

This repository is organized using principles inspired by [**Feature-Sliced Design (FSD)**](https://feature-sliced.design/). This methodology ensures the codebase remains scalable, predictable, and easy to navigate:

```text
src/
├── app/                  # Next.js App Router pages and layouts
├── entities/             # Business entities (e.g., project, youtube)
├── features/             # User interactions and features (e.g., contact-form, faq-accordion)
├── shared/               # Reusable UI components, constants, and libs
└── widgets/              # Complex UI blocks combining entities and features (header, footer, etc.)
```

**Content:** `src/shared/constants/data.ts` (cards, nav, copy), `src/shared/constants/projects/*.md` (detail pages), `src/shared/constants/routes.ts`, `src/shared/constants/anchors.ts`. New project: [projects README](src/shared/constants/projects/README.md).

## 📦 Tech Stack

- **[Next.js](https://nextjs.org/)** - React framework for production (App Router).
- **[React](https://react.dev/)** - Core library for building the user interface.
- **[TypeScript](https://www.typescriptlang.org/)** - Strongly typed JavaScript for safer, scalable code.
- **[Sass](https://sass-lang.com/)** - Advanced CSS extension language for modular styling.
- **[Nodemailer](https://nodemailer.com/)** - Module for Node.js apps to allow easy email sending.
- **[React Icons](https://react-icons.github.io/react-icons/)** - Customizable SVG icons.
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Parser for extracting front-matter from Markdown files.
- **[Yarn](https://yarnpkg.com/)** - Fast and reliable package manager.

## License

Source is provided for viewing only. See [LICENSE](LICENSE) - no copy, modify, or use without explicit permission.

Thanks for checking out my code! If you like what you see, feel free to leave a star ⭐!
