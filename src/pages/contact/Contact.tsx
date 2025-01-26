import { ScreenSection } from "../../components/layout/ScreenSection";
import { ScreenContainer } from "../../components/layout/ScreenContainer";
import styles from "./Contact.module.css";
import { Link } from "../../components/link/Link";
import { RouteLink } from "../../components/link/RouteLink";
import "../../components/layout/ScreenSection.css";
import { Button, ButtonColor } from "../../components/button/Button";

const Contact = () => {
  document.title = "AxmBro | Contact"
  return (
    <ScreenContainer>

      <ScreenSection
        id="contact"
        singleParagraph={true}
        title="Conact"
        description1="Whether you have a project in mind or just want to reach out, I would love to hear from you! Let us combine our ideas and make something absolutely amazing together!">
        <div>

          <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
            <ul>
              <li key={`1`}> Github:{" "} <Link href="https://github.com/AxmBro" text="AxmBro" ></Link> </li>
              <li key={`2`}> Email:{" "}  <Link href="mailto:axmbro@gmail.com?subject=Contact%20Request" text="axmbro@gmail.com" ></Link> </li>
              <li key={`3`}> Discord:{" "} <Link href="https://discord.com/users/679603350236299266" text="AxmBro" ></Link> {" | "} <Link href="https://discord.gg/wJhH86c2wb" text="discord.gg/wJhH86c2wb" ></Link> {" | "} <Link href="https://discord.gg/ZGK5WYXnEY" text="discord.gg/ZGK5WYXnEY" ></Link> </li>
              <li key={`4`}> YouTube Channels:{" "} <Link href="https://www.youtube.com/@axmbro" text="@axmbro" ></Link> {" | "} <Link href="https://www.youtube.com/@axmbro2" text="@axmbro2" ></Link> </li>
            </ul>
          </div>

          <div className={styles.buttonsContainer}>

            <RouteLink
              to="/info">
              <Button text="All contacts /info" buttonColor={ButtonColor.blue}></Button>
            </RouteLink>
          </div>
        </div>
      </ScreenSection>

    </ScreenContainer>
  );
};

export { Contact };