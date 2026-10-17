"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { SECTION_IDS } from "@/shared/constants/anchors";
import {
  PIXEL_WAVE_SPAWN_EVENT,
  dispatchPixelWaveSpawn,
  type PixelWavePalette,
  type PixelWaveSpawnDetail,
} from "@/shared/lib/pixel-wave";
import { ROUTES } from "@/shared/constants/routes";
import { COLOR_ACCENT_SECONDARY } from "@/shared/constants/brand-colors";
import { isReducedMotion } from "@/shared/lib/motion";
import styles from "./pixel-click-wave.module.scss";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "option",
  "label",
  "summary",
  "[role='button']",
  "[role='link']",
  "[contenteditable='true']",
  "[data-pixel-wave-ignore]",
].join(",");

const CONTENT_SURFACE_SELECTOR = [
  "header",
  "footer",
  "section",
  "article",
  "nav",
  "form",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "figure",
  "img",
  "video",
  "pre",
  "code",
].join(",");
const GRID_SIZE = 12;
const PIXEL_SIZE = 10;
const IMPACT_DURATION_MS = 180;
const WAVE_DELAY_MS = 40;
const WAVE_SPEED_PX_PER_MS = 0.72;
const CELL_GLOW_DURATION_MS = 600;
const CLICK_COOLDOWN_MS = 1250;
const MAX_ACTIVE_WAVES = 3;
const SECTION_CLIP_INSET_PX = 1;
const HIGHLIGHT_SIZE = 3;

interface ViewportState {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

const getViewportState = (): ViewportState => {
  const viewport = window.visualViewport;

  if (!viewport) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      offsetX: 0,
      offsetY: 0,
    };
  }

  return {
    width: viewport.width,
    height: viewport.height,
    offsetX: viewport.offsetLeft,
    offsetY: viewport.offsetTop,
  };
};

interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

