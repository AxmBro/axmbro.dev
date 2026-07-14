import { Metadata } from "next";
import { LegalPage } from "@/shared/ui/legal-page";
import { PRIVACY_POLICY_ITEMS } from "@/shared/constants/legal";
import { SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { SITE_METADATA } from "@/shared/constants/data";
import { createPageMetadata } from "@/shared/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: SITE_METADATA.privacyPolicyDescription,
  path: ROUTES.privacyPolicy,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      id={SECTION_IDS.privacyPolicy}
      title="Privacy Policy"
      intro="This Privacy Policy outlines how your personal data is collected and processed."
      lastUpdated="10.06.2026"
      items={PRIVACY_POLICY_ITEMS}
      contactBlurb="To exercise any of your rights or ask questions regarding privacy, please contact me directly at:"
    />
  );
}
