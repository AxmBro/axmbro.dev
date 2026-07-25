import Image from "next/image";
import Link from "next/link";
import type { ProjectItem } from "@/shared/constants/data";
import { getProjectThumbnailSrc } from "../lib/get-project-thumbnail";
import { ProjectTags } from "./project-tags";
import styles from "./project-card.module.scss";

interface ProjectCardProps {
  project: ProjectItem;
  showTags?: boolean;
  compact?: boolean;
}

export const ProjectCard = ({ project, showTags = true, compact = false }: ProjectCardProps) => {
  const thumbnailSrc = getProjectThumbnailSrc(project);

  const inner = (
    <div className={styles.card} data-compact={compact || undefined}>
      {thumbnailSrc && (
        <div className={styles.imageWrapper}>
          <Image
            src={thumbnailSrc}
            alt=""
            className={styles.image}
            width={1280}
            height={720}
            sizes="(max-width: 992px) 100vw, min(50vw, 512px)"
          />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            {project.logoSrc && (
              <Image
                src={`/images/projects-logos/${project.logoSrc}.png`}
                alt=""
                width={28}
                height={28}
                className={styles.logo}
                unoptimized
              />
            )}
            <h2 className={styles.title}>{project.title}</h2>
          </div>
          {project.date && <span className={styles.date}>{project.date}</span>}
        </div>
        <p className={styles.description}>{project.description}</p>
        {!compact && showTags ? <ProjectTags project={project} /> : null}
      </div>
    </div>
  );

  if (project.url) {
    return (
      <Link href={`/projects/${project.url}`} className={styles.link}>
        {inner}
      </Link>
    );
  }

  return <div className={styles.link}>{inner}</div>;
};
