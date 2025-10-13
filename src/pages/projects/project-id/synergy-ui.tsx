import { ScreenSection } from "../../../components/layout/screen-section";
import { Button } from "../../../components/button/button";
import { ImageSection } from "../../../components/global/projects-pages-global";
import { RouterLink } from "../../../components/router-link/rouer-link";

const SynergyUIPage = () => {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Synergy UI"
        description1="Simple UI inspired by TFT game. Fully responsive and clear looking interface for customer."
        children={
          <div className="ScreenSectionButtons">
            <RouterLink
              to="/contact">
              <Button text="Contact" buttonColor={"blue"}></Button>
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
            title: "Whole Element",
            description: "Which is located in the left side of the scree. It's fully customizable, you can set index, title, description, image and extra synergies at the bottom!",
            imageSrc: "synergy_ui1"
          },
          {
            title: "Adjustable Length",
            description: "You can always set the length of the elements, which you want to display! But also, hide index if it's not needed.",
            imageSrc: "synergy_ui2"
          },
          {
            title: "Just One Element",
            description: "Use only one element with set the index if needed. Take a look how background autmatically adjusts to the elements size.",
            imageSrc: "synergy_ui3"
          },
          {
            title: "Example Usage",
            description: "Finally here is one simple example :3",
            imageSrc: "synergy_ui4"
          },
        ]}>
      </ImageSection>
    </div>
  )
}

export { SynergyUIPage }