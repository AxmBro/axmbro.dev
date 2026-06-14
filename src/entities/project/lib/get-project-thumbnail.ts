import type { ProjectItem } from "@/shared/constants/data";

export const getProjectThumbnailSrc = (
  project: Pick<ProjectItem, "url" | "imgSrc">,
): string | null => {
  if (!project.imgSrc) return null;
  const folder = project.url ?? "thisweb";
  return `/images/projects/${folder}/${project.imgSrc}.png`;
};
