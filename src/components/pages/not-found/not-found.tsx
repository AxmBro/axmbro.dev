import { ScreenSection } from "../../common/layout/screen-section";
import { ScreenContainer } from "../../common/layout/screen-container";
import { Button, ButtonColor } from "../../common/button/button";
import { RouteLink } from "../../common/link/route-link";

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