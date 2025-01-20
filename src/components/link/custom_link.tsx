import React from "react";
import styles from "./custom_link.module.css";

interface LinkProps {
  useUnderline?: boolean,
  textColor?: string,
  text?: string,
  href?: string,
  openInNewTab?: boolean,
  children?: React.ReactNode
}

const Link: React.FC<LinkProps> = ({
  useUnderline = true,
  textColor = "var(--secondary-text-color)",
  text,
  href,
  openInNewTab = true,
  children
}) => {

  return (
    <>
      {!children && (<a
        style={{ color: textColor }}
        className={useUnderline ? `${styles.link}` : `${styles.linkWithoutUnderline}`}
        href={href}
        rel="noopener noreferrer"
        target={openInNewTab ? "_blank" : undefined}
      >{text ?? "{text}"}
      </a>)}
      {children && (
        <a
          href={href}
          rel="noopener noreferrer"
          target={openInNewTab ? "_blank" : undefined}
        >
          {children}
        </a>
      )}
    </>
  )
}

export { Link };
