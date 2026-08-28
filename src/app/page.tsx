import type { Metadata } from "next";
import Link from "next/link";
import { HashLink } from "@/shared/ui/hash-link";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ConversionCloser } from "@/shared/ui/conversion-closer";
import { ProjectsBoardLink } from "@/shared/ui/projects-tag-link";
import { AnnouncementBar } from "@/widgets/announcement-bar";
import { SkillsGrid } from "@/widgets/skills-grid";
import { ExperienceGrid } from "@/widgets/experience-grid";
import { HeroSection } from "@/widgets/hero-section";
import { TrackRecord } from "@/widgets/track-record";
import { SelectedWork } from "@/widgets/selected-work";
import {
  HOME_PAGE_TEXTS,
  SITE_METADATA,
  CTA_LABELS,
  SOCIAL_LINK_BUTTONS,
} from "@/shared/constants/data";
import { contactSectionHref, homeSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { buildPersonJsonLd, JsonLd } from "@/shared/lib/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "Minecraft Bedrock UI Engineer",
  absoluteTitle: "AxmBro.dev | Minecraft Bedrock UI Engineer",
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
        >
          <TrackRecord />
        </ScreenSection>

        <ScreenSection
          id={SECTION_IDS.selectedWork}
          eyebrow="Portfolio"
          title="Selected Work"
          titleDescription={HOME_PAGE_TEXTS.selectedWork.description}
          withChildrenPadding={false}
          variant="accent"
          grid="top"
        >
          <SelectedWork />
        </ScreenSection>

        <ScreenSection
          id={SECTION_IDS.experience}
          eyebrow="Background"
          title="Experience & Education"
          titleDescription={
            <>
              {HOME_PAGE_TEXTS.experience.description}{" "}
              <ProjectsBoardLink tab="commissions">Browse Client Work</ProjectsBoardLink> to see
              commissioned projects.
            </>
          }
          withChildrenPadding={false}
        >
          <ExperienceGrid />
        </ScreenSection>

        <ScreenSection
          id={SECTION_IDS.skills}
          eyebrow="Capabilities"
          title="Skills"
          titleDescription={HOME_PAGE_TEXTS.skills.description}
          withChildrenPadding={false}
        >
          <SkillsGrid />
        </ScreenSection>

        <ConversionCloser
          id={SECTION_IDS.workWithMe}
          eyebrow="Services"
          title="Work With Me"
          titleDescription={
            <>
              Ready to commission Minecraft Bedrock UI or discuss a web project? Review{" "}
              <HashLink href={homeSectionHref(SECTION_IDS.selectedWork)}>Selected Work</HashLink> for recent
              examples, then send your project brief directly.
            </>
          }
        >
          <ButtonGroup padInline marginBottom>
            <Button
              text={CTA_LABELS.startProject}
              variant={buttonVariantForIndex(0)}
              href={contactSectionHref(SECTION_IDS.startProject)}
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
