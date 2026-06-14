import type { CSSProperties } from "react";
import styles from "./better-bedrock-icon.module.scss";

interface BetterBedrockIconProps {
  size?: number;
  className?: string;
}

export const BetterBedrockIcon = ({ size = 22, className }: BetterBedrockIconProps) => (
  <span
    className={`${styles.icon} ${className ?? ""}`}
    style={{ "--icon-size": `${size}px` } as CSSProperties}
    aria-hidden
  />
);
