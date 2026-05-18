import { ReactNode } from "react";
import styles from "./screen-container.module.scss";

interface ScreenContainerProps {
  children: ReactNode;
  style?: React.CSSProperties;
  id?: string;
  className?: string;
}

export const ScreenContainer = ({
  children,
  style,
  id,
  className,
}: ScreenContainerProps) => {
  return (
    <div id={id} className={className || ""}>
      <div className={styles.screenContainer} style={style}>
        <div className={styles.screenContent}>
          {children}
        </div>
      </div>
    </div>
  );
};
