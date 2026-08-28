"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { heroMediaRevealVariants } from "./motion-variants";

interface RevealHeroMediaProps {
  children: ReactNode;
  className?: string;
}

export function RevealHeroMedia({ children, className }: RevealHeroMediaProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={heroMediaRevealVariants}
    >
      {children}
    </motion.div>
  );
}
