import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import type { ProjectItem } from "@/shared/constants/data";
import styles from "./project-card.module.scss";

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const projectFolder = project.slug || "thisweb";

  const inner = (
    <article className={styles.card}>
      {project.image && (
        <div className={styles.imageWrapper} style={{ position: "relative" }}>
          <Image
            src={`/images/projects/${projectFolder}/${project.image}.png`}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            loading="lazy"
            unoptimized
          />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.header}>
          {project.logo && (
            <Image
              src={`/images/projects/${projectFolder}/${project.logo}.png`}
              alt={`${project.title} logo`}
              width={28}
              height={28}
              className={styles.logo}
              unoptimized
            />
          )}
          <h2 className={styles.title}>{project.title}</h2>
          {project.featured && (
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
    </article>
  );

  if (project.slug) {
    return (
      <Link href={`/projects/${project.slug}`} className={styles.link}>
        {inner}
      </Link>
    );
  }

  return <div className={styles.link}>{inner}</div>;
};
