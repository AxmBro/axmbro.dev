import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import "./globals.scss";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AxmBro | Programmer",
    template: "AxmBro | %s",
  },
  description: "Personal portfolio of AxmBro - Programmer, MCBE JsonUI Developer, Web Developer.",
  metadataBase: new URL("https://axmbro.dev"),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  openGraph: {
    title: "AxmBro | Programmer",
    description: "Personal portfolio of AxmBro - Programmer, MCBE JsonUI Developer, Web Developer.",
    url: "https://axmbro.dev",
    siteName: "AxmBro",
    images: [
      {
        url: "/images/ui/logo192.png",
        width: 192,
        height: 192,
        alt: "AxmBro - Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AxmBro | Programmer",
    description: "Personal portfolio of AxmBro - Programmer, MCBE JsonUI Developer, Web Developer.",
    images: ["/images/ui/logo192.png"],
    creator: "@AxmBro",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "AxmBro",
    "url": "https://axmbro.dev",
    "image": "https://axmbro.dev/images/ui/logo192.png",
    "sameAs": [
      "https://github.com/AxmBro",
      "https://www.youtube.com/@axmbro",
      "https://www.youtube.com/@axmbro2",
      "https://twitter.com/AxmBro",
      "https://www.instagram.com/axmbro_"
    ],
    "jobTitle": "Minecraft Bedrock UI Developer & Web Developer",
    "knowsAbout": [
      "Minecraft Bedrock Edition",
      "JsonUI",
      "React",
      "TypeScript",
      "Web Development"
    ]
  };

  return (
    <html lang="en" className={lexend.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
