"use client";

import Link from "next/link";
import {
  primeProjectsBoard,
  type ProjectsBoardTab,
} from "@/shared/lib/projects-board-state";
import { ROUTES } from "@/shared/constants/routes";
import type { ButtonVariant } from "@/shared/ui/button";
import buttonStyles from "@/shared/ui/button/button.module.scss";

/**
 * Link to /projects with optional tab or tag preset (sessionStorage, consumed on mount).
 * Same variants as Button (primary, outline).
 */
interface ProjectsBoardButtonProps {
  text: string;
  /** @default all when only tag is set */
  tab?: ProjectsBoardTab;
  /** One-shot tag filter (no ?tag= in URL). */
  tag?: string;
  /** @default outline */
  variant?: ButtonVariant;
}

export const ProjectsBoardButton = ({
  text,
  tab,
  tag,
  variant = "outline",
}: ProjectsBoardButtonProps) => (
  <Link
    href={ROUTES.projects}
    className={buttonStyles.button}
    data-variant={variant}
    onClick={() => primeProjectsBoard({ tab, tag })}
  >
    {text}
  </Link>
);
