import type { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ConversionCloser } from "@/shared/ui/conversion-closer";
import { AnnouncementBar } from "@/widgets/announcement-bar";
import { SkillsGrid } from "@/widgets/skills-grid";
import { ExperienceGrid } from "@/widgets/experience-grid";
import { HeroSection } from "@/widgets/hero-section";
import { ClientLogoStrip, TrackRecord } from "@/widgets/track-record";
import { SelectedWork } from "@/widgets/selected-work";
import {
  HOME_CLIENT_STUDIOS,
  HOME_PAGE_TEXTS,
  SITE_METADATA,
  SITE_ROLE,
  SOCIAL_LINK_BUTTONS,
  pageTitle,
} from "@/shared/constants/data";
import { contactFormHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { buildPersonJsonLd, JsonLd } from "@/shared/lib/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: SITE_ROLE.headline,
  absoluteTitle: pageTitle(SITE_ROLE.headline),
  description: SITE_METADATA.homeDescription,
  path: ROUTES.home,
});

export default function HomePage() {
  const sameAs = SOCIAL_LINK_BUTTONS.filter((link) =>
    link.href.startsWith("http"),
  ).map((link) => link.href);

  return (
    <>
      <AnnouncementBar />
      <ScreenContainer>
        <JsonLd
          data={buildPersonJsonLd({
            description: SITE_METADATA.homeDescription,
            sameAs,
          })}
        />
        <HeroSection footer={<ClientLogoStrip clients={HOME_CLIENT_STUDIOS} />} />

        <ScreenSection
          id={SECTION_IDS.selectedWork}
          eyebrow={HOME_PAGE_TEXTS.selectedWork.eyebrow}
          title={HOME_PAGE_TEXTS.selectedWork.title}
          titleDescription={HOME_PAGE_TEXTS.selectedWork.description}
          withChildrenPadding={false}
          grid="top"
        >
          <SelectedWork />
        </ScreenSection>

        <ScreenSection
          id={SECTION_IDS.trackRecord}
          eyebrow={HOME_PAGE_TEXTS.trackRecord.eyebrow}
          title={HOME_PAGE_TEXTS.trackRecord.title}
          titleDescription={HOME_PAGE_TEXTS.trackRecord.description}
          withChildrenPadding={false}
          variant="accent"
          grid="top"
        >
          <TrackRecord />
        </ScreenSection>

        <ScreenSection
          id={SECTION_IDS.experience}
          eyebrow={HOME_PAGE_TEXTS.experience.eyebrow}
          title={HOME_PAGE_TEXTS.experience.title}
          titleDescription={HOME_PAGE_TEXTS.experience.description}
          withChildrenPadding={false}
        >
          <ExperienceGrid />
        </ScreenSection>

        <ScreenSection
          id={SECTION_IDS.skills}
          eyebrow={HOME_PAGE_TEXTS.skills.eyebrow}
          title={HOME_PAGE_TEXTS.skills.title}
          titleDescription={HOME_PAGE_TEXTS.skills.description}
          withChildrenPadding={false}
          fullWidthGrid
        >
          <SkillsGrid />
        </ScreenSection>

        <ConversionCloser
          id={SECTION_IDS.workWithMe}
          eyebrow={HOME_PAGE_TEXTS.workWithMe.eyebrow}
          title={HOME_PAGE_TEXTS.workWithMe.title}
          titleDescription={HOME_PAGE_TEXTS.workWithMe.description}
        >
          <ButtonGroup>
            <Button
              text={HOME_PAGE_TEXTS.workWithMe.ctaPrimary}
              variant={buttonVariantForIndex(0)}
              href={contactFormHref()}
            />
            <Button
              text={HOME_PAGE_TEXTS.workWithMe.ctaSecondary}
              variant={buttonVariantForIndex(1)}
              href={ROUTES.commissions}
            />
          </ButtonGroup>
        </ConversionCloser>
      </ScreenContainer>
    </>
  );
}
