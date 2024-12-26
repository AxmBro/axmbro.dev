import React from "react";
import { ScreenSection } from "../../components/ScreenSection";
import { Button, ButtonColor } from "../../components/Button";
import { Link } from "../../components/Link";

function OneBlockSlimeBlockAdventurePage() {
  return (
    <div className="projects screenContainer">
      <div className="screenContent">
        <ScreenSection
          style={{ padding: "1rem 0 2rem 0" }}
          title="One Block Slime Block Adventure"
          description1="I was part of creating custom HUD elements with custom server from! This was the most advanced project I've worked on, it was a great experience to work with other developers and create something that big and complex!"
          children={
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button buttonColor={ButtonColor.blue}>
                <Link useUnderline={false} textColor="var(--website-background-color)" text="Marketplace Download" href="https://www.minecraft.net/en-us/marketplace/creator?name=mush%20co"></Link>
              </Button>
              <Button buttonColor={ButtonColor.default}>
                <Link useUnderline={false} textColor="var(--website-background-color)" text="Mush Co Website" href="https://www.mushco.games/games"></Link>
              </Button>
            </div>
          }
        ></ScreenSection>
        <ScreenSection
          title="Soon"
          description1="..."
        ></ScreenSection>
      </div>
    </div>
  )
}

export { OneBlockSlimeBlockAdventurePage }