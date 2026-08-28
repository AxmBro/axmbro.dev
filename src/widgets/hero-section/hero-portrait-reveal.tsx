"use client";

import type { ReactNode } from "react";
import { RevealEnter } from "@/shared/ui/motion";

interface HeroPortraitRevealProps {
  className?: string;
  children: ReactNode;
}

export function HeroPortraitReveal({ className, children }: HeroPortraitRevealProps) {
  return (
    <RevealEnter className={className} direction="right" delay={0.15}>
      {children}
    </RevealEnter>
  );
}
