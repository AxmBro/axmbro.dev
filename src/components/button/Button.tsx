import React, { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  buttonColor?: ButtonColor,
  text?: string,
  children?: ReactNode,
  style?: React.CSSProperties;
  onClick?: () => void;
  childrenFirstRender?: boolean,
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
  childrenFirstRender = false,
  onClick
}) => {
  return (
    <div className={styles.button} data-color={buttonColor} style={style} onClick={onClick}>
      <div className={styles.buttonInner}>
        {childrenFirstRender && children}
        {text && text}
        {!childrenFirstRender && children}
      </div>
    </div>
  )
}

export { Button, ButtonColor };
