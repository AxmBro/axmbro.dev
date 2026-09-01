"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectItem } from "@/shared/constants/data";
import { projectDetailPath } from "@/shared/constants/routes";
import {
  PROJECT_CONTENT_DELAY,
  RevealItem,
  RevealStagger,
} from "@/shared/ui/motion";
import { getProjectThumbnailSrc } from "../lib/get-project-thumbnail";
import { formatProjectDate } from "../lib/format-project-date";
import { ProjectAccentTitle } from "./project-accent-title";
import { ProjectTags } from "./project-tags";
import styles from "./project-card.module.scss";

interface ProjectCardProps {
  project: ProjectItem;
  showTags?: boolean;
  featuredReveal?: boolean;
  staggerDelay?: number;
  headingLevel?: "h2" | "h3";
}

function ProjectCardTitle({
  project,
  linkActive,
  headingLevel = "h2",
}: {
  project: ProjectItem;
  linkActive: boolean;
  headingLevel?: "h2" | "h3";
}) {
  if (!project.accentColor) {
    const HeadingTag = headingLevel;
    return <HeadingTag className={styles.title}>{project.title}</HeadingTag>;
  }

  return (
    <ProjectAccentTitle
      as={headingLevel}
      accentColor={project.accentColor}
      className={`${styles.cardTitle} ${styles.accentTitle}`}
      startWhen="inView"
      linkActive={linkActive}
    >
      {project.title}
    </ProjectAccentTitle>
  );
}

function ProjectCardBody({
  project,
  showTags,
  linkActive,
  headingLevel = "h2",
}: {
  project: ProjectItem;
  showTags: boolean;
  linkActive: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const formattedDate = formatProjectDate(project);

  return (
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
          <ProjectCardTitle
            project={project}
            linkActive={linkActive}
            headingLevel={headingLevel}
          />
        </div>
        {formattedDate && <span className={styles.date}>{formattedDate}</span>}
      </div>
      <p className={styles.description}>{project.description}</p>
      {showTags ? <ProjectTags project={project} /> : null}
    </div>
  );
}

export function ProjectCard({
  project,
  showTags = true,
  featuredReveal = false,
  staggerDelay = PROJECT_CONTENT_DELAY,
  headingLevel = "h2",
}: ProjectCardProps) {
  const [linkActive, setLinkActive] = useState(false);
  const thumbnailSrc = getProjectThumbnailSrc(project);
  const thumbnailAlt = `${project.title} project preview`;

  const handleLinkActivate = () => setLinkActive(true);
  const handleLinkDeactivate = () => setLinkActive(false);

  const linkHandlers = {
    onMouseEnter: handleLinkActivate,
    onMouseLeave: handleLinkDeactivate,
    onFocus: handleLinkActivate,
    onBlur: handleLinkDeactivate,
  };

  const media = thumbnailSrc ? (
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
  ) : null;

  const body = (
    <ProjectCardBody
      project={project}
      showTags={showTags}
      linkActive={linkActive}
      headingLevel={headingLevel}
    />
  );

  const inner = (
    <div className={styles.card}>
      {featuredReveal ? (
        // Media: fade-up on -15% inView. Body static. Accent color flash is separate on h2 (-12%).
        <div className={styles.featuredReveal}>
          {media ? (
            <RevealStagger trigger="inView" delay={staggerDelay}>
              <RevealItem className={styles.featuredRevealMedia}>{media}</RevealItem>
            </RevealStagger>
          ) : null}
          <div className={styles.featuredRevealBody}>{body}</div>
        </div>
      ) : (
        <>
          {media}
          {body}
        </>
      )}
    </div>
  );

  if (project.url) {
    return (
      <Link
        href={projectDetailPath(project.url)}
        className={styles.link}
        {...linkHandlers}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={styles.link} {...linkHandlers}>
      {inner}
    </div>
  );
}
