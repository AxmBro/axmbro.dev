"use client";

import { Children, type ReactNode } from "react";
import { RevealItem, RevealStagger } from "@/shared/ui/motion";

interface ProjectHeroContentRevealProps {
  className?: string;
  children: ReactNode;
}

export function ProjectHeroContentReveal({ className, children }: ProjectHeroContentRevealProps) {
  return (
    <RevealStagger className={className} trigger="mount" delay={0.12}>
      {Children.toArray(children).map((child, index) => (
        <RevealItem key={index}>{child}</RevealItem>
      ))}
    </RevealStagger>
  );
}
