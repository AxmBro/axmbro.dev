"use client";

import type { ReactNode } from "react";
import styles from "./screen-section.module.scss";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className={styles.eyebrow} data-section-eyebrow>
      <span data-section-num aria-hidden>
        00
      </span>
      <span aria-hidden> · </span>
      <span>{children}</span>
    </p>
  );
}
