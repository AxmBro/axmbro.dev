"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, type MouseEvent } from "react";
import { ROUTES } from "@/shared/constants/routes";
import { normalizePathname } from "@/shared/lib/nav-active";
import { notifyPageHashChange } from "@/shared/lib/scroll-to-hash";

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

    const path = window.location.pathname + window.location.search;
    if (window.location.hash) {
      history.replaceState(null, "", path);
      notifyPageHashChange();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link href={ROUTES.home} className={className} scroll={false} onClick={handleClick}>
      {children}
    </Link>
  );
};
