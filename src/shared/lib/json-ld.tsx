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
    url: "https://axmbro.dev",
    jobTitle: "Minecraft Bedrock UI Engineer",
    description,
    sameAs,
  };
}
