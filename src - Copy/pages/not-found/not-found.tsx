import { ScreenSection } from "../../components/layout/screen-section";
import { ScreenContainer } from "../../components/layout/screen-container";
import { Button, ButtonColor } from "../../components/button/button";
import { RouteLink } from "../../components/link/route-link";

const NotFound = () => {
  return (
    <ScreenContainer
      documentTitle="AxmBro | Not found">

      <ScreenSection
        id="notFound"
        noBorder={true}
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