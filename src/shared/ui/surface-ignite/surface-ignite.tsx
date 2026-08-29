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
    const igniteLockedUntil = new Map<HTMLElement, number>();

    const isIgniteLocked = (target: HTMLElement) =>
      (igniteLockedUntil.get(target) ?? 0) > Date.now();

    const lockIgnite = (target: HTMLElement) => {
      igniteLockedUntil.set(target, Date.now() + SURFACE_IGNITE_ANIMATION_MS);
    };

    const canManualIgnite = (target: HTMLElement) => !isIgniteLocked(target);

    const canAmbientIgnite = (target: HTMLElement) =>
      !pointerInside.has(target) && !isIgniteLocked(target);

    const isTopGridSection = (section: HTMLElement) =>
      section.dataset.grid === "top";

    const igniteSectionSurfaces = (
      section: HTMLElement,
      mode: "manual" | "ambient" = "manual",
    ) => {
      const allowed =
        mode === "ambient" ? canAmbientIgnite(section) : canManualIgnite(section);
      if (!allowed) return;

      let ignited = false;

      if (
        gridSections.has(section) &&
        !(mode === "ambient" && isTopGridSection(section))
      ) {
        triggerSurfaceIgnite(section, "grid");
        ignited = true;
      }
      if (accentSections.has(section)) {
        triggerSurfaceIgnite(section, "accent");
        ignited = true;
      }

      if (ignited) {
        lockIgnite(section);
      }
    };

    const igniteFooterGrid = (
      footer: HTMLElement,
      mode: "manual" | "ambient" = "manual",
    ) => {
      const allowed =
        mode === "ambient" ? canAmbientIgnite(footer) : canManualIgnite(footer);
      if (!allowed) return;

      const backdrop = getFooterGridBackdrop(footer);
      if (!backdrop) return;

      triggerSurfaceIgnite(backdrop, "grid");
      lockIgnite(footer);
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (!(event.currentTarget instanceof HTMLElement)) return;

      const target = event.currentTarget;
      pointerInside.add(target);

      if (footers.has(target)) {
        igniteFooterGrid(target);
        return;
      }

      igniteSectionSurfaces(target);
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        pointerInside.delete(event.currentTarget);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            intersecting.add(target);

            if (footers.has(target)) {
              igniteFooterGrid(target);
              return;
            }

            igniteSectionSurfaces(target);
            return;
          }

          intersecting.delete(target);
        });
      },
      { threshold: 0.12 },
    );

    const ambientTick = () => {
      const ambientSections = new Set([...gridSections, ...accentSections]);

      ambientSections.forEach((section) => {
        if (!intersecting.has(section)) return;
        igniteSectionSurfaces(section, "ambient");
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
