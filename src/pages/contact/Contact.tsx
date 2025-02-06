import { ScreenSection } from "../../components/layout/ScreenSection";
import { ScreenContainer } from "../../components/layout/ScreenContainer";
import styles from "./Contact.module.css";
import { Link } from "../../components/link/Link";
import { CustomButton } from "../../components/button/CustomButton";
import { RouteLink } from "../../components/link/RouteLink";
import global_styles from "./../../components/global/global-styles.module.css";

const Contact = () => {
  const height = "3.5rem";
  const width = "100%";
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
          <p style={{ marginBottom: "1rem" }}>Whether you have a project in mind or just want to reach out, <b>I would love to hear from you!</b> Let us combine our ideas and <b>make something absolutely amazing together!</b></p>
          <p style={{ marginBottom: "2rem" }}>Here is list of buttons with quick redirect to platforms!</p>
          <div className={styles.buttonsContainer}>
            <RouteLink
              to="/projects">
              <CustomButton style={{ height: height, width: width }} border={{ r: 255, g: 200, b: 0 }} text="My Projects" textContant="/projects" />
            </RouteLink>
            <Link
              href="https://github.com/AxmBro"
              openInNewTab={true}
            >
              <CustomButton style={{ height: height, width: width }} border={{ r: 140, g: 180, b: 240 }} text="Github" textContant="AxmBro" />
            </Link>
            <Link
              href="https://discord.com/users/679603350236299266"
              openInNewTab={true}
            >
              <CustomButton style={{ height: height, width: width }} border={{ r: 86, g: 98, b: 246 }} text="Discord Nick" textContant="AxmBro" />
            </Link>
            <Link
              href="https://discord.gg/wJhH86c2wb"
              openInNewTab={true}
            >
              <CustomButton style={{ height: height, width: width }} border={{ r: 86, g: 98, b: 246 }} text="Personal Discord Server" textContant="discord.gg/wJhH86c2wb" />
            </Link>
            <Link
              href="https://discord.gg/ZGK5WYXnEY"
              openInNewTab={true}
            >
              <CustomButton style={{ height: height, width: width }} border={{ r: 86, g: 98, b: 246 }} text="Featured Discord Server" textContant="discord.gg/ZGK5WYXnEY" />
            </Link>
            <Link
              href="https://www.youtube.com/@axmbro"
              openInNewTab={true}
            >
              <CustomButton style={{ height: height, width: width }} border={{ r: 255, g: 1, b: 51 }} text="Main YouTube Channel" textContant="@axmbro" />
            </Link>
            <Link
              href="https://www.youtube.com/@axmbro2"
              openInNewTab={true}
            >
              <CustomButton style={{ height: height, width: width }} border={{ r: 255, g: 1, b: 51 }} text="Second YouTube Channel" textContant="@axmbro2" />
            </Link>
            <Link
              href="mailto:axmbro@gmail.com?subject=Contact%20Request"
              openInNewTab={true}
            >
              <CustomButton style={{ height: height, width: width }} border={{ r: 234, g: 67, b: 53 }} text="Email" textContant="axmbro@gmail.com" />
            </Link>
            <Link
              href="https://twitter.com/AxmBro"
              openInNewTab={true}
            >
              <CustomButton style={{ height: height, width: width }} border={{ r: 36, g: 158, b: 240 }} text="Twitter" textContant="@AxmBro" />
            </Link>
            <Link
              href="https://www.instagram.com/axmbro_"
              openInNewTab={true}
            >
              <CustomButton style={{ height: height, width: width }} border={{ r: 221, g: 42, b: 123 }} text="Instagram" textContant="axmbro_" />
            </Link>
          </div>
        </>
      </ScreenSection>

    </ScreenContainer>
  );
};

export { Contact };