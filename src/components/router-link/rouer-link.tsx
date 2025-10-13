import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface RouterLinkProps {
  to: string;
  underline?: boolean;
  children?: ReactNode;
  className?: string,
  target?: string,
  rel?: string,
  newTab?: boolean,
  style?: React.CSSProperties
}

export const RouterLink = ({ to, underline = false, children, className, target, rel, newTab = false, style }: RouterLinkProps) => {
  return (
    <Link
      rel={rel ? rel : newTab ? "noopener noreferrer" : ""}
      target={target ? target : newTab ? "_blank" : ""}
      className={className}
      style={{ textDecoration: underline ? "underline" : "none", ...style }}
      to={to}>
      {children}
    </Link>
  )
}