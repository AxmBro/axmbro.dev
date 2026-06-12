import { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button } from "@/shared/ui/button";
import { SkillsGrid } from "@/widgets/skills-grid";
import { ExperienceGrid } from "@/widgets/experience-grid";
import { ProcessGrid } from "@/widgets/process-grid";
import { HeroStats } from "@/widgets/hero-stats";
import { HOME_PAGE_TEXTS } from "@/shared/constants/data";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "AxmBro | Home",
  openGraph: {
    title: "AxmBro | Home",
    description:
      "I am a 20-year-old Computer Science student and UI Architect from Poland. Specializing in engineering custom Minecraft Bedrock interfaces (JsonUI) and modern web applications.",
    images: ["/images/ui/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <ScreenContainer>

      <ScreenSection
        id="aboutme"
        withChildrenPadding={false}
        title="About"
        headingLevel="h1"
        titleDescription={HOME_PAGE_TEXTS.about.description}
      >
        <div className={styles.buttonsGroup}>
          <Button text="Get in Touch" variant="primary" href="/contact" />
          <Button text="View Portfolio" variant="secondary" href="/projects" />
        </div>
        <HeroStats />
      </ScreenSection>

      <ScreenSection
        id="skills"
        title="Skills"
        titleDescription={HOME_PAGE_TEXTS.skills.description}
        withChildrenPadding={false}
      >
        <SkillsGrid />
      </ScreenSection>

      <ScreenSection
        id="experience"
        title="Experience"
        titleDescription={HOME_PAGE_TEXTS.experience.description}
        withChildrenPadding={false}
      >
        <ExperienceGrid />
      </ScreenSection>

      <ScreenSection
        id="process"
        title="Commission Process"
        titleDescription={HOME_PAGE_TEXTS.process.description}
        withChildrenPadding={false}
      >
        <ProcessGrid />
        
        <div className={styles.processCta}>
          <h3 className={styles.ctaTitle}>Ready to build something amazing?</h3>
          <p className={styles.ctaText}>
            {HOME_PAGE_TEXTS.contact.description}
          </p>
          <div className={styles.buttonsGroupContact} style={{ justifyContent: "center", marginTop: "0.5rem" }}>
            <Button text="Start a Project" variant="primary" href="/contact" />
            <Button text="View Portfolio" variant="secondary" href="/projects" />
          </div>
        </div>
      </ScreenSection>

    </ScreenContainer>
  );
}
