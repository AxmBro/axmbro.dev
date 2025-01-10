import { ScreenSection } from "../../components/layout/screen_section";
import { ScreenContainer } from "../../components/layout/screen_container";
import { Button, ButtonColor } from "../../components/button/button";
import { RouteLink } from "../../components/link/route_link";

const NotFound = () => {
  document.title = "AxmBro | Not found"
  return (
    <ScreenContainer>

      <ScreenSection
        id="notFound"
        style={{ padding: "1rem 0 2rem 0", border: 0 }}
        title="Not found!"
        description1="Seems like this path is not correct.">
        <RouteLink
          useChildrenInsteadOfText={true}
          to="/">
          <Button text="Back to Home" buttonColor={ButtonColor.blue}></Button>
        </RouteLink>
      </ScreenSection>

    </ScreenContainer>
  );
};

export { NotFound };