import React from "react";
import { ScreenSection } from "../../components/ScreenSection.tsx";
import { Button, ButtonColor } from "../../components/Button.tsx";
import { Link } from "../../components/Link.tsx";

function BetterBedrockPage() {
  return (
    <div className="projects screenContainer">
      <div className="screenContent">
        <ScreenSection
          title="Better Bedrock"
          description1="The Better Bedrock is project of Texture Pack for MCBE Edition, Website and Mobile App available only for Android. The Main goal is to improve the default Minecraft gameplay to a whole new level with many new features!"
          children={
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button buttonColor={ButtonColor.blue}>
                <Link useUnderline={false} textColor="var(--website-background-color)" text="Download" href="https://betterbedrock.com"></Link>
              </Button>
              <Button buttonColor={ButtonColor.default}>
                <Link useUnderline={false} textColor="var(--website-background-color)" text="Watch Trailer" href="https://www.youtube.com/watch?v=v5O-AG9P1Ag"></Link>
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

export { BetterBedrockPage }