import type { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ConversionCloser } from "@/shared/ui/conversion-closer";
import { Reveal } from "@/shared/ui/motion";
import { AnnouncementBar } from "@/widgets/announcement-bar";
import { SkillsGrid } from "@/widgets/skills-grid";
import { ExperienceGrid } from "@/widgets/experience-grid";
import { HeroSection } from "@/widgets/hero-section";
import { TrackRecord } from "@/widgets/track-record";
import { SelectedWork } from "@/widgets/selected-work";
import { HOME_PAGE_TEXTS, SITE_METADATA, SITE_ROLE, CTA_LABELS, SOCIAL_LINK_BUTTONS } from "@/shared/constants/data";
import { contactFormHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { buildPersonJsonLd, JsonLd } from "@/shared/lib/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: SITE_ROLE.headline,
  absoluteTitle: `AxmBro.dev | ${SITE_ROLE.headline}`,
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
        <HeroSection />

        <ScreenSection
          id={SECTION_IDS.trackRecord}
          eyebrow="Proof"
          title="Track Record"
          titleDescription={HOME_PAGE_TEXTS.trackRecord.description}
          withChildrenPadding={false}
          grid="top"
        >
          <TrackRecord />
        </ScreenSection>

        <ScreenSection
          id={SECTION_IDS.selectedWork}
          eyebrow="Work"
          title="Selected Projects"
          titleDescription={HOME_PAGE_TEXTS.selectedWork.description}
          withChildrenPadding={false}
          variant="accent"
          grid="top"
        >
          <SelectedWork />
        </ScreenSection>

        <Reveal>
          <ScreenSection
            id={SECTION_IDS.experience}
            eyebrow="Background"
            title="Experience"
            titleDescription={HOME_PAGE_TEXTS.experience.description}
            withChildrenPadding={false}
          >
            <ExperienceGrid />
          </ScreenSection>
        </Reveal>

        <Reveal>
          <ScreenSection
            id={SECTION_IDS.skills}
            eyebrow="Capabilities"
            title="Skills"
            titleDescription={HOME_PAGE_TEXTS.skills.description}
            withChildrenPadding={false}
            grid="top"
          >
            <SkillsGrid />
          </ScreenSection>
        </Reveal>

        <ConversionCloser
          id={SECTION_IDS.workWithMe}
          eyebrow="Services"
          title="Work With Me"
          titleDescription={HOME_PAGE_TEXTS.workWithMe.description}
        >
          <ButtonGroup>
            <Button
              text={HOME_PAGE_TEXTS.workWithMe.ctaPrimary}
              variant={buttonVariantForIndex(0)}
              href={contactFormHref()}
            />
            <Button
              text={CTA_LABELS.commissionDetails}
              variant={buttonVariantForIndex(1)}
              href={ROUTES.commissions}
            />
          </ButtonGroup>
        </ConversionCloser>
      </ScreenContainer>
    </>
  );
}
