"use client";

import type { RefObject } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { revealViewport } from "./motion-variants";

export function useRevealInView(ref: RefObject<Element | null>) {
  const isInView = useInView(ref, revealViewport);
  const reduceMotion = useReducedMotion();

  return isInView || reduceMotion === true;
}
