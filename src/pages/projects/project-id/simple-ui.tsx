import { ScreenSection } from "../../../components/layout/screen-section";
import { Button } from "../../../components/button/button";
import { ImageSection } from "../../../components/global/projects-pages-global";
import { RouterLink } from "../../../components/router-link/rouer-link";

const SimpleUIPage = () => {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Simple UI"
        description1="Experimental UI for personal use, but also to test custom buttons layout! General appearance and in-game UI was fully created by me."
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
    </div>
  )
}

export { SimpleUIPage }