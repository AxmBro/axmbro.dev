import React from "react";
import { ScreenSection } from "../../../common/layout/screen-section";
import { Button, ButtonColor } from "../../../common//button/button";
import { Link } from "../../../common//link/link";
import { ImageSection } from "../../../common/global/projects-pages-global";
import { RouteLink } from "../../../common/link/route-link";

const SimpleUIPage: React.FC = () => {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Simple UI"
        description1="Experimental UI for personal use, but also to test custom buttons layout! General appearance and in-game UI was fully created by me."
        children={
          <div className="ScreenSectionButtons">
            <RouteLink
              to="/contact">
              <Button text="Want this UI? Contact Me" buttonColor={ButtonColor.blue}></Button>
            </RouteLink>
            <RouteLink
              to="/contact">
              <Button text="Contact" buttonColor={ButtonColor.default}></Button>
            </RouteLink>
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
                <Link href="https://github.com/AxmBro" text="Me - AxmBro" ></Link>
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