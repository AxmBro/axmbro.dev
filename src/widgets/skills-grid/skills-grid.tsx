import { SKILLS_CARDS } from "@/shared/constants/data";
import styles from "./skills-grid.module.scss";

export const SkillsGrid = () => {
  return (
    <div className={styles.skillsGridConnected}>
      {SKILLS_CARDS.map((group, index) => (
        <div key={index} className={styles.skillGroupItem}>
          <div className={styles.skillHeader}>
            <h3 className={styles.skillTitle}>{group.title}</h3>
          </div>
          <div className={styles.skillTextContent}>
            <ul className={styles.skillListMinimal}>
              {group.items.map((item, i) => (
                <li key={i}>
                  <span>
                    {item.name}: <span className={styles.skillValue}>{item.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
