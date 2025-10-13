import { ScreenSection } from "../../../components/layout/screen-section";
import { ImageSection } from "../../../components/global/projects-pages-global";
import { Button } from "../../../components/button/button";
import { RouterLink } from "../../../components/router-link/rouer-link";

const ShopUIPage = () => {
  return (
    <div className="projects_pages">
      <ScreenSection
        title="Shop UI"
        description1="Great looking and vanilla styled UI fully designed and created by me. Previously I used this for experimenting, but sold to interested customer."
        children={
          <div className="ScreenSectionButtons">
            <RouterLink
              to="/contact">
              <Button text="Contact" buttonColor={"default"}></Button>
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
      <ImageSection
        noBorder={true}
        title={"In-game Screnshots"}
        sectionDescription={"Here is a list of in-game screenshots with short description!"}
        items={[
          {
            title: "General Appearance",
            description: "UI is in vanilla style with many extra buttons on top. Main section is filled with scrollable grid buttons.",
            imageSrc: "shop_form1"
          },
          {
            title: "Tabs in Vanilla Style",
            description: "Very informative image based tabs with extra on-hover text. When clicked new form is reloaded.",
            imageSrc: "shop_form6"
          },
          {
            title: "Button Hover Text",
            description: "There is option for extra on-hover text on button.",
            imageSrc: "shop_form2"
          },
          {
            title: "Extra Discount Texts",
            description: "Another extra option to discount current value to new with additional information in percentages.",
            imageSrc: "shop_form3"
          },
          {
            title: "Search Bar Feature",
            description: "User can always select this tab and open 'Search Mode' where you are able to search through all given buttons.",
            imageSrc: "shop_form7"
          },
          {
            title: "Look in Search Mode",
            description: "Appearance is slightly different, it's in list style, because grid style doesn't allow to dynamically list elements.",
            imageSrc: "shop_form4"
          },
          {
            title: "Example Search Result",
            description: "Search bar is really case sensitive and text you write is filtered by even big or small letters. For these more curious, it's client side live result.",
            imageSrc: "shop_form5"
          },
        ]}>
      </ImageSection>
    </div>
  )
}

export { ShopUIPage }