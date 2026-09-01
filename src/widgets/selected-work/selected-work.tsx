import { getHomeGalleryProjectList, getProjectThumbnailSrc } from "@/entities/project";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectsBoardButton } from "@/shared/ui/projects-tag-link";
import { CTA_LABELS, HOME_PAGE_TEXTS } from "@/shared/constants/data";
import type { GalleryProjectMeta } from "@/widgets/project-gallery";
import { SelectedWorkGallery } from "./selected-work-gallery";
import styles from "./selected-work.module.scss";

export function SelectedWork() {
  const galleryProjects: GalleryProjectMeta[] = getHomeGalleryProjectList().map((project) => ({
    url: project.url!,
    title: project.title,
    type: project.type,
    fallbackSrc: getProjectThumbnailSrc(project),
    accentColor: project.accentColor,
  }));

  return (
    <>
      <div className={styles.gallerySlot}>
        <SelectedWorkGallery projects={galleryProjects} />
      </div>
      <div className={styles.footer}>
        <div className={styles.footerHeader}>
          <h3 className={styles.footerTitle}>{HOME_PAGE_TEXTS.selectedWork.footerTitle}</h3>
          <p className={styles.footerDescription}>
            {HOME_PAGE_TEXTS.selectedWork.footerDescription}
          </p>
        </div>
        <ButtonGroup className={styles.footerActions}>
          <ProjectsBoardButton text={CTA_LABELS.browseAllProjects} tab="all" variant="primary" />
          <ProjectsBoardButton text={CTA_LABELS.viewFeaturedProjects} tab="featured" />
        </ButtonGroup>
      </div>
    </>
  );
}
