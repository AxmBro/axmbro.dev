import React from "react";
import { ScreenSection } from "../../components/ScreenSection";
import { Button, ButtonColor } from "../../components/Button";
import { Link } from "../../components/Link";
import { ImageSection } from "../../components/ProjectsPagesGlobalElements";
import { scrollToElement } from "../../utils/utils";
import { useNavigate, useLocation } from "react-router-dom";

interface SimpleUIPageProps {
  openHomeRouteByContactButton: boolean;
  setOpenHomeRouteByContactButton: React.Dispatch<React.SetStateAction<boolean>>;
}

function SimpleUIPage({ openHomeRouteByContactButton, setOpenHomeRouteByContactButton }: SimpleUIPageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (to: string) => {
    navigate(to);
  };

  return (
    <div className="projects screenContainer">
      <div className="screenContent">
        <ScreenSection
          style={{ padding: "1rem 0 2rem 0" }}
          title="Simple UI"
          description1="CUSTOM SERVER FORM UI created for personal use, but also to test custom buttons layout! General appearance and in-game UI was fully created by me."
          children={
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <div onClick={() => {
                if (location.pathname === "/") {
                  scrollToElement("contact");
                } else {
                  handleNavigation("/");
                  setOpenHomeRouteByContactButton(true);
                }
              }}>
                <Button buttonColor={ButtonColor.blue} text="Want this UI? Contact Me"></Button>
              </div>
              <Button buttonColor={ButtonColor.default}>
                <Link useUnderline={false} textColor="var(--website-background-color)" text="Discord Server" href="https://discord.gg/ZGK5WYXnEY"></Link>
              </Button>
              <div onClick={() => { scrollToElement("credits") }}>
                <Button buttonColor={ButtonColor.defaultEmpty} text="Credits"></Button>
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
            ignoreChildrenPadding={true}
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
            ignoreChildrenPadding={true}
            title="Technology"
            children={
              <div>
                <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
                  <ul>
                    <li key={`1`}>
                      Texture Pack:{" "}
                      <Link href="https://www.json.org/json-en.html" text="JSON" ></Link>
                      {", "}
                      <Link href="https://wiki.bedrock.dev/json-ui/json-ui-documentation.html" text="Minecraft Bedrock JsonUI" ></Link>
                    </li>
                  </ul>
                </div>
              </div>
            }
          ></ScreenSection>
        </div>
      </div>
    </div>
  )
}

export { SimpleUIPage }