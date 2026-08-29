import { Metadata } from "next";
import { Reveal } from "@/shared/ui/motion";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { CTA_LABELS, NOT_FOUND_PAGE_TEXTS, SITE_METADATA } from "@/shared/constants/data";
import { contactFormHref } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Page not found",
  description: SITE_METADATA.notFoundDescription,
  robots: { index: false, follow: true },
});

export default function NotFound() {
  return (
    <ScreenContainer>
      <Reveal>
        <ScreenSection
          eyebrow="404"
          title="Page not found"
          headingLevel="h1"
          titleDescription={NOT_FOUND_PAGE_TEXTS.description}
        >
          <ButtonGroup>
            <Button
              text="Back to Home"
              variant={buttonVariantForIndex(0)}
              href={ROUTES.home}
            />
            <Button
              text={CTA_LABELS.contactMe}
              variant={buttonVariantForIndex(1)}
              href={contactFormHref()}
            />
          </ButtonGroup>
        </ScreenSection>
      </Reveal>
    </ScreenContainer>
  );
}
