"use client";

import Link from "next/link";
import {
  primeProjectsBoard,
  type ProjectsBoardTab,
} from "@/shared/lib/projects-board-state";
import buttonStyles from "@/shared/ui/button/button.module.scss";

interface ProjectsBoardButtonProps {
  text: string;
  tab?: ProjectsBoardTab;
  tag?: string;
  variant?: "primary" | "secondary";
}

export const ProjectsBoardButton = ({
  text,
  tab,
  tag,
  variant = "secondary",
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
