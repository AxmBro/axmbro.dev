"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { GalleryProjectMeta } from "@/widgets/project-gallery";
import styles from "./selected-work-gallery.module.scss";

const ProjectGallery = dynamic(
  () => import("@/widgets/project-gallery").then((mod) => mod.ProjectGallery),
  {
    ssr: false,
    loading: () => <GalleryPlaceholder />,
  },
);

function GalleryPlaceholder() {
  return (
    <div className={styles.placeholder} aria-hidden>
      <div className={styles.stage} />
      <div className={styles.captionRow}>
        <div className={styles.captionSkeleton}>
          <span className={styles.line} />
          <span className={`${styles.line} ${styles.lineShort}`} />
        </div>
      </div>
    </div>
  );
}

interface SelectedWorkGalleryProps {
  projects: GalleryProjectMeta[];
}

export function SelectedWorkGallery({ projects }: SelectedWorkGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {shouldLoad ? <ProjectGallery projects={projects} /> : <GalleryPlaceholder />}
    </div>
  );
}
