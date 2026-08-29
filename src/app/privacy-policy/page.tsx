import { Metadata } from "next";
import { LegalPage } from "@/shared/ui/legal-page";
import {
  PRIVACY_POLICY_ITEMS,
  PRIVACY_POLICY_LAST_UPDATED,
  parseLegalLastUpdated,
} from "@/shared/constants/legal";
import { SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { SITE_METADATA } from "@/shared/constants/data";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { buildWebPageJsonLd, JsonLd } from "@/shared/lib/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: SITE_METADATA.privacyPolicyDescription,
  path: ROUTES.privacyPolicy,
});

export default function PrivacyPolicyPage() {
  const dateModified = parseLegalLastUpdated(PRIVACY_POLICY_LAST_UPDATED);

  return (
    <>
      {dateModified ? (
        <JsonLd
          data={buildWebPageJsonLd({
            title: "Privacy Policy",
            description: SITE_METADATA.privacyPolicyDescription,
            path: ROUTES.privacyPolicy,
            dateModified,
          })}
        />
      ) : null}
      <LegalPage
        id={SECTION_IDS.privacyPolicy}
        title="Privacy Policy"
        intro="Personal data on axmbro.dev - what is processed and your GDPR rights."
        lastUpdated={PRIVACY_POLICY_LAST_UPDATED}
        items={PRIVACY_POLICY_ITEMS}
        contactBlurb="For privacy questions or to exercise your rights, email axmbro@gmail.com or use the"
      />
    </>
  );
}
