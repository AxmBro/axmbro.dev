import { ScreenSection } from "../../components/layout/ScreenSection";
import { ScreenContainer } from "../../components/layout/ScreenContainer";
import styles from "./Contact.module.css";
import { Link } from "../../components/link/Link";
import global_styles from "./../../components/global/global-styles.module.css";
import { SocialIcon } from "react-social-icons";
import { Button, ButtonColor } from "../../components/button/Button";
import { useMediaQuery } from 'react-responsive';
import { SOCIAL_LINK_BUTTONS } from "../../components/global/constants";
import { ConactForm } from "../../components/layout/contact-form";

const Contact = () => {
  const SocialiconSize = "2.25rem";
  const SocialiconMargin = "0.5rem";
  const SocialIconBgColor = "var(--web-bg-color-1)";
  const SocialIconFgColor = "var(--text-color-1)";
  const buttonColor = ButtonColor.blue;

  const MediaMaxWidth = useMediaQuery({ query: '(max-width: 288px)' });

  interface SocialLinkButtonProps {
    href: string;
    text: string;
    socialUrl: string;
  }

  const SocialLinkButton = ({ href, text, socialUrl }: SocialLinkButtonProps) => (
    <Link
      style={{ width: MediaMaxWidth ? "inherit" : "" }}
      href={href}
      openInNewTab={true}
    >
      <Button
        style={{ width: MediaMaxWidth ? "100%" : "" }}
        childrenFirstRender={true}
        text={text}
        buttonColor={buttonColor}
      >
        <SocialIcon
          as="p"
          url={socialUrl}
          style={{ height: `${SocialiconSize}`, width: `${SocialiconSize}`, marginRight: `${SocialiconMargin}` }}
          bgColor={SocialIconBgColor}
          fgColor={SocialIconFgColor}
        />
      </Button>
    </Link>
  );

  return (
    <ScreenContainer
      documentTitle="AxmBro | Contact">

      <ScreenSection
        id="contact"
        noBorder={true}
        noChildrenPadding={true}
        title="Conact"
        titleClassName={global_styles.h1HeroText} >
        <>
          <p style={{ marginBottom: "2rem" }}>Whether you have a project in mind or just want to reach out, <b>I would love to hear from you!</b> Let us combine our ideas and <b>make something absolutely amazing together!</b>Here is list of buttons with quick redirect to platforms.</p>
          <div className={styles.contactFlexContainer} style={{ marginBottom: "2rem" }}>
            {SOCIAL_LINK_BUTTONS.map((button, index) => (
              <SocialLinkButton
                key={index}
                href={button.href}
                text={button.text}
                socialUrl={button.socialUrl}
              />
            ))}
          </div>
          <ConactForm />
        </>
      </ScreenSection>

    </ScreenContainer>
  );
};

export { Contact };