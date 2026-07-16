"use client";

import Image from "next/image";
import { usePortraitFlip } from "./use-portrait-flip";
import { HERO_PORTRAIT_IMAGE_SIZES } from "@/shared/constants/breakpoints";
import styles from "./hero-section.module.scss";

const PORTRAITS = [
  {
    src: "/images/brand/axmbro-logo-irl.png",
    alt: "AxmBro portrait",
    kind: "photo",
    label: "Computer Science Student",
  },
  {
    src: "/images/brand/axmbro-logo-design.png",
    alt: "AxmBro illustrated logo",
    kind: "design",
    label: "Content Creator",
  },
  {
    src: "/images/brand/axmbro-logo-mc.png",
    alt: "AxmBro Minecraft character",
    kind: "minecraft",
    label: "Minecraft Bedrock Player",
  },
] as const;

export const HeroPortrait = () => {
  const {
    portraitState,
    hasCompletedInitialFlip,
    frontPortrait,
    backPortrait,
    currentLabel,
    interactionHandlers,
  } = usePortraitFlip(PORTRAITS);

  return (
    <button
      type="button"
      className={styles.portraitButton}
      aria-label={`Switch AxmBro portrait - ${currentLabel}`}
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
              priority
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
