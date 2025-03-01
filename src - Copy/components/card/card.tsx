import React, { ReactNode } from "react";
import styles from "./card.module.css";

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
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {children}
    </div>
  )
}

export { Card };