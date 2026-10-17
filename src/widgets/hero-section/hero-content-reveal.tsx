import { Children, type ReactNode } from "react";
import { RevealEnter, STAGGER_CHILDREN } from "@/shared/ui/motion";

interface HeroContentRevealProps {
  className?: string;
  children: ReactNode;
}

export function HeroContentReveal({ className, children }: HeroContentRevealProps) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, index) => (
        <RevealEnter key={index} delay={index * STAGGER_CHILDREN}>
          {child}
        </RevealEnter>
      ))}
    </div>
  );
}
