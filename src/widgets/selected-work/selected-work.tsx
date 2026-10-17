import { ProjectCard, getHomeSelectedProjects } from "@/entities/project";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectsBoardButton } from "@/shared/ui/projects-tag-link";
import { PROJECT_CONTENT_DELAY, PROJECT_FEATURED_CARD_STEP } from "@/shared/ui/motion";
import {
  CTA_LABELS,
  HOME_PAGE_TEXTS,
  PROJECTS,
  getCommissionedProjects,
} from "@/shared/constants/data";
import styles from "./selected-work.module.scss";

export function SelectedWork() {
  const projects = getHomeSelectedProjects();
  const clientProjectCount = getCommissionedProjects().length;

  return (
    <>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <div key={project.url} className={styles.gridItem}>
            <ProjectCard
              project={project}
              featuredReveal
              showTags={false}
              staggerDelay={PROJECT_CONTENT_DELAY + index * PROJECT_FEATURED_CARD_STEP}
              headingLevel="h3"
            />
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <p className={styles.footerSummary}>
          {HOME_PAGE_TEXTS.selectedWork.footerSummary(PROJECTS.length, clientProjectCount)}
        </p>
        <ButtonGroup className={styles.footerActions}>
          <ProjectsBoardButton
            text={CTA_LABELS.browseClientWork}
            tab="commissions"
            variant="primary"
          />
          <ProjectsBoardButton text={CTA_LABELS.browseAllProjects} tab="all" />
        </ButtonGroup>
      </div>
    </>
  );
}
