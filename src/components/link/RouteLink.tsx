import React from "react";
import styles from "./RouteLink.module.css";
import { Link as RouterLink } from "react-router-dom";

interface RouteLinkProps {
  to: string,
  useUnderline?: boolean,
  textColor?: string,
  text?: string,
  children?: React.ReactNode
}

const RouteLink: React.FC<RouteLinkProps> = ({
  to,
  useUnderline = true,
  textColor = "var(--text-color-2)",
  text,
  children
}) => {

  return (
    <RouterLink
      to={to}>
      {!children && (<h2
        style={{ color: textColor }}
        className={useUnderline ? `${styles.link}` : `${styles.linkWithoutUnderline}`}
      >{text}
      </h2>)}
      {children && (children)}
    </RouterLink>
  )
}

export { RouteLink };
