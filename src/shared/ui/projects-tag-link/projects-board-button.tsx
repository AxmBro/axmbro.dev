"use client";

import Link from "next/link";
import {
  primeProjectsBoard,
  type ProjectsBoardTab,
} from "@/shared/lib/projects-board-state";
import buttonStyles from "@/shared/ui/button/button.module.scss";

/**
 * Link to /projects with optional tab or tag preset (sessionStorage, consumed on mount).
 * Same variants as Button except input/white.
 */
interface ProjectsBoardButtonProps {
  text: string;
  /** @default all when only tag is set */
  tab?: ProjectsBoardTab;
  /** One-shot tag filter (no ?tag= in URL). */
  tag?: string;
  /** @default outline */
  variant?: "primary" | "secondary" | "outline";
}

export const ProjectsBoardButton = ({
  text,
  tab,
  tag,
  variant = "outline",
}: ProjectsBoardButtonProps) => (
  <Link
    href="/projects"
    className={buttonStyles.button}
    data-variant={variant}
    onClick={() => primeProjectsBoard({ tab, tag })}
  >
    {text}
  </Link>
);
