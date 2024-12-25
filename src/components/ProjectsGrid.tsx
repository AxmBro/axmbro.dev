import React from "react";
import "./ProjectsGrid.css";
import { useNavigate } from "react-router-dom";
import { Button, ButtonColor } from "./Button";

interface ProjectItem {
  title: string;
  description: string;
  tags?: string[];
  imgSrc?: string;
  logoSrc?: string;
  star?: boolean;
  downloadLink?: string;
  url?: string;
}

interface ProjectsGridProps {
  items: ProjectItem[];
  children?: React.ReactNode;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleProjectClick = (project: ProjectItem) => {
    if (!project.url) {
      return;
    }
    navigate(`/projects/${project.url}`);
  };

  const handleDownloadButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="ProjectsGrid">
      {items.map((item, index) => {
        const imageSrc = item.imgSrc ? require(`../assets/${item.imgSrc}.png`) : null;
        const imageAlt = item.imgSrc || "";

        return (
          <div
            key={`ProjectsGridKey${index}`}
            className="ProjectsGridItem"
            onClick={() => handleProjectClick(item)}
            style={{ cursor: item.url ? "pointer" : undefined }}
          >
            {item.star && (
              <div className="StarContainer">
                <img className="Star" src={require("../assets/star.png")} alt="starImg" />
              </div>
            )}
            {item.imgSrc && (
              <div className="ImageWrapper">
                <img src={imageSrc} alt={imageAlt} className="Image" />
              </div>
            )}
            <div className="Container">
              <div className="Texts">
                <div className="TitleContainer">
                  <div className="TitleAndLogoContainer">
                    {item.logoSrc && (
                      <img
                        src={require(`../assets/${item.logoSrc}.png`)}
                        alt={item.logoSrc}
                      />
                    )}
                    <h1
                      className={item.url ? "TitleUrl" : "Title"}
                    >
                      {item.title}
                    </h1>
                  </div>
                  {item.downloadLink && (
                    <div className="DownloadContainer">
                      <a
                        onClick={handleDownloadButtonClick}
                        href={item.downloadLink}
                        className="Button DownloadButton"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Button buttonColor={ButtonColor.default} text="Download" />
                      </a>
                    </div>
                  )}
                </div>
                <h2 className="Description">{item.description}</h2>
              </div>
              {item.tags && (
                <div className="TagsContainer">
                  {item.tags.map((tag, index) => (
                    <h2 key={`TagKey${index}`} className="Tag">
                      {tag}
                    </h2>
                  ))}
                </div>
              )}
            </div>
            {item.downloadLink && (
              <div className="DownloadButtonMobile" style={{ marginTop: "1rem" }}>
                <a
                  onClick={handleDownloadButtonClick}
                  href={item.downloadLink}
                  className="Button DownloadButton"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Button buttonColor={ButtonColor.default} text="Download" />
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { ProjectsGrid };