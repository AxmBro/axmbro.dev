import { SECTION_IDS } from "@/shared/constants/anchors";
import { HOME_PAGE_TEXTS } from "@/shared/constants/data";
import { ROUTES } from "@/shared/constants/routes";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ScreenSection } from "@/shared/ui/screen-section";
import { HeroPortrait } from "./hero-portrait";
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
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>Profile</p>
        <h1 className={styles.title}>Minecraft Bedrock UI Engineer & Frontend Developer</h1>
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
      </div>
      <div className={styles.portraitColumn}>
        <HeroPortrait />
      </div>
    </div>
  </ScreenSection>
);
