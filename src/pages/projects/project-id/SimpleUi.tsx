import React from "react";
import { ScreenSection } from "../../../components/layout/ScreenSection";
import { Button, ButtonColor } from "../../../components/button/Button";
import { Link } from "../../../components/link/Link";
import { ImageSection } from "../../../components/global/ProjectsPagesGlobal";
import { scrollToElement } from "../../../utils/scroll";
import { RouteLink } from "../../../components/link/RouteLink";

const SimpleUIPage: React.FC = () => {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Simple UI"
        description1="CUSTOM SERVER FORM UI created for personal use, but also to test custom buttons layout! General appearance and in-game UI was fully created by me."
        children={
          <div className="ScreenSectionButtons">
            <RouteLink
              to="/contact">
              <Button text="Want this UI? Contact Me" buttonColor={ButtonColor.blue}></Button>
            </RouteLink>
            <Button buttonColor={ButtonColor.default}>
              <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Discord Server" href="https://discord.gg/ZGK5WYXnEY"></Link>
            </Button>
            <div onClick={() => { scrollToElement("credits") }}>
              <Button buttonColor={ButtonColor.defaultEmpty2} text="Credits"></Button>
            </div>
          </div>
        }
      ></ScreenSection>
      <ImageSection
        title={"In-game Screnshots"}
        sectionDescription={"Here is a list of in-game screenshots with short description!"}
        items={[
          {
            title: "Just Server Form",
            description: "UI with title and description wrapped into section with darker background that is on top. There is also stack of buttons under in pretty flex style.",
            imageSrc: "simple_server_form1"
          },
          {
            title: "Again Server Form",
            description: "There is extra section named 'Leaderboard' with buttons in list style.",
            imageSrc: "simple_server_form2"
          },
          {
            title: "Top Right Corner",
            description: "And 2 buttons in top right, help with on-hover text and close button.",
            imageSrc: "simple_server_form3"
          },
        ]}>
      </ImageSection>
      <div id="credits">
        <ScreenSection
          noChildrenPadding={true}
          title="Creators"
          children={
            <div>
              <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
                <ul>
                  <li key={`1`}>
                    Texture Pack:{" "}
                    <Link href="https://github.com/AxmBro" text="AxmBro" ></Link>
                  </li>
                </ul>
              </div>
            </div>
          }
        ></ScreenSection>
        <ScreenSection
          style={{ borderBottom: 0 }}
          noChildrenPadding={true}
          title="Technology"
          children={
            <div>
              <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
                <ul>
                  <li key={`1`}>
                    Texture Pack:{" "}
                    <Link href="https://www.json.org/json-en.html" text="JSON" ></Link>
                    {" | "}
                    <Link href="https://wiki.bedrock.dev/json-ui/json-ui-documentation.html" text="Minecraft Bedrock JsonUI" ></Link>
                  </li>
                </ul>
              </div>
            </div>
          }
        ></ScreenSection>
      </div>
    </div>
  )
}

export { SimpleUIPage }