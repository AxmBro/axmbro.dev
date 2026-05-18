import styles from './hero-stats.module.scss';

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: '4+', label: 'Years Experience' },
  { value: '1.5M+', label: 'Downloads' },
  { value: '15+', label: 'Completed Projects' },
];

export const HeroStats = () => (
  <div className={styles.container}>
    {STATS.map(({ value, label }) => (
      <div key={label} className={styles.stat}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    ))}
  </div>
);
