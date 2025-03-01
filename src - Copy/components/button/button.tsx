import React, { ReactNode } from "react";
import styles from "./button.module.css";

interface ButtonProps {
  buttonColor?: ButtonColor,
  text?: string,
  children?: ReactNode,
  style?: React.CSSProperties;
  onClick?: () => void;
  childrenFirstRender?: boolean,
  type?: "submit" | "reset" | "button" | undefined;
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
  type,
  onClick
}) => {
  const buttonContent = (
    <div className={styles.buttonInner}>
      {childrenFirstRender && children}
      {text && text}
      {!childrenFirstRender && children}
    </div>
  );

  return (
    <>
      {type ? (
        <button type={type} className={styles.button} data-color={buttonColor} style={style} onClick={onClick}>
          {buttonContent}
        </button>
      ) : (
        <div className={styles.button} data-color={buttonColor} style={style} onClick={onClick}>
          {buttonContent}
        </div>
      )}
    </>
  );
}

export { Button, ButtonColor };
