"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { isReducedMotion } from "@/shared/lib/motion";

type AlignedLoopOptions = {
  firstDelayMs: number;
  intervalMs: number;
  onTick: () => void;
  isPaused?: () => boolean;
  enabled?: boolean;
};

type AlignedLoopHandle = {
  stop: () => void;
};

const startAlignedLoop = ({
  firstDelayMs,
  intervalMs,
  onTick,
  isPaused = () => false,
}: Omit<AlignedLoopOptions, "enabled">): AlignedLoopHandle => {
  let timeoutId = 0;
  let stopped = false;

  const scheduleInterval = () => {
    timeoutId = window.setTimeout(runTick, intervalMs);
  };

  const runTick = () => {
    if (stopped) return;

    if (!isPaused()) {
      onTick();
    }

    scheduleInterval();
  };

  timeoutId = window.setTimeout(() => {
    if (stopped) return;

    if (!isPaused()) {
      onTick();
    }

    scheduleInterval();
  }, firstDelayMs);

  return {
    stop: () => {
      stopped = true;
      window.clearTimeout(timeoutId);
    },
  };
};

export const useHeroAlignedLoop = ({
  firstDelayMs,
  intervalMs,
  onTick,
  isPaused,
  enabled = true,
}: AlignedLoopOptions) => {
  const onTickRef = useRef(onTick);
  const isPausedRef = useRef(isPaused);

  useLayoutEffect(() => {
    onTickRef.current = onTick;
    isPausedRef.current = isPaused;
  });

  useEffect(() => {
    if (!enabled || isReducedMotion()) return;

    const loop = startAlignedLoop({
      firstDelayMs,
      intervalMs,
      onTick: () => onTickRef.current(),
      isPaused: () => isPausedRef.current?.() ?? false,
    });

    return () => loop.stop();
  }, [enabled, firstDelayMs, intervalMs]);
};
