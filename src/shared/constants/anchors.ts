import { ROUTES } from "./routes";

export const SECTION_IDS = {
  profile: "profile",
  trackRecord: "track-record",
  skills: "skills",
  experience: "experience-education",
  workWithMe: "work-with-me",
  commissionServices: "services",
  commissionClients: "clients",
  commissionRequirements: "requirements",
  commissionProcess: "commission-process",
  commissionDelivery: "delivery-support",
  commissionFaq: "commission-faq",
  selectedWork: "selected-work",
  contactForm: "contact-form",
  contactOptions: "contact-options",
  quickQuestions: "quick-questions",
  privacyPolicy: "privacy-policy",
  termsOfUse: "terms-of-use",
  /** First Media / video block on a project detail page */
  projectShowcase: "showcase-video",
  projectOverview: "overview",
  projectCredits: "credits",
};

export const homeSectionHref = (id: string) => `/#${id}`;

export const contactSectionHref = (id: string) => `/contact#${id}`;

/** Primary contact page - no hash jump */
export const contactFormHref = () => ROUTES.contact;

export const commissionSectionHref = (id: string) => `/commissions#${id}`;

export const faqItemId = (slug: string) => `faq-${slug}`;

export const faqItemHref = (slug: string) =>
  contactSectionHref(faqItemId(slug));

export const commissionFaqItemHref = (slug: string) =>
  commissionSectionHref(faqItemId(slug));
