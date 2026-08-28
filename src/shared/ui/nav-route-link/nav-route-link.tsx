import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import { HashLink } from "@/shared/ui/hash-link";
import { ProjectsBoardLink } from "@/shared/ui/projects-tag-link";
import { ROUTES } from "@/shared/constants/routes";
import { hasHash } from "@/shared/lib/has-hash";

interface NavRouteLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
  onPlainClick?: MouseEventHandler<HTMLAnchorElement>;
  "aria-current"?: "page";
}

export function NavRouteLink({
  href,
  children,
  className,
  onNavigate,
  onPlainClick,
  "aria-current": ariaCurrent,
}: NavRouteLinkProps) {
  if (hasHash(href)) {
    return (
      <HashLink
        href={href}
        className={className}
        aria-current={ariaCurrent}
        onClick={() => onNavigate?.()}
      >
        {children}
      </HashLink>
    );
  }

  if (href === ROUTES.projects) {
    return (
      <ProjectsBoardLink
        tab="all"
        className={className}
        aria-current={ariaCurrent}
        onClick={onNavigate}
      >
        {children}
      </ProjectsBoardLink>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-current={ariaCurrent}
      onClick={onPlainClick ?? (onNavigate ? () => onNavigate() : undefined)}
    >
      {children}
    </Link>
  );
}
