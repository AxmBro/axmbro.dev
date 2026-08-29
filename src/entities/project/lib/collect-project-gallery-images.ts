import type { ProjectMarkdownData } from "./get-project-data";
import type { ProjectItem } from "@/shared/constants/data";
import { readPublicPngDimensions } from "./read-png-dimensions";

const DEFAULT_WIDTH = 1920;
const DEFAULT_HEIGHT = 1080;

export function collectProjectGalleryImageMeta(
  project: Pick<ProjectItem, "url" | "imgSrc">,
  pageData: Pick<ProjectMarkdownData, "imageSections"> | null,
) {
  if (!project.url) return [];

  const seen = new Set<string>();
  const images: { src: string; width: number; height: number }[] = [];

  const add = (fileName: string | undefined) => {
    if (!fileName) return;
    const src = `/images/projects/${project.url}/${fileName}.png`;
    if (seen.has(src)) return;
    seen.add(src);

    const size = readPublicPngDimensions(src);
    images.push({
      src,
      width: size?.width ?? DEFAULT_WIDTH,
      height: size?.height ?? DEFAULT_HEIGHT,
    });
  };

  add(project.imgSrc);

  pageData?.imageSections?.forEach((section) => {
    section.items.forEach((item) => add(item.imageSrc));
  });

  return images;
}
