"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { repairBrokenHash, scrollToHash } from "@/shared/lib/scroll-to-hash";
import { clearPendingHash, restorePendingHash } from "@/shared/lib/pending-hash";

const scrollFromTop = () => {
  if (!window.location.hash) return;

  window.scrollTo(0, 0);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToHash(undefined, "smooth");
    });
  });
};

export const HashScroll = () => {
  const pathname = usePathname();
  const skipInitialPathname = useRef(true);

  useEffect(() => {
    history.scrollRestoration = "manual";

    const onHashChange = () => scrollToHash(undefined, "smooth");
    window.addEventListener("hashchange", onHashChange);

    repairBrokenHash();
    const hadPendingHash = restorePendingHash();
    if (hadPendingHash || window.location.hash) {
      scrollFromTop();
    } else {
      clearPendingHash();
    }

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (skipInitialPathname.current) {
      skipInitialPathname.current = false;
      return;
    }

    const hadPendingHash = restorePendingHash();
    if (hadPendingHash || window.location.hash) {
      scrollFromTop();
      return;
    }

    clearPendingHash();
  }, [pathname]);

  return null;
};
