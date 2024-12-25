import React from "react";
import { ScreenSection } from "../../components/ScreenSection";
import { Button, ButtonColor } from "../../components/Button";
import { Link } from "../../components/Link";
import "../../components/ProjectsPagesGlobalElements.css";
import { scrollToElement } from "../../utils/utils";
import { ImageSection } from "../../components/ProjectsPagesGlobalElements";

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
              <div onClick={() => { scrollToElement("trailer-container") }}>
                <Button buttonColor={ButtonColor.default} text="Watch Trailer"></Button>
              </div>
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
        <div id="trailer-container">
          <ScreenSection
            title="Latest Version Trailer"
            description1="Take a look at this showcase trailer, which shows in details all key elements for Better Bedrock v7.0+ These are texture pack, mobile client and website."
            children={
              <div className="iframe-container">
                <iframe src="https://www.youtube.com/embed/v5O-AG9P1Ag?si=mhlCWsULlzvv94Yg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>
            }
          ></ScreenSection>
        </div>
        <ImageSection
          title={"Texture Pack v7.2"}
          sectionDescription={"Here is a list of featues with brief description and the actual in-game view!"}
          items={[
            {
              title: "Title",
              description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
              imageSrc: "shop_form1"
            },
            {
              title: "aaaaaaaa",
              description: "sssssssssss",
              // imageSrc: "shop_form1"
            },
            {
              title: "dddddddddddddd",
              description: "33333333333333",
              // imageSrc: "shop_form1"
            }
          ]}>

        </ImageSection>
        {/* <ScreenSection
          title="Texture Pack v7.2"
          description1="Here is a list of featues with brief description and the actual in-game view!"
        ></ScreenSection>
        <ScreenSection
          title="Mobile App v1.1.1"
          description1="Here is a list of featues with brief description and the actual view on device!"
        ></ScreenSection>
        <ScreenSection
          title="Website"
          description1="Here is a list of desktop website views with short description!"
        ></ScreenSection>
        <ScreenSection
          title="Client v1"
          description1="Here is a list of featues with brief description and the actual in-game view!"
        ></ScreenSection> */}
      </div>
    </div>
  )
}

export { BetterBedrockPage }