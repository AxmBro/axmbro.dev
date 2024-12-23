import React from "react";
import "./Link.css";

interface LinkProps {
  text?: string,
  href?: string,
  openInNewTab?: boolean
}

const Link: React.FC<LinkProps> = ({
  text,
  href,
  openInNewTab = true
}) => {

  return <a
    className="link"
    href={href}
    rel="noopener noreferrer"
    target={openInNewTab ? "_blank" : undefined }
  >{text ?? "{text}"}</a>
}

export { Link };
