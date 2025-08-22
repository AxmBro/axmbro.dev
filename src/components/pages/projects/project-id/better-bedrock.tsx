import { ScreenSection } from "../../../common/layout/screen-section";
import { Button, ButtonColor } from "../../../common/button/button";
import { Link } from "../../../common/link/link";
import "../../../common/global/projects-pages-global.css";
import { ImageSection } from "../../../common/global/projects-pages-global";
import { RouteLink } from "../../../common/link/route-link";

function BetterBedrockPage() {
  return (
    <div className="better_bedrock_page projects_pages">
      <ScreenSection
        title="Better Bedrock"
        description1="Is a free, powerful and customizable texture pack for Minecraft Bedrock Edition! Enhance your gameplay with multiple features and almost 300 config options, supported on all platforms."
        children={
          <div className="ScreenSectionButtons">
            <Button buttonColor={ButtonColor.blue}>
              <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Download" href="https://betterbedrock.com"></Link>
            </Button>
            <Button buttonColor={ButtonColor.default}>
              <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Discord Server" href="https://discord.gg/ZGK5WYXnEY"></Link>
            </Button>
            <RouteLink
              to="/contact">
              <Button text="Contact" buttonColor={ButtonColor.default}></Button>
            </RouteLink>
          </div>
        }
      ></ScreenSection>

      <ScreenSection
        noChildrenPadding={true}
        title="Information"
        children={
          <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
            <ul>
              <li key={`1`}>
                Texture Packs:{" "}
                <Link href="https://github.com/AxmBro" text="Me - AxmBro" ></Link>
              </li>
              <li key={`2`}>
                Website & Other:{" "}
                <Link href="https://github.com/idarkQ" text="iDarkQ" ></Link>
              </li>
            </ul>
          </div>
        }
      ></ScreenSection>

      <div id="trailer-container">
        <ScreenSection
          title="Latest Version Trailer"
          description1="Take a look at this showcase trailer, which shows in details all key elements for Better Bedrock v7.0+ These are texture pack, mobile client and website."
          children={
            <div className="iframe-container">
              <iframe src="https://www.youtube.com/embed/4XSc0J0mrlU" title="BETTER BEDROCK V8 RELEASE! The Best Utility Texture Pack for Minecraft Bedrock | Showcase Trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          }
        ></ScreenSection>
      </div>
      <ImageSection
        title={"Texture Pack"}
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
        title={"Website"}
        sectionDescription={"Which is open source! Navigate to github repository from the footer."}
        items={[
          {
            title: "Home",
            description: "Simple section with just important info, it needs to be improved for sure :3",
            imageSrc: "web1"
          },
          {
            title: "Downloads",
            description: "Section where you can download latest BB content, Extensions for Texture Pack and Archived versions.",
            imageSrc: "web2"
          },
          {
            title: "Community/Side Projects",
            description: "Section where you can find related projects to the Better Bedrock.",
            imageSrc: "web3"
          },
          {
            title: "Information",
            description: "In which you can find FAQ separated by categories.",
            imageSrc: "web4"
          },
          {
            title: "Tutorial Videos",
            description: "Under the FAQ you can find a list of videos that explain how to use Better Bedrock and its features.",
            imageSrc: "web5"
          },
        ]}>
      </ImageSection>
      <ImageSection
        title={"Mobile App (CANCELLED)"}
        sectionDescription={"Here is a list of desktop website views with short description!"}
        rowStyle={true}
        childrenTopDividerInside={false}
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
        title={"Windows Client v1 (CANCELLED)"}
        sectionDescription={"Here is a list of featues with brief description and the actual in-game view!"}
        items={[
          {
            title: "Client Application",
            description: "Mod Menu in Better Bedrock style, currently with simple modules!",
            imageSrc: "client1"
          },
        ]}>
      </ImageSection>
    </div>
  )
}

export { BetterBedrockPage }