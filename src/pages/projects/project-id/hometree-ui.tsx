import { ScreenSection } from "../../../components/layout/screen-section";
import { Button } from "../../../components/button/button";
import { ImageSection } from "../../../components/global/projects-pages-global";
import { RouterLink } from "../../../components/router-link/rouer-link";

function HometreeUIPage() {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Hometree UI"
        description1="Colorful and simple UI for customer. General appearance was designed by customer and slighly by me. In-game UI is fully created by me."
        children={
          <div className="ScreenSectionButtons">
            <RouterLink
              to="/contact">
              <Button text="Contact" buttonColor={"default"}></Button>
            </RouterLink>
          </div>
        }
      ></ScreenSection>
      <ScreenSection
        noChildrenPadding={true}
        title="Information"
        children={
          <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
            <ul>
              <li key={`1`}>
                Creator:{" "}
                <a href="https://github.com/AxmBro">Me - AxmBro</a>
              </li>
            </ul>
          </div>
        }
      ></ScreenSection>
      <ImageSection
        noBorder={true}
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
    </div>
  )
}

export { HometreeUIPage }