"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariants, revealViewport } from "./motion-variants";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  delay?: number;
}

export function Reveal({ children, className, as = "div", delay }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeUpVariants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
