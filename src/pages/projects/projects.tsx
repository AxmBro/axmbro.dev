import React, { useEffect, useState } from "react";
import { ScreenSection } from "../../components/layout/screen_section";
import { Button, ButtonColor } from "../../components/button/button";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./projects.module.css"
import { ScreenContainer } from "../../components/layout/screen_container";
import { PROJECTS } from "../../components/global/constants";
import { RouteLink } from "../../components/link/route_link";

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

function Projects() {
  const location = useLocation();
  const initialSearch = location.state?.search || "";
  const [search, setSearch] = useState(initialSearch);
  const [hideTags, setHideTags] = useState(() => {
    try {
      const savedLocalValue = localStorage.getItem("hideTags");
      return savedLocalValue ? JSON.parse(savedLocalValue) : false;
    } catch (error) {
      console.log(error)
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("hideTags", JSON.stringify(hideTags));
  }, [hideTags]);

  let items: ProjectItem[] = PROJECTS

  const projectsLength = items.length;

  items = items.filter(item => {
    return item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      (item.tags && item.tags.join(" ").toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <ScreenContainer>
      <ScreenSection
        style={{ padding: "1rem 0 0 0", border: 0 }}
        title={`Projects: ${projectsLength}`}
        description1="Here is a list of all the projects I've been involved in! Most of them include videos and screenshots for a closer look at my work. Each project shows the skills and techniques I've learned over time.">
        <>
          <SearchbarGrid search={search} setSearch={setSearch} />
          <div className={styles.searchbarButtonsContainer}>
            <Button
              onClick={() => setHideTags(!hideTags)}
              text={hideTags ? "Show Tags" : "Hide Tags"}
              buttonColor={ButtonColor.blue} />
          </div>
        </>
      </ScreenSection>
      {(items.length > 0) &&
        <ScreenSection
          style={{ borderBottom: 0 }}>
          <ProjectsGrid
            hideTags={!hideTags}
            items={items} />
        </ScreenSection>}
      {(items.length === 0) && (
        <h2 style={{ marginTop: "2rem" }}>{`There are no results for: ${search}`}</h2>
      )}
    </ScreenContainer>
  );
}

interface ProjectsGridProps {
  items: ProjectItem[];
  hideTags?: boolean;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ items, hideTags }) => {
  const navigate = useNavigate();

  const handleProjectClick = (project: ProjectItem) => {
    if (!project.url) {
      return;
    }
    navigate(`/projects/${project.url}`);
  };

  return (
    <div className={styles.ProjectsGrid}>
      {items.map((item) => {
        const imageSrc = item.imgSrc ? require(`../../assets/${item.imgSrc}.png`) : null;
        const logoImageSrc = item.logoSrc ? require(`../../assets/${item.logoSrc}.png`) : null;
        const imageAlt = item.imgSrc || "";

        return (
          <div
            key={`item${item.title}`}
            className={styles.ProjectsGridItem}
          >
            {item.star && (
              <div className={styles.StarContainer}>
                <img className={styles.Star} src={require("../../assets/star.png")} alt="starImg" />
              </div>
            )}
            {item.imgSrc && (
              <div onClick={() => handleProjectClick(item)}
                className={item.url ? `${styles.ImageWrapperUrl}` : `${styles.ImageWrapper}`}>
                <img src={imageSrc} alt={imageAlt} className={styles.Image} />
              </div>
            )}
            <div className={styles.Container}>
              <div>
                <div className={styles.TitleAndLogoContainer}>
                  {item.logoSrc && (
                    <img
                      src={logoImageSrc}
                      alt={item.logoSrc}
                    />
                  )}
                  <h1
                    onClick={() => handleProjectClick(item)}
                    className={item.url ? `${styles.TitleUrl}` : `${styles.Title}`}
                    style={{ cursor: item.url ? "pointer" : undefined }}
                  >
                    {item.title}
                  </h1>
                </div>
                <h2 className={styles.Description}>{item.description}</h2>
                {(item.tags && hideTags) && (
                  <div className={styles.TagsContainer}>
                    {item.tags.map((tag) => (
                      <h2 key={`TagKey${tag}`} className={styles.Tag}>
                        {tag}
                      </h2>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.navButtonsContainer}>
                {item.url && (<RouteLink
                  to={item.url!}
                  useChildrenInsteadOfText={true}>
                  <Button buttonColor={ButtonColor.blue} text="See showcase" />
                </RouteLink>)}
                {item.downloadLink && (<RouteLink
                  to={item.url!}
                  useChildrenInsteadOfText={true}>
                  <Button buttonColor={ButtonColor.default} text="Download" />
                </RouteLink>)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface SearchbarGridProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchbarGrid: React.FC<SearchbarGridProps> = ({ search, setSearch }) => {
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setSearch(target.value);
  }

  const texts = ["Title", "Description", "Tags"];

  useEffect(() => {
    let currentIndex = 1;

    setAnimatedPlaceholder(texts[0]);
    const intervalId = setInterval(() => {
      setAnimatedPlaceholder(texts[currentIndex]);
      currentIndex = (currentIndex + 1) % texts.length;
    }, 5000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.searchBarWrapper}>
      <input type="text" className={styles.searchBar} placeholder={`Search by: ${animatedPlaceholder}`} value={search} onChange={handleChangeInput} />
      {search && (<div onClick={() => setSearch("")}>
        <Button style={{ width: "3rem", minWidth: "0" }} text="X" buttonColor={ButtonColor.defaultEmpty2}></Button>
      </div>)}
    </div>
  )
}

export { Projects };
