"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { TrackRecordStat } from "./lib/get-track-record-stats";
import { useReducedMotion, useRevealInView } from "@/shared/ui/motion";
import { STAT_COLOR_REVEAL_MS, AnimatedStat } from "./animated-stat";
import styles from "./track-record.module.scss";

interface TrackRecordStatsProps {
  stats: TrackRecordStat[];
  emptyCellsCount: number;
}

interface TrackRecordStatCellProps {
  value: string;
  label: string;
  replayKey: number;
  onReplay: () => void;
}

function TrackRecordStatCell({
  value,
  label,
  replayKey,
  onReplay,
}: TrackRecordStatCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const startWhen = useRevealInView(ref, { once: false, margin: "0px" });
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isSweeping, setIsSweeping] = useState(false);
  const wasActiveRef = useRef(false);

  const triggerSweep = useCallback(() => {
    if (reduceMotion) return;

    setIsSweeping(false);
    requestAnimationFrame(() => setIsSweeping(true));
  }, [reduceMotion]);

  useEffect(() => {
    if (!startWhen) {
      wasActiveRef.current = false;
      return;
    }

    if (!wasActiveRef.current) {
      wasActiveRef.current = true;
      triggerSweep();
    }
  }, [startWhen, triggerSweep]);

  useEffect(() => {
    if (replayKey > 0) {
      // Defer past the effect body: the rAF reset-then-set needs a frame between writes.
      const frame = requestAnimationFrame(triggerSweep);
      return () => cancelAnimationFrame(frame);
    }
  }, [reduceMotion, replayKey, triggerSweep]);

  useEffect(() => {
    if (!isSweeping || reduceMotion) return;

    const timeoutId = window.setTimeout(() => {
      setIsSweeping(false);
    }, STAT_COLOR_REVEAL_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isSweeping, reduceMotion]);

  const handlePointerEnter = () => {
    onReplay();
    setIsHovered(true);
  };

  const valueClassName = [
    styles.value,
    !reduceMotion && isSweeping ? styles.valueColorReveal : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={styles.stat}
      data-hovered={isHovered ? "true" : "false"}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovered(false)}
    >
      <AnimatedStat
        className={valueClassName}
        value={value}
        replayKey={replayKey}
        startWhen={startWhen}
      />
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export function TrackRecordStats({
  stats,
  emptyCellsCount,
}: TrackRecordStatsProps) {
  const [replayKeys, setReplayKeys] = useState<Record<number, number>>({});

  const replayStat = (index: number) => {
    setReplayKeys((current) => ({
      ...current,
      [index]: (current[index] ?? 0) + 1,
    }));
  };

  return (
    <div
      className={styles.stats}
      style={
        {
          "--stat-color-duration": `${STAT_COLOR_REVEAL_MS}ms`,
        } as CSSProperties
      }
    >
      {stats.map(({ value, label }, index) => (
        <TrackRecordStatCell
          key={label}
          value={value}
          label={label}
          replayKey={replayKeys[index] ?? 0}
          onReplay={() => replayStat(index)}
        />
      ))}

      {Array.from({ length: emptyCellsCount }).map((_, index) => (
        <div
          key={`empty-${index}`}
          className={`${styles.stat} ${styles.empty}`}
        />
      ))}
    </div>
  );
}
