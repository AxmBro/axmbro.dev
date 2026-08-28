"use client";

import { useEffect, useRef } from "react";
import { isReducedMotion } from "@/shared/lib/motion";
import styles from "./ambient-pixels.module.scss";

const FADE_IN_PX = 120;
const FADE_OUT_PX = 140;
const MIN_PIXEL_SIZE = 3;
const MAX_PIXEL_SIZE = 10;
const PIXEL_SIZE_SKEW = 1.6;
const DEATH_FADE_MS = 900;
const MIN_LIFESPAN_MS = 2_000;
const MIN_SPEED_PX_PER_S = 10;
const MAX_SPEED_PX_PER_S = 20;
const MAX_PARTICLES = 16;
const MIN_PARTICLES = 8;
const WHITE = { red: 247, green: 247, blue: 247 };

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  ageMs: number;
  lifespanMs: number;
  dyingMs: number;
}

const getHeaderBottom = () => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-sticky-height")
    .trim();
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 64;
};

const edgeAlpha = (y: number, height: number, headerBottom: number) => {
  const rise = height - y;
  const fadeIn = rise < FADE_IN_PX ? Math.max(0, rise / FADE_IN_PX) : 1;
  const fadeOut =
    y < headerBottom + FADE_OUT_PX
      ? Math.max(0, (y - headerBottom) / FADE_OUT_PX)
      : 1;

  return Math.min(fadeIn, fadeOut);
};

const randomSpeed = () =>
  MIN_SPEED_PX_PER_S + Math.random() * (MAX_SPEED_PX_PER_S - MIN_SPEED_PX_PER_S);

const randomOpacity = () => 0.18 + Math.random() * 0.28;

const randomSize = () => {
  const t = 1 - Math.random() ** PIXEL_SIZE_SKEW;
  return Math.round(
    MIN_PIXEL_SIZE + t * (MAX_PIXEL_SIZE - MIN_PIXEL_SIZE),
  );
};

const lifespanFor = (
  height: number,
  headerBottom: number,
  speed: number,
  spawnY: number,
) => {
  const travelPx = Math.max(1, spawnY - headerBottom + FADE_IN_PX);
  const fullTravelMs = (travelPx / speed) * 1000;
  const extraMs = Math.random() ** 0.42 * fullTravelMs * 1.4;
  return Math.max(MIN_LIFESPAN_MS, fullTravelMs * 1.05 + extraMs);
};

const spawnParticle = (
  width: number,
  height: number,
  headerBottom: number,
  options: { atBottom?: boolean; staggerAge?: boolean } = {},
): Particle => {
  const size = randomSize();
  const speed = randomSpeed();
  const atBottom = options.atBottom ?? false;
  const y = atBottom
    ? height - size - Math.random() * 48
    : Math.random() * Math.max(1, height - size);
  const lifespanMs = lifespanFor(height, headerBottom, speed, y);

  return {
    x: Math.random() * Math.max(1, width - size),
    y,
    size,
    speed,
    opacity: randomOpacity(),
    ageMs: options.staggerAge ? Math.random() * lifespanMs : 0,
    lifespanMs,
    dyingMs: 0,
  };
};

const targetParticleCount = (width: number, height: number) => {
  const area = width * height;
  const scaled = Math.round(area / 93_000);
  return Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, scaled));
};

const seedParticles = (
  width: number,
  height: number,
  headerBottom: number,
  count: number,
) =>
  Array.from({ length: count }, () =>
    spawnParticle(width, height, headerBottom, { staggerAge: true }),
  );

const respawnParticle = (
  particle: Particle,
  width: number,
  height: number,
  headerBottom: number,
) => {
  Object.assign(
    particle,
    spawnParticle(width, height, headerBottom, { atBottom: true }),
  );
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
    let particles: Particle[] = [];
    let animationFrameId = 0;
    let lastTimestamp = 0;
    let headerBottom = getHeaderBottom();

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
        particles = seedParticles(width, height, headerBottom, nextCount);
        return;
      }

      if (particles.length > nextCount) {
        particles.length = nextCount;
      } else if (particles.length < nextCount) {
        particles.push(
          ...seedParticles(
            width,
            height,
            headerBottom,
            nextCount - particles.length,
          ),
        );
      }

      for (const particle of particles) {
        particle.x = Math.min(particle.x, Math.max(0, width - particle.size));
        particle.y = Math.min(particle.y, Math.max(0, height - particle.size));
      }
    };

    const draw = (timestamp: number) => {
      const deltaMs = lastTimestamp ? timestamp - lastTimestamp : 16;
      lastTimestamp = timestamp;

      context.clearRect(0, 0, width, height);
      headerBottom = getHeaderBottom();

      for (const particle of particles) {
        if (!reducedMotion) {
          particle.ageMs += deltaMs;
          particle.y -= (particle.speed * deltaMs) / 1000;

          const reachedTop = particle.y < headerBottom - particle.size;
          const lifespanOver = particle.ageMs >= particle.lifespanMs;

          if (particle.dyingMs === 0 && (reachedTop || lifespanOver)) {
            particle.dyingMs = 1;
          }

          if (particle.dyingMs > 0) {
            particle.dyingMs += deltaMs;
            if (particle.dyingMs >= DEATH_FADE_MS) {
              respawnParticle(particle, width, height, headerBottom);
            }
          }
        }

        const deathFade =
          particle.dyingMs > 0
            ? Math.max(0, 1 - particle.dyingMs / DEATH_FADE_MS)
            : 1;
        const alpha =
          edgeAlpha(particle.y, height, headerBottom) *
          particle.opacity *
          deathFade;

        if (alpha <= 0.02) continue;

        context.fillStyle = `rgba(${WHITE.red} ${WHITE.green} ${WHITE.blue} / ${alpha})`;
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
      }

      if (!reducedMotion) {
        animationFrameId = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw(performance.now());

    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
}
