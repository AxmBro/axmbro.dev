import type { Metadata } from "next";
import { Suspense } from "react";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { PROJECTS, HOME_PAGE_TEXTS } from "@/shared/constants/data";
import { contactSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { ProjectsBoard } from "@/widgets/projects-board";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio of AxmBro - custom Minecraft Bedrock interfaces (JsonUI) for marketplace studios, commissioned HUDs and server forms, and web development projects.",
  openGraph: {
    title: "AxmBro.dev | Projects",
    description:
      "Portfolio of AxmBro - custom Minecraft Bedrock interfaces (JsonUI) for marketplace studios, commissioned HUDs and server forms, and web development projects.",
    images: ["/images/ui/og-image.png"],
  },
};

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
            text="Start a Project"
            variant="primary"
            href={contactSectionHref(SECTION_IDS.startProject)}
          />
          <Button
            text="Commission Details"
            variant="outline"
            href={ROUTES.commissions}
          />
        </ButtonGroup>
      </ScreenSection>
    </ScreenContainer>
  );
}
