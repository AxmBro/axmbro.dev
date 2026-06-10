import { SKILLS_CARDS } from "@/shared/constants/data";
import { ScreenSectionList } from "@/shared/ui/screen-section";
import styles from "./skills-grid.module.scss";

export const SkillsGrid = () => {
  return (
    <div className={styles.skillsGridConnected}>
      {SKILLS_CARDS.map((group, index) => (
        <div key={index} className={styles.skillGroupItem}>
          <ScreenSectionList
            title={group.title}
            items={group.items}
          />
        </div>
      ))}
    </div>
  );
};
