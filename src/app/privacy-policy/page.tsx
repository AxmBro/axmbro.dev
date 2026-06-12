import { Metadata } from "next";
import Link from "next/link";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { PRIVACY_POLICY_ITEMS } from "@/shared/constants/legal";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <ScreenContainer>
      <ScreenSection
        id="privacyPolicy"
        title="Privacy Policy"
        headingLevel="h1"
        titleDescription={
          <div className={styles.headerDescWrapper}>
            <p>This Privacy Policy outlines how your personal data is collected and processed.</p>
            <p className={styles.lastUpdated}>Last updated: 10.06.2026.</p>
          </div>
        }
        withChildrenPadding={false}
      >
        <ul className={styles.itemList}>
          {PRIVACY_POLICY_ITEMS.map((item, index) => (
            <li key={index} className={styles.item}>
              <h2 className={styles.itemTitle}>{item.title}</h2>
              <p className={styles.itemText}>{item.text}</p>
            </li>
          ))}
          <li className={styles.item}>
            <h2 className={styles.itemTitle}>Contact</h2>
            <p className={styles.itemText}>
              To exercise any of your rights or ask questions regarding privacy, please contact me directly at:{" "}
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
