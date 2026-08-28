import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectsBoardButton } from "@/shared/ui/projects-tag-link";
import { EXPERIENCE_TREE } from "@/shared/constants/data";
import styles from "./experience-grid.module.scss";

export const ExperienceGrid = () => {
  return (
    <div className={styles.experienceVerticalGrid}>
      {EXPERIENCE_TREE.map((exp) => (
        <div key={`${exp.role}-${exp.company}`} className={styles.expVerticalItem}>
          <div className={styles.expHeader}>
            <div className={styles.expHeaderMain}>
              <span className={styles.expRole}>{exp.role}</span>
              <span className={styles.expCompany}>{exp.company}</span>
            </div>
            <span className={styles.expDate}>{exp.date}</span>
          </div>
          <div className={styles.expTextContent}>
            <ul className={styles.expListMinimal}>
              {exp.items.map((item, i) => (
                <li key={i}>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
            {exp.buttons && exp.buttons.length > 0 && (
              <ButtonGroup className={styles.expActions}>
                {exp.buttons.map((btn, i) => (
                  btn.projectsTab ? (
                    <ProjectsBoardButton
                      key={btn.text}
                      text={btn.text}
                      tab={btn.projectsTab}
                      variant={buttonVariantForIndex(i)}
                    />
                  ) : btn.href ? (
                    <Button
                      key={btn.text}
                      variant={buttonVariantForIndex(i)}
                      text={btn.text}
                      href={btn.href}
                    />
                  ) : null
                ))}
              </ButtonGroup>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
