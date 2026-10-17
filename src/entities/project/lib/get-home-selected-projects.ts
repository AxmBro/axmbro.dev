import { HOME_SELECTED_PROJECT_IDS } from "@/shared/constants/data";
import { getProjectById, type ProjectWithPage } from "./project-lookup";

/** Home Selected Work in the curated `HOME_SELECTED_PROJECT_IDS` order; unknown ids are skipped. */
export const getHomeSelectedProjects = (): ProjectWithPage[] =>
  HOME_SELECTED_PROJECT_IDS.map((projectId) => getProjectById(projectId)).filter(
    (project): project is ProjectWithPage => Boolean(project),
  );
