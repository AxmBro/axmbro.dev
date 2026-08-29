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

  return (
    <div
      ref={ref}
      className={styles.stat}
      onPointerEnter={onReplay}
    >
      <AnimatedStat
        className={styles.value}
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
    <div className={styles.stats}>
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
