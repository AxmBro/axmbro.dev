import { ScreenSection } from "../../components/layout/ScreenSection";
import { ScreenContainer } from "../../components/layout/ScreenContainer";
import { Button, ButtonColor } from "../../components/button/Button";
import { RouteLink } from "../../components/link/RouteLink";

const NotFound = () => {
  document.title = "AxmBro | Not found"
  return (
    <ScreenContainer>

      <ScreenSection
        id="notFound"
        singleParagraph={true}
        title="Not found!"
        description1="Seems like this path is not correct.">
        <RouteLink
          to="/">
          <Button text="Back to Home" buttonColor={ButtonColor.blue}></Button>
        </RouteLink>
      </ScreenSection>

    </ScreenContainer>
  );
};

export { NotFound };