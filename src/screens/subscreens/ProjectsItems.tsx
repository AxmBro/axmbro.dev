import React from "react";
import { useParams } from "react-router-dom";
import { ScreenSection } from "../../components/ScreenSection.tsx";

function ProjectsItems() {
  const { projectId } = useParams();

  const projectLayouts = {
    better_bedrock: <BetterBedrockLayout />,
    murder_detector: <MurderDetectorLayout />,
  };

  if (!projectId || !projectLayouts[projectId]) {
    return <div>Project not found</div>;
  }

  const layout = projectLayouts[projectId];

  return (
    <div>
      {layout}
    </div>
  );
}

function BetterBedrockLayout() {
  return (
    <div className="projects screenContainer">
      <div className="screenContent">
        <ScreenSection
          style={{ padding: "1rem 0 0 0", border: "none" }}
          title="Better Bedrock"
          description1="todo"
        ></ScreenSection>
        <ScreenSection
          title="Example desc"
          description1="todo"
        ></ScreenSection>
      </div>
    </div>
  )
}

function MurderDetectorLayout() {
  return (
    <div className="projects screenContainer">
      <div className="screenContent">
        <ScreenSection
          style={{ padding: "1rem 0 0 0", border: "none" }}
          title="Murder Detector"
          description1="todo"
        ></ScreenSection>
        <ScreenSection
          title="Example desc"
          description1="todo"
        ></ScreenSection>
      </div>
    </div>
  )
}

export default ProjectsItems;