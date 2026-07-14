"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ROUTES } from "@/shared/constants/routes";
import { getAnalyticsConsent, setAnalyticsConsent } from "@/shared/lib/analytics-consent";
import { Button } from "@/shared/ui/button";
import styles from "./cookie-consent.module.scss";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(getAnalyticsConsent() === null);
  }, []);

  if (!isVisible) return null;

  const handleChoice = (choice: "accepted" | "rejected") => {
    setAnalyticsConsent(choice);
    setIsVisible(false);
  };

  return (
    <section className={styles.banner} aria-label="Cookie consent">
      <h2 className={styles.title}>Cookies and analytics</h2>
      <p className={styles.text}>
        Vercel Analytics runs by default. Google Analytics 4 loads only if you accept.
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
