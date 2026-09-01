"use client";

import { useEffect, useState, type AnimationEvent } from "react";
import { isReducedMotion } from "@/shared/lib/motion";

export const ANIMATED_STAT_DURATION_MS = 1600;
export const STAT_COLOR_REVEAL_MS = 1100;

interface AnimatedStatProps {
  value: string;
  className?: string;
  replayKey?: number;
  startWhen?: boolean;
  onAnimationEnd?: (event: AnimationEvent<HTMLSpanElement>) => void;
}

export function AnimatedStat({
  value,
  className,
  replayKey = 0,
  startWhen = true,
  onAnimationEnd,
}: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!startWhen) return;

    const match = value.match(/^([\d.]+)(.*)$/);

    if (!match || isReducedMotion()) {
      const animationId = window.requestAnimationFrame(() => setDisplayValue(value));
      return () => window.cancelAnimationFrame(animationId);
    }

    const targetNumber = Number.parseFloat(match[1]);
    const suffix = match[2];
    const isFloat = match[1].includes(".");
    const duration = ANIMATED_STAT_DURATION_MS;
    let startTimestamp: number | null = null;
    let animationId = 0;

    const step = (timestamp: number) => {
      startTimestamp ??= timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
      const currentNumber = targetNumber * easedProgress;

      setDisplayValue(
        `${isFloat ? currentNumber.toFixed(1) : Math.round(currentNumber)}${suffix}`,
      );

      if (progress < 1) {
        animationId = window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationId);
  }, [replayKey, startWhen, value]);

  return (
    <span className={className} onAnimationEnd={onAnimationEnd}>
      {startWhen ? displayValue : "0"}
    </span>
  );
}
