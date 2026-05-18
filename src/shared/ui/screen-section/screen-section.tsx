import React, { ReactNode } from 'react';
import styles from './screen-section.module.scss';

interface ScreenSectionProps {
  id?: string;
  title?: ReactNode;
  titleDescription?: ReactNode;
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  withHeaderPadding?: boolean;
  withChildrenPadding?: boolean;
  headingTag?: "h1" | "h2" | "h3";
}

export const ScreenSection = ({
  id,
  title,
  titleDescription,
  children,
  style,
  className,
  withHeaderPadding = true,
  withChildrenPadding = true,
  headingTag: Heading = "h1"
}: ScreenSectionProps) => {
  return (
    <section className={`${styles.section} ${className || ""}`} id={id} style={style}>
      {(title || titleDescription) && (
        <div className={`
          ${styles.titleBlock} 
          ${withHeaderPadding ? styles.hasPadding : ''} 
          ${!children ? styles.noChildren : ''}
        `}>
          {title && <Heading className={styles.title}>{title}</Heading>}
          {titleDescription && <div className={styles.description}>{titleDescription}</div>}
        </div>
      )}
      {children && (
        <div className={`${styles.childrenContainer} ${withChildrenPadding ? styles.hasPadding : ''}`}>
          {children}
        </div>
      )}
    </section>
  );
};

interface ScreenSectionListProps {
  title?: string;
  items: { name: string; value?: React.ReactNode; valueColor?: string }[];
  style?: React.CSSProperties;
  className?: string;
}

export const ScreenSectionList = ({ title, items, style, className }: ScreenSectionListProps) => {
  return (
    <div className={`${styles.listContainer} ${className || ""}`} style={style}>
      {title && <h2 className={styles.listTitle}>{title}</h2>}
      <div className={styles.listItemsWrapper}>
        {items.map((item, index) => (
          <div key={index} className={styles.listItem}>
            <span>{item.name}{item.value ? ': ' : ''}</span>
            {item.value && <span className={styles.listValue}>{item.value}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
