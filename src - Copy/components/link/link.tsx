import React from "react";
import styles from "./Link.module.css";

interface LinkProps {
  style?: React.CSSProperties,
  useButtonFontHeight?: boolean,
  useUnderline?: boolean,
  textColor?: string,
  text?: string,
  href?: string,
  openInNewTab?: boolean,
  children?: React.ReactNode
}

const Link: React.FC<LinkProps> = ({
  style,
  useButtonFontHeight = false,
  useUnderline = true,
  textColor = "var(--text-color-2)",
  text,
  href,
  openInNewTab = true,
  children
}) => {

  return (
    <>
      {!children && (<a
        style={{ color: textColor, fontWeight: useButtonFontHeight ? "600" : "500", ...style }}
        className={useUnderline ? `${styles.link}` : `${styles.linkWithoutUnderline}`}
        href={href}
        rel="noopener noreferrer"
        target={openInNewTab ? "_blank" : undefined}
      >{text ?? "{text}"}
      </a >)
      }
      {
        children && (
          <a
            style={{ ...style }}
            href={href}
            rel="noopener noreferrer"
            target={openInNewTab ? "_blank" : undefined}
          >
            {children}
          </a>
        )
      }
    </>
  )
}

export { Link };
