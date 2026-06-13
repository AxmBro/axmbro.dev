import styles from "./better-bedrock-icon.module.scss";

interface BetterBedrockIconProps {
  size?: number;
  className?: string;
}

export const BetterBedrockIcon = ({ size = 22, className }: BetterBedrockIconProps) => (
  <span
    className={`${styles.icon} ${className ?? ""}`}
    style={{ width: size, height: size }}
    aria-hidden
  />
);
