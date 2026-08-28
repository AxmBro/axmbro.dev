"use client";

import type { SocialLink } from "@/shared/constants/data";
import { SOCIAL_ICON_MAP } from "@/shared/ui/social-link-button";
import styles from "./footer.module.scss";

interface FooterSocialRowProps {
  links: SocialLink[];
}

export const FooterSocialRow = ({ links }: FooterSocialRowProps) => (
  <div className={styles.socialIconsRow}>
    {links.map((link) => {
      const Icon = SOCIAL_ICON_MAP[link.iconId];
      const isMail = link.iconId === "mail";

      return (
        <a
          key={`${link.iconId}-${link.text}`}
          href={link.href}
          aria-label={link.text}
          {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        >
          <Icon size={22} aria-hidden />
        </a>
      );
    })}
  </div>
);
