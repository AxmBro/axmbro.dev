"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { HashLink } from "@/shared/ui/hash-link";
import { hasHash } from "@/shared/lib/has-hash";

interface InlineMdLinksProps {
  text: string;
}

export function InlineMdLinks({ text }: InlineMdLinksProps) {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const label = match[1];
    const href = match[2];
    const external = /^https?:\/\//i.test(href);

    if (hasHash(href)) {
      nodes.push(
        <HashLink key={`md-link-${key++}`} href={href}>
          {label}
        </HashLink>,
      );
    } else if (href.startsWith("/")) {
      nodes.push(
        <Link key={`md-link-${key++}`} href={href}>
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={`md-link-${key++}`}
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : undefined)}
        >
          {label}
        </a>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : text;
}
