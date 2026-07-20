"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./screen-container.module.scss";

interface ScreenContentProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function ScreenContent({ children, style }: ScreenContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const update = () => {
      const items = [
        ...root.querySelectorAll<HTMLElement>("[data-section-eyebrow]"),
      ];
      const pad = Math.max(2, String(items.length || 1).length);
      items.forEach((el, i) => {
        const num = el.querySelector("[data-section-num]");
        if (!num) return;
        const next = String(i + 1).padStart(pad, "0");
        if (num.textContent !== next) {
          num.textContent = next;
        }
      });
    };

    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={styles.screenContent} style={style}>
      {children}
    </div>
  );
}
