import React from "react";
import styles from "./Link.module.css";

interface LinkProps {
  useButtonFontHeight?: boolean,
  useUnderline?: boolean,
  textColor?: string,
  text?: string,
  href?: string,
  openInNewTab?: boolean,
  children?: React.ReactNode
}

const Link: React.FC<LinkProps> = ({
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
        style={{ color: textColor, fontWeight: useButtonFontHeight ? "600" : "500" }}
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
