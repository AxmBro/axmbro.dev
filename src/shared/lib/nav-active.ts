import { ROUTES } from "@/shared/constants/routes";

const HOME = ROUTES.home;
const LEGACY_HOME_PATHS = new Set(["/index", "/index.html"]);

export const normalizePathname = (pathname: string | null | undefined) => {
  const path = (pathname ?? "").trim().split("?")[0]?.split("#")[0] ?? "";
  const normalized = path.replace(/\/+$/, "") || HOME;
  return LEGACY_HOME_PATHS.has(normalized) ? HOME : normalized;
};

export const isNavLinkActive = (
  pathname: string | null | undefined,
  href: string,
) => {
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
