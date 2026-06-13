import { Metadata } from "next";
import { LegalPage } from "@/shared/ui/legal-page";
import { TERMS_OF_USE_ITEMS } from "@/shared/constants/legal";
import { SECTION_IDS } from "@/shared/constants/anchors";

const description =
  "Terms of Use for axmbro.dev - rules for using this portfolio website and related services.";

export const metadata: Metadata = {
  title: "Terms of Use",
  description,
  openGraph: {
    title: "AxmBro.dev | Terms of Use",
    description,
    images: ["/images/ui/og-image.png"],
  },
};

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
