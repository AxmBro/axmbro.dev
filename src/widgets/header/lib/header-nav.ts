import type { MouseEvent } from "react";
import { hasHash } from "@/shared/lib/has-hash";
import { isNavLinkActive, normalizePathname } from "@/shared/lib/nav-active";
import { ROUTES } from "@/shared/constants/routes";

export const isPlainHeaderNavLink = (href: string) =>
  !hasHash(href) && href !== ROUTES.projects;

export const getHeaderNavLinkState = (
  pathname: string | null | undefined,
  href: string,
  baseClass: string,
  activeClass: string,
) => {
  const isActive = isNavLinkActive(pathname, href);

  return {
    className: isActive ? `${baseClass} ${activeClass}` : baseClass,
    ariaCurrent: isActive ? ("page" as const) : undefined,
  };
};

export const scrollToTopOnSameRoute = (
  pathname: string,
  href: string,
  event: MouseEvent<HTMLAnchorElement>,
) => {
  if (normalizePathname(pathname) !== normalizePathname(href)) return;

  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
};
