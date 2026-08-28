"use client";

import { HOME_ANNOUNCEMENT } from "@/shared/constants/data";
import { RevealEnter } from "@/shared/ui/motion";
import styles from "./announcement-bar.module.scss";

export const AnnouncementBar = () => (
  <RevealEnter
    as="aside"
    className={styles.bar}
    direction="top"
    aria-label="Availability"
    data-announcement-bar
  >
    <div className={styles.inner}>
      <p className={styles.message}>
        <span className={styles.label}>{HOME_ANNOUNCEMENT.label}</span>
        <span className={styles.text}>{HOME_ANNOUNCEMENT.text}</span>
      </p>
    </div>
  </RevealEnter>
);
