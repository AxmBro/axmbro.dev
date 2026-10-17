import type { ProjectItem } from "@/shared/constants/data";

/** `public/images/projects/{projectId}/{fileName}.png` - one path shape for every project image. */
export const getProjectImageSrc = (projectId: string, fileName: string) =>
  `/images/projects/${projectId}/${fileName}.png`;

// "This Website" has no detail page but keeps its images in the `thisweb` folder.
const projectFolderImageSrc = (project: Pick<ProjectItem, "url">, fileName: string) =>
  getProjectImageSrc(project.url ?? "thisweb", fileName);

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
