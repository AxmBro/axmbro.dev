"use client";

import { useSyncExternalStore } from "react";
import { isReducedMotion, REDUCED_MOTION_QUERY } from "@/shared/lib/motion";

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

/**
 * Hydration-safe replacement for motion's `useReducedMotion`: `false` on the server and during
 * hydration, then the real preference. motion's hook reads `matchMedia` in a `useState` initializer,
 * so render branches on it hydrate against SSR `opacity:0` and React never patches the attribute.
 */
export const useReducedMotion = () =>
  useSyncExternalStore(subscribe, isReducedMotion, () => false);
