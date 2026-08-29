import type { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { PROJECTS, HOME_PAGE_TEXTS, SITE_METADATA, CTA_LABELS } from "@/shared/constants/data";
import { commissionSectionHref, contactFormHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { ConversionCloser } from "@/shared/ui/conversion-closer";
import { Reveal } from "@/shared/ui/motion";
import { ProjectsBoard } from "@/widgets/projects-board";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description: SITE_METADATA.projectsDescription,
  path: ROUTES.projects,
});

export default function ProjectsPage() {
  return (
    <ScreenContainer>
      <Reveal>
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
      </Reveal>

      <ConversionCloser
        eyebrow="Services"
        title="Want Something Similar?"
        titleDescription={HOME_PAGE_TEXTS.projectsPage.closerDescription}
      >
        <ButtonGroup>
          <Button
            text={CTA_LABELS.commissionDetails}
            variant={buttonVariantForIndex(0)}
            href={commissionSectionHref(SECTION_IDS.commissionServices)}
          />
          <Button
            text={CTA_LABELS.contactMe}
            variant={buttonVariantForIndex(1)}
            href={contactFormHref()}
          />
        </ButtonGroup>
      </ConversionCloser>
    </ScreenContainer>
  );
}