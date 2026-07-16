"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
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

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export const CookieConsent = () => {
  const isClient = useIsClient();
  const consent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    getAnalyticsConsent,
    () => null,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  const visible = isClient && consent === null;

  useEffect(() => {
    if (!visible) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled"),
      );

    const first = focusables()[0];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setAnalyticsConsent("rejected");
        return;
      }

      if (e.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const firstEl = items[0];
      const lastEl = items[items.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [visible]);

  if (!visible) return null;

  const handleChoice = (choice: "accepted" | "rejected") => {
    setAnalyticsConsent(choice);
  };

  return (
    <div
      ref={dialogRef}
      className={styles.banner}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <h2 id={titleId} className={styles.title}>
        We use cookies
      </h2>
      <p id={descId} className={styles.text}>
        Optional analytics helps us improve the site. Accept if you are OK with that.
      </p>
      <div className={styles.actions}>
        <Button text="Accept cookies" variant="primary" onClick={() => handleChoice("accepted")} />
        <Button text="Reject cookies" onClick={() => handleChoice("rejected")} />
      </div>
      <Link href={ROUTES.privacyPolicy} className={styles.policyLink}>
        Privacy Policy
      </Link>
    </div>
  );
};
