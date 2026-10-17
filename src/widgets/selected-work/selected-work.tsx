import {
  ProjectCard,
  getHomeSelectedProjects,
  getHomeTeaserProjects,
} from "@/entities/project";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectsBoardButton } from "@/shared/ui/projects-tag-link";
import {
  PROJECT_CONTENT_DELAY,
  PROJECT_FEATURED_CARD_STEP,
  RevealItem,
  RevealStagger,
} from "@/shared/ui/motion";
import {
  CTA_LABELS,
  HOME_PAGE_TEXTS,
  PROJECTS,
  getCommissionedProjects,
} from "@/shared/constants/data";
import styles from "./selected-work.module.scss";

export function SelectedWork() {
  const projects = getHomeSelectedProjects();
  const teaserProjects = getHomeTeaserProjects();
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
      {/* Same scroll beat as the cards above: frame stays, teaser then copy slide up. */}
      <RevealStagger className={styles.footer} delay={PROJECT_CONTENT_DELAY}>
        <RevealItem className={styles.teaserLayer}>
          {/* Decorative "more below" row: faded out, not focusable, closer copy sits on top. */}
          <div className={styles.teaser} aria-hidden inert>
            {teaserProjects.map((project) => (
              <div key={project.url} className={styles.teaserItem}>
                <ProjectCard project={project} showTags={false} headingLevel="h3" />
              </div>
            ))}
          </div>
        </RevealItem>
        <RevealItem className={styles.footerContent}>
          <h3 className={styles.footerTitle}>
            {HOME_PAGE_TEXTS.selectedWork.footerTitle(PROJECTS.length)}
          </h3>
          <p className={styles.footerDescription}>
            {HOME_PAGE_TEXTS.selectedWork.footerDescription(clientProjectCount)}
          </p>
          <ButtonGroup align="center" marginTop>
            <ProjectsBoardButton
              text={CTA_LABELS.browseClientWork}
              tab="commissions"
              variant="primary"
            />
            <ProjectsBoardButton text={CTA_LABELS.browseAllProjects} tab="all" />
          </ButtonGroup>
        </RevealItem>
      </RevealStagger>
    </>
  );
}
