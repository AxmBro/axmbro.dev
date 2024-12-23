import React from "react";
import "./ProjectsGrid.css";
import { useNavigate } from "react-router-dom";
import starImg from "../assets/star.png"

interface ProjectsGridProps {
  items: { title: string, description: string, tags?: string[], imgSrc?: string, logoSrc?: string, star?: boolean, downloadLink?: string, url?: string }[]
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleProjectClick = (object) => {
    if (!object.url) {
      return
    }
    navigate(`/projects/${object.url}`);
  };

  const handleClickDownloadButton = (e) => {
    e.stopPropagation()
  }

  return <div className="ProjectsGrid">
    {items.map((item, index) => {

      const imageSrc = item.imgSrc ? require(`../assets/${item.imgSrc}.png`) : null;
      const imageAlt = item.imgSrc ? item.imgSrc : "";

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
        <a onClick={handleClickDownloadButton} href={item.downloadLink} className="Button DownloadButton" rel="noopener noreferrer" target="_blank">Download</a>) : null

      return <div key={`ProjectsGridKey${index}`} className="ProjectsGridItem" onClick={() => { handleProjectClick(item) }} style={{ cursor: item.url ? "pointer" : undefined }}>
        {renderStar}
        <div className="ImageWrapper">
          <img src={imageSrc} alt={imageAlt} className="Image"></img>
        </div>
        <div className="Container">
          <div className="Texts">
            <div className="TitleContainer">
              <div className="TitleAndLogoContainer">
                {renderLogo}
                <h1 className="Title" style={{ color: !item.url ? "var(--primary-text-color)" : undefined }}>{item.title}</h1>
              </div>
              <div className="DownloadContainer">
                {renderDownloadButton}
              </div>
            </div>
            <h2 className="Description">{item.description}</h2>
          </div>
          {renderTags}
        </div>
        <div className="DownloadButtonMobile" style={{ marginTop: renderDownloadButton ? "1rem" : 0 }}>
          {renderDownloadButton}
        </div>
      </div>
    })}
  </div>
}

export { ProjectsGrid };