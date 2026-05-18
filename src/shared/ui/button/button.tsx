import { ReactNode } from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  /** 
   * Button variant. 
   * 'primary' (blue), 'secondary' (gray), 'white' (white), 'input' (form input match).
   */
  variant?: "primary" | "secondary" | "white" | "input";
  text?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}

export const Button = ({
  variant = "secondary",
  text,
  children,
  style,
  type = "button",
  onClick
}: ButtonProps) => {

  return (
    <button
      type={type}
      className={styles.button}
      data-variant={variant}
      style={style}
      onClick={onClick}
    >
      {text || children}
    </button>
  );
};
