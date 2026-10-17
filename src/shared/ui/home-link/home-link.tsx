"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { ROUTES } from "@/shared/constants/routes";
import { getScrollBehavior } from "@/shared/lib/motion";
import { normalizePathname } from "@/shared/lib/nav-active";

interface HomeLinkProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export const HomeLink = ({ className, children, onClick }: HomeLinkProps) => {
  const pathname = normalizePathname(usePathname());

  const handleClick = (e: MouseEvent) => {
    onClick?.();

    if (pathname !== ROUTES.home) return;

    e.preventDefault();

    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.scrollTo({ top: 0, behavior: getScrollBehavior() });
  };

  return (
    <Link href={ROUTES.home} className={className} scroll={false} onClick={handleClick}>
      {children}
    </Link>
  );
};
