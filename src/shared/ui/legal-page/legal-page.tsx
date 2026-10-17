import Link from "next/link";
import { Reveal } from "@/shared/ui/motion";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { contactFormHref } from "@/shared/constants/anchors";
import { LEGAL_PAGE_TEXTS, type LegalItem } from "@/shared/constants/legal";
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
      <Reveal>
        <ScreenSection
          id={id}
          eyebrow={LEGAL_PAGE_TEXTS.eyebrow}
          title={title}
          headingLevel="h1"
          titleDescription={
            <div className={styles.headerDescWrapper}>
              <p>{intro}</p>
              <p className={styles.lastUpdated}>{LEGAL_PAGE_TEXTS.lastUpdated(lastUpdated)}</p>
            </div>
          }
          withChildrenPadding={false}
          variant="default"
        >
          <ul className={styles.itemList}>
            {items.map((item, index) => (
              <li key={index} className={styles.item}>
                <h2 className={styles.itemTitle}>{item.title}</h2>
                <p className={styles.itemText}>{item.text}</p>
              </li>
            ))}
            <li className={styles.item}>
              <h2 className={styles.itemTitle}>{LEGAL_PAGE_TEXTS.contactTitle}</h2>
              <p className={styles.itemText}>
                {contactBlurb}{" "}
                <Link href={contactFormHref()} className={styles.link}>
                  {LEGAL_PAGE_TEXTS.contactLink}
                </Link>
                .
              </p>
            </li>
          </ul>
        </ScreenSection>
      </Reveal>
    </ScreenContainer>
  );
};
