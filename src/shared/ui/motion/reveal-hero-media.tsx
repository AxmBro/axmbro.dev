import type { ReactNode } from "react";
import { RevealEnter } from "./reveal-enter";

interface RevealHeroMediaProps {
  children: ReactNode;
  className?: string;
}

export function RevealHeroMedia({ children, className }: RevealHeroMediaProps) {
  return (
    <RevealEnter className={className} direction="scale">
      {children}
    </RevealEnter>
  );
}
