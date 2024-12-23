import React from "react";
import "./Link.css";

interface LinkProps {
  useUnderline?: boolean,
  textColor?: string,
  text?: string,
  href?: string,
  openInNewTab?: boolean
}

const Link: React.FC<LinkProps> = ({
  useUnderline = true,
  textColor = "var(--secondary-text-color)",
  text,
  href,
  openInNewTab = true
}) => {

  return <a
    style={{ color: textColor }}
    className={useUnderline ? "link" : "link-without-underline"}
    href={href}
    rel="noopener noreferrer"
    target={openInNewTab ? "_blank" : undefined}
  >{text ?? "{text}"}</a>
}

export { Link };
