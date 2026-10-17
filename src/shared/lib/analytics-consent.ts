export type AnalyticsConsent = "accepted" | "rejected";

const ANALYTICS_CONSENT_KEY = "axmbro-analytics-consent";
export const ANALYTICS_CONSENT_EVENT = "axmbro-analytics-consent-change";

// Storage throws when the browser blocks site data (the getter runs during render);
// the choice then lives in memory for this page session.
let memoryConsent: AnalyticsConsent | null = null;

export const getAnalyticsConsent = (): AnalyticsConsent | null => {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (value === "accepted" || value === "rejected") return value;
    return null;
  } catch {
    return memoryConsent;
  }
};

export const setAnalyticsConsent = (consent: AnalyticsConsent) => {
  memoryConsent = consent;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  } catch {
    // Kept in memoryConsent.
  }
  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: consent }));
};

/** Withdraw the saved choice - the banner shows again and analytics stops until a new choice. */
export const clearAnalyticsConsent = () => {
  memoryConsent = null;
  try {
    window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
  } catch {
    // Nothing persisted.
  }
  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: null }));
};

export const subscribeAnalyticsConsent = (onStoreChange: () => void) => {
  window.addEventListener(ANALYTICS_CONSENT_EVENT, onStoreChange);
  return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, onStoreChange);
};
