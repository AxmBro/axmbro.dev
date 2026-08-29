"use client";

import { Children, type ReactNode } from "react";
import { PROJECT_CONTENT_DELAY, RevealItem, RevealStagger } from "@/shared/ui/motion";

interface ProjectContentRevealProps {
  children: ReactNode;
  className?: string;
  trigger?: "inView" | "mount";
  delay?: number;
}

export function ProjectContentReveal({
  children,
  className,
  trigger = "inView",
  delay = PROJECT_CONTENT_DELAY,
}: ProjectContentRevealProps) {
  return (
    <RevealStagger className={className} trigger={trigger} delay={delay}>
      {Children.toArray(children)
        .filter((child) => child != null)
        .map((child, index) => (
          <RevealItem key={index}>{child}</RevealItem>
        ))}
    </RevealStagger>
  );
}
