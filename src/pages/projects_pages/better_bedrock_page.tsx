import React from "react";
import { ScreenSection } from "../../components/ScreenSection.tsx";
import { Button, ButtonColor } from "../../components/Button.tsx";
import { Link } from "../../components/Link.tsx";
import "./project_pages_global.css";

function BetterBedrockPage() {
  return (
    <div className="projects better_bedrock_page projects_pages screenContainer">
      <div className="screenContent">
        <ScreenSection
          style={{ padding: "1rem 0 2rem 0" }}
          title="Better Bedrock"
          description1="The Better Bedrock is project of Texture Pack for MCBE Edition, Website and Mobile App available only for Android. The Main goal is to improve the default Minecraft gameplay to a whole new level with many new features!"
          children={
            <div className="ScreenSectionButtons" style={{ display: "flex", gap: "1rem" }}>
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
          ignoreChildrenPadding={true}
          title="Creators"
          children={
            <div>
              <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
                <ul>
                  <li key={`1`}>
                    Texture Pack, Discord:{" "}
                    <Link href="https://github.com/AxmBro" text="AxmBro" ></Link>
                  </li>
                  <li key={`2`}>
                    Mobile App, Website, Android Client, Windows Client:{" "}
                    <Link href="https://github.com/idarkQ" text="iDarkQ" ></Link>
                  </li>
                </ul>
              </div>
            </div>
          }
        ></ScreenSection>
        <ScreenSection
          ignoreChildrenPadding={true}
          title="Technology"
          children={
            <div>
              <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
                <ul>
                  <li key={`1`}>
                    Texture Pack:{" "}
                    <Link href="https://www.json.org/json-en.html" text="JSON" ></Link>
                    {", "}
                    <Link href="https://wiki.bedrock.dev/json-ui/json-ui-documentation.html" text="Minecraft Bedrock JsonUI" ></Link>
                  </li>
                  <li key={`2`}>
                    Website, Android Client, Windows Client:{" "}
                    <Link href="https://flutter.dev/" text="Flutter" ></Link>
                    {", "}
                    <Link href="https://react.dev/" text="React" ></Link>
                    {", "}
                    <Link href="https://supabase.com/" text="Supabase" ></Link>
                    {", Platform APIs"}
                  </li>
                </ul>
              </div>
            </div>
          }
        ></ScreenSection>
        <ScreenSection
          title="Latest Version Trailer"
          description1="Take a look at this showcase trailer, which shows in details all key elements for Better Bedrock v7.0+ These are texture pack, mobile client and website."
          children={
            <div className="iframe-container">
              <iframe src="https://www.youtube.com/embed/v5O-AG9P1Ag?si=mhlCWsULlzvv94Yg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          }
        ></ScreenSection>
        <ScreenSection
          title="Texture Pack v7.2"
          description1="Here is a list of featues with brief description and the actual in-game screenshot!"
        ></ScreenSection>
        <ScreenSection
          title="Mobile App v1.1.1"
          description1="Here is a list of featues with brief description and the actual screenshot on device!"
        ></ScreenSection>
        <ScreenSection
          title="Website"
          description1="Here is a list of desktop website screenshots with short description!"
        ></ScreenSection>
        <ScreenSection
          title="Client v1"
          description1="Here is a list of featues with brief description and the actual in-game screenshot!"
        ></ScreenSection>
      </div>
    </div>
  )
}

export { BetterBedrockPage }