import type { CommissionInfoItem } from "@/shared/constants/data";
import styles from "./commission-info-grid.module.scss";

interface CommissionInfoGridProps {
  items: CommissionInfoItem[];
}

export const CommissionInfoGrid = ({ items }: CommissionInfoGridProps) => (
  <div className={styles.grid}>
    {items.map((item) => (
      <article key={item.title} className={styles.card}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </article>
    ))}
  </div>
);
