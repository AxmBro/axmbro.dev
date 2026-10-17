import {
  CAREER_START_DATE,
  HOME_PAGE_TEXTS,
  PROJECTS,
  getCommissionedProjects,
} from "@/shared/constants/data";

const STAT_LABELS = HOME_PAGE_TEXTS.trackRecord.stats;

export interface TrackRecordStat {
  value: string;
  label: string;
}

function getYearsOfExperience(
  startDate: Date,
  referenceDate = new Date(),
): string {
  let years = referenceDate.getFullYear() - startDate.getFullYear();
  const hasNotReachedAnniversary =
    referenceDate.getMonth() < startDate.getMonth() ||
    (referenceDate.getMonth() === startDate.getMonth() &&
      referenceDate.getDate() < startDate.getDate());

  if (hasNotReachedAnniversary) {
    years--;
  }

  return `${Math.max(years, 0)}+`;
}

export function getBaseTrackRecordStats(): TrackRecordStat[] {
  const commissionCount = getCommissionedProjects().length;

  return [
    { value: getYearsOfExperience(CAREER_START_DATE), label: STAT_LABELS.years },
    { value: STAT_LABELS.downloadsValue, label: STAT_LABELS.downloads },
    { value: String(commissionCount), label: STAT_LABELS.commissions },
    { value: String(PROJECTS.length), label: STAT_LABELS.totalProjects },
  ];
}
