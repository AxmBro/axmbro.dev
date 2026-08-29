export const GRID_SURFACE_SECTION_SELECTOR = "[data-grid-surface]";

export const ACCENT_SURFACE_SELECTOR = "[data-accent-surface]";

export const FOOTER_SURFACE_SELECTOR = "[data-site-footer]";

export const FOOTER_GRID_BACKDROP_SELECTOR = "[data-footer-grid-backdrop]";

export const SURFACE_IGNITE_ANIMATION_MS = 1100;

export const SURFACE_AMBIENT_IGNITE_INTERVAL_MS = 15_000;

export type SurfaceIgniteKind = "grid" | "accent";

export function triggerSurfaceIgnite(
  element: HTMLElement,
  kind: SurfaceIgniteKind,
) {
  const key = kind === "grid" ? "gridIgnite" : "accentIgnite";
  delete element.dataset[key];
  void element.offsetWidth;
  element.dataset[key] = "";
}

export function getFooterGridBackdrop(
  footer: HTMLElement,
): HTMLElement | null {
  return footer.querySelector<HTMLElement>(FOOTER_GRID_BACKDROP_SELECTOR);
}
