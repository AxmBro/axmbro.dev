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

interface ProjectsSubPageProps {
  openHomeRouteByContactButton: boolean;
  setOpenHomeRouteByContactButton: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProjectsSubPage({ openHomeRouteByContactButton, setOpenHomeRouteByContactButton }: ProjectsSubPageProps) {
  const { projectId } = useParams();

  const projectLayouts: { [key: string]: JSX.Element } = {
    better_bedrock: <BetterBedrockPage />,
    murder_detector: <MurderDetectorPage />,
    one_block_slime_block_adventure_page: <OneBlockSlimeBlockAdventurePage />,
    shop_ui: <ShopUIPage openHomeRouteByContactButton={openHomeRouteByContactButton} setOpenHomeRouteByContactButton={setOpenHomeRouteByContactButton} />,
    hometree_ui: <HometreeUIPage />,
    simple_ui: <SimpleUIPage openHomeRouteByContactButton={openHomeRouteByContactButton} setOpenHomeRouteByContactButton={setOpenHomeRouteByContactButton} />,
  };

  if (!projectId || !projectLayouts[projectId as string]) {
    return <Error404 />;
  }

  return (
    <ScreenContainer>
      {projectLayouts[projectId]}
    </ScreenContainer>
  );
}

function Error404() {
  return (
    <ScreenContainer>
      <ScreenSection
        title="Project not found"
        description1="..."
      ></ScreenSection>
    </ScreenContainer>
  )
}

export default ProjectsSubPage;