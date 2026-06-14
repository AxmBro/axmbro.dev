import { Metadata } from "next";
import { Suspense } from "react";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button } from "@/shared/ui/button";
import { PROJECTS, HOME_PAGE_TEXTS } from "@/shared/constants/data";
import { contactSectionHref, homeSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
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
        title="Projects"
        headingLevel="h1"
        titleDescription={HOME_PAGE_TEXTS.projectsPage.description(PROJECTS.length)}
        withChildrenPadding={false}
      >
        <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center", color: "var(--color-neutral-400)" }}>Loading projects...</div>}>
          <ProjectsBoard />
        </Suspense>
      </ScreenSection>

      <ScreenSection
        title="Need something similar?"
        titleDescription="Tell me about your project and I'll reply within 24 hours. New to commissions? See how I plan, build, and deliver JsonUI work before you reach out."
        withChildrenPadding={false}
      >
        <div className={styles.buttonsGroup}>
          <Button text="Get in Touch" variant="primary" href={contactSectionHref(SECTION_IDS.sendMessage)} />
          <Button
            text="View commission process"
            variant="outline"
            href={homeSectionHref(SECTION_IDS.commissionProcess)}
          />
        </div>
      </ScreenSection>
    </ScreenContainer>
  );
}
