import { ScreenSection } from "../../components/layout/ScreenSection";
import { ScreenContainer } from "../../components/layout/ScreenContainer";
import styles from "./TermsOfUse.module.css";
import { NavLink } from "react-router-dom";
import global_styles from "./../../components/global/global-styles.module.css";

const TermsOfUse = () => {
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
    <ScreenContainer
      documentTitle="AxmBro | Terms of use">

      <ScreenSection
        id="termsOfUse"
        noBorder={true}
        childrenTopDivider={true}
        title="Terms of Use"
        titleClassName={global_styles.h1HeroText}
        description1="By accessing this website (axmbro.dev), you agree to these Terms. If you disagree, do not use the site.">
        <div className={styles.termsOfUse}>
          {content.map((item) => {
            return (
              <div className={styles.container}>
                <ul>
                  <li><span>{`${item.title}: `}</span>{item.text}
                    {(item.title === content[content.length - 1].title) && (
                      <NavLink
                        className={styles.navigateContact}
                        to="/contact"
                        end
                      >
                        /contact
                      </NavLink>
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