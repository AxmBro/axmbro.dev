"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  primeProjectsBoard,
  type ProjectsBoardTab,
} from "@/shared/lib/projects-board-state";
import { ROUTES } from "@/shared/constants/routes";

interface ProjectsBoardLinkProps {
  tab?: ProjectsBoardTab;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-current"?: "page";
}

export const ProjectsBoardLink = ({
  tab = "all",
  children,
  className,
  onClick,
  "aria-current": ariaCurrent,
}: ProjectsBoardLinkProps) => (
  <Link
    href={ROUTES.projects}
    className={className}
    aria-current={ariaCurrent}
    onClick={() => {
      onClick?.();
      primeProjectsBoard({ tab });
    }}
  >
    {children}
  </Link>
);
