import React from "react";
import { ScreenSection } from "../../components/ScreenSection";
import { Link } from "../../components/Link";
import { ImageSection } from "../../components/ProjectsPagesGlobalElements";
import { Button, ButtonColor } from "../../components/Button";
import { scrollToElement } from "../../utils/utils";
import { useNavigate, useLocation } from "react-router-dom";

interface ShopUIPageProps {
  openHomeRouteByContactButton: boolean;
  setOpenHomeRouteByContactButton: React.Dispatch<React.SetStateAction<boolean>>;
}

function ShopUIPage({ openHomeRouteByContactButton, setOpenHomeRouteByContactButton }: ShopUIPageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (to: string) => {
    navigate(to);
  };

  return (
    <div className="projects screenContainer">
      <div className="screenContent projects_pages">
        <ScreenSection
          style={{ padding: "1rem 0 2rem 0" }}
          title="Shop UI"
          description1="CUSTOM SERVER FORM UI created for personal use, but also to test custom tabs in vanilla style, many texts in each button and search feature! General appearance and in-game UI was fully created by me."
          children={
            <div className="ScreenSectionButtons">
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
              title: "General Appearance",
              description: "UI is in vanilla style with many extra buttons on top. Main section is filled with scrollable grid buttons.",
              imageSrc: "shop_form1"
            },
            {
              title: "Tabs in Vanilla Style",
              description: "Very informative image based tabs with extra on-hover text. When clicked new form is reloaded.",
              imageSrc: "shop_form6"
            },
            {
              title: "Button Hover Text",
              description: "There is option for extra on-hover text on button.",
              imageSrc: "shop_form2"
            },
            {
              title: "Extra Discount Texts",
              description: "Another extra option to discount current value to new with additional information in percentages.",
              imageSrc: "shop_form3"
            },
            {
              title: "Search Bar Feature",
              description: "User can always select this tab and open 'Search Mode' where you are able to search through all given buttons.",
              imageSrc: "shop_form7"
            },
            {
              title: "Look in Search Mode",
              description: "Appearance is slightly different, it's in list style, because grid style doesn't allow to dynamically list elements.",
              imageSrc: "shop_form4"
            },
            {
              title: "Example Search Result",
              description: "Search bar is really case sensitive and text you write is filtered by even big or small letters. For these more curious, it's client side live result.",
              imageSrc: "shop_form5"
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

export { ShopUIPage }