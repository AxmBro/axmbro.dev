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
const MAX_FRAME_DELTA_MS = 48;
const WHITE = "247 247 247";

interface Particle {
  x: number;
  y: number;
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

const randomSpeed = () =>
  randomBetween(MIN_SPEED_PX_PER_S, MAX_SPEED_PX_PER_S);

const randomOpacity = () => randomBetween(MIN_OPACITY, MAX_OPACITY);

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
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = isReducedMotion();
    let width = 0;
    let height = 0;
    let headerBottom = getHeaderBottom();
    let particles: Particle[] = [];
    let animationFrameId = 0;
    let lastTimestamp = 0;

    // Resets a particle in place. `spread` seeds it somewhere in the visible
    // column (full field on first paint); otherwise it enters from below.
    const resetParticle = (particle: Particle, spread: boolean) => {
      particle.size = randomSize();
      particle.speed = randomSpeed();
      particle.opacity = randomOpacity();
      particle.x = Math.random() * Math.max(1, width - particle.size);

      if (spread) {
        const top = headerBottom + particle.size;
        const bottom = height - particle.size;
        particle.y = top + Math.random() * Math.max(1, bottom - top);
      } else {
        particle.y = height + Math.random() * FADE_IN_PX;
      }
    };

    const createParticle = (spread: boolean): Particle => {
      const particle: Particle = {
        x: 0,
        y: 0,
        size: MIN_PIXEL_SIZE,
        speed: MIN_SPEED_PX_PER_S,
        opacity: MIN_OPACITY,
      };
      resetParticle(particle, spread);
      return particle;
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      headerBottom = getHeaderBottom();

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const nextCount = targetParticleCount(width, height);

      if (particles.length === 0) {
        particles = Array.from({ length: nextCount }, () => createParticle(true));
        return;
      }

      if (particles.length > nextCount) {
        particles.length = nextCount;
      } else {
        for (let index = particles.length; index < nextCount; index += 1) {
          particles.push(createParticle(true));
        }
      }

      for (const particle of particles) {
        particle.x = Math.min(particle.x, Math.max(0, width - particle.size));
      }
    };

    const handleVisibilityChange = () => {
      // Drop the stale timestamp so the next frame uses a small delta instead of
      // launching particles across the screen after a backgrounded tab.
      if (document.visibilityState === "visible") lastTimestamp = 0;
    };

    const draw = (timestamp: number) => {
      const elapsed = lastTimestamp ? timestamp - lastTimestamp : 16;
      lastTimestamp = timestamp;
      const deltaMs = Math.min(elapsed, MAX_FRAME_DELTA_MS);

      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        if (!reducedMotion) {
          particle.y -= (particle.speed * deltaMs) / 1000;

          if (particle.y < headerBottom - particle.size) {
            resetParticle(particle, false);
          }
        }

        const alpha = edgeAlpha(particle.y, height, headerBottom) * particle.opacity;
        if (alpha <= 0.02) continue;

        context.fillStyle = `rgba(${WHITE} / ${alpha})`;
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
      }

      if (!reducedMotion) {
        animationFrameId = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw(performance.now());

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
}
