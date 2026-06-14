import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Lexend } from "next/font/google";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { HashScroll } from "@/shared/ui/hash-scroll";
import "./globals.scss";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AxmBro.dev | MCBE UI Architect & Developer",
    template: "AxmBro.dev | %s",
  },
  description:
    "Computer Science student and UI Architect from Poland. I engineer custom Minecraft Bedrock interfaces (JsonUI) for marketplace studios and build modern web applications.",
  keywords: [
    "AxmBro",
    "Minecraft Bedrock",
    "JsonUI",
    "MCBE UI",
    "UI Architect",
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
    title: "AxmBro.dev | MCBE UI Architect & Developer",
    description:
      "Computer Science student and UI Architect from Poland. I engineer custom Minecraft Bedrock interfaces (JsonUI) for marketplace studios and build modern web applications.",
    url: "https://axmbro.dev",
    siteName: "AxmBro",
    images: [
      {
        url: "/images/ui/og-image.png",
        width: 1200,
        height: 630,
        alt: "AxmBro - MCBE UI Architect & Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AxmBro.dev | MCBE UI Architect & Developer",
    description:
      "Computer Science student and UI Architect from Poland. I engineer custom Minecraft Bedrock interfaces (JsonUI) and build modern web applications.",
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
    <html lang="en" className={lexend.variable}>
      <body>
        <Script src="/scripts/hash-scroll-init.js" strategy="beforeInteractive" />
        <HashScroll />
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
