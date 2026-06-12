import { PROCESS_STEPS } from "@/shared/constants/data";
import styles from "./process-grid.module.scss";

export const ProcessGrid = () => {
  return (
    <div className={styles.grid}>
      {PROCESS_STEPS.map((step, index) => (
        <div key={index} className={styles.card}>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.description}>{step.description}</p>
        </div>
      ))}
    </div>
  );
};
