import React from "react";
import { useParams } from "react-router-dom";
import { ScreenSection } from "../components/ScreenSection";
import { BetterBedrockPage } from "./projects_pages/better_bedrock_page";
import { MurderDetectorPage } from "./projects_pages/murder_detector_page";
import { OneBlockSlimeBlockAdventurePage } from "./projects_pages/one_block_slime_block_adventure_page";
import { ShopUIpage } from "./projects_pages/shop_ui_page";

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
    shop_ui: <ShopUIpage openHomeRouteByContactButton={openHomeRouteByContactButton} setOpenHomeRouteByContactButton={setOpenHomeRouteByContactButton} />,
  };

  if (!projectId || !projectLayouts[projectId as string]) {
    return <Error404 />;
  }

  return (
    <div>
      {projectLayouts[projectId]}
    </div>
  );
}

function Error404() {
  return (
    <div className="projects screenContainer">
      <div className="screenContent">
        <ScreenSection
          title="Project not found"
          description1="..."
        ></ScreenSection>
      </div>
    </div>
  )
}

export default ProjectsSubPage;