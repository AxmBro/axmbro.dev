import { ReactNode, type CSSProperties } from "react";
import styles from "./screen-container.module.scss";

/** Page wrapper: max-width column, vertical gap between ScreenSections. */
interface ScreenContainerProps {
  children: ReactNode;
  style?: CSSProperties;
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
