import React from "react";
import styles from "./route_link.module.css";
import { Link as RouterLink } from "react-router-dom";

interface RouteLinkProps {
  useChildrenInsteadOfText?: boolean,
  to: string,
  useUnderline?: boolean,
  textColor?: string,
  text?: string,
  children?: React.ReactNode
}

const RouteLink: React.FC<RouteLinkProps> = ({
  useChildrenInsteadOfText = false,
  to,
  useUnderline = true,
  textColor = "var(--secondary-text-color)",
  text,
  children
}) => {

  return (
    <RouterLink
      to={to}>
      {!useChildrenInsteadOfText && (<h2
        style={{ color: textColor }}
        className={useUnderline ? `${styles.link}` : `${styles.linkWithoutUnderline}`}
      >{text ?? "{text}"}
      </h2>)}
      {useChildrenInsteadOfText && (children)}
    </RouterLink>
  )
}

export { RouteLink };
