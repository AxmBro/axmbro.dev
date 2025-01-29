import React from "react";
import { useParams } from "react-router-dom";
import { ScreenSection } from "../../components/layout/ScreenSection";
import { BetterBedrockPage } from "./project-id/BetterBedrock";
import { MurderDetectorPage } from "./project-id/MurderDetector";
import { OneBlockSlimeBlockAdventurePage } from "./project-id/OneBlockSlimeBlockAdventure";
import { ShopUIPage } from "./project-id/ShopUi";
import { HometreeUIPage } from "./project-id/HometreeUi";
import { SimpleUIPage } from "./project-id/SimpleUi";
import { ScreenContainer } from "../../components/layout/ScreenContainer";

const ProjectsSubPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  const title = projectId!.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

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
      <ScreenContainer
        documentTitle="AxmBro | Project not found">
        <ScreenSection
          title="Project not found"
          description1="The project you are looking for does not exist. Please check the URL and try again."
        ></ScreenSection>
      </ScreenContainer>
    )
  }


  return (
    <ScreenContainer documentTitle={`AxmBro | ${title}`}>
      {projectLayouts[projectId]}
    </ScreenContainer>
  );
}

export { ProjectsSubPage };