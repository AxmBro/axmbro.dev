"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {
  PROJECT_CONTENT_DELAY,
  RevealItem,
  RevealStagger,
  useReducedMotion,
} from "@/shared/ui/motion";
import { CTA_LABELS, GALLERY_TEXTS } from "@/shared/constants/data";
import { projectDetailPath } from "@/shared/constants/routes";
import { fetchProjectGalleryImages } from "./lib/fetch-project-gallery-images";
import {
  GALLERY_IMAGE_QUALITY,
  GALLERY_IMAGE_SIZES_FALLBACK,
  getGalleryImageSizes,
} from "./lib/gallery-image-config";
import {
  advanceImagePosition,
  nextPhotoInProject,
  nextProjectPosition,
  prevProjectPosition,
} from "./lib/gallery-navigation";
import type { GalleryImage, GalleryPosition, GalleryProjectMeta } from "./lib/gallery-types";
import styles from "./project-gallery.module.scss";

// Keep in sync with --gallery-auto-advance in globals.scss
const AUTO_ADVANCE_MS = 5000;

interface ProjectGalleryProps {
  projects: GalleryProjectMeta[];
}

function getProjectImages(
  imagesByProject: Record<string, GalleryImage[]>,
  projectId: string | undefined,
): GalleryImage[] {
  if (!projectId || !(projectId in imagesByProject)) return [];
  return imagesByProject[projectId];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const projectCount = projects.length;
  const [position, setPosition] = useState<GalleryPosition>({ projectIndex: 0, imageIndex: 0 });
  const [imagesByProject, setImagesByProject] = useState<Record<string, GalleryImage[]>>({});
  const imagesByProjectRef = useRef(imagesByProject);
  const pendingProjectIdsRef = useRef(new Set<string>());
  const [cycleKey, setCycleKey] = useState(0);
  const [loadedBySrc, setLoadedBySrc] = useState<Record<string, true>>({});
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    imagesByProjectRef.current = imagesByProject;
  }, [imagesByProject]);

  const bumpCycle = useCallback(() => {
    setCycleKey((key) => key + 1);
  }, []);

  const currentProject = projects[position.projectIndex];
  const currentProjectId = currentProject?.url;
  const currentImages = getProjectImages(imagesByProject, currentProjectId);
  const currentImage = currentImages[position.imageIndex] ?? currentImages[0];
  const displaySrc = currentImage?.src ?? currentProject?.fallbackSrc ?? null;
  const imageSizes =
    currentImage?.width && currentImage?.height
      ? getGalleryImageSizes(currentImage.width, currentImage.height)
      : GALLERY_IMAGE_SIZES_FALLBACK;
  const isImageReady = Boolean(displaySrc && loadedBySrc[displaySrc]);

  const syncPositionAfterFetch = useCallback(
    (projectId: string, images: GalleryImage[]) => {
      setPosition((prev) => {
        if (projects[prev.projectIndex]?.url !== projectId) return prev;
        if (images.length === 0) return prev;

        if (prev.imageIndex < images.length) return prev;
        return { ...prev, imageIndex: images.length - 1 };
      });
    },
    [projects],
  );

  const ensureProjectImages = useCallback(async (projectId: string) => {
    if (projectId in imagesByProjectRef.current) return;
    if (pendingProjectIdsRef.current.has(projectId)) return;

    pendingProjectIdsRef.current.add(projectId);
    try {
      const images = await fetchProjectGalleryImages(projectId);
      setImagesByProject((current) => {
        if (projectId in current) return current;
        return { ...current, [projectId]: images };
      });
      syncPositionAfterFetch(projectId, images);
    } finally {
      pendingProjectIdsRef.current.delete(projectId);
    }
  }, [syncPositionAfterFetch]);

  useEffect(() => {
    if (!currentProjectId) return;
    void ensureProjectImages(currentProjectId);
  }, [currentProjectId, ensureProjectImages]);

  useEffect(() => {
    if (projectCount < 2) return;

    const nextProject = projects[(position.projectIndex + 1) % projectCount];
    const prevProject = projects[(position.projectIndex - 1 + projectCount) % projectCount];

    if (nextProject?.url) void ensureProjectImages(nextProject.url);
    if (prevProject?.url) void ensureProjectImages(prevProject.url);
  }, [ensureProjectImages, position.projectIndex, projectCount, projects]);

  useEffect(() => {
    if (reduceMotion || projectCount === 0) return;

    const timer = window.setTimeout(() => {
      setPosition((prev) => {
        const project = projects[prev.projectIndex];
        const images = project?.url ? imagesByProjectRef.current[project.url] ?? [] : [];
        // Thumbnail fallback counts as one slide until the API response arrives.
        const imageCount = images.length > 0 ? images.length : 1;
        return advanceImagePosition(prev, projectCount, imageCount);
      });
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [cycleKey, position.imageIndex, position.projectIndex, projectCount, projects, reduceMotion]);

  const goNextProject = useCallback(() => {
    setPosition((prev) => nextProjectPosition(prev, projectCount));
    bumpCycle();
  }, [bumpCycle, projectCount]);

  const goPrevProject = useCallback(() => {
    setPosition((prev) => prevProjectPosition(prev, projectCount));
    bumpCycle();
  }, [bumpCycle, projectCount]);

  const goToProject = useCallback(
    (projectIndex: number) => {
      setPosition({ projectIndex, imageIndex: 0 });
      bumpCycle();
    },
    [bumpCycle],
  );

  const goNextPhoto = useCallback(() => {
    setPosition((prev) => {
      const project = projects[prev.projectIndex];
      const images = project?.url ? imagesByProject[project.url] ?? [] : [];
      return nextPhotoInProject(prev, images.length);
    });
    bumpCycle();
  }, [bumpCycle, imagesByProject, projects]);

  const handleNextPhotoClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      goNextPhoto();
    },
    [goNextPhoto],
  );

  const hasMultipleProjects = projectCount > 1;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!hasMultipleProjects) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevProject();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNextProject();
      }
    },
    [goNextProject, goPrevProject, hasMultipleProjects],
  );

  if (projectCount === 0 || !currentProject) return null;

  const canAutoAdvance =
    !reduceMotion && (hasMultipleProjects || currentImages.length > 1);
  const showProjectNav = hasMultipleProjects;
  const isGalleryLoaded = Boolean(currentProjectId && currentProjectId in imagesByProject);
  const showNextPhoto = currentImages.length > 1;
  const reserveNextPhotoSlot = showNextPhoto || !isGalleryLoaded;
  const photoTotal = Math.max(currentImages.length, 1);
  const nextPhotoLabel = `${CTA_LABELS.nextPhoto} (${position.imageIndex + 1}/${photoTotal})`;
  const progressKey = `${position.projectIndex}-${position.imageIndex}-${cycleKey}`;

  return (
    <div data-has-dots={showProjectNav ? "true" : undefined}>
      <RevealStagger className={styles.gallery} trigger="inView" delay={PROJECT_CONTENT_DELAY}>
      <RevealItem className={styles.revealBlock}>
        <div
          className={styles.viewport}
          role="region"
          aria-roledescription="carousel"
          aria-label={GALLERY_TEXTS.aria.region}
          tabIndex={showProjectNav ? 0 : undefined}
          onKeyDown={handleKeyDown}
        >
          {showProjectNav ? (
            <>
              <button
                type="button"
                className={styles.navButton}
                data-direction="prev"
                onClick={goPrevProject}
                aria-label={GALLERY_TEXTS.aria.prevProject}
              >
                <FaChevronLeft size={12} aria-hidden />
              </button>
              <button
                type="button"
                className={styles.navButton}
                data-direction="next"
                onClick={goNextProject}
                aria-label={GALLERY_TEXTS.aria.nextProject}
              >
                <FaChevronRight size={12} aria-hidden />
              </button>
            </>
          ) : null}

          <div className={styles.stage}>
            <div className={styles.media}>
              <div className={styles.placeholder} aria-hidden />
              {displaySrc ? (
                <Image
                  key={displaySrc}
                  src={displaySrc}
                  alt={GALLERY_TEXTS.imageAlt(
                    currentProject.title,
                    position.imageIndex + 1,
                  )}
                  fill
                  className={styles.image}
                  data-loaded={isImageReady ? "true" : "false"}
                  sizes={imageSizes}
                  quality={GALLERY_IMAGE_QUALITY}
                  priority={position.projectIndex === 0 && position.imageIndex === 0}
                  onLoad={() => {
                    if (!displaySrc) return;
                    setLoadedBySrc((current) =>
                      current[displaySrc] ? current : { ...current, [displaySrc]: true },
                    );
                  }}
                />
              ) : null}
              <div className={styles.scrim} aria-hidden />
              <div className={styles.overlay}>
                <div className={styles.captionRow}>
                  <Link
                    href={projectDetailPath(currentProject.url)}
                    className={styles.caption}
                    aria-label={currentProject.title}
                  >
                    <h2 className={styles.title}>{currentProject.title}</h2>
                    {currentProject.type ? (
                      <p className={styles.typeLabel}>
                        {GALLERY_TEXTS.typeLabel[currentProject.type]}
                      </p>
                    ) : null}
                  </Link>
                  {reserveNextPhotoSlot ? (
                    <button
                      type="button"
                      className={styles.nextPhoto}
                      data-visible={showNextPhoto ? "true" : "false"}
                      onClick={showNextPhoto ? handleNextPhotoClick : undefined}
                      aria-label={showNextPhoto ? nextPhotoLabel : undefined}
                      aria-hidden={showNextPhoto ? undefined : true}
                      tabIndex={showNextPhoto ? 0 : -1}
                      disabled={!showNextPhoto}
                    >
                      {nextPhotoLabel}
                    </button>
                  ) : null}
                </div>
              </div>
              {!reduceMotion && canAutoAdvance ? (
                <div className={styles.advanceTrack} aria-hidden>
                  <div key={progressKey} className={styles.advanceFill} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </RevealItem>

      {hasMultipleProjects ? (
        <RevealItem className={styles.revealBlock}>
          <div className={styles.dotsPanel}>
            <div className={styles.dotsBar}>
              <div className={styles.dots} role="tablist" aria-label={GALLERY_TEXTS.aria.chooseProject}>
                {projects.map((project, index) => (
                  <button
                    key={project.url}
                    type="button"
                    role="tab"
                    className={styles.dot}
                    data-active={index === position.projectIndex ? "true" : "false"}
                    aria-label={`Show ${project.title}`}
                    aria-selected={index === position.projectIndex}
                    onClick={() => goToProject(index)}
                  />
                ))}
              </div>
            </div>
            <div className={styles.galleryDivider} aria-hidden />
          </div>
        </RevealItem>
      ) : null}
    </RevealStagger>
    </div>
  );
}
