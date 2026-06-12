import { Metadata } from "next";
import Link from "next/link";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { TERMS_OF_USE_ITEMS } from "@/shared/constants/legal";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsOfUsePage() {
  return (
    <ScreenContainer>
      <ScreenSection
        id="termsOfUse"
        title="Terms of Use"
        headingLevel="h1"
        titleDescription={
          <div className={styles.headerDescWrapper}>
            <p>By accessing this website (axmbro.dev), you agree to these Terms. If you disagree, do not use the site.</p>
            <p className={styles.lastUpdated}>Last updated: 10.06.2026.</p>
          </div>
        }
        withChildrenPadding={false}
      >
        <ul className={styles.itemList}>
          {TERMS_OF_USE_ITEMS.map((item, index) => (
            <li key={index} className={styles.item}>
              <h2 className={styles.itemTitle}>{item.title}</h2>
              <p className={styles.itemText}>{item.text}</p>
            </li>
          ))}
          <li className={styles.item}>
            <h2 className={styles.itemTitle}>Contact</h2>
            <p className={styles.itemText}>
              For any questions regarding these Terms, feel free to reach out via:{" "}
              <Link href="/contact" className={styles.link}>
                /contact
              </Link>
            </p>
          </li>
        </ul>
      </ScreenSection>
    </ScreenContainer>
  );
}
