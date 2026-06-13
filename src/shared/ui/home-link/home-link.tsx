"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface HomeLinkProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export const HomeLink = ({ className, children, onClick }: HomeLinkProps) => {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    onClick?.();

    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link href="/" className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};
