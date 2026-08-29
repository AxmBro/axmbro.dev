import { PROJECTS } from "@/shared/constants/data";
import type { ProjectItem } from "@/shared/constants/data";

/** Same order as projects board tab "all" with default sort (featured first). */
export function getHomeGalleryProjectList(): ProjectItem[] {
  return [...PROJECTS]
    .filter((project): project is ProjectItem & { url: string } => Boolean(project.url))
    .sort((a, b) => {
      if (a.star && !b.star) return -1;
      if (!a.star && b.star) return 1;
      return 0;
    });
}
