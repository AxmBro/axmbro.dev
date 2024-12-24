import React from "react";
import { ScreenSection } from "../../components/ScreenSection.tsx";
import { Button, ButtonColor } from "../../components/Button.tsx";
import { Link } from "../../components/Link.tsx";

function OneBlockSlimeBlockAdventurePage() {
  return (
    <div className="projects screenContainer">
      <div className="screenContent">
        <ScreenSection
          style={{ padding: "1rem 0 2rem 0" }}
          title="One Block Slime Block Adventure"
          description1="I was part of creating custom HUD elements with custom server from!"
          children={
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button buttonColor={ButtonColor.blue}>
                <Link useUnderline={false} textColor="var(--website-background-color)" text="Download" href="https://www.mushco.games/games"></Link>
              </Button>
            </div>
          }
        ></ScreenSection>
        <ScreenSection
          title="Example desc"
          description1="todo"
        ></ScreenSection>
      </div>
    </div>
  )
}

export { OneBlockSlimeBlockAdventurePage }