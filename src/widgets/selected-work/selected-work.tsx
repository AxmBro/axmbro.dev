import { ProjectCard, getHomeGalleryProjectList, getProjectThumbnailSrc } from "@/entities/project";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectsBoardButton } from "@/shared/ui/projects-tag-link";
import {
  PROJECT_CONTENT_DELAY,
  PROJECT_FEATURED_CARD_STEP,
} from "@/shared/ui/motion";
import { CTA_LABELS, getHomeSelectedProjects, HOME_PAGE_TEXTS } from "@/shared/constants/data";
import type { GalleryProjectMeta } from "@/widgets/project-gallery";
import { SelectedWorkGallery } from "./selected-work-gallery";
import styles from "./selected-work.module.scss";

export function SelectedWork() {
  const selectedProjects = getHomeSelectedProjects();
  const galleryProjects: GalleryProjectMeta[] = getHomeGalleryProjectList().map((project) => ({
    url: project.url!,
    title: project.title,
    type: project.type,
    fallbackSrc: getProjectThumbnailSrc(project),
  }));

  return (
    <>
      <SelectedWorkGallery projects={galleryProjects} />
      <div className={styles.grid}>
        {selectedProjects.map((project, index) => (
          <div key={project.url} className={styles.gridItem}>
            <ProjectCard
              project={project}
              showTags={false}
              featuredReveal
              headingLevel="h3"
              staggerDelay={PROJECT_CONTENT_DELAY + index * PROJECT_FEATURED_CARD_STEP}
            />
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.footerHeader}>
          <h3 className={styles.footerTitle}>{HOME_PAGE_TEXTS.selectedWork.footerTitle}</h3>
          <p className={styles.footerDescription}>
            {HOME_PAGE_TEXTS.selectedWork.footerDescription}
          </p>
        </div>
        <ButtonGroup marginTop>
          <ProjectsBoardButton text={CTA_LABELS.browseAllProjects} tab="all" variant="primary" />
          <ProjectsBoardButton text={CTA_LABELS.viewFeaturedProjects} tab="featured" />
        </ButtonGroup>
      </div>
    </>
  );
}
