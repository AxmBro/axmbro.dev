"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  fadeFromRightVariants,
  fadeFromTopVariants,
  fadeUpVariants,
} from "./motion-variants";

type RevealEnterDirection = "up" | "right" | "top";
type RevealEnterElement = "div" | "aside";

interface RevealEnterProps {
  children: ReactNode;
  className?: string;
  direction?: RevealEnterDirection;
  delay?: number;
  as?: RevealEnterElement;
  "aria-label"?: string;
  "data-announcement-bar"?: boolean;
}

const enterVariants = {
  up: fadeUpVariants,
  right: fadeFromRightVariants,
  top: fadeFromTopVariants,
} as const;

export function RevealEnter({
  children,
  className,
  direction = "up",
  delay,
  as = "div",
  "aria-label": ariaLabel,
  "data-announcement-bar": dataAnnouncementBar,
}: RevealEnterProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag
        className={className}
        aria-label={ariaLabel}
        data-announcement-bar={dataAnnouncementBar ? true : undefined}
      >
        {children}
      </Tag>
    );
  }

  const MotionTag = as === "aside" ? motion.aside : motion.div;

  return (
    <MotionTag
      className={className}
      aria-label={ariaLabel}
      data-announcement-bar={dataAnnouncementBar ? true : undefined}
      initial="hidden"
      animate="visible"
      variants={enterVariants[direction]}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
