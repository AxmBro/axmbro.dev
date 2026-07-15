export const SECTION_IDS = {
  profile: "profile",
  trackRecord: "track-record",
  skills: "skills",
  experience: "experience-education",
  workWithMe: "work-with-me",
  commissionServices: "services",
  commissionRequirements: "requirements",
  commissionProcess: "commission-process",
  commissionDelivery: "delivery-support",
  commissionFaq: "commission-faq",
  selectedWork: "selected-work",
  startProject: "start-project",
  contactOptions: "contact-options",
  quickQuestions: "quick-questions",
  privacyPolicy: "privacy-policy",
  termsOfUse: "terms-of-use",
};

export const homeSectionHref = (id: string) => `/#${id}`;

export const contactSectionHref = (id: string) => `/contact#${id}`;

export const commissionSectionHref = (id: string) => `/commissions#${id}`;

export const faqItemId = (slug: string) => `faq-${slug}`;
