"use client";

import { useState } from "react";
import { FaGithub, FaDiscord, FaYoutube, FaXTwitter, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import type { SocialLink } from "@/shared/constants/data";
import styles from "./social-link-button.module.scss";

const BetterBedrockIcon = ({ size }: { size: number }) => (
  <span 
    style={{ 
      display: 'inline-block',
      width: size, 
      height: size, 
      backgroundColor: 'currentColor',
      WebkitMaskImage: 'url(/images/bb-logo.png)',
      WebkitMaskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskImage: 'url(/images/bb-logo.png)',
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
    }} 
  />
);

const ICON_MAP = {
  github: FaGithub,
  discord: FaDiscord,
  youtube: FaYoutube,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  mail: FaEnvelope,
  betterbedrock: BetterBedrockIcon,
} as const;

interface SocialLinkButtonProps {
  link: SocialLink;
}

export const SocialLinkButton = ({ link }: SocialLinkButtonProps) => {
  const [copied, setCopied] = useState(false);
  const IconComponent = ICON_MAP[link.iconId];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
        {copied ? <FaCheck size={20} /> : <IconComponent size={20} />}
      </span>
      <span className={styles.text}>{copied ? "Copied!" : link.text}</span>
    </a>
  );
};
