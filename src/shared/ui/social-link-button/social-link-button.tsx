"use client";

import { useState, type MouseEvent } from "react";
import { FaCheck } from "react-icons/fa6";
import type { SocialLink } from "@/shared/constants/data";
import { SOCIAL_ICON_MAP } from "./social-icon-map";
import styles from "./social-link-button.module.scss";

interface SocialLinkButtonProps {
  link: SocialLink;
}

export const SocialLinkButton = ({ link }: SocialLinkButtonProps) => {
  const [copied, setCopied] = useState(false);
  const IconComponent = SOCIAL_ICON_MAP[link.iconId];

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (link.copyText) {
      e.preventDefault();
      navigator.clipboard.writeText(link.copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <a
      href={link.href}
      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
      rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className={`${styles.socialLink} ${copied ? styles.copied : ""}`}
      onClick={handleClick}
    >
      <span className={styles.iconWrapper}>
        {copied ? <FaCheck size={20} aria-hidden /> : <IconComponent size={20} aria-hidden />}
      </span>
      <span className={styles.text}>{copied ? "Copied!" : link.text}</span>
    </a>
  );
};
