import React, { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  title?: string
  description?: string
  style?: React.CSSProperties;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  style,
  children
}) => {
  return (
    <div className={styles.card} style={style}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.description}>{description}</h2>
      {children}
    </div>
  )
}

export { Card };