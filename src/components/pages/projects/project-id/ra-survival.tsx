import { ScreenSection } from "../../../common/layout/screen-section";
import { Button, ButtonColor } from "../../../common/button/button";
import { Link } from "../../../common/link/link";
import { ImageSection } from "../../../common/global/projects-pages-global";

function RaSurvivalPage() {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Ra Survival"
        noChildrenPadding={true}>
        <p style={{paddingBottom: "1rem"}}>Is minecraft map for Bedrock Edition created by Radium and inspired by Call of Duty Zombie mode. I was hired to implement UI for this map, which includes various elements such as hotbars, gun display, rounds, power-ups, perks, crosshair notifications and more. All of these elements have custom animations and are designed to enhance the gameplay experience.</p>
        <p style={{paddingBottom: "1rem"}}>My part here was to just add this entire logic. I didn't created any textures, but used provided and made them work with JsonUI system. It was a great experience to work with Dan and create something that big and complex! I learned a lot of new things related to 'backend' of such custom map, new tool regolith and better view over all important elements and problems that can occur in such big project!</p>
        <p style={{paddingBottom: "1.5rem"}}>Generally this project is still in development and textures, icons, design and everything may be changed or slightly adjusted. Currently it's finished progress as of today - 01.07.2025</p>
        <div>
          <div className="ScreenSectionButtons">
            <Button buttonColor={ButtonColor.blue}>
              <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Radium YT channel" href="https://www.youtube.com/@Radium-Ra-88"></Link>
            </Button>
            <Button buttonColor={ButtonColor.default}>
              <Link useUnderline={false} useButtonFontHeight={true} textColor="var(--web-bg-color-1)" text="Recent UI Changelog Video" href="https://youtu.be/3J2euXkkqL0"></Link>
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
                Main creator:{" "}
                <Link href="https://github.com/DirtyDan-555" text="Radium" ></Link>
              </li>
            </ul>
          </div>
        }
      ></ScreenSection>
      <ScreenSection
        title="Everything In Action"
        description1="Take a look at this development video, which shows in details all elements created by me. Pay attention to all animations - something very rare to see in such complex projects!"
        children={
          // todo
          <div className="iframe-container">
            <iframe src="https://www.youtube.com/embed/VT4UAmooF2E" title="Ra Survival - UI showcase" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        }
      ></ScreenSection>
      <ImageSection
        noBorder={true}
        title={"In-game Screnshots"}
        sectionDescription={"Here is a list of in-game screenshots with short description! There were already some elements, so here is only list that I created and added to this map."}
        items={[
          {
            title: "Hotbars",
            description: "Classic vanilla layout has been changed to 3 sections.",
            imageSrc: "ra2"
          },
          {
            title: "Closer look at hotbars",
            description: "With in-game items it gets more interesting! Even more when there is function to lock slot based on item inside. It's still selectable however doesn't show selected texture and is slightly less visible.",
            imageSrc: "ra1"
          },
          {
            title: "Opacity function in hotbars",
            description: "When player has special items in slot, they are less visible and selected texture is not visible at all - to indicate that player has no access to this slot.",
            imageSrc: "ra17"
          },
          {
            title: "Special Round Animation",
            description: "Is played when player starts game.",
            imageSrc: "ra18"
          },
          {
            title: "Ending of special round animation",
            description: "Generally it has that transition, however I recommend to check development video to see this whole animation!",
            imageSrc: "ra19"
          },
          {
            title: "Rounds element",
            description: "Is in bottom left corner. It shows current round number and has fancy change animation when switching rounds - to match three bell sounds, it flashes and changes color to dark red.",
            imageSrc: "ra6"
          },
          {
            title: "Closer look at rounds element",
            description: "It has option to display rounds in either roman numbers and normal numbers.",
            imageSrc: "ra7"
          },
          // todo: add video "Special round animation"
          {
            title: "Gun display",
            description: "Is in bottom right corner. It shows current gun icon, name and ammo. It has fancy slide animation when switching guns.",
            imageSrc: "ra3"
          },
          {
            title: "Closer look at gun display",
            description: "When ammo is low, color is changed to light red.",
            imageSrc: "ra4"
          },
          {
            title: "Low ammo indicator",
            description: "When ammo is really low, color is changed to dark red and text appears under crosshair. Also with subtle entry animation!",
            imageSrc: "ra5"
          },
          // todo: add video "All Gun and Ammo elements in action"
          {
            title: "Power-Ups",
            description: "It's anoter UI part above hotbars. If player colects any power-up, then there are entry and exit animations on UI.",
            imageSrc: "ra9"
          },
          {
            title: "All Power-Ups",
            description: "If player has more power-ups at the same time, they expand to fit everything in middle, of course with entry and exit animation!",
            imageSrc: "ra8"
          },
          // todo: add video "Power-Up animations in action"
          {
            title: "Perks",
            description: "Positioned in bottom left corner above rounds element, used to indicate that player has certain buffs.",
            imageSrc: "ra10"
          },
          {
            title: "Closer look at perks",
            description: "All these icons have custom entry, exit and close animations. They are always sticked to left side as well.",
            imageSrc: "ra11"
          },
          // todo: add video "Perks animations in action"
          {
            title: "Crosshair notifications",
            description: "Extra element for quick message to user.",
            imageSrc: "ra12"
          },
          {
            title: "Closer look at crosshair notifications",
            description: "These messages have either entry and exit animations and can be stacked up to 4 lines.",
            imageSrc: "ra13"
          },
          {
            title: "Doubled Hurt Flash",
            description: "If player health is really low, overlay transparency is doubled. Of course both have entry and exit animations.",
            imageSrc: "ra15"
          },
          {
            title: "Hurt Flash",
            description: "Whenever player receives damage and their health is not low, slightly red overlay appears.",
            imageSrc: "ra14"
          },
          {
            title: "Electric Flash",
            description: "Is visible when player walks through electric trap, blue overlay appears with entry animation and disappears smoothly as well.",
            imageSrc: "ra16"
          },
          {
            title: "UI visiblity (technical)",
            description: "There is completely special and custom function that allows to toggle HUD visiblity by commands.",
            imageSrc: "ra20"
          },
          {
            title: "Custom Crosshair visiblity (technical)",
            description: "Same as UI visibility, but for crosshair. Sometimes there is need to just hide this element and so there it is!",
            imageSrc: "ra21"
          },
        ]}>
      </ImageSection>
    </div>
  )
}

export { RaSurvivalPage }