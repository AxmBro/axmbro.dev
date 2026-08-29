"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { SKILLS_CARDS } from "@/shared/constants/data";
import { useRevealInView } from "@/shared/ui/motion";
import { getSkillLevel, type SkillStrengthTier } from "./lib/get-skill-level";
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

function SkillValue({ label, tier }: SkillValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRevealInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const hasStarted = useRef(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!inView || hasStarted.current || reduceMotion) return;

    hasStarted.current = true;
    requestAnimationFrame(() => setIsRevealing(true));
  }, [inView, reduceMotion]);

  const showRevealed = reduceMotion === true || isRevealed;

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

export const SkillsGrid = () => {
  return (
    <div className={styles.skillsGridConnected}>
      {SKILLS_CARDS.map((group) => (
        <div
          key={group.titleNote ? `${group.title}-${group.titleNote}` : group.title}
          className={styles.skillGroupItem}
        >
          <div className={styles.skillHeader}>
            <div className={styles.skillHeaderMain}>
              <h3 className={styles.skillTitle}>{group.title}</h3>
              {group.titleNote ? (
                <span className={styles.skillTitleNote}>
                  ({group.titleNote})
                </span>
              ) : null}
            </div>
          </div>
          <div className={styles.skillTextContent}>
            <ul className={styles.skillListMinimal}>
              {group.items.map((item) => {
                const { tier, label } = getSkillLevel(item.value);

                return (
                  <li key={item.name}>
                    <span>
                      {item.name}: <SkillValue label={label} tier={tier} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
