export const ROUTES = {
  home: "/",
  projects: "/projects",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  termsOfUse: "/terms-of-use",
};

export const projectDetailPath = (projectId: string) =>
  `${ROUTES.projects}/${projectId}`;
