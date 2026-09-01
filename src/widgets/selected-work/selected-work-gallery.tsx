"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { GalleryProjectMeta } from "@/widgets/project-gallery";
import { GalleryStaticFallback } from "./gallery-static-fallback";

const LazyProjectGallery = dynamic(
  () => import("@/widgets/project-gallery").then((mod) => mod.ProjectGallery),
);

interface SelectedWorkGalleryProps {
  projects: GalleryProjectMeta[];
}

export function SelectedWorkGallery({ projects }: SelectedWorkGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [chunkReady, setChunkReady] = useState(false);
  const firstProject = projects[0];

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

  useEffect(() => {
    if (!shouldLoad) return;
    void import("@/widgets/project-gallery").then(() => setChunkReady(true));
  }, [shouldLoad]);

  if (!firstProject) return null;

  const showCarousel = shouldLoad && chunkReady;

  return (
    <div ref={ref}>
      {showCarousel ? (
        <LazyProjectGallery projects={projects} captionHeadingLevel="h3" />
      ) : (
        <GalleryStaticFallback project={firstProject} />
      )}
    </div>
  );
}
