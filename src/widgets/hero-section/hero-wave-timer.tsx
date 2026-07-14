"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { dispatchPixelWaveSpawn } from "@/shared/lib/pixel-wave";
import {
  HERO_FIRST_SYNCED_BEAT_MS,
  HERO_MONOCHROME_WAVE,
} from "./hero-motion";
import { useHeroAlignedLoop } from "./use-hero-aligned-loop";

export const HeroWaveTimer = () => {
  const pathname = usePathname();
  const isHome = pathname === ROUTES.home;

  const spawnMonochromeWave = useCallback(() => {
    dispatchPixelWaveSpawn({
      clipSelector: `#${SECTION_IDS.profile}`,
      palette: "monochrome",
      opacityScale: HERO_MONOCHROME_WAVE.opacityScale,
    });
  }, []);

  useHeroAlignedLoop({
    enabled: isHome,
    firstDelayMs: HERO_FIRST_SYNCED_BEAT_MS,
    intervalMs: HERO_MONOCHROME_WAVE.intervalMs,
    onTick: spawnMonochromeWave,
  });

  return null;
};
