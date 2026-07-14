"use client";

import { useEffect, useState } from "react";

interface AnimatedStatProps {
  value: string;
  className?: string;
  replayKey?: number;
}

export function AnimatedStat({ value, className, replayKey = 0 }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const match = value.match(/^([\d.]+)(.*)$/);

    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const animationId = window.requestAnimationFrame(() => setDisplayValue(value));
      return () => window.cancelAnimationFrame(animationId);
    }

    const targetNumber = Number.parseFloat(match[1]);
    const suffix = match[2];
    const isFloat = match[1].includes(".");
    const duration = 1600;
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
  }, [replayKey, value]);

  return <span className={className}>{displayValue}</span>;
}
