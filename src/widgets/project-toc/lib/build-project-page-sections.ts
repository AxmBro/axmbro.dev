import { SECTION_IDS } from "@/shared/constants/anchors";
import type { ProjectMarkdownData } from "@/entities/project/server";
import type { ProjectTocItem } from "../types";

function slugifySectionId(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSectionId(base: string, used: Set<string>): string {
  let id = base || "section";
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

type ProjectPageData = Pick<
  ProjectMarkdownData,
  "credits" | "videos" | "imageSections"
>;

interface ProjectPageSections {
  overviewId: string;
  creditsId: string | null;
  videoIds: string[];
  galleryIds: string[];
  tocItems: ProjectTocItem[];
}

export function buildProjectPageSections(
  pageData: ProjectPageData | null,
): ProjectPageSections {
  const usedIds = new Set<string>();
  const tocItems: ProjectTocItem[] = [];

  const overviewId = uniqueSectionId(SECTION_IDS.projectOverview, usedIds);
  tocItems.push({ id: overviewId, label: "Overview" });

  const creditsId = pageData?.credits?.length
    ? uniqueSectionId(SECTION_IDS.projectCredits, usedIds)
    : null;
  if (creditsId) {
    tocItems.push({ id: creditsId, label: "Credits" });
  }

  const videoIds =
    pageData?.videos?.map((video, i) =>
      uniqueSectionId(
        i === 0 ? SECTION_IDS.projectShowcase : slugifySectionId(video.title),
        usedIds,
      ),
    ) ?? [];

  if (videoIds.length > 0) {
    tocItems.push({
      id: videoIds[0],
      label: "Videos",
      watchIds: videoIds,
    });
  }

  const galleryIds =
    pageData?.imageSections?.map((section, i) => {
      const id = uniqueSectionId(slugifySectionId(section.title), usedIds);
      tocItems.push({
        id,
        label: section.title.trim() || `Section ${i + 1}`,
      });
      return id;
    }) ?? [];

  return { overviewId, creditsId, videoIds, galleryIds, tocItems };
}
