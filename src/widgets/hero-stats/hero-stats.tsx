import styles from './hero-stats.module.scss';
import { formatStatValue, getYouTubeStats } from "@/entities/youtube";
import { getBaseHeroStats } from './lib/get-hero-stats';
import { AnimatedStat } from './animated-stat';

export const HeroStats = async () => {
  const ytStats = await getYouTubeStats();
  const stats = getBaseHeroStats();

  if (ytStats.subscribers > 0) {
    stats.push({
      value: formatStatValue(ytStats.subscribers),
      label: 'YouTube Subscribers',
    });
  }

  if (ytStats.views > 0) {
    stats.push({
      value: formatStatValue(ytStats.views),
      label: 'YouTube Views',
    });
  }

  const emptyCellsCount = stats.length % 3 === 0 ? 0 : 3 - (stats.length % 3);

  return (
    <div className={styles.container}>
      {stats.map(({ value, label }) => (
        <div key={label} className={styles.stat}>
          <AnimatedStat className={styles.value} value={value} />
          <span className={styles.label}>{label}</span>
        </div>
      ))}

      {Array.from({ length: emptyCellsCount }).map((_, i) => (
        <div key={`empty-${i}`} className={`${styles.stat} ${styles.empty}`} />
      ))}
    </div>
  );
};
