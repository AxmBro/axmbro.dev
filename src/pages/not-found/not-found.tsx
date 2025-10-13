import { ScreenSection } from "../../components/layout/screen-section";
import { ScreenContainer } from "../../components/layout/screen-container";
import { Button } from "../../components/button/button";
import { RouterLink } from "../../components/router-link/rouer-link";

const NotFound = () => {
  return (
    <ScreenContainer
      documentTitle="AxmBro | Not found">

      <ScreenSection
        id="notFound"
        noBorder={true}
        title="Not found!"
        description1="Seems like this path is not correct.">
        <RouterLink
          to="/">
          <Button text="Back to Home" buttonColor={"blue"}></Button>
        </RouterLink>
      </ScreenSection>

    </ScreenContainer>
  );
};

export { NotFound };