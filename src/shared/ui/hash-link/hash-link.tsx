"use client";

import Link from "next/link";
import {
  type MouseEvent,
  type MouseEventHandler,
  type ReactNode,
  type CSSProperties,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { normalizePageHash, scrollToHash } from "@/shared/lib/scroll-to-hash";
import { storePendingHash } from "@/shared/lib/pending-hash";

/**
 * Link with hash scroll (sticky header offset). Cross-page: stores hash in sessionStorage
 * and navigates first. Same page: scrolls in place. See scroll-to-hash.ts.
 */
interface HashLinkProps {
  /** Path + hash, e.g. /contact#send-message or #faq-pricing on current page. */
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  "data-variant"?: string;
}

export const HashLink = ({ href, children, className, style, onClick, "data-variant": dataVariant }: HashLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const hashIndex = href.indexOf("#");

  if (hashIndex === -1) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  const path = href.slice(0, hashIndex) || pathname;
  const hash = normalizePageHash(href.slice(hashIndex));

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (pathname !== path) {
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
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};
