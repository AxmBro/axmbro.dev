import { CAREER_START_DATE, PROJECTS } from "@/shared/constants/data";

export interface HeroStat {
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

export function getBaseHeroStats(): HeroStat[] {
  const totalProjects = PROJECTS.length;
  const commissionCount = PROJECTS.filter((p) => p.type === "commissions").length;

  return [
    { value: getYearsOfExperience(CAREER_START_DATE), label: "Years of Experience" },
    { value: "2M+", label: "Project Downloads" },
    { value: String(commissionCount), label: "Client Commissions" },
    { value: String(totalProjects), label: "Portfolio Projects" },
  ];
}
