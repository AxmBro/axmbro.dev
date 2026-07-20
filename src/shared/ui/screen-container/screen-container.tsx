import { ReactNode, type CSSProperties } from "react";
import { SectionIndexRoot } from "@/shared/ui/screen-section";
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
        <SectionIndexRoot>
          <div className={styles.screenContent}>{children}</div>
        </SectionIndexRoot>
      </div>
    </div>
  );
};
