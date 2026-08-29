import type { Metadata } from "next";
import { SITEMAP_PAGE_TEXTS, SITE_METADATA } from "@/shared/constants/data";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { Reveal } from "@/shared/ui/motion";
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
      <Reveal>
        <ScreenSection
          eyebrow="Directory"
          title="Sitemap"
          headingLevel="h1"
          titleDescription={SITEMAP_PAGE_TEXTS.intro}
          withChildrenPadding={false}
        >
          <SitemapGrid />
        </ScreenSection>
      </Reveal>

      <Reveal>
        <ScreenSection
          eyebrow="Portfolio"
          title="All Projects"
          titleDescription={SITEMAP_PAGE_TEXTS.allProjects}
          withChildrenPadding={false}
        >
          <SitemapProjectList />
        </ScreenSection>
      </Reveal>
    </ScreenContainer>
  );
}
