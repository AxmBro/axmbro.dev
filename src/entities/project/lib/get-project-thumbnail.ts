import type { ProjectItem } from "@/shared/constants/data";

export const getProjectThumbnailSrc = (
  project: Pick<ProjectItem, "url" | "imgSrc">,
): string | null => {
  if (!project.url || !project.imgSrc) return null;
  return `/images/projects/${project.url}/${project.imgSrc}.png`;
};
