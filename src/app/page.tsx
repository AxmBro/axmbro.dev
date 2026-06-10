import { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button } from "@/shared/ui/button";
import { SkillsGrid } from "@/widgets/skills-grid";
import { ExperienceGrid } from "@/widgets/experience-grid";
import { HeroStats } from "@/widgets/hero-stats";
import { HOME_PAGE_TEXTS } from "@/shared/constants/data";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "AxmBro | Home",
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
        id="contact"
        title="Contact"
        titleDescription={HOME_PAGE_TEXTS.contact.description}>
        <div className={styles.buttonsGroupContact}>
          <Button text="Start a Project" variant="primary" href="/contact" />
          <Button text="View Portfolio" variant="secondary" href="/projects" />
        </div>
      </ScreenSection>

    </ScreenContainer>
  );
}
