import { ScreenSection } from "../../../components/layout/screen-section";
import { Button } from "../../../components/button/button";
import "./../../../components/global/projects-pages-global.css";
import { ImageSection } from "../../../components/global/projects-pages-global";
import { RouterLink } from "../../../components/router-link/rouer-link";

function MurderDetectorPage() {
  return (
    <div className="murder_detector_page projects_pages">
      <ScreenSection
        title="Murder Detector+"
        description1="Simple let us say... shhhh... CHEAT by just TEXTURE PACK. Models system provided by MCBE allows to check what item player is holding, or with additional info, held. Using this user is able to see which person is murderer or sheriff by icon above head or optionally by extra xray!"
        children={
          <div className="ScreenSectionButtons">
            <RouterLink
              to="https://betterbedrock.com/project/preview/murder_detector" newTab>
              <Button text="Download" buttonColor={"blue"}></Button>
            </RouterLink>
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
                Creator:{" "}
                <a href="https://github.com/AxmBro">Me - AxmBro</a>
              </li>
            </ul>
          </div>
        }
      ></ScreenSection>

      <div id="trailer-container">
        <ScreenSection
          title="Trailer"
          description1="Take a look at this showcase trailer, which shows in details all key elements for Better Bedrock v7.0+ These are texture pack, mobile client and website."
          children={
            <div className="iframe-container">
              <iframe src="https://www.youtube.com/embed/CijS2JXf7BI" title="Murder Detector+ | MCBE Texture Pack | RELEASE Trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          }
        ></ScreenSection>
      </div>

      <ImageSection
        noBorder={true}
        title={"Texture Pack"}
        sectionDescription={"Here is a list of featues with brief description and the actual in-game view!"}
        items={[
          {
            title: "Visible Sheriffs",
            description: "Once player in game is going to take bow or arrow to hand, bow icon will be instantly visible above his name.",
            imageSrc: "mm4"
          },
          {
            title: "Murderers are visible too!",
            description: "You are able to see sword icon above murderer, by same logic like above, but detection list is larger than just bow or arrow: all types of swords, mace and nether_star.",
            imageSrc: "mm5"
          },
          {
            title: "Witness a murder!",
            description: "See how exactly you are able to see these both roles of game! Take a look on overlay effect once you are close enough.",
            imageSrc: "mm6"
          },
          {
            title: "Toggleable options",
            description: "If you don't like current options you can change them in subpacks and use: 1. Only Icon 2. Default without colors 3. Default (icon + color)",
            imageSrc: "mm7"
          },
          {
            title: "IMPORTANT!",
            description: "Why this pack is better than other packs of this type? Because of double check with cooldown to make SURE that player is murderer or sheriff, this trick bypasses simple wEaPoN against such packs from server - they give everybody sword at the start, then in packs all players would have icon above their heads, this issue is fixed in this pack! And it's available on every possible platform that can import texture packs!",
            imageSrc: "mm8"
          },
        ]}>
      </ImageSection>
    </div>
  )
}

export { MurderDetectorPage }