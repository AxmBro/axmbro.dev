"use client";

import type { UseRailPulseFlashOptions } from "./use-rail-pulse-flash";
import { useRailPulseFlash } from "./use-rail-pulse-flash";
import styles from "./rail-pulse-dot.module.scss";

export type RailPulseDotVariant = "default" | "accent";
export type RailPulseDotSize = "default" | "large";

interface RailPulseDotProps extends UseRailPulseFlashOptions {
  className?: string;
  variant?: RailPulseDotVariant;
  size?: RailPulseDotSize;
}

export function RailPulseDot({
  className,
  variant = "default",
  size = "default",
  ...options
}: RailPulseDotProps) {
  const { dotRef, pulseRef } = useRailPulseFlash(options);

  return (
    <span
      ref={dotRef}
      className={`${styles.dot} ${className ?? ""}`}
      data-variant={variant}
      data-size={size}
      aria-hidden
    >
      <span ref={pulseRef} className={styles.pulse} aria-hidden />
    </span>
  );
}
