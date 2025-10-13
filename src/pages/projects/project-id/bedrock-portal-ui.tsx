import { ScreenSection } from "../../../components/layout/screen-section";
import { Button } from "../../../components/button/button";
import { ImageSection } from "../../../components/global/projects-pages-global";
import { RouterLink } from "../../../components/router-link/rouer-link";

function BedrockPortalUIPage() {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Bedrock Portal UI"
        description1="Nice looking oreUI themed UI. Mainly in dark theme with cool subtle features and great layout. In-game UI is fully created by me. I also modified entire UI look to match oreUI design - I got mockups however they got changed in terms of design."
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
            title: "Server Explorer UI",
            description: "Grid UI with special navigation buttons and expandable list of missing categories.",
            imageSrc: "bpui1"
          },
          {
            title: "Server Explorer Scrolling",
            description: "Entire UI is perfectly positioned and it cuts in proper edges.",
            imageSrc: "bpui2"
          },
          {
            title: "Server Explorer without Scrolling",
            description: "View without scrolling, simple and clean",
            imageSrc: "bpui3"
          },
          {
            title: "Expandable 'More' Button",
            description: "When clicked, it's showing the rest of navigation buttons. Also there is subtle dark background behind ;)",
            imageSrc: "bpui4"
          },
          {
            title: "'More' Dropdown Content with more buttons behind",
            description: "Take a look how content on the right is perfectly cut to edge at the bottom.",
            imageSrc: "bpui5"
          },
          {
            title: "Server Page UI",
            description: "Simple menu with more information that comes after previous UI from above.",
            imageSrc: "bpui6"
          },
          {
            title: "Custom Servers UI",
            description: "Clean looking menu with play, settings and delete options.",
            imageSrc: "bpui7"
          },
          {
            title: "Custom Servers Scrolling",
            description: "Again, perfectly cut scrolling panel, pay attention that texture of scroll bar is changed to oreUI themed one 1:1",
            imageSrc: "bpui8"
          },
          {
            title: "Custom Modal Form",
            description: "Where toggles, dropdowns and inputs got reworked to match minecraft style!",
            imageSrc: "bpui9"
          },
          {
            title: "Custom Modal Form Scrolling & Dropdown",
            description: "With again perfectly positioned scrolling and custom dropdown content view.",
            imageSrc: "bpui10"
          },
        ]}>
      </ImageSection>
    </div>
  )
}

export { BedrockPortalUIPage }