import type { Metadata } from "next";
import { SITE_METADATA } from "@/shared/constants/data";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { SitemapGrid, SitemapProjectList } from "@/widgets/sitemap-grid";

export const metadata: Metadata = createPageMetadata({
  title: "Sitemap",
  description: SITE_METADATA.sitemapDescription,
  path: ROUTES.sitemap,
});

export default function SitemapPage() {
  return (
    <ScreenContainer>
      <ScreenSection
        eyebrow="Directory"
        title="Sitemap"
        headingLevel="h1"
        titleDescription="Browse every main area of AxmBro.dev, including portfolio work, Minecraft Bedrock UI commissions, project filters, contact options, and legal pages."
        withChildrenPadding={false}
      >
        <SitemapGrid />
      </ScreenSection>

      <ScreenSection
        eyebrow="Portfolio"
        title="All Projects"
        titleDescription="A complete index of the client commissions, personal releases, and technical projects currently listed on AxmBro.dev."
        withChildrenPadding={false}
      >
        <SitemapProjectList />
      </ScreenSection>
    </ScreenContainer>
  );
}
