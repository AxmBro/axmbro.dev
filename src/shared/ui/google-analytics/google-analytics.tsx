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
    [gaDisable: `ga-disable-${string}`]: boolean | undefined;
  }
}

// GA sets `_ga*` on the registrable domain (`.axmbro.dev`); expire both that and host-only copies.
const clearGaCookies = () => {
  const domain = window.location.hostname.split(".").slice(-2).join(".");
  for (const cookie of document.cookie.split("; ")) {
    const name = cookie.split("=")[0];
    if (!name.startsWith("_ga")) continue;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
};

export const GoogleAnalytics = () => {
  const consent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    getAnalyticsConsent,
    getServerConsent,
  );
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!gaMeasurementId) return;
    const disableKey = `ga-disable-${gaMeasurementId}` as const;

    if (consent !== "accepted") {
      // Withdrawn via Cookie Settings after GA loaded: stop collection and drop its cookies.
      if (!loadedRef.current) return;
      window[disableKey] = true;
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearGaCookies();
      return;
    }

    if (loadedRef.current) {
      window[disableKey] = false;
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
      return;
    }
    loadedRef.current = true;

    const src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer ?? [];
    // gtag.js only processes `arguments` objects; a rest-args array is silently ignored.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
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
