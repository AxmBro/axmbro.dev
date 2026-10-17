"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { FaCheck } from "react-icons/fa6";
import { SOCIAL_LINK_TEXTS, type SocialLink } from "@/shared/constants/data";
import { SOCIAL_ICON_MAP } from "./social-icon-map";
import styles from "./social-link-button.module.scss";

const COPIED_RESET_MS = 2000;

interface SocialLinkButtonProps {
  link: SocialLink;
}

export const SocialLinkButton = ({ link }: SocialLinkButtonProps) => {
  const [copied, setCopied] = useState(false);
  const IconComponent = SOCIAL_ICON_MAP[link.iconId];

  useEffect(() => {
    if (!copied) return;

    const timeoutId = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  const isMailto = link.href.startsWith("mailto:");
  const target = isMailto ? undefined : "_blank";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // No Clipboard API (insecure context, old browser) - fall back to the plain link.
    if (!link.copyText || !navigator.clipboard) return;

    e.preventDefault();
    navigator.clipboard.writeText(link.copyText).then(
      () => setCopied(true),
      // Clipboard denied: after the promise tick a new tab is popup-blocked, so follow the link here.
      () => window.location.assign(link.href),
    );
  };

  return (
    <a
      href={link.href}
      target={target}
      rel={isMailto ? undefined : "noopener noreferrer"}
      className={`${styles.socialLink} ${copied ? styles.copied : ""}`}
      onClick={handleClick}
    >
      <span className={styles.iconWrapper}>
        {copied ? <FaCheck size={20} aria-hidden /> : <IconComponent size={20} aria-hidden />}
      </span>
      <span className={styles.text} aria-live="polite">
        {copied ? SOCIAL_LINK_TEXTS.copied : link.text}
      </span>
    </a>
  );
};
