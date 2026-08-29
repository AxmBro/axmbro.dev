"use client";

import type { RefObject } from "react";
import { useInView, useReducedMotion, type UseInViewOptions } from "motion/react";
import { REVEAL_VIEWPORT_MARGIN } from "./motion-variants";

export function useRevealInView(
  ref: RefObject<Element | null>,
  {
    once = true,
    margin = REVEAL_VIEWPORT_MARGIN,
  }: { once?: boolean; margin?: UseInViewOptions["margin"] } = {},
) {
  const isInView = useInView(ref, { once, amount: 0, margin });
  const reduceMotion = useReducedMotion();

  return isInView || reduceMotion === true;
}
