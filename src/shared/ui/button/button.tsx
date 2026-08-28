"use client";

import Link from "next/link";
import { HashLink } from "@/shared/ui/hash-link";
import { hasHash } from "@/shared/lib/has-hash";
import {
  primeProjectsBoard,
  type ProjectsBoardTab,
} from "@/shared/lib/projects-board-state";
import type { ButtonVariant } from "./button-variants";
import { ROUTES } from "@/shared/constants/routes";
import styles from "./button.module.scss";

interface ButtonProps {
  variant?: ButtonVariant;
  text: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  href?: string;
  external?: boolean;
  /** Preset tab when href is /projects (default: all). */
  projectsBoardTab?: ProjectsBoardTab;
  /** One-shot tag filter when href is /projects. */
  projectsBoardTag?: string;
}

export const Button = ({
  variant = "outline",
  text,
  type = "button",
  onClick,
  href,
  external,
  projectsBoardTab,
  projectsBoardTag,
}: ButtonProps) => {
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
          {text}
        </a>
      );
    }

    if (hasHash(href)) {
      return (
        <HashLink
          href={href}
          className={styles.button}
          data-variant={variant}
          onClick={onClick}
        >
          {text}
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
            primeProjectsBoard({
              tab: projectsBoardTab ?? "all",
              tag: projectsBoardTag,
            });
          }}
        >
          {text}
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
        {text}
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
      {text}
    </button>
  );
};
