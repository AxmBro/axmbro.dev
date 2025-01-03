import React, { ReactNode } from "react";
import styles from "./button.module.css";

interface ButtonProps {
  buttonColor?: ButtonColor,
  text?: string,
  children?: ReactNode,
  style?: React.CSSProperties;
  onClick?: () => void;
}

enum ButtonColor {
  defaultEmpty = "defaultEmpty",
  defaultEmpty2 = "defaultEmpty2",
  default = "default",
  blue = "blue",
}

const Button: React.FC<ButtonProps> = ({
  buttonColor = ButtonColor.defaultEmpty,
  text,
  children,
  style,
  onClick
}) => {
  return (
    <div className={styles.button} data-color={buttonColor} style={style} onClick={onClick}>
      <div className={styles.buttonInner}>
        {text && text}
        {children}
      </div>
    </div>
  )
}

export { Button, ButtonColor };
