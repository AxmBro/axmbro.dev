import { useParams } from "react-router-dom";
import { BetterBedrockPage } from "./project-id/better-bedrock";
import { MurderDetectorPage } from "./project-id/murder-detector";
import { OneSlimeBlockAdventurePage } from "./project-id/one-slime-block-adventure";
import { RaSurvivalPage } from "./project-id/ra-survival";
import { ShopUIPage } from "./project-id/shop-ui";
import { HometreeUIPage } from "./project-id/hometree-ui";
import { SimpleUIPage } from "./project-id/simple-ui";
import { NotFound } from "../not-found/not-found";
import { SynergyUIPage } from "./project-id/synergy-ui";
import { BedrockPortalUIPage } from "./project-id/bedrock-portal-ui";
import { OSUIPage } from "./project-id/os-ui";
import { RedUIPage } from "./project-id/red-ui";
import { ScreenContainer } from "../../components/layout/screen-container";

const ProjectsSubPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const title = projectId!.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  const projectLayouts: { [key: string]: JSX.Element } = {
    better_bedrock: <BetterBedrockPage />,
    murder_detector: <MurderDetectorPage />,
    one_slime_block_adventure: <OneSlimeBlockAdventurePage />,
    shop_ui: <ShopUIPage />,
    hometree_ui: <HometreeUIPage />,
    simple_ui: <SimpleUIPage />,
    ra_survival: <RaSurvivalPage />,
    synergy_ui: <SynergyUIPage />,
    bedrock_portal_ui: <BedrockPortalUIPage />,
    os_ui: <OSUIPage />,
    red_ui: <RedUIPage />,
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