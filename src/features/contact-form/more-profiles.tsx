"use client";

import { useState } from "react";
import type { SocialLink } from "@/shared/constants/data";
import { SocialLinkButton } from "@/shared/ui/social-link-button";
import styles from "./more-profiles.module.scss";

interface MoreProfilesProps {
  links: SocialLink[];
}

export function MoreProfiles({ links }: MoreProfilesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.moreProfiles}>
      <button
        type="button"
        className={styles.moreProfilesToggle}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span
          className={styles.moreProfilesArrow}
          data-open={isOpen ? "true" : "false"}
          aria-hidden
        />
        More Profiles & Communities
      </button>
      <div
        className={styles.moreProfilesContent}
        data-open={isOpen ? "true" : "false"}
      >
        <div className={styles.moreProfilesContentInner}>
          <div className={styles.socialList}>
            {links.map((link) => (
              <SocialLinkButton key={link.href} link={link} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