interface PixelWaveClip {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface PixelWave {
  x: number;
  y: number;
  startedAt: number;
  maxRadius: number;
  travelDurationMs: number;
  seed: number;
  clip?: PixelWaveClip;
  gridClip?: PixelWaveClip;
  clipElement?: HTMLElement;
  palette?: PixelWavePalette;
  opacityScale?: number;
}

const BLUE: RgbColor = { red: 0, green: 169, blue: 244 };
const WHITE: RgbColor = { red: 247, green: 247, blue: 247 };

const MONO_SILVER: RgbColor = { red: 168, green: 172, blue: 182 };
const MONO_PEAK: RgbColor = { red: 236, green: 238, blue: 242 };
const MONO_ALPHA = 0.75;

const mixColor = (start: RgbColor, end: RgbColor, amount: number): RgbColor => ({
  red: Math.round(start.red + (end.red - start.red) * amount),
  green: Math.round(start.green + (end.green - start.green) * amount),
  blue: Math.round(start.blue + (end.blue - start.blue) * amount),
});

const colorToCss = ({ red, green, blue }: RgbColor) =>
  `rgb(${red} ${green} ${blue})`;

const HIGHLIGHT_COLOR = colorToCss(WHITE);

// Mix and heat snap to COLOR_STEPS levels (invisible at ripple alphas), so a frame
// reuses a few dozen cached fillStyle strings instead of building and parsing one
// per cell - that parse was ~75% of a full-screen wave frame.
const COLOR_STEPS = 32;
const rippleColorCache = new Map<number, string>();

const getRippleColor = (
  colorMix: number,
  whiteHeat: number,
  palette: PixelWavePalette = "default",
) => {
  const mixStep = Math.round(colorMix * COLOR_STEPS);
  const heatStep = Math.round(whiteHeat * COLOR_STEPS);
  const paletteIndex = palette === "monochrome" ? 1 : 0;
  const key = (paletteIndex * (COLOR_STEPS + 1) + mixStep) * (COLOR_STEPS + 1) + heatStep;
  const cached = rippleColorCache.get(key);
  if (cached) return cached;

  const mix = mixStep / COLOR_STEPS;
  const heat = heatStep / COLOR_STEPS;
  const color =
    palette === "monochrome"
      ? colorToCss(mixColor(mixColor(MONO_SILVER, MONO_PEAK, mix), WHITE, heat * 0.92))
      : colorToCss(mixColor(mixColor(BLUE, COLOR_ACCENT_SECONDARY, mix), WHITE, heat));
  rippleColorCache.set(key, color);
  return color;
};

/** Cells grouped by fillStyle: `x, y, width, height, alpha` per cell. */
type CellBatch = Map<string, number[]>;

const queueCell = (
  batch: CellBatch,
  color: string,
  x: number,
  y: number,
  cellWidth: number,
  cellHeight: number,
  alpha: number,
) => {
  const cells = batch.get(color);
  if (cells) cells.push(x, y, cellWidth, cellHeight, alpha);
  else batch.set(color, [x, y, cellWidth, cellHeight, alpha]);
};

// One fillStyle switch per color; alpha stays exact per cell. Cells inside one
// flush never overlap, so grouping does not change the composited result.
const flushCells = (context: CanvasRenderingContext2D, batch: CellBatch) => {
  for (const [color, cells] of batch) {
    context.fillStyle = color;
    for (let index = 0; index < cells.length; index += 5) {
      context.globalAlpha = cells[index + 4];
      context.fillRect(cells[index], cells[index + 1], cells[index + 2], cells[index + 3]);
    }
  }
  batch.clear();
};

/** Square cell lattice centered in a box; all sizes in CSS px, aligned to device pixels. */
interface WaveGrid {
  /** First cell's left / top edge. */
  left: number;
  top: number;
  columns: number;
  rows: number;
  /** Distance between cell origins (same on both axes). */
  pitch: number;
  /** Edge of one square. */
  cell: number;
  highlight: number;
  highlightOffset: number;
}

// Pitch, cell, and highlight are whole device pixels, so every square and every
// gap is identical on any DPR (a stretched fractional pitch snapped cells to
// mixed 10/11px sizes and 2/3px gaps - the grid read as crooked). As many cells
// as fit with at least one gap to each edge; the leftover is split evenly, so the
// margins are symmetric in every section and on the full screen.
const fitGrid = (box: PixelWaveClip, ratio: number): WaveGrid => {
  const pitch = Math.max(2, Math.round(GRID_SIZE * ratio));
  const cell = Math.max(1, Math.round(PIXEL_SIZE * ratio));
  const highlight = Math.max(1, Math.round(HIGHLIGHT_SIZE * ratio));
  const gap = pitch - cell;

  const fitAxis = (start: number, size: number) => {
    const sizePx = size * ratio;
    const count = Math.max(1, Math.floor((sizePx - gap) / pitch));
    const span = count * pitch - gap;
    return { count, origin: Math.round(start * ratio + (sizePx - span) / 2) / ratio };
  };

  const x = fitAxis(box.left, box.width);
  const y = fitAxis(box.top, box.height);

  return {
    left: x.origin,
    top: y.origin,
    columns: x.count,
    rows: y.count,
    pitch: pitch / ratio,
    cell: cell / ratio,
    highlight: highlight / ratio,
    highlightOffset: Math.floor((cell - highlight) / 2) / ratio,
  };
};

const getWaveAlphaScale = (wave: PixelWave) => {
  if (wave.palette === "monochrome") {
    return (wave.opacityScale ?? 1) * MONO_ALPHA;
  }

  return wave.opacityScale ?? 1;
};

const getMaxRadius = (x: number, y: number, width: number, height: number) =>
  Math.max(
    Math.hypot(x, y),
    Math.hypot(width - x, y),
    Math.hypot(x, height - y),
    Math.hypot(width - x, height - y),
  );

const getElementClip = (
  element: HTMLElement,
  viewport: ViewportState,
): PixelWaveClip | null => {
  // Fractional on purpose: cells snap to device pixels themselves, and rounding
  // the box inward made the gap to the border 1px wider on the right / bottom.
  const rect = element.getBoundingClientRect();
  const left = rect.left - viewport.offsetX + SECTION_CLIP_INSET_PX;
  const top = rect.top - viewport.offsetY + SECTION_CLIP_INSET_PX;
  const right = rect.right - viewport.offsetX - SECTION_CLIP_INSET_PX;
  const bottom = rect.bottom - viewport.offsetY - SECTION_CLIP_INSET_PX;
  const width = right - left;
  const height = bottom - top;

  return width > 0 && height > 0 ? { left, top, width, height } : null;
};

const getHeaderSafeClip = (
  clip: PixelWaveClip,
  viewport: ViewportState,
): PixelWaveClip | null => {
  const headerBottom =
    (document.querySelector<HTMLElement>("header")?.getBoundingClientRect().bottom ?? 0) -
    viewport.offsetY;
  const top = Math.max(clip.top, Math.ceil(headerBottom));
  const bottom = clip.top + clip.height;
  const height = bottom - top;

  return height > 0 ? { ...clip, top, height } : null;
};

type WaveLayer = "above" | "behind";

interface LayerRuntime {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  waves: PixelWave[];
  animationFrameId: number;
}

const getWaveLayer = (palette?: PixelWavePalette): WaveLayer =>
  palette === "monochrome" ? "behind" : "above";

const getTravelDuration = (maxRadius: number) =>
  maxRadius / WAVE_SPEED_PX_PER_MS;

const getBehindMount = (pathname: string) =>
  pathname === ROUTES.home
    ? document.querySelector<HTMLElement>(
        `#${SECTION_IDS.profile} [data-pixel-wave-behind]`,
      )
    : null;

interface WaveRuntime {
  attachBehind: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
  detachBehind: () => void;
  resize: () => void;
}

const INTRO_RETRY_LIMIT = 24;
const INTRO_RETRY_MS = 32;

// Colored intro is a once-per-session flourish. One beat per route: first time
// a pathname is visited this session. Client nav and returning to a route skip it.
const COLORED_INTRO_SESSION_KEY = "pixel-wave-colored-intro-paths";

const getSeenColoredIntroPaths = (): string[] => {
  try {
    const raw = sessionStorage.getItem(COLORED_INTRO_SESSION_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((path) => typeof path === "string") : [];
  } catch {
    return [];
  }
};

const hasSeenColoredIntro = (pathname: string) =>
  getSeenColoredIntroPaths().includes(pathname);

const markColoredIntroSeen = (pathname: string) => {
  try {
    const seen = getSeenColoredIntroPaths();
    sessionStorage.setItem(
      COLORED_INTRO_SESSION_KEY,
      JSON.stringify(seen.includes(pathname) ? seen : [...seen, pathname]),
    );
  } catch {}
};

export function PixelClickWave() {
  const aboveCanvasRef = useRef<HTMLCanvasElement>(null);
  const behindCanvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<WaveRuntime | null>(null);
  const introPathRef = useRef<string | null>(null);
  const pathname = usePathname();
  const [behindMount, setBehindMount] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setBehindMount(getBehindMount(pathname));
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  useEffect(() => {
    const aboveCanvas = aboveCanvasRef.current;
    if (!aboveCanvas) return;

    const aboveContext = aboveCanvas.getContext("2d");
    if (!aboveContext) return;

    const reducedMotion = isReducedMotion();
    const layers: Partial<Record<WaveLayer, LayerRuntime>> = {
      above: {
        canvas: aboveCanvas,
        context: aboveContext,
        waves: [],
        animationFrameId: 0,
      },
    };

    const resolveLayer = (palette?: PixelWavePalette): LayerRuntime | null => {
      const layerKey = getWaveLayer(palette);
      const layer = layers[layerKey];

      if (layerKey === "behind") {
        return layer ?? null;
      }

      return layer ?? layers.above!;
    };
    let viewport: ViewportState = getViewportState();
    let width = viewport.width;
    let height = viewport.height;
    let pixelRatio = 1;
    let lastClickWaveStartedAt = Number.NEGATIVE_INFINITY;
    const squares: CellBatch = new Map();
    const highlights: CellBatch = new Map();

    // Device-pixel edges for the clip rect, so a header cut is as crisp as the cells.
    const snap = (value: number) => Math.round(value * pixelRatio) / pixelRatio;

    const getWaveGrid = (wave: PixelWave) =>
      fitGrid(wave.gridClip ?? wave.clip ?? { left: 0, top: 0, width, height }, pixelRatio);

    const queueGridCell = (
      grid: WaveGrid,
      column: number,
      row: number,
      color: string,
      alpha: number,
    ) => {
      queueCell(
        squares,
        color,
        grid.left + column * grid.pitch,
        grid.top + row * grid.pitch,
        grid.cell,
        grid.cell,
        alpha,
      );
    };

    // CSS size is the rounded backing store divided back by the ratio, so one
    // backing pixel is exactly one device pixel - a 1391.5 -> 1392px rounding
    // otherwise rescales the whole bitmap and blurs every cell edge.
    const applyCanvasLayout = (layer: LayerRuntime) => {
      layer.canvas.style.left = `${viewport.offsetX}px`;
      layer.canvas.style.top = `${viewport.offsetY}px`;
      layer.canvas.style.width = `${layer.canvas.width / pixelRatio}px`;
      layer.canvas.style.height = `${layer.canvas.height / pixelRatio}px`;
    };

    const resizeCanvas = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      viewport = getViewportState();
      width = viewport.width;
      height = viewport.height;

      const backingWidth = Math.round(width * pixelRatio);
      const backingHeight = Math.round(height * pixelRatio);

      for (const layer of Object.values(layers)) {
        if (!layer) continue;
        // visualViewport scroll fires constantly on mobile; reallocating clears the canvas, so only do it on a real size change.
        if (layer.canvas.width !== backingWidth || layer.canvas.height !== backingHeight) {
          layer.canvas.width = backingWidth;
          layer.canvas.height = backingHeight;
          layer.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        }
        applyCanvasLayout(layer);
      }
    };

    const drawImpact = (
      context: CanvasRenderingContext2D,
      wave: PixelWave,
      elapsed: number,
    ) => {
      const progress = Math.min(elapsed / IMPACT_DURATION_MS, 1);
      if (progress >= 1) return;

      const alphaScale = getWaveAlphaScale(wave);
      const palette = wave.palette ?? "default";

      const radius = GRID_SIZE * (1.5 + progress * 5);
      const grid = getWaveGrid(wave);
      const centerOffset = grid.cell / 2;
      const firstColumn = Math.max(
        0,
        Math.floor((wave.x - radius - grid.left - centerOffset) / grid.pitch),
      );
      const lastColumn = Math.min(
        grid.columns - 1,
        Math.ceil((wave.x + radius - grid.left - centerOffset) / grid.pitch),
      );
      const firstRow = Math.max(
        0,
        Math.floor((wave.y - radius - grid.top - centerOffset) / grid.pitch),
      );
      const lastRow = Math.min(
        grid.rows - 1,
        Math.ceil((wave.y + radius - grid.top - centerOffset) / grid.pitch),
      );

      for (let row = firstRow; row <= lastRow; row += 1) {
        for (let column = firstColumn; column <= lastColumn; column += 1) {
          const distance = Math.hypot(
            grid.left + column * grid.pitch + centerOffset - wave.x,
            grid.top + row * grid.pitch + centerOffset - wave.y,
          );
          if (distance > radius) continue;

          const colorMix =
            (Math.sin(distance * 0.08 + wave.seed * Math.PI) + 1) / 2;
          const whiteHeat = 1 - progress;

          queueGridCell(
            grid,
            column,
            row,
            getRippleColor(colorMix, whiteHeat * 0.72, palette),
            whiteHeat * 0.72 * alphaScale,
          );
        }
      }

      flushCells(context, squares);
    };

    const drawWave = (
      context: CanvasRenderingContext2D,
      wave: PixelWave,
      timestamp: number,
    ) => {
      const elapsed = timestamp - wave.startedAt;
      const waveElapsed = Math.max(elapsed - WAVE_DELAY_MS, 0);
      const alphaScale = getWaveAlphaScale(wave);
      const palette = wave.palette ?? "default";

      drawImpact(context, wave, elapsed);

      if (elapsed >= WAVE_DELAY_MS) {
        const grid = getWaveGrid(wave);
        const centerOffset = grid.cell / 2;
        // Column / row whose pitch span contains a coordinate.
        const columnAt = (x: number) => Math.floor((x - grid.left) / grid.pitch);
        const rowAt = (y: number) => Math.floor((y - grid.top) / grid.pitch);
        // Column whose center is the last at or before / first at or after `x`.
        const columnCenteredBefore = (x: number) =>
          Math.floor((x - grid.left - centerOffset) / grid.pitch);
        const columnCenteredAfter = (x: number) =>
          Math.ceil((x - grid.left - centerOffset) / grid.pitch);

        // Only a ring of cells glows at once (arrival within the last
        // CELL_GLOW_DURATION_MS) and only the visible part of the grid matters, so
        // the loop walks that ring inside the viewport instead of every cell of a
        // full-screen or page-tall grid. The cellAge check below stays exact.
        const radiusPerMs = wave.maxRadius / wave.travelDurationMs;
        const outerRadius = waveElapsed * radiusPerMs;
        const innerRadius = (waveElapsed - CELL_GLOW_DURATION_MS) * radiusPerMs;
        const firstColumn = Math.max(0, columnAt(Math.max(wave.clip?.left ?? 0, 0)));
        const lastColumn = Math.min(
          grid.columns - 1,
          columnAt(Math.min(wave.clip ? wave.clip.left + wave.clip.width : width, width)),
        );
        const firstRow = Math.max(0, rowAt(Math.max(wave.clip?.top ?? 0, 0)));
        const lastRow = Math.min(
          grid.rows - 1,
          rowAt(Math.min(wave.clip ? wave.clip.top + wave.clip.height : height, height)),
        );

        for (let row = firstRow; row <= lastRow; row += 1) {
          const cellCenterY = grid.top + row * grid.pitch + centerOffset;
          const rowOffset = Math.abs(cellCenterY - wave.y);
          if (rowOffset > outerRadius) continue;

          // Row span inside the outer circle, minus the already faded inner disc
          // (one pitch of margin so rounding never skips a lit cell).
          const outerHalf = Math.sqrt(outerRadius ** 2 - rowOffset ** 2);
          const innerHalf =
            innerRadius > rowOffset
              ? Math.sqrt(innerRadius ** 2 - rowOffset ** 2) - grid.pitch
              : 0;
          const rowFirstColumn = Math.max(firstColumn, columnCenteredBefore(wave.x - outerHalf));
          const rowLastColumn = Math.min(lastColumn, columnCenteredAfter(wave.x + outerHalf));
          const gapFirstColumn = columnCenteredAfter(wave.x - innerHalf);
          const gapLastColumn = columnCenteredBefore(wave.x + innerHalf);

          for (let column = rowFirstColumn; column <= rowLastColumn; column += 1) {
            if (innerHalf > 0 && column >= gapFirstColumn && column <= gapLastColumn) {
              column = gapLastColumn;
              continue;
            }

            const cellCenterX = grid.left + column * grid.pitch + centerOffset;
            const distance = Math.hypot(cellCenterX - wave.x, cellCenterY - wave.y);
            const arrivalTime =
              (distance / wave.maxRadius) * wave.travelDurationMs;
            const cellAge = waveElapsed - arrivalTime;

            if (cellAge < 0 || cellAge > CELL_GLOW_DURATION_MS) continue;

            const lifeProgress = cellAge / CELL_GLOW_DURATION_MS;
            const attack = Math.min(cellAge / 70, 1);
            const decay = (1 - lifeProgress) ** 1.5;
            const intensity = attack * decay;
            const colorCycle =
              distance * 0.012 - waveElapsed * 0.004 + wave.seed * Math.PI * 2;
            const colorMix = (Math.sin(colorCycle) + 1) / 2;
            const whiteHeat = Math.max(0, 1 - lifeProgress * 5);

            queueGridCell(
              grid,
              column,
              row,
              getRippleColor(colorMix, whiteHeat * 0.78, palette),
              intensity * 0.72 * alphaScale,
            );

            if (whiteHeat > 0.45) {
              queueCell(
                highlights,
                HIGHLIGHT_COLOR,
                grid.left + column * grid.pitch + grid.highlightOffset,
                grid.top + row * grid.pitch + grid.highlightOffset,
                grid.highlight,
                grid.highlight,
                intensity * whiteHeat * 0.5 * alphaScale,
              );
            }
          }
        }

        // Highlights sit on top of their own cell, so they go after every square.
        flushCells(context, squares);
        flushCells(context, highlights);
      }

      return (
        elapsed <
        WAVE_DELAY_MS + wave.travelDurationMs + CELL_GLOW_DURATION_MS
      );
    };

    const animateLayer = (layer: LayerRuntime) => (timestamp: number) => {
      if (layer.waves.length > 0) {
        const nextViewport = getViewportState();
        if (
          nextViewport.offsetX !== viewport.offsetX ||
          nextViewport.offsetY !== viewport.offsetY ||
          nextViewport.width !== width ||
          nextViewport.height !== height
        ) {
          resizeCanvas();
        }
      }

      const { context, waves } = layer;
      context.clearRect(0, 0, width, height);

      for (let index = waves.length - 1; index >= 0; index--) {
        const wave = waves[index];

        if (wave.clipElement) {
          const sectionClip = getElementClip(wave.clipElement, viewport);
          const visibleClip = sectionClip ? getHeaderSafeClip(sectionClip, viewport) : null;
          if (!sectionClip || !visibleClip) {
            waves.splice(index, 1);
            continue;
          }

          wave.clip = visibleClip;
          wave.gridClip = sectionClip;
          const origin = fitGrid(sectionClip, pixelRatio);
          wave.x = origin.left + origin.cell / 2;
          wave.y = origin.top + origin.cell / 2;
          wave.maxRadius = Math.hypot(sectionClip.width, sectionClip.height);
          wave.travelDurationMs = getTravelDuration(wave.maxRadius);
        }

        context.save();

        if (wave.clip) {
          context.beginPath();
          const clipLeft = snap(wave.clip.left);
          const clipTop = snap(wave.clip.top);
          context.rect(
            clipLeft,
            clipTop,
            snap(wave.clip.left + wave.clip.width) - clipLeft,
            snap(wave.clip.top + wave.clip.height) - clipTop,
          );
          context.clip();
        }

        const isActive = drawWave(context, wave, timestamp);
        context.restore();

        if (!isActive) {
          waves.splice(index, 1);
        }
      }

      context.globalAlpha = 1;
      layer.animationFrameId = waves.length
        ? window.requestAnimationFrame(animateLayer(layer))
        : 0;
      if (!waves.length) delete layer.canvas.dataset.active;
    };

    const startLayerAnimation = (layer: LayerRuntime) => {
      layer.canvas.dataset.active = "";
      if (!layer.animationFrameId) {
        layer.animationFrameId = window.requestAnimationFrame(animateLayer(layer));
      }
    };

    const pushWave = (layer: LayerRuntime, wave: PixelWave) => {
      layer.waves.push(wave);

      if (layer.waves.length > MAX_ACTIVE_WAVES) {
        layer.waves.shift();
      }

      startLayerAnimation(layer);
    };

    const spawnClippedWave = (
      clipElement: HTMLElement,
      options?: { palette?: PixelWavePalette; opacityScale?: number },
    ) => {
      const sectionClip = getElementClip(clipElement, viewport);
      const visibleClip = sectionClip ? getHeaderSafeClip(sectionClip, viewport) : null;
      if (!sectionClip || !visibleClip) return;

      const startedAt = performance.now();
      const maxRadius = Math.hypot(sectionClip.width, sectionClip.height);
      const origin = fitGrid(sectionClip, pixelRatio);
      const layer = resolveLayer(options?.palette);
      if (!layer) return;

      pushWave(layer, {
        x: origin.left + origin.cell / 2,
        y: origin.top + origin.cell / 2,
        startedAt,
        maxRadius,
        travelDurationMs: getTravelDuration(maxRadius),
        seed: Math.random(),
        clip: visibleClip,
        gridClip: sectionClip,
        clipElement,
        palette: options?.palette,
        opacityScale: options?.opacityScale,
      });
    };

    const handleSpawnEvent = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;

      const detail = event.detail as PixelWaveSpawnDetail | undefined;
      if (!detail || reducedMotion) return;

      const clipElement = detail.clipSelector
        ? document.querySelector<HTMLElement>(detail.clipSelector)
        : null;
      if (!clipElement) return;

      spawnClippedWave(clipElement, {
        palette: detail.palette,
        opacityScale: detail.opacityScale,
      });
    };

    const handleClick = (event: MouseEvent) => {
      const selection = window.getSelection();

      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        reducedMotion ||
        !(event.target instanceof Element) ||
        event.target.closest(CONTENT_SURFACE_SELECTOR) ||
        event.target.closest(INTERACTIVE_SELECTOR) ||
        (selection && !selection.isCollapsed)
      ) {
        return;
      }

      const startedAt = performance.now();
      if (startedAt - lastClickWaveStartedAt < CLICK_COOLDOWN_MS) return;
      lastClickWaveStartedAt = startedAt;

      const maxRadius = getMaxRadius(
        event.clientX - viewport.offsetX,
        event.clientY - viewport.offsetY,
        width,
        height,
      );

      pushWave(layers.above!, {
        x: event.clientX - viewport.offsetX,
        y: event.clientY - viewport.offsetY,
        startedAt,
        maxRadius,
        travelDurationMs: getTravelDuration(maxRadius),
        seed: Math.random(),
      });
    };

    resizeCanvas();
    runtimeRef.current = {
      attachBehind: (canvas, context) => {
        const existing = layers.behind;
        if (existing?.animationFrameId) {
          window.cancelAnimationFrame(existing.animationFrameId);
        }

        layers.behind = {
          canvas,
          context,
          waves: [],
          animationFrameId: 0,
        };
        resizeCanvas();
      },
      detachBehind: () => {
        const existing = layers.behind;
        if (!existing) return;

        if (existing.animationFrameId) {
          window.cancelAnimationFrame(existing.animationFrameId);
        }
        delete layers.behind;
      },
      resize: resizeCanvas,
    };

    window.addEventListener("resize", resizeCanvas);
    window.visualViewport?.addEventListener("resize", resizeCanvas);
    window.visualViewport?.addEventListener("scroll", resizeCanvas);
    document.addEventListener("click", handleClick);
    window.addEventListener(PIXEL_WAVE_SPAWN_EVENT, handleSpawnEvent);

    return () => {
      runtimeRef.current = null;
      window.removeEventListener("resize", resizeCanvas);
      window.visualViewport?.removeEventListener("resize", resizeCanvas);
      window.visualViewport?.removeEventListener("scroll", resizeCanvas);
      document.removeEventListener("click", handleClick);
      window.removeEventListener(PIXEL_WAVE_SPAWN_EVENT, handleSpawnEvent);
      for (const layer of Object.values(layers)) {
        if (!layer) continue;
        window.cancelAnimationFrame(layer.animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    const runtime = runtimeRef.current;
    const behindCanvas = behindCanvasRef.current;
    if (!runtime) return;

    if (!behindMount || !behindCanvas) {
      runtime.detachBehind();
      return;
    }

    const behindContext = behindCanvas.getContext("2d");
    if (!behindContext) {
      runtime.detachBehind();
      return;
    }

    runtime.attachBehind(behindCanvas, behindContext);

    return () => {
      runtime.detachBehind();
    };
  }, [behindMount]);

  useEffect(() => {
    if (isReducedMotion()) return;

    introPathRef.current = null;
    let attemptsLeft = INTRO_RETRY_LIMIT;
    let cancelled = false;
    let retryTimeoutId = 0;
    let frameId = 0;

    const clipSelector =
      pathname === ROUTES.home
        ? `#${SECTION_IDS.profile}`
        : "main section";

    const runIntro = () => {
      if (cancelled) return;

      const section = document.querySelector<HTMLElement>(clipSelector);
      const rect = section?.getBoundingClientRect();
      const isReady = Boolean(
        section && rect && rect.width > 0 && rect.height > 0,
      );

      if (!isReady) {
        if (attemptsLeft > 0) {
          attemptsLeft -= 1;
          retryTimeoutId = window.setTimeout(runIntro, INTRO_RETRY_MS);
          return;
        }
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        if (cancelled || introPathRef.current === pathname) return;

        introPathRef.current = pathname;

        // Colored intro: first visit to this route this session. Home also gets
        // its monochrome hero wave on every visit (HeroWaveTimer).
        if (hasSeenColoredIntro(pathname)) return;

        markColoredIntroSeen(pathname);
        dispatchPixelWaveSpawn({
          clipSelector,
          palette: "default",
        });
      });
    };

    frameId = window.requestAnimationFrame(() => {
      frameId = window.requestAnimationFrame(runIntro);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(retryTimeoutId);
    };
  }, [pathname]);

  const behindCanvas = (
    <canvas
      ref={behindCanvasRef}
      className={`${styles.canvas} ${styles.canvasBehind}`}
      aria-hidden="true"
    />
  );

  return (
    <>
      {behindMount ? createPortal(behindCanvas, behindMount) : null}
      <canvas
        ref={aboveCanvasRef}
        className={`${styles.canvas} ${styles.canvasAbove}`}
        aria-hidden="true"
      />
    </>
  );
}
