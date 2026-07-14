import { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectsBoardButton } from "@/shared/ui/projects-tag-link";
import { ROUTES } from "@/shared/constants/routes";
import { SITE_METADATA } from "@/shared/constants/data";
import { createPageMetadata } from "@/shared/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Page not found",
  description: SITE_METADATA.notFoundDescription,
  robots: { index: false, follow: true },
});

export default function NotFound() {
  return (
    <ScreenContainer>
      <ScreenSection
        eyebrow="404"
        title="Page not found"
        headingLevel="h1"
        titleDescription="This path doesn't exist on axmbro.dev. Check the URL or head back to known terrain."
      >
        <ButtonGroup>
          <Button text="Back to Home" variant="primary" href={ROUTES.home} />
          <ProjectsBoardButton text="View Projects" tab="all" variant="outline" />
        </ButtonGroup>
      </ScreenSection>
    </ScreenContainer>
  );
}
