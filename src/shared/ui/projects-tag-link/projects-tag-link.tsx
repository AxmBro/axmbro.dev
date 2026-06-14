"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { primeProjectsBoard } from "@/shared/lib/projects-board-state";

interface ProjectsTagLinkProps {
  tag: string;
  children: ReactNode;
  className?: string;
}

/**
 * Inline tag link to /projects. Sets one-shot tag filter via sessionStorage (no ?tag= in URL).
 */
export const ProjectsTagLink = ({ tag, children, className }: ProjectsTagLinkProps) => (
  <Link
    href="/projects"
    className={className}
    onClick={() => primeProjectsBoard({ tag, tab: "all" })}
  >
    {children}
  </Link>
);
