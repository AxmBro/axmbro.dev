"use client";

import { useState, type ComponentType, type MouseEvent } from "react";
import { FaGithub, FaDiscord, FaYoutube, FaXTwitter, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { BetterBedrockIcon } from "@/shared/ui/better-bedrock-icon";
import type { SocialIconId, SocialLink } from "@/shared/constants/data";
import styles from "./social-link-button.module.scss";

const ICON_MAP: Record<SocialIconId, ComponentType<{ size: number; "aria-hidden"?: boolean }>> = {
  github: FaGithub,
  discord: FaDiscord,
  youtube: FaYoutube,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  mail: FaEnvelope,
  betterbedrock: ({ size }) => <BetterBedrockIcon size={size} />,
};

/** Social chip. link.copyText copies to clipboard instead of navigating (accent "Copied!" feedback). */
interface SocialLinkButtonProps {
  link: SocialLink;
}

export const SocialLinkButton = ({ link }: SocialLinkButtonProps) => {
  const [copied, setCopied] = useState(false);
  const IconComponent = ICON_MAP[link.iconId];

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
