"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { ProjectAccentTitle } from "@/entities/project";
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
import { preloadGalleryImage } from "./lib/preload-gallery-image";
import styles from "./project-gallery.module.scss";

// Keep in sync with --gallery-auto-advance in globals.scss
const AUTO_ADVANCE_MS = 5000;

type SlideDirection = "next" | "prev";

interface SlideSnapshot {
  src: string;
  sizes: string;
}

interface SlideTransition extends SlideSnapshot {
  id: number;
  direction: SlideDirection;
}

interface ProjectGalleryProps {
  projects: GalleryProjectMeta[];
  captionHeadingLevel?: "h2" | "h3";
}

function getProjectImages(
  imagesByProject: Record<string, GalleryImage[]>,
  projectId: string | undefined,
): GalleryImage[] {
  if (!projectId || !(projectId in imagesByProject)) return [];
  return imagesByProject[projectId];
}

export function ProjectGallery({
  projects,
  captionHeadingLevel = "h2",
}: ProjectGalleryProps) {
  const projectCount = projects.length;
  const [position, setPosition] = useState<GalleryPosition>({ projectIndex: 0, imageIndex: 0 });
  const [imagesByProject, setImagesByProject] = useState<Record<string, GalleryImage[]>>({});
  const imagesByProjectRef = useRef(imagesByProject);
  const pendingProjectIdsRef = useRef(new Set<string>());
  const [cycleKey, setCycleKey] = useState(0);
  const [loadedBySrc, setLoadedBySrc] = useState<Record<string, true>>({});
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("next");
  const [transition, setTransition] = useState<SlideTransition | null>(null);
  const transitionIdRef = useRef(0);
  const reduceMotion = useReducedMotion();

  const markImageLoaded = useCallback((src: string) => {
    setLoadedBySrc((current) => (current[src] ? current : { ...current, [src]: true }));
  }, []);

  const preloadImage = useCallback(
    (src: string | null | undefined) => {
      if (!src) return;

      // Same sizes string the rendered <Image> computes for this image, so the
      // optimizer URL (and therefore the cache key) matches exactly.
      const image = Object.values(imagesByProjectRef.current)
        .flat()
        .find((candidate) => candidate.src === src);
      const sizes =
        image?.width && image?.height
          ? getGalleryImageSizes(image.width, image.height)
          : GALLERY_IMAGE_SIZES_FALLBACK;

      preloadGalleryImage(src, sizes, markImageLoaded);
    },
    [markImageLoaded],
  );

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

  // Snapshot of the slide leaving the frame, held only while its outgoing layer
  // is on screen. Shared by the nav handlers and the auto-advance timer so every
  // position change gets the same push transition.
  const outgoingSnapshot = useMemo<SlideSnapshot | null>(
    () => (displaySrc ? { src: displaySrc, sizes: imageSizes } : null),
    [displaySrc, imageSizes],
  );

  const navigate = useCallback(
    (direction: SlideDirection, update: () => void, outgoing: SlideSnapshot | null) => {
      setSlideDirection(direction);
      if (outgoing && !reduceMotion) {
        transitionIdRef.current += 1;
        setTransition({ ...outgoing, id: transitionIdRef.current, direction });
      }
      update();
      bumpCycle();
    },
    [bumpCycle, reduceMotion],
  );

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
      navigate("next", () => {
        setPosition((prev) => {
          const project = projects[prev.projectIndex];
          const images = project?.url ? imagesByProjectRef.current[project.url] ?? [] : [];
          // Thumbnail fallback counts as one slide until the API response arrives.
          const imageCount = images.length > 0 ? images.length : 1;
          return advanceImagePosition(prev, projectCount, imageCount);
        });
      }, outgoingSnapshot);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [
    cycleKey,
    navigate,
    outgoingSnapshot,
    position.imageIndex,
    position.projectIndex,
    projectCount,
    projects,
    reduceMotion,
  ]);

  useEffect(() => {
    if (!currentProjectId) return;

    if (currentImages.length > 1) {
      const nextIndex = (position.imageIndex + 1) % currentImages.length;
      const prevIndex =
        (position.imageIndex - 1 + currentImages.length) % currentImages.length;
      preloadImage(currentImages[nextIndex]?.src);
      preloadImage(currentImages[prevIndex]?.src);
    }

    if (projectCount < 2) return;

    const nextProject = projects[(position.projectIndex + 1) % projectCount];
    const prevProject = projects[(position.projectIndex - 1 + projectCount) % projectCount];

    for (const project of [nextProject, prevProject]) {
      if (!project?.url) continue;
      const images = imagesByProject[project.url];
      preloadImage(images?.[0]?.src ?? project.fallbackSrc);
    }
  }, [
    currentImages,
    currentProjectId,
    imagesByProject,
    position.imageIndex,
    position.projectIndex,
    preloadImage,
    projectCount,
    projects,
  ]);

  const goNextProject = useCallback(() => {
    navigate(
      "next",
      () => {
        setPosition((prev) => nextProjectPosition(prev, projectCount));
      },
      outgoingSnapshot,
    );
  }, [navigate, outgoingSnapshot, projectCount]);

  const goPrevProject = useCallback(() => {
    navigate(
      "prev",
      () => {
        setPosition((prev) => prevProjectPosition(prev, projectCount));
      },
      outgoingSnapshot,
    );
  }, [navigate, outgoingSnapshot, projectCount]);

  const goNextPhoto = useCallback(() => {
    navigate(
      "next",
      () => {
        setPosition((prev) => {
          const project = projects[prev.projectIndex];
          const images = project?.url ? imagesByProject[project.url] ?? [] : [];
          return nextPhotoInProject(prev, images.length);
        });
      },
      outgoingSnapshot,
    );
  }, [
    imagesByProject,
    navigate,
    outgoingSnapshot,
    projects,
  ]);

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

  // Drop the outgoing layer once its own exit animation has played. The nested
  // image has its own fade animation, so ignore events that bubble from it.
  const handleSlideEnd = useCallback((event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    setTransition(null);
  }, []);

  if (projectCount === 0 || !currentProject) return null;

  const canAutoAdvance =
    !reduceMotion && (hasMultipleProjects || currentImages.length > 1);
  const showProjectNav = hasMultipleProjects;
  const isGalleryLoaded = Boolean(currentProjectId && currentProjectId in imagesByProject);
  const showNextPhoto = currentImages.length > 1;
  const reserveNextPhotoSlot = showNextPhoto || !isGalleryLoaded;
  const photoTotal = Math.max(currentImages.length, 1);
  const nextPhotoLabel = `${CTA_LABELS.nextPhoto} (${position.imageIndex + 1}/${photoTotal})`;
  const projectCounter = GALLERY_TEXTS.projectCounter(
    position.projectIndex + 1,
    projectCount,
  );
  const slideStatus = GALLERY_TEXTS.slideStatus(
    currentProject.title,
    position.imageIndex + 1,
    photoTotal,
  );
  const slideKey = `${position.projectIndex}-${position.imageIndex}`;
  const progressKey = `${position.projectIndex}-${position.imageIndex}-${cycleKey}`;
  const showNavBar = showProjectNav || reserveNextPhotoSlot;
  const projectDetailHref = projectDetailPath(currentProject.url);
  const projectAccentColor = currentProject.accentColor ?? "var(--color-accent)";

  return (
    <div>
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
          <div className={styles.stage}>
            <div className={styles.media}>
              <span className={styles.slideStatus} aria-live="polite">
                {slideStatus}
              </span>
              <Link href={projectDetailHref} className={styles.mediaLink}>
                <div className={styles.placeholder} aria-hidden />
                {/* Outgoing slide: slides away while the incoming one slides in. */}
                {transition && !reduceMotion ? (
                  <div
                    key={`out-${transition.id}`}
                    className={styles.slideOutLayer}
                    data-direction={transition.direction}
                    onAnimationEnd={handleSlideEnd}
                    aria-hidden
                  >
                    <Image
                      src={transition.src}
                      alt=""
                      fill
                      className={styles.image}
                      data-loaded="true"
                      sizes={transition.sizes}
                      quality={GALLERY_IMAGE_QUALITY}
                    />
                  </div>
                ) : null}
                {displaySrc ? (
                  <div
                    key={slideKey}
                    className={styles.slideLayer}
                    data-direction={reduceMotion ? undefined : slideDirection}
                  >
                    <Image
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
                        markImageLoaded(displaySrc);
                      }}
                    />
                  </div>
                ) : null}
                <div className={styles.scrim} aria-hidden />
                <div className={styles.overlay}>
                  <div className={styles.caption}>
                    <ProjectAccentTitle
                      as={captionHeadingLevel}
                      accentColor={projectAccentColor}
                      className={styles.captionTitle}
                      startWhen="delay"
                    >
                      {currentProject.title}
                    </ProjectAccentTitle>
                    {currentProject.type ? (
                      <p className={styles.typeLabel}>
                        {GALLERY_TEXTS.typeLabel[currentProject.type]}
                        {showProjectNav ? (
                          <>
                            {" "}
                            <span className={styles.typeCounter}>
                              {GALLERY_TEXTS.projectCounterCompact(
                                position.projectIndex + 1,
                                projectCount,
                              )}
                            </span>
                          </>
                        ) : null}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Link>
              {!reduceMotion && canAutoAdvance ? (
                <div className={styles.advanceTrack} aria-hidden>
                  <div key={progressKey} className={styles.advanceFill} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </RevealItem>

      {showNavBar ? (
        <RevealItem className={styles.revealBlock}>
          <div className={styles.navBar}>
            {showProjectNav ? (
              <>
                <button
                  type="button"
                  className={styles.navBarButton}
                  data-direction="prev"
                  onClick={goPrevProject}
                  aria-label={GALLERY_TEXTS.aria.prevProject}
                >
                  <FaChevronLeft size={12} aria-hidden />
                </button>
                <span className={styles.projectCounter}>{projectCounter}</span>
                <button
                  type="button"
                  className={styles.navBarButton}
                  data-direction="next"
                  onClick={goNextProject}
                  aria-label={GALLERY_TEXTS.aria.nextProject}
                >
                  <FaChevronRight size={12} aria-hidden />
                </button>
              </>
            ) : null}
            {reserveNextPhotoSlot ? (
              <button
                type="button"
                className={styles.nextPhotoButton}
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
        </RevealItem>
      ) : null}
    </RevealStagger>
    </div>
  );
}
