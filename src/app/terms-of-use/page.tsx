import { Metadata } from "next";
import { LegalPage } from "@/shared/ui/legal-page";
import {
  TERMS_OF_USE_ITEMS,
  TERMS_OF_USE_LAST_UPDATED,
  parseLegalLastUpdated,
} from "@/shared/constants/legal";
import { SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { SITE_METADATA } from "@/shared/constants/data";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { buildWebPageJsonLd, JsonLd } from "@/shared/lib/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Use",
  description: SITE_METADATA.termsOfUseDescription,
  path: ROUTES.termsOfUse,
});

export default function TermsOfUsePage() {
  const dateModified = parseLegalLastUpdated(TERMS_OF_USE_LAST_UPDATED);

  return (
    <>
      {dateModified ? (
        <JsonLd
          data={buildWebPageJsonLd({
            title: "Terms of Use",
            description: SITE_METADATA.termsOfUseDescription,
            path: ROUTES.termsOfUse,
            dateModified,
          })}
        />
      ) : null}
      <LegalPage
        id={SECTION_IDS.termsOfUse}
        title="Terms of Use"
        intro="Rules for using axmbro.dev."
        lastUpdated={TERMS_OF_USE_LAST_UPDATED}
        items={TERMS_OF_USE_ITEMS}
        contactBlurb="Questions about these Terms? Email axmbro@gmail.com or use the"
      />
    </>
  );
}
