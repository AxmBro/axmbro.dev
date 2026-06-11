# 🚀 Portfolio Website | axmbro.dev

A digital showcase of my projects, skills, and professional experience. Explore the live site here: **[axmbro.dev](https://axmbro.dev)**

This repository contains the source code for my portfolio, crafted to deliver a fast, accessible, and visually striking user experience using **Next.js** and **Sass**.

## ✨ Features

- **Modern Architecture:** Built on top of the Next.js App Router for optimal performance and Server Components.
- **Maintainable Styling:** Component-scoped styling utilizing Sass Modules.
- **Integrated Communications:** Fully functional contact form powered by Nodemailer.
- **Markdown-Driven:** Content management and parsing handled seamlessly via `gray-matter`.

## 🔐 Environment Variables

To enable full functionality (such as the contact form and YouTube integrations), you must configure the environment variables. Create a `.env` file at the root of the project and populate it with the following:

```env
# Email account used to dispatch contact form submissions
# Source: Your standard email provider (e.g., Gmail)
SMTP_USER=

# App password for the email account (bypasses 2FA)
# Source: Google Account -> Security -> 2-Step Verification -> App Passwords
SMTP_PASSWORD=

# Verification token for Google Search Console (SEO)
# Source: Google Search Console -> Add Property -> HTML tag verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=

# API key to fetch YouTube video data or statistics
# Source: Google Cloud Console -> Enable "YouTube Data API v3" -> Credentials
YOUTUBE_API_KEY=
```

## 🛠️ Quick Start

First, clone the repository and install the required dependencies:

```bash
yarn install
```

Start the local development server:

```bash
yarn dev
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

## 📦 Tech Stack

- **[Next.js](https://nextjs.org/)** – Component-based UI library.
- **[React](https://react.dev/)** – Core library for building the user interface.
- **[TypeScript](https://www.typescriptlang.org/)** – Strongly typed JavaScript for safer, scalable code.
- **[Sass](https://sass-lang.com/)** – Advanced CSS extension language for modular styling.
- **[Nodemailer](https://nodemailer.com/)** – Module for Node.js apps to allow easy email sending.
- **[React Icons](https://react-icons.github.io/react-icons/)** – Customizable SVG icons.
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** – Parser for extracting front-matter from Markdown files.
- **[Yarn](https://yarnpkg.com/)** – Fast and reliable package manager.

-

Thanks for checking out my code! If you like what you see, feel free to leave a star ⭐.
