import Image from "next/image";
import Link from "next/link";
import { FaStar, FaGlobe } from "react-icons/fa6";
import { SiReact, SiJavascript, SiTypescript, SiCss } from "react-icons/si";
import type { ProjectItem, ProjectType } from "@/shared/constants/data";
import { getProjectThumbnailSrc } from "../lib/get-project-thumbnail";
import styles from "./project-card.module.scss";

const TYPE_TAG_LABEL: Record<ProjectType, string> = {
  personal: "Personal",
  commissions: "Commissioned",
};

const getTagIcon = (tag: string) => {
  const mcbeTags = ["JsonUI", "Server Form", "HUD", "Models", "Textures", "Entities", "Inventory"];
  if (mcbeTags.includes(tag)) {
    return (
      <Image
        src="/images/ui/mcbe-logo.png"
        alt=""
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

const FeaturedTag = () => (
  <span className={`${styles.tag} ${styles.tagType} ${styles.tagFeatured}`}>
    <FaStar className={styles.featuredTagIcon} size={12} aria-hidden />
    <span>Featured</span>
  </span>
);

const TypeTag = ({ type }: { type: ProjectType }) => {
  if (type === "personal") {
    return (
      <span className={`${styles.tag} ${styles.tagType} ${styles.tagPersonal}`}>
        <Image
          src="/icon192.png"
          alt=""
          width={14}
          height={14}
          className={styles.personalTagLogo}
        />
        <span>{TYPE_TAG_LABEL.personal}</span>
      </span>
    );
  }

  return (
    <span className={`${styles.tag} ${styles.tagType} ${styles.tagCommissioned}`}>
      <span className={styles.tagIconSlot} aria-hidden>
        <Image
          src="/images/ui/minecoin.png"
          alt=""
          width={9}
          height={9}
          className={styles.minecoinIcon}
          unoptimized
        />
      </span>
      <span>{TYPE_TAG_LABEL.commissions}</span>
    </span>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  /** Show project technology tags. @default true */
  showTags?: boolean;
  /** Hide tags and clamp the description to two lines. @default false */
  compact?: boolean;
}

export const ProjectCard = ({ project, showTags = true, compact = false }: ProjectCardProps) => {
  const thumbnailSrc = getProjectThumbnailSrc(project);
  const showTagRow =
    !compact &&
    showTags &&
    (Boolean(project.star) || Boolean(project.type) || (project.tags?.length ?? 0) > 0);

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
        <p className={styles.description}>{project.description}</p>
        {showTagRow && (
          <div className={styles.tags}>
            {project.type && <TypeTag type={project.type} />}
            {project.star && <FeaturedTag />}
            {project.tags?.map((tag) => (
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
