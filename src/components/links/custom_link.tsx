import React from "react";
import styles from "./custom_link.module.css";

interface LinkProps {
  useChildrenInsteadOfText?: boolean,
  useUnderline?: boolean,
  textColor?: string,
  text?: string,
  href?: string,
  openInNewTab?: boolean,
  children?: React.ReactNode
}

const Link: React.FC<LinkProps> = ({
  useChildrenInsteadOfText = false,
  useUnderline = true,
  textColor = "var(--secondary-text-color)",
  text,
  href,
  openInNewTab = true,
  children
}) => {

  return (
    <>
      {!useChildrenInsteadOfText && (<a
        style={{ color: textColor }}
        className={useUnderline ? `${styles.link}` : `${styles.linkWithoutUnderline}`}
        href={href}
        rel="noopener noreferrer"
        target={openInNewTab ? "_blank" : undefined}
      >{text ?? "{text}"}
      </a>)}
      {useChildrenInsteadOfText && (
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
