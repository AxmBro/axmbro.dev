import { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { PROJECTS, HOME_PAGE_TEXTS } from "@/shared/constants/data";
import { ProjectsBoard } from "@/widgets/projects-board";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio of AxmBro - custom Minecraft Bedrock interfaces (JsonUI) for marketplace studios, commissioned HUDs and server forms, and web development projects.",
  openGraph: {
    title: "AxmBro | Projects",
    description:
      "Portfolio of AxmBro - custom Minecraft Bedrock interfaces (JsonUI) for marketplace studios, commissioned HUDs and server forms, and web development projects.",
    images: ["/icon.png"],
  },
};

export default function ProjectsPage() {
  return (
    <ScreenContainer>
      <ScreenSection
        title="Projects"
        headingLevel="h1"
        titleDescription={HOME_PAGE_TEXTS.projectsPage.description(PROJECTS.length)}
        withChildrenPadding={false}
      >
        <ProjectsBoard />
      </ScreenSection>
    </ScreenContainer>
  );
}
