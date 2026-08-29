import { formatStatValue, getYouTubeStats } from "@/entities/youtube";
import { HOME_CLIENT_STUDIOS } from "@/shared/constants/data";
import { getBaseTrackRecordStats } from "./lib/get-track-record-stats";
import { TrackRecordClients } from "./track-record-clients";
import { TrackRecordStats } from "./track-record-stats";

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

      <TrackRecordClients clients={HOME_CLIENT_STUDIOS} />
    </>
  );
};
