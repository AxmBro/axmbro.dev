"use client";

import { useRef } from "react";
import Link from "next/link";
import { HOME_ANNOUNCEMENT } from "@/shared/constants/data";
import { RevealEnter } from "@/shared/ui/motion";
import { RailPulseDot } from "@/shared/ui/rail-pulse-dot";
import styles from "./announcement-bar.module.scss";

export const AnnouncementBar = () => {
  const innerRef = useRef<HTMLDivElement>(null);

  return (
    <RevealEnter
      as="aside"
      className={styles.bar}
      direction="top"
      aria-label="Availability"
      data-announcement-bar
    >
      <div ref={innerRef} className={styles.inner}>
        <RailPulseDot
          className={styles.leadDot}
          variant="accent"
          inViewRef={innerRef}
          hoverTargetRef={innerRef}
          pulseOnMount
          pulseIntervalMs={3000}
        />
        <p className={styles.message}>
          <span className={styles.title}>{HOME_ANNOUNCEMENT.title}</span>
          <span className={styles.sep} aria-hidden>
            ·
          </span>
          <span className={styles.text}>
            {HOME_ANNOUNCEMENT.text}
            <span className={styles.sep} aria-hidden>
              ·
            </span>
            <Link href={HOME_ANNOUNCEMENT.contactHref} className={styles.link}>
              {HOME_ANNOUNCEMENT.contactLabel}
            </Link>
          </span>
        </p>
      </div>
    </RevealEnter>
  );
};
