import React from "react";
import { useParams } from "react-router-dom";
import { ScreenSection } from "../../components/layout/screen_section";
import { BetterBedrockPage } from "./project_id/better_bedrock_page";
import { MurderDetectorPage } from "./project_id/murder_detector_page";
import { OneBlockSlimeBlockAdventurePage } from "./project_id/one_block_slime_block_adventure_page";
import { ShopUIPage } from "./project_id/shop_ui_page";
import { HometreeUIPage } from "./project_id/hometree_ui_page";
import { SimpleUIPage } from "./project_id/simple_ui_page";
import { ScreenContainer } from "../../components/layout/screen_container";

const ProjectsSubPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  document.title = `AxmBro | Projects | ${projectId}`

  const projectLayouts: { [key: string]: JSX.Element } = {
    better_bedrock: <BetterBedrockPage />,
    murder_detector: <MurderDetectorPage />,
    one_block_slime_block_adventure_page: <OneBlockSlimeBlockAdventurePage />,
    shop_ui: <ShopUIPage />,
    hometree_ui: <HometreeUIPage />,
    simple_ui: <SimpleUIPage />,
  };

  if (!projectId || !projectLayouts[projectId]) {
    return (
      <ScreenContainer>
        <ScreenSection
          title="Project not found"
          description1="The project you are looking for does not exist. Please check the URL and try again."
        ></ScreenSection>
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer>
      {projectLayouts[projectId]}
    </ScreenContainer>
  );
}

export { ProjectsSubPage };