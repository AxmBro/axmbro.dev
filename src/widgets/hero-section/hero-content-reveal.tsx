"use client";

import { Children, type ReactNode } from "react";
import { RevealItem, RevealStagger } from "@/shared/ui/motion";

interface HeroContentRevealProps {
  className?: string;
  children: ReactNode;
}

export function HeroContentReveal({ className, children }: HeroContentRevealProps) {
  return (
    <RevealStagger className={className} trigger="mount">
      {Children.toArray(children).map((child, index) => (
        <RevealItem key={index}>{child}</RevealItem>
      ))}
    </RevealStagger>
  );
}
