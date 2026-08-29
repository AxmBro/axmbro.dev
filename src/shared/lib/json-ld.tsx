import { SITE_ORIGIN } from "@/shared/constants/site";
import { SITE_ROLE } from "@/shared/constants/data";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type FaqJsonLdItem = {
  question: string;
  answerText: string;
};

export function buildFaqPageJsonLd(items: FaqJsonLdItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answerText,
      },
    })),
  };
}

type PersonJsonLdOptions = {
  description: string;
  sameAs: string[];
};

export function buildPersonJsonLd({ description, sameAs }: PersonJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "AxmBro",
    url: SITE_ORIGIN,
    image: `${SITE_ORIGIN}/icon192.png`,
    jobTitle: SITE_ROLE.headline,
    description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "PL",
    },
    sameAs,
  };
}

type ProjectJsonLdOptions = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
};

export function buildProjectJsonLd({ title, description, path, image }: ProjectJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: `${SITE_ORIGIN}${path}`,
    ...(image ? { image: `${SITE_ORIGIN}${image}` } : {}),
    author: {
      "@type": "Person",
      name: "AxmBro",
      url: SITE_ORIGIN,
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_ORIGIN}${item.path}`,
    })),
  };
}

type WebPageJsonLdOptions = {
  title: string;
  description: string;
  path: string;
  dateModified: Date;
};

export function buildWebPageJsonLd({
  title,
  description,
  path,
  dateModified,
}: WebPageJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_ORIGIN}${path}`,
    dateModified: dateModified.toISOString().split("T")[0],
    isPartOf: {
      "@type": "WebSite",
      name: "AxmBro.dev",
      url: SITE_ORIGIN,
    },
  };
}
