import { ScreenSection } from "../../components/layout/screen_section";
import { Button, ButtonColor } from "../../components/button/button";
import { Link } from "../../components/link/custom_link";
import { ImageSection } from "../../components/global/projects_pages_global";
import { scrollToElement } from "../../utils/scroll";

function HometreeUIPage() {
  return (
    <div className="projects_pages">
      <ScreenSection
        style={{ padding: "1rem 0 2rem 0" }}
        title="Hometree UI"
        description1="CUSTOM SERVER FORM UI created for customer. It's pretty colorful and simple grid UI used in gamemodes selector and extra information form! General appearance was designed by customer and slighly by me. In-game UI is fully created by me."
        children={
          <div className="ScreenSectionButtons">
            <Button buttonColor={ButtonColor.blue}>
              <Link useUnderline={false} textColor="var(--website-background-color)" text="Discord Server" href="https://discord.gg/ZGK5WYXnEY"></Link>
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
            title: "Gamemodes Selector",
            description: "UI with header that contains title logo on left and title with multiline description on right. There are buttons in grid style under, with selectable color and optional '2x XP' text in top right corner.",
            imageSrc: "hometree1"
          },
          {
            title: "Again Gamemodes Selector",
            description: "This time with more buttons and visible scroll on right.",
            imageSrc: "hometree3"
          },
          {
            title: "Grid Button",
            description: "This is closer look of grid button. See that the color of the button title matches the outline, which is only visible when the cursor is hovered over.",
            imageSrc: "hometree4"
          },
          {
            title: "Advertisement Form",
            description: "Simple UI that shows only big image in center and continue (basically exit) button under. It's only for information purposes.",
            imageSrc: "hometree2"
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

export { HometreeUIPage }