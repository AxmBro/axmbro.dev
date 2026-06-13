"use client";

import Link from "next/link";
import {
  primeProjectsBoard,
  type ProjectsBoardTab,
} from "@/shared/lib/projects-board-state";

interface ProjectsBoardLinkProps {
  tab?: ProjectsBoardTab;
  children: React.ReactNode;
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
    href="/projects"
    className={className}
    onClick={() => {
      onClick?.();
      primeProjectsBoard({ tab });
    }}
  >
    {children}
  </Link>
);
