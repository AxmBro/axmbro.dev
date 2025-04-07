import React, { useEffect, useState } from "react";
import { ScreenSection } from "../../common/layout/screen-section";
import { Button, ButtonColor } from "../../common/button/button";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./projects.module.css"
import { ScreenContainer } from "../../common/layout/screen-container";
import { PROJECTS } from "../../common/global/constants";
import { RouteLink } from "../../common/link/route-link";
import starImage from "../../../assets/star.png";
import global_styles from "../../common/global/global-styles.module.css";
import { Popover } from "../../common/popover/popover";
import settings_icon from "../../../assets/settings_icon.png";

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
  const [showOnlyPinned, setShowOnlyPinned] = useState(() => {
    try {
      const savedLocalValue = localStorage.getItem("showOnlyPinned");
      return savedLocalValue ? JSON.parse(savedLocalValue) : false;
    } catch (error) {
      console.log(error)
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("hideTags", JSON.stringify(hideTags));
  }, [hideTags]);

  useEffect(() => {
    localStorage.setItem("showOnlyPinned", JSON.stringify(showOnlyPinned));
  }, [showOnlyPinned]);

  let items: ProjectItem[] = PROJECTS

  const projectsLength = items.length;

  items = items.filter(item => {
    return item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      (item.tags && item.tags.join(" ").toLowerCase().includes(search.toLowerCase()));
  });

  const buttonsActions = [
    {
      ref: hideTags,
      text1: "Show tags",
      text2: "Hide tags",
      action: () => setHideTags(!hideTags)
    },
    {
      ref: showOnlyPinned,
      text1: "Show all",
      text2: "Show only pinned",
      action: () => setShowOnlyPinned(!showOnlyPinned)
    }
  ];

  return (
    <ScreenContainer
      documentTitle="AxmBro | Projects">
      <ScreenSection
        style={{ border: 0 }}
        title="Projects"
        titleClassName={global_styles.h1HeroText}
        noChildrenPadding={true}>
        <>
          <p style={{ marginBottom: "2rem" }}>Here is a list of {projectsLength} projects in total I've worked on! <b>Most of them include screenshots, videos, and explanations to give you a better look at my work</b>. Each project shows the skills I've learned and improved over time!</p>
          <SearchbarGrid search={search} setSearch={setSearch} buttonsActionsArray={buttonsActions} />
        </>
      </ScreenSection>
      {(items.length > 0) &&
        <ScreenSection
          style={{ borderBottom: 0, padding: "0.75rem 0 2rem 0" }}>
          <ProjectsGrid
            hideTags={!hideTags}
            showOnlyPinned={showOnlyPinned}
            items={items} />
        </ScreenSection>}
      {(items.length === 0) && (
        <h2 style={{ marginTop: "0.75rem" }}>{`There are no results for: ${search}`}</h2>
      )}
    </ScreenContainer>
  );
}

interface ProjectsGridProps {
  items: ProjectItem[];
  hideTags?: boolean;
  showOnlyPinned?: boolean;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ items, hideTags, showOnlyPinned }) => {
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
        const images = import.meta.glob('../../../assets/*.png', { eager: true });

        const imageSrc = item.imgSrc
          ? (images[`../../../assets/${item.imgSrc}.png`] as { default: string }).default
          : "";

        const logoImageSrc = item.logoSrc
          ? (images[`../../../assets/${item.logoSrc}.png`] as { default: string }).default
          : "";

        const imageAlt = item.imgSrc || "";

        return (showOnlyPinned && !item.star) ? null : (
          <div
            key={`item${item.title}`}
            className={styles.ProjectsGridItem}
          >
            {item.star && (
              <div className={styles.StarContainer}>
                <img className={styles.Star} src={starImage} alt="starImg" />
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
                    <div>
                      <img
                        src={logoImageSrc}
                        alt={item.logoSrc}
                      />
                    </div>
                  )}
                  <div>
                    <h2
                      onClick={() => handleProjectClick(item)}
                      className={item.url ? `${styles.TitleUrl}` : ""}
                      style={{ cursor: item.url ? "pointer" : "" }}>
                      {item.title}
                    </h2>
                  </div>
                </div>
                <p className={styles.Description}>{item.description}</p>
                {(item.tags && hideTags) && (
                  <div className={styles.TagsContainer}>
                    {item.tags.map((tag) => (
                      <p key={`TagKey${tag}`} className={styles.Tag}>
                        {tag}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.navButtonsContainer}>
                {item.url && (<RouteLink
                  to={item.url!}>
                  <Button buttonColor={ButtonColor.blue} text="Showcase" />
                </RouteLink>)}
                {item.downloadLink && (<RouteLink
                  to={item.url!}>
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
  buttonsActionsArray: { ref: boolean; text1: string; text2: string; action: () => void }[];
}

const SearchbarGrid: React.FC<SearchbarGridProps> = ({ search, setSearch, buttonsActionsArray }) => {
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [showPopover, setShowPopover] = useState(false); // State to manage popover visibility

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
  }, []);

  return (
    <div className={styles.searchBarWrapper}>
      <input type="text" className={global_styles.formInputText} placeholder={`Search by: ${animatedPlaceholder}`} value={search} onChange={handleChangeInput} />
      <div style={{ position: "relative" }}>
        <Button
          style={{ minWidth: "2.75rem", whiteSpace: "nowrap" }}
          // text="Options"
          buttonColor={ButtonColor.defaultEmpty2}
          onClick={() => setShowPopover(!showPopover)}>
            <img src={settings_icon} alt="settings_icon" style={{height: "1.25rem"}} />
            {/* <p>Options</p> */}
        </Button>
        {showPopover && (
          <Popover>
            {buttonsActionsArray.map((buttonAction, index) => {
              return (
                <Button
                  key={`buttonAction${index}`}
                  text={buttonAction.ref ? buttonAction.text1 : buttonAction.text2}
                  onClick={buttonAction.action}
                  buttonColor={index === 0 ? ButtonColor.blue : ButtonColor.default}
                />
              )
            })}
          </Popover>
        )}
      </div>
      {search && (<div onClick={() => setSearch("")}>
        <Button style={{ width: "2.75rem", minWidth: "0" }} text="X" buttonColor={ButtonColor.defaultEmpty2}></Button>
      </div>)}
    </div>
  )
}

export { Projects };
