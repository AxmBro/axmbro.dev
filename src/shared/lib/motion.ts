export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const isReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

/** JS `behavior: "smooth"` overrides CSS, so programmatic scrolls must check the preference. */
export const getScrollBehavior = (): ScrollBehavior => (isReducedMotion() ? "auto" : "smooth");
