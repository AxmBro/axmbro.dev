"use client";

import Link from "next/link";
import { primeProjectsBoard } from "@/shared/lib/projects-board-state";

interface ProjectsTagLinkProps {
  tag: string;
  children: React.ReactNode;
  className?: string;
}

/** Sets a one-shot tag filter and opens /projects without ?tag= in the URL (avoids query + hash conflicts). */
export const ProjectsTagLink = ({ tag, children, className }: ProjectsTagLinkProps) => (
  <Link
    href="/projects"
    className={className}
    onClick={() => primeProjectsBoard({ tag, tab: "all" })}
  >
    {children}
  </Link>
);
