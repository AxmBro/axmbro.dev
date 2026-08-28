import { useEffect, type RefObject } from "react";

export const useStickyHeaderHeight = (
  barRef: RefObject<HTMLDivElement | null>,
  isResponsive: boolean,
) => {
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const syncHeight = () => {
      document.documentElement.style.setProperty(
        "--header-sticky-height",
        `${bar.offsetHeight + 1}px`,
      );
    };

    syncHeight();
    const resizeObserver = new ResizeObserver(syncHeight);
    resizeObserver.observe(bar);

    return () => {
      resizeObserver.disconnect();
      document.documentElement.style.removeProperty("--header-sticky-height");
    };
  }, [barRef, isResponsive]);
};
