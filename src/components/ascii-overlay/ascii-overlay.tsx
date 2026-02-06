import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ascii-overlay.module.css";

const ASCII_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>{}[]";

// --- EFFECT CONFIG ---
const CHAR_SIZE = 16;            // Character size in px (grid density)
const TICK_MS = 50;              // Frame interval in ms (lower = smoother)
const TAIL_LENGTH = 20;          // Trail length behind head (in chars)
const SPEED_MIN = 0.7;           // Min fall speed (chars per tick)
const SPEED_VARIATION = 0.7;     // Random range added to min speed
const START_DELAY_FACTOR = 1.2;  // Max random start delay (multiplier of rows)
const FLICKER_CHANCE = 0.08;     // Chance to randomize a char per tick (0–1)
const HEAD_COLOR = "#bbe7ff";    // Head color (brightest point)
const ACCENT_COLOR = "#00a3fc";  // Accent color (chars right behind head)
const TAIL_COLOR = "#00a3fc";    // Tail color (rest of the trail)
const ACCENT_OPACITY = 0.9;      // Accent opacity (0–1)
const TAIL_BRIGHTNESS = 0.7;     // Tail brightness multiplier (0–1)
const ACCENT_LENGTH = 3;         // How many chars behind head use accent color
const OVERLAY_OPACITY = 0.4;    // Global canvas opacity (0–1)

function randomChar(): string {
  return ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
}

const AsciiOverlay = () => {
  const location = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const cols = Math.ceil(w / CHAR_SIZE);
    const rows = Math.ceil(h / CHAR_SIZE);

    // Each column: head position, speed, random chars, accumulator, done flag
    const columns = Array.from({ length: cols }, () => ({
      head: -Math.floor(Math.random() * rows * START_DELAY_FACTOR) - 1,
      speed: SPEED_MIN + Math.random() * SPEED_VARIATION,
      chars: Array.from({ length: rows }, () => randomChar()),
      accum: 0,
      done: false,
    }));

    let lastTick = performance.now();

    const draw = (now: number) => {
      const delta = now - lastTick;

      if (delta >= TICK_MS) {
        lastTick = now;

        ctx.clearRect(0, 0, w, h);
        ctx.font = `bold ${CHAR_SIZE}px "Courier New", monospace`;
        ctx.textAlign = "center";

        for (let c = 0; c < cols; c++) {
          const col = columns[c];
          col.accum += col.speed;

          if (col.accum >= 1) {
            const steps = Math.floor(col.accum);
            col.accum -= steps;
            col.head += steps;

            // Randomly change chars for flicker effect
            for (let r = 0; r < rows; r++) {
              if (Math.random() < FLICKER_CHANCE) {
                col.chars[r] = randomChar();
              }
            }
          }

          const x = c * CHAR_SIZE + CHAR_SIZE / 2;

          for (let r = 0; r < rows; r++) {
            const distFromHead = col.head - r;

            // Only draw chars within the tail behind the head
            if (distFromHead < 0 || distFromHead > TAIL_LENGTH) continue;

            const y = r * CHAR_SIZE + CHAR_SIZE;
            const brightness = 1 - distFromHead / TAIL_LENGTH;

            if (distFromHead === 0) {
              ctx.fillStyle = HEAD_COLOR;
              ctx.globalAlpha = 1;
            } else if (distFromHead <= ACCENT_LENGTH) {
              ctx.fillStyle = ACCENT_COLOR;
              ctx.globalAlpha = ACCENT_OPACITY;
            } else {
              ctx.fillStyle = TAIL_COLOR;
              ctx.globalAlpha = brightness * TAIL_BRIGHTNESS;
            }

            ctx.fillText(col.chars[r], x, y);
          }

          // Check if column has fully passed through the screen
          if (col.head - TAIL_LENGTH > rows) {
            col.done = true;
          }
        }

        ctx.globalAlpha = 1;

        // All columns finished — unmount
        if (columns.every((c) => c.done)) {
          setVisible(false);
          if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
          }
          return;
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className={styles.asciiOverlay}
      style={{ opacity: OVERLAY_OPACITY }}
      aria-hidden="true"
    />
  );
};

export { AsciiOverlay };
