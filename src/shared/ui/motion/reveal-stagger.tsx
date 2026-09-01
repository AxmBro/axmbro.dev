"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  revealViewport,
  staggerContainerVariants,
  staggerItemVariants,
} from "./motion-variants";

type RevealStaggerTrigger = "inView" | "mount";

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  trigger?: RevealStaggerTrigger;
  delay?: number;
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
}

export const RevealStagger = forwardRef<HTMLDivElement, RevealStaggerProps>(
  function RevealStagger(
    { children, className, trigger = "inView", delay },
    ref,
  ) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={trigger === "mount" ? "visible" : undefined}
        whileInView={trigger === "inView" ? "visible" : undefined}
        viewport={trigger === "inView" ? revealViewport : undefined}
        variants={staggerContainerVariants}
        transition={delay ? { delayChildren: delay } : undefined}
      >
        {children}
      </motion.div>
    );
  },
);

export function RevealItem({ children, className }: RevealItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}
