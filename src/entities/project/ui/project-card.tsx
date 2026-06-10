import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import type { ProjectItem } from "@/shared/constants/data";
import styles from "./project-card.module.scss";

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const projectFolder = project.url || "thisweb";

  const inner = (
    <div className={styles.card}>
      {project.imgSrc && (
        <div className={styles.imageWrapper}>
          <Image
            src={`/images/projects/${projectFolder}/${project.imgSrc}.png`}
            alt={project.title}
            className={styles.image}
            width={1280}
            height={720}
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
            <FaStar className={styles.starIcon} size={20} />
          )}
        </div>
        <p className={styles.description}>{project.description}</p>
        {project.tags && project.tags.length > 0 && (
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
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
