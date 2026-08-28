"use client";

import Link from "next/link";
import {
  type MouseEvent,
  type MouseEventHandler,
  type ReactNode,
  type CSSProperties,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { hasHash } from "@/shared/lib/has-hash";
import { normalizePathname } from "@/shared/lib/nav-active";
import { storePendingHash } from "@/shared/lib/pending-hash";
import { normalizePageHash, scrollToHash } from "@/shared/lib/scroll-to-hash";

interface HashLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  "data-variant"?: string;
  "aria-current"?: "page";
}

export const HashLink = ({
  href,
  children,
  className,
  style,
  onClick,
  "data-variant": dataVariant,
  "aria-current": ariaCurrent,
}: HashLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();
  if (!hasHash(href)) {
    return (
      <Link href={href} className={className} aria-current={ariaCurrent}>
        {children}
      </Link>
    );
  }

  const hashIndex = href.indexOf("#");
  const path = href.slice(0, hashIndex) || pathname;
  const hash = normalizePageHash(href.slice(hashIndex));

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (normalizePathname(pathname) !== normalizePathname(path)) {
      e.preventDefault();
      storePendingHash(path, hash);
      router.push(path);
      return;
    }

    e.preventDefault();
    history.replaceState(null, "", `${path}${hash}`);
    scrollToHash(hash);
  };

  return (
    <Link
      href={`${path}${hash}`}
      scroll={false}
      className={className}
      style={style}
      data-variant={dataVariant}
      aria-current={ariaCurrent}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};
