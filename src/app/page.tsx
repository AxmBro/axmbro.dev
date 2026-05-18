import { Metadata } from "next";
import Link from "next/link";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button } from "@/shared/ui/button";
import { SkillsGrid } from "@/widgets/home/skills-grid/skills-grid";
import { ExperienceGrid } from "@/widgets/home/experience-grid/experience-grid";
import { HeroStats } from "@/widgets/home/hero-stats/hero-stats";
import { PORTFOLIO_TEXTS } from "@/shared/constants/data";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <ScreenContainer>

      <ScreenSection
        id="aboutme"
        withChildrenPadding={false}
        title="About"
        titleDescription={PORTFOLIO_TEXTS.about.description}
      >
        <div className={styles.buttonsGroup}>
          <Link href="/contact">
            <Button text="Get in Touch" variant="primary" />
          </Link>
          <Link href="/projects">
            <Button text="View Portfolio" variant="secondary" />
          </Link>
        </div>
        <HeroStats />
      </ScreenSection>

      <ScreenSection
        id="skills"
        title="Skills"
        titleDescription={PORTFOLIO_TEXTS.skills.description}
        withChildrenPadding={false}
        headingTag="h2"
      >
        <SkillsGrid />
      </ScreenSection>

      <ScreenSection
        id="experience"
        title="Experience"
        titleDescription={PORTFOLIO_TEXTS.experience.description}
        withChildrenPadding={false}
        headingTag="h2"
      >
        <ExperienceGrid />
      </ScreenSection>

      <ScreenSection
        id="contact"
        title="Contact"
        titleDescription={PORTFOLIO_TEXTS.contact.description}
        headingTag="h2"
      >
        <div className={styles.buttonsGroupContact}>
          <Link href="/contact">
            <Button text="Start a Project" variant="primary" />
          </Link>
          <Link href="/projects">
            <Button text="Browse My Work" variant="secondary" />
          </Link>
        </div>
      </ScreenSection>

    </ScreenContainer>
  );
}
