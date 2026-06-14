"use client";

import Link from "next/link";
import { HashLink } from "@/shared/ui/hash-link";
import { primeProjectsBoard } from "@/shared/lib/projects-board-state";
import type { ButtonVariant } from "./button-variants";
import { ROUTES } from "@/shared/constants/routes";
import styles from "./button.module.scss";

export type { ButtonVariant } from "./button-variants";
export { buttonVariantForIndex } from "./button-variants";

/**
 * Shared button / link. Default variant: outline.
 *
 * Variants:
 * - primary - blue fill
 * - secondary - gray fill + border
 * - outline - transparent + border
 *
 * In a row of Buttons, prefer `buttonVariantForIndex` for consistent hierarchy.
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

    if (href === ROUTES.projects) {
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
