import { ScreenSection } from "../../../components/layout/screen-section";
import { Button } from "../../../components/button/button";
import { ImageSection } from "../../../components/global/projects-pages-global";
import { RouterLink } from "../../../components/router-link/rouer-link";

function OSUIPage() {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="OS UI"
        description1="Experimental UI for personal use! General appearance and in-game UI was fully created by me."
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
            description: "Simple layout with title and description. Pay attention that there is no gap, every button is perfectly sized and aligned!",
            imageSrc: "osui2"
          },
          {
            title: "Hover Effect",
            description: "Which is white outline around button. It's working with all buttons here.",
            imageSrc: "osui3"
          },
        ]}>
      </ImageSection>
    </div>
  )
}

export { OSUIPage }