"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { isReducedMotion } from "@/shared/lib/motion";
import {
  HERO_FIRST_SYNCED_BEAT_MS,
  HERO_FLIP_INTERVAL_MS,
  HERO_INITIAL_FLIP_DELAY_MS,
} from "./hero-motion";
import { useHeroAlignedLoop } from "./use-hero-aligned-loop";

type HeroPortraitItem = {
  src: string;
  alt: string;
  kind: "photo" | "design" | "minecraft";
  label: string;
};

type PortraitState = {
  currentIndex: number;
  frontIndex: number;
  backIndex: number;
  isFlipped: boolean;
};

const getNextPortraitIndex = (currentIndex: number, portraitCount: number) => {
  const offset = Math.floor(Math.random() * (portraitCount - 1)) + 1;
  return (currentIndex + offset) % portraitCount;
};

export const usePortraitFlip = (portraits: readonly HeroPortraitItem[]) => {
  const [portraitState, setPortraitState] = useState<PortraitState>({
    currentIndex: 0,
    frontIndex: 0,
    backIndex: 1,
    isFlipped: false,
  });
  const [hasCompletedInitialFlip, setHasCompletedInitialFlip] = useState(false);
  const isPausedRef = useRef(false);

  const showNextPortrait = useCallback(() => {
    setPortraitState((current) => {
      const nextIndex = getNextPortraitIndex(current.currentIndex, portraits.length);

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
  }, [portraits.length]);

  useEffect(() => {
    if (isReducedMotion()) return;

    const initialFlipId = window.setTimeout(() => {
      showNextPortrait();
      setHasCompletedInitialFlip(true);
    }, HERO_INITIAL_FLIP_DELAY_MS);

    return () => window.clearTimeout(initialFlipId);
  }, [showNextPortrait]);

  useHeroAlignedLoop({
    firstDelayMs: HERO_FIRST_SYNCED_BEAT_MS,
    intervalMs: HERO_FLIP_INTERVAL_MS,
    isPaused: () => isPausedRef.current,
    onTick: showNextPortrait,
  });

  const pauseAutoFlip = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const resumeAutoFlip = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  const handlePointerEnter = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      pauseAutoFlip();
      if (event.pointerType === "mouse") {
        showNextPortrait();
      }
    },
    [pauseAutoFlip, showNextPortrait],
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (event.detail === 0) {
        showNextPortrait();
      }
    },
    [showNextPortrait],
  );

  return {
    portraitState,
    hasCompletedInitialFlip,
    frontPortrait: portraits[portraitState.frontIndex],
    backPortrait: portraits[portraitState.backIndex],
    currentLabel: portraits[portraitState.currentIndex].label,
    interactionHandlers: {
      onPointerEnter: handlePointerEnter,
      onPointerLeave: resumeAutoFlip,
      onFocus: pauseAutoFlip,
      onBlur: resumeAutoFlip,
      onClick: handleClick,
    },
  };
};
