import { ProjectCard } from "@/entities/project";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectsBoardButton } from "@/shared/ui/projects-tag-link";
import { CTA_LABELS, getHomeSelectedProjects, HOME_PAGE_TEXTS } from "@/shared/constants/data";
import styles from "./selected-work.module.scss";

export function SelectedWork() {
  const selectedProjects = getHomeSelectedProjects();

  return (
    <>
      <div className={styles.grid}>
        {selectedProjects.map((project) => (
          <div key={project.url} className={styles.gridItem}>
            <ProjectCard project={project} showTags={false} titleLevel="h3" />
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.footerHeader}>
          <h3 className={styles.footerTitle}>Explore More Projects</h3>
          <p className={styles.footerDescription}>{HOME_PAGE_TEXTS.selectedWork.exploreMore}</p>
        </div>
        <ButtonGroup marginTop>
          <ProjectsBoardButton text={CTA_LABELS.browseAllProjects} tab="all" variant="primary" />
          <ProjectsBoardButton text={CTA_LABELS.viewFeaturedProjects} tab="featured" />
        </ButtonGroup>
      </div>
    </>
  );
}
