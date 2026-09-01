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

// Card accent title only: earlier inView than default entry reveal (see motion-and-polish.mdc).
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

export const fadeFromRightVariants: Variants = {
  hidden: { opacity: 0, x: REVEAL_X },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE },
  },
};

export const fadeFromTopVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE },
  },
};

export const heroMediaRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: HERO_MEDIA_DURATION, ease: REVEAL_EASE },
  },
};

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
