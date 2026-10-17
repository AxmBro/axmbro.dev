import type { Variants } from "motion/react";

export const REVEAL_Y = 18;
export const REVEAL_X = 24;
export const REVEAL_DURATION = 0.5;
export const HERO_MEDIA_DURATION = 0.75;
export const REVEAL_EASE = [0.25, 0.1, 0.25, 1] as const;
export const STAGGER_CHILDREN = 0.07;

export const PROJECT_CONTENT_DELAY = 0.12;
export const PROJECT_FEATURED_CARD_STEP = 0.06;

export function projectAccentDelayHeroTitle(): number {
  return PROJECT_CONTENT_DELAY;
}

export const REVEAL_VIEWPORT_MARGIN = "0px 0px -15% 0px";

// Card accent title only: earlier inView than the default entry reveal.
export const REVEAL_ACCENT_TITLE_VIEWPORT_MARGIN = "0px 0px -12% 0px";

export const revealViewport = {
  once: true,
  amount: 0,
  margin: REVEAL_VIEWPORT_MARGIN,
} as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE },
  },
};

// Mount entrances (`RevealEnter`, `RevealHeroMedia`) run as CSS keyframes so they start at first
// paint instead of after hydration - an `opacity:0` hero is not an LCP candidate until it fades in.
export const ENTER_FROM = {
  up: `translateY(${REVEAL_Y}px)`,
  right: `translateX(${REVEAL_X}px)`,
  top: "translateY(-12px)",
  scale: "scale(1.04)",
} as const;

export type EnterFrom = keyof typeof ENTER_FROM;

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER_CHILDREN },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE },
  },
};
