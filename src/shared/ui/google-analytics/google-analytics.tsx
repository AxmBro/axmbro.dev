"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  getAnalyticsConsent,
  subscribeAnalyticsConsent,
  type AnalyticsConsent,
} from "@/shared/lib/analytics-consent";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const getServerConsent = () => null as AnalyticsConsent | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GoogleAnalytics = () => {
  const consent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    getAnalyticsConsent,
    getServerConsent,
  );
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!gaMeasurementId || consent !== "accepted" || loadedRef.current) return;
    loadedRef.current = true;

    const src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("config", gaMeasurementId, {
      anonymize_ip: true,
    });
  }, [consent]);

  return null;
};
