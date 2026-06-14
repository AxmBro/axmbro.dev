"use client";

import Link from "next/link";
import { HashLink } from "@/shared/ui/hash-link";
import { primeProjectsBoard } from "@/shared/lib/projects-board-state";
import styles from "./button.module.scss";

export type ButtonVariant = "primary" | "secondary" | "outline";

/**
 * Shared button / link. Default variant: outline.
 *
 * Variants:
 * - primary - blue fill
 * - secondary - gray fill + border
 * - outline - transparent + border
 *
 * With href: external URLs open in new tab; hash routes use HashLink;
 * /projects resets board tab to "all" via sessionStorage.
 */
interface ButtonProps {
  /** @default outline */
  variant?: ButtonVariant;
  text: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  href?: string;
  external?: boolean;
}

export const Button = ({
  variant = "outline",
  text,
  type = "button",
  onClick,
  href,
  external
}: ButtonProps) => {
  const content = text;

  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <a
          href={href}
          className={styles.button}
          data-variant={variant}
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
      onClick={onClick}
    >
      {content}
    </button>
  );
};
