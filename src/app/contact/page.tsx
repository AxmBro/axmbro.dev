import { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { SocialLinkButton } from "@/shared/ui/social-link-button";
import { SOCIAL_LINKS, PORTFOLIO_TEXTS } from "@/shared/constants/data";
import { ContactForm } from "@/shared/ui/contact-form";
import { FAQAccordion } from "@/shared/ui/faq-accordion";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with AxmBro - reach out via social media or send a message directly.",
  openGraph: {
    title: "AxmBro | Contact",
    description: "Get in touch with AxmBro - reach out via social media or send a message directly.",
    images: ["/images/ui/logo192.png"],
  },
};

export default function ContactPage() {
  return (
    <ScreenContainer>

      <ScreenSection
        className={styles.contactSection}
        id="contact"
        withChildrenPadding={true}
        title="Contact"
        titleDescription={PORTFOLIO_TEXTS.contactPage.socials}
      >
        <div className={styles.socialList}>
          {SOCIAL_LINKS.map((button, index) => (
            <SocialLinkButton key={index} link={button} />
          ))}
        </div>
      </ScreenSection>

      <ScreenSection
        title="Send a message"
        withChildrenPadding={false}
        titleDescription={PORTFOLIO_TEXTS.contactPage.form}
        headingTag="h2"
      >
        <ContactForm />
      </ScreenSection>

      <ScreenSection
        title="Frequently Asked Questions"
        withChildrenPadding={false}
        titleDescription="Got questions? Here are quick answers regarding commissions, billing, custom UI technical details, and general timelines."
        headingTag="h2"
      >
        <FAQAccordion />
      </ScreenSection>

    </ScreenContainer>
  );
}
