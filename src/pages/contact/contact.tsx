import { ScreenSection } from "../../components/layout/screen-section";
import { ScreenContainer } from "../../components/layout/screen-container";
import styles from "./contact.module.css";
import global_styles from "../../components/global/global-styles.module.css";
import { SocialIcon } from "react-social-icons";
import { Button } from "../../components/button/button";
import { SOCIAL_LINK_BUTTONS } from "../../constants";
import { ContactForm } from "../../components/layout/contact-form";

const Contact = () => {
  const SocialiconSize = "2.25rem";
  const SocialiconMargin = "0.5rem";
  const SocialIconBgColor = "var(--web-bg-color-1)";
  const SocialIconFgColor = "var(--text-color-2)";
  const buttonColor = "defaultEmpty2";


  interface SocialLinkButtonProps {
    href: string;
    text: string;
    socialUrl: string;
  }

  const SocialLinkButton = ({ href, text, socialUrl }: SocialLinkButtonProps) => (
    <a
      href={href}
      target={"_blank"}
      style={{textDecoration: "none"}}>
      <Button
        style={{ width: "100%" }} 
        childrenFirstRender={true}
        text={text}
        buttonColor={buttonColor} >
        <SocialIcon
          as="p"
          url={socialUrl}
          style={{ height: `${SocialiconSize}`, width: `${SocialiconSize}`, marginRight: `${SocialiconMargin}` }}
          bgColor={SocialIconBgColor}
          fgColor={SocialIconFgColor}
        />
      </Button>
    </a>
  );

  return (
    <ScreenContainer
      documentTitle="AxmBro | Contact">

      <ScreenSection
        id="contact"
        noChildrenPadding={true}
        title="Contact"
        titleClassName={global_styles.h1HeroText} >
        <>
          <p style={{ marginBottom: "2rem" }}>Whether you have a project in mind or just want to reach out, <b>I would love to hear from you!</b> Let us combine our ideas and <b>make something absolutely amazing together!</b> Here is list of redirect buttons to my social media platforms.</p>
          <div className={styles.contactFlexContainer}>
            {SOCIAL_LINK_BUTTONS.map((button, index) => (
              <SocialLinkButton
                key={index}
                href={button.href}
                text={button.text}
                socialUrl={button.socialUrl}
              />
            ))}
          </div>
        </>
      </ScreenSection>

      <ScreenSection
        noBorder={true}
        description1="Fill out the form below and I will get back to you as soon as possible."
        title="Send a message">
        <>
          <ContactForm />
        </>
      </ScreenSection>

    </ScreenContainer>
  );
};

export { Contact };