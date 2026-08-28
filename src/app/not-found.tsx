import { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/shared/ui/motion";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { CTA_LABELS, SITE_METADATA } from "@/shared/constants/data";
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
          titleDescription={
            <>
              This path does not exist on axmbro.dev.{" "}
              <Link href={ROUTES.projects}>{CTA_LABELS.browseAllProjects}</Link>
              {" or check "}
              <Link href={ROUTES.commissions}>
                {CTA_LABELS.minecraftBedrockCommissions}
              </Link>
              {" while you get back on track."}
            </>
          }
        >
          <ButtonGroup>
            <Button
              text="Back to Home"
              variant={buttonVariantForIndex(0)}
              href={ROUTES.home}
            />
            <Button
              text="Contact"
              variant={buttonVariantForIndex(1)}
              href={ROUTES.contact}
            />
          </ButtonGroup>
        </ScreenSection>
      </Reveal>
    </ScreenContainer>
  );
}
