import { ScreenSection } from "../../../common/layout/screen-section";
import { Button, ButtonColor } from "../../../common/button/button";
import { Link } from "../../../common/link/link";

function OneSlimeBlockAdventurePage() {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="One Slime Block Adventure"
        // description1="I was part of creating custom HUD elements with custom server from! This was the most advanced project I've worked on, it was a great experience to work with other developers and create something that big and complex!"
        description1="Todo"
        children={
          <div className="ScreenSectionButtons">
            <Button buttonColor={ButtonColor.blue}>
              <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Download" href="https://www.minecraft.net/en-us/marketplace/creator?name=mush%20co"></Link>
            </Button>
            <Button buttonColor={ButtonColor.default}>
              <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Mush Co Website" href="https://www.mushco.games/games"></Link>
            </Button>
          </div>
        }
      ></ScreenSection>

      <ScreenSection
        title="Trailer"
        description1="Official trailer for One Slime Block Adventure, showcasing the custom HUD elements and the unique gameplay experience."
        children={
          <div className="iframe-container">
            <iframe src="https://www.youtube.com/embed/xznuwBypHg4" title="ne Slime Block Adventure (Official Trailer)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        }
      ></ScreenSection>


      {/* <ScreenSection
        style={{ borderBottom: 0 }}
        title="Soon"
        description1="..."
      ></ScreenSection> */}
    </div>
  )
}

export { OneSlimeBlockAdventurePage }