import type { CSSProperties, ReactNode } from "react";
import { ENTER_FROM, HERO_MEDIA_DURATION, REVEAL_DURATION, type EnterFrom } from "./motion-variants";
import styles from "./reveal-enter.module.scss";

type RevealEnterElement = "div" | "aside";

interface RevealEnterProps {
  children: ReactNode;
  className?: string;
  direction?: EnterFrom;
  delay?: number;
  as?: RevealEnterElement;
  "aria-label"?: string;
  "data-announcement-bar"?: boolean;
}

/** Mount entrance in pure CSS (no JS, server-safe); reduced motion is handled in the module. */
export function RevealEnter({
  children,
  className,
  direction = "up",
  delay,
  as: Tag = "div",
  "aria-label": ariaLabel,
  "data-announcement-bar": dataAnnouncementBar,
}: RevealEnterProps) {
  const style = {
    "--reveal-from": ENTER_FROM[direction],
    "--reveal-duration": `${direction === "scale" ? HERO_MEDIA_DURATION : REVEAL_DURATION}s`,
    "--reveal-delay": `${delay ?? 0}s`,
  } as CSSProperties;

  return (
    <Tag
      className={className ? `${styles.enter} ${className}` : styles.enter}
      style={style}
      aria-label={ariaLabel}
      data-announcement-bar={dataAnnouncementBar ? true : undefined}
    >
      {children}
    </Tag>
  );
}
