"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToHash } from "@/shared/lib/scroll-to-hash";

// After the browser (direct entry) or Next (`Link` to another page) jumps to `#id`, one instant
// re-scroll corrects what they cannot see yet: sticky heights set in effects
// (`--header-sticky-height`, `--project-toc-height`), a late font swap, and the reveal
// `translateY` on the target. Runs on the next frame, after every mount effect.
export const HashScroll = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) return;
    let frame = 0;
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) frame = requestAnimationFrame(() => scrollToHash(undefined, "instant"));
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
};
