import { HOME_SELECTED_PROJECT_IDS, HOME_TEASER_PROJECT_IDS } from "@/shared/constants/data";
import { getProjectById, type ProjectWithPage } from "./project-lookup";

const resolveProjects = (projectIds: readonly string[]): ProjectWithPage[] =>
  projectIds.map((projectId) => getProjectById(projectId)).filter(
    (project): project is ProjectWithPage => Boolean(project),
  );

/** Home Selected Work in the curated `HOME_SELECTED_PROJECT_IDS` order; unknown ids are skipped. */
export const getHomeSelectedProjects = (): ProjectWithPage[] =>
  resolveProjects(HOME_SELECTED_PROJECT_IDS);

/** Faded teaser row under the Selected Work closer (`HOME_TEASER_PROJECT_IDS`). */
export const getHomeTeaserProjects = (): ProjectWithPage[] =>
  resolveProjects(HOME_TEASER_PROJECT_IDS);
