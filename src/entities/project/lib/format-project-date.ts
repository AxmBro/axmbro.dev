export interface ProjectDateSource {
  date?: string;
  isPresent?: boolean;
}

export const formatProjectDate = (project: ProjectDateSource): string => {
  if (!project.date) return "";
  return project.isPresent ? `${project.date} - Present` : project.date;
};
