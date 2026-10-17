import { SECTION_IDS } from "@/shared/constants/anchors";
import { PROJECT_PAGE_TEXTS } from "@/shared/constants/data";
import type { ProjectMarkdownData } from "@/entities/project/server";
import type { ProjectTocItem } from "./toc-types";

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
  tocItems.push({ id: overviewId, label: PROJECT_PAGE_TEXTS.overview.title });

  const creditsId = pageData?.credits?.length
    ? uniqueSectionId(SECTION_IDS.projectCredits, usedIds)
    : null;
  if (creditsId) {
    tocItems.push({ id: creditsId, label: PROJECT_PAGE_TEXTS.credits.title });
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
      label: PROJECT_PAGE_TEXTS.videos.tocLabel,
      watchIds: videoIds,
    });
  }

  const galleryIds =
    pageData?.imageSections?.map((section, i) => {
      const id = uniqueSectionId(slugifySectionId(section.title), usedIds);
      tocItems.push({
        id,
        label: section.title.trim() || PROJECT_PAGE_TEXTS.untitledSection(i + 1),
        // Long showcase sections report "6/24" in the sticky bar.
        itemCount: section.items.length,
      });
      return id;
    }) ?? [];

  return { overviewId, creditsId, videoIds, galleryIds, tocItems };
}
