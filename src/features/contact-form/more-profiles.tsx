import type { SocialLink } from "@/shared/constants/data";
import { SocialLinkButton } from "@/shared/ui/social-link-button";
import styles from "./more-profiles.module.scss";

interface MoreProfilesProps {
  links: SocialLink[];
}

export function MoreProfiles({ links }: MoreProfilesProps) {
  return (
    <div className={styles.moreProfiles}>
      <div className={styles.socialList}>
        {links.map((link) => (
          <SocialLinkButton key={link.href} link={link} />
        ))}
      </div>
    </div>
  );
}
