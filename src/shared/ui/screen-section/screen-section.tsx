import type { ReactNode } from "react";
import { SectionEyebrow } from "./section-eyebrow";
import styles from "./screen-section.module.scss";

type ScreenSectionVariant = "default" | "accent";

interface ScreenSectionProps {
  id?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  titleDescription?: ReactNode;
  children?: ReactNode;
  className?: string;
  withChildrenPadding?: boolean;
  grid?: "top" | "bottom" | "none";
  gridMesh?: "grid" | "lines";
  headingLevel?: "h1" | "h2" | "h3";
  variant?: ScreenSectionVariant;
}

const variantClass = (variant: ScreenSectionVariant | undefined) => {
  if (variant === "accent") return styles.accent;
  return "";
};

export const ScreenSection = ({
  id,
  eyebrow,
  title,
  titleDescription,
  children,
  className,
  withChildrenPadding = true,
  grid,
  gridMesh = "grid",
  headingLevel = "h2",
  variant,
}: ScreenSectionProps) => {
  const HeadingTag = headingLevel;
  const hasHeader = Boolean(eyebrow || title || titleDescription);

  return (
    <section
      className={`${styles.section} ${variantClass(variant)} ${className || ""}`}
      id={id}
      data-plain={variant === "default" ? "" : undefined}
      data-grid={grid}
      data-grid-mesh={gridMesh}
      data-grid-surface={grid === "top" || grid === "bottom" ? "" : undefined}
      data-accent-surface={variant === "accent" ? "" : undefined}
    >
      {hasHeader && (
        <div
          className={`${styles.titleBlock} ${styles.hasPadding} ${!children ? styles.noChildren : ""}`}
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
          className={`${styles.childrenContainer} ${withChildrenPadding ? styles.hasPadding : ""} ${hasHeader ? styles.belowTitle : ""}`}
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
  headingLevel?: "h2" | "h3" | "h4";
}

export const ScreenSectionList = ({
  title,
  items,
  headingLevel = "h3",
}: ScreenSectionListProps) => {
  const HeadingTag = headingLevel;
  return (
    <div className={styles.listContainer}>
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
