import { formatStatValue, getYouTubeStats } from "@/entities/youtube/server";
import { HOME_PAGE_TEXTS } from "@/shared/constants/data";
import { getBaseTrackRecordStats } from "./lib/get-track-record-stats";
import { TrackRecordStats } from "./track-record-stats";

export const TrackRecord = async () => {
  const youtubeStats = await getYouTubeStats();
  const stats = getBaseTrackRecordStats();

  if (youtubeStats.subscribers > 0) {
    stats.push({
      value: formatStatValue(youtubeStats.subscribers),
      label: HOME_PAGE_TEXTS.trackRecord.stats.youtubeSubscribers,
    });
  }

  if (youtubeStats.views > 0) {
    stats.push({
      value: formatStatValue(youtubeStats.views),
      label: HOME_PAGE_TEXTS.trackRecord.stats.youtubeViews,
    });
  }

  const emptyCellsCount = stats.length % 3 === 0 ? 0 : 3 - (stats.length % 3);

  return <TrackRecordStats stats={stats} emptyCellsCount={emptyCellsCount} />;
};
