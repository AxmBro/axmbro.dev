import type { Metadata } from "next";
import Link from "next/link";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { SocialLinkButton } from "@/shared/ui/social-link-button";
import { Reveal } from "@/shared/ui/motion";
import {
  CONTACT_FAQ_ITEMS,
  SOCIAL_LINK_BUTTONS,
  HOME_PAGE_TEXTS,
  SITE_METADATA,
} from "@/shared/constants/data";
import { SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { buildFaqPageJsonLd, JsonLd } from "@/shared/lib/json-ld";
import { ContactForm, MoreProfiles } from "@/features/contact-form";
import { FAQAccordion } from "@/features/faq-accordion";
import styles from "./page.module.scss";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
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
          id={SECTION_IDS.startProject}
          eyebrow="Contact"
          title="Start a Project"
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
          eyebrow="Direct Contact"
          withChildrenPadding
          title="Contact Options"
          titleDescription={HOME_PAGE_TEXTS.contactPage.socials}
          grid="bottom"
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
          eyebrow="Answers"
          title="Quick Questions"
          withChildrenPadding={false}
          titleDescription={
            <>
              Short answers on availability and fit. Pricing, process, and delivery details are on the{" "}
              <Link href={ROUTES.commissions}>Commissions page</Link>.
            </>
          }
        >
          <FAQAccordion items={CONTACT_FAQ_ITEMS} />
        </ScreenSection>
      </Reveal>
    </ScreenContainer>
  );
}
