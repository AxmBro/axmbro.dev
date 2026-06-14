import { ReactNode, type CSSProperties } from "react";
import styles from './screen-section.module.scss';

/**
 * Bordered content section with optional title block.
 * Set id for hash links (see anchors.ts). Use tightChildrenGap on dense pages (e.g. project detail).
 */
interface ScreenSectionProps {
  /** Hash target - pair with Link or HashLink href. */
  id?: string;
  title?: ReactNode;
  titleDescription?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  /** Padding around title block. @default true */
  withHeaderPadding?: boolean;
  /** Padding around children. @default true */
  withChildrenPadding?: boolean;
  /** Smaller gap between title and content (project detail pages). */
  tightChildrenGap?: boolean;
  /** @default h2 */
  headingLevel?: "h1" | "h2" | "h3";
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
  tightChildrenGap = false,
  headingLevel = "h2"
}: ScreenSectionProps) => {
  const HeadingTag = headingLevel;

  return (
    <section className={`${styles.section} ${className || ""}`} id={id} style={style}>
      {(title || titleDescription) && (
        <div className={`
          ${styles.titleBlock} 
          ${withHeaderPadding ? styles.hasPadding : ''} 
          ${!children ? styles.noChildren : ''}
        `}>
          {title && <HeadingTag className={styles.title}>{title}</HeadingTag>}
          {titleDescription && <div className={styles.description}>{titleDescription}</div>}
        </div>
      )}
      {children && (
        <div
          className={`${styles.childrenContainer} ${withChildrenPadding ? styles.hasPadding : ""} ${title || titleDescription ? styles.belowTitle : ""} ${tightChildrenGap ? styles.tightGap : ""}`}
        >
          {children}
        </div>
      )}
    </section>
  );
};

interface ScreenSectionListProps {
  title?: string;
  items: { name: string; value?: ReactNode }[];
  style?: CSSProperties;
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
}

export const ScreenSectionList = ({ title, items, style, className, headingLevel = "h3" }: ScreenSectionListProps) => {
  const HeadingTag = headingLevel;
  return (
    <div className={`${styles.listContainer} ${className || ""}`} style={style}>
      {title && <HeadingTag className={styles.listTitle}>{title}</HeadingTag>}
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
