"use client";

import type { UseRailPulseFlashOptions } from "./use-rail-pulse-flash";
import { useRailPulseFlash } from "./use-rail-pulse-flash";
import styles from "./rail-pulse-dot.module.scss";

interface RailPulseDotProps extends UseRailPulseFlashOptions {
  className?: string;
}

export function RailPulseDot({ className, ...options }: RailPulseDotProps) {
  const { dotRef, pulseRef } = useRailPulseFlash(options);

  return (
    <span ref={dotRef} className={`${styles.dot} ${className ?? ""}`} aria-hidden>
      <span ref={pulseRef} className={styles.pulse} aria-hidden />
    </span>
  );
}
