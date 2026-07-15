"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ROUTES } from "@/shared/constants/routes";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  subscribeAnalyticsConsent,
} from "@/shared/lib/analytics-consent";
import { useIsClient } from "@/shared/lib/use-is-client";
import { Button } from "@/shared/ui/button";
import styles from "./cookie-consent.module.scss";

export const CookieConsent = () => {
  const isClient = useIsClient();
  const consent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    getAnalyticsConsent,
    () => null,
  );

  if (!isClient || consent !== null) return null;

  const handleChoice = (choice: "accepted" | "rejected") => {
    setAnalyticsConsent(choice);
  };

  return (
    <section className={styles.banner} aria-label="Cookie consent">
      <h2 className={styles.title}>We use cookies</h2>
      <p className={styles.text}>
        Optional analytics helps us improve the site. Accept if you are OK with that.
      </p>
      <div className={styles.actions}>
        <Button text="Accept cookies" variant="primary" onClick={() => handleChoice("accepted")} />
        <Button text="Reject cookies" onClick={() => handleChoice("rejected")} />
      </div>
      <Link href={ROUTES.privacyPolicy} className={styles.policyLink}>
        Privacy Policy
      </Link>
    </section>
  );
};
