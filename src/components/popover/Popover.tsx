import React from "react";
import styles from "./Popover.module.css";

interface PopoverProps {
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ children }) => {
  return (
    <div className={styles.popover}>
      {children}
    </div>
  );
};

export { Popover };
