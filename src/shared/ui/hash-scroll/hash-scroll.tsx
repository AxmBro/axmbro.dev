"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  FAQ_HASH_SCROLL_DELAY_MS,
  notifyPageHashChange,
  parseHashId,
  repairBrokenHash,
  scrollToHash,
} from "@/shared/lib/scroll-to-hash";
import { clearPendingHash, restorePendingHash } from "@/shared/lib/pending-hash";

const scrollFromTop = () => {
  if (!window.location.hash) return;

  const id = parseHashId(window.location.hash);
  const isFaqHash = id.startsWith("faq-");

  if (!isFaqHash) {
    window.scrollTo(0, 0);
  }

  const runScroll = () => scrollToHash(undefined, "smooth");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (isFaqHash) {
        window.setTimeout(runScroll, FAQ_HASH_SCROLL_DELAY_MS);
        return;
      }

      runScroll();
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
      notifyPageHashChange();
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
      notifyPageHashChange();
      scrollFromTop();
      return;
    }

    clearPendingHash();
  }, [pathname]);

  return null;
};
