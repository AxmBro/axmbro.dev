import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Lexend } from "next/font/google";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { HashScroll } from "@/shared/ui/hash-scroll";
import { PixelClickWave } from "@/shared/ui/pixel-click-wave";
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
  description:
    "Computer Science student and Minecraft Bedrock UI Engineer from Poland building custom JsonUI for studios, servers, and creators, plus responsive React and Next.js websites.",
  keywords: [
    "AxmBro",
    "Minecraft Bedrock",
    "JsonUI",
    "MCBE UI",
    "UI Engineer",
    "custom HUD",
    "server forms",
    "web developer",
    "Better Bedrock",
  ],
  metadataBase: new URL("https://axmbro.dev"),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  openGraph: {
    title: "AxmBro.dev | Home",
    description:
      "Computer Science student and Minecraft Bedrock UI Engineer from Poland building custom JsonUI for studios, servers, and creators, plus responsive React and Next.js websites.",
    url: "https://axmbro.dev",
    siteName: "AxmBro",
    images: [
      {
        url: "/images/ui/og-image.png",
        width: 1200,
        height: 630,
        alt: "AxmBro - Minecraft Bedrock UI Engineer and Frontend Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AxmBro.dev | Home",
    description:
      "Computer Science student and Minecraft Bedrock UI Engineer from Poland building custom JsonUI and responsive React and Next.js websites.",
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
      <body suppressHydrationWarning>
        <Script src="/scripts/hash-scroll-init.js" strategy="beforeInteractive" />
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
