import { ScreenSection } from "../../components/layout/screen_section";
import { ScreenContainer } from "../../components/layout/screen_container";
import styles from "./TermsOfUse.module.css";
import { scrollToElement } from "../../utils/scroll";
import { useHomeRoute } from "../../components/contexts/NavigateToContactContext";
import { useNavigate } from "react-router-dom";

const TermsOfUse = () => {
  const { setNavigateToContact } = useHomeRoute();
  const navigate = useNavigate();

  const handleNavigation = (to: string) => {
    navigate(to);
  };

  document.title = "AxmBro | Terms of use"
  const lastUpdate = "21.01.2025";

  const content = [
    {
      "title": "Use of the Site",
      "text": "This site is a personal portfolio showcasing my work. You may view the content for personal purposes only."
    },
    {
      "title": "Intellectual Property",
      "text": "All content (text, images, code) is the property of Axmbro - owner of axmbro.dev website. Do not copy, modify, or redistribute it without written permission."
    },
    {
      "title": "No Warranty",
      "text": "The site is provided \"as is\". I am not liable for any errors, omissions, or damages arising from its use."
    },
    {
      "title": "External Links",
      "text": "I am not responsible for content on third-party websites linked here."
    },
    {
      "title": "Changes to Terms",
      "text": `I may update these Terms at any time. Continued use after changes constitutes acceptance. Last updated: ${lastUpdate}.`
    },
    {
      "title": "Governing Law",
      "text": "These Terms are governed by the laws of Poland."
    },
    {
      "title": "Contact",
      "text": "For questions, navigate to: "
    }
  ]

  return (
    <ScreenContainer>

      <ScreenSection
        id="termsOfUse"
        singleParagraph={true}
        title="Terms of Use"
        description1="By accessing this website (axmbro.dev), you agree to these Terms. If you disagree, do not use the site.">
        <div className={styles.termsOfUse}>
          {content.map((item) => {
            return (
              <div className={styles.container}>
                <ul>
                  <li><span>{`${item.title}: `}</span>{item.text}
                    {(item.title === content[content.length - 1].title) && (
                      <span
                        className={styles.navigateContact}
                        onClick={() => {
                          if (location.pathname === "/") {
                            scrollToElement("contact");
                          } else {
                            handleNavigation("/");
                            setNavigateToContact(true);
                          }
                        }}
                      >
                        /contact
                      </span>
                    )}
                  </li>
                </ul>
              </div>
            )
          })}
        </div>
      </ScreenSection>

    </ScreenContainer>
  );
};

export { TermsOfUse };