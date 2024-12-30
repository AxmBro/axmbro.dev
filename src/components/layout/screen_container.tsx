import React, { ReactNode } from "react";
import styles from "./screen_container.module.css";

const ScreenContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.screenContainer}>
      <div className={styles.screenContent}>
        {children}
      </div>
    </div>
  )
}

export { ScreenContainer };
