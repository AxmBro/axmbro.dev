import type { CommissionInfoItem } from "@/shared/constants/data";
import styles from "./info-cards-grid.module.scss";

interface InfoCardsGridProps {
  items: CommissionInfoItem[];
}

export const InfoCardsGrid = ({ items }: InfoCardsGridProps) => (
  <div className={styles.grid}>
    {items.map((item) => (
      <article key={item.title} className={styles.card}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </article>
    ))}
  </div>
);
