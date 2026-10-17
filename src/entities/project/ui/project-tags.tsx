import Image from "next/image";
import { FaStar, FaGlobe } from "react-icons/fa6";
import { SiReact, SiJavascript, SiTypescript, SiCss } from "react-icons/si";
import {
  PROJECT_TAG_TEXTS,
  type ProjectItem,
  type ProjectType,
} from "@/shared/constants/data";
import styles from "./project-tags.module.scss";

const MCBE_TAGS = [
  "JsonUI",
  "Server Form",
  "HUD",
  "Models",
  "Textures",
  "Entities",
  "Inventory",
];

const getTagIcon = (tag: string) => {
  if (MCBE_TAGS.includes(tag)) {
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
  <span className={`${styles.tag} ${styles.tagType}`}>
    <FaStar className={styles.featuredTagIcon} size={12} aria-hidden />
    <span>{PROJECT_TAG_TEXTS.featured}</span>
  </span>
);

function ProjectTypeTag({ type }: { type: ProjectType }) {
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
        <span>{PROJECT_TAG_TEXTS.personal}</span>
      </span>
    );
  }

  return (
    <span className={`${styles.tag} ${styles.tagType} ${styles.tagCommissioned}`}>
      <span className={styles.tagIconSlot} aria-hidden>
        <Image
          src="/images/ui/minecoin.png"
          alt=""
          width={14}
          height={14}
          className={styles.minecoinIcon}
          unoptimized
        />
      </span>
      <span>{PROJECT_TAG_TEXTS.commissions}</span>
    </span>
  );
}

interface ProjectTagsProps {
  project: ProjectItem;
  className?: string;
}

export const ProjectTags = ({ project, className }: ProjectTagsProps) => {
  const hasTags =
    Boolean(project.star) || Boolean(project.type) || (project.tags?.length ?? 0) > 0;

  if (!hasTags) return null;

  return (
    <div
      className={className ? `${styles.tags} ${className}` : styles.tags}
      aria-label={PROJECT_TAG_TEXTS.aria}
    >
      {project.type && <ProjectTypeTag type={project.type} />}
      {project.star && <FeaturedTag />}
      {project.tags?.map((tag) => (
        <span key={tag} className={styles.tag}>
          {getTagIcon(tag)}
          <span>{tag}</span>
        </span>
      ))}
    </div>
  );
};
