import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Lexend } from "next/font/google";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { HashScroll } from "@/shared/ui/hash-scroll";
import { PixelClickWave } from "@/shared/ui/pixel-click-wave";
import { SITE_METADATA } from "@/shared/constants/data";
import "./globals.scss";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "AxmBro.dev | %s",
  },
  description: SITE_METADATA.homeDescription,
  keywords: SITE_METADATA.keywords,
  metadataBase: new URL("https://axmbro.dev"),
  openGraph: {
    title: "AxmBro.dev | Home",
    description: SITE_METADATA.homeDescription,
    url: "https://axmbro.dev",
    siteName: "AxmBro",
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
    title: "AxmBro.dev | Home",
    description: SITE_METADATA.homeDescription,
    images: ["/images/ui/og-image.png"],
    creator: "@AxmBro",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={lexend.variable} suppressHydrationWarning>
      <head>
        <script src="/scripts/hash-scroll-init.js" />
      </head>
      <body suppressHydrationWarning>
        <HashScroll />
        <PixelClickWave />
        <Header />
        <div className="main-layout">
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
