import { PROJECTS, type ProjectItem } from "@/shared/constants/data";

/** A project with a detail page (`/projects/[url]`). */
export type ProjectWithPage = ProjectItem & { url: string };

const hasProjectPage = (project: ProjectItem): project is ProjectWithPage =>
  Boolean(project.url);

export const getProjectById = (projectId: string) =>
  PROJECTS.find((project): project is ProjectWithPage => project.url === projectId);

export const getProjectsWithPage = () => PROJECTS.filter(hasProjectPage);

/** Featured (`star`) first, data order otherwise - projects board default sort. */
export const compareFeaturedFirst = (a: ProjectItem, b: ProjectItem) =>
  Number(Boolean(b.star)) - Number(Boolean(a.star));
