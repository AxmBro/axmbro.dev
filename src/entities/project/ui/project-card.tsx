import Image from "next/image";
import Link from "next/link";
import type { ProjectItem } from "@/shared/constants/data";
import { projectDetailPath } from "@/shared/constants/routes";
import { getProjectThumbnailSrc } from "../lib/get-project-thumbnail";
import { formatProjectDate } from "../lib/format-project-date";
import { ProjectTags } from "./project-tags";
import styles from "./project-card.module.scss";

interface ProjectCardProps {
  project: ProjectItem;
  showTags?: boolean;
  titleLevel?: "h2" | "h3";
}

export const ProjectCard = ({
  project,
  showTags = true,
  titleLevel = "h2",
}: ProjectCardProps) => {
  const thumbnailSrc = getProjectThumbnailSrc(project);
  const formattedDate = formatProjectDate(project);
  const TitleTag = titleLevel;
  const thumbnailAlt = `${project.title} project preview`;

  const inner = (
    <div className={styles.card}>
      {thumbnailSrc && (
        <div className={styles.imageWrapper}>
          <Image
            src={thumbnailSrc}
            alt={thumbnailAlt}
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
            <TitleTag className={styles.title}>{project.title}</TitleTag>
          </div>
          {formattedDate && <span className={styles.date}>{formattedDate}</span>}
        </div>
        <p className={styles.description}>{project.description}</p>
        {showTags ? <ProjectTags project={project} /> : null}
      </div>
    </div>
  );

  if (project.url) {
    return (
      <Link href={projectDetailPath(project.url)} className={styles.link} aria-label={project.title}>
        {inner}
      </Link>
    );
  }

  return <div className={styles.link}>{inner}</div>;
};
