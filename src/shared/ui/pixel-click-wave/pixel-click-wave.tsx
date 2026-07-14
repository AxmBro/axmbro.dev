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
const PIXEL_INSET = (GRID_SIZE - PIXEL_SIZE) / 2;
const IMPACT_DURATION_MS = 180;
const WAVE_DELAY_MS = 40;
const WAVE_SPEED_PX_PER_MS = 0.72;
const CELL_GLOW_DURATION_MS = 600;
const CLICK_COOLDOWN_MS = 1250;
const MAX_ACTIVE_WAVES = 3;
const SECTION_CLIP_INSET_PX = 1;

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
const MINT: RgbColor = { red: 0, green: 229, blue: 176 };
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

const getRippleColor = (
  colorMix: number,
  whiteHeat: number,
  palette: PixelWavePalette = "default",
) => {
  if (palette === "monochrome") {
    const tinted = mixColor(MONO_SILVER, MONO_PEAK, colorMix);
    return colorToCss(mixColor(tinted, WHITE, whiteHeat * 0.92));
  }

  return colorToCss(mixColor(mixColor(BLUE, MINT, colorMix), WHITE, whiteHeat));
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

const getElementClip = (element: HTMLElement): PixelWaveClip | null => {
  const rect = element.getBoundingClientRect();
  const left = Math.ceil(rect.left) + SECTION_CLIP_INSET_PX;
  const top = Math.ceil(rect.top) + SECTION_CLIP_INSET_PX;
  const right = Math.floor(rect.right) - SECTION_CLIP_INSET_PX;
  const bottom = Math.floor(rect.bottom) - SECTION_CLIP_INSET_PX;
  const width = right - left;
  const height = bottom - top;

  return width > 0 && height > 0 ? { left, top, width, height } : null;
};

const getHeaderSafeClip = (clip: PixelWaveClip): PixelWaveClip | null => {
  const headerBottom =
    document.querySelector<HTMLElement>("header")?.getBoundingClientRect().bottom ?? 0;
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

export function PixelClickWave() {
  const aboveCanvasRef = useRef<HTMLCanvasElement>(null);
  const behindCanvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const [behindMount, setBehindMount] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setBehindMount(getBehindMount(pathname));
  }, [pathname]);

  useEffect(() => {
    const aboveCanvas = aboveCanvasRef.current;
    if (!aboveCanvas) return;

    const aboveContext = aboveCanvas.getContext("2d");
    if (!aboveContext) return;

    const behindCanvas = behindCanvasRef.current;
    const behindContext = behindCanvas?.getContext("2d") ?? null;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const layers: Partial<Record<WaveLayer, LayerRuntime>> = {
      above: {
        canvas: aboveCanvas,
        context: aboveContext,
        waves: [],
        animationFrameId: 0,
      },
    };

    if (behindCanvas && behindContext) {
      layers.behind = {
        canvas: behindCanvas,
        context: behindContext,
        waves: [],
        animationFrameId: 0,
      };
    }

    const resolveLayer = (palette?: PixelWavePalette): LayerRuntime | null => {
      const layerKey = getWaveLayer(palette);
      const layer = layers[layerKey];

      if (layerKey === "behind") {
        return layer ?? null;
      }

      return layer ?? layers.above!;
    };
    let width = window.innerWidth;
    let height = window.innerHeight;
    let lastWaveStartedAt = Number.NEGATIVE_INFINITY;

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      for (const layer of Object.values(layers)) {
        if (!layer) continue;
        layer.canvas.width = Math.round(width * pixelRatio);
        layer.canvas.height = Math.round(height * pixelRatio);
        layer.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
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
      const gridOriginX = wave.gridClip?.left ?? wave.clip?.left ?? 0;
      const gridOriginY = wave.gridClip?.top ?? wave.clip?.top ?? 0;
      const startX =
        gridOriginX +
        Math.floor((wave.x - radius - gridOriginX) / GRID_SIZE) * GRID_SIZE;
      const endX =
        gridOriginX +
        Math.ceil((wave.x + radius - gridOriginX) / GRID_SIZE) * GRID_SIZE;
      const startY =
        gridOriginY +
        Math.floor((wave.y - radius - gridOriginY) / GRID_SIZE) * GRID_SIZE;
      const endY =
        gridOriginY +
        Math.ceil((wave.y + radius - gridOriginY) / GRID_SIZE) * GRID_SIZE;

      for (let y = startY; y <= endY; y += GRID_SIZE) {
        for (let x = startX; x <= endX; x += GRID_SIZE) {
          const distance = Math.hypot(
            x + GRID_SIZE / 2 - wave.x,
            y + GRID_SIZE / 2 - wave.y,
          );
          if (distance > radius) continue;

          const colorMix =
            (Math.sin(distance * 0.08 + wave.seed * Math.PI) + 1) / 2;
          const whiteHeat = 1 - progress;

          context.globalAlpha = whiteHeat * 0.72 * alphaScale;
          context.fillStyle = getRippleColor(colorMix, whiteHeat * 0.72, palette);
          context.fillRect(
            x + PIXEL_INSET,
            y + PIXEL_INSET,
            PIXEL_SIZE,
            PIXEL_SIZE,
          );
        }
      }
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
        const gridClip = wave.gridClip ?? wave.clip;
        const startX = gridClip?.left ?? 0;
        const startY = gridClip?.top ?? 0;
        const endX = gridClip
          ? startX + Math.floor(gridClip.width / GRID_SIZE) * GRID_SIZE
          : width;
        const endY = gridClip
          ? startY + Math.floor(gridClip.height / GRID_SIZE) * GRID_SIZE
          : height;

        for (let y = startY; y < endY; y += GRID_SIZE) {
          for (let x = startX; x < endX; x += GRID_SIZE) {
            const cellCenterX = x + GRID_SIZE / 2;
            const cellCenterY = y + GRID_SIZE / 2;
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

            context.globalAlpha = intensity * 0.72 * alphaScale;
            context.fillStyle = getRippleColor(colorMix, whiteHeat * 0.78, palette);
            context.fillRect(
              x + PIXEL_INSET,
              y + PIXEL_INSET,
              PIXEL_SIZE,
              PIXEL_SIZE,
            );

            if (whiteHeat > 0.45) {
              const highlightSize = 3;
              context.globalAlpha = intensity * whiteHeat * 0.5 * alphaScale;
              context.fillStyle = colorToCss(WHITE);
              context.fillRect(
                x + (GRID_SIZE - highlightSize) / 2,
                y + (GRID_SIZE - highlightSize) / 2,
                highlightSize,
                highlightSize,
              );
            }
          }
        }
      }

      return (
        elapsed <
        WAVE_DELAY_MS + wave.travelDurationMs + CELL_GLOW_DURATION_MS
      );
    };

    const animateLayer = (layer: LayerRuntime) => (timestamp: number) => {
      const { context, waves } = layer;
      context.clearRect(0, 0, width, height);

      for (let index = waves.length - 1; index >= 0; index--) {
        const wave = waves[index];

        if (wave.clipElement) {
          const sectionClip = getElementClip(wave.clipElement);
          const visibleClip = sectionClip ? getHeaderSafeClip(sectionClip) : null;
          if (!sectionClip || !visibleClip) {
            waves.splice(index, 1);
            continue;
          }

          wave.clip = visibleClip;
          wave.gridClip = sectionClip;
          wave.x = sectionClip.left + GRID_SIZE / 2;
          wave.y = sectionClip.top + GRID_SIZE / 2;
          wave.maxRadius = Math.hypot(sectionClip.width, sectionClip.height);
          wave.travelDurationMs = getTravelDuration(wave.maxRadius);
        }

        context.save();

        if (wave.clip) {
          context.beginPath();
          context.rect(
            wave.clip.left,
            wave.clip.top,
            wave.clip.width,
            wave.clip.height,
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
    };

    const startLayerAnimation = (layer: LayerRuntime) => {
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
      const sectionClip = getElementClip(clipElement);
      const visibleClip = sectionClip ? getHeaderSafeClip(sectionClip) : null;
      if (!sectionClip || !visibleClip) return;

      const startedAt = performance.now();
      const maxRadius = Math.hypot(sectionClip.width, sectionClip.height);
      const layer = resolveLayer(options?.palette);
      if (!layer) return;

      lastWaveStartedAt = startedAt;
      pushWave(layer, {
        x: sectionClip.left + GRID_SIZE / 2,
        y: sectionClip.top + GRID_SIZE / 2,
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
      if (!detail || reducedMotion.matches) return;

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
        reducedMotion.matches ||
        !(event.target instanceof Element) ||
        event.target.closest(CONTENT_SURFACE_SELECTOR) ||
        event.target.closest(INTERACTIVE_SELECTOR) ||
        (selection && !selection.isCollapsed)
      ) {
        return;
      }

      const startedAt = performance.now();
      if (startedAt - lastWaveStartedAt < CLICK_COOLDOWN_MS) return;
      lastWaveStartedAt = startedAt;

      const maxRadius = getMaxRadius(event.clientX, event.clientY, width, height);

      pushWave(layers.above!, {
        x: event.clientX,
        y: event.clientY,
        startedAt,
        maxRadius,
        travelDurationMs: getTravelDuration(maxRadius),
        seed: Math.random(),
      });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("click", handleClick);
    window.addEventListener(PIXEL_WAVE_SPAWN_EVENT, handleSpawnEvent);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("click", handleClick);
      window.removeEventListener(PIXEL_WAVE_SPAWN_EVENT, handleSpawnEvent);
      for (const layer of Object.values(layers)) {
        if (!layer) continue;
        window.cancelAnimationFrame(layer.animationFrameId);
      }
    };
  }, [pathname, behindMount]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId = 0;
    let attemptsLeft = 8;
    let cancelled = false;

    const runIntro = () => {
      if (cancelled) return;

      if (pathname === ROUTES.home) {
        const profileSection = document.querySelector<HTMLElement>(
          `#${SECTION_IDS.profile}`,
        );

        if (!profileSection && attemptsLeft > 0) {
          attemptsLeft -= 1;
          frameId = window.requestAnimationFrame(runIntro);
          return;
        }

        if (profileSection) {
          dispatchPixelWaveSpawn({
            clipSelector: `#${SECTION_IDS.profile}`,
            palette: "default",
          });
        }
        return;
      }

      dispatchPixelWaveSpawn({
        clipSelector: "main section",
      });
    };

    frameId = window.requestAnimationFrame(() => {
      frameId = window.requestAnimationFrame(runIntro);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
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
