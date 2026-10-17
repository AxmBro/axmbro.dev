import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Lexend } from "next/font/google";
import { GoogleAnalytics } from "@/shared/ui/google-analytics";
import { CookieConsent } from "@/shared/ui/cookie-consent";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { HashScroll } from "@/shared/ui/hash-scroll";
import { AmbientPixels } from "@/shared/ui/ambient-pixels";
import { PixelClickWave } from "@/shared/ui/pixel-click-wave";
import { SurfaceIgniteObserver } from "@/shared/ui/surface-ignite";
import {
  HEADER_TEXTS,
  SITE_BRAND,
  SITE_METADATA,
  SITE_ROLE,
  pageTitle,
} from "@/shared/constants/data";
import { SITE_ORIGIN } from "@/shared/constants/site";
import "./globals.scss";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const HOME_TITLE = pageTitle(SITE_ROLE.headline);

export const metadata: Metadata = {
  title: {
    default: HOME_TITLE,
    template: pageTitle("%s"),
  },
  description: SITE_METADATA.homeDescription,
  keywords: SITE_METADATA.keywords,
  authors: [{ name: SITE_BRAND.name, url: SITE_ORIGIN }],
  creator: SITE_BRAND.name,
  metadataBase: new URL(SITE_ORIGIN),
  openGraph: {
    title: HOME_TITLE,
    description: SITE_METADATA.homeDescription,
    url: SITE_ORIGIN,
    siteName: SITE_BRAND.name,
    images: [
      {
        url: "/images/ui/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_METADATA.ogImageAlt,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_METADATA.homeDescription,
    images: ["/images/ui/og-image.png"],
    site: SITE_BRAND.socialHandle,
    creator: SITE_BRAND.socialHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={lexend.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          {HEADER_TEXTS.skipToContent}
        </a>
        <GoogleAnalytics />
        <CookieConsent />
        <HashScroll />
        <PixelClickWave />
        <SurfaceIgniteObserver />
        <Header />
        <div className="main-layout">
          <AmbientPixels />
          <main id="main" className="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
