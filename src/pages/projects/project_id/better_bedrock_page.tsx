import React from "react";
import { ScreenSection } from "../../../components/layout/screen_section";
import { Button, ButtonColor } from "../../../components/button/button";
import { Link } from "../../../components/link/custom_link";
import "../../../components/global/projects_pages_global.css";
import { scrollToElement } from "../../../utils/scroll";
import { ImageSection } from "../../../components/global/projects_pages_global";

function BetterBedrockPage() {
  return (
    <div className="better_bedrock_page projects_pages">
      <ScreenSection
        style={{ padding: "1rem 0 2rem 0" }}
        title="Better Bedrock"
        description1="The Better Bedrock is project of Texture Pack for MCBE Edition, Website and Mobile App available only for Android. The Main goal is to improve the default Minecraft gameplay to a whole new level with many new features!"
        children={
          <div className="ScreenSectionButtons">
            <Button buttonColor={ButtonColor.blue}>
              <Link useUnderline={false} textColor="var(--website-background-color)" text="Download" href="https://betterbedrock.com"></Link>
            </Button>
            <Button buttonColor={ButtonColor.default}>
              <Link useUnderline={false} textColor="var(--website-background-color)" text="Discord Server" href="https://discord.gg/ZGK5WYXnEY"></Link>
            </Button>
            <div onClick={() => { scrollToElement("credits") }}>
              <Button buttonColor={ButtonColor.defaultEmpty} text="Credits"></Button>
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
            title: "Gameplay on Another Level",
            description: "Improved experience with HUD mods, making gameplay more immersive and strategic!",
            imageSrc: "bb1"
          },
          {
            title: "Mod Menu",
            description: "Fully customizable mods and adjustable HUD elements that provide essential information!",
            imageSrc: "bb2"
          },
          {
            title: "Custom UIs",
            description: "Revamped custom UIs offer a refreshed design, giving Minecraft's main screens a sleek and updated look!",
            imageSrc: "bb3"
          },
          {
            title: "Many Extension Packs",
            description: "Extra packs like Waypoints, Better Fogs, and Dark Mode are designed to improve your Minecraft experience!",
            imageSrc: "bb4"
          },
          {
            title: "Config System",
            description: "After you figure out mods, you are able to save all their states and edit some extra global options!",
            imageSrc: "bb5"
          },
          {
            title: "Platform Support",
            description: "And at the end of the day, you can use this Texture Pack on computer, later on your phone and finally on a friend's Console!",
            imageSrc: "bb6"
          }
        ]}>
      </ImageSection>
      <ImageSection
        title={"Mobile App"}
        sectionDescription={"Here is a list of desktop website views with short description!"}
        rowStyle={true}
        items={[
          {
            title: "Home",
            description: "General information about new videos, mobile app news and our goals.",
            imageSrc: "mobile1"
          },
          {
            title: "Config",
            description: "Main section of App, you can edit config here without any 3rd party text editors!",
            imageSrc: "mobile2"
          },
          {
            title: "Cape Editor",
            description: "Extra feature that allows you to configure BB Cape, which is visible for all BB users!",
            imageSrc: "mobile3"
          },
        ]}>
      </ImageSection>
      <ImageSection
        title={"Website"}
        sectionDescription={"Here is a list of desktop website views with short description!"}
        items={[
          {
            title: "Home",
            description: "Simple section with just important info, in my opinion still lacks of some elements :S",
            imageSrc: "web1"
          },
          {
            title: "Downloads",
            description: "Section where you can download latest BB content, Extensions for Texture Pack, Side Projects, Archived versions.",
            imageSrc: "web2"
          },
          {
            title: "Faq",
            description: "Here is list of frequently asked questions!",
            imageSrc: "web3"
          },
        ]}>
      </ImageSection>
      <ImageSection
        title={"Windows Client v1"}
        sectionDescription={"Here is a list of featues with brief description and the actual in-game view!"}
        items={[
          {
            title: "Client Application",
            description: "Mod Menu in Better Bedrock style, currently with simple modules!",
            imageSrc: "client1"
          },
        ]}>
      </ImageSection>
      <div id="credits">
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
          style={{ borderBottom: 0 }}
          ignoreChildrenPadding={true}
          title="Technology"
          children={
            <div>
              <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
                <ul>
                  <li key={`1`}>
                    Texture Pack:{" "}
                    <Link href="https://www.json.org/json-en.html" text="JSON" ></Link>
                    {" | "}
                    <Link href="https://wiki.bedrock.dev/json-ui/json-ui-documentation.html" text="Minecraft Bedrock JsonUI" ></Link>
                  </li>
                  <li key={`2`}>
                    Website, Android Client, Windows Client:{" "}
                    <Link href="https://flutter.dev/" text="Flutter" ></Link>
                    {" | "}
                    <Link href="https://react.dev/" text="React" ></Link>
                    {" | "}
                    <Link href="https://supabase.com/" text="Supabase" ></Link>
                    {" | Platform APIs"}
                  </li>
                </ul>
              </div>
            </div>
          }
        ></ScreenSection>
      </div>
    </div>
  )
}

export { BetterBedrockPage }