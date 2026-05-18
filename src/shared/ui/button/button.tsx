import { ReactNode } from "react";
import Link from "next/link";
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
  href?: string;
  external?: boolean;
}

export const Button = ({
  variant = "secondary",
  text,
  children,
  style,
  type = "button",
  onClick,
  href,
  external
}: ButtonProps) => {
  const content = text || children;

  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <a
          href={href}
          className={styles.button}
          data-variant={variant}
          style={style}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={styles.button}
        data-variant={variant}
        style={style}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={styles.button}
      data-variant={variant}
      style={style}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
