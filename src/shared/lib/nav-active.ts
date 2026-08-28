import { ROUTES } from "@/shared/constants/routes";

const HOME = ROUTES.home;

export const normalizePathname = (pathname: string | null | undefined) => {
  const path = (pathname ?? "").trim().split("?")[0]?.split("#")[0] ?? "";
  return path.replace(/\/+$/, "") || HOME;
};

export const isNavLinkActive = (pathname: string, href: string) => {
  const path = normalizePathname(pathname);
  const targetPath = normalizePathname(href);

  if (targetPath === HOME) {
    return path === HOME;
  }

  if (targetPath === ROUTES.projects) {
    return path === ROUTES.projects;
  }

  return path === targetPath || path.startsWith(`${targetPath}/`);
};
