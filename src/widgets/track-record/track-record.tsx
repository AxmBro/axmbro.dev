import Image from "next/image";
import { formatStatValue, getYouTubeStats } from "@/entities/youtube";
import { HOME_CLIENT_STUDIOS, HOME_PAGE_TEXTS } from "@/shared/constants/data";
import { getBaseTrackRecordStats } from "./lib/get-track-record-stats";
import { TrackRecordStats } from "./track-record-stats";
import styles from "./track-record.module.scss";

export const TrackRecord = async () => {
  const youtubeStats = await getYouTubeStats();
  const stats = getBaseTrackRecordStats();

  if (youtubeStats.subscribers > 0) {
    stats.push({
      value: formatStatValue(youtubeStats.subscribers),
      label: "YouTube Subscribers",
    });
  }

  if (youtubeStats.views > 0) {
    stats.push({
      value: formatStatValue(youtubeStats.views),
      label: "YouTube Views",
    });
  }

  const emptyCellsCount = stats.length % 3 === 0 ? 0 : 3 - (stats.length % 3);

  return (
    <>
      <TrackRecordStats stats={stats} emptyCellsCount={emptyCellsCount} />

      <div className={styles.clients}>
        <div className={styles.clientsHeader}>
          <h3 className={styles.clientsTitle}>Selected Clients & Studios</h3>
          <p className={styles.clientsDescription}>
            {HOME_PAGE_TEXTS.trackRecord.clientsDescription}
          </p>
        </div>
        <div className={styles.clientRow}>
          {HOME_CLIENT_STUDIOS.map((client) => {
            const isSquare =
              client.logoWidth &&
              client.logoHeight &&
              client.logoWidth / client.logoHeight < 1.5;

            return (
              <a
                key={client.name}
                href={client.href}
                className={styles.client}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={client.name}
              >
                {client.logoSrc && (
                  <Image
                    src={client.logoSrc}
                    alt=""
                    width={client.logoWidth ?? 160}
                    height={client.logoHeight ?? 48}
                    sizes="(max-width: 768px) 40vw, 160px"
                    className={`${styles.clientLogo} ${
                      isSquare ? styles.clientLogoSquare : ""
                    }`}
                  />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};
