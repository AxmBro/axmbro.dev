export type AnalyticsConsent = "accepted" | "rejected";

const ANALYTICS_CONSENT_KEY = "axmbro-analytics-consent";
export const ANALYTICS_CONSENT_EVENT = "axmbro-analytics-consent-change";

export const getAnalyticsConsent = (): AnalyticsConsent | null => {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
};

export const setAnalyticsConsent = (consent: AnalyticsConsent) => {
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: consent }));
};

export const subscribeAnalyticsConsent = (onStoreChange: () => void) => {
  window.addEventListener(ANALYTICS_CONSENT_EVENT, onStoreChange);
  return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, onStoreChange);
};
