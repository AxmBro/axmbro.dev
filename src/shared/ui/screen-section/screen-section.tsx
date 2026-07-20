import type { CSSProperties, ReactNode } from "react";
import { SectionEyebrow } from "./section-eyebrow";
import styles from "./screen-section.module.scss";

interface ScreenSectionProps {
  id?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  titleDescription?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  withHeaderPadding?: boolean;
  withChildrenPadding?: boolean;
  tightChildrenGap?: boolean;
  headingLevel?: "h1" | "h2" | "h3";
}

export const ScreenSection = ({
  id,
  eyebrow,
  title,
  titleDescription,
  children,
  style,
  className,
  withHeaderPadding = true,
  withChildrenPadding = true,
  tightChildrenGap = false,
  headingLevel = "h2",
}: ScreenSectionProps) => {
  const HeadingTag = headingLevel;
  const hasHeader = Boolean(eyebrow || title || titleDescription);

  return (
    <section className={`${styles.section} ${className || ""}`} id={id} style={style}>
      {hasHeader && (
        <div
          className={`
          ${styles.titleBlock} 
          ${withHeaderPadding ? styles.hasPadding : ""} 
          ${!children ? styles.noChildren : ""}
        `}
        >
          {eyebrow != null && eyebrow !== "" && (
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          )}
          {title && <HeadingTag className={styles.title}>{title}</HeadingTag>}
          {titleDescription && (
            <div className={styles.description}>{titleDescription}</div>
          )}
        </div>
      )}
      {children && (
        <div
          className={`${styles.childrenContainer} ${withChildrenPadding ? styles.hasPadding : ""} ${hasHeader ? styles.belowTitle : ""} ${tightChildrenGap ? styles.tightGap : ""}`}
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

export const ScreenSectionList = ({
  title,
  items,
  style,
  className,
  headingLevel = "h3",
}: ScreenSectionListProps) => {
  const HeadingTag = headingLevel;
  return (
    <div className={`${styles.listContainer} ${className || ""}`} style={style}>
      {title && <HeadingTag className={styles.listTitle}>{title}</HeadingTag>}
      <ul className={styles.listMinimal}>
        {items.map((item, index) => (
          <li key={index}>
            <span>
              {item.name}
              {item.value ? ": " : ""}
              {item.value && <span className={styles.listValue}>{item.value}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
