import type { Metadata } from "next";
import { FAQAccordion } from "@/features/faq-accordion";
import {
  COMMISSION_DELIVERABLES,
  COMMISSION_FAQ_ITEMS,
  COMMISSION_REQUIREMENTS,
  COMMISSION_SERVICES,
  COMMISSIONS_PAGE_TEXTS,
  HOME_CLIENT_STUDIOS,
  PROCESS_STEPS,
  SITE_METADATA,
} from "@/shared/constants/data";
import { contactFormHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { buildFaqPageJsonLd, JsonLd } from "@/shared/lib/json-ld";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ConversionCloser } from "@/shared/ui/conversion-closer";
import { InfoCardsGrid } from "@/shared/ui/info-cards-grid";
import { Reveal } from "@/shared/ui/motion";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { TrackRecordClients } from "@/widgets/track-record";

export const metadata: Metadata = createPageMetadata({
  title: COMMISSIONS_PAGE_TEXTS.title,
  description: SITE_METADATA.commissionsDescription,
  path: ROUTES.commissions,
});

export default function CommissionsPage() {
  return (
    <ScreenContainer>
      <JsonLd data={buildFaqPageJsonLd(COMMISSION_FAQ_ITEMS)} />
      <Reveal>
        <ScreenSection
          eyebrow={COMMISSIONS_PAGE_TEXTS.eyebrow}
          title={COMMISSIONS_PAGE_TEXTS.title}
          headingLevel="h1"
          titleDescription={COMMISSIONS_PAGE_TEXTS.intro}
          grid="bottom"
        >
          <ButtonGroup>
            <Button
              text={COMMISSIONS_PAGE_TEXTS.ctaContact}
              variant={buttonVariantForIndex(0)}
              href={contactFormHref()}
            />
            <Button
              text={COMMISSIONS_PAGE_TEXTS.ctaProjects}
              variant={buttonVariantForIndex(1)}
              href={ROUTES.projects}
            />
          </ButtonGroup>
        </ScreenSection>
      </Reveal>

      <Reveal>
        <ScreenSection
          id={SECTION_IDS.commissionClients}
          eyebrow={COMMISSIONS_PAGE_TEXTS.clientsEyebrow}
          title={COMMISSIONS_PAGE_TEXTS.clientsTitle}
          titleDescription={COMMISSIONS_PAGE_TEXTS.clientsDescription}
          withChildrenPadding={false}
          grid="top"
        >
          <TrackRecordClients clients={HOME_CLIENT_STUDIOS} />
        </ScreenSection>
      </Reveal>

      <Reveal>
        <ScreenSection
          id={SECTION_IDS.commissionServices}
          eyebrow={COMMISSIONS_PAGE_TEXTS.servicesEyebrow}
          title={COMMISSIONS_PAGE_TEXTS.servicesTitle}
          titleDescription={COMMISSIONS_PAGE_TEXTS.services}
          withChildrenPadding={false}
          variant="accent"
          fullWidthGrid
        >
          <InfoCardsGrid items={COMMISSION_SERVICES} columns={2} />
        </ScreenSection>
      </Reveal>

      <Reveal>
        <ScreenSection
          id={SECTION_IDS.commissionRequirements}
          eyebrow={COMMISSIONS_PAGE_TEXTS.requirementsEyebrow}
          title={COMMISSIONS_PAGE_TEXTS.requirementsTitle}
          titleDescription={COMMISSIONS_PAGE_TEXTS.requirements}
          withChildrenPadding={false}
        >
          <InfoCardsGrid items={COMMISSION_REQUIREMENTS} />
        </ScreenSection>
      </Reveal>

      <Reveal>
        <ScreenSection
          id={SECTION_IDS.commissionProcess}
          eyebrow={COMMISSIONS_PAGE_TEXTS.processEyebrow}
          title={COMMISSIONS_PAGE_TEXTS.processTitle}
          titleDescription={COMMISSIONS_PAGE_TEXTS.process}
          withChildrenPadding={false}
          grid="bottom"
        >
          <InfoCardsGrid items={PROCESS_STEPS} />
        </ScreenSection>
      </Reveal>

      <Reveal>
        <ScreenSection
          id={SECTION_IDS.commissionDelivery}
          eyebrow={COMMISSIONS_PAGE_TEXTS.deliveryEyebrow}
          title={COMMISSIONS_PAGE_TEXTS.deliveryTitle}
          titleDescription={COMMISSIONS_PAGE_TEXTS.delivery}
          withChildrenPadding={false}
          variant="accent"
          fullWidthGrid
        >
          <InfoCardsGrid items={COMMISSION_DELIVERABLES} />
        </ScreenSection>
      </Reveal>

      <Reveal>
        <ScreenSection
          id={SECTION_IDS.commissionFaq}
          eyebrow={COMMISSIONS_PAGE_TEXTS.faqEyebrow}
          title={COMMISSIONS_PAGE_TEXTS.faqTitle}
          titleDescription={COMMISSIONS_PAGE_TEXTS.faq}
          withChildrenPadding={false}
        >
          <FAQAccordion items={COMMISSION_FAQ_ITEMS} />
        </ScreenSection>
      </Reveal>

      <ConversionCloser
        eyebrow={COMMISSIONS_PAGE_TEXTS.ctaEyebrow}
        title={COMMISSIONS_PAGE_TEXTS.ctaTitle}
        titleDescription={COMMISSIONS_PAGE_TEXTS.cta}
      >
        <ButtonGroup>
          <Button
            text={COMMISSIONS_PAGE_TEXTS.ctaContact}
            variant={buttonVariantForIndex(0)}
            href={contactFormHref()}
          />
        </ButtonGroup>
      </ConversionCloser>
    </ScreenContainer>
  );
}
