import { Metadata } from "next";
import { LegalPage } from "@/shared/ui/legal-page";
import { PRIVACY_POLICY_ITEMS } from "@/shared/constants/legal";
import { SECTION_IDS } from "@/shared/constants/anchors";

const description =
  "Privacy Policy for axmbro.dev - how personal data is collected and processed when you use this portfolio site or contact form.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  openGraph: {
    title: "AxmBro.dev | Privacy Policy",
    description,
    images: ["/images/ui/og-image.png"],
  },
};

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
