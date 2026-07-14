"use client";

import { useState } from "react";
import type { TrackRecordStat } from "./lib/get-track-record-stats";
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
  const [replayKeys, setReplayKeys] = useState<Record<number, number>>({});

  const replayStat = (index: number) => {
    setReplayKeys((current) => ({
      ...current,
      [index]: (current[index] ?? 0) + 1,
    }));
  };

  return (
    <div className={styles.stats}>
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
