# 🚀 Portfolio Website | axmbro.dev

A digital showcase of my projects, skills, and professional experience. Explore the live site here: **[axmbro.dev](https://axmbro.dev)**

This repository contains the source code for my portfolio, crafted to deliver a fast, accessible, and visually striking user experience using **Next.js** and **Sass**.

## ✨ Features

- **Modern Architecture:** Built on top of the Next.js App Router for optimal performance and Server Components.
- **Maintainable Styling:** Component-scoped styling utilizing Sass Modules.
- **Integrated Communications:** Fully functional contact form powered by Nodemailer.
- **Project content:** Long-form project pages from Markdown via `gray-matter`.

## 🔐 Environment Variables

Optional. Copy `.env.example` to `.env` and fill in what you need. Details for each variable are in `.env.example`.

- **SMTP_USER / SMTP_PASSWORD** - contact form
- **YOUTUBE_API_KEY** - live YouTube stats on the home page

The site runs without them; missing keys only disable those features.

## 🛠️ Quick Start

Clone the repository and install dependencies:

```bash
git clone https://github.com/AxmBro/axmbro.dev.git
cd axmbro.dev
yarn install
cp .env.example .env
```

Start the local development server:

```bash
yarn dev
```

Other scripts:

```bash
yarn build
yarn start
yarn lint
```

Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📁 Project Structure

This repository is organized using principles inspired by **Feature-Sliced Design (FSD)**. This methodology ensures the codebase remains scalable, predictable, and easy to navigate:

```text
src/
├── app/                  # Next.js App Router pages and layouts
├── entities/             # Business entities (e.g., project, youtube)
├── features/             # User interactions and features (e.g., contact-form, faq-accordion)
├── shared/               # Reusable UI components, constants, and libs
└── widgets/              # Complex UI blocks combining entities and features (header, footer, etc.)
```

Project cards and site copy live in `src/shared/constants/data.ts`. Long project write-ups: `src/shared/constants/projects/` - see [projects README](src/shared/constants/projects/README.md).

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

---

Thanks for checking out my code! If you like what you see, feel free to leave a star ⭐. 
