"use client";

import { useEffect, useRef } from "react";
import { isReducedMotion } from "@/shared/lib/motion";
import styles from "./ambient-pixels.module.scss";

const FADE_IN_PX = 120;
const FADE_OUT_PX = 140;
const MIN_PIXEL_SIZE = 4;
const MAX_PIXEL_SIZE = 12;
const PIXEL_SIZE_SKEW = 1.6;
const MIN_SPEED_PX_PER_S = 14;
const MAX_SPEED_PX_PER_S = 22;
const MIN_OPACITY = 0.16;
const MAX_OPACITY = 0.42;
const PARTICLES_PER_AREA = 40_000;
const MIN_PARTICLES = 15;
const MAX_PARTICLES = 25;
// Share of its lane a particle may land in - the rest keeps lane neighbours apart.
const LANE_JITTER = 0.7;
const MAX_FRAME_DELTA_MS = 48;
// ~30 fps: squares move under 1px per step at this speed, so higher refresh
// rates (60-144 Hz) only re-raster an always-on full-viewport canvas for nothing.
const MIN_DRAW_GAP_MS = 30;
const WHITE = "247 247 247";

// Positions are relative to the canvas, never pixels, so a resize, minimize, or
// alt-tab rescales the field instead of piling particles against a clamped edge.
interface Particle {
  /** 0-1 share of the free width. */
  x: number;
  /** 0 = top edge at the canvas bottom, 1 = fully above the header fade. */
  progress: number;
  size: number;
  speed: number;
  opacity: number;
}

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

const randomSize = () => {
  const t = 1 - Math.random() ** PIXEL_SIZE_SKEW;
  return Math.round(MIN_PIXEL_SIZE + t * (MAX_PIXEL_SIZE - MIN_PIXEL_SIZE));
};

// One particle per vertical lane with a jittered x inside it: even spread across
// the width without a visible column grid (lanes re-roll on every respawn).
const laneX = (lane: number, laneCount: number) =>
  (lane + (1 - LANE_JITTER) / 2 + Math.random() * LANE_JITTER) / laneCount;

const shuffledIndices = (count: number) => {
  const indices = Array.from({ length: count }, (_, index) => index);
  for (let index = count - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [indices[index], indices[swap]] = [indices[swap], indices[index]];
  }
  return indices;
};

const getHeaderBottom = () => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-sticky-height")
    .trim();
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 64;
};

// Fade in just above the bottom edge, fade out just below the header - the
// only place particles vanish is the top, so the field reads as one upward drift.
const edgeAlpha = (y: number, height: number, headerBottom: number) => {
  const riseFromBottom = (height - y) / FADE_IN_PX;
  const fadeIn = riseFromBottom < 1 ? Math.max(0, riseFromBottom) : 1;
  const underHeader = (y - headerBottom) / FADE_OUT_PX;
  const fadeOut = underHeader < 1 ? Math.max(0, underHeader) : 1;

  return Math.min(fadeIn, fadeOut);
};

const targetParticleCount = (width: number, height: number) => {
  const scaled = Math.round((width * height) / PARTICLES_PER_AREA);
  return Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, scaled));
};

export function AmbientPixels() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    // The CSS media query already hides the canvas; skip the loop entirely.
    if (!canvas || !context || isReducedMotion()) return;

    let width = 0;
    let height = 0;
    let headerBottom = getHeaderBottom();
    const particles: Particle[] = [];
    let sizeDirty = true;
    let animationFrameId = 0;
    let lastTimestamp = 0;

    const travelPx = (size: number) => Math.max(1, height - headerBottom + size);

    // `seedProgress` places a particle inside the field (first paint, density
    // growth); without it the particle enters from just below the bottom edge.
    const createParticle = (
      lane: number,
      laneCount: number,
      seedProgress?: number,
    ): Particle => {
      const size = randomSize();
      return {
        x: laneX(lane, laneCount),
        progress: seedProgress ?? (-Math.random() * FADE_IN_PX) / travelPx(size),
        size,
        speed: randomBetween(MIN_SPEED_PX_PER_S, MAX_SPEED_PX_PER_S),
        opacity: randomBetween(MIN_OPACITY, MAX_OPACITY),
      };
    };

    // Runs inside the frame loop, so a resize drag reallocates once per frame and
    // a minimized (0x0) window keeps the last field until it has a real size again.
    const syncSize = () => {
      const nextWidth = canvas.clientWidth;
      const nextHeight = canvas.clientHeight;
      if (!nextWidth || !nextHeight) return false;

      sizeDirty = false;
      width = nextWidth;
      height = nextHeight;
      headerBottom = getHeaderBottom();

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = targetParticleCount(width, height);
      if (particles.length > count) particles.length = count;

      // Stratified rise progress, shuffled against lanes, so the first frame has
      // no vertical clumps and no diagonal line across the lanes.
      const strata = shuffledIndices(count);
      for (let lane = particles.length; lane < count; lane += 1) {
        particles.push(createParticle(lane, count, (strata[lane] + Math.random()) / count));
      }

      return true;
    };

    const draw = (timestamp: number) => {
      animationFrameId = window.requestAnimationFrame(draw);

      // Reallocating clears the canvas, so a resized frame always repaints.
      const resized = sizeDirty && syncSize();
      if (!resized && lastTimestamp && timestamp - lastTimestamp < MIN_DRAW_GAP_MS) return;

      // A capped delta also covers a backgrounded tab: the first frame back
      // moves particles one short step instead of launching them.
      const deltaMs = lastTimestamp
        ? Math.min(timestamp - lastTimestamp, MAX_FRAME_DELTA_MS)
        : 0;
      lastTimestamp = timestamp;

      context.clearRect(0, 0, width, height);

      particles.forEach((current, lane) => {
        let particle = current;
        particle.progress += (particle.speed * deltaMs) / 1000 / travelPx(particle.size);

        if (particle.progress >= 1) {
          particle = createParticle(lane, particles.length);
          particles[lane] = particle;
        }

        const y = height - particle.progress * travelPx(particle.size);
        const alpha = edgeAlpha(y, height, headerBottom) * particle.opacity;
        if (alpha <= 0.02) return;

        context.fillStyle = `rgba(${WHITE} / ${alpha})`;
        context.fillRect(
          particle.x * Math.max(0, width - particle.size),
          y,
          particle.size,
          particle.size,
        );
      });
    };

    const markSizeDirty = () => {
      sizeDirty = true;
    };

    animationFrameId = window.requestAnimationFrame(draw);
    window.addEventListener("resize", markSizeDirty);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", markSizeDirty);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
}
