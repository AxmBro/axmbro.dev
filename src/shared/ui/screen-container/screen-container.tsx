import { ReactNode } from "react";
import { GridBackdrop } from "@/shared/ui/grid-backdrop";
import { ScreenContent } from "./screen-content";
import styles from "./screen-container.module.scss";

interface ScreenContainerProps {
  children: ReactNode;
  /** Off where a custom hero owns the top of the page (project detail). */
  withGridBackdrop?: boolean;
}

export const ScreenContainer = ({
  children,
  withGridBackdrop = true,
}: ScreenContainerProps) => (
  <div className={styles.screenContainer} data-screen-container>
    {withGridBackdrop && <GridBackdrop />}
    <ScreenContent>{children}</ScreenContent>
  </div>
);
