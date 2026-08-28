"use client";

import { useRef, useState } from "react";
import type { TrackRecordStat } from "./lib/get-track-record-stats";
import { useRevealInView } from "@/shared/ui/motion";
import { AnimatedStat } from "./animated-stat";
import styles from "./track-record.module.scss";

interface TrackRecordStatsProps {
  stats: TrackRecordStat[];
  emptyCellsCount: number;
}

export function TrackRecordStats({
  stats,
  emptyCellsCount,
}: TrackRecordStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const startWhen = useRevealInView(ref);
  const [replayKeys, setReplayKeys] = useState<Record<number, number>>({});

  const replayStat = (index: number) => {
    setReplayKeys((current) => ({
      ...current,
      [index]: (current[index] ?? 0) + 1,
    }));
  };

  return (
    <div ref={ref} className={styles.stats}>
      {stats.map(({ value, label }, index) => (
        <div
          key={label}
          className={styles.stat}
          onPointerEnter={() => replayStat(index)}
        >
          <AnimatedStat
            className={styles.value}
            value={value}
            replayKey={replayKeys[index]}
            startWhen={startWhen}
          />
          <span className={styles.label}>{label}</span>
        </div>
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
