"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isReducedMotion } from "@/shared/lib/motion";
import {
  ACCENT_SURFACE_SELECTOR,
  FOOTER_SURFACE_SELECTOR,
  GRID_SURFACE_SECTION_SELECTOR,
  SURFACE_AMBIENT_IGNITE_INTERVAL_MS,
  SURFACE_IGNITE_ANIMATION_MS,
  getFooterGridBackdrop,
  triggerSurfaceIgnite,
} from "@/shared/lib/surface-ignite";

export function SurfaceIgniteObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (isReducedMotion()) return;

    const gridSections = new Set(
      document.querySelectorAll<HTMLElement>(GRID_SURFACE_SECTION_SELECTOR),
    );
    const accentSections = new Set(
      document.querySelectorAll<HTMLElement>(ACCENT_SURFACE_SELECTOR),
    );
    const footers = new Set(
      document.querySelectorAll<HTMLElement>(FOOTER_SURFACE_SELECTOR),
    );
    const observed = new Set<HTMLElement>([
      ...gridSections,
      ...accentSections,
      ...footers,
    ]);

    const intersecting = new Set<HTMLElement>();
    const pointerInside = new Set<HTMLElement>();
    const gridIgnitedOnce = new Set<HTMLElement>();
    const igniteLockedUntil = new Map<HTMLElement, number>();

    const isIgniteLocked = (target: HTMLElement) =>
      (igniteLockedUntil.get(target) ?? 0) > Date.now();

    const lockIgnite = (target: HTMLElement) => {
      igniteLockedUntil.set(target, Date.now() + SURFACE_IGNITE_ANIMATION_MS);
    };

    const canManualAccentIgnite = (target: HTMLElement) =>
      !isIgniteLocked(target);

    const canAmbientAccentIgnite = (target: HTMLElement) =>
      !pointerInside.has(target) && !isIgniteLocked(target);

    const igniteGridSection = (section: HTMLElement) => {
      if (!gridSections.has(section) || gridIgnitedOnce.has(section)) {
        return;
      }

      triggerSurfaceIgnite(section, "grid");
      gridIgnitedOnce.add(section);
    };

    const igniteAccentSection = (
      section: HTMLElement,
      mode: "manual" | "ambient" = "manual",
    ) => {
      if (!accentSections.has(section)) return;

      const allowed =
        mode === "ambient"
          ? canAmbientAccentIgnite(section)
          : canManualAccentIgnite(section);
      if (!allowed) return;

      triggerSurfaceIgnite(section, "accent");
      lockIgnite(section);
    };

    const igniteFooterGrid = (footer: HTMLElement) => {
      if (gridIgnitedOnce.has(footer)) return;

      const backdrop = getFooterGridBackdrop(footer);
      if (!backdrop) return;

      triggerSurfaceIgnite(backdrop, "grid");
      gridIgnitedOnce.add(footer);
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (!(event.currentTarget instanceof HTMLElement)) return;

      const target = event.currentTarget;
      pointerInside.add(target);

      if (footers.has(target)) {
        igniteFooterGrid(target);
        return;
      }

      igniteGridSection(target);
      igniteAccentSection(target);
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (!(event.currentTarget instanceof HTMLElement)) return;

      pointerInside.delete(event.currentTarget);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            intersecting.add(target);
            igniteAccentSection(target);
            return;
          }

          intersecting.delete(target);
        });
      },
      { threshold: 0.12 },
    );

    const ambientTick = () => {
      accentSections.forEach((section) => {
        if (!intersecting.has(section)) return;
        igniteAccentSection(section, "ambient");
      });
    };

    const ambientIntervalId = window.setInterval(
      ambientTick,
      SURFACE_AMBIENT_IGNITE_INTERVAL_MS,
    );

    const cleanups: Array<() => void> = [];

    observed.forEach((target) => {
      observer.observe(target);
      target.addEventListener("pointerenter", onPointerEnter);
      target.addEventListener("pointerleave", onPointerLeave);
      cleanups.push(() => {
        observer.unobserve(target);
        target.removeEventListener("pointerenter", onPointerEnter);
        target.removeEventListener("pointerleave", onPointerLeave);
      });
    });

    return () => {
      window.clearInterval(ambientIntervalId);
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return null;
}
