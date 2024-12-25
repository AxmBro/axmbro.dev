import React from "react";
import { ScreenSection } from "../components/ScreenSection";
import { ProjectsGrid } from "../components/ProjectsGrid";

function Projects() {
  return (
    <div className="projects screenContainer">
      <div className="screenContent">
        <ScreenSection
          style={{ padding: "1rem 0 2rem 0" }}
          title="Projects"
          description1="Here is a list of all the projects I've worked on or contributed to! Most of them are detailed with videos and screenshots for a closer look at my work."
          children={
            <>
              <ProjectsGrid
                items={[
                  {
                    title: "Better Bedrock",
                    description: "The Better Bedrock is project of Texture Pack for MCBE Edition, Website and Mobile App available only for Android. The Main goal is to improve the default Minecraft gameplay to a whole new level with many new features!",
                    tags: [ "MCBE JsonUI", "React", "Flutter", "Supabase", "Windows API", "Android API"],
                    imgSrc: "bbReleaseThumbnail",
                    logoSrc: "bbLogo",
                    star: true,
                    downloadLink: "https://betterbedrock.com/#/downloads",
                    url: "better_bedrock"
                  },
                  {
                    title: "Murder Detector",
                    description: "Simple let us say... shhhh... CHEAT by just TEXTURE PACK. Models system provided by MCBE allows to check what item player is holding, or with additional info, held. Using this user is able to see which person is murderer or sheriff by icon above head or optionally by extra xray!",
                    tags: [ "MCBE JsonUI", "MCBE Models"],
                    imgSrc: "murderDetector1",
                    logoSrc: "mdLogo",
                    star: true,
                    downloadLink: "https://betterbedrock.com/#/downloads",
                    url: "murder_detector"
                  },
                  {
                    title: "One Block Slime Block Adventure",
                    description: "I was part of creating custom HUD elements with custom server from! This was the most advanced project I've worked on, it was a great experience to work with other developers and create something that big and complex!",
                    tags: [ "MCBE JsonUI", "MCBE Server Form"],
                    imgSrc: "obsba",
                    star: true,
                    downloadLink: "https://www.mushco.games/games",
                    url: "one_block_slime_block_adventure_page"
                  },
                  {
                    title: "Shop UI",
                    description: "CUSTOM SERVER FORM UI created for personal use, but also to test custom tabs in vanilla style, many texts in each button and search feature! General appearance and in-game UI was fully created by me.",
                    tags: [ "MCBE JsonUI", "MCBE Server Form"],
                    imgSrc: "shop_form1",
                    url: "shop_ui"
                  },
                  {
                    title: "Hometree UI",
                    description: "CUSTOM SERVER FORM UI created for customer. It's pretty colorful and simple grid UI used in gamemodes selector and extra information form! General appearance was designed by customer and slighly by me. In-game UI is fully created by me.",
                    tags: [ "MCBE JsonUI", "MCBE Server Form"],
                    imgSrc: "hometree1",
                    url: "hometree_ui"
                  },
                  {
                    title: "Simple UI",
                    description: "CUSTOM SERVER FORM UI created for personal use, but also to test custom buttons layout! General appearance and in-game UI was fully created by me.",
                    tags: [ "MCBE JsonUI", "MCBE Server Form"],
                    imgSrc: "simple_server_form1",
                    url: "simple_ui"
                  },
                  {
                    title: "This Website",
                    description: "Currently created by mainly using JS, TS and React. Simple website with needed info separated by routes. General style is minimalistic and it's in portfolio theme. Previously this website was created using only HTML, JS, CSS - it was pain when implementing routes manually...",
                    tags: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
                    imgSrc: "thisweb"
                  },
                ]}>

              </ProjectsGrid>
            </>
          }
        ></ScreenSection>
      </div>
    </div>
  );
}
export { Projects };
