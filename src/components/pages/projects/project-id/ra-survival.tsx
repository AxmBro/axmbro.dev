import { ScreenSection } from "../../../common/layout/screen-section";
import { Button, ButtonColor } from "../../../common/button/button";
import { Link } from "../../../common/link/link";

function RaSurvivalPage() {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Ra Survival"
        description1="I was part of creating custom HUD elements!"
        // children={
        //   <div className="ScreenSectionButtons">
        //     <Button buttonColor={ButtonColor.blue}>
        //       <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Marketplace Download" href="https://www.minecraft.net/en-us/marketplace/creator?name=mush%20co"></Link>
        //     </Button>
        //     <Button buttonColor={ButtonColor.default}>
        //       <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Mush Co Website" href="https://www.mushco.games/games"></Link>
        //     </Button>
        //   </div>
        // }
      ></ScreenSection>
      <ScreenSection
        style={{ borderBottom: 0 }}
        title="Soon"
        description1="..."
      ></ScreenSection>
    </div>
  )
}

export { RaSurvivalPage }