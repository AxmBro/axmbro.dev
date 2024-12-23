import React from "react";
import { ScreenSection } from "../../components/ScreenSection.tsx";
import { Button, ButtonColor } from "../../components/Button.tsx";
import { Link } from "../../components/Link.tsx";

function MurderDetectorPage() {
  return (
    <div className="projects screenContainer">
      <div className="screenContent">
        <ScreenSection
          title="Murder Detector"
          description1="Simple let us say... shhhh... CHEAT by just TEXTURE PACK. Models system provided by MCBE allows to check what item player is holding, or with additional info, held. Using this user is able to see which person is murderer or sheriff by icon above head or optionally by extra xray!"
          children={
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button buttonColor={ButtonColor.blue}>
                <Link useUnderline={false} textColor="var(--website-background-color)" text="Download" href="https://betterbedrock.com"></Link>
              </Button>
              <Button buttonColor={ButtonColor.default}>
                <Link useUnderline={false} textColor="var(--website-background-color)" text="Watch Trailer" href="https://www.youtube.com/watch?v=CijS2JXf7BI"></Link>
              </Button>
              <Button buttonColor={ButtonColor.defaultEmpty}>
                <Link useUnderline={false} textColor="var(--primary-text-color)" text="Discord Server" href="https://discord.gg/ZGK5WYXnEY"></Link>
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

export { MurderDetectorPage }