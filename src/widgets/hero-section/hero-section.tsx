import { contactSectionHref, homeSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import { HOME_PAGE_TEXTS } from "@/shared/constants/data";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ScreenSection } from "@/shared/ui/screen-section";
import { HeroPortrait } from "./hero-portrait";
import styles from "./hero-section.module.scss";

export const HeroSection = () => (
  <ScreenSection id={SECTION_IDS.profile} withChildrenPadding={false}>
    <div className={styles.heroGrid}>
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>Profile</p>
        <h1 className={styles.title}>Minecraft Bedrock UI Engineer & Frontend Developer</h1>
        <p className={styles.description}>{HOME_PAGE_TEXTS.hero.description}</p>
        <ButtonGroup marginTop>
          <Button
            text="View Selected Work"
            variant={buttonVariantForIndex(0)}
            href={homeSectionHref(SECTION_IDS.selectedWork)}
          />
          <Button
            text="Start a Project"
            variant={buttonVariantForIndex(1)}
            href={contactSectionHref(SECTION_IDS.startProject)}
          />
        </ButtonGroup>
      </div>
      <div className={styles.portraitColumn}>
        <HeroPortrait />
      </div>
    </div>
  </ScreenSection>
);
