import { Metadata } from "next";
import { LegalPage } from "@/shared/ui/legal-page";
import { TERMS_OF_USE_ITEMS } from "@/shared/constants/legal";
import { SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { SITE_METADATA } from "@/shared/constants/data";
import { createPageMetadata } from "@/shared/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Use",
  description: SITE_METADATA.termsOfUseDescription,
  path: ROUTES.termsOfUse,
});

export default function TermsOfUsePage() {
  return (
    <LegalPage
      id={SECTION_IDS.termsOfUse}
      title="Terms of Use"
      intro="By accessing this website (axmbro.dev), you agree to these Terms. If you disagree, do not use the site."
      lastUpdated="10.06.2026"
      items={TERMS_OF_USE_ITEMS}
      contactBlurb="For any questions regarding these Terms, feel free to reach out via:"
    />
  );
}
