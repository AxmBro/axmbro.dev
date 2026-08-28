"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { isReducedMotion } from "@/shared/lib/motion";
import {
  HERO_FIRST_SYNCED_BEAT_MS,
  HERO_FLIP_INTERVAL_MS,
  HERO_INITIAL_FLIP_DELAY_MS,
} from "./hero-motion";
import {
  startAlignedLoop,
  useHeroAlignedLoop,
  type AlignedLoopHandle,
} from "./use-hero-aligned-loop";

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

type ControlMode = "synced" | "manual";

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
  const [controlMode, setControlMode] = useState<ControlMode>("synced");
  const controlModeRef = useRef<ControlMode>("synced");
  const syncedPausedRef = useRef(false);
  const manualPausedRef = useRef(false);
  const manualLoopRef = useRef<AlignedLoopHandle | null>(null);

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

  const stopManualLoop = useCallback(() => {
    manualLoopRef.current?.stop();
    manualLoopRef.current = null;
  }, []);

  const startManualLoop = useCallback(() => {
    if (isReducedMotion()) return;

    stopManualLoop();
    manualLoopRef.current = startAlignedLoop({
      firstDelayMs: HERO_FLIP_INTERVAL_MS,
      intervalMs: HERO_FLIP_INTERVAL_MS,
      onTick: showNextPortrait,
      isPaused: () => manualPausedRef.current,
    });
  }, [showNextPortrait, stopManualLoop]);

  const handleManualFlip = useCallback(() => {
    showNextPortrait();
    controlModeRef.current = "manual";
    setControlMode("manual");
    startManualLoop();
  }, [showNextPortrait, startManualLoop]);

  useEffect(() => {
    if (isReducedMotion()) return;

    const initialFlipId = window.setTimeout(() => {
      showNextPortrait();
      setHasCompletedInitialFlip(true);
    }, HERO_INITIAL_FLIP_DELAY_MS);

    return () => window.clearTimeout(initialFlipId);
  }, [showNextPortrait]);

  useEffect(() => () => stopManualLoop(), [stopManualLoop]);

  useHeroAlignedLoop({
    enabled: controlMode === "synced",
    firstDelayMs: HERO_FIRST_SYNCED_BEAT_MS,
    intervalMs: HERO_FLIP_INTERVAL_MS,
    isPaused: () =>
      controlModeRef.current === "manual" || syncedPausedRef.current,
    onTick: showNextPortrait,
  });

  const handlePointerEnter = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === "mouse") {
        handleManualFlip();
      }
    },
    [handleManualFlip],
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (event.detail === 0) {
        handleManualFlip();
      }
    },
    [handleManualFlip],
  );

  const handleFocus = useCallback(() => {
    if (controlModeRef.current === "manual") {
      manualPausedRef.current = true;
      return;
    }

    syncedPausedRef.current = true;
  }, []);

  const handleBlur = useCallback(() => {
    manualPausedRef.current = false;
    syncedPausedRef.current = false;
  }, []);

  return {
    portraitState,
    hasCompletedInitialFlip,
    frontPortrait: portraits[portraitState.frontIndex],
    backPortrait: portraits[portraitState.backIndex],
    currentLabel: portraits[portraitState.currentIndex].label,
    interactionHandlers: {
      onPointerEnter: handlePointerEnter,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onClick: handleClick,
    },
  };
};
