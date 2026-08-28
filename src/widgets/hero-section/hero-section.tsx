import { SECTION_IDS } from "@/shared/constants/anchors";
import { HOME_PAGE_TEXTS } from "@/shared/constants/data";
import { ROUTES } from "@/shared/constants/routes";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ScreenSection, SectionEyebrow } from "@/shared/ui/screen-section";
import { HeroContentReveal } from "./hero-content-reveal";
import { HeroPortrait } from "./hero-portrait";
import { HeroPortraitReveal } from "./hero-portrait-reveal";
import { HeroWaveTimer } from "./hero-wave-timer";
import styles from "./hero-section.module.scss";

export const HeroSection = () => (
  <ScreenSection
    id={SECTION_IDS.profile}
    withChildrenPadding={false}
    className={styles.heroSection}
  >
    <HeroWaveTimer />
    <div className={styles.waveLayer} data-pixel-wave-behind />
    <div className={styles.heroGrid}>
      <HeroContentReveal className={styles.heroContent}>
        <SectionEyebrow>Profile</SectionEyebrow>
        <h1 className={`${styles.title} ${styles.titleAccent}`}>
          Minecraft Bedrock UI Engineer & Frontend Developer
        </h1>
        <p className={styles.description}>{HOME_PAGE_TEXTS.hero.description}</p>
        <ButtonGroup marginTop>
          <Button
            text={HOME_PAGE_TEXTS.hero.ctaWork}
            variant={buttonVariantForIndex(0)}
            href={ROUTES.projects}
          />
          <Button
            text={HOME_PAGE_TEXTS.hero.ctaCommissions}
            variant={buttonVariantForIndex(1)}
            href={ROUTES.commissions}
          />
        </ButtonGroup>
      </HeroContentReveal>
      <HeroPortraitReveal className={styles.portraitColumn}>
        <HeroPortrait />
      </HeroPortraitReveal>
    </div>
  </ScreenSection>
);
