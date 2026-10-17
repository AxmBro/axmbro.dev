"use client";

import Image from "next/image";
import { usePortraitFlip } from "./use-portrait-flip";
import { HERO_PORTRAIT_IMAGE_SIZES } from "@/shared/constants/breakpoints";
import { HERO_PORTRAITS, HOME_PAGE_TEXTS } from "@/shared/constants/data";
import styles from "./hero-section.module.scss";

export const HeroPortrait = () => {
  const {
    portraitState,
    hasCompletedInitialFlip,
    frontPortrait,
    backPortrait,
    currentLabel,
    interactionHandlers,
  } = usePortraitFlip(HERO_PORTRAITS);

  return (
    <button
      type="button"
      className={styles.portraitButton}
      aria-label={HOME_PAGE_TEXTS.hero.portraitAria(currentLabel)}
      {...interactionHandlers}
    >
      <span className={styles.portraitScene}>
        <span
          className={`${styles.portraitCard} ${portraitState.isFlipped ? styles.portraitCardFlipped : ""}`}
        >
          <span className={`${styles.portraitFace} ${styles.portraitFront}`}>
            <Image
              src={frontPortrait.src}
              alt={frontPortrait.alt}
              fill
              preload
              sizes={HERO_PORTRAIT_IMAGE_SIZES}
              className={`${styles.portraitImage} ${frontPortrait.kind === "design" ? styles.portraitImageDesign : ""}`}
            />
          </span>
          <span className={`${styles.portraitFace} ${styles.portraitBack}`}>
            <Image
              src={backPortrait.src}
              alt={backPortrait.alt}
              fill
              sizes={HERO_PORTRAIT_IMAGE_SIZES}
              className={`${styles.portraitImage} ${backPortrait.kind === "design" ? styles.portraitImageDesign : ""}`}
            />
          </span>
        </span>
      </span>
      <span
        key={portraitState.currentIndex}
        className={`${styles.portraitLabel} ${hasCompletedInitialFlip ? "" : styles.portraitLabelPending}`}
      >
        {currentLabel}
      </span>
    </button>
  );
};
