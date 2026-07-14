import Image from "next/image";
import Link from "next/link";
import { FaStar, FaGlobe } from "react-icons/fa6";
import { SiReact, SiJavascript, SiTypescript, SiCss } from "react-icons/si";
import type { ProjectItem } from "@/shared/constants/data";
import { getProjectThumbnailSrc } from "../lib/get-project-thumbnail";
import styles from "./project-card.module.scss";

const getTagIcon = (tag: string) => {
  const mcbeTags = ["JsonUI", "Server Form", "HUD", "Models"];
  if (mcbeTags.includes(tag)) {
    return (
      <Image
        src="/images/mcbe-logo.png"
        alt="MCBE"
        width={14}
        height={14}
        className={styles.mcbeTagIcon}
      />
    );
  }
  switch (tag) {
    case "Web":
      return <FaGlobe size={14} aria-hidden />;
    case "React":
      return <SiReact size={14} aria-hidden />;
    case "JavaScript":
      return <SiJavascript size={14} aria-hidden />;
    case "TypeScript":
      return <SiTypescript size={14} aria-hidden />;
    case "CSS":
      return <SiCss size={14} aria-hidden />;
    default:
      return null;
  }
};

interface ProjectCardProps {
  project: ProjectItem;
  /** Show project technology tags. @default true */
  showTags?: boolean;
  /** Hide tags and clamp the description to two lines. @default false */
  compact?: boolean;
}

export const ProjectCard = ({ project, showTags = true, compact = false }: ProjectCardProps) => {
  const projectFolder = project.url || "thisweb";
  const thumbnailSrc = getProjectThumbnailSrc(project);

  const inner = (
    <div className={styles.card} data-compact={compact || undefined}>
      {thumbnailSrc && (
        <div className={styles.imageWrapper}>
          <Image
            src={thumbnailSrc}
            alt={project.title}
            className={styles.image}
            width={1280}
            height={720}
            sizes="(max-width: 992px) 100vw, min(50vw, 512px)"
          />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.header}>
          {project.logoSrc && (
            <Image
              src={`/images/projects/${projectFolder}/${project.logoSrc}.png`}
              alt={`${project.title} logo`}
              width={28}
              height={28}
              className={styles.logo}
            />
          )}
          <h2 className={styles.title}>{project.title}</h2>
          {project.star && (
            <FaStar className={styles.starIcon} size={20} aria-hidden />
          )}
        </div>
        <p className={styles.description}>{project.description}</p>
        {!compact && showTags && project.tags && project.tags.length > 0 && (
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {getTagIcon(tag)}
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}
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
