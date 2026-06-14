/** Section IDs for hash links (kebab-case). */
export const SECTION_IDS = {
  about: "about",
  skills: "skills",
  experience: "experience",
  commissionProcess: "commission-process",
  selectedWork: "selected-work",
  contactSocials: "contact",
  sendMessage: "send-message",
  socialLinks: "social-links",
  faq: "faq",
  privacyPolicy: "privacy-policy",
  termsOfUse: "terms-of-use",
};

export const homeSectionHref = (id: string) => `/#${id}`;

export const contactSectionHref = (id: string) => `/contact#${id}`;

export const faqItemId = (slug: string) => `faq-${slug}`;
