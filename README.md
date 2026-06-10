# axmbro.dev | Portfolio Website

A modern, high-performance portfolio website built with Next.js and React.

## Tech Stack

- **Framework:** Next.js (16.2.6)
- **Library:** React (19.2.4)
- **Language:** TypeScript (5.x)
- **Styling:** Sass
- **Icons:** React Icons
- **Content Processing:** gray-matter

## Environment Variables

Create a `.env` file in the root of your project and add the following variables. Here is what they are for and where to get them:

```env
# Email address used for sending contact form messages.
# Where to get: Your standard email address (e.g., Gmail).
SMTP_USER=

# App password for the email account to bypass 2FA.
# Where to get: Google Account -> Security -> 2-Step Verification -> App Passwords.
SMTP_PASSWORD=

# Google Search Console verification token for SEO.
# Where to get: Google Search Console -> Add Property -> HTML tag verification -> copy the 'content' value.
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=

# API key for fetching YouTube videos or stats.
# Where to get: Google Cloud Console -> Enable "YouTube Data API v3" -> Credentials -> Create API Key.
YOUTUBE_API_KEY=
```

## Project Structure

The project follows a modular architecture (Feature-Sliced Design inspired):

```text
src/
├── app/                  # Next.js App Router pages and layouts
├── entities/             # Business entities (e.g., project, youtube)
├── features/             # User interactions and features (e.g., contact-form, faq-accordion)
├── shared/               # Reusable UI components, constants, and libs
└── widgets/              # Complex UI blocks combining entities and features (header, footer, etc.)
```

## Quick Start

1. Install dependencies:
```bash
yarn install
```

2. Run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Production Build

To build and start the application for production:

```bash
yarn build
yarn start
```