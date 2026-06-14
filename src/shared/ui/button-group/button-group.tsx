import { ReactNode } from "react";
import styles from "./button-group.module.scss";

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  align?: "start" | "center";
  padInline?: boolean;
  marginBottom?: boolean;
  padBottom?: boolean;
  marginTop?: boolean;
}

export const ButtonGroup = ({
  children,
  className,
  align = "start",
  padInline = false,
  marginBottom = false,
  padBottom = false,
  marginTop = false,
}: ButtonGroupProps) => (
  <div
    className={[styles.group, className].filter(Boolean).join(" ")}
    data-align={align === "center" ? "center" : undefined}
    data-pad-inline={padInline || undefined}
    data-margin-bottom={marginBottom || undefined}
    data-pad-bottom={padBottom || undefined}
    data-margin-top={marginTop || undefined}
  >
    {children}
  </div>
);
