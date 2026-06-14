import { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectsBoardButton } from "@/shared/ui/projects-tag-link";
import { ROUTES } from "@/shared/constants/routes";

const description =
  "This page doesn't exist on axmbro.dev. Check the URL or return to the homepage.";

export const metadata: Metadata = {
  title: "Page not found",
  description,
  robots: { index: false, follow: true },
  openGraph: {
    title: "AxmBro.dev | Page not found",
    description,
    images: ["/images/ui/og-image.png"],
  },
};

export default function NotFound() {
  return (
    <ScreenContainer>
      <ScreenSection
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
