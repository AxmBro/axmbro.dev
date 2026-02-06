import { ScreenSection } from "../../../components/layout/screen-section";
import { Button } from "../../../components/button/button";
import { ImageSection } from "../../../components/global/projects-pages-global";
import { RouterLink } from "../../../components/router-link/rouer-link";

export function CustomSkyOverlayPage() {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Custom Sky Overlay"
        description1="Collection of 16 custom skies for Minecraft Bedrock Edition. Adjust them using subpacks."
        children={
          <div className="ScreenSectionButtons">
            <RouterLink
              to="https://betterbedrock.com/project/preview/custom_sky_overlay" newTab>
              <Button text="Download" buttonColor={"blue"}></Button>
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

      <div id="trailer-container">
        <ScreenSection
          title="Showcase Video"
          description1="Take a look at this showcase video, which shows in details all 16 custom skies included in this pack. You can also see how to adjust them using subpacks and how they look in-game."
          children={
            <div className="iframe-container">
              <iframe src="https://www.youtube.com/embed/crJRXaUD6yI" title="16 Custom Sky Overlay | 240FPS | Texture Pack by AmBro | (Minecraft PE, Win10, Xbox, PS4)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          }
        ></ScreenSection>
      </div>

      <ImageSection
        noBorder={true}
        title={"8 of 16 sky examples"}
        sectionDescription={"Here are some in-game examples showcasing the custom skies."}
        items={[
          {
            title: "Sky",
            description: "",
            imageSrc: "custom_sky_overlay2"
          },
          {
            title: "Sky",
            description: "",
            imageSrc: "custom_sky_overlay3"
          },
          {
            title: "Sky",
            description: "",
            imageSrc: "custom_sky_overlay4"
          },
          {
            title: "Sky",
            description: "",
            imageSrc: "custom_sky_overlay5"
          },
          {
            title: "Sky",
            description: "",
            imageSrc: "custom_sky_overlay6"
          },
          {
            title: "Sky",
            description: "",
            imageSrc: "custom_sky_overlay7"
          },
          {
            title: "Sky",
            description: "",
            imageSrc: "custom_sky_overlay8"
          },
          {
            title: "Sky",
            description: "",
            imageSrc: "custom_sky_overlay9"
          }
        ]}>
      </ImageSection>
    </div>
  )
}