"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import {
  dispatchPixelWaveSpawn,
  HERO_MONOCHROME_WAVE,
} from "@/shared/lib/pixel-wave";

export const HeroWaveTimer = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== ROUTES.home) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(() => {
      dispatchPixelWaveSpawn({
        clipSelector: `#${SECTION_IDS.profile}`,
        palette: "monochrome",
        opacityScale: HERO_MONOCHROME_WAVE.opacityScale,
      });
    }, HERO_MONOCHROME_WAVE.intervalMs);

    return () => window.clearInterval(intervalId);
  }, [pathname]);

  return null;
};
