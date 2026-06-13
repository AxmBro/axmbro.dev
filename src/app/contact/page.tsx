import { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { SocialLinkButton } from "@/shared/ui/social-link-button";
import { SOCIAL_LINK_BUTTONS, HOME_PAGE_TEXTS } from "@/shared/constants/data";
import { SECTION_IDS } from "@/shared/constants/anchors";
import { ContactForm } from "@/features/contact-form";
import { FAQAccordion } from "@/features/faq-accordion";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AxmBro for Minecraft Bedrock UI (JsonUI) commissions, web development, or B2B inquiries. Send a message directly or connect through social channels.",
  openGraph: {
    title: "AxmBro.dev | Contact",
    description:
      "Get in touch with AxmBro for Minecraft Bedrock UI (JsonUI) commissions, web development, or B2B inquiries.",
    images: ["/images/ui/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <ScreenContainer>

      <ScreenSection
        className={styles.contactSection}
        id={SECTION_IDS.contactSocials}
        withChildrenPadding={true}
        title="Contact"
        headingLevel="h1"
        titleDescription={HOME_PAGE_TEXTS.contactPage.socials}
      >
        <div id={SECTION_IDS.socialLinks} data-scroll-anchor className={styles.socialList}>
          {SOCIAL_LINK_BUTTONS.map((button, index) => (
            <SocialLinkButton key={index} link={button} />
          ))}
        </div>
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.sendMessage}
        title="Send a message"
        withChildrenPadding={false}
        titleDescription={HOME_PAGE_TEXTS.contactPage.form}
      >
        <ContactForm />
      </ScreenSection>

      <ScreenSection
        id={SECTION_IDS.faq}
        title="Frequently Asked Questions"
        withChildrenPadding={false}
        titleDescription="Quick answers about commissions, pricing, custom UI technical details, and typical timelines."
      >
        <FAQAccordion />
      </ScreenSection>

    </ScreenContainer>
  );
}
