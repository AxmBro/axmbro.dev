import { CAREER_START_DATE, PROJECTS } from "@/shared/constants/data";

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
  const commissionCount = PROJECTS.filter((project) => project.type === "commissions").length;

  return [
    { value: getYearsOfExperience(CAREER_START_DATE), label: "Years Experience" },
    { value: "2M+", label: "Project Downloads" },
    { value: String(commissionCount), label: "Client Commissions" },
    { value: String(PROJECTS.length), label: "Portfolio Projects" },
  ];
}
