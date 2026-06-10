"use client";

import { FaGithub, FaDiscord, FaYoutube, FaXTwitter, FaInstagram, FaEnvelope } from "react-icons/fa6";
import type { SocialLink } from "@/shared/constants/data";
import styles from "./social-link-button.module.scss";

const ICON_MAP = {
  github: FaGithub,
  discord: FaDiscord,
  youtube: FaYoutube,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  mail: FaEnvelope,
} as const;

interface SocialLinkButtonProps {
  link: SocialLink;
}

export const SocialLinkButton = ({ link }: SocialLinkButtonProps) => {
  const IconComponent = ICON_MAP[link.iconId];

  return (
    <a
      href={link.href}
      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
      rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className={styles.socialLink}
    >
      <span className={styles.iconWrapper}>
        <IconComponent size={20} />
      </span>
      <span className={styles.text}>{link.text}</span>
    </a>
  );
};
