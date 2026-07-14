"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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
const WAVE_SPEED_PX_PER_MS = 0.82;
const CELL_GLOW_DURATION_MS = 520;
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
}

const BLUE: RgbColor = { red: 0, green: 169, blue: 244 };
const MINT: RgbColor = { red: 0, green: 229, blue: 176 };
const WHITE: RgbColor = { red: 247, green: 247, blue: 247 };

const mixColor = (start: RgbColor, end: RgbColor, amount: number): RgbColor => ({
  red: Math.round(start.red + (end.red - start.red) * amount),
  green: Math.round(start.green + (end.green - start.green) * amount),
  blue: Math.round(start.blue + (end.blue - start.blue) * amount),
});

const colorToCss = ({ red, green, blue }: RgbColor) =>
  `rgb(${red} ${green} ${blue})`;

const getRippleColor = (colorMix: number, whiteHeat: number) =>
  colorToCss(mixColor(mixColor(BLUE, MINT, colorMix), WHITE, whiteHeat));

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

const getTravelDuration = (maxRadius: number) =>
  maxRadius / WAVE_SPEED_PX_PER_MS;

export function PixelClickWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const waves: PixelWave[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId = 0;
    let lastWaveStartedAt = Number.NEGATIVE_INFINITY;

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawImpact = (wave: PixelWave, elapsed: number) => {
      const progress = Math.min(elapsed / IMPACT_DURATION_MS, 1);
      if (progress >= 1) return;

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

          context.globalAlpha = whiteHeat * 0.72;
          context.fillStyle = getRippleColor(colorMix, whiteHeat * 0.72);
          context.fillRect(
            x + PIXEL_INSET,
            y + PIXEL_INSET,
            PIXEL_SIZE,
            PIXEL_SIZE,
          );
        }
      }
    };

    const drawWave = (wave: PixelWave, timestamp: number) => {
      const elapsed = timestamp - wave.startedAt;
      const waveElapsed = Math.max(elapsed - WAVE_DELAY_MS, 0);

      drawImpact(wave, elapsed);

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

            context.globalAlpha = intensity * 0.72;
            context.fillStyle = getRippleColor(colorMix, whiteHeat * 0.78);
            context.fillRect(
              x + PIXEL_INSET,
              y + PIXEL_INSET,
              PIXEL_SIZE,
              PIXEL_SIZE,
            );

            if (whiteHeat > 0.45) {
              const highlightSize = 3;
              context.globalAlpha = intensity * whiteHeat * 0.5;
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

    const animate = (timestamp: number) => {
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

        const isActive = drawWave(wave, timestamp);
        context.restore();

        if (!isActive) {
          waves.splice(index, 1);
        }
      }

      context.globalAlpha = 1;
      animationFrameId = waves.length
        ? window.requestAnimationFrame(animate)
        : 0;
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

      waves.push({
        x: event.clientX,
        y: event.clientY,
        startedAt,
        maxRadius,
        travelDurationMs: getTravelDuration(maxRadius),
        seed: Math.random(),
      });

      if (waves.length > MAX_ACTIVE_WAVES) {
        waves.shift();
      }

      if (!animationFrameId) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    const startIntroWave = () => {
      if (reducedMotion.matches) return;

      const firstSection = document.querySelector<HTMLElement>("main section");
      if (!firstSection) return;

      const sectionClip = getElementClip(firstSection);
      const visibleClip = sectionClip ? getHeaderSafeClip(sectionClip) : null;
      if (!sectionClip || !visibleClip) return;

      const x = sectionClip.left + GRID_SIZE / 2;
      const y = sectionClip.top + GRID_SIZE / 2;
      const startedAt = performance.now();
      const maxRadius = Math.hypot(sectionClip.width, sectionClip.height);

      lastWaveStartedAt = startedAt;
      waves.push({
        x,
        y,
        startedAt,
        maxRadius,
        travelDurationMs: getTravelDuration(maxRadius),
        seed: Math.random(),
        clip: visibleClip,
        gridClip: sectionClip,
        clipElement: firstSection,
      });

      if (!animationFrameId) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("click", handleClick);
    let introFrameId = window.requestAnimationFrame(() => {
      introFrameId = window.requestAnimationFrame(startIntroWave);
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("click", handleClick);
      window.cancelAnimationFrame(introFrameId);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [pathname]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
