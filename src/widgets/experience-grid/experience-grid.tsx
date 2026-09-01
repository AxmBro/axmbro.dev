"use client";

import { useRef } from "react";
import { EXPERIENCE_TREE } from "@/shared/constants/data";
import { RailPulseDot } from "@/shared/ui/rail-pulse-dot";
import styles from "./experience-grid.module.scss";

interface ExperienceGridItemProps {
  exp: (typeof EXPERIENCE_TREE)[number];
  isFirst: boolean;
}

function ExperienceGridItem({ exp, isFirst }: ExperienceGridItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={itemRef} className={styles.expVerticalItem}>
      <RailPulseDot
        className={`${styles.expRailDot} ${isFirst ? styles.expRailDotFirst : ""}`}
        variant={isFirst ? "accent" : "default"}
        size={isFirst ? "large" : "default"}
        inViewRef={itemRef}
        hoverTargetRef={itemRef}
        pulseOnMount={isFirst}
        pulseIntervalMs={isFirst ? 3000 : undefined}
      />
      <div className={styles.expHeader}>
        <div className={styles.expHeaderMain}>
          <h3 className={styles.expRole}>{exp.role}</h3>
          <span className={styles.expCompany}>{exp.company}</span>
        </div>
        <span className={styles.expDate}>{exp.date}</span>
      </div>
      <div className={styles.expTextContent}>
        <ul className={styles.expListMinimal}>
          {exp.items.map((item, i) => (
            <li key={i}>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ExperienceGrid() {
  return (
    <div className={styles.experienceVerticalGrid}>
      {EXPERIENCE_TREE.map((exp, index) => (
        <ExperienceGridItem
          key={`${exp.role}-${exp.company}`}
          exp={exp}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}
