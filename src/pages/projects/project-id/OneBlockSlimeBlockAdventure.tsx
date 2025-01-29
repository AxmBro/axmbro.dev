import { ScreenSection } from "../../../components/layout/ScreenSection";
import { Button, ButtonColor } from "../../../components/button/Button";
import { Link } from "../../../components/link/Link";

function OneBlockSlimeBlockAdventurePage() {
  return (
    <div className="projects_pages">
      <ScreenSection
        style={{ padding: "1rem 0 2rem 0" }}
        title="One Block Slime Block Adventure"
        description1="I was part of creating custom HUD elements with custom server from! This was the most advanced project I've worked on, it was a great experience to work with other developers and create something that big and complex!"
        children={
          <div className="ScreenSectionButtons">
            <Button buttonColor={ButtonColor.blue}>
              <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Marketplace Download" href="https://www.minecraft.net/en-us/marketplace/creator?name=mush%20co"></Link>
            </Button>
            <Button buttonColor={ButtonColor.default}>
              <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Mush Co Website" href="https://www.mushco.games/games"></Link>
            </Button>
          </div>
        }
      ></ScreenSection>
      <ScreenSection
        style={{ borderBottom: 0 }}
        title="Soon"
        description1="..."
      ></ScreenSection>
    </div>
  )
}

export { OneBlockSlimeBlockAdventurePage }