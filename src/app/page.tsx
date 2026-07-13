import { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectsBoardButton } from "@/shared/ui/projects-tag-link";
import { SkillsGrid } from "@/widgets/skills-grid";
import { ExperienceGrid } from "@/widgets/experience-grid";
import { ProcessGrid } from "@/widgets/process-grid";
import { HeroStats } from "@/widgets/hero-stats";
import { ProjectCard } from "@/entities/project";
import { HOME_PAGE_TEXTS, getHomeSelectedProjects } from "@/shared/constants/data";
import { contactSectionHref, homeSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: { absolute: "AxmBro.dev | Home" },
  openGraph: {
    title: "AxmBro.dev | Home",
    description:
      "I am a 20-year-old Computer Science student and UI Architect from Poland. Specializing in engineering custom Minecraft Bedrock interfaces (JsonUI) and modern web applications.",
    images: ["/images/ui/og-image.png"],
  },
};

export default function HomePage() {
  const selectedProjects = getHomeSelectedProjects();

  return (
    <ScreenContainer>

      <ScreenSection
        id={SECTION_IDS.about}
        withChildrenPadding={false}
        title="About"
        headingLevel="h1"
        titleDescription={HOME_PAGE_TEXTS.about.description}
      >
        <ButtonGroup padInline marginBottom>
          <Button text="Get in Touch" variant={buttonVariantForIndex(0)} href={contactSectionHref(SECTION_IDS.sendMessage)} />
          <Button text="Browse Projects" variant={buttonVariantForIndex(1)} href={ROUTES.projects} />
          <Button text="Commission Process" variant={buttonVariantForIndex(2)} href={homeSectionHref(SECTION_IDS.commissionProcess)} />
        </ButtonGroup>
        <HeroStats />
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.skills}
        title="Skills"
        titleDescription={HOME_PAGE_TEXTS.skills.description}
        withChildrenPadding={false}
      >
        <SkillsGrid />
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.experience}
        title="Experience"
        titleDescription={HOME_PAGE_TEXTS.experience.description}
        withChildrenPadding={false}
      >
        <ExperienceGrid />
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.selectedWork}
        title="Selected Work"
        titleDescription={HOME_PAGE_TEXTS.selectedWork.description}
        withChildrenPadding={false}
      >
        <div className={styles.selectedGrid}>
          {selectedProjects.map((project) => (
            <div key={project.url} className={styles.selectedGridItem}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        <div className={styles.selectedFooter}>
          <ButtonGroup>
            <ProjectsBoardButton text="View all projects" tab="all" variant="primary" />
            <ProjectsBoardButton text="More featured projects" tab="featured" />
          </ButtonGroup>
        </div>
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.commissionProcess}
        title="Commission Process"
        titleDescription={HOME_PAGE_TEXTS.process.description}
        withChildrenPadding={false}
      >
        <ProcessGrid />

        <div className={styles.processCta}>
          <div className={styles.ctaHeader}>
            <h3 className={styles.ctaTitle}>Ready to build something amazing?</h3>
            <p className={styles.ctaText}>{HOME_PAGE_TEXTS.contact.description}</p>
          </div>
          <ButtonGroup align="center" marginTop>
            <Button text="Start a Project" variant="primary" href={contactSectionHref(SECTION_IDS.sendMessage)} />
            <Button text="Common questions" variant="outline" href={contactSectionHref(SECTION_IDS.faq)} />
          </ButtonGroup>
        </div>
      </ScreenSection>

    </ScreenContainer>
  );
}
