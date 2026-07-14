"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styles from "./hero-section.module.scss";

const FLIP_INTERVAL_MS = 6000;
const INITIAL_FLIP_DELAY_MS = 700;

const PORTRAITS = [
  {
    src: "/images/axmbro-logo-irl.png",
    alt: "AxmBro portrait",
    kind: "photo",
    label: "Computer Science Student",
  },
  {
    src: "/images/axmbro-logo-design.png",
    alt: "AxmBro illustrated logo",
    kind: "design",
    label: "Content Creator",
  },
  {
    src: "/images/axmbro-logo-mc.png",
    alt: "AxmBro Minecraft character",
    kind: "minecraft",
    label: "Minecraft Bedrock Player",
  },
] as const;

const getNextPortraitIndex = (currentIndex: number) => {
  const offset = Math.floor(Math.random() * (PORTRAITS.length - 1)) + 1;
  return (currentIndex + offset) % PORTRAITS.length;
};

export const HeroPortrait = () => {
  const [portraitState, setPortraitState] = useState({
    currentIndex: 0,
    frontIndex: 0,
    backIndex: 1,
    isFlipped: false,
  });
  const [isPaused, setIsPaused] = useState(false);
  const [hasCompletedInitialFlip, setHasCompletedInitialFlip] = useState(false);

  const showNextPortrait = useCallback(() => {
    setPortraitState((current) => {
      const nextIndex = getNextPortraitIndex(current.currentIndex);

      return current.isFlipped
        ? {
            ...current,
            currentIndex: nextIndex,
            frontIndex: nextIndex,
            isFlipped: false,
          }
        : {
            ...current,
            currentIndex: nextIndex,
            backIndex: nextIndex,
            isFlipped: true,
          };
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeoutId = window.setTimeout(() => {
      showNextPortrait();
      setHasCompletedInitialFlip(true);
    }, INITIAL_FLIP_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [showNextPortrait]);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(showNextPortrait, FLIP_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [isPaused, showNextPortrait]);

  const frontPortrait = PORTRAITS[portraitState.frontIndex];
  const backPortrait = PORTRAITS[portraitState.backIndex];

  return (
    <button
      type="button"
      className={styles.portraitButton}
      aria-label={`Switch AxmBro portrait - ${PORTRAITS[portraitState.currentIndex].label}`}
      onPointerEnter={(event) => {
        setIsPaused(true);
        if (event.pointerType === "mouse") {
          showNextPortrait();
        }
      }}
      onPointerLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onClick={(event) => {
        const isKeyboardClick = event.detail === 0;
        const hasNoHover = window.matchMedia("(hover: none)").matches;

        if (isKeyboardClick || hasNoHover) {
          showNextPortrait();
        }
      }}
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
              sizes="(max-width: 768px) 60vw, 280px"
              className={`${styles.portraitImage} ${frontPortrait.kind === "design" ? styles.portraitImageDesign : ""}`}
            />
          </span>
          <span className={`${styles.portraitFace} ${styles.portraitBack}`}>
            <Image
              src={backPortrait.src}
              alt={backPortrait.alt}
              fill
              sizes="(max-width: 768px) 60vw, 280px"
              className={`${styles.portraitImage} ${backPortrait.kind === "design" ? styles.portraitImageDesign : ""}`}
            />
          </span>
        </span>
      </span>
      <span
        key={portraitState.currentIndex}
        className={`${styles.portraitLabel} ${hasCompletedInitialFlip ? "" : styles.portraitLabelPending}`}
      >
        {PORTRAITS[portraitState.currentIndex].label}
      </span>
    </button>
  );
};
