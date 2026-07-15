export const isReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
