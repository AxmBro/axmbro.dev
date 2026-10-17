"use client";

import { useEffect, useState } from "react";
import { FOOTER_TEXTS } from "@/shared/constants/data";
import styles from "./footer.module.scss";

const { label, placeholder, zone } = FOOTER_TEXTS.localTime;

const WARSAW_TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Warsaw",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export const LocalTime = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => setTime(WARSAW_TIME_FORMAT.format(new Date()));

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <p className={styles.localTime}>
        {label} {placeholder}
      </p>
    );
  }

  return (
    <p className={styles.localTime}>
      {label}{" "}
      <span>
        {time} {zone}
      </span>
    </p>
  );
};
