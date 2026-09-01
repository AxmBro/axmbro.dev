import type { ReactNode } from "react";
import { SectionFullWidthGrid } from "@/shared/ui/section-full-width-grid";
import { SectionEyebrow } from "./section-eyebrow";
import styles from "./screen-section.module.scss";

type ScreenSectionVariant = "default" | "accent";
type SectionGridFade = "top" | "bottom";

interface ScreenSectionProps {
  id?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  titleMeta?: ReactNode;
  titleDescription?: ReactNode;
  children?: ReactNode;
  className?: string;
  withChildrenPadding?: boolean;
  grid?: SectionGridFade | "none";
  /** Viewport-wide grid behind the section; center fade, extends past section height. */
  fullWidthGrid?: boolean;
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
  titleMeta,
  titleDescription,
  children,
  className,
  withChildrenPadding = true,
  grid,
  fullWidthGrid,
  gridMesh = "grid",
  headingLevel = "h2",
  variant,
}: ScreenSectionProps) => {
  const HeadingTag = headingLevel;
  const hasHeader = Boolean(eyebrow || title || titleDescription);

  const sectionClassName = [
    styles.section,
    variantClass(variant),
    fullWidthGrid ? styles.withFullWidthGrid : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const section = (
    <section
      className={sectionClassName}
      id={id}
      data-plain={variant === "default" ? "" : undefined}
      data-grid={grid}
      data-grid-mesh={gridMesh}
      data-full-width-grid={fullWidthGrid ? "" : undefined}
      data-grid-surface={grid === "top" || grid === "bottom" ? "" : undefined}
      data-accent-surface={variant === "accent" ? "" : undefined}
    >
      {fullWidthGrid && <SectionFullWidthGrid />}
      {hasHeader && (
        <div
          className={`${styles.titleBlock} ${styles.hasPadding} ${!children ? styles.noChildren : ""}`}
        >
          {eyebrow != null && eyebrow !== "" && (
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          )}
          {title &&
            (titleMeta ? (
              <div className={styles.titleRow}>
                <HeadingTag className={styles.title}>{title}</HeadingTag>
                {titleMeta}
              </div>
            ) : (
              <HeadingTag className={styles.title}>{title}</HeadingTag>
            ))}
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

  return section;
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
