"use client";

import { useLayoutEffect, useRef } from "react";
import {
  computeSquareCellSize,
  readPageColumnLeft,
  readSiteGridCellSize,
} from "@/shared/lib/grid-mesh";
import styles from "./section-full-width-grid.module.scss";

function readColumnSpanX(): number {
  const column = document.querySelector<HTMLElement>("[data-screen-container] section");
  if (!column) return 0;
  return column.getBoundingClientRect().width - 1;
}

export function SectionFullWidthGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = ref.current;
    const section = grid?.parentElement;
    if (!grid || !section) return;

    const update = () => {
      const sectionRect = section.getBoundingClientRect();
      const viewportWidth = document.documentElement.clientWidth;
      const spanX = readColumnSpanX();
      const cellSize =
        readSiteGridCellSize() ?? (spanX > 0 ? computeSquareCellSize(spanX) : 32);
      const columnLeft = readPageColumnLeft() ?? sectionRect.left;

      grid.style.width = `${viewportWidth}px`;
      grid.style.left = `${(sectionRect.width - viewportWidth) / 2}px`;
      grid.style.setProperty("--grid-cell-x", `${cellSize}px`);
      grid.style.setProperty("--grid-cell-y", `${cellSize}px`);

      const nextGridRect = grid.getBoundingClientRect();
      grid.style.setProperty("--grid-offset-x", `${columnLeft - nextGridRect.left}px`);

      const backdrop = document.querySelector<HTMLElement>("[data-grid-backdrop]");
      const backdropRect = backdrop?.getBoundingClientRect();
      if (backdropRect) {
        const phaseY =
          (((nextGridRect.top - backdropRect.top) % cellSize) + cellSize) % cellSize;
        grid.style.setProperty("--grid-offset-y", `${-phaseY}px`);
      }
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(section);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className={styles.fullWidthGrid} data-grid-surface="" aria-hidden />
  );
}
