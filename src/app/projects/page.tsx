import type { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { PROJECTS, HOME_PAGE_TEXTS, SITE_METADATA, CTA_LABELS } from "@/shared/constants/data";
import { contactSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { ConversionCloser } from "@/shared/ui/conversion-closer";
import { ProjectsBoard } from "@/widgets/projects-board";

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
        variant="default"
      >
        <ProjectsBoard />
      </ScreenSection>

      <ConversionCloser
        eyebrow="Services"
        title="Want Something Similar?"
        titleDescription="Tell me about your project, or review the commission scope, workflow, pricing details, and support terms before you get in touch."
      >
        <ButtonGroup padInline marginBottom>
          <Button
            text={CTA_LABELS.startProject}
            variant={buttonVariantForIndex(0)}
            href={contactSectionHref(SECTION_IDS.startProject)}
          />
          <Button
            text={CTA_LABELS.commissionDetails}
            variant={buttonVariantForIndex(1)}
            href={ROUTES.commissions}
          />
        </ButtonGroup>
      </ConversionCloser>
    </ScreenContainer>
  );
}
