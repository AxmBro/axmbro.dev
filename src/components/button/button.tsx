import { ReactNode } from "react";
import styles from "./button.module.css";

interface ButtonProps {
  buttonColor?: "defaultEmpty" | "defaultEmpty2" | "default" | "blue"
  text?: string,
  children?: ReactNode,
  style?: React.CSSProperties;
  onClick?: () => void;
  childrenFirstRender?: boolean,
  type?: "submit" | "reset" | "button" | undefined;
}

export const Button = ({
  buttonColor = "defaultEmpty",
  text,
  children,
  style,
  childrenFirstRender = false,
  type,
  onClick
}: ButtonProps) => {
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
