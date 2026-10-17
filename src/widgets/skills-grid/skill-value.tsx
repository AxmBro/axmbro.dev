"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useRevealInView } from "@/shared/ui/motion";
import type { SkillStrengthTier } from "./lib/get-skill-level";
import styles from "./skills-grid.module.scss";

const TIER_CLASS: Record<SkillStrengthTier, string> = {
  peak: styles.tierPeak,
  strong: styles.tierStrong,
  solid: styles.tierSolid,
  building: styles.tierBuilding,
};

interface SkillValueProps {
  label: string;
  tier: SkillStrengthTier;
}

export function SkillValue({ label, tier }: SkillValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRevealInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const hasStarted = useRef(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!inView || hasStarted.current || reduceMotion) return;

    hasStarted.current = true;
    const frame = requestAnimationFrame(() => setIsRevealing(true));
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion]);

  const showRevealed = reduceMotion || isRevealed;

  const handleAnimationEnd = () => {
    setIsRevealing(false);
    setIsRevealed(true);
  };

  return (
    <span
      ref={ref}
      className={[
        styles.skillValue,
        TIER_CLASS[tier],
        isRevealing ? styles.skillValueReveal : "",
        showRevealed ? styles.skillValueRevealed : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onAnimationEnd={handleAnimationEnd}
    >
      {label}
    </span>
  );
}
