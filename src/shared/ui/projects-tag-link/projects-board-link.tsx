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
}

export const ProjectsBoardLink = ({
  tab = "all",
  children,
  className,
  onClick,
}: ProjectsBoardLinkProps) => (
  <Link
    href={ROUTES.projects}
    className={className}
    onClick={() => {
      onClick?.();
      primeProjectsBoard({ tab });
    }}
  >
    {children}
  </Link>
);
