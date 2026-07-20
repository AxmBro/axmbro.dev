"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

export function SectionIndexRoot({ children }: { children: ReactNode }) {
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
    <div ref={rootRef} data-section-index-root>
      {children}
    </div>
  );
}
