import { HOME_PAGE_TEXTS, SKILLS_CARDS, type SkillCard } from "@/shared/constants/data";
import { getSkillLevel } from "./lib/get-skill-level";
import { SkillValue } from "./skill-value";
import styles from "./skills-grid.module.scss";

// Learning-stage skills collapse into one "Familiar with" row: a "Beginner" tier per line reads junior to a buyer.
const FAMILIAR_SKILL_VALUE = "Beginner";
// "A, B, and C" - plain prose list; skill names may contain "&" but never commas.
const FAMILIAR_LIST_FORMAT = new Intl.ListFormat("en", { type: "conjunction" });

function FamiliarSkillsRow({ items }: { items: SkillCard["items"] }) {
  const names = items
    .filter((item) => item.value === FAMILIAR_SKILL_VALUE)
    .map((item) => item.name);

  if (names.length === 0) return null;

  const { tier } = getSkillLevel(FAMILIAR_SKILL_VALUE);

  return (
    <li>
      <span>
        {HOME_PAGE_TEXTS.skills.familiarLabel}:{" "}
        <SkillValue label={FAMILIAR_LIST_FORMAT.format(names)} tier={tier} />
      </span>
    </li>
  );
}

export const SkillsGrid = () => {
  return (
    <div className={styles.skillsGridConnected}>
      {SKILLS_CARDS.map((group) => (
        <div
          key={group.titleNote ? `${group.title}-${group.titleNote}` : group.title}
          className={styles.skillGroupItem}
        >
          <div className={styles.skillHeader}>
            <div className={styles.skillHeaderMain}>
              <h3 className={styles.skillTitle}>{group.title}</h3>
              {group.titleNote ? (
                <span className={styles.skillTitleNote}>
                  ({group.titleNote})
                </span>
              ) : null}
            </div>
          </div>
          <div className={styles.skillTextContent}>
            <ul className={styles.skillListMinimal}>
              {group.items
                .filter((item) => item.value !== FAMILIAR_SKILL_VALUE)
                .map((item) => {
                  const { tier, label } = getSkillLevel(item.value);

                  return (
                    <li key={item.name}>
                      <span>
                        {item.name}: <SkillValue label={label} tier={tier} />
                      </span>
                    </li>
                  );
                })}
              <FamiliarSkillsRow items={group.items} />
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
