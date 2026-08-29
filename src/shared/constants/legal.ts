export interface LegalItem {
  title: string;
  text: string;
}

export const PRIVACY_POLICY_LAST_UPDATED = "30.08.2026";

export const PRIVACY_POLICY_ITEMS: LegalItem[] = [
  {
    title: "Who is responsible",
    text: "AxmBro (axmbro.dev), based in Poland, is the data controller. Privacy contact: axmbro@gmail.com. This policy covers personal data processed when you use the site or contact me, under the GDPR and Polish law.",
  },
  {
    title: "What we process and why",
    text: "Contact form: your email, optional Discord username, and message - used only to read and reply (consent when you send, GDPR Art. 6(1)(a)). Providing this is voluntary, but an email is required to respond. Analytics: basic traffic via Vercel Analytics; Google Analytics 4 only if you accept cookies in the banner. Legal basis for analytics: consent where required, otherwise legitimate interest in running the site (Art. 6(1)(f)). The site is hosted on Vercel; messages go to our inbox via SMTP. Some providers may process data outside the EU/EEA with appropriate safeguards. Data is not sold. Messages are kept only as long as needed for the conversation or until you ask for deletion.",
  },
  {
    title: "Your rights",
    text: "You may request access, correction, deletion, restriction, or object to processing, and withdraw consent at any time. You may lodge a complaint with a supervisory authority - in Poland, UODO (President of the Personal Data Protection Office).",
  },
];

/** DD.MM.YYYY display dates from legal copy - for sitemap and JSON-LD. */
export function parseLegalLastUpdated(dateStr: string): Date | undefined {
  const match = dateStr.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return undefined;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  return new Date(Date.UTC(year, month - 1, day));
}

export const TERMS_OF_USE_LAST_UPDATED = "30.08.2026";

export const TERMS_OF_USE_ITEMS: LegalItem[] = [
  {
    title: "Using this site",
    text: "axmbro.dev is my portfolio and commission information site. By using it, you agree to these Terms. Browse for personal, non-commercial use only. Do not scrape, overload, or misuse the site.",
  },
  {
    title: "Content and commissions",
    text: "Unless stated otherwise, text, images, code, and project work here belong to AxmBro - no copying or reuse without my written permission. Commission details are general information; a project starts only after we agree terms separately. The site is provided \"as is\". External links are for convenience - I am not responsible for third-party sites.",
  },
  {
    title: "Changes and law",
    text: "I may update these Terms; the date above is the current version. Polish law applies.",
  },
];
