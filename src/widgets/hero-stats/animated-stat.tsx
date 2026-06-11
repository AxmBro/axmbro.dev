"use client";

import { useEffect, useState } from "react";

interface AnimatedStatProps {
  value: string;
  className?: string;
}

export function AnimatedStat({ value, className }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const suffix = match[2];
    const isFloat = match[1].includes(".");

    let startTimestamp: number | null = null;
    const duration = 1600;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentNum = targetNum * easeOutExpo;
      
      if (isFloat) {
        setDisplayValue(currentNum.toFixed(1) + suffix);
      } else {
        setDisplayValue(Math.round(currentNum).toString() + suffix);
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    const animationId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [value]);

  return <span className={className}>{displayValue}</span>;
}
