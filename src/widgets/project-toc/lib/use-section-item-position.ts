"use client";

import { useEffect, useState } from "react";
import { resolveCssLengthPx } from "@/shared/lib/sticky-scroll-offset";

/** Same spy line as the TOC itself: below the sticky header and the TOC. */
function readSpyOffset(): number {
  return (
    resolveCssLengthPx("--sticky-below-header") +
    resolveCssLengthPx("--project-toc-height")
  );
}

/**
 * Position inside a long showcase section, for the "6/24" counter in the
 * sticky bar. Counts images (not headings) so the number flips when a
 * screenshot reaches the sticky chrome, which is where the eye is.
 *
 * Returns 0 when the section is not the active one, or has nothing to count.
 */
export function useSectionItemPosition(
  sectionId: string | null,
  itemCount: number,
): number {
  const [measured, setMeasured] = useState<{ id: string; position: number }>({
    id: "",
    position: 0,
  });

  useEffect(() => {
    if (!sectionId || itemCount < 2) return;

    const syncActive = () => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const offset = readSpyOffset();
      const items = section.querySelectorAll<HTMLElement>(
        "[data-image-section-item]",
      );
      let current = 1;

      items.forEach((el, index) => {
        if (index >= itemCount) return;
        if (el.getBoundingClientRect().top <= offset) current = index + 1;
      });

      setMeasured((prev) =>
        prev.id === sectionId && prev.position === current
          ? prev
          : { id: sectionId, position: current },
      );
    };

    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [itemCount, sectionId]);

  // Derived: a stale measurement from the previously active tab is not shown.
  if (!sectionId || itemCount < 2) return 0;
  return measured.id === sectionId ? measured.position : 0;
}
