import React from "react";
import { ScreenSection } from "../../../components/layout/screen-section";
import { Link } from "../../../components/link/link";
import { ImageSection } from "../../../components/global/projects-pages-global";
import { Button, ButtonColor } from "../../../components/button/button";
import { scrollToElement } from "../../../utils/scroll";

const ShopUIPage: React.FC = () => {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Shop UI"
        description1="CUSTOM SERVER FORM UI created for personal use, but also to test custom tabs in vanilla style, many texts in each button and search feature! General appearance and in-game UI was fully created by me."
        children={
          <div className="ScreenSectionButtons">
            <Button buttonColor={ButtonColor.blue}>
              <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Discord Server" href="https://discord.gg/ZGK5WYXnEY"></Link>
            </Button>
            <div onClick={() => { scrollToElement("credits") }}>
              <Button buttonColor={ButtonColor.default} text="Credits"></Button>
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

export { ShopUIPage }