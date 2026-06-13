import { HashLink } from "@/shared/ui/hash-link";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { contactSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import type { LegalItem } from "@/shared/constants/legal";
import styles from "./legal-page.module.scss";

interface LegalPageProps {
  id: string;
  title: string;
  intro: string;
  lastUpdated: string;
  items: LegalItem[];
  contactBlurb: string;
}

export const LegalPage = ({
  id,
  title,
  intro,
  lastUpdated,
  items,
  contactBlurb,
}: LegalPageProps) => {
  return (
    <ScreenContainer>
      <ScreenSection
        id={id}
        title={title}
        headingLevel="h1"
        titleDescription={
          <div className={styles.headerDescWrapper}>
            <p>{intro}</p>
            <p className={styles.lastUpdated}>Last updated: {lastUpdated}.</p>
          </div>
        }
        withChildrenPadding={false}
      >
        <ul className={styles.itemList}>
          {items.map((item, index) => (
            <li key={index} className={styles.item}>
              <h2 className={styles.itemTitle}>{item.title}</h2>
              <p className={styles.itemText}>{item.text}</p>
            </li>
          ))}
          <li className={styles.item}>
            <h2 className={styles.itemTitle}>Contact</h2>
            <p className={styles.itemText}>
              {contactBlurb}{" "}
              <HashLink href={contactSectionHref(SECTION_IDS.sendMessage)} className={styles.link}>
                /contact#send-message
              </HashLink>
            </p>
          </li>
        </ul>
      </ScreenSection>
    </ScreenContainer>
  );
};
