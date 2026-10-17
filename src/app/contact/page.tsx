import type { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { SocialLinkButton } from "@/shared/ui/social-link-button";
import { Reveal } from "@/shared/ui/motion";
import {
  CONTACT_FAQ_ITEMS,
  SOCIAL_LINK_BUTTONS,
  HOME_PAGE_TEXTS,
  SITE_METADATA,
  CTA_LABELS,
} from "@/shared/constants/data";
import { SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { buildFaqPageJsonLd, JsonLd } from "@/shared/lib/json-ld";
import { ContactForm, MoreProfiles } from "@/features/contact-form";
import { FAQAccordion } from "@/features/faq-accordion";
import styles from "./page.module.scss";

export const metadata: Metadata = createPageMetadata({
  title: CTA_LABELS.contactForm,
  description: SITE_METADATA.contactDescription,
  path: ROUTES.contact,
});

export default function ContactPage() {
  const directChannels = SOCIAL_LINK_BUTTONS.filter((link) => link.channel === "direct");
  const profilesAndCommunities = SOCIAL_LINK_BUTTONS.filter((link) => link.channel === "extra");

  return (
    <ScreenContainer>
      <JsonLd data={buildFaqPageJsonLd(CONTACT_FAQ_ITEMS)} />

      <Reveal>
        <ScreenSection
          id={SECTION_IDS.contactForm}
          eyebrow={HOME_PAGE_TEXTS.contactPage.eyebrow}
          title={HOME_PAGE_TEXTS.contactPage.title}
          headingLevel="h1"
          withChildrenPadding={false}
          variant="accent"
          grid="none"
          titleDescription={HOME_PAGE_TEXTS.contactPage.form}
        >
          <ContactForm />
        </ScreenSection>
      </Reveal>

      <Reveal>
        <ScreenSection
          id={SECTION_IDS.contactOptions}
          eyebrow={HOME_PAGE_TEXTS.contactPage.socialsEyebrow}
          withChildrenPadding
          title={CTA_LABELS.contactOptions}
          titleDescription={HOME_PAGE_TEXTS.contactPage.socials}
          grid="top"
        >
          <div className={styles.socialList}>
            {directChannels.map((button) => (
              <SocialLinkButton key={button.href} link={button} />
            ))}
          </div>
          <MoreProfiles links={profilesAndCommunities} />
        </ScreenSection>
      </Reveal>

      <Reveal>
        <ScreenSection
          id={SECTION_IDS.quickQuestions}
          eyebrow={HOME_PAGE_TEXTS.contactPage.quickQuestionsEyebrow}
          title={HOME_PAGE_TEXTS.contactPage.quickQuestionsTitle}
          withChildrenPadding={false}
          grid="bottom"
          titleDescription={HOME_PAGE_TEXTS.contactPage.quickQuestions}
        >
          <FAQAccordion items={CONTACT_FAQ_ITEMS} />
        </ScreenSection>
      </Reveal>
    </ScreenContainer>
  );
}
