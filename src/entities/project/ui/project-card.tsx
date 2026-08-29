"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectItem } from "@/shared/constants/data";
import { projectDetailPath } from "@/shared/constants/routes";
import {
  PROJECT_CONTENT_DELAY,
  projectAccentDelayCardBody,
} from "@/shared/ui/motion";
import { getProjectThumbnailSrc } from "../lib/get-project-thumbnail";
import { formatProjectDate } from "../lib/format-project-date";
import { ProjectAccentTitle } from "./project-accent-title";
import { ProjectContentReveal } from "./project-content-reveal";
import { ProjectTags } from "./project-tags";
import styles from "./project-card.module.scss";

interface ProjectCardProps {
  project: ProjectItem;
  showTags?: boolean;
  featuredReveal?: boolean;
  staggerDelay?: number;
}

function ProjectCardTitle({
  project,
  accentDelay,
  linkActive,
}: {
  project: ProjectItem;
  accentDelay?: number;
  linkActive: boolean;
}) {
  if (!project.accentColor) {
    return <h2 className={styles.title}>{project.title}</h2>;
  }

  return (
    <ProjectAccentTitle
      as="h2"
      accentColor={project.accentColor}
      className={`${styles.cardTitle} ${styles.accentTitle}`}
      startWhen="inView"
      delay={accentDelay ?? 0}
      linkActive={linkActive}
    >
      {project.title}
    </ProjectAccentTitle>
  );
}

function ProjectCardBody({
  project,
  showTags,
  accentDelay,
  linkActive,
}: {
  project: ProjectItem;
  showTags: boolean;
  accentDelay?: number;
  linkActive: boolean;
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
            accentDelay={accentDelay}
            linkActive={linkActive}
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
}: ProjectCardProps) {
  const [linkActive, setLinkActive] = useState(false);
  const thumbnailSrc = getProjectThumbnailSrc(project);
  const thumbnailAlt = `${project.title} project preview`;
  const accentDelay = featuredReveal ? projectAccentDelayCardBody(staggerDelay) : undefined;

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
      accentDelay={accentDelay}
      linkActive={linkActive}
    />
  );

  const inner = (
    <div className={styles.card}>
      {featuredReveal ? (
        <ProjectContentReveal
          className={styles.featuredReveal}
          trigger="inView"
          delay={staggerDelay}
        >
          {media ? <div className={styles.featuredRevealMedia}>{media}</div> : null}
          <div className={styles.featuredRevealBody}>{body}</div>
        </ProjectContentReveal>
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
        aria-label={project.title}
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
