import { ReactNode, type CSSProperties } from "react";
import { ScreenContent } from "./screen-content";
import styles from "./screen-container.module.scss";

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
        <ScreenContent>{children}</ScreenContent>
      </div>
    </div>
  );
};
