"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, type MouseEvent } from "react";
import { ROUTES } from "@/shared/constants/routes";
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

    if (pathname === ROUTES.home) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link href={ROUTES.home} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};
