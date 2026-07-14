import Link from "next/link";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { ROUTES } from "@/shared/constants/routes";
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
        eyebrow="Legal"
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
              <Link href={ROUTES.contact} className={styles.link}>
                {ROUTES.contact}
              </Link>
            </p>
          </li>
        </ul>
      </ScreenSection>
    </ScreenContainer>
  );
};
