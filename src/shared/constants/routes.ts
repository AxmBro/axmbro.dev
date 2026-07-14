export const ROUTES = {
  home: "/",
  projects: "/projects",
  commissions: "/commissions",
  contact: "/contact",
  sitemap: "/sitemap",
  privacyPolicy: "/privacy-policy",
  termsOfUse: "/terms-of-use",
};

export const projectDetailPath = (projectId: string) =>
  `${ROUTES.projects}/${projectId}`;
