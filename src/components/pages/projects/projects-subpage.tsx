import React from "react";
import { useParams } from "react-router-dom";
import { BetterBedrockPage } from "./project-id/better-bedrock";
import { MurderDetectorPage } from "./project-id/murder-detector";
import { OneBlockSlimeBlockAdventurePage } from "./project-id/one-block-slime-block-adventure";
import { RaSurvivalPage } from "./project-id/ra-survival";
import { ShopUIPage } from "./project-id/shop-ui";
import { HometreeUIPage } from "./project-id/hometree-ui";
import { SimpleUIPage } from "./project-id/simple-ui";
import { ScreenContainer } from "../../common/layout/screen-container";
import { NotFound } from "../not-found/not-found";

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
    ra_survival: <RaSurvivalPage />,
  };

  if (!projectId || !projectLayouts[projectId]) {
    return (
      <NotFound />
    )
  }


  return (
    <ScreenContainer documentTitle={`AxmBro | ${title}`}>
      {projectLayouts[projectId]}
    </ScreenContainer>
  );
}

export { ProjectsSubPage };