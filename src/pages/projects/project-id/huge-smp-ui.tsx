import { ScreenSection } from "../../../components/layout/screen-section";
import { Button } from "../../../components/button/button";
import { ImageSection } from "../../../components/global/projects-pages-global";
import { RouterLink } from "../../../components/router-link/rouer-link";

export function HugoSmpUIPage() {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Hugo SMP UI"
        description1="Java styled Pause Menu UI for bedrock-java server. With little edited scoreboard to match style from java version. UI created for customer."
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
            title: "Pause screen",
            description: "Completely custom java styled pause screen UI - to match UI from Java edition server.",
            imageSrc: "hugo_smp_ui1"
          },
          {
            title: "Layout responsiveness",
            description: "GUI scale does not matter, in every scale UI looks great and is fully responsive.",
            imageSrc: "hugo_smp_ui2"
          },
          {
            title: "Under the hood",
            description: "During development here is one image showcasing the layout structure :D",
            imageSrc: "hugo_smp_ui3"
          },
          {
            title: "Custom Scoreboard",
            description: "Custom scoreboard UI element also designed to match UI from Java edition server.",
            imageSrc: "hugo_smp_ui4"
          },
        ]}>
      </ImageSection>
    </div>
  )
}