import { ScreenSection } from "../../../components/layout/screen-section";
import { Button } from "../../../components/button/button";
import { ImageSection } from "../../../components/global/projects-pages-global";
import { RouterLink } from "../../../components/router-link/rouer-link";

function RedUIPage() {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Red UI"
        description1="Experimental UI for personal use! General appearance and in-game UI was fully created by me. It's not finished project."
        children={
          <div className="ScreenSectionButtons">
            <RouterLink
              to="/contact">
              <Button text="Want this UI? Contact Me" buttonColor={"blue"}></Button>
            </RouterLink>
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
            title: "Server Form UI",
            description: "Slightly different layout than usual. Whenever there are 1 or 2 buttons, they align to center. After they use grid layout.",
            imageSrc: "redui2"
          },
          {
            title: "UI with 2 buttons",
            description: "Take a look how they are centered. There are also custom previous/next buttons in top right next to header.",
            imageSrc: "redui3"
          },
          {
            title: "UI with 3 buttons",
            description: "Right now they are in grid layout, however they are also custom hover text!",
            imageSrc: "redui5"
          },
          {
            title: "Unlimited buttons & scrolling",
            description: "That's the view with more buttons. Pay attention to custom HD gradient textures almost everywhere ;)",
            imageSrc: "redui4"
          },
        ]}>
      </ImageSection>
    </div>
  )
}

export { RedUIPage }