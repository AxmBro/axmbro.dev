"use client";

import { useRef } from "react";
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
  // Edge replay (`0px`): the value only resets to white once fully off screen,
  // so every new view replays the color fade without a visible snap.
  const inView = useRevealInView(ref, { once: false, margin: "0px" });
  const reduceMotion = useReducedMotion();

  // The fade class lives while in view (`forwards` holds the tier color);
  // re-adding it restarts the keyframes.
  const stateClass = reduceMotion
    ? styles.skillValueRevealed
    : inView
      ? styles.skillValueReveal
      : "";

  return (
    <span
      ref={ref}
      className={[styles.skillValue, TIER_CLASS[tier], stateClass].filter(Boolean).join(" ")}
    >
      {label}
    </span>
  );
}
