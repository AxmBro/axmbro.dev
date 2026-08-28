import type { ProjectItem } from "@/shared/constants/data";

const projectFolderImageSrc = (
  project: Pick<ProjectItem, "url">,
  fileName: string,
) => `/images/projects/${project.url ?? "thisweb"}/${fileName}.png`;

export const getProjectThumbnailSrc = (
  project: Pick<ProjectItem, "url" | "imgSrc">,
): string | null => {
  if (!project.imgSrc) return null;
  return projectFolderImageSrc(project, project.imgSrc);
};

/** Detail hero: optional `heroImgSrc`, otherwise the card thumbnail. */
export const getProjectHeroSrc = (
  project: Pick<ProjectItem, "url" | "imgSrc" | "heroImgSrc">,
): string | null => {
  const fileName = project.heroImgSrc ?? project.imgSrc;
  if (!fileName) return null;
  return projectFolderImageSrc(project, fileName);
};
