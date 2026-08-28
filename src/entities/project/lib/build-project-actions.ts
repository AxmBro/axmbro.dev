import { CTA_LABELS, type ProjectItem } from "@/shared/constants/data";
import type { ProjectMarkdownData } from "./get-project-data";
import { contactSectionHref, SECTION_IDS } from "@/shared/constants/anchors";

export interface ProjectAction {
  text: string;
  href: string;
  external?: boolean;
}

export function buildProjectActions(
  project: ProjectItem,
  pageData: ProjectMarkdownData | null,
): ProjectAction[] {
  const actions: ProjectAction[] = [];

  if (project.downloadLink) {
    actions.push({
      text: "Download",
      href: project.downloadLink,
      external: true,
    });
  }

  pageData?.extraButtons?.forEach((btn) => {
    actions.push({
      text: btn.text,
      href: btn.href,
      external: btn.external,
    });
  });

  const showCommissionCta =
    project.type === "commissions" ||
    project.tags?.some((tag) => tag === "JsonUI" || tag === "Server Form");

  actions.push({
    text: showCommissionCta ? CTA_LABELS.requestSimilarWork : CTA_LABELS.startProject,
    href: contactSectionHref(SECTION_IDS.startProject),
  });

  return actions;
}
