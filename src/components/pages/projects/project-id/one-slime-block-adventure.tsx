import { ScreenSection } from "../../../common/layout/screen-section";
import { Button, ButtonColor } from "../../../common/button/button";
import { Link } from "../../../common/link/link";
import { ImageSection } from "../../../common/global/projects-pages-global";

function OneSlimeBlockAdventurePage() {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="One Slime Block Adventure"
        noChildrenPadding={true}>
        <p style={{ paddingBottom: "1rem" }}>Is adventure map created with Slime Block the YouTuber. I got hired to implement fancy UI stuff to either HUD and server forms. This project was the most complex one I have ever worked on!</p>
        <p style={{ paddingBottom: "1rem" }}>My part here was to just add this entire UI logic. I didn't created any textures, but used provided and made them work with JsonUI system. It was a great experience to work with Mike and create that big and complex map! During working I learned more about team job and how simple tasks may actually be difficult. Over that time I must admit that it gave me great knowledge and battlefield to test my skills - it was my first bigger project to work on!</p>
        <p style={{ paddingBottom: "1rem" }}>Speaking of working, it was long adventure, because there were many custom HUD elements to add (From here I must thank art person - vemigvan, because all asstes were perfectly adjusted!) but also the most complex custom server form - the map form which took me some hours to create. At the end final effects of these all custom UIs are just beautiful :D</p>
        <p style={{ paddingBottom: "1.5rem" }}>Currently this is completed map which is available to buy on minecraft marketplace. You can quickly check Mushco website or download pack using buttons under!</p>
        <div>
          <div className="ScreenSectionButtons">
            <Button buttonColor={ButtonColor.blue}>
              <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Download" href="https://www.minecraft.net/en-us/marketplace/creator?name=mush%20co"></Link>
            </Button>
            <Button buttonColor={ButtonColor.default}>
              <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Mush Co Website" href="https://www.mushco.games/games"></Link>
            </Button>
          </div>
        </div>
      </ScreenSection>


      <ScreenSection
        noChildrenPadding={true}
        title="Information"
        children={
          <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
            <ul>
              <li key={`1`}>
                UI system creator:{" "}
                <Link href="https://github.com/AxmBro" text="Me - AxmBro" ></Link>
              </li>
              <li key={`2`}>
                Everything rest:{" "}
                <Link href="https://www.mushco.games/" text="Mush Co Team" ></Link>
              </li>
            </ul>
          </div>
        }
      ></ScreenSection>

      <ScreenSection
        title="Trailer"
        description1="Official trailer - showcasing the custom UI elements and the unique gameplay experience!"
        children={
          <div className="iframe-container">
            <iframe src="https://www.youtube.com/embed/xznuwBypHg4" title="One Slime Block Adventure (Official Trailer)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        }
      ></ScreenSection>

      <ScreenSection
        title="HUD elments"
        description1="Take a look at this development video, which shows in details all HUD elements. This is raw footage without finished system that manages all these elements in same time.">
        <div className="iframe-container">
          <iframe src="https://www.youtube.com/embed/6s0IVXjuDXE" title="HUD UI showcase" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </ScreenSection>

      <ImageSection
        title={"In-game HUD Screnshots"}
        sectionDescription={""}
        items={[
          {
            title: "Locations",
            description: "Are fancy texts located on subtle leaf in top left corner to indicate player location.",
            imageSrc: "osba1"
          },
          {
            title: "Closer look at Locations",
            description: "Texts are immiediately updated without any animations.",
            imageSrc: "osba2"
          },
          {
            title: "Coin Counter",
            description: "Is located in top right corner around other counters. Numbers are updated immiediately, whenever coin is animated based on situation.",
            imageSrc: "osba3"
          },
          {
            title: "Closer look at Coin Counter",
            description: "Coin has some action animations, but it's also always rotating as default animation.",
            imageSrc: "osba4"
          },
          {
            title: "Enemy Counter",
            description: "Has same logic like coin, it has updatable numbers and update animation, and well... actually it doesn't have stand-by animation like coin.",
            imageSrc: "osba5"
          },
          {
            title: "Death Counter",
            description: "Same as enemy counter.",
            imageSrc: "osba6"
          },
          {
            title: "Objectives",
            description: "Are elements located unedr content in top right corner. They have updatable text and texure.",
            imageSrc: "osba7"
          },
          {
            title: "Closer look at Objectives",
            description: "They also have some entry and exit animations.",
            imageSrc: "osba8"
          },
          {
            title: "Firework Indicator",
            description: "Simple animation that is visible whenever player uses firework.",
            imageSrc: "osba9"
          },
          {
            title: "Elytra Flight Animation",
            description: "Is visible when player is flying with elytra.",
            imageSrc: "osba10"
          },
          {
            title: "Chibi Character Element",
            description: "Is located near hotbars, it has many animations based on what you are currently doing!",
            imageSrc: "osba11"
          },
          {
            title: "Closer look at Chibi Character Element",
            description: "And to be more clear, they are totally 23 actions that are shown here.",
            imageSrc: "osba12"
          },
          {
            title: "Mecha Display Element",
            description: "Is visible when player is in mecha. It has normal stand-by animations, but also they are updated with other animations everytime player is shooting.",
            imageSrc: "osba13"
          },
          {
            title: "Custom Title",
            description: "Needed to crate because of high normal title usage and it's not changable bahaviour which was needed.",
            imageSrc: "osba14"
          },
          {
            title: "Custom Title with Icons",
            description: "However with custom title, I added icons to indicate player progress - how many bosses were defeated and how many are left.",
            imageSrc: "osba16"
          },
          {
            title: "Custom Actionbar",
            description: "Same like custom title - there was need for it because of high usage of default element.",
            imageSrc: "osba15"
          },
          {
            title: "Custom Boss Bars",
            description: "Which are beautiful! I think there is no need to explain them lol.",
            imageSrc: "osba21"
          },
          {
            title: "Closer look at Custom Boss Bars",
            description: "Everything is fully customizable and it's capable of displaying either dazed text and icon which are fully animated.",
            imageSrc: "osba22"
          },
          {
            title: "Custom Hotbar Slots",
            description: "Which is just one image - from technical side it was much better solution to we skipped process to manually add every single slot and texture.",
            imageSrc: "osba24"
          },
          {
            title: "Custom Inventory Look",
            description: "Which from first look gives impression - as intended lol, but from thenical side it's just one single image which wasn't really easy to put here - but it was much better solution instead of creating countless textures for every cell etc.",
            imageSrc: "osba23"
          },
          {
            title: "Black Bars",
            description: "Which on single image aren't that impressive. They have special entry and exit animations and generally there were need for them to boost even more cut scenes.",
            imageSrc: "osba17"
          },
          {
            title: "First Loading Screen",
            description: "Simple loading texture which fill whole screen.",
            imageSrc: "osba18"
          },
          {
            title: "Second Loading Screen",
            description: "As extra technical aspect, they are even visible through all screens - so players cannot really see what's going on in game - they are inevitable!",
            imageSrc: "osba19"
          },
          {
            title: "UI visiblity (technical)",
            description: "There is completely special and custom function that allows to toggle HUD visiblity by commands.",
            imageSrc: "osba20"
          },
        ]}>
      </ImageSection>

      <ScreenSection
        title="Map Form"
        description1="Take a look at this development video, which shows in details Map Form.">
        <div className="iframe-container">
          <iframe src="https://www.youtube.com/embed/kg8VKkPnY6g" title="Map Form UI showcase" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </ScreenSection>

      <ImageSection
        noBorder={true}
        title={"In-game Map Form Screnshots"}
        sectionDescription={""}
        items={[
          {
            title: "Map Entry",
            description: "During first open of map form, there is special animation played at the bottom and all elements or actions are locked due not unlocked dimensions.",
            imageSrc: "osba25"
          },
          {
            title: "Some Map Phase",
            description: "During phase after start, you are able to teleport wherever you want. Basically you cannot teleport to island you currently are or haven't unlocked yet.",
            imageSrc: "osba26"
          },
          {
            title: "Ending Map Phase",
            description: "As you progress over time, map regions and killed bosses appears on display. In this time, you can see whole content and in my opinion it looks gorgeous, even on image - I recommend to watch dev video to actually see every part moving here, because every state here is animated!",
            imageSrc: "osba27"
          },
          {
            title: "Final Look",
            description: "This is view when you open map and already have all bosses defeated!",
            imageSrc: "osba28"
          },
        ]}>
      </ImageSection>
    </div>
  )
}

export { OneSlimeBlockAdventurePage }