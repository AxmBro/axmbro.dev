import { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button } from "@/shared/ui/button";
import { ProjectsBoardButton } from "@/shared/ui/projects-tag-link";
import { SkillsGrid } from "@/widgets/skills-grid";
import { ExperienceGrid } from "@/widgets/experience-grid";
import { ProcessGrid } from "@/widgets/process-grid";
import { HeroStats } from "@/widgets/hero-stats";
import { ProjectCard } from "@/entities/project";
import { HOME_PAGE_TEXTS, getHomeSelectedProjects } from "@/shared/constants/data";
import { contactSectionHref, homeSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
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
        <div className={styles.buttonsGroup}>
          <Button text="Get in Touch" variant="primary" href={contactSectionHref(SECTION_IDS.sendMessage)} />
          <Button text="Commission Process" variant="secondary" href={homeSectionHref(SECTION_IDS.commissionProcess)} />
        </div>
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
          <ProjectsBoardButton text="View all projects" tab="all" variant="primary" />
          <ProjectsBoardButton text="More featured projects" tab="featured" />
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
          <div className={styles.buttonsGroupContact}>
            <Button text="Start a Project" variant="primary" href={contactSectionHref(SECTION_IDS.sendMessage)} />
            <Button text="Common questions" variant="secondary" href={contactSectionHref(SECTION_IDS.faq)} />
          </div>
        </div>
      </ScreenSection>

    </ScreenContainer>
  );
}
