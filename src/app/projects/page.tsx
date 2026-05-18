import { Metadata } from "next";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection } from "@/shared/ui/screen-section";
import { PROJECTS, PORTFOLIO_TEXTS } from "@/shared/constants/data";
import { ProjectsPageClient } from "./projects-page-client";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse AxmBro's portfolio of projects including Minecraft Bedrock UI mods, web development, and more.",
  openGraph: {
    title: "AxmBro | Projects",
    description: "Browse AxmBro's portfolio of projects including Minecraft Bedrock UI mods, web development, and more.",
    images: ["/images/ui/logo192.png"],
  },
};

export default function ProjectsPage() {
  return (
    <ScreenContainer>
      <ScreenSection
        title="Projects"
        titleDescription={PORTFOLIO_TEXTS.projectsPage.description(PROJECTS.length)}
        withChildrenPadding={false}
      >
        <ProjectsPageClient />
      </ScreenSection>
    </ScreenContainer>
  );
}
