import { HOME_ANNOUNCEMENT } from "@/shared/constants/data";
import styles from "./announcement-bar.module.scss";

export const AnnouncementBar = () => (
  <aside className={styles.bar} aria-label="Availability" data-announcement-bar>
    <div className={styles.inner}>
      <p className={styles.message}>
        <span className={styles.label}>{HOME_ANNOUNCEMENT.label}</span>
        <span className={styles.text}>{HOME_ANNOUNCEMENT.text}</span>
      </p>
    </div>
  </aside>
);
