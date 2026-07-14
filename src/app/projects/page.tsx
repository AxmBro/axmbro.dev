import type { Metadata } from "next";
import { Suspense } from "react";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { PROJECTS, HOME_PAGE_TEXTS, SITE_METADATA, CTA_LABELS } from "@/shared/constants/data";
import { contactSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { ProjectsBoard } from "@/widgets/projects-board";
import styles from "./page.module.scss";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description: SITE_METADATA.projectsDescription,
  path: ROUTES.projects,
});

export default function ProjectsPage() {
  return (
    <ScreenContainer>
      <ScreenSection
        eyebrow="Portfolio"
        title="Projects"
        headingLevel="h1"
        titleDescription={HOME_PAGE_TEXTS.projectsPage.description(PROJECTS.length)}
        withChildrenPadding={false}
      >
        <Suspense fallback={<div className={styles.loading}>Loading projects...</div>}>
          <ProjectsBoard />
        </Suspense>
      </ScreenSection>

      <ScreenSection
        eyebrow="Services"
        title="Want Something Similar?"
        titleDescription="Tell me about your project, or review the commission scope, workflow, pricing details, and support terms before you get in touch."
        withChildrenPadding={false}
      >
        <ButtonGroup padInline padBottom>
          <Button
            text={CTA_LABELS.startProject}
            variant="primary"
            href={contactSectionHref(SECTION_IDS.startProject)}
          />
          <Button
            text={CTA_LABELS.commissionDetails}
            variant="outline"
            href={ROUTES.commissions}
          />
        </ButtonGroup>
      </ScreenSection>
    </ScreenContainer>
  );
}
