"use client";

import { ReactNode, type CSSProperties } from "react";
import Link from "next/link";
import { HashLink } from "@/shared/ui/hash-link";
import { primeProjectsBoard } from "@/shared/lib/projects-board-state";
import styles from "./button.module.scss";

/**
 * Shared button / link. Default variant: outline.
 *
 * Variants:
 * - primary - blue fill
 * - secondary - gray fill + border
 * - outline - transparent + border
 * - white - white fill
 * - input - matches form field styling
 *
 * With href: external URLs open in new tab; hash routes use HashLink;
 * /projects resets board tab to "all" via sessionStorage.
 */
interface ButtonProps {
  /** @default outline */
  variant?: "primary" | "secondary" | "outline" | "white" | "input";
  text?: string;
  children?: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  href?: string;
  external?: boolean;
}

export const Button = ({
  variant = "outline",
  text,
  children,
  style,
  type = "button",
  onClick,
  href,
  external
}: ButtonProps) => {
  const content = text || children;

  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <a
          href={href}
          className={styles.button}
          data-variant={variant}
          style={style}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    if (href.includes("#")) {
      return (
        <HashLink
          href={href}
          className={styles.button}
          data-variant={variant}
          style={style}
          onClick={onClick}
        >
          {content}
        </HashLink>
      );
    }

    if (href === "/projects") {
      return (
        <Link
          href={href}
          className={styles.button}
          data-variant={variant}
          style={style}
          onClick={() => {
            onClick?.();
            primeProjectsBoard({ tab: "all" });
          }}
        >
          {content}
        </Link>
      );
    }

    return (
      <Link
        href={href}
        className={styles.button}
        data-variant={variant}
        style={style}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={styles.button}
      data-variant={variant}
      style={style}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
