"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  clearSiteGridCellSize,
  computeSquareCellSize,
  publishSiteGridCellSize,
  readPageColumnLeft,
  readSiteGridCellSize,
} from "@/shared/lib/grid-mesh";
import styles from "./grid-backdrop.module.scss";

interface GridBackdropProps {
  variant?: "page" | "footer";
}

function readPageColumnLeftFromDom(): number | null {
  return readPageColumnLeft();
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
      const originRect = backdrop.getBoundingClientRect();
      const columnRect = column.getBoundingClientRect();
      const spanX = columnRect.width - 1;
      if (spanX <= 0) return;

      const cellSize =
        variant === "footer"
          ? (readSiteGridCellSize() ?? computeSquareCellSize(spanX))
          : computeSquareCellSize(spanX);

      const pageColumnLeft = readPageColumnLeftFromDom();
      const meshLeft = pageColumnLeft ?? columnRect.left;
      const columnOffsetX = meshLeft - originRect.left;

      backdrop.style.setProperty("--grid-cell-x", `${cellSize}px`);
      backdrop.style.setProperty("--grid-cell-y", `${cellSize}px`);
      backdrop.style.setProperty("--grid-offset-x", `${columnOffsetX}px`);

      if (variant === "page") {
        const band = columnRect.bottom - originRect.top;
        if (band > 0) {
          backdrop.style.setProperty("--grid-band", `${band}px`);
        }

        publishSiteGridCellSize(cellSize);
        parent.style.setProperty("--grid-cell-x", `${cellSize}px`);
        parent.style.setProperty("--grid-cell-y", `${cellSize}px`);
        return;
      }

      parent.style.setProperty("--grid-cell-x", `${cellSize}px`);
      parent.style.setProperty("--grid-cell-y", `${cellSize}px`);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(column);
    observer.observe(parent);
    if (variant === "page") {
      parent.querySelectorAll("section").forEach((section) => observer.observe(section));
    }
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
      if (variant === "page") {
        clearSiteGridCellSize();
      }
    };
  }, [variant, pathname]);

  return (
    <div
      ref={ref}
      className={`${styles.backdrop} ${variant === "footer" ? styles.footerBand : ""}`}
      data-grid-backdrop=""
      data-footer-grid-backdrop={variant === "footer" ? "" : undefined}
      aria-hidden
    />
  );
}
