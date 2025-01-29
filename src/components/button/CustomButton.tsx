import React, { ReactNode, useState } from "react";
import styles from "./CustomButton.module.css";

interface CustomButtonProps {
  text: string,
  textContant?: string,
  textColor?: string,
  border: { r: number, g: number, b: number },
  children?: ReactNode,
  style?: React.CSSProperties;
  onClick?: () => void;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  textContant,
  textColor = "var(--text-color-1)",
  border,
  children,
  style,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const defaultStyles = {
    color: textColor,
    backgroundColor: `rgba(${border.r}, ${border.g}, ${border.b}, 0.1)`,
    // border: `var(--border-width) solid rgba(${border.r}, ${border.g}, ${border.b}, 0.5)`,
  }

  const hoverStyles = {
    backgroundColor: `rgba(${border.r}, ${border.g}, ${border.b}, 0.2)`,
    // border: `var(--border-width) solid rgba(${border.r}, ${border.g}, ${border.b}, 1)`,
  }

  return (
    <div
      className={styles.customButton}
      style={{ ...style, ...defaultStyles, ...(isHovered && hoverStyles) }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className={styles.customButtonInner}>
        <p style={{ color: "var(--text-color-1)" }}>
          {text}
          {textContant && (<span>: <span style={{
            color: `rgb(${border.r}, ${border.g}, ${border.b})`
          }}>{`${textContant}`}</span></span>)}
        </p>
        {children}
      </div>
    </div>
  )
}

export { CustomButton };
