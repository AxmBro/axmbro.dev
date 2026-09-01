import Image from "next/image";
import Link from "next/link";
import { GALLERY_TEXTS } from "@/shared/constants/data";
import { projectDetailPath } from "@/shared/constants/routes";
import type { GalleryProjectMeta } from "@/widgets/project-gallery";
import galleryStyles from "@/widgets/project-gallery/project-gallery.module.scss";

interface GalleryStaticFallbackProps {
  project: GalleryProjectMeta;
}

/** SSR-visible first slide for crawlers before the client carousel hydrates. */
export function GalleryStaticFallback({ project }: GalleryStaticFallbackProps) {
  if (!project.fallbackSrc) return null;

  return (
    <article
      className={galleryStyles.gallery}
      aria-label={GALLERY_TEXTS.aria.region}
    >
      <div className={galleryStyles.stage}>
        <div className={galleryStyles.media}>
          <Link
            href={projectDetailPath(project.url)}
            className={galleryStyles.mediaLink}
          >
            <Image
              src={project.fallbackSrc}
              alt={GALLERY_TEXTS.imageAlt(project.title, 1)}
              fill
              className={galleryStyles.image}
              data-loaded="true"
              sizes="(max-width: 992px) 100vw, min(100vw, 1280px)"
              priority
            />
            <div className={galleryStyles.scrim} aria-hidden />
            <div className={galleryStyles.overlay}>
              <div className={galleryStyles.caption}>
                <h3 className={galleryStyles.title}>{project.title}</h3>
                {project.type ? (
                  <p className={galleryStyles.typeLabel}>
                    {GALLERY_TEXTS.typeLabel[project.type]}
                  </p>
                ) : null}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
