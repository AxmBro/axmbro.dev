export interface ProjectDateSource {
  date?: string;
  isPresent?: boolean;
}

const MONTH_ABBRS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export const formatProjectDate = (project: ProjectDateSource): string => {
  if (!project.date) return "";
  return project.isPresent ? `${project.date} - Present` : project.date;
};

/** Mon/YYYY project start dates for board sort (newest / oldest). */
export const parseProjectDateTimestamp = (dateStr?: string): number => {
  if (!dateStr) return 0;

  const match = dateStr.match(
    /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{4})\b/i,
  );
  if (!match) return 0;

  const month = MONTH_ABBRS.indexOf(match[1].toLowerCase().slice(0, 3));
  if (month < 0) return 0;

  return Date.UTC(Number(match[2]), month, 1);
};
