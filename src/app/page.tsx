import type { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectsBoardButton } from "@/shared/ui/projects-tag-link";
import { SkillsGrid } from "@/widgets/skills-grid";
import { ExperienceGrid } from "@/widgets/experience-grid";
import { HeroSection } from "@/widgets/hero-section";
import { TrackRecord } from "@/widgets/track-record";
import { ProjectCard } from "@/entities/project";
import { HOME_PAGE_TEXTS, getHomeSelectedProjects, SITE_METADATA, CTA_LABELS } from "@/shared/constants/data";
import { contactSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import styles from "./page.module.scss";

export const metadata: Metadata = createPageMetadata({
  title: "Minecraft Bedrock UI Engineer",
  description: SITE_METADATA.homeDescription,
  path: ROUTES.home,
});

export default function HomePage() {
  const selectedProjects = getHomeSelectedProjects();

  return (
    <ScreenContainer>
      <HeroSection />

      <ScreenSection
        id={SECTION_IDS.trackRecord}
        eyebrow="Proof"
        title="Track Record"
        titleDescription={HOME_PAGE_TEXTS.trackRecord.description}
        withChildrenPadding={false}
      >
        <TrackRecord />
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.selectedWork}
        eyebrow="Portfolio"
        title="Selected Work"
        titleDescription={HOME_PAGE_TEXTS.selectedWork.description}
        withChildrenPadding={false}
      >
        <div className={styles.selectedGrid}>
          {selectedProjects.map((project) => (
            <div key={project.url} className={styles.selectedGridItem}>
              <ProjectCard project={project} compact />
            </div>
          ))}
        </div>
        <div className={styles.selectedFooter}>
          <div className={styles.selectedFooterHeader}>
            <h3 className={styles.selectedFooterTitle}>Explore More Projects</h3>
            <p className={styles.selectedFooterDescription}>
              {HOME_PAGE_TEXTS.selectedWork.exploreMore}
            </p>
          </div>
          <ButtonGroup marginTop>
            <ProjectsBoardButton text={CTA_LABELS.browseAllProjects} tab="all" variant="primary" />
            <ProjectsBoardButton text="View Featured Projects" tab="featured" />
          </ButtonGroup>
        </div>
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.experience}
        eyebrow="Background"
        title="Experience & Education"
        titleDescription={HOME_PAGE_TEXTS.experience.description}
        withChildrenPadding={false}
      >
        <ExperienceGrid />
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.skills}
        eyebrow="Capabilities"
        title="Skills"
        titleDescription={HOME_PAGE_TEXTS.skills.description}
        withChildrenPadding={false}
      >
        <SkillsGrid />
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.workWithMe}
        eyebrow="Services"
        title="Work With Me"
        titleDescription={HOME_PAGE_TEXTS.contact.description}
        withChildrenPadding={false}
      >
        <ButtonGroup padInline marginBottom>
          <Button
            text={CTA_LABELS.commissionDetails}
            variant={buttonVariantForIndex(0)}
            href={ROUTES.commissions}
          />
          <Button
            text={CTA_LABELS.startProject}
            variant={buttonVariantForIndex(1)}
            href={contactSectionHref(SECTION_IDS.startProject)}
          />
        </ButtonGroup>
      </ScreenSection>
    </ScreenContainer>
  );
}
