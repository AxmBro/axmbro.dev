"use client";

import { FaCookieBite } from "react-icons/fa6";
import { COOKIE_CONSENT_TEXTS } from "@/shared/constants/data";
import { clearAnalyticsConsent } from "@/shared/lib/analytics-consent";

interface CookieSettingsButtonProps {
  className?: string;
}

/** Reopens the consent banner so a visitor can withdraw or change an earlier choice. */
export const CookieSettingsButton = ({ className }: CookieSettingsButtonProps) => (
  <button type="button" className={className} onClick={clearAnalyticsConsent}>
    <FaCookieBite size={14} aria-hidden />
    <span>{COOKIE_CONSENT_TEXTS.settings}</span>
  </button>
);
