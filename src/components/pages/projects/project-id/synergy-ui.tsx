import React from "react";
import { ScreenSection } from "../../../common/layout/screen-section";
import { Button, ButtonColor } from "../../../common/button/button";
import { Link } from "../../../common/link/link";
import { ImageSection } from "../../../common/global/projects-pages-global";
import { RouteLink } from "../../../common/link/route-link";

const SynergyUIPage: React.FC = () => {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Synergy UI"
        description1="Simple UI inspired by TFT game. Fully responsive and clear looking interface for customer."
        children={
          <div className="ScreenSectionButtons">
            <RouteLink
              to="/contact">
              <Button text="Contact" buttonColor={ButtonColor.blue}></Button>
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