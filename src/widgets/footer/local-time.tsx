"use client";

import { useEffect, useState } from "react";
import styles from "./footer.module.scss";

export const LocalTime = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Warsaw",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(now));
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <p className={styles.localTime}>Local time in Poland: --:--</p>;

  return (
    <p className={styles.localTime}>
      Local time in Poland: <span>{time} (GMT+1/GMT+2)</span>
    </p>
  );
};
