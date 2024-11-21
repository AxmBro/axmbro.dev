import React from "react";
import "./Projects.css";
import "./Screen.css";
import { ScreenSection } from "../components/ScreenSection.tsx";
import starImg from "../assets/star.png"
import "../components/Button.css";

function Projects() {
  return (
    <div className="projects screenContainer">
      <div className="screenContent">
      <ScreenSection
        style={{ padding: "1rem 0 0 0", border: "none" }}
        title="Projects"
        description1="Here is a list of all the projects I've worked on or contributed to! Most of them are detailed with videos and screenshots for a closer look at my work."
        children={
          <>
            <ProjectsGrid
              items={[
                {
                  title: "Better Bedrock",
                  description: "The Better Bedrock is project of Texture Pack for MCBE Edition, Website and Mobile App available only for Android. The Main goal is to improve the default Minecraft gameplay to a whole new level with many new features!",
                  tags: ["JSON", "MCBE JsonUI", "Flutter", "Supabase", "Windows API"],
                  imgScr: "bbReleaseThumbnail",
                  logoSrc: "bbLogo",
                  star: true,
                  downloadLink: "https://betterbedrock.com/#/downloads"
                },
                {
                  title: "Murder Detector - Texture Pack",
                  description: "Simple let us say... shhhh... CHEAT by just Texture Pack. Models system provided by MCBE allows to check what item player is holding, or with additional info, held. Using this user is able to see which person is murderer or sheriff by icon above head or optionally by extra xray!",
                  tags: ["JSON", "MCBE Models"],
                  imgScr: "murderDetector1",
                  logoSrc: "mdLogo",
                  star: true,
                  downloadLink: "https://betterbedrock.com/#/downloads"
                },
                {
                  title: "Shop UI - Server Form",
                  description: "Custom server form UI created for personal use, but also to test custom tabs in vanilla style, many texts in each button and search feature!",
                  tags: ["JSON", "MCBE JsonUI"],
                  imgScr: "shop_form1"
                },
                {
                  title: "Hometree UI - Server Form",
                  description: "Custom server form UI created for customer. It's pretty colorful and simple grid UI used in gamemodes selector and extra information form!",
                  tags: ["JSON", "MCBE JsonUI"],
                  imgScr: "hometree1"
                },
                {
                  title: "Simple UI - Server Form",
                  description: "Custom server form UI created for personal use, but also to test custom buttons layout!",
                  tags: ["JSON", "MCBE JsonUI"],
                  imgScr: "simple_server_form1"
                },
                {
                  title: "This Website",
                  description: "TODO",
                  tags: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
                  imgScr: "thisweb"
                },
                {
                  title: "One Block Slime Block Adventure - HUD, Server Form",
                  description: "TODO",
                  tags: ["JSON", "MCBE JsonUI"],
                  imgScr: "obsba",
                  star: true,
                  downloadLink: "https://www.mushco.games/games"
                }
              ]}>

            </ProjectsGrid>
          </>
        }
      ></ScreenSection>
      </div>
    </div>
  );
}

interface ProjectsGridProps {
  items: { title: string, description: string, tags?: string[], imgScr?: string, logoSrc?: string, star?: boolean, downloadLink?: string }[]
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ items }) => {

  return <div className="ProjectsGrid">
    {items.map((item, index) => {

      const imageSrc = item.imgScr ? require(`../assets/${item.imgScr}.png`) : null;
      const imageAlt = item.imgScr ? item.imgScr : "";

      const renderStar = item.star ? (
        <div className="StarContainer">
          <img className="Star" src={starImg} alt="starImg"></img>
        </div>
      ) : null;

      const renderLogo = item.logoSrc ? (
        <img src={require(`../assets/${item.logoSrc}.png`)} alt={item.logoSrc}></img>
      ) : null

      const renderTags = item.tags ? (
        <div className="TagsContainer">
          {
            item.tags.map((tag, index) => {
              return <h2 key={`TagKey${index}`} className="Tag">{tag}</h2>
            })
          }
        </div>) : null

      const renderDownloadButton = item.downloadLink ? (
        <div className="DownloadContainer">
          <a href={item.downloadLink} className="Button DownloadButton" rel="noopener noreferrer" target="_blank">Download
            <img className="OpenInNew" src={require("../assets/arrow_outward_24dp_FFFFFF_FILL0_wght400_GRAD-25_opsz24.png")} alt="" />
          </a>
        </div>) : null

      return <div key={`ProjectsGridKey${index}`} className="ProjectsGridItem">
        {renderStar}
        <div className="ImageWrapper">
          <img src={imageSrc} alt={imageAlt} className="Image"></img>
        </div>
        <div className="Container">
          <div className="Texts">
            <div className="TitleContainer">
              <div className="TitleAndLogoContainer">
                {renderLogo}
                <h1 className="Title">{item.title}</h1>
              </div>
              {renderDownloadButton}
            </div>
            <h2 className="Description">{item.description}</h2>
          </div>
          {renderTags}
        </div>
      </div>
    })}
  </div>
}

export { Projects, ProjectsGrid };
