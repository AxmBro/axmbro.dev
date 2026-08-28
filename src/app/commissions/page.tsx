import type { Metadata } from "next";
import { FAQAccordion } from "@/features/faq-accordion";
import {
  COMMISSION_DELIVERABLES,
  COMMISSION_FAQ_ITEMS,
  COMMISSION_REQUIREMENTS,
  COMMISSION_SERVICES,
  COMMISSIONS_PAGE_TEXTS,
  PROCESS_STEPS,
  SITE_METADATA,
} from "@/shared/constants/data";
import { contactSectionHref, homeSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { buildFaqPageJsonLd, JsonLd } from "@/shared/lib/json-ld";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ConversionCloser } from "@/shared/ui/conversion-closer";
import { InfoCardsGrid } from "@/shared/ui/info-cards-grid";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";

export const metadata: Metadata = createPageMetadata({
  title: "Commissions",
  description: SITE_METADATA.commissionsDescription,
  path: ROUTES.commissions,
});

export default function CommissionsPage() {
  return (
    <ScreenContainer>
      <JsonLd data={buildFaqPageJsonLd(COMMISSION_FAQ_ITEMS)} />
      <ScreenSection
        eyebrow="Services"
        title="Minecraft Bedrock UI Commissions"
        headingLevel="h1"
        titleDescription={COMMISSIONS_PAGE_TEXTS.intro}
      >
        <ButtonGroup>
          <Button
            text={COMMISSIONS_PAGE_TEXTS.ctaContact}
            variant={buttonVariantForIndex(0)}
            href={contactSectionHref(SECTION_IDS.startProject)}
          />
          <Button
            text={COMMISSIONS_PAGE_TEXTS.ctaProof}
            variant={buttonVariantForIndex(1)}
            href={homeSectionHref(SECTION_IDS.selectedWork)}
          />
        </ButtonGroup>
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.commissionServices}
        eyebrow="Scope"
        title="What I Build"
        titleDescription={COMMISSIONS_PAGE_TEXTS.services}
        withChildrenPadding={false}
        variant="accent"
        grid="top"
      >
        <InfoCardsGrid items={COMMISSION_SERVICES} />
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.commissionRequirements}
        eyebrow="Preparation"
        title="What I Need From You"
        titleDescription={COMMISSIONS_PAGE_TEXTS.requirements}
        withChildrenPadding={false}
      >
        <InfoCardsGrid items={COMMISSION_REQUIREMENTS} />
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.commissionProcess}
        eyebrow="Workflow"
        title="Commission Process"
        titleDescription={COMMISSIONS_PAGE_TEXTS.process}
        withChildrenPadding={false}
      >
        <InfoCardsGrid items={PROCESS_STEPS} />
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.commissionDelivery}
        eyebrow="Handoff"
        title="Delivery & Support"
        titleDescription={COMMISSIONS_PAGE_TEXTS.delivery}
        withChildrenPadding={false}
        variant="accent"
        grid="top"
      >
        <InfoCardsGrid items={COMMISSION_DELIVERABLES} />
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.commissionFaq}
        eyebrow="Answers"
        title="Commission FAQ"
        titleDescription={COMMISSIONS_PAGE_TEXTS.faq}
        withChildrenPadding={false}
      >
        <FAQAccordion items={COMMISSION_FAQ_ITEMS} />
      </ScreenSection>

      <ConversionCloser
        eyebrow="Contact"
        title="Ready to Discuss Your Project?"
        titleDescription={COMMISSIONS_PAGE_TEXTS.cta}
      >
        <ButtonGroup padInline marginBottom>
          <Button
            text={COMMISSIONS_PAGE_TEXTS.ctaContact}
            variant={buttonVariantForIndex(0)}
            href={contactSectionHref(SECTION_IDS.startProject)}
          />
          <Button
            text={COMMISSIONS_PAGE_TEXTS.ctaSecondary}
            variant={buttonVariantForIndex(1)}
            href={contactSectionHref(SECTION_IDS.contactOptions)}
          />
        </ButtonGroup>
      </ConversionCloser>
    </ScreenContainer>
  );
}
