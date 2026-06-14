import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { EXPERIENCE_TREE } from "@/shared/constants/data";
import styles from "./experience-grid.module.scss";

export const ExperienceGrid = () => {
  return (
    <div className={styles.experienceVerticalGrid}>
      {EXPERIENCE_TREE.map((exp, index) => (
        <div key={index} className={styles.expVerticalItem}>
          <div className={styles.expHeaderOneLine}>
            <span className={styles.expRoleLine}>
              <span className={styles.expRole}>{exp.role}</span>
              <span className={styles.expAt}> @ </span>
              <span className={styles.expCompany}>{exp.company}</span>
            </span>
            <span className={styles.expDate}>({exp.date})</span>
          </div>
          <div className={styles.expTextContent}>
            <ul className={styles.expListMinimal}>
              {exp.items.map((item, i) => (
                <li key={i}>{item.name}</li>
              ))}
            </ul>
            {exp.buttons && exp.buttons.length > 0 && (
              <ButtonGroup marginTop>
                {exp.buttons.map((btn, i) => (
                    <Button
                      key={i}
                      variant={buttonVariantForIndex(i, exp.buttons!.length)}
                      text={btn.text}
                      href={btn.href}
                    />
                  ))}
              </ButtonGroup>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
