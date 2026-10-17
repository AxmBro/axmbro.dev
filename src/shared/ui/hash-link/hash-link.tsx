"use client";

import Link from "next/link";
import {
  type MouseEvent,
  type MouseEventHandler,
  type ReactNode,
  type CSSProperties,
} from "react";
import { usePathname } from "next/navigation";
import { hasHash } from "@/shared/lib/has-hash";
import { normalizePathname } from "@/shared/lib/nav-active";
import { scrollToHash } from "@/shared/lib/scroll-to-hash";

interface HashLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  "data-variant"?: string;
  "aria-current"?: "page";
}

const isModifiedClick = (e: MouseEvent) =>
  e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

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
  const hashIndex = href.indexOf("#");
  const path = hasHash(href) ? href.slice(0, hashIndex) || pathname : href;
  const hash = hasHash(href) ? href.slice(hashIndex) : "";
  const isSamePage = Boolean(hash) && normalizePathname(pathname) === normalizePathname(path);

  // Other page (or no hash): Next scrolls to the hash target after navigation.
  if (!isSamePage) {
    return (
      <Link
        href={`${path}${hash}`}
        className={className}
        style={style}
        data-variant={dataVariant}
        aria-current={ariaCurrent}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  // Same page: scroll on every click (a repeat click on `Link` does not). `replaceState` keeps
  // Next's history state; it does not fire `hashchange`, so dispatch it for listeners (FAQ).
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || isModifiedClick(e)) return;

    e.preventDefault();
    if (window.location.hash !== hash) {
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    scrollToHash(hash);
  };

  return (
    <a
      href={`${path}${hash}`}
      className={className}
      style={style}
      data-variant={dataVariant}
      aria-current={ariaCurrent}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};
