"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./grid-backdrop.module.scss";

const TARGET_CELL_PX = 32;

const cellsFor = (span: number) => Math.max(1, Math.round(span / TARGET_CELL_PX));

interface GridBackdropProps {
  variant?: "page" | "footer";
}

export function GridBackdrop({ variant = "page" }: GridBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const backdrop = ref.current;
    const parent = backdrop?.parentElement;
    if (!backdrop || !parent) return;

    const column = parent.querySelector<HTMLElement>(
      variant === "footer" ? "[data-grid-column]" : "section",
    );
    if (!column) return;

    const update = () => {
      const origin = backdrop.getBoundingClientRect();
      const bounds = column.getBoundingClientRect();
      const spanX = bounds.width - 1;
      const spanY =
        variant === "footer" ? bounds.height : bounds.top - origin.top;
      if (spanX <= 0 || spanY <= 0) return;

      const cellX = spanX / cellsFor(spanX);
      const cellY = variant === "footer" ? cellX : spanY / cellsFor(spanY);
      const offsetX = bounds.left - origin.left;

      backdrop.style.setProperty("--grid-cell-x", `${cellX}px`);
      backdrop.style.setProperty("--grid-cell-y", `${cellY}px`);
      backdrop.style.setProperty("--grid-offset-x", `${offsetX}px`);
      backdrop.style.setProperty("--grid-band", `${bounds.bottom - origin.top}px`);

      parent.style.setProperty("--grid-cell-x", `${cellX}px`);
      parent.style.setProperty("--grid-cell-y", `${cellY}px`);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(column);
    observer.observe(parent);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [variant, pathname]);

  return (
    <div
      ref={ref}
      className={`${styles.backdrop} ${variant === "footer" ? styles.footerBand : ""}`}
      data-footer-grid-backdrop={variant === "footer" ? "" : undefined}
      aria-hidden
    />
  );
}
