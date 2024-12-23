import React from "react";
import { useParams } from "react-router-dom";
import { ScreenSection } from "../components/ScreenSection.tsx";
import { BetterBedrockPage } from "./projects_pages/better_bedrock_page.tsx";
import { MurderDetectorPage } from "./projects_pages/murder_detector_page.tsx";
import { OneBlockSlimeBlockAdventurePage } from "./projects_pages/one_block_slime_block_adventure_page.tsx";

function ProjectsSubPage() {
  const { projectId } = useParams();

  const projectLayouts = {
    better_bedrock: <BetterBedrockPage />,
    murder_detector: <MurderDetectorPage />,
    one_block_slime_block_adventure_page: <OneBlockSlimeBlockAdventurePage />,
  };

  if (!projectId || !projectLayouts[projectId]) {
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