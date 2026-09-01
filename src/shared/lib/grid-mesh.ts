export const GRID_TARGET_CELL_PX = 32;

export const SITE_GRID_CELL_SIZE_VAR = "--site-grid-cell-size";

/** Square cell count from a span (used for column width). */
export function cellsFor(span: number): number {
  return Math.max(1, Math.round(span / GRID_TARGET_CELL_PX));
}

export function computeSquareCellSize(spanX: number): number {
  return spanX / cellsFor(spanX);
}

export function readSiteGridCellSize(): number | null {
  const raw = document.documentElement.style.getPropertyValue(SITE_GRID_CELL_SIZE_VAR).trim();
  if (!raw) return null;
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) && value > 0 ? value : null;
}

export function publishSiteGridCellSize(cellSize: number): void {
  document.documentElement.style.setProperty(SITE_GRID_CELL_SIZE_VAR, `${cellSize}px`);
}

export function clearSiteGridCellSize(): void {
  document.documentElement.style.removeProperty(SITE_GRID_CELL_SIZE_VAR);
}

export function readPageColumnLeft(): number | null {
  const column = document.querySelector<HTMLElement>("[data-screen-container] section");
  if (!column) return null;
  return column.getBoundingClientRect().left;
}
