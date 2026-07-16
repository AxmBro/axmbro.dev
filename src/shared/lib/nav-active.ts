import { ROUTES } from "@/shared/constants/routes";

const navPath = (href: string) => href.split("#")[0]?.split("?")[0] || ROUTES.home;

export const normalizePathname = (pathname: string) => {
  const path = pathname.split("?")[0] || ROUTES.home;
  return path || ROUTES.home;
};

export const isNavLinkActive = (pathname: string, href: string) => {
  const path = normalizePathname(pathname);
  const targetPath = navPath(href);

  if (targetPath === ROUTES.home) {
    return path === ROUTES.home;
  }

  if (targetPath === ROUTES.projects) {
    return path === ROUTES.projects;
  }

  return path === targetPath || path.startsWith(`${targetPath}/`);
};
